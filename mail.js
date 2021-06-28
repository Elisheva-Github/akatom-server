// var nodemailer = require('nodemailer');
// const env = require('dotenv')
// env.config();
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// const mailSender=async (req, res) => {
//     const {contact}=req.body
//     //אתחול המשתנים של שליחת המייל
//     transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'akaton.tremp@gmail.com ',
//             pass: process.env.PAS,
//         }
//     });
//     mailOptions = {
//        // from: 'leadersdashboard@gmail.com',
//         to:contact.email,
//         subject: 'Sending Email using Node.js',
//         //html:contact.name+" נושא פניתך:"+contact.subject
//         text: 'That was easy!'
//         ,
//         // text:contact
//     };
//     //הפעלת הפונקציה
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.error('error on mailSender ',error);
//         } else {
//             console.info('Email sent: ' + info.response);
//         }
//     })
// }
// module.exports ={mailSender}

var nodemailer = require('nodemailer');
const env = require('dotenv')
env.config()
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
async function main() {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mali411020@gmail.com',
            pass: process.env.PAS
        }
    });

    var mailOptions = {
        // from: 'mali411020@gmail.com',
        to: 'elisheva92121@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("yyyyyyyyyyyyyyyy,", error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

main();