import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [toDos] = useState([])
  function addTodo(){
    let title = document.getElementById('title');
    let desc = document.getElementById('desc');
    let todoList = document.getElementById('todos');
    console.log(title.value);
    console.log(desc.value);
    let newtodo = document.createElement('div');
    
    let ctitle = document.createElement('p');
    ctitle.innerText = title.value;
    
    let cdesc = document.createElement('p');
    cdesc.innerText = desc.value;

    newtodo.appendChild(ctitle);
    newtodo.appendChild(cdesc);

    todoList.appendChild(newtodo);

  }
  return (
    
      <div>
        <input type ='text' placeholder='title' id='title'></input>
        <br />
        <input type ='text' placeholder='description' id='desc'></input>
        <br />
        <button onClick={addTodo} title='add'>Add</button>
        <div id="todos"></div>
      </div>
    
  )
}

export default App
