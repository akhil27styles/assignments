const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://thala:wt6juiOxDkWDAQo9@cluster7.k0r4zeo.mongodb.net/');
const todoSchema=mongoose.Schema({
  title:String,
  description:String,
  completed:Boolean,
})

const todo=mongoose.model('todos',todoSchema);

module.exports={
  todo
}