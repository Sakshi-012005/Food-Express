const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const Food = require("./models/Food");
const Order = require("./models/Order");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/fooddelivery", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes

// Get all foods
app.get("/api/foods", async (req, res) => {
    const foods = await Food.find();
    res.json(foods);
});

// Add new food
app.post("/api/foods", async (req, res) => {
    const food = new Food(req.body);
    await food.save();
    res.json(food);
});

// Place order
app.post("/api/orders", async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order Placed Successfully!" });
});

// Get all orders
app.get("/api/orders", async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});