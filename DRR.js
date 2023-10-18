const router = require('express').Router()
const DRR = require('./models/DRR')


//CREATE NEW DRR
router.post('/create', async(req,res)=>{
    try{
        const newDRR = new DRR(req.body)
        await newDRR.save()
        res.status(200).json('data created.')

    }catch(err){
        console.error(err);
        res.status(500).json(err)
    }
})

//GET ALL DRR
router.get('/', async(req,res)=>{
    try{
        const allDRR = await DRR.find()
        
        res.status(200).json(allDRR)

    }catch(err){
        console.error(err);
        res.status(500).json(err)
    }
})

module.exports = router

