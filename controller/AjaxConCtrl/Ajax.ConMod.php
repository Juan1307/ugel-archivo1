<?php 
	require_once '../Ajax.Ctrl.php';	
	require_once '../../models/Class.Control.php';		

	switch ($_SERVER['REQUEST_METHOD']) {
		
		case 'GET': 
			
			$option = $_GET['OP'] ?? die;
			$outdat = false;

			switch ($option) {
				
				case 'LIS':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0) {
						settype($pag, "int"); settype($p_pag, "int");
						$outdat = ConPro::getData($pag, $p_pag);
					}
				break;

				case 'PRM':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$prm = $_GET['PAR'] ?? die; $str = $_GET['STR'] ?? die;
					$outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0 && (int) $prm >= 0) {
						settype($pag, "int"); settype($p_pag, "int");
						settype($prm, "int"); $arr = [$prm, $str];
						
						$outdat = ConPro::getDataFind($pag, $p_pag, $arr);
					}
				break;
				
				case 'IDX':
					$id = $_GET['ID'] ?? die;
					$outdat = false;
					
					if ((int) $id > 0 ) {
						settype($id, "int");

						$outdat = ConPro::getDataId($id);
					}
				break;

				case 'EST':
					$id = $_GET['ID'] ?? die;
					$outdat = false;
					
					if ((int) $id > 0 ) {
						settype($id, "int");

						$outdat = ConPro::getDataIdDet($id);
					}
				break;
				
				default: die; break;
			}
		break;

		case 'POST':
    		$indata = file_get_contents("php://input");
    		$data = Ajax::valJsonIn($indata);
    		
    		$outdat = false;
    		if (isset($data["data"],$data["arr"])) {
    			$dat = $data["data"];
    			if ((int) $dat['employe'] > 0 && (int) $dat['area'] > 0 && (int) $dat['folios'] > 0 && count($data["arr"]) > 0) {
    				$outdat = ConPro::postData($dat, $data["arr"]);
    			}
    		}
		break;

		case 'PUT':
    		$indata = file_get_contents("php://input");
    		$data = Ajax::valJsonIn($indata);

    		$option = $_GET['OP'] ?? die;
    		$outdat = false;
    		switch ($option) {

    			case 'UPD':
    				$dat = $data['data'];
    				if ((int) $dat['employe'] > 0 && (int) $dat['area'] > 0 && (int) $dat['folios'] > 0 && $data['id'] > 0) {
    					$id = $data['id']; settype($id, "int");
    					$outdat = ConPro::putData($dat, $id);
    				}
    			break;

    			case 'CHG':
    				if ((int) $data['id'] > 0 && (int) $data['est'] == 0 || (int) $data['est'] == 1) {
    					$id = $data['id']; $est = $data['est']; settype($id, "int"); settype($est, "int");
    					$outdat = ConPro::chaEst($id, $est);
    				}
    			break;

    			case 'D_UPD':
    				if ( (int) $data['id'] > 0 && !empty($data['fec'])) {
						$id = $data['id']; 
						settype($id, "int");
						
						$fec = date('Y-m-d',strtotime($data['fec'])); 
						$outdat = ConPro::postDataDetId($id, $fec);
					}
    			break;

    			case 'D_CHG':
    				if ( (int) $data['id'] > 0 && (int) $data['est'] == 0 || (int) $data['est'] == 1) {
						$id = $data['id']; $est = $data['est'];
						settype($id, "int"); settype($est, "int");
						
						$outdat = ConPro::chaDetId($id, $est);
					}
    			break;

    			default: die; break;
    		}

		break;

		case 'DELETE':

		    $option = $_GET['OP'] ?? die;
    		$outdat = false;
			
			switch ($option) {
				case 'CON':
					$id = $_GET['ID'] ?? die;					
					if ((int) $id > 0 ) {
						settype($id, "int");
						$outdat = ConPro::delData($id);
					}
				break;

				case 'DET':
					$id = $_GET['ID'] ?? die;		
					$s_id = $_GET['S_ID'] ?? die;

					if ((int) $id > 0 && (int) $s_id > 0) {
						settype($id, "int");
						settype($s_id, "int");
						$outdat = ConPro::delDetData($s_id,$id);
					}					
				break;
				
				default: die; break;
			}

		break;
			
		default: die; break;
	}

	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
 ?>