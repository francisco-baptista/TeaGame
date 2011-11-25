<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>HTML5 Tea Game Analytics</title>
	<style type="text/css">
		
	div.graph
		{
			width: 600px;
			height: 450px;
			float: left;
			border: 1px dashed gainsboro;
		}

	label
		{
			display: block;
			margin-left: 400px;
			padding-left: 1em;
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
			$obj = new stdClass();
			$obj->label = $row['name'];
			$obj->data = (int) $row['loses'];
			$jsonData[] = $obj;
		}
	}
	?>

	<div id="blobs" class="graph"></div>	
	
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
	<script src="/flot/jquery.flot.js"></script>
	<script src="/flot/jquery.flot.pie.js"></script>

	<script>
	var data = <?php echo json_encode($jsonData); ?>;
	/*var data = [
		{ label: "Series1",  data: 10},
		{ label: "Series2",  data: 30},
		{ label: "Series3",  data: 90},
		{ label: "Series4",  data: 70},
		{ label: "Series5",  data: 80},
		{ label: "Series6",  data: 110}
		];*/
	
	$.plot($('#blobs'),data, { series: {
            pie: { 
                show: true
           }
	}});
	
	</script>

</body>

</html>
