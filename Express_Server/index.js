var express = require("express");
var app = express();
const port = 3000;
const fs = require("fs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import handle methods
myfileOperations = require("./handle.js");

const myTodosPath = "../CLI_Todos/todo.json";
const path = require("path"); //to concatinate __dirname,anyfile --> to make absolutePath
//path.join(__dirname,"abc.json");

//get my Todos
const myfiletodos = fs.readFileSync(
  "../CLI_Todos/todo.json",
  (encoding = "utf8")
);
const myTodos = JSON.parse(myfiletodos || "[]");
//need to convert the array of object to array of todos
todos = [];
todoIds = [];
myTodos.map((todo) => {
  todos.push(todo.todo);
  todoIds.push(todo.id);
});

console.log(todos);
console.log(todoIds);
// console.log(todoIds.includes(5));;
//data to be sent to the homepage
todoAsHtml =
  "<body style='background-color:gray;'><div style='padding-top:50px;text-align:center;background-color:darkred;width:250px;height:500px;margin:50px auto'>";

todos.forEach((element) => {
  todoAsHtml += `<h1><a href="#" style="text-decoration:none; color:white">${element}</a></h1>`;
});
todoAsHtml += "</div>";

let demoLogger = (req, res, next) => {
  // console.log("Hello from logger");
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();

  let method = req.method;
  let url = req.url;
  let log = `[${formatted_date}] ${method}:${url}`;
  console.log(log);
  next();
};
app.use(demoLogger);
app.get(["/", "/todos"], function (req, res) {
  res.send(todoAsHtml);
  console.log(req.url);
});
app.post("/todos", (req, res) => {
  //code logic for add to todo

  console.log(req.body.todo);  console.log(req.body.todo);

  const { todo } = req.body;
  myfileOperations.addTodo(myTodosPath, todo);
  // res.contentType('application/json');
  return res.status(200).send("todo created successfully");
});

app.patch("/todos/:id", function (req, res) {
  const id = req.params.id;
  const { newtodo } = req.body;
  //code logic for edit certain todo
  myfileOperations.edit(myTodosPath, id, newtodo);
  res.status(200).send(`todo has id -->${id} edited sucessfully`);
});
console.log();
app.delete("/todos/:id", function (req, res) {
  const id = req.params.id;
  console.log(todoIds);
  if (todoIds.length > 0) {
    if (todoIds.includes(parseInt(id))) {
      myfileOperations.deleteTask(myTodosPath, id);
      res.status(200).send(`todo has id -->${id} deleted sucessfully`);
    } else {
      res.send("id not found").sendStatus(400);
    }
  } else {

    res.send("there is no tasks to delete").sendStatus(400);
  }
});

app.listen(port);
console.log(`application started at :http://localhost:${port}`);
