# Picuni #
Picuni is a image sharing web application that allows users to public post images and view images posts by other. 
Registration and login are entirely managed using Facebook login, making joining the platform extremely simple.

# Set up of server #
To run the server, you will need NPM, NodeJS, and Bower.
To set up the server, simply clone the respository

`git clone https://github.com/bransonl/picuni.git`

In the root directory, run:

`npm install`

Install Bower by running:

`sudo npm install -g bower`

Navigate to the `/public` folder and install the Bower dependencies:

```
cd public
bower install
```

Return to the root directory and start the server:

```
cd ..
node server.js
```
Navigate to `localhost:8000` in a browser to see it in action.

# Database setup #
The application uses PostgreSQL to store all user and image data.
All tables are created automatically when the server is run for the first time.
The connection details will need to be updated in `/modules/db.js` to connect to your own database.
Additionally, image uploads are sent to S3. Details for those HTTP POST requests will also need to be changed in `/public/js/services/ImagesService.js`.
