//console.log("Hello world");
// var
// const
// let
// json
var users = [
    {
        "name" : "John Doe",
        "gender" : "Male",
        "image" : "john.png"
    },
    {
        "name" : "Jane Doe",
        "gender" : "Female",
        "image" : "jane.png"
    }
];

var id = 0;

//hw3

//DOM Manipulation - Document Object Model. 

function toggleUser(){
    var userName = document.getElementById("user-name");
    var userGender = document.getElementById("user-gender");
    var userImage = document.getElementById("user-image");

    id = (id + 1) % 2;

    userName.innerHTML = users[id].name;
    userGender.innerHTML = users[id].gender;
    userImage.src = users[id].image;
}

function randomUser(){

    //hw4 - fetch

    fetch("https://randomuser.me/api")

        //hw5 - arrow function
        .then(res => res.json())
        .then(data => {
            var userName = document.getElementById("user-name");
            var userGender = document.getElementById("user-gender");
            var userImage = document.getElementById("user-image");

            userName.innerHTML = data.results[0].name.first + " " + data.results[0].name.last;
            userGender.innerHTML = data.results[0].gender;
            userImage.src = data.results[0].picture.large;
        })
}