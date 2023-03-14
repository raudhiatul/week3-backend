import { Router } from "express";
import indexCtrl from "../controllers/indexCtrl.js";

const router = Router();

router.get("/", indexCtrl.employeeController.getEmployees);
router.get("/:id", indexCtrl.employeeController.getEmployeesById);
router.post("/", indexCtrl.employeeController.addEmployees);
router.put("/:id", indexCtrl.employeeController.updateEmployee);
router.delete("/:id", indexCtrl.employeeController.deleteEmployee);
router.get("/query/:id", indexCtrl.employeeController.getEmployeeQueryById);

export default router;