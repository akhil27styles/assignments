const express = require('express');
const { createTodo, updateTodo } = require('./types');
const {todo}=require('./db');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/todos", async function(req, res) {
    const todos = await todo.find({});
    res.json({
        todos:todos
    })
})
app.post('/todos',async(req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })
})
app.put('/completed',async (req,res)=>{
  if(!updateTodo.safeParse(req.body).success){
    res.status(411).json({
      msg:'Inavlid Id'
    })
    return;
  }
  await todo.updateOne({
    _id:req.body.id
  },{
    completed:true
  })
  res.json({
    msg:'Todo completed'
  })
})
app.listen(3000,()=>{
  console.log('server is running on port 3000');
})