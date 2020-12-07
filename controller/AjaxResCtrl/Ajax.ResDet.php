<?php 
	require_once '../Ajax.Ctrl.php';
	require_once '../../models/Class.ResUsu.php';
	require_once '../../models/Class.ResIns.php';

	switch ($_SERVER['REQUEST_METHOD']) {
		case 'GET':
			$option = $_GET['OP'] ?? NULL;

			switch ($option) {
				
				case 'LIS':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$id = $_GET['ID'] ?? die; $outdat = false;
						
					if ((int) $pag > 0 && (int) $p_pag > 0 && (int) $id > 0) {
						settype($pag, "int"); settype($p_pag, "int"); settype($id, "int");
						
						$_GET['MOD'] ?? die;
						switch ($_GET['MOD']) {
							case 'USU': $outdat = ResDetUsu::getData($pag, $p_pag, $id); break;
							case 'INS': $outdat = ResDetIns::getData($pag, $p_pag, $id); break;
							default: die; break;
						}
					}
				break;

				case 'PRM':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$str = $_GET['STR'] ?? die; $id  = $_GET['ID'] ?? die; 
					$outdat = false;
					
					$_GET['MOD'] ?? die;
					switch ($_GET['MOD']) {
						case 'USU':
							$prm = $_GET['PAR'] ?? die; 
							if ((int) $pag > 0 && (int) $p_pag > 0 && (int) $prm >= 0 && (int) $id > 0) {
								settype($pag, "int"); settype($p_pag, "int"); settype($prm, "int"); settype($id, "int");
								$outdat = ResDetUsu::getDataFind($pag, $p_pag, $id, [$prm, $str]);
							}
						break;
						case 'INS':
							if ((int) $pag > 0 && (int) $p_pag > 0 && (int) $id > 0) {
								settype($pag, "int"); settype($p_pag, "int"); settype($id, "int");
								$outdat = ResDetIns::getDataFind($pag, $p_pag, $id, $str);
							}
						break;
						default: die; break;
					}
				break;

				case 'IDX':
					$id = $_GET['ID'] ?? die;
					$outdat = false;
					
					if ((int) $id > 0 ) {
						settype($id, "int");
						
						$_GET['MOD'] ?? die;
						switch ($_GET['MOD']) {
							case 'USU': $outdat = ResDetUsu::getDataId($id); break;
							case 'INS': $outdat = ResDetIns::getDataId($id); break;
							default: die; break;
						}
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

				case 'IU':
					$_GET['SMOD'] ?? die;

					switch ($_GET['SMOD']) {
						case 'ADD':
							if ( (int) $data['id_u'] > 0 && (int) $data['id'] > 0 && (int) $data['s_id'] > 0) {
								$id_u = $data['id_u']; $id = $data['id']; $s_id = $data['s_id'];
								settype($id_u, "int"); settype($id, "int"); settype($s_id, "int");

								$outdat = ResDetIns::pstUsuDetId($id_u, $id, $s_id);
							}
						break;
						
						case 'REM':
							if ( (int) $data['id'] > 0 && (int) $data['s_id'] > 0) {
								$id = $data['id']; $s_id = $data['s_id'];
								settype($id, "int"); settype($s_id, "int");
								
								$outdat = ResDetIns::delUsuDetId($id, $s_id);
							}
						break;
						
						default: die; break;
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