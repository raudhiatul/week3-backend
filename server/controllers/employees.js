import sequelize from "../models/init-models.js";

const getEmployees = async (req, res) => {
  try {
    const employees = await req.context.models.employees.findAll();
    return res.send(employees);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getEmployeesById = async (req, res) => {
  try {
    const employees = await req.context.models.employees.findOne({
      where: { employee_id: req.params.id },
    });
    return res.send(employees);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const addEmployees = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id } = req.body;
    const employees = await req.context.models.employees.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      hire_date: hire_date,
      salary: salary,
      commission_pct: commission_pct,
      job_id: job_id,
      manager_id: manager_id,
      department_id: department_id,
    });
    return res.send(employees);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id } = req.body;
    const employees = await req.context.models.employees.update(
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        hire_date: hire_date,
        salary: salary,
        commission_pct: commission_pct,
        job_id: job_id,
        manager_id: manager_id,
        department_id: department_id,
      },
      { returning: true, where: { employee_id: req.params.id } }
    );
    return res.send(employees);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employees = await req.context.models.employees.destroy({
      where: { employee_id: req.params.id },
    });
    return res.send(`delete ${employees} rows`);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getEmployeeQueryById = async (req, res) => {
  try {
    const query = await sequelize.query("SELECT * from employees where employee_id = :id", { replacements: { id: req.params.id }, type: sequelize.QueryTypes.SELECT });
    return res.send(query);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  getEmployees,
  getEmployeesById,
  addEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeQueryById,
};