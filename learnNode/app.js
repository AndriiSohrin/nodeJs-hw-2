const express = require('express'); // фреймворк express подключение
const path = require('path'); // підключили модуль path шоб було легше співпрацювати із шляхами
const fs = require('fs')
const User = require('./models/user');

const app = express(); // запустимо сервер 1 в низу продовження
//=======================================================================================

const expressHbs = require('express-handlebars');  // підключаємо язик шаблонов.додає більше можливостей у звичайний HTML

app.engine('hbs', expressHbs({        // кажемо шо тепер у нас буде двигун не HTML a Hbs
    layoutsDir: 'views/layouts/',                //  налаштовуэмо Hbs за цим адресом будуть нашы шаблоны
    defaultLayout: 'main-layout',
    extname: 'hbs'                               //  вказуэмо шо розширення наших файлыв буде Hbs
}));


app.set('view engine', 'hbs');
app.set('views', 'views');   // шлях жо views,наприклад якби в папці public було views то писалы б так public --> views


// =======================================================================================


app.use(express.json());
app.use(express.urlencoded());                      // так сказать вчимо наш app використовувати json & url
app.use(express.static(path.join(__dirname, 'public'))); // іменно це полегшує підключку стилів і JS файлів в hbs файлах


//========================================================================================

app.get('/register', (req, res) => {
    res.render('register')
});

app.post('/register', (req, res) => {
    const {email, password} = req.body;
    const user = new User(email, password);    // з цього місця звернути увагу на папку models --> user.js
    const answer = user.save();
    if(answer){
        res.redirect('login')
    }else{
        res.render('register', {message: 'Error in register'});   // це можливе через user.js 9 -17 рядок
    }
});

//========================================================================================
//========================================================================================

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', (req, res, next) => {
    const {email, password} = req.body;
    const user = User.findUser(email, password);
    if (user) {
        // res.redirect('users')
        next()
    } else {
        res.render('login', {message: 'Wrong data'})
    }

},(req,res)=>{
    const users = User.fetchAll();
    res.render('users', {users})       // передаю в user.bth дані через model --> fetchAll
});


//========================================================================================
//========================================================================================
//  app.get('/users', (req,res)=>{
//      const users = User.fetchAll();
//      res.render('users', {users})       // передаю в user.bth дані через model --> fetchAll
//  });
//========================================================================================


app.use((req,res)=>{
    res.status(404).render('404');
});

app.listen(3003, () => {
    console.log('server was started on port 3000') //запустимо сервер 2 продовження
});
