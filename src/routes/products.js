const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.list);

router.get("/projects", productsController.projects)
 
router.post("/add", productsController.save);

module.exports = router;
