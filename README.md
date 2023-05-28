### Instructions

#### Backend

1. cd to _/backend_ and run `npm install`
2. Rename _example.env_ to _.env_ and add your MongoDB details
3. Go to Firebase and generate a Google service account private key json file.
4. Rename the service account private key json file to `firebaseServiceAccount.json` and move it to the root of _./backend_ folder.
5. In the `authenticateToken.ts`, line 18, change the `databaseURL` value to include the name of youre database: `"https://YOUR_DATABASE_NAME.firebaseio.com"`

#### Frontend

1. cd to _/frontend_ and run `npm install`
2.
