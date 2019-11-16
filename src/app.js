const path = require("path");
const express = require("express");
const chalk = require("chalk");
const hbs = require("hbs");
const geocode = require("./utils/geocode")
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

// Change/define views path
const publicDirectory = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "./template/views")
const partialsPath = path.join(__dirname, './template/partials')

// Setup template engine views and paritials location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)

// Used to serve from the public folder
app.use(express.static(publicDirectory));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Seven Abante"
    });
});



app.get("/weather", (req, res) => {
    // Do take note that only response once at a time. Use return
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address."
        })
    }
    // Get the geocode of a given address
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        // If no error is found use the geocode data to get the forecast result
        forecast(data, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location: data.placeName,
                forecast: forecastData,
                address: req.query.address
            })

        })
    })
});


app.listen(port, () => {
    console.log(chalk.green.inverse(`Server is up on port ${port}!`));
});