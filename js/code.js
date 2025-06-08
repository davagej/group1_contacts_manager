//const urlBase = 'http://142.93.51.19/LAMPAPI'; // Change to domain name
const urlBase = 'http://managemymiami4331.xyz/LAMPAPI'
const extension = 'php';

// Miami code

let userId = 0;
let FirstName = "";
let LastName = "";

function goToSignIn()
{
	window.location.href = "Miami_SignIn.html";
}

function goToSignUp()
{
	window.location.href = "Miami_SignUp.html";
}

function goToAbout()
{
	window.location.href = "Miami_AboutPage.html";
}

function goToHomePage()
{
	window.location.href = "Miami_HomePage.html";
}

function goToContactsPage()
{
	window.location.href = "Miami_ContactsPage.html"
}

function confirmDelete(ID)
{
	let result = confirm ("WARNING\nYou are about to delete a contact, which is a permanent action that cannot be undone.\nDo you want to delete this contact?");
	if (result == true)
	{
		deleteContact(ID);
	}
}

function checkFieldReg(firstName, lastName, userName, password)
{
	let flag = 1; // if 0 fields are empty, if 1 they are not empty 

	if (firstName == "")
	{
    document.getElementById("firstNamePosition").classList.add("invalid");
    flag = 0;
	}

	if (lastName == "")
	{
    document.getElementById("lastNamePosition").classList.add("invalid");
    flag = 0;
	}

	if (userName == "")
	{
    document.getElementById("usernamePosition").classList.add("invalid");
    flag = 0;
	}

	if (password == "")
	{
    document.getElementById("passwordPosition").classList.add("invalid");
    flag = 0;
	}

	return flag;
}

function checkFieldAddContact(firstName, lastName, phoneNum, email)
{
	if (firstName == "" || lastName == "" || phoneNum == "" || email == "")
	{
		return 0;
	}

	return 1;
}

function checkEmail()
{
	let emailFlag = 1; // if 0 invalid email, if 1 valid email
	let email = document.getElementById("addEmailAddress");
	let emailRequirements = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// if email doesnt follow in something@something.something format
	if (!email.value.match(emailRequirements))
	{
		document.getElementById("contactAddResult").innerHTML = "Invalid email";
		emailFlag = 0;
	}

	return emailFlag;
}

function checkPhone()
{
	let phoneFlag = 1; // if 0 invalid email, if 1 valid email
	let phoneNumber = document.getElementById("addPhoneNumber");
	let phoneNumRequirements = /^\d+$/;

	// if phone contains non-digits
	if (!phoneNumRequirements.test(phoneNumber.value))
	{
		document.getElementById("contactAddResult").innerHTML = "Invalid Phone Number";
		phoneFlag = 0;
	}
	else
	{
		if(phoneNumber.value.length > 10) 
	  {
	    document.getElementById("contactAddResult").innerHTML = "Phone Number Has too Many Digits";
			phoneFlag = 0;
	  }
	  else if (phoneNumber.value.length < 10)
	  {
	  	document.getElementById("contactAddResult").innerHTML = "Phone Number Has Not Enough Digits";
			phoneFlag = 0;
	  }
	}

	return phoneFlag;
}

function clearResultModal() {
  const element = document.activeElement.tagName;

  if (element == "INPUT")
	{
		document.getElementById("contactAddResult").innerHTML = "";
	}
}


