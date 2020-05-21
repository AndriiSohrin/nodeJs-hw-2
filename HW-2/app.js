const express = require('express');

const expressBars = require('express-handlebars');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded());    //щоб нода могла читати нашы json & url

// === 1. встановлюэмо статичну папку ====
express.static(path.join(__dirname, 'views'));

// === 2. встановити двіжок для обробки наших темплетів =====
app.engine('.hbs', expressBars({
    defaultLayout: false,
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views')); // шлях де знаходять views

//============================================================================
const dataBase = [
    {
        email: 'ananas3000@gmail.com',
        password: '4321'
    },
    {
        email: 'marina4000@gmail.com',
        password: '1234'
    },
    {
        email: 'sveta5@gamil.com',
        password: '1111'
    },

];
//===========================================================================

app.get('/', (req, res) => {
    res.render('main')
});

//============================================================================
app.get('/register', (req, res) => {
    res.render('register')
});

app.post('/reg', (req, res) => {
    let verification = true;
    dataBase.map(el => {
        if (el.email === req.body.email) {
            res.write('you are already registered');
    }
    });

    verification && dataBase.push(req.body);
    res.write('successfully')
    res.end();
});

//===========================================================================
app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/log', (req, res) => {

    let verification = false;
    dataBase.map(el => {
        if (el.email === req.body.email && el.password === req.body.password) {
            res.write('login successful')
            verification = true;
        }
    });

    !verification && res.write('you have not registered yet')
    res.end();
});

//========================================================================================

app.get('/user', (req, res) => {
    res.render('user', {dataBase})
});

app.listen(5000, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('listen 5000')
    }
});

