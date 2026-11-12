
var express = require("express");
var app = express(); //called express
var port = 8080; //new server

app.use(express.json());
app.use(express.static(__dirname ));

var users = [
{ "id": 1,
 "name": "John Doe",
  "gender": "Male",
  "image": "john.png" 
},
{"id": 2,
 "name": "Jane Doe",
  "gender": "Female",
  "image": "jane.png"
},
{
"id": 3,
 "name": "Naja",
  "gender": "Female",
  "image": "https://randomuser.me/api/portraits/med/women/89.jpg"
},

{
    "id": 4,
    "name": "Mincy Doe",
    "gender": "Female",
    "image": "https://randomuser.me/api/portraits/med/women/58.jpg"
},
{
    "id": 5,
    "name": "Wyatt Doe",
    "gender": "Male",
    "image": "https://randomuser.me/api/portraits/med/men/6.jpg"
}];
var curId=6;

function findIndex(id){
    for(var i=0; i<users.length; i++){
        if(users[i].id == id){
            return i;
        }
    }
    return -1;
}

app.get("/api/users", function(req, res){ 
    return res.json(users);
});


app.get("/api/users/:id", function(req, res){
    var id = Number( req.params.id);
    var index = findIndex(id);
    if(index == -1){
         return res.status(404).json({"message": "User not found with id " + id});
       
    }   
    return res.json(users[index]);
});

// sttart server and use this port
app.listen(port, function() {
  console.log(" App is running on : http://localhost:" + port);
});

