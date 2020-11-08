<?php 
declare(strict_types=1);
	require_once __DIR__.'/Abs_Class/Abs.ResApp.php';

	class ResUsu extends Res
	{
		public function getUsu(int $pag, int $p_pag) : array
		{		    
		    $qry = "SELECT COUNT(1) FROM tblusuarios";
			$s_qry = "SELECT * FROM tblusuarios";

 			return Config::getConfigNext($qry, $s_qry, $pag, $p_pag);
		}

		public function getData(int $pag, int $p_pag) : array
		{
 			$qry = "SELECT COUNT(1) FROM tblresolucion WHERE est_tbl = 0";
 			$s_qry = "SELECT r.id_resolucion, r.nresolucion, r.nproyecto, r.f_emision, m.descripcion, a.nombre, r.estado
 											FROM tblresolucion as r INNER JOIN tblmotivo AS m ON r.id_motivo = m.id_motivo 
 											INNER JOIN tblarea AS a ON r.id_area = a.id_area WHERE r.est_tbl = 0";
 			
 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataFind(int $pag, int $p_pag, array $arr) : array
		{
			$sql_w = Res::qryFindData($arr);

			$qry = "SELECT COUNT(1) FROM tblresolucion WHERE est_tbl = 0 AND $sql_w";
 			$s_qry = "SELECT r.id_resolucion, r.nresolucion, r.nproyecto, r.f_emision, m.descripcion, a.nombre, r.estado
 											FROM tblresolucion as r INNER JOIN tblmotivo AS m ON r.id_motivo = m.id_motivo 
 											INNER JOIN tblarea AS a ON r.id_area = a.id_area WHERE r.est_tbl = 0 AND $sql_w";

 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataId(int $id) : array
		{
			$qry = "SELECT id_resolucion, nresolucion, nproyecto, f_emision, id_area, id_motivo 
										   	FROM tblresolucion WHERE id_resolucion = $id AND est_tbl = 0";
			$s_qry = "SELECT * FROM tblarchivos WHERE id_resolucion = $id";
			
 			return Config::getConfigRow($qry);
		}

		public function pstData(array $arr, array $det, $files) : bool
		{
			$dat_0 = Res::fullResArr($arr, true);
			$dat_1 = [$det,'id_usuario','id_resolucion'];
			
			$qry_0 = "INSERT INTO tblresolucion VALUES (NULL, :id_motivo, :id_area, :nresolucion, :nproyecto, :f_emision, 1, 0)";
			$qry_1 = "INSERT INTO tbl_detresolucion VALUES (NULL, :id_resolucion, :id_usuario, NULL, NULL, 0)";
			
			$data = Config::setConfigTran( ['qry' => $qry_0, 'dat' => $dat_0], 
										   ['qry' => $qry_1, 'dat' => $dat_1] );
			if (isset($data['error'])) {
				return false; //error en tran det _ 0
			}

			if (is_array($files)) {
				$f_data = Res::saveResFile($dat_0, $files, false);
				$qry_2 = "INSERT INTO tblarchivos VALUES (NULL, :id_resolucion, :nombre_ori, :nombre_sys, :tipo, :tamano, NULL, CURRENT_TIMESTAMP)";
				
				$s_data = Config::setConfigTranRows(['qry' => $qry_2, 'dat' => [$f_data, 'id_resolucion', $data['id_last'] ]]); //set id_last
				return $s_data; //error en file det _ 1
			}
			return true;
		}

	}
?>