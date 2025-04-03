document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input")
  const submitBtn = document.getElementById("get-weather-btn")
  
  submitBtn.addEventListener("click", () => {
    const city = cityInput.value.trim()

    cityInput.value = ""
  })
})
