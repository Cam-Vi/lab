const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

router.get("/", supplierController.getAll);
router.get("/new", supplierController.newForm);
router.post("/", supplierController.create);
router.get("/:id/edit", supplierController.editForm);
router.post("/:id", supplierController.update);
router.post("/:id/delete", supplierController.delete);

module.exports = router;