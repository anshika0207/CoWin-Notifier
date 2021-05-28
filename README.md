# CoWin-Notifier
COVID-19 vaccination is open in India for several weeks now but people, especially aged between 18 and 44 years, are struggling to book vaccine appointments. The process is pretty tiresome and you might have to wait all day ong to get your appointment.
CoWin-Notifier prevents you from constantly checking refreshing the site, by sending a notification when the slots are open.

<img src="https://imgk.timesnownews.com/media/COWIN_registration_How_it_works_0.JPG" width="10000" height="350"/>

Web App makes use of the [Cowin Web API](https://apisetu.gov.in/public/api/cowin) to fetch slot availability. 
## Built With
* Node
* Express - Fast, unopinionated, minimalist web framework for Node.js
* Nodemailer
* Bootstrap
## Getting started
* Clone the repository and Install [node](https://nodejs.org/en/), if not already installed and cd over to the project directory.
* Run the command: `npm install` to install all the required packages in your system.
* Once you have installed all the packages, Build and run the project `nodemon app.js`.
* Navigate to `localhost:3000` on your browser. The project is setup successfully.

## How To Use
* Fill in the details of the form. Since the details you enter here are directly used, make sure you enter the exact district and state name, as given in the [Website](https://www.cowin.gov.in/home).To ensure the same, it is better if you directly copy-paste it from there.
* Submit the form and done! You will be notifed on your e-mail when the slots are open.
