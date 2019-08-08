const router = require('express').Router();
//const addPage = require('../views/addPage');
const { addPage } = require('../views');
const { Page } = require('../models');

router.get('/', async (req, res, next) => {
    res.send('GET WIKI PAGE')
})

router.get('/add', async (req, res, next) => {
    res.send(addPage());
})

router.post('/', async (req, res, next) => {
    //res.json(req.body);
    //const slug = req.body.title.replace(' ', '-').toLowerCase();
    const page = new Page({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status,
        slug: req.body.title
    });
    
    try {
        await page.save();
        console.log(page);
        res.redirect('/');
      } catch (error) { next(error) }
})

module.exports = router;