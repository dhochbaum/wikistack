const router = require('express').Router();
//const addPage = require('../views/addPage');
const { addPage } = require('../views');
const { Page } = require('../models');
const { wikiPage } = require('../views');
const { main } = require('../views');

//const wikipage = require('../views/wikiPage');
console.log('aaaaaaaaaaaaaa')
console.log(wikiPage)


router.get('/', async (req, res, next) => {
    try {
        const wikiPageInfo = await Page.findAll();
          //console.log(wikiPage)
        res.send(main(wikiPageInfo));
    } catch (error) { next(error) }
})

router.get('/add', async (req, res, next) => {
    res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
    try {
        const wikiPageInfo = await Page.findOne({
            where: { slug: req.params.slug }
          })      
          //console.log(wikiPage)
        res.send(wikiPage(wikiPageInfo, 'The Best Author of Wikipages EVARRRR!!!!!!1!!'));
    } catch (error) { next(error) }
    
  });
  

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
        res.redirect(`/wiki/${page.slug}`);
      } catch (error) { next(error) }
})

module.exports = router;