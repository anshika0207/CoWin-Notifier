# CoWin-Notifier
COVID-19 vaccination has been open in India for several weeks now but people, especially those aged between 18 and 44 years, are struggling to book vaccine appointments. The process is pretty tiresome and you might have to wait all day long to get your slot.
CoWin-Notifier prevents you from constantly checking and refreshing the site, by sending an email when the slots are open. It uses the public
[Cowin Web API](https://apisetu.gov.in/public/api/cowin) to get district-wise data and fetch slot availability. 

<img src="https://imgk.timesnownews.com/media/COWIN_registration_How_it_works_0.JPG" width="10000" height="350"/>

## Built With
* Node
* Express - Fast, unopinionated, minimalist web framework for Node.js
* Nodemailer
* Bootstrap

## Getting started
* Clone the repository and Install [node](https://nodejs.org/en/), if not already installed. Open command line and navigate over to the project folder. 
* Run the command:

        npm install express body-parser nodemailer 

  to install all the required packages in your system.
* After successful installation, Build and run the project using the following command to start the application : `nodemon app.js`
* Navigate over to `localhost:3000` on your browser. The project is set up successfully and you are good to go.

## How To Use
* Fill in the details of the form. Since the details you enter here are directly used, make sureto add the exact district and state name, as given in the [Website](https://www.cowin.gov.in/home).To ensure the same, it is better if you directly copy-paste it from there.

  <img src="https://github.com/anshika0207/CoWin-Notifier/blob/master/images/Form.jpg?raw=true" width="10000" height="500"/>
* Submit the form and done! You will be notified on your e-mail when the slots are open.

  <img src="https://github.com/anshika0207/CoWin-Notifier/blob/master/images/Alert.jpg?raw=true"/>
  
 ***
## Note
It is better to login to the CoWin website beforehand. The notification is for slots available on the next day.

*Book slots only when you are ready, otherwise, you are spoiling someone else's chance to get vaccinated!*

Feel free to contribute!

