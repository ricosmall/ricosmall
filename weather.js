const axios = require('axios')
const cheerio = require('cheerio')

const URL = 'https://tianqi.moji.com/weather/china/guangdong/nanshan-district'
const getHTML = async (url) => await axios.get(url).then((res) => res.data)
const parseDataFromHTML = (html) => {
  const $ = cheerio.load(html)
  const address = $('#search .search_default em').text()
  const airIndex = $('.wea_info .wea_alert em').text()
  const temperature = $('.wea_info .wea_weather em').text()
  const weather = $('.wea_info .wea_weather b').text()
  return {
    address,
    airIndex,
    temperature,
    weather,
  }
}

const getWeather = async () => {
  const html = await getHTML(URL)
  const data = parseDataFromHTML(html)
  const { address, airIndex, temperature, weather } = data
  const result = `Weather infomation of ${address}: \n
Weather: ${weather}, Temperature: ${temperature} ℃ , Air Index: ${airIndex}`
  return result
}

module.exports = getWeather
