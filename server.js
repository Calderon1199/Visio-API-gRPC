const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');


const db= knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : '******',
        port : '****',
        password : '*******',
        database : '*****'
    }
});

db.select('*').from('users').then(data => {
    console.log(data);
});


const app = express();
app.use(express.json());

app.use(cors())

app.get('/', (req, res) => {res.send(db.users);})
app.post('/signin', signin.handleSignIn(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db )})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}` );
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT  --> user
*/
