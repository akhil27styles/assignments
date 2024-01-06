const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(`mongodb+srv://thala:wt6juiOxDkWDAQo9@cluster7.k0r4zeo.mongodb.net/`);

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
    purchasedCourses: {
        type: [
            {
          courseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            },
            bookDetails:{}
        }
        ],
        default: []
    }
},{strict:false});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    desc:String,
    price:Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}