const http = require("http");

const fs = require("fs");
// Create an HTTP server
const hostname = "127.0.0.1";
const port = 3000;
const path = "./index.js";
let homePage = fs.readFileSync("./html/home.html");
let naturePage = fs.readFileSync("./html/nature.html");
let qutesPage = fs.readFileSync("./html/qutes.html");
let notfoundPage = fs.readFileSync("./html/notfound.html");
const myfiletodos = fs.readFileSync(
  "../CLI_Todos/todo.json",
  (encoding = "utf8")
);
const myTodos = JSON.parse(myfiletodos || "[]");
//need to convert the array of object to array of todos
todos = [];
myTodos.map((todo) => {
  todos.push(todo.todo);
});
console.log(todos);
// const todoAsHtml = todos.map(e=>`<h2>${e}</h2>`);

todoAsHtml =
  "<body style='background-color:gray;'><div style='padding-top:50px;text-align:center;background-color:darkred;width:250px;height:500px;margin:50px auto'>";

todos.forEach((element) => {
  todoAsHtml += `<h1><a href="#" style="text-decoration:none; color:white">${element}</a></h1>`;
});
todoAsHtml += "</div";
todoAsHtml +=
  "<br><br><a href='/nature' style='color:green;text-decoration:none;font-weight:bold;font-size:30px'>go to nature</a>";
todoAsHtml +=
  "<br><br><a href='/quotes' style='color:green;text-decoration:none;font-weight:bold;font-size:30px'>go to quotes</a></body>";

const imgs_regex = new RegExp("/images/*");
const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
    case "/home":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(todoAsHtml.toString());
      break;
    case "/nature":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(naturePage);
      break;
    case "/quotes":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(qutesPage);
      break;
    // case '/todos.js':
    //     res.setHeader('Content-Type', 'text/html');
    //     res.end(myTodos.toString());
    //     break;
    default:
      if (imgs_regex.test(req.url)) {
        res.setHeader("Content-Type", "text/html");
        let myimg = fs.readFileSync("." + req.url);
        res.end(myimg);
      } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(notfoundPage);
      }
      break;
  }
});
server.listen(port, hostname, () => {
  console.log(`server is running at http://${hostname}:${port}`);
});
