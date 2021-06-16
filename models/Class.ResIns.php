<?php 
declare(strict_types=1);
	require_once __DIR__.'/Abs_Class/Abs.ResApp.php';

	class ResIns extends Res
	{
		public function getData(int $pag, int $p_pag) : array
		{
 			$qry = "SELECT COUNT(1) FROM tblresolucion WHERE est_tbl = 1";
 			$s_qry = "SELECT r.id_resolucion, r.nresolucion, r.nproyecto, r.f_emision, m.descripcion, a.nombre, r.estado
 											FROM tblresolucion as r INNER JOIN tblmotivo AS m ON r.id_motivo = m.id_motivo 
 											INNER JOIN tblarea AS a ON r.id_area = a.id_area WHERE r.est_tbl = 1 ORDER BY r.id_resolucion DESC";
 			
 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataFind(int $pag, int $p_pag, array $arr) : array
		{
			$sql_w = Res::qryFindData($arr[0], $arr[1]);

			$qry = "SELECT COUNT(1) FROM tblresolucion WHERE est_tbl = 1 AND $sql_w";
 			$s_qry = "SELECT r.id_resolucion, r.nresolucion, r.nproyecto, r.f_emision, m.descripcion, a.nombre, r.estado
 											FROM tblresolucion as r INNER JOIN tblmotivo AS m ON r.id_motivo = m.id_motivo 
 											INNER JOIN tblarea AS a ON r.id_area = a.id_area WHERE r.est_tbl = 1 AND $sql_w ORDER BY r.id_resolucion DESC";

 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataId(int $id) : array
		{
			$qry = "SELECT id_resolucion, nresolucion, nproyecto, f_emision, id_area, id_motivo, estado FROM tblresolucion WHERE id_resolucion = $id AND est_tbl = 1";
			$s_qry = "SELECT  CONCAT('res_insti/',nombre_sys,tipo) AS archivo, nombre_ori, nombre_sys, tamano, f_creacion FROM tblarchivos WHERE id_resolucion = $id";
			
 			$data = Config::getConfigRow($qry); $files = Config::getConfigRows($s_qry);

 			return ['data' => $data, 'files' => $files];
		}

		public function postData(array $arr, array $det, $files) : bool
		{
			$dat_0 = Res::fullResArr($arr);
			$dat_1 = [$det,'id_institucion','id_resolucion'];
			
			$qry_0 = "INSERT INTO tblresolucion VALUES (NULL, :id_motivo, :id_area, :nresolucion, :nproyecto, :f_emision, 1, 1)";
			$qry_1 = "INSERT INTO tbl_detresolucion VALUES (NULL, :id_resolucion, NULL, :id_institucion, NULL, 0)";
			
			$data = Config::setConfigTran( ['qry' => $qry_0, 'dat' => $dat_0], 
										   ['qry' => $qry_1, 'dat' => $dat_1] );
			if (isset($data['error'])) {
				return false; //error en tran det _ 0
			}

			if (is_array($files)) {
				$id_l = $data['id_last']; settype($id_l, "int");
				$f_data = Res::saveResFile($id_l, $files, true);
				$qry_2 = "INSERT INTO tblarchivos VALUES (NULL, :id_resolucion, :nombre_ori, :nombre_sys, :tipo, :tamano, NULL, CURRENT_TIMESTAMP)";
				
				$s_data = Config::setConfigTranRows(['qry' => $qry_2, 'dat' => [$f_data, 'id_resolucion', $id_l ]]); //set id_last
				return $s_data; //error en file det _ 1
			}
			return true;
		}

		public function putData(array $arr, int $id, $files) : bool
		{
			$dat = Res::fullResArr($arr);
			$qry = "UPDATE tblresolucion SET id_motivo=:id_motivo, id_area=:id_area, nresolucion=:nresolucion, nproyecto=:nproyecto, 
											 f_emision=:f_emision WHERE id_resolucion = $id AND est_tbl = 1";
			$data = Config::setConfigRow($qry, $dat);
			
			if (is_array($files)) {
				$s_qry = "SELECT CONCAT(nombre_sys,tipo) FROM tblarchivos WHERE id_resolucion = $id";
				$s_data = Config::getConfigRowsCol($s_qry); $flag = null;

				if (count($s_data) > 0) {
					$d_data = Res::delResFile($s_data, true);
					$d_qry = Config::execConfigRow("DELETE FROM tblarchivos WHERE id_resolucion = $id");

					$flag = (!$d_data || !$d_qry) ? false : true ;
				}

				if ($flag === false) {
					return false; //error delete files or dekete from db
				}else{
					$f_data = Res::saveResFile($id, $files, true);	
					$qry_1 = "INSERT INTO tblarchivos VALUES (NULL, :id_resolucion, :nombre_ori, :nombre_sys, :tipo, :tamano, NULL, CURRENT_TIMESTAMP)";
					
					return Config::setConfigTranRows(['qry' => $qry_1, 'dat' => [$f_data, 'id_resolucion', $id ]]); //set id_last			
				}
			}
			return $data;
		}
	}

	require_once __DIR__.'/Abs_Class/Abs.ResDet.php';
	
	class ResDetIns extends Det
	{
		public function getData(int $pag, int $p_pag, int $id) : array
		{
			$qry = "SELECT COUNT(1) FROM tbl_detresolucion AS d INNER JOIN tblresolucion AS r ON d.id_resolucion = r.id_resolucion
									WHERE d.id_resolucion = $id";
 			$s_qry = "SELECT u.id_usuario, u.nombres, u.apellidos, u.ndni, u.carnet, i.id_institucion, i.nombre, i.nivel, d.id_detresolucion, d.f_entrega, d.estado FROM tbl_detresolucion AS d INNER JOIN tblinstitucion AS i ON d.id_institucion = i.id_institucion 
 									LEFT JOIN tblusuarios AS u ON d.id_usuario = u.id_usuario WHERE d.id_resolucion = $id ORDER BY d.id_detresolucion DESC";	
 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		
		public function getDataFind(int $pag, int $p_pag, int $id, string $val) : array
		{
			$sql_w = 'i.nombre LIKE '."'$val%'".' OR '.' i.nivel LIKE '."'$val%'";

			$qry = "SELECT COUNT(1) FROM tbl_detresolucion AS d INNER JOIN tblinstitucion AS i ON d.id_institucion = i.id_institucion
									WHERE d.id_resolucion = $id AND ($sql_w)";

 			$s_qry = "SELECT u.id_usuario, u.nombres, u.apellidos, u.ndni, u.carnet, i.id_institucion, i.nombre, i.nivel, 
 								d.id_detresolucion, d.f_entrega, d.estado FROM tbl_detresolucion AS d INNER JOIN tblinstitucion AS i ON d.id_institucion = i.id_institucion LEFT JOIN tblusuarios AS u ON d.id_usuario = u.id_usuario WHERE d.id_resolucion = $id AND ($sql_w) ORDER BY d.id_detresolucion DESC";
 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataId(int $id) : array 
		{
			$qry = "SELECT r.id_resolucion, r.nresolucion, r.nproyecto, r.f_emision, m.descripcion, a.nombre, r.estado FROM tblresolucion as r  						INNER JOIN tblmotivo AS m ON r.id_motivo = m.id_motivo 
 									INNER JOIN tblarea AS a ON r.id_area = a.id_area WHERE r.est_tbl = 1 AND r.id_resolucion = $id";
 			$s_qry = "SELECT  CONCAT('res_insti/',nombre_sys,tipo) AS archivo, nombre_sys, tamano, f_creacion FROM tblarchivos WHERE id_resolucion = $id";
 			$data = Config::getConfigRow($qry); $files = Config::getConfigRows($s_qry);

 			return ['data' => $data, 'files' => $files];
		}

		public function postDetDataId(int $id, int $s_id) : int
		{
			$v_qry = "SELECT COUNT(1) FROM tbl_detresolucion WHERE id_resolucion = $s_id AND id_institucion = $id";			
			$v_data = Config::getConfigRowCol($v_qry);

			if (!empty($v_data)) {
				return 2;
			}

			$dat = ['id_resolucion' => [$s_id, 'INT'], 'id_institucion' => [$id, 'INT']];
			$qry = "INSERT INTO tbl_detresolucion VALUES (NULL, :id_resolucion, NULL, :id_institucion, NULL, 0)";
			
			return (Config::setConfigRow($qry, $dat)) ? 1 : 0;
		}

		//RECEPTOR USER
		public function postUsuDetId(int $id_u, int $id, int $s_id) : bool
		{
			$qry = "UPDATE tbl_detresolucion SET id_usuario = $id_u WHERE id_detresolucion = $s_id AND id_resolucion = $id";
			return Config::execConfigRow($qry);
		}

		public function delUsuDetId(int $id, int $s_id) : bool
		{
			$qry = "UPDATE tbl_detresolucion SET id_usuario = NULL, f_entrega = NULL, estado = 0 WHERE id_detresolucion = $s_id AND id_resolucion = $id";
			return Config::execConfigRow($qry);
		}
		//RECEPTOR USER
	}
?>
