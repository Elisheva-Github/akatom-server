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
        subject: 'קארפול רמות - נמצאה נסיעה מתאימה',
    
       html: '<b>שלום וברכה </b><br> בהמשך לבקשתך , נמצא שותף מתאים לנסיעתך<br /> <br>' +
       'מייל ליצירת קשר:' +  req.body.em + ' <br>' + 'טלפון :'  + req.body.phoneNumber +' <br/><br/>ישמח להצטרף לנסיעתך<br/><br/>',
       text: '<h1>  ...נא צרו קשר בינכם ,בהצלחה !!!!</h1>'
       ,
        // text: 'That was easy!'
        
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
        let drivers = await travel.find({ userType: true })//.exec();
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
        let passengers = await travel.find({ userType: false })//.exec();
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

const getAllDriversInternal = async (req, res) => {
    try {
        let drivers = await travel.find({ userType: "driver" })//.exec();

        return drivers
    }
    catch (error) {
        console.log("getDrivers catch " + error.massege)
    }
}
const getAllPassengersInternal = async () => {
    try {
        let passengers = await travel.find({ userType: "passenger" })//.exec();

        return passengers;
    }
    catch (error) {
        console.log("getPassengers catch");
    }
}
const getOpposite = async (userType) => {
    try {

        if (userType == "passenger") {
            console.log("passenger")
            let drivers = await getAllDriversInternal()
            return drivers
        } else {
            console.log("other")
            let passengers = await getAllPassengersInternal();
            return passengers
        }
    } catch (error) {
        console.log("getOpposite catch");
    }
}

const saveTravel = async (req, res) => {
    try {
        createTravel(req)
        console.log("userType " + req.body.userType)
        let result = await getOpposite(req.body.userType)
        const newAllTravels = result.map(function (it) {
            if (
                it.gender == req.body.gender && it.userType != req.body.userType
            ) {
                return it;
            }
        }
        )
        if (newAllTravels == null) {
            res.send("Sorry, we don't found Travels for you...");
        }

        console.log(newAllTravels)
        return res.status(200).json({ status: 200, result: newAllTravels });


    } catch (error) {
        console.log("catch")
        // return res.status(500)
        return res.status(500).json({ error: error.maggase });
    }
}


module.exports = { saveTravel, createTravel, updateTravel, deleteTravel, getAllDrivers, getAllPassengers, getTravelById, mailSender };