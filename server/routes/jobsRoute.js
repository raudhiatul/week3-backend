import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl.js";

const router = Router();

router.get("/", indexCtrl.jobsController.getJobs);
router.get("/:id", indexCtrl.jobsController.getJobById);
router.post("/", indexCtrl.jobsController.addJob);
router.put("/:id", indexCtrl.jobsController.updateJob);
router.delete("/:id", indexCtrl.jobsController.deleteJob);
router.get("/query/:id", indexCtrl.jobsController.getJobQueryById);

export default router;