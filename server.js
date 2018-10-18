const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
var profile = require('./profile')

app.use(express.static('public'))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/profile', profile);
// Set views directory to be ./views; lets app know where to find template files
app.set('views', './views');

// Sets default engine to be ejs; no 'require' needed--express handles that
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/home', (req, res) => {
	res.render('index');
});

app.get('/projects', (req, res) => {
	res.render('projects');
});

app.get('/contact', (req, res) => {
	res.render('contact');
});

app.post('/thanks', (req, res) => {
	const msg = {
		to: 'adb92.works@gmail.com',
		from: req.body.email,
		subject: 'From Your Portfolio Website',
		text: req.body.message
	};
	sgMail.send(msg);
	res.render('thanks', { contact: req.body })
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`listening at http://localhost:${PORT}`);
})