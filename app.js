const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var st = req.body.state;
  var di = req.body.district;
  const stateurl = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
  var stid = "";
  var disid = "";
  var durl = "";
  https.get(stateurl, function(response1){
    console.log(response1.statusCode);
    response1.on("data", function(data){
      const sd = JSON.parse(data);
      const states = sd.states;
      for(var i=0; i<states.length ; i++){
        if(states[i]["state_name"] === st){
            stid = states[i]["state_id"];
        }
      };
      console.log("stid is : " + stid);
      durl = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stid;
      console.log("durl is :" + durl);


        https.get(durl, function(response2){
          console.log(response2.statusCode);
          response2.on("data", function(data){
            const dd = JSON.parse(data);
            const districts = dd.districts;
            for(var i=0; i<districts.length ; i++){
              if(districts[i]["district_name"] === di){
                  disid = districts[i]["district_id"];
              }
            };


              console.log("disid is : " + disid);
            });
          });

    });
  });



  res.send("done");
});


app.listen(3000, function(req, res){
  console.log("app running on local host 3000");
});
