const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.list);

router.get("/productslist", productsController.productslist);

router.get("/projectslist", productsController.projectslist);

router.get("/projects", productsController.projects);

router.get('/deleteproduct/:id', productsController.deleteproduct);

router.get("/updateproduct/:id", productsController.editproduct);

router.post("/updateproduct/:id", productsController.updateproduct);
 
router.post("/add", productsController.save);

module.exports = router;
