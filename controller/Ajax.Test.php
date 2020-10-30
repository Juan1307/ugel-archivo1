<?php 

	$array = false;
	echo json_encode($array, true);
	
	$data = array('name' => 'Carlos' , 'surname' =>'amiksñññóós' ,'age' => 12 ,'gender' => NULL );
	
	$ndata = [];
	foreach ($data as $val) {
		$ndata[] = ($val == '' || $val == null) ? null : mb_strtoupper($val);
	}

	var_export($ndata);

	$timestamp = strtotime('1973-04-18');
	var_export($timestamp);
	
	echo "<hr>";

	$new_date_format = date('d-m-Y', strtotime('2010-07-21'));
	var_export($new_date_format);


	/*if (is_numeric(($pag and $p_pag))) {
		echo "es entero $pag - $p_pag</hr>";
	}

	var_dump( (int) $pag);
	var_dump( (int) $p_pag);
	if (is_numeric()) {
		echo "son numeros";
	}else {
		echo "no son numeros";
	}*/

 ?>