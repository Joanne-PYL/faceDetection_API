const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex')
const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const imageurl = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        //   socketPath : '/path/to/socket.sock',
        host : 'postgresql-convex-01909',
        user : '',
        password : '',
        database : 'smart-brain'
    }
  });


const app = express();

app.use(bodyParser.json());
app.use(cors());

/* Overview
/ signin -> POST = success/fail
/ register -> POST = user
/ profile/:userId -> GET = user
/ image -> PUT -> user
*/


app.get('/', (req, res) => {
    res.send('it is working');
})

app.post('/signin', (req, res) => { signin.handleSingin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running at ${process.env.PORT}`);
}) 
