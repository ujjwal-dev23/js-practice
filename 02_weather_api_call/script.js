document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input")
  const submitBtn = document.getElementById("get-weather-btn")
  const errorMsg = document.getElementById("error-message")
  const weatherInfo = document.getElementById("weather-info")

  const API_KEY = "" // Get API KEY from openweathermap.org

  async function fetchWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    if (!response.ok) {
      throw new Error("API Response Failure")
    }
    return await response.json()
  }

  function displayWeatherData(city, temp, desc) {
    const cityName = document.getElementById("city-name")
    const temperature = document.getElementById("temperature")
    const description = document.getElementById("description")

    cityName.textContent = city
    temperature.textContent = temp
    description.textContent = desc

    weatherInfo.classList.remove("hidden")
    errorMsg.classList.add("hidden")
  }
  
  submitBtn.addEventListener("click", async () => {
    if (cityInput.value === "") return
    const city = cityInput.value.trim()
    try {
      const {name, main, weather} = await fetchWeatherData(city)
      displayWeatherData(name, main.temp, weather[0].description)
    }
    catch (error) {
      weatherInfo.classList.add("hidden")
      errorMsg.classList.remove("hidden")
    }

    cityInput.value = ""
  })

  cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      submitBtn.click()
    }
  })
})
