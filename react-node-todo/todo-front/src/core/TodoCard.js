import React from "react";
import {updateIsCompleted} from "../user/api";



const Card = ({ todo , id, token, updateTodos }) => {
  console.log('todo', todo)

    const isCompleted =()=>{
        console.log('todo.isCompleted', todo.isComplete)
        if(!todo.isComplete){
            return <button  onClick={clickSubmit} className="btn btn-outline-primary col-4 mt-2 mb-2">mark completed</button>
        }else{
              return <button onClick={clickSubmit} className="btn btn-outline-info col-4 mt-2 mb-2">mark not completed</button>
        }
    }

    const clickSubmit = event => {
        event.preventDefault();
        todo.isComplete = !todo.isComplete;
        updateIsCompleted(id, token, todo).then(data => {

            if (data.error) {
                console.log('errrrororororororor')
            } else {

                updateTodos(id, token)
            }
        });

    };

    return (
        <div className=" mb-2">
            <div className="card">
                <h6>{todo.description}</h6>
                <p>due date : {todo.date}</p>

                {isCompleted()}
            </div>
        </div>
    );
};

export default Card;
