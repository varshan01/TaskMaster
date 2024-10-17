//selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')



//event listeners
todoButton.addEventListener('click',addTodo)
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('change',filterTodo)
document.addEventListener("DOMContentLoaded",getTodos)

//functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();

    //Todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    //create li
    const newTodo = document.createElement("li")
    newTodo.innerText=todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)
    //add todo to local storage
    saveLocaltodos(todoInput.value);
    //create mark button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton)
        //create trash button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton)

    //append to todolist
    todoList.appendChild(todoDiv)

    //cleear todoInput value
    todoInput.value=""

}

function deleteCheck(e){
    const item = e.target;
    //delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        })
        
    }
    //checkmark
    if(item.classList[0]==='complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTodo(e){
    const todos = todoList.children;
    Array.from(todos).forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex"
                break
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }else{
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex"
                }else{
                    todo.style.display = "none"
                }
                break;
        }
    })
}

function saveLocaltodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo)
    localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")
        //create li
        const newTodo = document.createElement("li")
        newTodo.innerText=todo
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo)
    
        //create mark button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton)
            //create trash button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton)
    
        //append to todolist
        todoList.appendChild(todoDiv)

    })


}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos))
}