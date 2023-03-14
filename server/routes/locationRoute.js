import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl.js";

const router = Router();

router.get("/", indexCtrl.locationController.getLocations);
router.get("/:id", indexCtrl.locationController.getLocationById);
router.post("/", indexCtrl.locationController.addLocation);
router.put("/:id", indexCtrl.locationController.updateLocation);
router.delete("/:id", indexCtrl.locationController.deleteLocation);
router.get("/query/:id", indexCtrl.locationController.getLocationQueryById);

export default router;