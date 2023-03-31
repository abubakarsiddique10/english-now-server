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

// middleware
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.json())
/* app.use(express.urlencoded({ extended: true })) */


// database connected
mongoose.connect(`${process.env.DATABASE_URL}`)
    .then(() => console.log('database is connected'))
    .catch(() => console.log('database is not connected'))


app.use('/api/v1/vocabulary', vocabularyRoute); // vocabulary api
app.use('/api/v1/user', userRoute) // user singup and loging api
app.use('/api/v1/userPost', postRoutes)


app.get('/', (req, res) => {
    res.send('server is running')
})

app.all('*', (req, res) => {
    res.send("route not found")
})

app.use((err, req, res, next) => {
    console.log(err.message)
    res.json({ error: err.message })
})

app.listen(port, () => {
    console.log('server is running')
})
