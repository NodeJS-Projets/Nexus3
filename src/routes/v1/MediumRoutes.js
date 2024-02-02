// all medium api here routed here

const express = require('express');
const router = express.Router();
const {MediumController} = require('../../controllers/v1/MediumController');

// GET route

router.post("/userdata", MediumController.getUserData);
router.post("/user-publication-data", MediumController.getUserPublication);
router.post("/user-article-data", MediumController.getUserArticles);
// router.get('/', exampleController.getExampleData);

module.exports = router;