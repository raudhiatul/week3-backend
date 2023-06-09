import dotenv from 'dotenv';
import express from 'express';
dotenv.config()

const Pool = require('pg').Pool;
const pool = new Pool({
    host:'localhost',
    user:'postgres',
    password:'admin',
    port:5432,
    database:'hr-db'
})

const app = express()
app.use(express.json())
const port = process.env.PORT || 3005

app.listen(port,()=> console.log(`Server listening on port ${port}`))

app.get('/api/region',(req,res)=> {
    pool.query('select * from regions',
    [],
    (error,result)=>{
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

app.get('/api/region:id',(req,res)=>{
    const {id} = req.params
    pool.query('select * from regions where region_id = $1',[id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
})

app.post('/api/region/',(req,res)=> {
    const {name} = req.body
    pool.query('insert into regions1 (region_name) values ($1)',[name],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).json(result.rowCount)
    })
})

app.put('/api/region/:id',(req,res)=> {
    const {id} = req.params
    const {name} = req.body

    pool.query('update regions set region_name = $1 where region_id = $2',[id,name],
    (error,result) =>{
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil update')
    })
})

app.delete('/api/region:id',(req,res)=> {
    const {id} = req.params
    
    pool.query('delete from regions where region_id = $1',[id],
    (error,result)=> {
        if (error) {
            throw error
        }
        res.status(200).end('Data berhasil dihapus')
    })
})