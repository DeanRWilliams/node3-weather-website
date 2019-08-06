const request = require('request')

const geocode = (address,callback) => {
   const urlmapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGVhbm8xOTY5IiwiYSI6ImNqeXU1ajU5NjBhZ3YzbnA4bWN0N3IxaWcifQ.Pfhn3ox7AU1FV-kO9EBD3g&limit=1'

   request({ url:urlmapbox, json:true}, (error, {body}) => {

    if (error){
        callback('Unable to connect to location servcies.',undefined)
    } else if (body.features.length === 0){
        callback('Unable to retrieve location.', undefined)
    } else{
        callback(undefined,{
            location: body.features[0].place_name,
            latitude: body.features[0].center[0],
            longitude: body.features[0].center[1]
        })
    }
})
}

module.exports = geocode