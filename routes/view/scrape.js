var express = require('express');
var router  = express.Router();

var headline = require('../../controllers/headline');
var fetch = require('../../controllers/fetch')

router.get('/',headline.index);
router.get('/scrape',fetch.index);
router.get('/saved',headline.showSavedArticles);
router.get('/notes/:id',headline.showNotes);
router.post('/saved/:id',headline.saveArticle);
router.post('/addNote/:id',headline.addNote);
router.delete('/deleteNotes/:noteId/:headlineId', headline.deleteNote);

module.exports = router;