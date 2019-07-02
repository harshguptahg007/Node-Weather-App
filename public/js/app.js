//this is client side java script that will run in the browser.
console.log('Client side javascript up and running')

//the first argument is the url from where we are trying to fetch from
//fetch function fires an asynchronous operation here
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    //'then' is like the Flutter's then. It waits for the response to come and then it executes it's code
    response.json().then((data) => {
        //we call json function on response to parse the response
        //data is the parsed json which comes from the response
        console.log(data)
    })
})

//this command is used to select the elements from html page by passing in their names
//this command which selected the form is stored in Javascript usable form
//query selector matches the first occurence of the text provided here. Here it will continue 
//to search the 'form' text till the first form text is found.
const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

//to target html elements by class name
//document.querySelector(.className)

//to target html elements by their id
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//we want to listen that whether the button was clicked or not. For that we add a listener 
//to the selected form portion
//the first argument is the event that we want to listen and the 2nd argument is the callback 
//which will be triggered everytime when that event occurs.
weatherForm.addEventListener('submit',(e)=>{
//the default behaviour of form is to reload the page when the form is clicked. We don't want that. To 
//stop that we call 'e.preventDefault()'
//e is the event that we receive when the event occurs for which we have the listener
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value
    //search.value gives what the user types in the input field

    fetch('/weather?address=' + location).then((response)=>{
    response.json().then((data) => {
        console.log(data)
        if(data.location_error) {
            messageOne.textContent = data.location_error
        }else if(data.error){
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location_res
            messageTwo.textContent = data.forecast_res
        } 
    })
    })
})