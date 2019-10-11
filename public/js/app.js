const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationMessage = document.querySelector('#location')
const forecastMessage = document.querySelector('#forecast')
let errorrMessage = document.querySelector('#error')

weatherForm.addEventListener('submit', (e) => {
    locationMessage.textContent = "Loading..."
    forecastMessage.textContent = undefined
    e.preventDefault() // Prevent the broser from refreshing after sumbitting
    const location = search.value
    return submit(location)
})

const submit = (address) => {
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationMessage.textContent = undefined
                errorrMessage.textContent = data.error
            } else {
                locationMessage.textContent = data.location
                forecastMessage.textContent = data.forecast
            }

        })
    })
}