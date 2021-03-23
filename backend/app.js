const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const corsOptions= {
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
};

app.use(bodyParser.json({limit: '15mb'}));
app.use(bodyParser.urlencoded({
    limit: '15mb',
    extended: true
}));


app.use(cors(corsOptions));

app.get('/users', (req, res) => {
 const usersObj = fs.readFileSync('users.json');
 const users = JSON.parse(usersObj);
  res.json(users)
});

app.get('/users/:id', (req, res) => {
   const usersObj = fs.readFileSync('users.json');

   const users = JSON.parse(usersObj);
   
   const user = users.filter((user) => user.id == req.params.id);
   return res.json(user);
})

app.post('/register',(req, res) => {
   try {
       console.log(req)
       const email = req.body.email;
       const password = req.body.password;
       const name = req.body.name;
       const newUser = {
           password: password,
           email: email,
           name: name
       };
       const usersObj = fs.readFileSync('users.json');
       const users = JSON.parse(usersObj);
       if(users[users.length-1]) {
        newUser.id = users[users.length-1].id+1;
       } else {
        newUser.id = 1;
       }
       
       users.push(newUser);
       fs.writeFileSync('users.json', JSON.stringify(users));
       return res.json(newUser);
   } catch (e) {
       console.log(e)
       return res.json({
           message: "Invalid object"
       })
   }
});

app.post('/users/description/:id',(req, res) => {
   try {
       console.log(req)
       const text = req.body.text;
       const usersObj = fs.readFileSync('users.json');
       let users = JSON.parse(usersObj);
        
       let user = users.find((user) => user.id == req.params.id);
       users = users.filter((user) => user.id != req.params.id);
       user.description = text;
       users.push(user);
       fs.writeFileSync('users.json', JSON.stringify(users));
       return res.json(user);
   } catch (e) {
       console.log(e)
       return res.json({
           message: "Invalid object"
       })
   }
});


app.post('/login', (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const usersObj = fs.readFileSync('users.json');
        let users = JSON.parse(usersObj);
         
        let user = users.find((user) => (user.email == email && user.password == password));
        return res.json(user);
    } catch(e) {

    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


