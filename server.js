const express = require('express');
const app = express();
require('dotenv').config();
const connectDb = require('./config/db');
const Url = require('./model/urlModel');

// connecting to database server
connectDb();

// template engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('public/images'));
app.use(express.static('public/styles'));


// for accessing url params
app.use(express.urlencoded({ extended: false }));

// Api endpoints
// GET 
app.get('/', async (req,res)=>{
    const urlsData = await Url.find().limit(10).sort({createdAt: -1});
    res.render('index', {urlData : urlsData});
})

// POST
app.post('/sendLongUrl', async (req,res) => {
    const urlData = await Url.create({ longUrl: req.body.longUrl});
    res.redirect('/');
})

// GET
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await Url.findOne({ shortUrl : req.params.shortUrl });

    if(shortUrl == null){
        return res.sendStatus(404);
    }
    res.redirect(shortUrl.longUrl);
})

app.listen(process.env.PORT || 1128, () => {
    console.log(`App running at ${process.env.PORT}`);
})