const express = require('express');
const app = express();
const timestampRouter = express.Router();
const port = 1988;

timestampRouter.route('/timestamp/:date_string?')
.get((req,res) => {
  res.json(getDate(req.params.date_string));
});
app.use('/api', timestampRouter);

app.listen(port, ()=> {
  console.log('listening on port:' + port);
});

function getDate(inputDate) {
  let response, date;    
  if(inputDate === null){
    date = new Date();
  }
  else if(!isNaN(inputDate)){
    date = new Date(parseInt(inputDate));    
  }
  else{
    date = new Date(inputDate);
  }  
  if(date != "Invalid Date"){
   let unix, utc = 0;
   unix = parseInt(date.getTime() / 1000);
   utc = date.toGMTString();   
   response = {"unix" : unix, "utc": utc};
  }
  else{
   response = {"error" : "Invalid Date"};
  }
  return response;
}