import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import models,{sequelize} from './models/init-models'
import routes from './routes/indexRoute'

const port = process.env.PORT || 3002;
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(compression())
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(async(req,res,next)=>{
    req.context = {models}
    next()
})

app.use('/region',routes.RegRoute);
app.use("/countries", routes.countriesRoute);
app.use("/departments", routes.departmentRoute);
app.use("/employees", routes.employeeRoute);
app.use("/jobhistory", routes.jobHistoryRoute);
app.use("/jobs", routes.jobsRoute);
app.use("/locations", routes.locationRoute);


const dropDatabaseSync = false

sequelize.sync({force: dropDatabaseSync}).then(async()=> {
    if (dropDatabaseSync) {
        console.log('Database do not drop');
    }
    app.listen(port,()=> {console.log('Server is listening on port '+port)})
})

export default app