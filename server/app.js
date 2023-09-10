import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';


import { notificationFile, notificationLink,getNotification, deleteNotification, getData, editNotification, changeActive } from './controller/notficationController.js';
import { showPdf } from './controller/notficationController.js';
import { getUser, login, logout } from './controller/user.js';
import { otpRouter } from './controller/otp/route.js';
import { verifyRoute } from './controller/otp/verifyrouter.js';
import { auth } from './token/authenticate.js';


const app = express()

const port = 5000
// app.use(cors())
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001'],
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:false,
  // store: sessionStore,
  resave: false,
  cookie:{
    httpOnly:true,
    maxAge:3600000*24,
    
  }
}))
app.use(cookieParser())
app.listen(port)

app.get('/',(req,res)=>{
  res.send("hello")
})


app.get('/getdata/:id',auth,getData)

app.get('/notification',getNotification);
app.post('/notificationfile',notificationFile)
app.post('/notificationlink',notificationLink)
app.post('/deletenotification',deleteNotification)
app.get('/uploads/:id',showPdf)
app.post('/updatedata',editNotification)

app.put('/changeactive',changeActive)



app.get('/login',getUser)
app.post('/login',login)
app.get('/logout',logout)


//app
app.post('/Auth/otp',otpRouter)
// app.post('/Auth/verifyotp',verifyRoute)
app.post('/v', verifyRoute);
