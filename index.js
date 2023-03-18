require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
/* app.use(`/assets/vocabulary`, express.static('assets/vocabulary')); */

app.use(`/assets/avater`, express.static('assets/avater'));
app.use(`/assets/usersPostImage`, express.static('assets/usersPostImage'));
const vocabularyRoute = require('./routes/v1/vocabulary.route');
const postRoutes = require('./routes/v1/post.route')
const userRoute = require('./routes/v1/user.route');


app.use(`https://english-now-server.vercel.app/assets/vocabulary`, express.static('https://english-now-server.vercel.app/assets/vocabulary'));

// middleware
app.use(cors())
app.use(express.json())
/* app.use(express.urlencoded({ extended: true })) */


// database connected
mongoose.connect(`${process.env.DATABASE_URL}`)
    .then(() => console.log('database is connected'))
    .catch(() => console.log('database is not connected'))


app.use('/api/v1/vocabulary', vocabularyRoute); // vocabulary api
app.use('/api/v1/user', userRoute) // user singup and loging api
app.use('/api/v1/userPost', postRoutes)

app.get('/bakar', (req, res) => {
    res.send({ name: "abu", age: 21 })
})

app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log('server is running')
})
