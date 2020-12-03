<?php 
	require_once '../Ajax.Ctrl.php';
	require_once '../../models/Class.ResUsu.php';

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			$option = $_GET['OP'] ?? NULL;

			switch ($option) {
				
				case 'LIS':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$id = $_GET['ID'] ?? die; $outdat = false;
						
					if ((int) $pag > 0 && (int) $p_pag > 0 && (int) $id > 0) {
						settype($pag, "int"); settype($p_pag, "int"); settype($id, "int");
						$outdat = ResDetUsu::getData($pag, $p_pag, $id);
						/*
						$_GET['MOD'] ?? die;
						switch ($_GET['MOD']) {
							case 'USU': $outdat = ResUsu::getData($pag, $p_pag); break;
							case 'INS': $outdat = ResIns::getData($pag, $p_pag); break;
							default: die; break;
						}*/
					}
				break;

				case 'PRM':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$prm = $_GET['PAR'] ?? die; $str = $_GET['STR'] ?? die;
					$id  = $_GET['ID'] ?? die; $outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0 && (int) $prm >= 0 && (int) $id > 0) {
						settype($pag, "int"); settype($p_pag, "int"); settype($prm, "int"); settype($id, "int");
						
						$outdat = ResDetUsu::getDataFind($pag, $p_pag, $id, [$prm, $str]);
					}
				break;

				case 'IDX':
					$id = $_GET['ID'] ?? die;
					$outdat = false;
					
					if ((int) $id > 0 ) {
						settype($id, "int");
						
						$outdat = ResDetUsu::getDataId($id);
						/*$_GET['MOD'] ?? die;
						switch ($_GET['MOD']) {
							case 'USU': $outdat = ResUsu::getDataId($id); break;
							case 'INS': $outdat = ResIns::getDataId($id); break;
							default: die; break;
						}*/
					}
				break;

				default: die; break;
			}
		break;

		case 'POST':

    		$indata = file_get_contents("php://input");
    		$data = Ajax::valJsonIn($indata);

			$option = $_GET['MOD'] ?? die;
			$outdat = false;

			if ((int) $data['id'] > 0 && (int) $data['id_r'] > 0) {
				$id = $data['id']; $id_r= $data['id_r'];
				settype($id, "int"); settype($id_r, "int");
				
				switch ($option) {
					case 'USU': $outdat = ResDetUsu::pstDetDataId($id, $id_r); break;
					case 'INS': $outdat = ResDetIns::pstDetDataId($id, $id_r); break;
					default: die; break;
				}
			}

		break;

		case 'PUT':
    		$indata = file_get_contents("php://input");
    		$data = Ajax::valJsonIn($indata);
    		
			$option = $_GET['OP'] ?? die; 
			$outdat = false;
			
			switch ($option) {
				case 'EST':
					if ( (int) $data['id'] > 0 && (int) $data['est'] == 0 || (int) $data['est'] == 1) {
						$id = $data['id']; $est = $data['est'];
						settype($id, "int"); settype($est, "int");
						
						$outdat = Det::chaDetRes($id, $est);
					}
				break;

				case 'DAT':
					if ( (int) $data['id'] > 0 && !empty($data['fec'])) {
						$id = $data['id']; 
						settype($id, "int");
						
						$fec = date('Y-m-d',strtotime($data['fec'])); 

						$outdat = Det::pstDataDetId($id, $fec);
					}
				break;
							
				default: die; break;
			}			
		break;

		case 'DELETE':
			$id = $_GET['ID'] ?? die; $s_id = $_GET['IDS'] ?? die;
			$outdat = false;
					
			if ((int) $id > 0 ) {
				settype($id, "int"); settype($s_id, "int");
				$outdat = Det::delDetDataId($id, $s_id);	
			}
		break;
			
		default: die; break;
	}

	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
 ?>