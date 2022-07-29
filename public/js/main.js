const deleteBtn = document.querySelectorAll('.fa-trash')//creating variable and assigning it to a selection of all elements with class .fa-trash
const item = document.querySelectorAll('.item span')//creating variable and assigning it to a selection of span tags inside of a parent with class .item 
const itemCompleted = document.querySelectorAll('.item span.completed')//creating variable and assigning it to a selection of span tags with a class of "completed" inside of a parent with class .item 

Array.from(deleteBtn).forEach((element)=>{ //creating an array from our selection and starting a loop
    element.addEventListener('click', deleteItem)//add event listener to the current item that waits for a click and then calls a function called deleteItem
})

Array.from(item).forEach((element)=>{//creating an array from our selection and starting a loop
    element.addEventListener('click', markComplete)//add event listener to the current item that waits for a click and then calls a function called markComplete
})

Array.from(itemCompleted).forEach((element)=>{//creating an array from our selection and starting a loop
    element.addEventListener('click', markUnComplete)//add event listener to ONLY completed items
})

async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText//looks inside of the list item and grabs only the inner text within the list span
    try{
        const response = await fetch('deleteItem', { //creates a response variable that waits on a fetch to get data from the result of deletItem route
            method: 'delete', // sets the CRUD method for route
            headers: {'Content-Type': 'application/json'}, //sepecifying the type of content expected, which is JSON  
            body: JSON.stringify({ // declare the message being passed, and stringify the content
              'itemFromJS': itemText //setting the content of the body to the innner text of the list item, and naming it ItemFromJS
            })
          })
        const data = await response.json() // waiting on JSON from response to be converted
        console.log(data)//log result to the console
        location.reload()// reload the page to update what is displayed

    }
    catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText // grab the inner text within the list span from inside of the list item
    try{
        const response = await fetch('markComplete', { // creates response variable that waits on a fetch to grab the data from result of markComplete rout 
            method: 'put', // sets UPDATE the CRUD method for route
            headers: {'Content-Type': 'application/json'}, // set the type of content expected (JSON format)
            body: JSON.stringify({ //declare the message being passed, then stringify the content
                'itemFromJS': itemText // setting the content of the body to the innner text and naming it itemFromJS
            })
          })
        const data = await response.json() //create data variable that waits for JSON to be converted to JS object
        console.log(data)// log result to the console
        location.reload() // reload the page to update what is displayed

    }catch(err){//if an error occurs, pass the error into the catch block
        console.log(err)//log the error to the console
    }
}

async function markUnComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}