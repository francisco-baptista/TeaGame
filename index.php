<?php
/**
 * Clock Tea game
 * @author @tomboa @
 */

// Zend library include path
set_include_path(get_include_path() . PATH_SEPARATOR . $_SERVER['DOCUMENT_ROOT'] . "/ClockTeaGame/ZendGdata-1.11.11/library");
 
include_once("Google_Spreadsheet.php");

include_once("Config.php");
 
$ss = new Google_Spreadsheet(GOOGLE_USERNAME,GOOGLE_PASSWORD);
$ss->useSpreadsheet("TeaStats");
$ss->useWorksheet("Sheet1");
 
$rows = $ss->getRows('Room="1stFloorServices"');
 