function register()
{
	//document.getElementById("loginResult").innerHTML = "Test";
	userId = 0;
	FirstName = "";
	LastName = "";
	
	FirstName = document.getElementById("enterFirstName").value;
	LastName = document.getElementById("enterLastName").value;
	let UserName = document.getElementById("createUsername").value;
	let Password = document.getElementById("createPassword").value;

	let letter = document.getElementById("lowerCaseReq");
	let capital = document.getElementById("upperCaseReq");
	let number = document.getElementById("numberSpecialCharReq");
	let length = document.getElementById("charRangeReq");

	let letterInvalid = letter.classList.contains("invalid");
	let capitalInvalid = capital.classList.contains("invalid");
	let numberInvalid = number.classList.contains("invalid");
	let lengthInvalid = length.classList.contains("invalid");

	if (checkFieldReg(FirstName, LastName, UserName, Password) == 0)
	{
		document.getElementById("loginResult").innerHTML = "Please Fill in Empty Fields";
		return;
	}

	if (letterInvalid | capitalInvalid | numberInvalid | lengthInvalid)
	{
		document.getElementById("loginResult").innerHTML = "Invalid Password";
		return;
	}

	document.getElementById("loginResult").innerHTML = "";

  let tmp = {FirstName:FirstName,LastName:LastName,UserName:UserName,Password:Password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Register.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.ID;
		
				if( jsonObject.error != "" )
				{		
					document.getElementById("loginResult").innerHTML = "Username Already Taken";
					return;
				}

				document.getElementById("loginResult").innerHTML = "Username Created";
		
				FirstName = jsonObject.FirstName;
				LastName = jsonObject.LastName;

				saveCookie();
	
				//window.location.href = "Miami_SignIn.html";

				doLogout();
			}
			else
			{
				document.getElementById("loginResult").innerHTML = "womp";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doLogin()
{
	userId = 0;
	FirstName = "";
	LastName = "";
	
	let Login = document.getElementById("loginName").value;
	let Password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	let tmp = {Login:Login,Password:Password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.ID;
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				FirstName = jsonObject.FirstName;
				LastName = jsonObject.LastName;

				saveCookie();
	
				window.location.href = "Miami_ContactsPage.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "FirstName=" + FirstName + ",LastName=" + LastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() 
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "FirstName" )
		{
			FirstName = tokens[1];
		}
		else if( tokens[0] == "LastName" )
		{
			LastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 ) 
	{
		if (window.location.href == "http://managemymiami4331.xyz/Miami_AboutPage.html")
		{
			document.getElementById("aboutBut").innerHTML = "Home";
			document.getElementById("aboutBut").onclick = function() {goToHomePage()};
		}
		else
		{
			window.location.href = "Miami_HomePage.html";
		}
	}
	else /**/
	{
		if (window.location.href == "http://managemymiami4331.xyz/Miami_AboutPage.html")
		{
			document.getElementById("aboutBut").innerHTML = "Contacts";
			document.getElementById("aboutBut").onclick = function() {goToContactsPage()};
		}
		else
		{
			document.getElementById("userName").innerHTML = "Hello " + FirstName + " " + LastName + "," + "<br>Welcome to your contacts!";
			//document.getElementById("userName").innerHTML = userId;
		}	

		document.getElementById("logo").onclick = function() {doLogout()};
	}
}

function doLogout()
{
	userId = 0;
	FirstName = "";
	LastName = "";
	document.cookie = "FirstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "Miami_HomePage.html";
}

function addContact() 
{

	// let addFirstName="";
	// let addLastName="";
	// let addPhoneNumber="";
	// let addEmailAddress="";

	//userId = readCookie();

	//document.getElementById("contactAddResult").innerHTML = userId;

	let addFirstName = document.getElementById("addFirstName").value;
	let addLastName = document.getElementById("addLastName").value;
	let addPhoneNumber = document.getElementById("addPhoneNumber").value;
	let addEmailAddress = document.getElementById("addEmailAddress").value;
	
	document.getElementById("contactAddResult").innerHTML = "";

	if (checkFieldAddContact(addFirstName, addLastName, addPhoneNumber, addEmailAddress) == 0)
	{
		document.getElementById("contactAddResult").innerHTML = "Please Fill in Empty Fields";
		return;
	}

	if (checkEmail() == 0)
	{
		return;
	}
	else if (checkPhone() == 0)
	{
		return;
	}

	let tmp = {FirstName:addFirstName, LastName:addLastName, Phone:addPhoneNumber, Email:addEmailAddress, UserID:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				
				if (jsonObject.error != "")
				{
					document.getElementById("contactAddResult").innerHTML = jsonObject.error;
					return;
				}

				document.getElementById("contactAddResult").innerHTML = "Contact has been added!";		

				document.getElementById("addFirstName").value = "";
				document.getElementById("addLastName").value = "";
				document.getElementById("addPhoneNumber").value = "";
				document.getElementById("addEmailAddress").value = "";
				searchContact();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}	
}

function searchContact()
{
	if (document.getElementById("FirstNameEdit")) {
		//Should probably put a wraning somewhere?
		document.getElementById("contactList").innerHTML = "yuhh";
		return;
	}
	let srch = document.getElementById("searchText").value;
	document.getElementById("contactList").innerHTML = "";
	
	let ContactList = "";

	let tmp = {UserID:userId,search:srch};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Search.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Contacts(s) have been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					//This Code is for debugging. Can be commented out.
					let current = jsonObject.results[i];
					//ContactList += current.FirstName + " ";
					//ContactList += current.LastName + " ";
					//ContactList += current.Phone + " ";
					//ContactList += current.Email + " ";
					//ContactList += current.ID + " ";
					//This is the objects you can manipulate to make pretty (:
					let divID = "Div" + current.ID;
					let paraDiv = document.createElement("div");
					paraDiv.className = "contactDiv";
					paraDiv.id = divID;
					document.getElementById("contactList").appendChild(paraDiv);

					let paraF = document.createElement("div");
					paraF.innerHTML = current.FirstName;
					paraF.id = "FirstName"+current.ID;
					//paraF.style.float = 'left';
					paraF.style.display = "inline-block";
					paraF.style.borderStyle = "solid";
					paraF.style.borderColor = "#30C0B7";
					document.getElementById(divID).appendChild(paraF);

					let paraL = document.createElement("div");
					paraL.innerHTML = current.LastName;
					paraL.id = "LastName"+current.ID;
					//paraL.style.float = 'left';
					paraL.style.display = "inline-block";
					// paraL.style.position = "relative";
					// paraL.style.left = "60%";
					document.getElementById(divID).appendChild(paraL);

					let paraP = document.createElement("div");
					paraP.innerHTML = current.Phone;
					paraP.id = "PhoneNumber"+current.ID;
					paraP.style.display = "inline-block";
					// paraP.style.position = "relative";
					// paraP.style.left = "100%";
					document.getElementById(divID).appendChild(paraP);

					let paraE = document.createElement("div");
					paraE.innerHTML = current.Email;
					paraE.id = "EmailAddress" + current.ID;
					paraE.style.display = "inline-block";
					// paraE.style.position = "relative";
					// paraE.style.left = "150%";
					document.getElementById(divID).appendChild(paraE);

					//Buttons
					let EditButton = document.createElement("button");
					EditButton.className = "editButton";
					EditButton.innerHTML = "Edit";
					EditButton.id = "e" + current.ID;
					// EditButton.id = "test";
					EditButton.setAttribute("onclick","editContactStartUp("+current.ID+")");
					document.getElementById(divID).appendChild(EditButton);
					
					let deleteButton = document.createElement("button");
					deleteButton.className = "deleteButton";
					deleteButton.innerHTML = "Delete";
					deleteButton.id = "d" + current.ID;
					deleteButton.setAttribute("onclick", "confirmDelete("+current.ID+")");
					// deleteButton.setAttribute("onclick", "deleteContact("+current.ID+")");
					document.getElementById(divID).appendChild(deleteButton);
					
					//For the debugger
					if( i < jsonObject.results.length - 1 )
					{
						ContactList += "<br />\r\n";
					}
				}
				
				//document.getElementsByTagName("p")[0].innerHTML = ContactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

function editContactStartUp(ID) {
	if (document.getElementById("FirstNameEdit")) {
		//probably should post and error or something
		return;
	}
	let firstName = document.getElementById("FirstName"+ID);
	let lastName = document.getElementById("LastName"+ID);
	let phoneNumber = document.getElementById("PhoneNumber"+ID);
	let emailAddress = document.getElementById("EmailAddress"+ID);
	let editButton = document.getElementById("e"+ID);
	let deleteButton = document.getElementById("d"+ID);
	editButton.setAttribute("onclick","editContactSave("+ID+")");
	deleteButton.setAttribute("onclick","editContactCancel("+ID+")");

	let editFN = document.createElement("input");
	editFN.type = "text";
	editFN.value = firstName.innerHTML;
	editFN.id = "FirstNameEdit";
	firstName.replaceWith(editFN);
	let editLN = document.createElement("input");
	editLN.type = "text";
	editLN.value = lastName.innerHTML;
	editLN.id = "LastNameEdit";
	lastName.replaceWith(editLN);
	let editP = document.createElement("input");
	editP.type = "text";
	editP.value = phoneNumber.innerHTML;
	editP.id = "PhoneEdit";
	phoneNumber.replaceWith(editP);
	let editE= document.createElement("input");
	editE.type = "text";
	editE.value = emailAddress.innerHTML;
	editE.id = "EmailEdit";
	emailAddress.replaceWith(editE);

	editButton.innerHTML = "Save"
	deleteButton.innerHTML = "Cancel";
}

function editContactSave(ID) {
	let firstName = document.getElementById("FirstNameEdit").value;
	let lastName = document.getElementById("LastNameEdit").value;
	let phoneNumber = document.getElementById("PhoneEdit").value;
	let emailAddress = document.getElementById("EmailEdit").value;

	let temp = {ContactID:ID, UserID:userId, FirstName:firstName, LastName:lastName, Phone:phoneNumber,Email:emailAddress};
	let jsonPayload = JSON.stringify(temp);
	let url = urlBase +'/UpdateContact.'+extension;
	document.getElementById("contactSearchResult").innerHTML = jsonPayload;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("contactSearchResult").innerHTML = "Contact has been edited successfully";
				let jsonObject = JSON.parse( xhr.responseText );
				if (jsonObject.error != "") {
					document.getElementById("contactSearchResult").innerHTML = jsonObject.error;
				} else {
					document.getElementById("FirstNameEdit").id = "NULL";
					searchContact();
				}
			} else {

			}
		};
		xhr.send(jsonPayload);
	} catch {
		document.getElementById("contactSearchResult").innerHTML = "RIP";
	}
}

function editContactCancel(ID) {
	document.getElementById("FirstNameEdit").id = "NULL";
	searchContact();
}

function deleteContact(ID) {
	let temp = {ContactID:ID, UserID:userId};
	let jsonPayload = JSON.stringify(temp);
	let url = urlBase +'/DeleteContact.'+extension;
	document.getElementById("contactSearchResult").innerHTML = jsonPayload;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("contactSearchResult").innerHTML = "Contact has been removed";
				let jsonObject = JSON.parse( xhr.responseText );
				if (jsonObject.error != "") {
					document.getElementById("contactSearchResult").innerHTML = jsonObject.error;
				} else {
					searchContact();
				}
			} else {

			}
		};
		xhr.send(jsonPayload);
	} catch {
		document.getElementById("contactSearchResult").innerHTML = "RIP";
	}
}
