let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");



form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("Button Clicked")

    Validation()
})


let Validation = () => {
    if(textInput.value === ""){
        msg.innerHTML = "Blank cannot be blank"
    }else{
        console.log("sucesses")
        msg.innerHTML = ""
        acceptData()
        add.setAttribute("data-bs-dismiss", "modal")
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
}

let databank = [];
 let acceptData = () => {
    databank.push({
        text: textInput.value,
        date: dateInput.value,
        area: textarea.value,
    })
   
    localStorage.setItem("data", JSON.stringify(databank))

    console.log(databank)
    createForm()
}

let createForm = () => {
    tasks.innerHTML = "";
    databank.map((x,y) => {
        return tasks.innerHTML += `
        <div id=${y}>
         <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.area}</p>
    
        <span class="options">
          <i onClick= "editForm(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
          <i onClick ="deleteForm(this);createTask()" class="fas fa-trash-alt"></i>
        </span>
        </div>`;
    })
    
    resetForm();
}

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
}

let deleteForm = (e) => {
    e.parentElement.parentElement.remove()
    databank.splice(e.parentElement.parentElement.remove(), 1)
    localStorage.setItem("data", JSON.stringify(databank))
    console.log(databank)
};

let editForm = (e) => {
    let selTask = e.parentElement.parentElement;

    textInput.value = selTask.children[0].innerHTML;
  dateInput.value = selTask.children[1].innerHTML;
  textarea.value = selTask.children[2].innerHTML;
    deleteForm(e)
};

(() =>{
    databank = JSON.parse(localStorage.getItem("data")) || [];

    createForm()
})();