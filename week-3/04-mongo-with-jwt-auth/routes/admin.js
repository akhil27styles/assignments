const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin,Course } = require("../db");
const router = Router();
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const bcrypt = require('bcrypt');
// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const { username, password } = req.body;
    try{
        const existing= await Admin.findOne({username:username});
        if(existing){
            return res.status(409).json({error:'Admin with userName already existed!'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin= Admin.create({
            username:username,
            password:hashedPassword
        });
        const token = jwt.sign({ adminId: newAdmin._id ,username:username}, jwtPassword);
        res.json({
            message:`${username} admin created!`,
            token:token
        });
    }
    catch(err){
     res.status(500).json({error:'Internal server err'});
    }
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const { username,password } = req.body;
    try{
        const admin= await Admin.findOne({username:username});
        if(admin){
            const passwordMatch=await bcrypt.compare(password,admin.password);
            if(passwordMatch){
                const token=jwt.sign({adminId:admin._id,username},jwtPassword);
                return res.status(200).json({message:'SignIn Sucess',token:token});
            }
            else{
                return res.status(200).json({message:'Invalid Creds'});
            }
        }
        else{
            return res.status(404).json({message:'admin doesn\'t exist'});
        }
        
    }
    catch(err){
     res.status(500).json({error:'Internal server err'});
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    Course.create({
        title:req.body.title,
        desc:req.body.desc,
        price:req.body.price,
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find().then(courses=>{
        res.json(courses);
    })
});

module.exports = router;