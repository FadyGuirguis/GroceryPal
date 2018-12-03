# GroceryPal
An app that helps users keep track of their groceries, shopping lists as well as try new recipes.


### - Dependencies
The dependancies of the server are listed in the package.json file and the dependencies of the client app are listed in
the /client/package.json file.
To install the dependencies all you need to do is run "npm install and npm install --prefix client" in the root directory.

### - Configurations
An example of the config file is provided at /config/config.example.json. Copy this file and rename it to config.json. In 
this file you need to provide some needed information to run the application. To use the app without Docker, you need to 
add a "development" object in your config.json file and add to this object a PORT attribute which includes the port number
that the app should be served on, a MONGODB_URI which includes the url of the Mongo database the application shoul use, a 
JWT_SECRET which includes a string that will be used to hash tokens, and lastly APP_ID and APP_KEY for the Edamam Recipe 
API (https://developer.edamam.com/edamam-docs-recipe-api). However to use Docker with the current setup, you must add a 
"docker" object to your config.json. The PORT has to be 4000 and the MONGODB_URI has to be "mongodb://mongo:27017/database-name".

### - Docker
The application contains a Dockerfile which can be use to build and run an image of the application. To build the application
you need to run "docker build -t image_name ." in the root directory. To run the image, you need to run "docker run -p 
desired_port:4000 image_name". However this app requires a connection to a MongoDB database so the image will not be functional.

### - Docker-Compose
The application contains a docker-compose.yml file which can used to build and run an image of the application and its backing
service (MongoDB). To create the image, all you need to do is run "docker-compose up --build" in the root directory. The  
application can now be accessed at port 4000 on your local machine.
