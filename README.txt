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


//Task description
The application should allow the user to submit a log report by filling in
a form with the following fields. The backend will then process the log
that the user submits and save the ᴘʀᴏᴄᴇꜱꜱᴇᴅ ʟᴏɢ along with all the
other form fields in a database. It will then display a list of ʀᴇʟᴇᴠᴀɴᴛ
ʟɪɴᴇꜱ to the user using monospace font.

Log
The log can have any number of lines. Each line begins with either E for
errors, W for warnings and I for informational messages. Error messages
then have a number indicating the severity of the error, between 1 and
100. All types of messages then have an integer timestamp and a textual
content which runs until the end of the line. Here are a few valid lines:

I 6 Nothing to report
W 7 Out for lunch
E 42 21 ERROR: Something has gone horribly wrong
I 52 Something went wrong while I was out for lunch

A ᴘʀᴏᴄᴇꜱꜱᴇᴅ ʟᴏɢ only has lines which conform to the template
described above (other lines are discarded) and is sorted with the
timestamps in ascending order.
A ʀᴇʟᴇᴠᴀɴᴛ ʟɪɴᴇ is an error line with severity of at least 50.