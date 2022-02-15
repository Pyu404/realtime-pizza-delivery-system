const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 3300


//assets
app.use(express.static('public'))

app.use(expressLayouts)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('home')
})

//cart route
app.get('/cart', (req, res) => {
    res.render('customers/cart')
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})