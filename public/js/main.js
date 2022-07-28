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
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
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

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markComplete', {
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