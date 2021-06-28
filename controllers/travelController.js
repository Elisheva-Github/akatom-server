const travel = require('../models/travel');
var nodemailer = require('nodemailer');
const env = require('dotenv')
env.config();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

//create
const createTravel = async (req, res) => {

    try {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        let myTravel = new travel(req.body);
        debugger
        console.log("my travel" + myTravel);
        debugger
        let a = await myTravel.save();
        console.log("aaaaaaaaaaaa" + a);
        res.status(200).json({ myTravel: myTravel });
    }
    catch {
        res.status(500).json({ err: error.massege });
    }
}
const mailSender = async (req, res) => {
    console.log("--------------------");

    console.log(req.body.email);

    const { contact } = req.body
    //אתחול המשתנים של שליחת המייל
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'akaton.tremp@gmail.com ',
            pass: process.env.PAS,
        }
    });
    mailOptions = {
        // from: 'leadersdashboard@gmail.com',
        // to: contact.email,
        to: req.body.email,
        subject: 'Sending Email using Node.js',
        html: req.body.em + "בעל המייל :" + req.body.phoneNumber + " והטלפון שלו הוא: " + " ישמח להצטרף לנסיעתך",

        text: 'That was easy!'
        ,
        // text:contact
    };
    //הפעלת הפונקציה
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('error on mailSender ', error);
        } else {
            console.info('Email sent: ' + info.response);
        }
    })
}


//update
const updateTravel = async (req, res) => {
    try {
        let travelToUpdate = await travel.findByIdAndUpdate(req.params.id, req.body);
        res.send(travelToUpdate);
        res.status(200).json({ theTravel: travelToUpdate });
    }
    catch (err) {
        res.status(500).json({ error: err.massege });
    }
}
//delete
const deleteTravel = async (req, res) => {
    try {
        let travelToDelete = await travel.findByIdAndDelete(req.params.id);
        res.send(travelToDelete);
        res.status(200).json({ theTravel: travelToDelete });
    }
    catch (err) {
        res.status(500).json({ error: err.massege });
    }
}

//getAllImage
const getAllDrivers = async (req, res) => {
    try {
        let drivers = await travel.find({ userType: "driver" })//.exec();
        if (drivers == null) {
            res.send("you don't have drivers!");
        }
        return res.json({ status: 200, alldrivers: drivers });
    }
    catch (error) {
        res.status(500).json({ error: error.maggase });
    }
}

const getAllPassengers = async (req, res) => {
    try {
        let passengers = await travel.find({ userType: "passenger" })//.exec();
        if (passengers == null) {
            res.send("you don't have Passengers!");
        }
        return res.json({ status: 200, allpassengers: passengers });
    }
    catch (error) {
        res.status(500).json({ error: error.maggase });
    }
}

const getTravelById = (req, res) => {
    console.log("-----getImageById-------");
    let imgToFind =
        Image.findById(req.params.id, function (err, img) {
            if (err) {
                res.status(400).send(err);
            }
            else {
                res.status(200).json({ theImage: img })
            }
        })
}


module.exports = { createTravel, updateTravel, deleteTravel, getAllDrivers, getAllPassengers, getTravelById, mailSender };