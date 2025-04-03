document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input")
  const submitBtn = document.getElementById("get-weather-btn")
  const errorMsg = document.getElementById("error-message")
  const weatherInfo = document.getElementById("weather-info")

  const API_KEY = "" // Get API KEY from openweathermap.org

  async function fetchWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    if (!response.ok) {
      console.error("API Call didn't respond correctly")
      return
    }
    return await response.json()
  }

  function displayWeatherData(city, temp, desc) {
    const cityName = document.getElementById("city-name")
    const temprature = document.getElementById("temprature")
    const description = document.getElementById("description")

    cityName.textContent = city
    temprature.textContent = temp
    description.textContent = desc

    weatherInfo.classList.remove("hidden")
  }
  
  submitBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim()
    try {
      const {name, main, weather} = await fetchWeatherData(city)
      displayWeatherData(name, main.temp, weather[0].description)
    }
    catch (error) {
      weatherInfo.classList.add("hidden")
      errorMsg.classList.remove("hidden")
    }

    //console.log(name, main.temp, weather[0].description)

    cityInput.value = ""
  })

  cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      submitBtn.click()
    }
  })
})
