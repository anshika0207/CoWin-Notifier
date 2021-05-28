const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const nodemailer = require("nodemailer");

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"))
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var st = req.body.state;
  var di = req.body.district;
  var email = req.body.email;
  const stateurl = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
  var stid = "";
  var disid = "";
  var durl = "";
  https.get(stateurl, function(response1) {
    console.log(response1.statusCode);
    response1.on("data", function(data) {
      const sd = JSON.parse(data);
      const states = sd.states;
      for (var i = 0; i < states.length; i++) {
        if (states[i]["state_name"] === st) {
          stid = states[i]["state_id"];
        }
      };
      console.log("stid is : " + stid);
      durl = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stid;
      console.log("durl is :" + durl);


      https.get(durl, function(response2){
        console.log(response2.statusCode);
        response2.on("data", function(data) {
          const dd = JSON.parse(data);
          const districts = dd.districts;
          for (var i = 0; i < districts.length; i++) {
            if (districts[i]["district_name"] === di) {
              disid = districts[i]["district_id"];
            }
          };
          console.log("disid is : " + disid);

          var today = new Date();
          var da = String(today.getDate() + 1).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          today = da + '-' + mm + '-' + yyyy;
          console.log(today);
          const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + disid + "&date=" + today;
          console.log("final url : " + url);
          https.get(url, function(response3) {
            console.log(response3.statusCode);
            response3.on("data", function(data) {
              const dw = JSON.parse(data)
              const opensessions = dw.sessions
              var n = opensessions.length
              if (!n) {
                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                  }
                });

                var mailOptions = {
                  from: 'anshikabhatt0207@gmail.com',
                  to: email,
                  subject: 'CoWin-Notifier',
                  text:  'CoWin-ALert. The slots for your district are now open. Book fast!'
                };

                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });

              };
            });
          });
        });
      });
    });
  });

  res.sendFile(__dirname + "/final.html");
});


app.listen(3000, function(req, res) {
  console.log("app running on local host 3000");
});
