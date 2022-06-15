const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const {Connection} = require("./src/db/db");
const app = express();
const routesCategory = require("./src/Routes/Category");
const routesUser = require("./src/Routes/User");
const routeCountries = require("./src/Routes/Countries");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())
app.use(morgan("dev"))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', routesCategory);
app.use('/', routesUser);
app.use('/', routeCountries);


const PORT = process.env.PORT || 3001;

Connection.sync({force:true}).then(() => {
    app.listen(PORT, () => {
      console.log(`Connection database has been correct and listening at ${PORT}`); 
    });
}).catch((error)=>{
  console.error(error)
})