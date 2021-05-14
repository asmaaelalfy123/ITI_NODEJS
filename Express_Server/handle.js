const fs = require("fs"); 
//readFileSync
const readFile = (filePath, encoding = "utf-8") => {
    let data = fs.readFileSync(filePath, { encoding });
    return data;
}
//writeFileSync
function writeFile(filePath, data){
    fs.writeFileSync(filePath, JSON.stringify(data))
}

// //listMyTodos
// function listTodos(path) {	
//      let data = readFile(path);
//      //convert my json into object
//      data = JSON.parse(data || "[]");

//      if(data.length > 0){
// 		data.forEach(function (task){
//             console.log("\x1b[93m\x1b[4mTask list:\x1b[24m");
// 			console.log(task.id,task.todo);
// 		});
		
// 	}else{
// 		console.log("\x1b[91mNo Tasks !");
// 	}
// }

//add new todo
function addTodo(path, todo){
    const myFile = readFile(path);
    todos = JSON.parse(myFile || "[]");
    let lastId = todos.length > 0 ?  todos.slice(-1)[0].id : 0;
    todos.push({id:lastId+1, todo: todo});
    console.log(todos);
    writeFile(path, todos)
}
function edit(path, id, newTodo ) {
    let todos = readFile(path);
    todos = JSON.parse(todos || "[]");
    //want to get the specific id and change the value of ist todo
    for (var i in todos) {
        // console.log(i);
      if (todos[i].id == id) {
         todos[i].todo = newTodo; //updating the value of the todo
         writeFile(path, todos)
         break; 
      }
    }
 }
function deleteTask(path, id){
    let todos = readFile(path);
     todos = JSON.parse(todos || "[]");

     if(todos.length > 0){
            //data execlude item

             let data = todos.filter(function(item){
                return item.id != id;
             })
                writeFile(path, data)
	}else{
		console.log("No Tasks for delete .. !");
	}
}
module.exports={
    addTodo,
    edit,
    deleteTask
}