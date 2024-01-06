export function Todos({todos, fetchTodos}) {
const handleComplete=async(id)=>{
    const res = await fetch(`http://localhost:3000/completed`, {
    method:'PUT',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id:id }),
    })
    if(res.ok){
        fetchTodos();
    }
}
    return <div>
        {todos.todos?.map(function(todo) {
            return <div key={todo._id}>
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button onClick={()=>
                    handleComplete(todo._id)}>{todo.completed == true ? "Completed" : "Mark as Complete"}</button>
            </div>
        })}
    </div>
}