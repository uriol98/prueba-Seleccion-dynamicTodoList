import React, { useState } from 'react';
import PropTypes from 'prop-types';


const ToDoElement = props => {
    const [state, setState] = useState({});
    const [isEdit, setEdit] = useState(false);
    const { element, editar, completar, eliminar } = props;

    const handleChange = evt => {
        evt.preventDefault();
        setState({...state, name: evt.target.value});
    };

    const handleCompletar = () => {
        setState({ ...state, completed: !state.completed});
    };

    const confirmarCambios = (confirmar, el) => {
        const result = confirmar ? state : el;
        editar({ ...result, id: element.id});        
        setEdit(false);
    };

    const editarRegistro = () => {
        setEdit(true);
        setState({ ...state, completed: element.completed, name: element.name})
    }

    const renderEdit = () => {
        return (<>
        <span className="offset-md-1 col-2">
        <input value={state.name} onChange={handleChange}/>
        </span>
        <div className="offset-md-2 col-2">
            Complete task
            <input type="checkbox" onChange={handleCompletar} checked={state.completed}/>
        </div>
        <button className="col-1" onClick={() => confirmarCambios(false, element)}>Cancel</button>
        <button className="col-1" onClick={() => confirmarCambios(true)}>Confirm</button>
        </>)
    };

    const renderDefault = () => {
        return <>
        { element.completed ? 
        <   svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check col-1" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
            </svg> : 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-lg col-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
</svg>}
        <span className="col-2">
        {element.name}
        </span>
        <button className=" offset-md-2 col-1" onClick={editarRegistro}>Edit</button>
        <div className="col-2">
            Complete task
            <input type="checkbox" onChange={() => completar(element.id)} disabled={element.completed} checked={element.completed}/>
        </div>
        <button className="col-1" onClick={() => eliminar(element.id)}>delete</button>
        </>
    }

    return (
        <li className="row align-items-center mb-3">
            { isEdit ? renderEdit() : renderDefault()}
            <hr className="bg-danger border-2 border-top mt-2 " />
        </li>
    )
};

ToDoElement.propTypes = {
    element: PropTypes.object.isRequired,
    editar: PropTypes.func.isRequired,
    completar: PropTypes.func.isRequired,
    eliminar: PropTypes.func.isRequired,
};

export default ToDoElement;