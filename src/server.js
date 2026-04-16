

















import { rootApp } from "./index.js";
const PORT = process.env.PORT || 5000
let server;





(()=>{

    try {
        server=rootApp;
        server.listen(PORT,()=>{
            console.log(`server running on this port ${PORT}`)
        })

        
    } catch (error) {
        console.log(error);
        
    }

})()

//  PROCESS

