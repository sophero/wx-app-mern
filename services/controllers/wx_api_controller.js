const axios = require('axios');
const darkSkyApiKey = process.env.DARK_SKY_API_KEY;
const wUndergroundApiKey = process.env.WUNDERGROUND_API_KEY;

module.exports = {

    curWeather(req, res) {
        let { lat, lng } = req.params;
        // console.log(lat, lng);
        let darkSkyUrl = `https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${lng}`;

        axios.get(darkSkyUrl).then((wxRes) => {
            var { sunriseTime, sunsetTime } = wxRes.data.daily.data[0];
            var cur = wxRes.data.currently;
            res.send({
                curWx: {
                    temp: cur.temperature,
                    dewPoint: cur.dewPoint,
                    pressure: cur.pressure,
                    windBearing: cur.windBearing,
                    windSpeed: cur.windSpeed
                },
                // time variables in SECONDS since 1 January 1970
                curTime: cur.time,
                sunrise: sunriseTime,
                sunset: sunsetTime
            });
        });
    },

    pastWeather(req, res) {
        let { lat, lng, time } = req.params;
        let url = `https://api.darksky.net/forecast/${darkSkyApiKey}/${lat},${lng},${time}`;
    },

    curRadar(req, res) {
        let lat = req.params.lat;
        let lng = req.params.lng;
        let url = `http://api.wunderground.com/api/${wUndergroundApiKey}/radar/image.gif?`
            + `centerlat=${lat}&centerlon=${lng}&radius=100`
            + `&newmaps=1&noclutter=1&timelabel=1&timelabel.x=100&timelabel.y=295`;
        axios.get(url).then((response) => {
            // let img = fs.readFileSync(response.data);
            res.writeHead(200, {'Content-Type': 'image/gif' });
            res.end(response.data, 'binary');
            // res.send(response.data);
        });
        // res.send(url);

    }

};
