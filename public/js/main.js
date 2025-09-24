
async function formTable(){
    const response = await fetch('/table', {
        method: 'GET'
    })
    const appdata = await response.json()

    const getFields = await fetch('/fields', {
        method: 'GET'
    })

    const fields = await getFields.json()


    let element = document.getElementById("tableInsert");
    
    let tableData = "<thead><tr>"

    for (let i = 0; i < fields.length; i++){
        if (fields[i] != "password"){
            tableData = tableData + "<th>" + fields[i] +"</th>"
        }
    }

    tableData = tableData + "</tr></thead><tbody><tr>"

    for (let i = 0; i < fields.length; i++)
        if (fields[i] != "password"){
            tableData = tableData + "<td>" + appdata[fields[i]] +"</td>"
        }

    tableData = tableData + "</tr></tbody>";

    element.innerHTML = tableData;
    
}


window.onload = function(){
    formTable();
    const addForm = document.getElementById("add")
    addForm.addEventListener("submit", async function(event) {
        event.preventDefault()  

        const field = event.target.field.value,
              toAdd = event.target.toAdd.value,
              json = {field, toAdd},
              body = JSON.stringify(json)

        const response = await fetch("/add", {
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body
        })

        formTable();
        addForm.reset();

    });
    
    const updateForm = document.getElementById("update")
    updateForm.addEventListener("submit", async function(event) {
        event.preventDefault()  

        const field = event.target.field.value,
              toUpdate = event.target.toUpdate.value,
              json = {field, toUpdate},
              body = JSON.stringify(json)

        const response = await fetch("/update", {
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body
        })

        const results = await response.json();

        if(!results.success){
            alert("Please enter a valid field!");
        }

        formTable();
        updateForm.reset();

    });

    const deleteForm = document.getElementById("remove")
    deleteForm.addEventListener("submit", async function(event) {
        event.preventDefault()  

        const field = event.target.field.value,
              json = {field},
              body = JSON.stringify(json)

        const response = await fetch("/remove", {
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body
        })

        const results = await response.json();

        if(!results.success){
            alert("Please enter a valid field!");
        }

        formTable();
        deleteForm.reset();
    });


}