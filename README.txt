Make sure you have node installed on your system.
The application has been developed using node v18.14.0.

Backend accepts CORS solely from the following origins:
http://localhost:4173
http://localhost:5173

//Running the application
1. Go to "MERN App"/Backend directory.
2. Make sure nothing is running on http://localhost:8000
3. Run commands listed below:
    npm install
    npm start
4. Go to "MERN App"/Frontend directory.
5. Make sure nothing is running on http://localhost:4173
5. Run commands listed below:
    npm install
    npm run build
    npm run preview
6. The built application will run on http://localhost:4173 by default.

//Testing the Backend
1. Go to "MERN App"/Backend directory
2. Run: "npm test"

//Testing the Frontend
1. Go to "MERN App"/Frontend directory
2.1. For unit and integration test run:
     npm test.
2.2. For e2e test run: 
     npm run dev
     npx cypress run