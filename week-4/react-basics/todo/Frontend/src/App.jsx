import React, { useEffect, useState } from 'react';
import './App.css'
import { Todos } from './todos';
const App = () => {
  const [todos,setTodos]=useState([]);
  useEffect(()=>{
    fetchTodos();
  },[])
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    completed: false
  });
  const fetchTodos = async () => {
    try {
      const res = await fetch('http://localhost:3000/todos');
      const data = await res.json();
      setTodos(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  const handleTitleChange = (e) => {
    setTodo({
      ...todo,
      title: e.target.value
    });
  };

  const handleDescriptionChange = (e) => {
    setTodo({
      ...todo,
      description: e.target.value
    });
  };

const handleSubmit= async()=>{
try{
  const res=await fetch('http://localhost:3000/todos',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(todo)
  });
  if(res.ok){
    console.log('done!')
    fetchTodos();
  }
}
catch(err){
console.log('some error')
}
}

  return (
    <div className='App'>
      <input
        placeholder='Title'
        type='text'
        value={todo.title}
        onChange={handleTitleChange}
      ></input>
      <input
        placeholder='Description'
        type='text'
        value={todo.description}
        onChange={handleDescriptionChange}
      ></input>
      <button onClick={handleSubmit}>Click</button>
      <Todos todos={todos} fetchTodos={fetchTodos}/>
    </div>
  );
};

export default App;
