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

function goToHomePage()
{
	window.location.href = "Miami_HomePage.html";
}

function goToContactsPage()
{
	window.location.href = "Miami_ContactsPage.html"
}

function register()
{
	//let ID = 0;
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
				//ID = jsonObject.ID;
		
				if( jsonObject.error != "" )
				{		
					document.getElementById("loginResult").innerHTML = "Username Already Taken";
					return;
				}

				document.getElementById("loginResult").innerHTML = "Username Created";
		
				FirstName = jsonObject.FirstName;
				LastName = jsonObject.LastName;

				saveCookie();
	
				window.location.href = "Miami_ContactsPage.html";
			}
			else
			{
				document.getElementById("loginResult").innerHTML = "womp womp";
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
	let ID = 0;
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
				ID = jsonObject.ID;
		
				if( ID < 1 )
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
		window.location.href = "Miami_HomePage.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + FirstName + " " + LastName;
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

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color:newColor,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
