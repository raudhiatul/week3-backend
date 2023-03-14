import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl.js";

const router = Router();

router.get("/", indexCtrl.countriesController.getCountries);
router.get("/:id", indexCtrl.countriesController.getCountriesById);
router.post("/", indexCtrl.countriesController.addCountries);
router.put("/:id", indexCtrl.countriesController.updateCountries);
router.delete("/:id", indexCtrl.countriesController.deleteCountries);
router.get("/query/:id", indexCtrl.countriesController.getAllCountriesQuery);

export default router;