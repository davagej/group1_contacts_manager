<?php

$inData = getRequestInfo();

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

if ($conn->connect_error) 
{
    returnWithError($conn->connect_error);
} 
else 
{
    $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Phone=?, Email=? WHERE ID=? AND UserID=?");
    $stmt->bind_param("ssssii", $inData["FirstName"], $inData["LastName"], $inData["Phone"], $inData["Email"], $inData["ContactID"], $inData["UserID"]);
    $stmt->execute();

    if ($stmt->affected_rows > 0) 
    {
        returnWithError("");
    } 
    else 
    {
        returnWithError("Update failed. Check ContactID and UserID.");
    }

    $stmt->close();
    $conn->close();
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
