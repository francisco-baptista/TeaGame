<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>HTML5 Tea Game Analytics</title>
	<style type="text/css">
		
	body {
			background: #292929;
      font-family: "Lucida Grande", Verdana, Arial, Helvetica, sans-serif;
      font-size: 11px;
      color: white;
      width: 800px;
      margin: 40px auto;
    }
    
    table {
      float: left; padding-top: 23px;
    }
    
    th { display: none; }
    
    td:nth-child(1) {
      text-align: right; padding-right: 6px; width: 90px;
      border-right: 1px solid #999;
    }
    td:nth-child(2) {
      background-color: rgba(55, 200, 200, 1);
      border-left: 4px solid #222;
      margin: 0; padding: 0;
      height: 26px; width: 100%;
      display: block; position: relative;
      overflow: visible !important;
    }
    tr:nth-child(2) td:nth-child(2) { background-color: rgba(55, 200, 200, 1.0); }
    tr:nth-child(3) td:nth-child(2) { background-color: rgba(55, 200, 200, 0.8); }
    tr:nth-child(4) td:nth-child(2) { background-color: rgba(55, 200, 200, 0.6); }
    tr:nth-child(5) td:nth-child(2) { background-color: rgba(55, 200, 200, 0.4); }
    tr:nth-child(6) td:nth-child(2) { background-color: rgba(55, 200, 200, 0.3); }
    tr:nth-child(7) td:nth-child(2) { background-color: rgba(55, 200, 200, 0.2); }
    
    td:nth-child(2) span {
      position: absolute; top: 7px; left: 3px;
    }
	</style>
</head>

<body>

	<h1>Tea Game Analysis</h1>

	<?php 
	$jsonData = array();
	foreach($rows as $row)
	{
		if($row['name']!="" && $row['loses']!=""){
			$jsonData[$row['name']] = $row['loses'];
		}
	}
	?>

	<canvas id="blobs">
	</canvas>
	
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
	<script src="/flot/jquery.flot.js"></script>
	<script src="/flot/jquery.flot.pie.js"></script>

	<script>
	data = <?php echo json_encode($jsonData); ?>;
	$.plot($('#blobs'),data,  series: {
            pie: { 
                show: true
           }
        });
	
	</script>

</body>

</html>
