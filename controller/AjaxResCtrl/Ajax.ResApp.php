<?php 
	require_once '../Ajax.Ctrl.php';
	require_once __DIR__.'/../../models/Abs_Class/Abs.ResApp.php';	
	
	switch ($_SERVER['REQUEST_METHOD']) {
		
		case 'GET': 
			
			$option = $_GET['OP'] ?? die;
			$outdat = false;

			switch ($option) {
				case 'MOT': $outdat = Res::getAreaMoti(); break;

				case 'GBL':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$str = $_GET['STR'] ?? die;
					
					if ((int) $pag > 0 && (int) $p_pag > 0) {
						settype($pag, "int"); settype($p_pag, "int");

						require_once __DIR__.'/../../models/Abs_Class/Abs.ResDet.php';
						$outdat = Det::getDataResAll($pag, $p_pag, $str);
					}
				break;
				
				default: die; break;
			}
		break;

		case 'PUT':
    		$indata = file_get_contents("php://input");
    		$data = Ajax::valJsonIn($indata);

    		$outdat = false;
    		if ((int) $data['id'] > 0 && (int) $data['est'] == 0 || (int) $data['est'] == 1) {
    			$id = $data['id']; $est = $data['est'];
    			settype($id, "int"); settype($est, "int");

    			$outdat = Res::chaResAll($id, $est);
    		}
		break;
			
		default: die; break;
	}

	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
 ?>