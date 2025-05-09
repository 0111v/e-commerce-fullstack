const cron = require('cron')
const https = require('https')

const job = new cron.CronJob("*/13 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) console.log("GET request sent successfully")
      else console.log("GET request failed ", res.statusCode)
    })
    .on("error", (e) => console.log("error while sending request", e))
})

module.exports = { job }