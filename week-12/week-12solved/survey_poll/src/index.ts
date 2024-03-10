import express from 'express';
import bodyParser from 'body-parser';
import surveyRouter from './routes/survey'; 
const app=express();
const port=5000;

app.use(bodyParser.json());
app.use('/survey',surveyRouter);
app.listen(port,()=>{
    console.log(`running on ${port}`)
})
