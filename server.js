
var express = require("express");
var app = express(); //called express
var port = process.env.PORT || 8080; //new server


var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./swagger-output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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
};

// Not a number NAN error when it was placed at bottom 
app.get("/api/users/randomuser", function(req, res){
if(users.length === 0){
    return res.status(404).json({"message": "No user found"});
}
var randomIndex = Math.floor(Math.random() * users.length);
return res.json(users[randomIndex]);

});


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

app.post("/api/users", function(req, res){
   if(!req.body.name || !req.body.gender|| !req.body.image){
  return  res.status(400).json({"message": "Bad request : Name, gender, and image are required"});
   }
     var newuser={
        "id": curId++,
        "name": req.body.name,
        "gender": req.body.gender,
        "image": req.body.image || "john.png"
     };

     users.push(newuser);

     return res.status(201).json({
        "message" : "New user created " ,
        "new user": newuser
     });

       
});

app.patch("/api/users/:id", function(req, res){
    var id = Number(req.params.id);
    var index = findIndex(id);

    if(index == -1){
        return res.status(404).json({"message": "User not found with id " + id});
    }

    if(req.body.name){
        users[index].name = req.body.name;
    }
    if(req.body.gender){
        users[index].gender = req.body.gender;
    }
    if(req.body.image){
        users[index].image = req.body.image;
    }

    return res.json({
        "message": "User updated successfully with id : "+ id,
        "updated user": users[index]
    });

});

app.delete("/api/users/:id",function(req,res){
    var id =Number(req.params.id);
    var index = findIndex(id);

    if(index == -1){
        return res.status(404).json({"message": "User not found with id " + id});
    }
    var deletedUser = users[index];
    users.splice(index , 1);
    return res.json({"message":"delted user wth id :"+id ,
    "deleted user": deletedUser
    });

});


// start server and use this port
app.listen(port, function() {
  console.log(" App is running on : http://localhost:" + port);
});

