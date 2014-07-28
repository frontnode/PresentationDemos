var GitHubApi = require("github");
var async = require("async");
var _ = require("lodash");
var nodemailer = require("nodemailer");
var marked = require('marked');

var Constant = {
    USER: 'frontnode',
    REPO: "PresentationDemos",
    AVERAGE_SCORE_WEIGHT: 0.7,
    ACTIVITY_SCORE_WEIGHT: 0.3,
    ACTIVITY_SCORE: 25,
    SCORE_PATTERN: /s(\d+)/i
};

var nameMap = {
    'CraryPrimitiveMan': 'HarrySun',
    'vincenthou': 'VincentHou',
    'BigYu': 'DevinJin',
    'GoodLuckBamboo': 'LeoZhang',
    'zhengjinxin': 'TonyZheng'
};

var officeEmails = [
    'tonyzheng@augmentum.com.cn',
    'harrysun@augmentum.com.cn',
    'leozhang@augmentum.com.cn',
    'devinjin@augmentum.com.cn',
    'sarazhang@augmentum.com.cn',
    'hankliu@augmentum.com.cn',
    'marksong@augmentum.com.cn',
    'vincenthou@augmentum.com.cn'
];

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    host: 'mail2.augmentum.com.cn',
    auth: {
        user: "vincenthou@augmentum.com.cn",
        pass: "111111"
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
    token: 'a3c65f5cb552a03f84360881281c6ad79fd68ae6'
});

function getLatestSession(sessions) {
    return _.max(sessions, function(session){
        return new Date(session.created_at).getTime();
    });
}

function sendNotificationMail(session) {
    var mailOptions = {
        from: "Frontnode <vincenthou@augmentum.com.cn>", // sender address
        to: officeEmails.join(','), // list of receivers
        cc: 'vincentdong@augmentum.com.cn',
        subject: '[Wemarketing][session] ' + "Topic about " + session.title, // Subject line
        html: marked(session.body) + '<h2>Presenter: ' + nameMap[session.user.login] + '</h2><h2>Time: 4:00 pm</h2><h2>Room: 302 building 28</h2>' // html body
    };
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

function sendScoreEmail(sessions) {
    var len = sessions.length;
    var step = len / 5;
    sessions = sessions.slice((step - 1) * len, step * len);
    getSessionScores(sessions, function(scoreObjs){
        var htmlBody = '';//'<h1>Thanks for your sharing and chicken chop.</h1><ul>';
        var lowScores = [];
        /*var lowestScore = _.min(scoreObjs, function(scoreObj){
            return scoreObj.score;
        });*/
        _/*.each(scoreObjs, function(scoreObj){
            (lowestScore.score === scoreObj.score) && (lowScores.push(scoreObj));
        });
        _.each(lowScores, function(lowScore){
            //htmlBody += '<li>' + lowScore.presenter + ' get scored ' + lowScore.score + '</li>'
            htmlBody += '<li>' + lowScore.presenter + '</li>'
        });*/
        _.each(scoreObjs, function(scoreObj){
            //htmlBody += '<li>' + lowScore.presenter + ' get scored ' + lowScore.score + '</li>'
            htmlBody += '<li>' + scoreObj.presenter + ':' + scoreObj.score + '</li>'
        });
        htmlBody += '</ul>';

        var mailOptions = {
            from: "Frontnode <vincenthou@augmentum.com.cn>", // sender address
            to: officeEmails.join(','), // list of receivers
            cc: 'vincentdong@augmentum.com.cn',
            subject: '[Wemarketing][session] ' + "Session score report", // Subject line
            html: htmlBody // html body
        };
        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }
            smtpTransport.close(); // shut down the connection pool, no more messages
        });
    });
}

function getAverageScore(comments) {
    var scores = [];
    var max = 0;
    var min = 100;
    var total = 0;
    _.each(comments, function(comment){
        var matchedScore = comment.body.match(Constant.SCORE_PATTERN);
        matchedScore && matchedScore.length > 0 && scores.push(parseInt(matchedScore[1]));
    });
    _.each(scores, function(score){
        (score > max) && (max = score);
        (score < min) && (min = score);
        total += score;
    });
    return (total - max - min) * 1.0 / (scores.length - 2);
}

function updateActivityScore(comments, userHash) {
    _.each(comments, function(comment){
        var hashKey = comment.user.login;
        if (typeof userHash[hashKey] !== 'undefined') {
            Constant.SCORE_PATTERN.test(comment.body) && userHash[hashKey]++;
        } else {
            userHash[hashKey] = 1;
        }
    });
}

function getFinalScore(averageScores, userScoreHash) {
    var finalScores = [];
    _.each(averageScores, function(averageScore){
        var activityScore = userScoreHash[averageScore.creator] * Constant.ACTIVITY_SCORE * Constant.ACTIVITY_SCORE_WEIGHT;
        finalScores.push({
            title: averageScore.title,
            presenter: nameMap[averageScore.creator],
            score: activityScore + averageScore.score * Constant.AVERAGE_SCORE_WEIGHT
        });
    });
    return finalScores;
}

function getSessionScores(sessions, callback) {
    var sessionScoreHandlers = [];
    var userScoreHash = {};
    _.each(sessions, function(session){
        if (session.comments > 0) {
            sessionScoreHandlers.push(function(cb){
                github.issues.getComments({
                    user: Constant.USER,
                    repo: Constant.REPO,
                    number: session.number
                }, function(err, comments){
                    if (!err) {
                        updateActivityScore(comments, userScoreHash);
                        cb(err, {
                            title: session.title,
                            creator: session.user.login,
                            score: getAverageScore(comments)
                        });
                    } else {
                        console.error(err);
                    }
                });
            });
        }
    });
    async.parallel(sessionScoreHandlers, function(err, averageScores){
        if (!err) {
            callback(getFinalScore(averageScores, userScoreHash));
        } else {
            console.error(err);
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
        //sendNotificationMail(getLatestSession(sessions));
        sendScoreEmail(sessions);
    } else {
        console.log(err);
    }
});
