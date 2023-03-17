require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
app.use(`/assets/vocabulary`, express.static('assets/vocabulary'));
app.use(`/assets/avater`, express.static('assets/avater'));
app.use(`/assets/usersPostImage`, express.static('assets/usersPostImage'));
const vocabularyRoute = require('./routes/v1/vocabulary.route');
const postRoutes = require('./routes/v1/post.route')
const userRoute = require('./routes/v1/user.route');

// twilio
/* const Account_SID = 'AC480f92548518d3e7855cca4be6298f8d'
const Auth_Token = '621c63220d643a952009038049a44c05';
const client = require('twilio')(Account_SID, Auth_Token); */

// middleware
app.use(cors())
app.use(express.json())
/* app.use(express.urlencoded({ extended: true })) */


// database connected
mongoose.connect(`${process.env.DATABASE_LOCAL}`)
    .then(() => console.log('database is connected'))
    .catch(() => console.log('database is not connected'))


app.use('/api/v1/vocabulary', vocabularyRoute); // vocabulary api
app.use('/api/v1/user', userRoute) // user singup and loging api
app.use('/api/v1/userPost', postRoutes)

/* client.messages
    .create({
        body: 'Abu default requestClient!',
        from: '+17122141267',
        to: '+8801857927912',
    })
    .then(message => console.log(`Message SID ${message.sid}`))
    .catch(error => console.error('inside', error));
 */


app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log('server is running')
})
