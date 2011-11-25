<?php
/**
 * Clock Tea game
 * @author @tomboa @
 */

// Zend library include path
set_include_path(get_include_path() . PATH_SEPARATOR . "$_SERVER[DOCUMENT_ROOT]/ZendGdata-1.11.11/library");
 
include_once("Google_Spreadsheet.php");

//include_once("Config.php");
 
$u = GOOGLE_USERNAME;
$p = GOOGLE_PASSWORD;
$p = GOOGLE_KEY;
 
$ss = new Google_Spreadsheet($u,$p);
$ss->useSpreadsheet("TeaStats");