var emailContainer = document.getElementById(":so").getElementsByTagName("span");
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

var subject = document.getElementById(":tp").value;

console.log("Subject: ", subject);

var contentHolder = document.getElementById(":uy");

if(contentHolder.innerText.includes("#smartMailer")) {
	contentHolder.innerHTML = ('<img src="https://media.tenor.com/EEQuJqObJMgAAAAd/pen-spinning-anime-girl.gif" alt="loading..." height="100px;">');
	
	const asyncPostCall = async () => {
		try {
			const response = await fetch('http://localhost:3000/getBody', {
				method: 'POST',
				mode: 'cors',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({"subject": subject})
			});
			const data = await response.json();
			console.log(data);
			contentHolder.innerText = data.mailBody
		} catch(error) {
        	console.log("some error occurred")
		} 
	}

	asyncPostCall()
}