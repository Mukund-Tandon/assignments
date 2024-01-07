const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    let username = req.body.username;
    let password = req.body.password;

    const existingUser = await Admin.findOne({ username:username });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }else{
        await Admin.create({
            username: username,
            password: password
        })
    
        res.json({
            message: 'Admin created successfully'
        })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        price
    })
    const response = await Course.getAllCourses();
    res.json({
        message: 'Course created successfully', courseId: newCourse._id,courses: response
    })
});
router.get('/t', function (req, res) {
    // Implement fetching logic for the /t endpoint
    try{
        console.log("Inside /t endpoint");
       return res.status(200).json({ message: 'success' });
    } catch(e){
        console.log("Inside /t endpoint ERROR ${e}");
    }
     // Sending a JSON response
});
router.get('/courses', async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});

    res.json({
        courses: response
    })

});

module.exports = router;