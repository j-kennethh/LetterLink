const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
	res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;

	console.log(firstName + "\n" + lastName + "\n" + email);
	res.send("post received");
});


app.listen(3000, function () {
    console.log("server running on port 3000");
});
