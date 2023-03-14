import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl.js";

const router = Router();

router.get("/", indexCtrl.jobHistoryController.getJobHistory);
router.get("/:id", indexCtrl.jobHistoryController.getJobHistoryById);
router.post("/", indexCtrl.jobHistoryController.addJobHistory);
router.put("/:id", indexCtrl.jobHistoryController.updateJobHistory);
router.delete("/:id", indexCtrl.jobHistoryController.deleteJobHistory);
router.get("/query/:id", indexCtrl.jobHistoryController.getJobHistoryQueryById);

export default router;