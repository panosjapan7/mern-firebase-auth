# MERN app with Firebase Authentication

This is a web app boilerplate that allows the user to log in by using Firebase authentication with email/password or Google OAuth.

It uses a separate backend server to save data on MongoDB only if the user has been authenticated with Firebase authentication.

When a user registers or logs in with Google OAuth for the first time a user entry on MongoDB is created that includes among other properties a default "user" role.

To add an _"admin"_ role you need to edit a current one or add it through MongoDB's UI.

The page **"Admin Page (protected)"** can be viewed only if the logged-in user has an _"admin"_ role; if not, it redirects back to Home page.

## Stack

#### Backend

- Firebase Auth, MongoDB, Node.js, TypeScript
- concurrently, cors, dotenv, express, firebase-admin, mongoose, nodemon

#### Frontend

- Firebase Auth, React, TypeScript
- axios, firebase, react-router-dom,

## Instructions

#### Backend

1. cd to _/backend_ and run `npm install`
2. Rename _example.env_ to _.env_ and add your MongoDB details
3. Go to Firebase and generate a Google service account private key json file.
4. Rename the service account private key json file to `firebaseServiceAccount.json` and move it to the root of _./backend_ folder.
5. In the `authenticateToken.ts`, line 18, change the `databaseURL` value to include the name of youre database: `"https://YOUR_DATABASE_NAME.firebaseio.com"`
6. Run the backend with `npm run dev`

#### Frontend

1. cd to _/frontend_ and run `npm install`
2. Rename _example.env_ to _.env_ and add your firebaseConfig details
3. Run the frontend with `npm start`
