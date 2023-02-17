const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.list);

router.get("/productslist", productsController.productslist);

router.get("/projectslist", productsController.projectslist);

router.get("/projects", productsController.projects);

router.get('/delete/:id', productsController.delete);

router.get("/update/:id", productsController.edit);

router.post("/update/:id", productsController.update);
 
router.post("/add", productsController.save);

module.exports = router;
