<?php

	$inData = getRequestInfo();

	$firstName = $inData["FirstName"];
	$lastName = $inData["LastName"];
	$phone = $inData["Phone"];
	$email = $inData["Email"];
	$userId = $inData["UserID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
	else
	{
		// Check for duplicate contact for this user
		$stmt = $conn->prepare("SELECT ID FROM Contacts WHERE FirstName=? AND LastName=? AND Phone=? AND Email=? AND UserID=?");
		$stmt->bind_param("ssssi", $firstName, $lastName, $phone, $email, $userId);
		$stmt->execute();
		$result = $stmt->get_result();

		if ($result->num_rows > 0)
		{
			$stmt->close();
			$conn->close();
			returnWithError("Contact already exists.");
		}
		else
		{
			$stmt->close();
			// Insert new contact
			$stmt = $conn->prepare("INSERT into Contacts (FirstName, LastName, Phone, Email, UserID) VALUES (?, ?, ?, ?, ?)");
			$stmt->bind_param("ssssi", $firstName, $lastName, $phone, $email, $userId);
			$stmt->execute();
			$stmt->close();
			$conn->close();
			returnWithError(""); // No error = success
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
