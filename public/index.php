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
 
echo "<pre>"; print_r($rows);echo "</pre>";
} catch (Exception $e) {
	echo "Error, unable to get spreadsheet data" . $e;
}
 
