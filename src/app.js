const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const app = express();

// Import Routes
const productsRoutes = require("./routes/products");
const { urlencoded } = require("express");
const exp = require("constants");

// Settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "",
      port: 3306,
      database: "inventario",
    },
    "single"
  )
);
app.use(express.urlencoded({extended: false}));

// Routes
app.use("/", productsRoutes);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
  console.log("Server on port 3000");
});
