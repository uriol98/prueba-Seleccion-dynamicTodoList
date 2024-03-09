import React, { useState } from "react";
import ToDoElement from "./ToDoElement";

let idGlobal = 0;

const ToDoListPage =() =>  {
const [list, setList] = useState([]);
const [input, setInput] = useState();


const handleChange = evt => {
    evt.preventDefault();
    setInput(evt.target.value);
};

const addTask = () => {
    const task = { name: input, completed: false, id: idGlobal};
    let lista = [...list];
    lista.push(task);
    idGlobal++;
    setList(lista);
};

const deleteTask = id => {
    const lista = list.filter(x => x.id!== id);
    setList(lista);
};

const completeTask = id => {
    const lista = [...list];
    const idx = lista.findIndex(x => x.id === id)
    lista[idx].completed = true;
    lista.sort((a, b) => a.completed && !b.completed ? 1 : a.completed === b.completed ? 0 : -1 );
    setList(lista)
};


const editar = el => {
    let lista = [...list];
    const idx = lista.findIndex(x => x.id === el.id);
    lista[idx] = { ...lista[idx], completed: el.completed, name: el.name};
    lista.sort((a, b) => a.completed && !b.completed ? 1 : a.completed === b.completed ? 0 : -1 );
    setList(lista);
};

return(
<div className="container">
    <div className="mb-4 mt-4">
    <span>
    Task name <input onChange={handleChange}/>
    </span>
    <button onClick={addTask}> Add task</button>
    </div>
    <ul>
    <li className="row align-items-center mb-3">
        <b className="col-1">Completed</b>
        <b className="col-2">Name</b>
        <b className="offset-md-2 col-2">Actions</b>
        <hr className="bg-danger border-2 border-bottom mt-2 " />

    </li>
    { list.map((el, idx) => 
    <React.Fragment key={`${el.id}-${idx}`}>
        <ToDoElement element={el} eliminar={deleteTask} editar={editar}  completar={completeTask} />
    </React.Fragment>
       
        )}
    </ul>
    <br />
</div>);

};

export default ToDoListPage;