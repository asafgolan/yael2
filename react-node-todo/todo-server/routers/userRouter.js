const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { readUsers , writeUsers} = require('../db');

const userRouter = Router();

userRouter.post('/login', async (req, res) => {
    const { id, password } = req.body;
    const users = await readUsers();
    if (!users[id] || users[id].password !== password) {
        res.status(401).send({ success: false, msg: 'user id and password don\'t match' });
        return;
    }

    const token = generateToken(users[id]);
    
    res.cookie('t', token,{expire: new Date() +9999});
    res.send({ success: true, msg: 'welcome back!', token , id });
});

userRouter.post('/signup', async (req, res) => {
  const { id, password } = req.body;
  const users = await readUsers();
  if (users[id] ) {
      res.status(401).send({ success: false, msg: 'user already exsits' });
      return;
  } else {
    users[id] = {};
    users[id].name = id;
    users[id].password = password;
    req.user =id;
    await writeUsers(users)
    if(users[id]){
      res.status(200).send({ success: true, msg: 'user O.K ' });
      return;
    }else{
        res.status(200).send({ success: false, msg: 'user BAD ' });
        return;
    }

  }

});

userRouter.get('/signout', async (req, res) => {
  res.clearCookie('t');
  res.send({msg:"logout successfully ..."})

});

function generateToken(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
}

module.exports = {
    userRouter
}
