<?php
$inData = getRequestInfo();

$firstName = $inData["FirstName"];
$lastName = $inData["LastName"];
$login = $inData["UserName"];
$password = $inData["Password"];

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error)
{
	returnWithError($conn->connect_error);
}
else
{
	$stmt = $conn->prepare("SELECT ID FROM Users WHERE Login=?");
	$stmt->bind_param("s", $login);
	$stmt->execute();
	$result = $stmt->get_result();

	if ($result->num_rows > 0)
	{
		$stmt->close();
		$conn->close();
		returnWithError("Username already taken");
	}
	else
	{
		$stmt->close();

		$stmt = $conn->prepare("INSERT into Users (FirstName, LastName, Login, Password) VALUES (?, ?, ?, ?)");
		$stmt->bind_param("ssss", $firstName, $lastName, $login, $password);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}
}

function getRequestInfo()
{
	return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
	header('Content-type: application/json');
	echo $obj;
}

function returnWithError($err)
{
	$retValue = '{"error":"' . $err . '"}';
	sendResultInfoAsJson($retValue);
}
?>
