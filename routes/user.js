const router = require('express').Router();
//const addPage = require('../views/addPage');
const { addPage } = require('../views');
const { Page } = require('../models');
const { userList, userPages } = require('../views');
const { main } = require('../views');
const { User } = require('../models');

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const wikiUserInfo = await User.findAll();
          //console.log(wikiPage)
        res.send(userList(wikiUserInfo));
    } catch (error) { next(error) }
})

router.get('/:id', async (req, res, next) => {
  try {
      const wikiUserInfo = await User.findOne({
        where: { id: req.params.id }
      });
      const wikiPageInfo = await Page.findAll({
        where: { authorId: req.params.id }
      });

      res.send(userPages(wikiUserInfo, wikiPageInfo));
  } catch (error) { next(error) }
  
});