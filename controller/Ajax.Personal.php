<?php 
	
	require_once 'Ajax.Ctrl.php';
	require_once '../models/Class.Personal.php';

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			
			$option = $_GET['OP'] ?? NULL;

			switch ($option) {
					
				case 'LIS':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0) {
						settype($pag, "int"); settype($p_pag, "int");
						$outdat = Personal::getData($pag, $p_pag);
					}
				break;

				case 'PRM':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$str = $_GET['STR'] ?? die;
					$outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0) {
						settype($pag, "int"); settype($p_pag, "int");	
						$outdat = Personal::getDataFind($pag, $p_pag, $str);
					}
				break;

				case 'IDX':
					$id = $_GET['ID'] ?? die;
					$outdat = false;
					
					if ((int) $id > 0 ) {
						settype($id, "int");

						$outdat = Personal::getDataId($id);
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
    			$outdat = Personal::postData($arr);
    		}
		break;

		case 'PUT':

			$option = $_GET['OP'] ?? NULL;
    		
    		$indata = file_get_contents("php://input");
    		$data = Ajax::valJsonIn($indata);

    		if (isset($data['error'])) {
    			$option = NULL;
    		}

			switch ($option) {
				case 'VER': $arr = Ajax::valParArr($data); $outdat = Personal::verPersona($arr); break;

				case 'UPD':
					$outdat = false;
					$arr = Ajax::valParArr($data[0]);
					if ((int) $data[1] > 0 ) {
						$id = $data[1]; settype($id, "int");
						$outdat = Personal::putData($arr, $id);
					}
				break;
				
				default: die; break;
			}
		break;

		default: die; break;
	}
	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
	
 ?>