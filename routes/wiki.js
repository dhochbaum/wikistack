const router = require('express').Router();
//const addPage = require('../views/addPage');
const { addPage } = require('../views');

router.get('/', async (req, res, next) => {
    res.send('GET WIKI PAGE')
})

router.get('/add', async (req, res, next) => {
    res.send(addPage());
})

router.post('/', async (req, res, next) => {
    const body = req.body.title;
    console.log(body);
    //res.send(res.json(req.body));
})

module.exports = router;