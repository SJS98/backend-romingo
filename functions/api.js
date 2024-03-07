
class Vehicle {

    constructor(type, from, to, dist, comfirtLevel) {
        this.id = Math.floor(Math.random() * 1000);
        this.type = type;
        this.from = from;
        this.to = to;
        this.dist = dist;
        this.comfirtLevel = comfirtLevel;
        this.price = this.getPrice;
    }

    get getType() {
        return this.type;
    }

    set setType(type) {
        this.type = type;
    }

    get getPrice() {
        let price = Infinity;
        if (this.comfirtLevel == "GENERAL") {
            if (this.type == "TRAIN")
                price = this.dist * 1;
            else if (this.type == "BUS")
                price = this.dist * 1.5;
            else if (this.type == "PLANE")
                price = this.dist * 10;
        }
        else if (this.comfirtLevel == "PROFESSIONAL") {
            if (this.type == "TRAIN")
                price = this.dist * 4;
            else if (this.type == "BUS")
                price = this.dist * 5;
            else if (this.type == "PLANE")
                price = this.dist * 15;
        }
        else if (this.comfirtLevel == "EXECUTIVE") {
            if (this.type == "TRAIN")
                price = this.dist * 8;
            else if (this.type == "BUS")
                price = this.dist * 10;
            else if (this.type == "PLANE")
                price = this.dist * 20;
        }
        return price;
    }
}

let vehicles = [
    new Vehicle("TRAIN", "Mumbai", "Delhi", 1500, "GENERAL"),
    new Vehicle("BUS", "New York", "Washington", 300, "PROFESSIONAL"),
    new Vehicle("PLANE", "London", "Paris", 500, "EXECUTIVE")
];


const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();
app.use(cors());

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to the express vehicle backend!"
    });
});


// GET request to fetch all vehicles
router.get('/vehicles', (req, res) => {
    res.json(vehicles);
});

// POST request to add a new Vehicle
router.post('/vehicles', (req, res) => {
    const newVehicle = req.body;
    vehicles.push(newVehicle);
    res.status(201).send(newVehicle);
});

// GET request to fetch a specific Vehicle by ID
router.get('/vehicles/:id', (req, res) => {
    const VehicleId = parseInt(req.params.id);
    const Vehicle = vehicles.find(Vehicle => Vehicle.id === VehicleId);
    if (Vehicle) {
        res.json(Vehicle);
    } else {
        res.status(404).send('Vehicle not found');
    }
});


app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);