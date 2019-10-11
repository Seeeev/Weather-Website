const request = require('request')

//Get longitude and latitude based on the address / location given by the user.
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2V2YWJhbnRlMDkiLCJhIjoiY2sxNTJydXZ4MGkzYTNpbGc4MjdseXg1MCJ9.ksAvMo79P3Y11ia0mif1SA&limit=1`

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', udefined)
        } else if (response.body.features.length === 0) {
            callback('No such location, please try again.', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                placeName: response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode