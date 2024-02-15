import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    const res=await prisma.todo.create({
        data:{
            userId:userId,
            title:title,
            description:description
        }
    })
    console.log(res);
    return res;
}
createTodo(4333,'title 1','desc1');
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
 const res=await prisma.todo.update({
    where:{
        id:todoId
    },
    data: {
        done: true
    } 
 })
 console.log(res);
 return res;
}
//updateTodo(123);

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
const todos=await prisma.todo.findMany({
    where:{
        userId:userId,
    },
    select:{
        userId:true,
        id:true,
        title:true,
        description:true,
        done:true
    }
})
console.log(todos);
return todos;
}

getTodos(4);