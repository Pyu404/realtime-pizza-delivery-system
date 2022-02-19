require('dotenv').config()

const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 3300
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')

//const  Console  = require('console')

//database connection


const url = 'mongodb://localhost/pizza';

//mongoose.connect(url);
mongoose.connect(url)

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).on('error', () => {
    console.log('Connection failed...');
});


//session strore
let mongoStore = MongoStore.create({
    mongoUrl: url,
    dbName: 'pizza',
    collectionName: 'sessions',
});
// let mongoStore = new MongoDbStore({
//     mongooseConnection: connection,
//     collection: 'sessions'
// })

//session config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
// app.use(session({
//     secret: process.env.COOKIE_SECRET,
//     resave: false,
//     store: mongoStore,
//     saveUninitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 } //24hr
// }))


app.use(flash())



//assets
app.use(express.static('public'))
app.use(express.json())
    //global middleware

app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

//set template engine
app.use(expressLayouts)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


require('./routes/web')(app)



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})