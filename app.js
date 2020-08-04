document.getElementById('currentDay').innerHTML = `
    ${moment().format('dddd, MMMM Do')}
`
var index = 0 
var indi = 0
var min = 0
var max = 7



document.getElementById('search').addEventListener('click', event => {
    event.preventDefault()
    document.getElementById('forecast').innerHTML = ``

    let city = document.getElementById('city').value
    let storeCity = city
    var lon
    var lat

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b4c6ceb49e661dca4a6e6b6ff332eff1`)
    .then(res => {
        lon = res.data.coord.lon
        lat = res.data.coord.lat
        document.getElementById('weather').innerHTML = `
        <h1>${res.data.name}</h1>
        <img src="http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png">
        <h3>Weather: ${res.data.weather[0].description}</h3>
        <h4>Temperature: ${res.data.main.temp}°F</h4>
        <h4>Humidity: ${res.data.main.humidity}</h4>
        <h4>Wind Speed: ${res.data.wind.speed}</h4>
        <h4 id="uv"></h4>
        `
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=b4c6ceb49e661dca4a6e6b6ff332eff1`)
        .then(res => {
            document.getElementById('uv').innerHTML = `
            <h4 id="test">UV Index: <span id="memes">${res.data.current.uvi}<span></h4>
            `
            let uvIndex = res.data.current.uvi
            if (parseInt(uvIndex) < 3) {
                document.getElementById('memes').classList.add('favorable')
            } else if (parseInt(uvIndex) < 6) {
                document.getElementById('memes').classList.add('moderate')
            } else {
                document.getElementById('memes').classList.add('severe')
            }

        })
        .catch(err => {
            console.log(err)
        })

         // document.getElementById(`city${i}`).innerHTML = localStorage.getItem('city')

        //localStorage.setItem('history', city)
        //if statement later to delete after a certain amount of searches
        //console.log(localStorage[0])

        localStorage.setItem(index, city)
        var key = localStorage.key(indi)
        console.log(key)
        // $(`#city${index}`).val(localStorage.getItem(key))
        index++
        indi++

        for (i = min, j = 0; j < 7; i++, j++) {
            document.getElementById(`city${j}`).textContent = localStorage.getItem(i)
        }
        

        if (localStorage.length > 7) {
            localStorage.removeItem(min)
            min++
            max++
        }

        for (i = min, j = 0; j < 7; i++, j++) {
            document.getElementById(`city${j}`).textContent = localStorage.getItem(i)

        }
        
    })
    .catch(err => {
        console.log(err)
    })

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=b4c6ceb49e661dca4a6e6b6ff332eff1`)
    .then(res => {
        let forecast = res.data.list
        for (let i = 6; i < forecast.length; i += 8) {
            let forecastElem = document.createElement('div')
            forecastElem.innerHTML = `
            <div class="col text-center">
                <h6>${moment(forecast[i].dt_txt).format("MMM Do")}<h6>
                <h6>Weather: ${forecast[i].weather[0].description}</h6>
                <img src="http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}@2x.png">
                <h6>Temperature: ${forecast[i].main.temp}°F</h6>
                <h6>Humidity: ${forecast[i].main.humidity}</h6>
                <h6>Wind Speed: ${forecast[i].wind.speed}</h6>
            </div>
            `
            document.getElementById('forecast').append(forecastElem)
        }
    })
    .catch(err => {
        console.log(err)
    })
})

for (i = min, j = 0; j < 7; i++, j++) {
    document.getElementById(`city${j}`).textContent = localStorage.getItem(i)

}

$('.location').click(function () {
    let city = $(this).text()
    event.preventDefault()
    document.getElementById('forecast').innerHTML = ``

    let storeCity = city
    var lon
    var lat

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b4c6ceb49e661dca4a6e6b6ff332eff1`)
    .then(res => {
        lon = res.data.coord.lon
        lat = res.data.coord.lat
        document.getElementById('weather').innerHTML = `
        <h1>${res.data.name}</h1>
        <img src="http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png">
        <h3>Weather: ${res.data.weather[0].description}</h3>
        <h4>Temperature: ${res.data.main.temp}°F</h4>
        <h4>Humidity: ${res.data.main.humidity}</h4>
        <h4>Wind Speed: ${res.data.wind.speed}</h4>
        <h4 id="uv"></h4>
        `
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=b4c6ceb49e661dca4a6e6b6ff332eff1`)
        .then(res => {
            document.getElementById('uv').innerHTML = `
            <h4 id="test">UV Index: <span id="memes">${res.data.current.uvi}<span></h4>
            `
            let uvIndex = res.data.current.uvi
            if (parseInt(uvIndex) < 3) {
                document.getElementById('memes').classList.add('favorable')
            } else if (parseInt(uvIndex) < 6) {
                document.getElementById('memes').classList.add('moderate')
            } else {
                document.getElementById('memes').classList.add('severe')
            }

        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=b4c6ceb49e661dca4a6e6b6ff332eff1`)
    .then(res => {
        let forecast = res.data.list
        for (let i = 6; i < forecast.length; i += 8) {
            let forecastElem = document.createElement('div')

            forecastElem.innerHTML = `
            <div class="col text-center">
                <h6>${moment(forecast[i].dt_txt).format("MMM Do")}<h6>
                <h6>Weather: ${forecast[i].weather[0].description}</h6>
                <img src="http://openweathermap.org/img/wn/${forecast[i].weather[0].icon}@2x.png">
                <h6>Temperature: ${forecast[i].main.temp}°F</h6>
                <h6>Humidity: ${forecast[i].main.humidity}</h6>
                <h6>Wind Speed: ${forecast[i].wind.speed}</h6>
            </div>
            `
            document.getElementById('forecast').append(forecastElem)
        }
    })
    .catch(err => {
        console.log(err)
    })
})