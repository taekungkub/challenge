const axios = require("axios")

async function fetchDataFromURL() {
  const url = "https://raw.githubusercontent.com/7-solutions/backend-challenge/main/files/hard.json"
  try {
    const res = await axios.get(url)

    return res.data
  } catch (error) {
    console.error("Error fetching data from URL:", error.message)
  }
}

module.exports = fetchDataFromURL
