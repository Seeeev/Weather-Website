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
            const forecastData = {
                // Todays forecast
                currentTime: response.body.currently.time,
                currentTemperature: response.body.currently.temperature,
                currentSummary: response.body.currently.summary,
                currentIcon: response.body.currently.icon,
                currentPrecipProbability: response.body.currently.precipProbability,
            }

            for (let i = 0; i < 6; i++) {
                // Forecast for the following days
                const initForecastData = []
                const timeList = response.body.daily.data[i + 1].time
                const tempListMin = response.body.daily.data[i + 1].temperatureMin
                const tempListMax = response.body.daily.data[i + 1].temperatureMax
                const iconList = response.body.daily.data[i + 1].icon
                initForecastData.push(timeList, tempListMin, tempListMax, iconList)
                forecastData['forecast' + i] = initForecastData
            }
            console.log(forecastData)


            //callback(undefined, `Its currently ${forecastData.currentTemperature} degrees out. There is ${forecastData.currentPrecipProbability}% chance of rain. ${forecastData.currentSummary} for today. `)
            callback(undefined, forecastData)
        }
    })
}

module.exports = forecast