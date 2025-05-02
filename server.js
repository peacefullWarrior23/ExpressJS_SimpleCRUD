import app from './app.js'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 3000;



app.listen(port, () => {
    console.log("Express app is now running on port 3000");
});

