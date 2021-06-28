const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mogoose = require('mongoose')
const env = require('dotenv');
const router = require('./routs/travelApi');
const cors = require('cors')

app.use(cors())


env.config();
app.use(bodyParser.json());

const connectionParams = {
    newUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mogoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log("error:" + err);
    })

app.use('/', router);


//app.use()
app.listen(3000, (req, res) => {
    console.log("listen...... 3000");
})