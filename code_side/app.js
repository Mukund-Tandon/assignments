const exp = require('constants');
const express = require('express');
const app = express();
 const zod = require('zod');
const port = 3000;


const schema = zod.array(zod.number());
//



// function userMiddleware(req,res,next){
//     const username = req.headers.username;
//     const password = req.headers.password;
//     if(username !== 'mukund' || password !== 'pass') {
//         return res.status(403).json({msg: 'User does not exist'});
//       }
//       else{
//             next();
//       }
// }
app.use(express.json());
// function kidneyMiddleware(req,res,next){
//     const kidneyId = req.query.kidneyId;
//     if(kidneyId != 1 && kidneyId != 2) {
//         return res.status(404).json({msg: 'Kidney does not exist'}); 
//       }
//       else{
//             next();
//       }
// }
// Define a basic route

// global catch log

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  } );


app.post('/health-checkup',(req, res) => {
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    res.send({response});

    
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});