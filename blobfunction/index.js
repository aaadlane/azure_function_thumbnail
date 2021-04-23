const imageThumbnail = require('image-thumbnail');
const fs = require("fs");
var nodemailer = require('nodemailer');
require('dotenv').config();



async function transform() {
    try {
        const my_image = './unknown.png'
        const thumbnail = await imageThumbnail(my_image);
        var real_name = my_image.substr(0, my_image.indexOf('.'));
        console.log(real_name)
        const thumbnail_name = real_name + '_thumb.jpg'
        console.log(thumbnail_name)
        fs.writeFileSync(thumbnail_name, thumbnail);
        send_thumb_mail(my_image, thumbnail)
    } catch (err) {
        console.error(err);
    }
}

function send_thumb_mail(my_pic, my_thumb) {
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "login",
            user: 'adlane.mailer@gmail.com',
            pass: process.env.GMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'adlane.mailer@gmail.com',
        to: 'adlane.mailer@gmail.com',
        subject: 'Thumbs Up !',
        text: "Nouveau thumbnail dans la bibliothÃ¨que Azure",
        attachments: [{ // utf-8 string as an attachment
                filename: 'original.jpg',
                //content: 'hello world!'
                path: my_pic,

            },
            { // utf-8 string as an attachment
                filename: 'thumbnail.jpg',
                //content: 'hello world!'
                content: my_thumb,

            }
            //{   // binary buffer as an attachment
            //    filename: 'thumbnail',
            //    content: new Buffer('hello world!','utf-8')
            //}
        ]
    };

    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

transform()








// const imageThumbnail = require('image-thumbnail');
// const fs = require("fs");


// // function thumbnail(){

// // }

// // async function tarace(){
// //     try {
// //         const thumbnail = await imageThumbnail('./unknown.png');
// //         console.log(thumbnail);
// //         console.log(typeof(thumbnail));
// //         return thumbnail.toFil
// //     } catch (err) {
// //         console.error(err);
// //     }
// // }

// // tarace()
// // const imageThumbnail = require('image-thumbnail');


// async function test(blob){


//     try {
//         const thumbnail = await imageThumbnail(blob);
//         console.log(thumbnail);
//         fs.writeFileSync("new-path.jpg", thumbnail);
//     } catch (err) {
//         console.error(err);
//     }
// }

// test()


// module.exports = async function (context, myBlob) {
//     context.log("JavaScript blob trigger function processed blob \n Blob:", context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");
//     thumbnail()


// };



// // un fonction pour enregistrer dans le dossier / récuperer la photo



// investir dans une salle de sport 
// 100 casiers tous fermés cote a cote 
// un gars passe a coté de chaque quasier
// il les ouvre un par un
// deuxieme jour il ouvre ou ferme un casier sur deux
// ensuite tous les 3 casier 
// 4 casier