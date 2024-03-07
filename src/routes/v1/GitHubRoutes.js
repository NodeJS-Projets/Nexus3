// all GitHub api here routed here
const express = require('express');
const router = express.Router();
const {GithHubController} = require('../../controllers/v1/GitHubController');

// GET route
router.get("/userdata", GithHubController.getUserData);
router.get("/organization-data", GithHubController.getOrganizationData);
router.get("/repository-list", GithHubController.getRepositryList);

module.exports = router;