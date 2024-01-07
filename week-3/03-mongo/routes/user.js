const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    let username = req.body.username;
    let password = req.body.password;

    const existingUser = await User.findOne({ username:username });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }else{
        await User.create({
            username: username,
            password: password
        })
    
        res.json({
            message: 'Admin created successfully'
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    let c=await Course.getAllCourses()
    res.json({
        courses: c
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router