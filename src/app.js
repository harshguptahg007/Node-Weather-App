const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port  = process.env.PORT || 3000

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')

//it takes key value pairs in set method to set the template engine.
//the handle bar files must reside in a folder called 'views'. You can customize this also but 
//you need to tell Express where to look for the views
app.set('view engine','hbs')

const viewsPath = path.join(__dirname,'../templates/views')
//here we tell express where to look for the views
app.set('views',viewsPath)

const partialsPath = path.join(__dirname,'../templates/partials')
//to configure the path of the partials
hbs.registerPartials(partialsPath)

//app.use is used to customize the server
//this function basically uploads the complete directory up at the server
//the express.static function takes absolute path
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    //render allows us to render one of our views i.e. to render the handle bar templates
    res.render('index',{
        title : 'Weather app',
        name : 'Harsh Gupta'
    })
    //the name supplied need to match up with the view name in views folder. Here we leave off the file extension
    //the render first finds the view and then it converts it into html and then makes sure that the html 
    //gets back to the requester
    //you can give the 2nd optional parameter to the render method, which can be accessed in the view 
    //whose name you supplied
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About me',
        name : 'Harsh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name : 'Harsh',
        title : 'Help Page'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You need to provide an address as query string'
        })
    }
    const location = req.query.address
    geocode(location,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                location_error : error
            })
        }
        forecast(latitude, longitude, (error,forecastData) => {
            if(error){
                return res.send({
                    forecast_error : error
                })
            }
            res.send({
                address : req.query.address,
                location_res : location,
                forecast_res : forecastData
                
            })
        })
    })
})

app.get('/products',(req,res)=>{
    //We can access the query string added to the url using the 'req.query' method.
    if(!req.query.search){
        //this is setup to make the 'search' query string as required.
        return res.send({
            error : 'You must provide a search query string'
        })
    }

    console.log(req.query.search)
    res.send({
        products : []
    })
})

//we can give the pattern here to match for routes in app.get()
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage : 'Help article not found',
        title : 'Page Missing',
        name : 'Harsh Gupta'
    })
})

//this route has to be the last route as it is used for any non supported route
//this route has to be the last route because whenever a request arrives at express, it matches the 
//req sequentially with all the app.get() commands and at last when none matches then this page displays
app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage : 'Page not found',
        title : 'Page Missing',
        name : 'Harsh Gupta'
    })
})

//to start the server up. the server starts as an asynchronous process.
//the first parameter is the port number. 
app.listen(port,()=>{
    console.log('Server is running on port ' + port)
})