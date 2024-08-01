const express = require('express');
const {escapeHTML, htmlCharsRegex} = require("./helpers");
const app = express();

// set the static files root
app.use(express.static('public'))

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

const encodeXSS = function (req, res, next) {
    console.log("adir - req.originalUrl", req.originalUrl)
    const urlHasHtmlChars = htmlCharsRegex.test(decodeURI(req.originalUrl))

    if (urlHasHtmlChars) {
        res.redirect(encodeURI(req.originalUrl));
        return
    }
    next();
}

app.use(encodeXSS);

// index page
app.get('/:pageName?', function (req, res) {
    res.render('pages/index', {
        params: {
            ...req.params
        }
    });
});

// malicious query - try http://localhost:8080/?userName=adir<img onerror="javascript:script=document.createElement('script');script.src='/malicious-script.js';document.body.appendChild(script)" src="">
// malicious params - try http://localhost:8080/<%2Ftitle><script src="%2Fmalicious-script.js"><%2Fscript>

app.listen(8080);
console.log('Server is listening on port 8080');