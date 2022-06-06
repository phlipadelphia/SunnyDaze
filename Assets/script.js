let searchText = document.querySelector('#searchfield');
let searchButton = document.querySelector('#searchbutton');
let cityheader = document.querySelector('#cityheader');
let tempnow = document.querySelector('#tempnow');
let windnow = document.querySelector('#windnow');
let humidnow = document.querySelector('#humidnow');
let UVNow = document.querySelector('#UVnow');
let currentCard = document.querySelector('#currentcard');
let fiveDay = document.querySelector('#fivedayforecast');
let maincol = document.querySelector('#maincol')
let previousSearch0 = document.querySelector('#recentsearch0')

let city = '';
let currentTime = '';
previousSearch0.textContent = localStorage.getItem('previoussearch0')
console.log(previousSearch0.innerHTML)

previousSearch0.addEventListener('click', function() {
  city = previousSearch0.innerHTML
  
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + '&units=imperial&appid=ea7c6aed441b6888e5a12f5ec4d6ed26')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    lat = data.coord.lat;
    long = data.coord.lon;
    cityheader.textContent = data.name
    currentCard.setAttribute('style', 'display:block')
    maincol.setAttribute('style', 'display:block')

    console.log(lat)
    console.log(long)
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=alerts&units=imperial&appid=ea7c6aed441b6888e5a12f5ec4d6ed26')
      .then(response => response.json())
      .then(data => {
        console.log(data)

        tempnow.textContent = "Temperature: " + data.current.temp + ' Farenheit'
        windnow.textContent = "Wind Speed: " + data.current.wind_speed + 'mph'
        humidnow.textContent = "Humidity: " + data.current.humidity + "%"
        UVNow.textContent = "UV Index : " + data.current.uvi

        for (i = 1; i < 6; i++) {
          console.log(data.daily[i])
          console.log("date" + i)
          currentTime = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
          document.querySelector("#date" + i).textContent = currentTime
          document.querySelector("#temp" + i).textContent = 'Temp: ' + data.daily[i].temp.day + 'F'
          document.querySelector('#humid' + i).textContent = 'Humidity: ' + data.daily[i].humidity + '%'
          document.querySelector('#wind' + i).textContent = 'Wind Speed: ' + data.daily[i].wind_speed + "MPH"

        }
      })
  })

})

searchButton.addEventListener('click', function () {
  city = searchText.value
  console.log(city)

  localStorage.setItem('previoussearch0', city)
  previousSearch0.textContent = localStorage.getItem('previoussearch0')

    searchText.value = '';

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + '&units=imperial&appid=ea7c6aed441b6888e5a12f5ec4d6ed26')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        lat = data.coord.lat;
        long = data.coord.lon;
        cityheader.textContent = data.name
        currentCard.setAttribute('style', 'display:block')
        maincol.setAttribute('style', 'display:block')

        console.log(lat)
        console.log(long)
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&exclude=alerts&units=imperial&appid=ea7c6aed441b6888e5a12f5ec4d6ed26')
          .then(response => response.json())
          .then(data => {
            console.log(data)

            tempnow.textContent = "Temperature: " + data.current.temp + ' Farenheit'
            windnow.textContent = "Wind Speed: " + data.current.wind_speed + 'mph'
            humidnow.textContent = "Humidity: " + data.current.humidity + "%"
            UVNow.textContent = "UV Index : " + data.current.uvi

            for (i = 1; i < 6; i++) {
              console.log(data.daily[i])
              console.log("date" + i)
              currentTime = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
              document.querySelector("#date" + i).textContent = currentTime
              document.querySelector("#temp" + i).textContent = 'Temp: ' + data.daily[i].temp.day + 'F'
              document.querySelector('#humid' + i).textContent = 'Humidity: ' + data.daily[i].humidity + '%'
              document.querySelector('#wind' + i).textContent = 'Wind Speed: ' + data.daily[i].wind_speed + "MPH"

            }
          })
      })
    
  })