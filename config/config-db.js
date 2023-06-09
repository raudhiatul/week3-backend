import  Sequelize  from "sequelize";
import config from "./config";

const sequelize = new Sequelize(
    config.db_name,
    config.db_username,
    config.db_pass,
    {
        dialect : 'postgres'
    }
)

sequelize
    .authenticate()
    .then(()=> console.log('connection has been established successfully'))
    .catch(err => console.log(err))

export {sequelize}