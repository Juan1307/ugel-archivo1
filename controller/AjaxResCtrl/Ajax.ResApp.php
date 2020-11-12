<?php 

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':

			require_once __DIR__.'/../../models/Abs_Class/Abs.ResApp.php';	
			$outdat = Res::getAreaMoti();

		break;

		case 'PUT':
			//PARA CAMBIAR EL ESTADO PARA API
		break;

		case 'DELETE': 
			//PARA eLIMINAR uNA RESOLUCION
		break;
			
		default: die; break;
	}

	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
 ?>