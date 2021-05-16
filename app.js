const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const nodemailer = require("nodemailer");



const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

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

          // var today = new Date();
          // var da = String(today.getDate() + 1).padStart(2, '0');
          // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          // var yyyy = today.getFullYear();
          //
          // today = da + '-' + mm + '-' + yyyy;
          // console.log(today);
          let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + disid + "&date=22-05-21";
          https.get(url, function(response3) {
            response3.on("data", function(data) {
              let dw = JSON.parse(data);
              let ses = dw.sessions;
              if (ses.length > 0) {
                var transporter = nodemailer.createTransport({
                  host: "smtp.mailtrap.io",
                  port: 2525,
                  auth: {
                    user: "2330649aecda0a",
                    pass: "e3d7b672e305b6"
                  }
                });

                // send mail with defined transport object
                let info = transporter.sendMail({
                  from: '"anshi" <anshikabhatt0207@gmail.com>', // sender address
                  to: email, // list of receivers
                  subject: "Session on CoWin", // Subject line
                  text: "Sessions are open for tomorrow", // plain text body
                  html: "<h1>CoWin-Notifier</h1>", // html body
                });

                console.log("Message sent: %s");
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

              };
            });
          });
        });
      });

    });
  });

  res.send("Thanks for filling!");
});


app.listen(3000, function(req, res) {
  console.log("app running on local host 3000");
});
