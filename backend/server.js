import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Routine from './models/Routine.js'
import slugify from 'slugify'
import makeId from './utils/makeid.js'
import cors from 'cors'

const app = express()

// config
if(process.env.NODE_ENV !== 'production'){
    dotenv.config()
}

// db
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
    console.log("Mongodb connected...")
}).catch(e => {
    console.log(e);
})

// middlewars
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// route
app.post('/create', async(req, res) => {
    
    // console.log(req.body)

    // Find the slug
    let slug = slugify(req.body.routineName)

    // check if exits
    let slugExists = await Routine.findOne({slug});
    if(slugExists){
        slug += makeId(4)
    }

    let savedData = new Routine({
        routine: JSON.stringify(req.body.routine),
        yourName: req.body.yourName,
        routineName: req.body.routineName,
        slug
    });
    
    try {
        await savedData.save()
    } catch (err) {
        // console.log(err);
        res.status(501).send({error: "error"})
    }
    res.send({slug: savedData.slug})
})

app.get('/routine/:slug', async(req,res) => {
    try {
        // console.log(req.params.slug)
        let routine = await Routine.findOne({slug: req.params.slug});
        if(routine){
            return res.send({success: true, routine})
        }else{
            return res.send({success: false})
        }
    } catch (err) {
        // console.log(err);
        return res.send({success: false})
    }
})


// app listen
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})