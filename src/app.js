const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define Directories for resources
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Specific Handlebars settings
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Dean Williams'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Dean Williams'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Dean Williams'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an Address'
        })
    }
    geocode( req.query.address, (error,{longitude,latitude,location} = {})=>{
        if (error)
        {
            return res.send({
                error: 'Unable to return Forecast for Address provided.'
            })
        }
      
        forecast(longitude, latitude, (error, forecastdata) => {
            if (error)
            {
                return res.send({
                    error: error
                })
            }

            res.send({
                error: error,
                location: location,
                address: req.query.address,
                forecast: forecastdata.forecast
            })
          })
    } )
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404 Page',
        name: 'Dean Williams',
        text: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: '404 Page',
        name: 'Dean Williams',
        text: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
