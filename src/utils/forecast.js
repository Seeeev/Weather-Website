const request = require('request')

const forecast = (geolocation, callback) => {
    const url = `https://api.darksky.net/forecast/5fe96bc5d249dd92ab32df6522519869/${geolocation.latitude},${geolocation.longitude}?units=si`
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.error) {
            callback(`Error ${response.body.code}. ${response.body.error}`, undefined)
        } else {
            const currentTemperature = response.body.currently.temperature
            const currentPrecipProbability = response.body.currently.precipProbability
            callback(undefined, `Its currently ${currentTemperature} degrees out. There is ${currentPrecipProbability}% chance of rain.`)
        }
    })
}

module.exports = forecast