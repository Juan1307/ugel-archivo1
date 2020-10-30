<?php 
	
	require_once 'Ajax.Ctrl.php';
	require_once '../models/Class.Usuario.php';

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			
			$option = $_GET['OP'] ?? NULL;

			switch ($option) {
				case 'INI':
					$outdat = UserPro::getStatus();
				break;
					
				case 'LIS':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0) {
						settype($pag, "int"); settype($p_pag, "int");
						$outdat = UserPro::getData($pag, $p_pag);
					}
				break;

				case 'PRM':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$prm = $_GET['PAR'] ?? die; $str = $_GET['STR'] ?? die;
					$outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0 && (int) $prm >= 0) {
						settype($pag, "int"); settype($p_pag, "int");
						settype($prm, "int"); $arr = [$prm, $str];
						
						$outdat = UserPro::getDataFind($pag, $p_pag, $arr);
					}
				break;

				case 'IDX':
					$id = $_GET['ID'] ?? die;
					$outdat = false;
					
					if ((int) $id > 0 ) {
						settype($id, "int");

						$outdat = UserPro::getDataId($id);
					}
				break;

				case 'IDE':
					$id = $_GET['ID'] ?? die;
					$outdat = false;

					if ((int) $id > 0) {
						settype($id, "int");

						$outdat = UserPro::getDataEst($id);
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
    			$outdat = UserPro::postData($arr);
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
				case 'VER':
					$type = ( (int) $data[2] > 0 ) ? $data[2] : false;

					$vdni = false;
					if ((int) $data[0] && strlen($data[0]) == 8) {
						
						$ndni = $data[0]; settype($ndni, "int");
						$vdni = User::filterDni($ndni, $type);
					}

					$vcrn = false;
					if ((int) $data[1] && strlen($data[1]) >= 2) {
						
						$ncrn = $data[1]; settype($ncrn, "int");
						$vcrn = User::filterCrn($ncrn, $type);
					}

					$outdat = [$vdni, $vcrn];
				break;

				case 'UPD':
					$outdat = false;
					$arr = Ajax::valParArr($data['data']);
					
					if ((int) $data['id'] > 0 ) {

						$id = $data['id']; settype($id, "int");
						$outdat = UserPro::putData($arr, $id);
					}
				break;
				
				default: die; break;
			}
		break;

		default: die; break;
	}
	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
	
 ?>