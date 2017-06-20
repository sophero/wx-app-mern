const axios = require('axios');
const darkSkyApiKey = process.env.DARK_SKY_API_KEY;
const wUndergroundApiKey = process.env.WUNDERGROUND_API_KEY;

module.exports = {

    curWeather(req, res) {
        let url = `https://api.darksky.net/forecast/${darkSkyApiKey}/${req.params.lat},${req.params.lng}`;
        axios.get(url).then((wxRes) => {
            var cur = wxRes.data.currently;
            res.send({
                currentWx: {
                    temp: cur.temperature,
                    dewPoint: cur.dewPoint,
                    pressure: cur.pressure,
                    windBearing: cur.windBearing,
                    windSpeed: cur.windSpeed
                }
            });
        });
    },

    curRadar(req, res) {
        let lat = req.params.lat;
        let lng = req.params.lng;
        let url = `http://api.wunderground.com/api/${wUndergroundApiKey}/radar/image.gif?`
            + `centerlat=${lat}&centerlon=${lng}&radius=100`
            + `&newmaps=1&noclutter=1&timelabel=1&timelabel.x=100&timelabel.y=295`;
        axios.get(url).then((response) => {
            res.send(response.data);
        });
    }

};
