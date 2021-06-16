<?php 
	require_once '../Ajax.Ctrl.php';	
	require_once __DIR__.'/../../models/Abs_Class/Abs.Control.php';		

	switch ($_SERVER['REQUEST_METHOD']) {
		
		case 'GET': 
			
			$option = $_GET['OP'] ?? die;
			$outdat = false;

			switch ($option) {
				
				case 'PER': $outdat = Control::getAreaPers(); break;

				case 'LIS':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0) {
						settype($pag, "int"); settype($p_pag, "int");
						$outdat = Control::getDataRes($pag, $p_pag);
					}
				break;

				case 'PRM':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$str = $_GET['STR'] ?? die; $outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0 && is_numeric($str) ) {
						settype($pag, "int"); settype($p_pag, "int");
						$outdat = Control::getDataResFind($pag, $p_pag, $str);
					}
				break;
				
				default: die; break;
			}
		break;
			
		default: die; break;
	}

	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
 ?>