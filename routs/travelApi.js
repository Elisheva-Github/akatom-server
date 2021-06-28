const route = require('express').Router();
//const route = require('express-promise-router')();
const travelController = require('../controllers/travelController')


//user
route.post('/createTravel',travelController.createTravel);
route.get('/getAllDrivers',travelController.getAllDrivers);
route.get('/getAllPassengers',travelController.getAllPassengers);
route.put('/updateTravel/:id',travelController.updateTravel);
route.delete('/deleteTravel/:id',travelController.deleteTravel);

// //image
// route.post('/createImage', imageController.createImage);
// route.get('/getImageByName/:name',imageController.getImageByName);
// route.get('/getImageById/:id',imageController.getImageById);
// route.get('/getAllImage',imageController.getAllImage);

// route.post('/createCompany',companyController.createCompany);
// route.delete('/deleteCompany/:id',companyController.deleteCompany);

module.exports = route;
