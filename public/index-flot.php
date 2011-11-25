<?php
/**
 * Clock Tea game
 * @author @tomboa @
 */

include_once("Google_Spreadsheet.php");

include_once("Config.php");
 
$ss = new Google_Spreadsheet(GOOGLE_USERNAME,GOOGLE_PASSWORD);
$ss->useSpreadsheet("TeaStats");
$ss->useWorksheet("Sheet1");

try {
	$rows = $ss->getRows();
} catch (Exception $e) {
	echo "Error, unable to get spreadsheet data" . $e;
}
 
include_once("View-flot.php");
