const request = require('request')

const forecast = (latitude,longitude,callback) => {

const url = 'https://api.darksky.net/forecast/aadd8878cc77863c15dc0c5d69b1cde2/' + latitude + ',' + longitude + '?units=si'

request({ url: url, json:true }, (error, {body}) => {

    if (error){
        callback( 'Unable to connect to weather service.', undefined)
    } else if (body.error)
    {
        callback( ' Error retrieving location.', undefined)
    } else{
        callback( undefined, {
            temperature: body.currently.temperature,
            rainprobability: body.currently.precipProbability,
            forecast: 'It is currently ' + body.currently.temperature + ' degrees and there is ' + body.currently.precipProbability + '% chance of rain',
            temperatureHigh: 'High for the Day ' + body.daily.data[0].temperatureHigh + ' degrees',
            temperatureLow: 'Low for the Day ' + body.daily.data[0].temperatureLow + ' degrees'
        })
        
    }
})
}

module.exports = forecast