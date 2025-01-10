const listContainer= document.querySelector(".list-container ul");
const addBtn = document.querySelector(".add-btn");
const textInput = document.querySelector(".text-input");

const addList = ()=> {
    if(!textInput.value) {
        alert("Please Enter Your Text To Add To the ToDo List");
    } else {
        const todoList = document.createElement("li");
        const key = Date.now().toString();
        todoList.setAttribute("data-key", key);
        console.log(key)
        todoList.innerHTML = `<span class="check-img"><i class="fa-sharp-duotone fa-regular fa-circle"></i></span>${textInput.value} <button class="del-btn"></button>`;
        listContainer.appendChild(todoList);
        textInput.value= "";
        saveTask();

    }
    
}


function saveTask() {
    const tasks = Array.from(listContainer.children).map(task => task.outerHTML);
    localStorage.setItem("lists", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("lists")) || [];
    if(savedTasks.length > 0) {
        listContainer.innerHTML = "";//first clear listontainer for avoid duplication
        savedTasks.forEach(task => {
            const todoList = document.createElement("div");
            todoList.innerHTML = task;
            listContainer.appendChild(todoList.firstChild); //to acces and append the child
        });

    }
}

listContainer.addEventListener("click", (e)=> {
    if(e.target && e.target.nodeName === ("LI") || e.target.nodeName === "SPAN" || e.target.nodeName === "I" || e.target.nodeName === "BUTTON") {
        const listEl = e.target.closest("li"); 
        const span = e.target.closest(" span i"); 
        const delBtn = e.target.closest("button");
        
        /* using closest here because to find nearest element that i click */
        if(span){
            span.classList.toggle("checked");
            listEl.classList.toggle("underline");
        }



        if(delBtn && delBtn.classList.contains("del-btn")) {
            const key = listEl.getAttribute("data-key");
            console.log(key)
            deleteList(key); 
        }
        saveTask();
       
    }

} )
function deleteList(key) {
    const list = document.querySelector(`[data-key="${key}"]`);
    list.remove();
}
textInput.addEventListener("keydown", (e)=> {
    if(e.key ==="Enter") {
        addList();
    }
})
addBtn.addEventListener("click", addList);
window.addEventListener("load", loadTasks);




