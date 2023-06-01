# MERN app with Firebase Authentication

This is a web app boilerplate that allows the user to **register** and **log in** by using **Firebase Authentication** with email/password or **Google OAuth**.

The user can also **reset their password**.

It uses a backend server to save data on **MongoDB** if the user has already been authenticated via **Firebase** authentication.

When a user registers or logs in with Google OAuth for the first time, a user entry on MongoDB is created that includes among other properties a default **"user"** role.

To add an **"admin"** role you need to do that via MongoDB's UI.

The screen **"Admin Page (protected)"** can be viewed only if the logged-in user has an **"admin"** role; if not, it redirects back to Home page.
<br/><br/>

**NOTE 1:** The project has just rudimentary inline styling.

**NOTE 2:** To test the backend with Postman, you need to log in and get a token from Firebase by making a POST request to `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_WEB_API_KEY`

Then you include the token as a Bearer token in your requests.

(You'll find the Firebase Auth web api key in _Project settings > General_)

<hr>
<br/>

## Stack

#### Backend

- Firebase Auth, MongoDB, Node.js, TypeScript
- concurrently, cors, dotenv, express, firebase-admin, mongoose, nodemon

#### Frontend

- Firebase Auth, React, TypeScript
- axios, firebase, react-router-dom,

<br/>

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
