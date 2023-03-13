import dotenv from "dotenv";
import express from "express";

dotenv.config();

const Pool = require("pg").Pool;
const pool = new Pool({
    host:'localhost',
    user:'postgres',
    password:'admin',
    port:5432,
    database:'hr-db'
});

const app = express();
app.use(express.json());
const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Server listening on port ${port}`));

// Table Countries
app.get("/api/countries", (req, res) => {
  pool.query("select *  from countries", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.get("/api/countries/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from countries where country_id =$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.post("/api/countries", (req, res) => {
  const { country_id, country_name, region_id } = req.body;
  pool.query("insert into countries (country_id, country_name, region_id) values ($1, $2, $3)", [country_id, country_name, region_id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rowCount);
  });
});

app.put("/api/countries/:id", (req, res) => {
  const { id } = req.params;
  const { country_id, country_name, region_id } = req.body;
  pool.query("update countries set country_id = $1, country_name = $2, region_id = $3 where country_id = $4", [country_id, country_name, region_id, id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil update");
  });
});

app.delete("/api/countries/:id", (req, res) => {
  const { id } = req.params;

  pool.query("delete from countries where country_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil dihapus");
  });
});

// Table Departments
app.get("/api/departments", (req, res) => {
  pool.query("select *  from departments", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.get("/api/department/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from departments where department_id =$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.post("/api/department", (req, res) => {
  const { department_id, department_name, manager_id, location_id } = req.body;
  pool.query("insert into departments (department_id, department_name, manager_id, location_id ) values ($1, $2, $3, $4)", [department_id, department_name, manager_id, location_id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rowCount);
  });
});

app.put("/api/department/:id", (req, res) => {
  const { id } = req.params;
  const { department_id, department_name, manager_id, location_id } = req.body;

  pool.query("update departments set department_id = $1, department_name = $2, manager_id = $3, location_id = $4 where department_id = $5", [department_id, department_name, manager_id, location_id, id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil update");
  });
});

app.delete("/api/department/:id", (req, res) => {
  const { id } = req.params;

  pool.query("delete from departments where department_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil dihapus");
  });
});

// Table employees
app.get("/api/employees", (req, res) => {
  pool.query("select *  from employees", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.get("/api/employee/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from employees where employee_id =$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.post("/api/employee", (req, res) => {
  const { first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id } = req.body;
  pool.query(
    "insert into employees (first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});

app.put("/api/employee/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id } = req.body;
  pool.query(
    "update employees set first_name = $1, last_name = $2, email = $3, phone_number = $4, hire_date = $5, salary = $6, commission_pct = $7, job_id = $8, manager_id = $9, department_id = $10 where employee_id = $11",
    [first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).end("Data berhasil update");
    }
  );
});

app.delete("/api/employee/:id", (req, res) => {
  const { id } = req.params;

  pool.query("delete from employees where employee_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil dihapus");
  });
});

// Table job history
app.get("/api/jobhistory", (req, res) => {
  pool.query("select *  from job_history", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.get("/api/jobhistory/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from job_history where employee_id =$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.post("/api/jobhistory", (req, res) => {
  const { employee_id, start_date, end_date, job_id, department_id } = req.body;
  pool.query("insert into job_history (employee_id,start_date, end_date, job_id, department_id) values ($1, $2, $3, $4, $5)", [employee_id, start_date, end_date, job_id, department_id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rowCount);
  });
});

app.put("/api/jobhistory/:id", (req, res) => {
  const { id } = req.params;
  const { start_date, end_date, job_id, department_id } = req.body;
  pool.query("update job_history set start_date = $1, end_date = $2, job_id = $3, department_id = $4 where employee_id = $5", [start_date, end_date, job_id, department_id, id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil update");
  });
});

app.delete("/api/jobhistory/:id", (req, res) => {
  const { id } = req.params;
  pool.query("delete from job_history where employee_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil dihapus");
  });
});

// Table job
app.get("/api/jobs", (req, res) => {
  pool.query("select *  from jobs", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.get("/api/job/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from jobs where job_id =$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.post("/api/job", (req, res) => {
  const { job_id, job_title, min_salary, max_salary } = req.body;
  pool.query("insert into jobs (job_id, job_title, min_salary, max_salary) values ($1, $2, $3, $4)", [job_id, job_title, min_salary, max_salary], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rowCount);
  });
});

app.put("/api/job/:id", (req, res) => {
  const { id } = req.params;
  const { job_title, min_salary, max_salary } = req.body;
  pool.query("update jobs set job_title = $1, min_salary = $2, max_salary = $3 where job_id = $4", [job_title, min_salary, max_salary, id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil update");
  });
});

app.delete("/api/job/:id", (req, res) => {
  const { id } = req.params;
  pool.query("delete from jobs where job_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil dihapus");
  });
});

// Table Locations
app.get("/api/locations", (req, res) => {
  pool.query("select *  from locations", [], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.get("/api/location/:id", (req, res) => {
  const { id } = req.params;
  pool.query("select * from locations where location_id =$1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
});

app.post("/api/location", (req, res) => {
  const { location_id, street_address, postal_code, city, state_province, country_id } = req.body;
  pool.query(
    "insert into locations (location_id, street_address, postal_code, city, state_province, country_id) values ($1, $2, $3, $4, $5, $6)",
    [location_id, street_address, postal_code, city, state_province, country_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(200).json(result.rowCount);
    }
  );
});

app.put("/api/location/:id", (req, res) => {
  const { id } = req.params;
  const { street_address, postal_code, city, state_province, country_id } = req.body;
  pool.query("update locations set street_address= $1, postal_code = $2, city = $3, state_province = $4, country_id = $5 where location_id = $6", [street_address, postal_code, city, state_province, country_id, id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil update");
  });
});

app.delete("/api/location/:id", (req, res) => {
  const { id } = req.params;
  pool.query("delete from locations where location_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).end("Data berhasil dihapus");
  });
});