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
4. Boot up another terminal.
5. Go to "MERN App"/Frontend directory.
6. Make sure nothing is running on http://localhost:4173
7. Run commands listed below:
    npm install
    npm run build
    npm run preview
8. The built application will run on http://localhost:4173 by default.

//Testing the Backend
1. Go to "MERN App"/Backend directory
2. Run: "npm test"

//Testing the Frontend
1. Go to "MERN App"/Frontend directory
2. For unit and integration test run:
     npm test.
3.1. For e2e test run: 
     npm run dev
3.2. Boot up another terminal at the same directory and run:
     npx cypress run