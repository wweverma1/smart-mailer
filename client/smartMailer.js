var contentHolder = document.getElementById(":si");

if(contentHolder.innerText.includes("#smartMailer")) {
	contentHolder.innerText = "";
	contentHolder.innerHTML = ('<img src="https://media.tenor.com/EEQuJqObJMgAAAAd/pen-spinning-anime-girl.gif" alt="loading..." height="100px;">');
}

var emailContainer = document.getElementById(":q8").getElementsByTagName("span");
var email = emailContainer[0].innerText;
var name;

if(email.indexOf('@') > -1) {
	name = "<Insert Reciever's Name>"
	console.log("Reciever's Email: ", email);
}
else {
	name = email;
}
console.log("Reciever's Name: ", name)

var subject = document.getElementById(":r9").value;

console.log("Subject: ", subject);
