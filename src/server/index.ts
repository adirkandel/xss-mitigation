import express, { RequestHandler } from 'express';
import session from 'express-session';
import { htmlCharsRegex } from '../helpers';
import { auth } from './auth';

const app = express();

app.use(session({ secret: 'XSS mitigation' }));

app.use(auth);

// set the static files root
app.use(express.static('public'))

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

const encodeXSS: RequestHandler = (req, res, next) => {
    const urlHasHtmlChars = htmlCharsRegex.test(decodeURI(req.originalUrl))

    if (urlHasHtmlChars) {
        res.redirect(encodeURI(req.originalUrl));
        return
    }
    next();
}

// Malicious Params - try http://localhost:8080/<%2Ftitle><script src="%2Fmalicious-script.js"><%2Fscript>
// Malicious Query - try http://localhost:8080/adir?userName=adir<img onerror="javascript:script=document.createElement('script');script.src='/malicious-script.js';document.body.appendChild(script)" src="">
// app.use(encodeXSS);

app.get("/:userName?", (req, res, next) => {
    const { user } = req.session;
    if (user && req.originalUrl === '/') {
        res.redirect(`/${user.name}`);
        return;
    }
    if (!user && req.originalUrl !== '/') {
        res.redirect('/');
        return;
    }
    next();
});

// home page
app.get('/:userName', (req, res) => {
    res.render('pages/home', {
        params: {
            ...req.params
        }
    });
});

// index page
app.get('/', (req, res) => {
    res.render('pages/index');
});

// Malicious Hash - try http://localhost:8080/adir#userName=adir<img onerror="javascript:script=document.createElement('script');script.src='/malicious-script.js';document.body.appendChild(script)" src="">

app.listen(8080);
console.log('Server is listening on port 8080');