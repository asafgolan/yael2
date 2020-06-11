import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import AddTodo from '../user/AddTodo';
import {getTodos} from './api';
import TodoCard from '../core/TodoCard'


  const UserDashboard = () => {

      const  { id, token }  = isAuthenticated();
      const [todos, setTodos] = useState([]);
      const [error, setError] = useState(false);


      useEffect(()=>{

        getTodos(id,token).then(data=>
          {
            if(data){
                console.log("hahahahahha", data);
                setTodos(data);
            }
          }
        )
      },[])

      return (
          <Layout
              title="Todos"
              description= "Manage your todo list"
              className="container"
          >
          <div className="card mb-5">
              <h3 className="card-header"> {id} todos</h3>
              <AddTodo updateTodos={getTodos}/>
          </div>
              <div className="card mb-5">
                  <h3 className="card-header"> {id} todos history</h3>

                  {todos.map((todo, i)=>(

                    <TodoCard key={i} todo={todo} id={id} token={token} updateTodos={getTodos}/>
                  ))}
              </div>
          </Layout>
      );
  };


export default UserDashboard;
