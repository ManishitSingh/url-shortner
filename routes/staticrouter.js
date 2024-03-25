const express = require('express');
const router = express.Router();
const Url = require("../models/url");


router.get('/', async (req, res) => {
    if(!req.user){
        return res.redirect('/login');
    }
    const allUrls = await Url.find({ createdBy: req.user._id });
    // res.json(allUrls);
    res.render('home', { urls: allUrls });
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;