<?php

$inData = getRequestInfo();

$searchResults = "";
$searchCount = 0;

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error)
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("SELECT ID, FirstName FROM Users WHERE ID=?");
    $stmt->bind_param("i", $inData["ID"]); //si == string then integer
    $stmt->execute();

    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()){
        returnWithInfo( $row['FirstName']);
    } else {
        returnWithError("No Records Found");
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError( $err )
{
    $retValue = '{"FirstName":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $fistName )
{
    $retValue = '{"FirstName":"' . $fistName . '","error":""}';
    sendResultInfoAsJson( $retValue );
}

?>
