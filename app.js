const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const secrets = require("./test.js");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
	res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				}
			}
		]
	};

	const jsonData = JSON.stringify(data);
	const url = "https://us21.api.mailchimp.com/3.0/lists/" + secrets.LISTID;
	const options = {
		method: "POST",
		auth: "j-kenneth:" + secrets.APIKEY,
	};

	const request = https.request(url, options, function (response) {
		response.on("data", function (data) {
			console.log(JSON.parse(data));
		});
	});

	request.write(jsonData);
	request.end();
});


app.listen(3000, function () {
    console.log("server running on port 3000");
});
