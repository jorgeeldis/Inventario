const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/", productsController.dashboard); 

//router.get("/dashboard", productsController.dashboard)

router.get("/products", productsController.products);

router.get("/productslist", productsController.productslist);

router.get("/projects", productsController.projects);

router.get("/projectslist", productsController.projectslist);

//router.get('/deleteproduct/:id', productsController.deleteproduct);

router.get("/updateproduct/:id", productsController.editproduct);

router.post("/updateproduct/:id", productsController.updateproduct);

//router.get("/deleteproject/:id", productsController.deleteproject);

router.get("/updateproject/:id", productsController.editproject);

router.post("/updateproject/:id", productsController.updateproject);
 
router.post("/add", productsController.save);

router.post("/addproject", productsController.addproject);

module.exports = router;
