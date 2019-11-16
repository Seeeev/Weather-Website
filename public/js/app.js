// Dynamicaly change the weather icons based on location given
const updateIcons = (data) => {
    const iconList = {
        iconDay1: document.getElementsByTagName("canvas")[0].classList[1],
        iconDay2: document.getElementsByTagName("canvas")[1].classList[1],
        iconDay3: document.getElementsByTagName("canvas")[2].classList[1],
        iconDay4: document.getElementsByTagName("canvas")[3].classList[1],
        iconDay5: document.getElementsByTagName("canvas")[4].classList[1],
        iconDay6: document.getElementsByTagName("canvas")[5].classList[1],
        iconDay7: document.getElementsByTagName("canvas")[6].classList[1]
    }

    document.getElementsByTagName("canvas")[0].classList.remove(iconList.iconDay1);
    document.getElementsByTagName("canvas")[0].classList.add(data.forecast.currentIcon);

    document.getElementsByTagName("canvas")[1].classList.remove(iconList.iconDay2);
    document.getElementsByTagName("canvas")[1].classList.add(data.forecast.forecast0[3]);

    document.getElementsByTagName("canvas")[2].classList.remove(iconList.iconDay3);
    document.getElementsByTagName("canvas")[2].classList.add(data.forecast.forecast1[3]);

    document.getElementsByTagName("canvas")[3].classList.remove(iconList.iconDay4);
    document.getElementsByTagName("canvas")[3].classList.add(data.forecast.forecast2[3]);

    document.getElementsByTagName("canvas")[4].classList.remove(iconList.iconDay5);
    document.getElementsByTagName("canvas")[4].classList.add(data.forecast.forecast3[3]);

    document.getElementsByTagName("canvas")[5].classList.remove(iconList.iconDay6);
    document.getElementsByTagName("canvas")[5].classList.add(data.forecast.forecast4[3]);

    document.getElementsByTagName("canvas")[6].classList.remove(iconList.iconDay7);
    document.getElementsByTagName("canvas")[6].classList.add(data.forecast.forecast5[3]);
}



// Display icons in the UI

const showIcons = () => {
    var icons = new Skycons({
            monochrome: false
        }),
        list = [
            "clear-day",
            "clear-night",
            "partly-cloudy-day",
            "partly-cloudy-night",
            "cloudy",
            "rain",
            "sleet",
            "snow",
            "wind",
            "fog"
        ],
        i;

    for (i = list.length; i--;) {
        var weatherType = list[i],
            elements = document.getElementsByClassName(weatherType);
        for (e = elements.length; e--;) {
            icons.set(elements[e], weatherType);
        }
    }

    icons.play();
}





const getDate = unixTimestamp => {
    const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const dayName = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayString = date.getDay();
    const stringDate = `${dayName[dayString]}, ${monthName[month]} ${day}, ${year}`;
    return stringDate;
};

const updateSubTextContent = (forecast) => {
    const subForecastLenght = document.getElementsByClassName("sub-forecasts").length;
    let i = 0
    for (let key in forecast) {
        if (key != 'currentTime' && key != 'currentTemperature' && key != 'currentSummary' && key != 'currentIcon' && key != 'currentPrecipProbability') {
            const content = document.getElementsByClassName("sub-forecasts").item(i);
            content.querySelector("h3").innerHTML = dateToDay(forecast[key][0]);
            content.querySelector("h2").innerHTML = forecast[key][1] + '°C - ' + forecast[key][2] + '°C';
            i++
        }
    }

};

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // Prevent the browser from refreshing after sumbitting
    const location = search.value
    return submit(location)
})

const submit = (address) => {
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //locationMessage.textContent = undefined
                alert(data.error)
                //errorrMessage.textContent = data.error
                //error_.textContent = data.error
            } else {
                console.log(data)
                updateMainTextContent(data)
                updateSubTextContent(data.forecast)
                updateIcons(data)
                showIcons();

            }

        })
    })
}
const updateMainTextContent = ({
    location,
    forecast
}) => {
    // Update the address, date, temp, and summary
    const content = document.getElementsByClassName("location-info").item(0);
    const forecast_1_address = content.querySelector("#forecast-1-address").innerHTML = location;
    const forecast_1_date = content.querySelector("#forecast-1-date").innerHTML = getDate(forecast.currentTime);
    const forecast_1_temperature = content.querySelector("#forecast-1-temperature").innerHTML = forecast.currentTemperature + '°C';
    const forecast_1_summary = document.getElementsByClassName("summary").item(0).querySelector("h2").innerHTML = forecast.currentSummary;
};

const dateToDay = (unixTimeStamp) => {
    const dateToDay = getDate(unixTimeStamp).split("")
    const day = `${dateToDay[0]}${dateToDay[1]}${dateToDay[2]}`.toUpperCase()
    return day
}