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
					$outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0) {
						settype($pag, "int"); settype($p_pag, "int");
						
						$_GET['MOD'] ?? die;
						switch ($_GET['MOD']) {
							case 'USU': $outdat = ResUsu::getData($pag, $p_pag); break;
							case 'INS': $outdat = ResIns::getData($pag, $p_pag); break;
							default: die; break;
						}
						//$outdata = ResUsu::getData($pag, $p_pag);
					}
				break;

				case 'PRM':
					$pag = $_GET['PAG'] ?? die; $p_pag = $_GET['PPAG'] ?? die;
					$prm = $_GET['PAR'] ?? die; $str = $_GET['STR'] ?? die;
					$nstr = Ajax::valJsonIn($str); $outdat = false;

					if ((int) $pag > 0 && (int) $p_pag > 0 && (int) $prm >= 0 && !isset($nstr['error'])) {
						settype($pag, "int"); settype($p_pag, "int"); settype($prm, "int");
						$varr = Res::valMonthYear([$prm, $nstr]);

						if (!isset($val['error'])) {

							$_GET['MOD'] ?? die;
							switch ($_GET['MOD']) {
								case 'USU': $outdat = ResUsu::getDataFind($pag, $p_pag, [$prm, $varr]); break;
								case 'INS': $outdat = ResIns::getDataFind($pag, $p_pag, [$prm, $varr]); break;
								default: die; break;
							}
							//$outdat = ResUsu::getDataFind($pag, $p_pag, [$prm, $varr]);
						}
					}
				break;

				case 'IDX':
					$id = $_GET['ID'] ?? die;
					$outdat = false;
					
					if ((int) $id > 0 ) {
						settype($id, "int");

						$_GET['MOD'] ?? die;
						switch ($_GET['MOD']) {
							case 'USU': $outdat = ResUsu::getDataId($id); break;
							case 'INS': $outdat = ResIns::getDataId($id); break;
							default: die; break;
						}
						//$outdat = ResUsu::getDataId($id);
					}
				break;

				case 'DET':
					$id = $_GET['ID'] ?? die;
					$outdat = false;
					
					if ((int) $id > 0 ) {
						settype($id, "int");
						
						$_GET['MOD'] ?? die;
						switch ($_GET['MOD']) {
							case 'USU': $outdat = ResUsu::getDetDataId($id); break;
							case 'INS': $outdat = ResIns::getDetDataId($id); break;
							default: die; break;
						}
						//$outdat = ResUsu::getDetDataId($id);
					}

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
		   		$option = $_GET['OP'] ?? die;

		   		switch ($option) {
		   			case 'PST':
		   				
		   				$_GET['MOD'] ?? die;
		   				switch ($_GET['MOD']) {
							case 'USU': $outdat = ResUsu::pstData($data['data'], $data['arr'], $arr_fil); break;
							case 'INS': $outdat = ResIns::pstData($data['data'], $data['arr'], $arr_fil); break;
							default: die; break;
						}
		   				
		   				//$outdat = ResUsu::pstData($data['data'], $data['arr'], $arr_fil);
		   			break;
		   			
		   			case 'PUT':
		   				$outdat = false;
		   				if ((int) $data['id'] > 0 ) {
							$id = $data['id']; settype($id, "int");		   				

							$_GET['MOD'] ?? die;
							switch ($_GET['MOD']) {
								case 'USU': $outdat = ResUsu::putData($data['data'], $id, $arr_fil); break;
								case 'INS': $outdat = ResIns::putData($data['data'], $id, $arr_fil); break;
								default: die; break;
							}	
		   					//$outdat = ResUsu::putData($data['data'], $id, $arr_fil);
						}
		   			break;

		   			default: die; break;
		   		}
		   	}else{
		   		$outdat = false;
		   	}
		break;


		case 'DELETE':
			$option =  $_GET['OP'] ?? die;

			switch ($option) {
				case 'RES':
					$id = $_GET['ID'] ?? die;
					$outdat = false;
					
					if ((int) $id > 0 ) {
						settype($id, "int");

						$_GET['MOD'] ?? die;
						switch ($_GET['MOD']) {
							case 'USU': $outdat = ResUsu::delData($id, false); break;
							case 'INS': $outdat = ResIns::delData($id, true); break;
							default: die; break;
						}
						//$outdat = ResUsu::delData($id, false);
					}
				break;

				case 'FIL':
					$id = $_GET['ID'] ?? die;
					$outdat = false;

					if ((int) $id > 0 ) {
						settype($id, "int");

						$_GET['MOD'] ?? die;
						switch ($_GET['MOD']) {
							case 'USU': $outdat = ResUsu::delFiles($id, false); break;
							case 'INS': $outdat = ResIns::delFiles($id, true); break;
							default: die; break;
						}
						//$outdat = ResUsu::delFiles($id, false);
					}
				break;

				case 'DET':
					$id = $_GET['ID'] ?? die;
					$s_id = $_GET['IDD'] ?? die;
					$outdat = false;

					if ((int) $id > 0 && (int) $s_id > 0) {
						settype($id, "int"); settype($s_id, "int");
						
						$_GET['MOD'] ?? die;
						switch ($_GET['MOD']) {
							case 'USU': $outdat = ResUsu::delDetData($id, $s_id); break;
							case 'INS': $outdat = ResIns::delDetData($id, $s_id); break;
							default: die; break;
						}
						//$outdat = ResUsu::delDetData($id, $s_id);
					}
				break;

				default: die; break;
			}
		break;
			
		default: die; break;
	}

	echo json_encode($outdat, JSON_UNESCAPED_UNICODE);
 ?>