import { API } from "../config";

export const createTodo = (userId, token, todo) => {
    console.log("wtf bro --->" ,todo.getAll('description'), userId)
    return fetch(`${API}/todos`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        },
         body: JSON.stringify({
          "description": todo.getAll('description')[0],
          "date": todo.getAll('date')[0],
          "userId": userId,
        }),
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const getTodos = (userId, token ) => {
  console.log("babababababababababababababbaba     ", userId, token)
    return fetch(`${API}/todos/${userId}`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateIsCompleted = (userId, token,todo) => {
  console.log("babababababababababababababbaba     ", userId, token)
    return fetch(`${API}/todos`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(todo)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
