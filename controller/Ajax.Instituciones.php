<?php 
	
	require_once 'Ajax.Ctrl.php';
	require_once '../models/Class.Institucion.php';

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			
			$option = $_GET['OP'] ?? NULL;

			switch ($option) {
					
				case 'LIS':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0) {
						settype($pag, "int"); settype($p_pag, "int");
						$outdat = InstiPro::getData($pag, $p_pag);
					}
				break;

				case 'PRM':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$str = $_GET['STR'] ?? die; $outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0) {
						settype($pag, "int"); settype($p_pag, "int");						
						$outdat = InstiPro::getDataFind($pag, $p_pag, $str);
					}
				break;

				case 'IDX':
					$id = $_GET['ID'] ?? die;
					$outdat = false;
					
					if ((int) $id > 0 ) {
						settype($id, "int");
						$outdat = InstiPro::getDataId($id);
					}
				break;

				case 'IDE':
					$id = $_GET['ID'] ?? die;
					$outdat = false;

					if ((int) $id > 0) {
						settype($id, "int");
						$outdat = InstiPro::getDataEst($id);
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
    			$n_lvl = $arr[1];

    			if ( (int) $n_lvl == 0 || (int) $n_lvl == 1 || (int) $n_lvl == 2) {
    				settype($n_lvl, "int");
    				$lvl = InstiPro::levelAdd($n_lvl);
    				
    				$arr = [$arr[0], $lvl];
    				$outdat = InstiPro::postData($arr);
				}else{
    				$outdat = false;
				}    				
    		}
		break;

		case 'PUT':

			$option = $_GET['OP'] ?? die;
    		
    		$indata = file_get_contents("php://input");
    		$data = Ajax::valJsonIn($indata);

    		if (isset($data['error'])) {
    			$option = NULL;
    		}

			switch ($option) {
				case 'VER':
	    			$outdat = false;
					$arr = Ajax::ValParArr($data);
	    			
	    			$ins = $arr[0];
	    			$n_lvl = $arr[1];
	    			if ( (int) $n_lvl == 0 || (int) $n_lvl == 1 || (int) $n_lvl == 2) {
	    				settype($n_lvl, "int");
	    				$lvl = InstiPro::levelAdd($n_lvl);
	    				
	    				$outdat = InstiPro::verInsti($ins, $lvl);
					}
				break;

				case 'UPD':
					$outdat = false;
					$arr = Ajax::valParArr($data['data']);
	    			$n_lvl = $arr[1];
					
					if ((int) $data['id'] > 0 && (int) $n_lvl == 0 || (int) $n_lvl == 1 || (int) $n_lvl == 2) {
						settype($n_lvl, "int"); 
	    				$lvl = InstiPro::levelAdd($n_lvl);

						$id = $data['id']; 
						settype($id, "int");
	    				
		    			$arr = [$arr[0], $lvl];
						$outdat = InstiPro::putData($arr, $id);
					}
				break;
				
				default: die; break;
			}
		break;

		default: die; break;
	}

	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
 ?>