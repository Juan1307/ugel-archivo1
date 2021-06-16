<?php 
	
	require_once 'Ajax.Ctrl.php';
	require_once '../models/Class.AreMot.php';

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			$option = $_GET['OP'] ?? NULL;

			switch ($option) {
				case 'LIS':
					$outdat = false;
					$mod = $_GET['MOD'] ?? NULL;
					switch ($mod) {
						case 'A': $outdat = AreMot::getData(true); break;
						case 'M': $outdat = AreMot::getData(false); break;
						default: die; break;
					}
				break;
				
				case 'IDX':
					$id = $_GET['ID'] ?? die;
					$outdat = false;
					
					if ((int) $id > 0 ) {
						$mod = $_GET['MOD'] ?? NULL;
						settype($id, "int");
						switch ($mod) {
							case 'A': $outdat = AreMot::getDataId(true, $id); break;
							case 'M': $outdat = AreMot::getDataId(false, $id); break;
							default: die; break;
						}
					}
				break;	
								
				default: die; break;
			}

		break;
		
		case 'POST':
    		
    		$indata = file_get_contents("php://input");
    		$data = Ajax::valJsonIn($indata);

    		if (isset($data['error'])) {
    			$outdat = false;
    		}else{
    			$arr = Ajax::ValParArr($data);
    			switch ($arr[1]) {
    				case 'A': $outdat = AreMot::postData(true, $arr[0]); break;
    				case 'M': $outdat = AreMot::postData(false, $arr[0]); break;
    				default: die; break;
    			}
    		}
		break;

		case 'PUT':

			$option = $_GET['OP'] ?? NULL;
    		
    		$indata = file_get_contents("php://input");
    		$data = Ajax::valJsonIn($indata);
    		$arr = Ajax::ValParArr($data);

    		if (isset($data['error'])) {
    			$option = NULL;
    		}

			switch ($option) {
				case 'VER':
					$mod = $arr[1];
					switch ($mod) {
						case 'A': $outdat = AreMot::verOfMt(true, $arr[0]); break;
						case 'M': $outdat = AreMot::verOfMt(false, $arr[0]); break;
						default: die; break;
					}
				break;

				case 'UPD':
					$outdat = false;
	    			
					if ((int) $data[2] > 0 ) {
						$id = $data[2]; settype($id, "int");
						
						switch ($arr[1]) {
							case 'A': $outdat = AreMot::putData(true, $arr[0], $id); break;
							case 'M': $outdat = AreMot::putData(false, $arr[0], $id); break;
							default: die; break;
						}
					}
				break;
				
				default: die; break;
			}
		break;

		default: die; break;
	}
	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
	
 ?>