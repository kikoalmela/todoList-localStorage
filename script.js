window.onload = function() {
    let taskForm = document.getElementById("taskForm");
    let todoList = document.getElementById("todoList");
    let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    // retrieve from localStorage;
    for (todoObj of savedTodos) {
        addTodo(todoObj.task, todoObj.done);
    }

    // add new todo
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let task = document.getElementById("task").value;
        addTodo(task);
        taskForm.reset();

        // save to localStorage
        savedTodos.push({task: task, done: false});
        updateSavedTodos(savedTodos);
    });

    todoList.addEventListener("click", function(event) {
        let clickedTodo = event.target;
        
        if (clickedTodo.tagName.toLowerCase() === "li") {
            if(clickedTodo.done){
                clickedTodo.done = false;
                clickedTodo.style.textDecoration = "none";
            } else {
                clickedTodo.done = true;
                clickedTodo.style.textDecoration = "line-through";
            }
            for (todo of savedTodos) {
                if (todo.task === clickedTodo.firstChild.nodeValue.trim()) todo.done = clickedTodo.done;
            }
            updateSavedTodos(savedTodos);
        }

        
        if (clickedTodo.tagName.toLowerCase() === "button") {
            clickedTodo.parentNode.remove();
            let cleanedTodos = savedTodos.filter(function(todo) {
                return todo.task !== clickedTodo.previousSibling.nodeValue.trim();
            });
            updateSavedTodos(cleanedTodos);
        }
    });

    let updateSavedTodos = todos => localStorage.setItem("todos", JSON.stringify(todos));

    function addTodo(task, isCompleted = false) {
        let newTodo = document.createElement("li");
        newTodo.innerText = task + " ";
        newTodo.done = isCompleted;
        if (newTodo.done) newTodo.style.textDecoration = "line-through";
        todoList.appendChild(newTodo);

        let doneButton = document.createElement("button");
        doneButton.innerText = "X";
        newTodo.appendChild(doneButton);
    }
}