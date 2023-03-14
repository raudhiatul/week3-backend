import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl.js";

const router = Router();

router.get("/", indexCtrl.departmentController.getDepartments);
router.get("/:id", indexCtrl.departmentController.getDepartmentById);
router.post("/", indexCtrl.departmentController.addDepartment);
router.put("/:id", indexCtrl.departmentController.updateDepartment);
router.delete("/:id", indexCtrl.departmentController.deleteDepartment);
router.get("/query/:id", indexCtrl.departmentController.getDepartmentQueryById);

export default router;