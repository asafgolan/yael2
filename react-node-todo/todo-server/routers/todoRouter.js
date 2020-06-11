const { Router } = require('express');
const { readTodos, writeTodos } = require('../db');
const { Todo } = require('../models/Todo');

const todoRouter = Router();

todoRouter.post('/', async (req, res) => {
  console.log('description, date, userId',req.body)
    const { id: userId } =req.body.userId;
    const { description, date } = req.body;
    const todo = new Todo(description, date, req.body.userId);

    const errors = todo.validate();
    if (errors.length) {
        res.status(400).send(errors);
        return;
    }

    const todos = await readTodos();
    todos[todo.id] = todo;
    console.log(todos)
    await writeTodos(todos);

    res.send(todo);
});

todoRouter.put('/', async (req, res) => {
    const { id: userId } = req.user;
    console.log('todos[id]',  req.body)
    const todos = await readTodos();

    todos[req.body.id] = req.body;
    await writeTodos(todos);

    res.send(todos[req.body.id]);
});

todoRouter.get('/:userid', async (req, res) => {
    const userId  = req.params.userid;
      console.log('myTodos', req.body, req.userId);
    const todosDb = await readTodos();
    const todos = Object.values(todosDb);
    const myTodos = todos.filter(todo => todo.userId === userId);

    res.send(myTodos);
});

module.exports = {
    todoRouter
};
