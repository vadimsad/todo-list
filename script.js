const addButton = document.getElementById("add-item");
const mainInput = document.getElementById("main-input");
const todoItems = document.querySelector(".todo__items");

let checkedArr = [];

function setAttributes(elem, attrs){
    for (let key in attrs){
        elem.setAttribute(key, attrs[key])
    }
}


addButton.addEventListener("click", () => {

    if(mainInput.value == ""){
        alert("Введите текст");
        return;
    }

    createNewTask();

})

function createNewTask(){

    let todo__item = document.createElement("div");
    todo__item.setAttribute("class", "todo__item")
    let todo__item_text = document.createElement("div");
    todo__item_text.setAttribute("class", "todo__item-text")
    let input = document.createElement("input");
    setAttributes(input, {readonly: true, value: mainInput.value})

    todo__item_text.appendChild(input);

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    todo__item.appendChild(checkbox);

    todo__item.appendChild(todo__item_text);

    let todo__button_edit = document.createElement("div");
    todo__button_edit.setAttribute("class", "todo__button-edit");
    let button_edit = document.createElement("button");
    button_edit.setAttribute("type", "submit");
    button_edit.innerText = "Edit";

    todo__button_edit.appendChild(button_edit);
    todo__item.appendChild(todo__button_edit);

    let todo__button_delete = document.createElement("div");
    todo__button_delete.setAttribute("class", "todo__button-delete");
    let button_delete = document.createElement("button");
    button_delete.setAttribute("type", "submit");
    button_delete.innerText = "Delete";

    todo__button_delete.appendChild(button_delete);
    todo__item.appendChild(todo__button_delete);
    todoItems.appendChild(todo__item);
    
    mainInput.value = "";

    checkbox.addEventListener("click", () => {

        checkbox.classList.toggle("checked");

        if(checkbox.classList.contains("checked")){

            if(!checkedArr.includes(todo__item)){
                checkedArr.push(todo__item)
            }

        } else{
            checkedArr = checkedArr.filter(item => item != todo__item);
        }

        if(checkedArr.length > 0 && !document.querySelector(".todo__button-markDone")){

            let todo__button_markDone = document.createElement("button");
            todo__button_markDone.classList.add("todo__button-markDone")
            todo__button_markDone.innerText = "Mark selected as done";

            let todo__button_delete = document.createElement("button");
            todo__button_delete.classList.add("todo__button-delete_check");
            todo__button_delete.innerText = "Delete selected";

            document.querySelector(".todo__items").insertAdjacentElement("afterbegin", todo__button_delete);
            document.querySelector(".todo__items").insertAdjacentElement("afterbegin", todo__button_markDone);

            todo__button_markDone.addEventListener("click", () => {
                for(let task of checkedArr){
                    task.querySelector(".todo__item-text").querySelector("input").classList.add("done");
                }
            })

            todo__button_delete.addEventListener("click", () => {
                for(let task of checkedArr){
                    task.parentElement.removeChild(task);
                    checkedArr = checkedArr.filter(item => item != task);
                }
                if(checkedArr.length == 0) {
                    document.querySelector(".todo__items").removeChild(document.querySelector(".todo__button-markDone"));
                    document.querySelector(".todo__items").removeChild(document.querySelector(".todo__button-delete_check"));
                }
            })

        } else if(checkedArr.length == 0) {
            document.querySelector(".todo__items").removeChild(document.querySelector(".todo__button-markDone"));
            document.querySelector(".todo__items").removeChild(document.querySelector(".todo__button-delete_check"));
        }
    })

    function editHandler(){
        input.classList.toggle("done");
    }

    input.addEventListener("click", editHandler);

    button_edit.addEventListener("click", () => {
        if (input.hasAttribute("readonly")) {
            
            input.removeEventListener("click", editHandler);
            input.classList.remove("done");
            input.style.cursor = "text";
            input.removeAttribute("readonly");
            input.focus();
            button_edit.innerText = "Save";

        } else {

            if(input.value == ""){
                alert("Введите текст");
                return;
            }

            input.addEventListener("click", editHandler)
            input.setAttribute("readonly", "");
            input.style.cursor = "pointer";
            button_edit.innerText = "Edit";
        }
    })

    button_delete.addEventListener("click", () => {

        if(input.parentElement.parentElement.querySelector("input").classList.contains("checked")){
            checkedArr = checkedArr.filter(item => item != input.parentElement.parentElement);
        }

        input.parentElement.parentElement.parentElement.removeChild(input.parentElement.parentElement);

        if(checkedArr.length == 0) {
            document.querySelector(".todo__items").removeChild(document.querySelector(".todo__button-markDone"));
            document.querySelector(".todo__items").removeChild(document.querySelector(".todo__button-delete_check"));
        }
    })
}
