const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User,Course } = require("../db");
const bcrypt = require('bcrypt');
const jwtPassword = 'secret';
const jwt = require('jsonwebtoken');
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const {username,password}=req.body;
    try{
        const existing= await User.findOne({username:username});
       if(existing){
       return res.status(409).json({error:'User already Exist!'});
       }
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser=User.create({
        username:username,
        password:hashedPassword,
    });
    const token=jwt.sign({userId:newUser._id,username:username},jwtPassword);
    res.json({
        message:`${username} User created successfully`,
        token:token
    });
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error!'});
    }
});
router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const { username,password } = req.body;
    try{
        const user= await User.findOne({username:username});
        if(user){
            const passwordMatch=await bcrypt.compare(password,user.password);
            if(passwordMatch){
                const token=jwt.sign({userId:user._id,username},jwtPassword);
                return res.status(200).json({message:'SignIn Sucess',token:token});
            }
            else{
                return res.status(200).json({message:'Invalid Creds'});
            }
        }
        else{
            return res.status(404).json({message:'user doesn\'t exist'});
        }
    }
    catch(err){
        console.log(err);
     res.status(500).json({error:'Internal server err'});
    }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find().then(courses=>{
        res.json(courses);
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const {courseId}=req.params;
    const userId=req.user.userId;
    console.log(courseId);
    console.log(userId);
    try{
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                message:'course not found!'
            })
        }
        const user =await User.findById(userId)
        const isCoursePurchased = user.purchasedCourses.some(purchasedCourse => purchasedCourse.courseId.equals(course._id));
        if(isCoursePurchased){
            return res.status(400).json({
                message:'Course already purchased!'
            });
        }
        user.purchasedCourses.push({
            courseId:course._id,
            bookDetails:{
                "title":course.title,
                "price":course.price
            }
        });
        await user.save();
        res.status(200).json({
            message:`${course.title} purchased Successfully!`
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:'Intenal server error'
        });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }
        console.log('---',user.purchasedCourses)
        const purchasedCourses = user.purchasedCourses || [];  // Handle case when purchasedCourses is undefined

        res.status(200).json({ purchasedCourses });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});


module.exports = router