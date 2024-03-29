# mood-tracking-app

(frontend)

1. to create an app, from the root folder run the following command:
   npm create vite@4.1.0

2. press y, name your app (in this case named mood), choose React, and then choose TypeScript

3. cd in to the mood folder, and run the following command:
   npm install

4. install next the dependencies for the frontend (bootstrap, react-router-dom, axios)

5. to run the app, from the mood folder type the following command:
   npm run dev

(backend)

1. download mysql server and mysql workbench (or go to https://dev.mysql.com/downloads/mysql/):
   sudo apt install mysql-server
   sudo snap install mysql-workbench-community

2. create a backend folder in the root folder

3. in the backend folder, initialize node using:
   npm init -y

4. install the dependencies (express, mysql, nodemon, cors)

5. initially in package.json, need the following changes:
   add "type" : "module" to allow imports
   in scripts, add "start" : "nodemon index.js" for smoother development

6. run following command to start the backend:
   npm start
