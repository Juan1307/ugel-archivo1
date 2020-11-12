<?php 
	require_once '../Ajax.Ctrl.php';
	require_once '../../models/Class.ResUsu.php';

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			$option = $_GET['OP'] ?? NULL;

			switch ($option) {
				
				case 'LIS':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0) {
						settype($pag, "int"); settype($p_pag, "int");
						$outdat = ResUsu::getData($pag, $p_pag);
					}
				break;

				case 'PRM':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$prm = $_GET['PAR'] ?? die; $str = $_GET['STR'] ?? die;
					$outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0 && (int) $prm >= 0) {
						settype($pag, "int"); settype($p_pag, "int");
						settype($prm, "int"); $arr = [$prm, str_replace('/', '-', $str)];
						$outdat = ResUsu::getDataFind($pag, $p_pag,$arr);
					}
				break;

				case 'IDX':
					$id = $_GET['ID'] ?? die;
					$outdat = false;
					
					if ((int) $id > 0 ) {
						settype($id, "int");

						$outdat = ResUsu::getDataId($id);
					}
				break;

				case 'DET':
					
				break;

				default: die; break;
			}
		break;

		case 'POST':
			//Get data by origin formdata Object :b
		    $arr_fil = NULL;
		    
		    if (count($_FILES) > 0) {
		    	$arr_fil = Ajax::valFilesIn($_FILES);
		    }
		   	$data = Ajax::valJsonIn($_POST['data']);
		   	
		   	if (!isset($arr_fil['error']) && !isset($data['error'])) {
		   		$opt = $_GET['OP'] ?? die;

		   		switch ($opt) {
		   			case 'PST':
		   				$outdat = ResUsu::pstData($data['data'], $data['arr'], $arr_fil);
		   			break;
		   			
		   			case 'PUT':
		   				$outdat = false;
		   				
		   				if ((int) $data['id'] > 0 ) {
							$id = $data['id']; settype($id, "int");
		   					$outdat = ResUsu::putData($data['data'], $id, $arr_fil);
						}
		   			break;
		   		}
		   	}else{
		   		$outdat = false;
		   	}
		break;
			
		default: die; break;
	}

	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
 ?>