const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/ecd73148864c4fcef94692cc25540b7b/${latitude},${longitude}?units=si`

    request({url, json : true},(error, {body}) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            const currentTemp = body.currently.temperature
            const precipitation = body.currently.precipProbability

            console.log(body.daily.data[0])
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + currentTemp + ' degrees out. The high today is '+body.daily.data[0].temperatureHigh+' with a low of '+ body.daily.data[0].temperatureLow+'. There is a ' + precipitation + '% chance of rain.')
        }
    })
}

module.exports = forecast