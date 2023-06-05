# MERN app with Firebase Authentication

This is a web app boilerplate that allows the user to **register** and **log in** by using **Firebase Authentication** with **email/password** or **Google OAuth**.

- The user can also **reset their password**.
- The user receives an email to **verify their email address**.
- The app uses a backend server to **create a user entry** on **MongoDB** that includes among other properties a default **"user"** role if the user has been authenticated via **Firebase** authentication.
- To add an **"admin"** role to a user, you need to manually edit the user entry on MongoDB.
- The screen **"Admin Page (protected)"** can be viewed only if the logged-in user has an **"admin"** role; if not, it redirects back to Home page.
  <br/><br/>

- **NOTE 1:** The project has just rudimentary inline styling.

- **NOTE 2:** To test the backend with Postman, you need to log in and get a token from Firebase by making a POST request to `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_WEB_API_KEY`

  Then you include the token as a Bearer token in your requests. (You'll find the Firebase Auth web api key in _Project settings > General_)

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
2. Rename _/backend/example.env_ to _.env_ and add your **MongoDB connection string** (something like _mongodb+srv://username:<password>@cluster0.emzwhol.mongodb.net/?retryWrites=true&w=majority_).
3. Go to Firebase and create a new project.
   - Enable Sign-in method with **Email/Password (enable Email link too)**.
   - Enable **Google Sign-in method**.
   - Generate a new private key .json file (_Project settings > Service accounts_).
4. Rename the Firebase private key .json file to `firebaseServiceAccount.json` and move it to the root of _./backend_ folder.
5. In the `authenticateToken.ts`, line 18, change the `databaseURL` value to include the name of your Firebase project name (you'll find the project name in **Project settings > General: Project name**): `"https://YOUR_PROJECT_NAME.firebaseio.com"`
6. Run the backend with `npm run dev`

#### Frontend

1. cd to _/frontend_ and run `npm install`
2. Rename _example.env_ to _.env_
3. Go to _Firebase Project settings > General_. In **Your apps** section, register a web app. Get the values of the `firebaseConfig` variables and add them to the `frontend/.env`
4. Run the frontend with `npm start`
