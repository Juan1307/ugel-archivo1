<?php 
	require_once '../Ajax.Ctrl.php';
	require_once '../../models/Class.ResUsu.php';

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			$option = $_GET['OP'] ?? NULL;

			switch ($option) {
				
				case 'LIS':

				break;

				case 'PRM':
					
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
		   		$outdat = ResUsu::pstData($data['data'], $data['arr'], $arr_fil);
		   	}else{
		   		$outdat = false;
		   	}

		break;

		case 'PUT':

		break;
			
		default: die; break;
	}

	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
 ?>