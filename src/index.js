

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { userRouter } from './app/users/user.route.js';
import { vendorRouter } from './app/vendor/vendor.route.js';
import { communityRouter } from './app/community/community.route.js';
const app = express();




// MIDDLEWARE
app.use(express.json());





// API
// USER API 
app.use('/api/v1/users', userRouter);
app.use('/api/v1/vendors',vendorRouter);
app.use('/api/v1/communitys',communityRouter)



app.get('/', (req,res)=>{

    return res.status(200).json({
        success:true,
        message:"Hello World",
    })

})






app.use((req,res)=>{

    return res.status(404).json({
        message:`This ${req.url} path   not found`
    })
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

// EXPORT SPP 

export const rootApp = app;














