











import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();




// MIDDLEWARE
app.use(express.json());





// API
app.get('/', (req,res)=>{

    return res.status(200).json({
        success:true,
        message:"hello word from course management",
    })

})



// EXPORT SPP 

export const rootApp = app;














