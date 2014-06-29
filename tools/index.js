var GitHubApi = require("github");
var async = require("async");
var _ = require("lodash");
var nodemailer = require("nodemailer");
var marked = require('marked');

var Constant = {
    USER: 'frontnode',
    REPO: "PresentationDemos"
};

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    host: 'smtp.126.com',
    auth: {
        user: "frontnode@126.com",
        pass: "notabc123_"
    }
});

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com",
    timeout: 5000
});
github.authenticate({
    type: "oauth",
    token: '3414bf79549a120d59c9eb3a3ab71893e22c6d33'
});

function getLatestSession(sessions) {
    return _.max(sessions, function(session){
        return new Date(session.created_at).getTime();
    });
}

function sendNotificationMail(session) {
    // setup e-mail data with unicode symbols
    //
    //avatar_url
    var mailOptions = {
        from: "Frontnode <frontnode@126.com>", // sender address
        to: "hnkfhjj@126.com", // list of receivers
        subject: session.user.login + " 演讲《" + session.title "》", // Subject line
        html: marked(session.body) // html body
    };
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

function sendScoreEmail(sessions) {
    getSessionScores(sessions, function(scores){
        console.log(scores);
    });
}

function getFinalScore(scores) {
    var max = 0;
    var min = 100;
    var total = 0;
    _.each(scores, function(score){
        (score > max) && (max = score);
        (score < min) && (min = score);
        total += score;
    });
    return (total - max - min) * 1.0 / (scores.length - 2);
}

function getSessionScores(sessions, callback) {
    var sessionScoreHandlers = [];
    _.each(sessions, function(session){
        if (session.comments > 0) {
            sessionScoreHandlers.push(function(cb){
                github.issues.getComments({
                    user: Constant.USER,
                    repo: Constant.REPO,
                    number: session.number
                }, function(err, comments){
                    if (!err) {
                        var scores = [];
                        _.each(comments, function(comment){
                            scores.push(parseInt(comment.body.match(/s(\d+)/)[1]));
                        });
                        cb(err, {
                            title: session.title,
                            score: getFinalScore(scores)
                        });
                    } else {
                        console.err(err);
                    }
                });
            });
        }
    });
    async.parallel(sessionScoreHandlers, function(err, scores){
        if (!err) {
            callback(scores);
        } else {
            console.err(err);
        }
    });
}

//get issues
github.issues.repoIssues({
    user: Constant.USER,
    repo: Constant.REPO
}, function(err, issues) {
    if (!err) {
        var sessions = _.filter(issues, function(issue){
            return 'open' === issue.state;
        });
        sendNotificationMail(getLatestSession(sessions));
        //sendScoreEmail(sessions);
    } else {
        console.err(err);
    }
});
