import sequelize from "../models/init-models.js";

const getJobHistory = async (req, res) => {
  try {
    const job_history = await req.context.models.job_history.findAll();
    return res.send(job_history);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getJobHistoryById = async (req, res) => {
  try {
    const job_history = await req.context.models.job_history.findOne({
      where: { employee_id: req.params.id },
    });
    return res.send(job_history);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const addJobHistory = async (req, res) => {
  try {
    const { employee_id, start_date, end_date, job_id, department_id } = req.body;
    const job_history = await req.context.models.job_history.create({
      employee_id: employee_id,
      start_date: start_date,
      end_date: end_date,
      job_id: job_id,
      department_id: department_id,
    });
    return res.send(job_history);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const updateJobHistory = async (req, res) => {
  try {
    const { start_date, end_date, job_id, department_id } = req.body;
    const job_history = await req.context.models.job_history.update(
      {
        start_date: start_date,
        end_date: end_date,
        job_id: job_id,
        department_id: department_id,
      },
      { returning: true, where: { employee_id: req.params.id } }
    );
    return res.send(job_history);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteJobHistory = async (req, res) => {
  try {
    const job_history = await req.context.models.job_history.destroy({
      where: { employee_id: req.params.id },
    });
    return res.send(`delete ${job_history} rows`);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getJobHistoryQueryById = async (req, res) => {
  try {
    const query = await sequelize.query("SELECT * from job_history where employee_id = :id", { replacements: { id: req.params.id }, type: sequelize.QueryTypes.SELECT });
    return res.send(query);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default {
  getJobHistory,
  getJobHistoryById,
  addJobHistory,
  updateJobHistory,
  deleteJobHistory,
  getJobHistoryQueryById,
};