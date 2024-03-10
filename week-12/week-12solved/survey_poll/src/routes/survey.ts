// survey.ts
import express, { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const surveyRouter: Router = express.Router();
const prisma=new PrismaClient();
// Define your route handlers
surveyRouter.post('/', async(req: Request, res: Response) => {
  // Implementation for creating a new survey
  const {title,questions}=req.body;
  try{
    const post= await prisma.survey.create({
        data:{
            title:title,
            questions:{
                create:questions.map((question:any)=>({
                    text:question.text,
                    options:{
                    create:question.options.map((optionText:any)=>({
                        text:optionText
                    }))
                    }
                }))
            }
        }
    
    })
      res.status(201).json({
        'new survey':post
      });
  }
  catch(e){
    res.send('Invalid')
  }
});

surveyRouter.get('/', async(req: Request, res: Response) => {
  // Implementation for getting all surveys
  try{
    const surveys= await prisma.survey.findMany({})
    res.status(202).json({
        'all surveys':surveys
    })
}
  catch(err){
      res.send('Invalid');
  }
});


surveyRouter.get('/:id', async(req: Request, res: Response) => {
    // Implementation for updating a specific survey
    const {id}=req.params; 
    try{
       const getSurvey=await prisma.survey.findUnique({
        where:{
            id:parseInt(id, 10)
         }
       })
       res.status(202).json({
        getSurvey
       })
     }
     catch(err){
         res.send(`Updating survey with ID ${req.params.id}`);
     }
  });

surveyRouter.put('/:id', async(req: Request, res: Response) => {
  // Implementation for updating a specific survey
  const { questionId,optionIndex } = req.body;
  try{
    const questionIdNumber = parseInt(questionId, 10);
    const optionIndexNumber = parseInt(optionIndex, 10);
  const option=await prisma.option.findUnique({
    where:{
        questionsId: questionIdNumber,
        id: optionIndexNumber,
     },
  });
  if(!option){
    res.status(404).json({error:'option not found'});
    return;
  }
  const vote=await prisma.option.update({
     where:{
        questionsId:questionIdNumber,
        id:optionIndexNumber,
     },
     data:{
        votes:option.votes+1
     }
  })
  res.json({vote});
  }
  catch(err){
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

surveyRouter.delete('/:id', async(req: Request, res: Response) => {
  // Implementation for deleting a specific survey
  const {id}=req.params
  try{
    const surveyId = parseInt(id, 10);
    console.log(surveyId);
    const survey= await prisma.survey.delete({
      where:{
         id:surveyId
        }
    })
    res.json({
        'delete post':survey
    })
}
  catch(err){
      res.send(`Deleting survey with ID ${req.params.id}`);
  }
});

export default surveyRouter;
