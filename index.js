"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require('@sendgrid/mail');
const restService = express();
process.env.SENDGRID_API_KEY='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';

var nodemailer = require('nodemailer');
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  // var speech =
  //   req.body.result &&
  //   req.body.result.parameters &&
  //   req.body.result.parameters.echoText
  //     ? req.body.result.parameters.echoText
  //     : "Seems like some problem. Speak again.";
  var email = req.body.result &&
              req.body.result.parameters &&req.body.result.parameters.userEmail;
  var message = req.body.result &&
              req.body.result.parameters &&req.body.result.parameters.userEmailMessage;
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
        user: 'ranielsanss@gmail.com',
        pass: 'raniel123ss'
    }
  });

  const mailOptions = {
  from: 'Chatbot feedback', // sender address
  to: 'ranielsanss@gmail.com', // list of receivers
  cc: email,
  subject: 'Feedback', // Subject line
  html: message// plain text body
  
};
transporter.sendMail(mailOptions, function (err, info) {
   if(err)
     console.log(err)
   else
     console.log(info);
});

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'santiagoraniel14@gmail.com',
//   from: 'josephsantiago199609@gmail.com',
//   subject: 'Test Change Again',

//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

  return res.json({
    displayText: "Thanks for sending us feedback",
  });
});

// restService.post("/audio", function(req, res) {
//   var speech = "";
//   switch (req.body.result.parameters.AudioSample.toLowerCase()) {
//     //Speech Synthesis Markup Language 
//     case "music one":
//       speech =
//         '<speak><audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
//       break;
//     case "music two":
//       speech =
//         '<speak><audio clipBegin="1s" clipEnd="3s" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
//       break;
//     case "music three":
//       speech =
//         '<speak><audio repeatCount="2" soundLevel="-15db" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
//       break;
//     case "music four":
//       speech =
//         '<speak><audio speed="200%" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
//       break;
//     case "music five":
//       speech =
//         '<audio src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio>';
//       break;
//     case "delay":
//       speech =
//         '<speak>Let me take a break for 3 seconds. <break time="3s"/> I am back again.</speak>';
//       break;
//     //https://www.w3.org/TR/speech-synthesis/#S3.2.3
//     case "cardinal":
//       speech = '<speak><say-as interpret-as="cardinal">12345</say-as></speak>';
//       break;
//     case "ordinal":
//       speech =
//         '<speak>I stood <say-as interpret-as="ordinal">10</say-as> in the class exams.</speak>';
//       break;
//     case "characters":
//       speech =
//         '<speak>Hello is spelled as <say-as interpret-as="characters">Hello</say-as></speak>';
//       break;
//     case "fraction":
//       speech =
//         '<speak>Rather than saying 24+3/4, I should say <say-as interpret-as="fraction">24+3/4</say-as></speak>';
//       break;
//     case "bleep":
//       speech =
//         '<speak>I do not want to say <say-as interpret-as="bleep">F&%$#</say-as> word</speak>';
//       break;
//     case "unit":
//       speech =
//         '<speak>This road is <say-as interpret-as="unit">50 foot</say-as> wide</speak>';
//       break;
//     case "verbatim":
//       speech =
//         '<speak>You spell HELLO as <say-as interpret-as="verbatim">hello</say-as></speak>';
//       break;
//     case "date one":
//       speech =
//         '<speak>Today is <say-as interpret-as="date" format="yyyymmdd" detail="1">2017-12-16</say-as></speak>';
//       break;
//     case "date two":
//       speech =
//         '<speak>Today is <say-as interpret-as="date" format="dm" detail="1">16-12</say-as></speak>';
//       break;
//     case "date three":
//       speech =
//         '<speak>Today is <say-as interpret-as="date" format="dmy" detail="1">16-12-2017</say-as></speak>';
//       break;
//     case "time":
//       speech =
//         '<speak>It is <say-as interpret-as="time" format="hms12">2:30pm</say-as> now</speak>';
//       break;
//     case "telephone one":
//       speech =
//         '<speak><say-as interpret-as="telephone" format="91">09012345678</say-as> </speak>';
//       break;
//     case "telephone two":
//       speech =
//         '<speak><say-as interpret-as="telephone" format="1">(781) 771-7777</say-as> </speak>';
//       break;
//     // https://www.w3.org/TR/2005/NOTE-ssml-sayas-20050526/#S3.3
//     case "alternate":
//       speech =
//         '<speak>IPL stands for <sub alias="indian premier league">IPL</sub></speak>';
//       break;
//   }
//   return res.json({
//     speech: speech,
//     displayText: speech,
//     source: "webhook-echo-sample"
//   });
// });



restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
