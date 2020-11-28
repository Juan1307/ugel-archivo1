<?php 
	require_once '../Ajax.Ctrl.php';
	require_once __DIR__.'/../../models/Abs_Class/Abs.ResApp.php';	
	
	switch ($_SERVER['REQUEST_METHOD']) {
		
		case 'GET': $outdat = Res::getAreaMoti(); break;

		case 'PUT':
    		$indata = file_get_contents("php://input");
    		$data = Ajax::valJsonIn($indata);

    		$outdat = false;
    		if ((int) $data['id'] > 0 && (int) $data['est'] == 0 || (int) $data['est'] == 1) {
    			$id = $data['id']; $est = $data['est'];
    			settype($id, "int"); settype($est, "int");

    			$outdat = ReS::chaResAll($id, $est);
    		}
		break;
			
		default: die; break;
	}

	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
 ?>