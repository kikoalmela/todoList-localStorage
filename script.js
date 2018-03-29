window.onload = function() {
    let taskForm = document.getElementById("taskForm");
    let todoList = document.getElementById("todoList");

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let task = document.getElementById("task").value;
        let todo = document.createElement("li");
        todo.innerText = task;

        let doneButton = document.createElement("button");
        doneButton.innerText = "X";

        todoList.appendChild(todo);
        todo.appendChild(doneButton);

        taskForm.reset();
    });

    todoList.addEventListener("click", function(event) {

        // console.log(event.target.tagName);
        
        if (event.target.tagName.toLowerCase() === "li") {
            let todoStyle = event.target.style;
            if(todoStyle.textDecoration !== ""){
                todoStyle.textDecoration = "";
            } else {
                console.log("Todo");
                todoStyle.textDecoration = "line-through";
            }
        }
        
        if (event.target.tagName.toLowerCase() === "button") {
            event.target.parentNode.remove();
        }
    });
}