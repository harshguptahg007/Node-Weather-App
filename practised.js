app.get('/help',(req,res)=>{
    res.send([{
        name : 'Harsh'
    },{
        name:'Amritansh'
    }]) 
})

app.get('/about',(req,res)=>{
    res.send('<h1>About</h1>')
})

//this lets us configure what the server should do when someone tries to get a resource of a specific url
//this 'get' function takes two arguments, first is the route and the second is the function. the function has 
//2 parameters, request and response
app.get('',(req,res)=>{
    //the below method allows us to send something back to the requester
    res.send('<h1>Weather</h1>')
})

//it takes key value pairs in set method to set the template engine.
//the handle bar files must reside in a folder called 'views'. You can customize this also but 
//you need to tell Express where to look for the views
app.set('view engine','hbs')

{/* <body>
{{!-- <h1>{{title}}</h1> --}}
<!--above is the code for accessing the handle bar object received from the render method-->
<p>Created by {{name}}</p>
</body> */}


///THIS CODE WAS FROM APP.JS IN THE JAVASCRIPT FOLDER
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