<?php 
declare(strict_types=1);
	require_once __DIR__.'/Abs_Class/Abs.Control.php';

	class ConPro extends Control
	{
		public function getData(int $pag, int $p_pag) : array
		{		    
		    $qry = "SELECT COUNT(1) FROM tblcontrol";
			$s_qry = "SELECT c.id_control, CONCAT(p.apellidos,', ', p.nombres) AS persona, a.nombre, c.nfolios, c.f_entrega, c.estado  FROM tblcontrol AS c 
									INNER JOIN tblpersonal AS p ON c.id_personal = p.id_personal 
									INNER JOIN tblarea AS a ON c.id_area = a.id_area ORDER BY c.id_control DESC";
 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataFind(int $pag, int $p_pag, array $arr) : array
		{
			$prm_arr['cols'] = ($arr[0] == 0) ? 'a.nombre' : ['p.nombres','p.apellidos'];

			$val = $arr[1];
			$sql_w = (is_string($prm_arr['cols']) )  ?  $prm_arr['cols'] .' LIKE '."'$val%'":
		                                                #aplica para dos campos 
		                                                $prm_arr['cols'][0] .' LIKE '."'$val%'".' OR '.
		    											$prm_arr['cols'][1] .' LIKE '."'$val%'";

		    $qry = "SELECT COUNT(1) FROM tblcontrol AS c INNER JOIN tblpersonal AS p ON c.id_personal = p.id_personal 
									INNER JOIN tblarea AS a ON c.id_area = a.id_area WHERE $sql_w";

			$s_qry = "SELECT c.id_control, CONCAT(p.apellidos,', ', p.nombres) AS persona, a.nombre, c.nfolios, c.f_entrega, c.estado 
									FROM tblcontrol AS c 
									INNER JOIN tblpersonal AS p ON c.id_personal = p.id_personal 
									INNER JOIN tblarea AS a ON c.id_area = a.id_area WHERE $sql_w ORDER BY c.id_control DESC";

 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataId(int $id) : array
		{
			$qry = "SELECT * FROM tblcontrol AS c INNER JOIN tblpersonal AS p ON c.id_personal = p.id_personal 
									INNER JOIN tblarea AS a ON c.id_area = a.id_area WHERE id_control = $id";
 			return Config::getConfigRow($qry);
		}

		public function getDataIdDet(int $id) : array
		{
			$qry = "SELECT d.id_detcontrol, r.nresolucion, r.nproyecto, a.nombre, m.descripcion,
						   d.f_recepcion, d.estado FROM tbl_detcontrol AS d INNER JOIN tblresolucion AS r ON d.id_resolucion = r.id_resolucion 
									INNER JOIN tblmotivo AS m ON r.id_motivo = m.id_motivo 
									INNER JOIN tblarea AS a ON r.id_area = a.id_area
									INNER JOIN tblcontrol AS c ON d.id_control = c.id_control 
									WHERE c.id_control = $id ORDER BY d.id_detcontrol DESC";

 			return Config::getConfigRows($qry);
		}

		public function postData(array $arr, array $det) : bool
		{
			$dat_0 = Control::fullConArr($arr);			
			$dat_1 = [$det,'id_resolucion','id_control'];

			$qry_0 = "INSERT INTO tblcontrol VALUES(NULL, :id_personal, :id_area, :nfolios, :f_entrega, 1)";
			$qry_1 = "INSERT INTO tbl_detcontrol VALUES (NULL, :id_control, :id_resolucion, NULL, 0)";
			
			$data = Config::setConfigTran( ['qry' => $qry_0, 'dat' => $dat_0], 
										   ['qry' => $qry_1, 'dat' => $dat_1] );
			return isset($data['id_last']) ? true : false;
		}

		public function putData(array $arr, int $id) : bool
		{
			$dat = Control::fullConArr($arr);			
			$qry = "UPDATE tblcontrol SET id_personal=:id_personal, id_area=:id_area, nfolios=:nfolios, f_entrega=:f_entrega 
									  WHERE id_control = $id";
 			return Config::setConfigRow($qry, $dat);
		}

		public function delData(int $id) : bool
		{
			$qry = "DELETE FROM tblcontrol WHERE id_control= $id";
			return Config::execConfigRow($qry);
		}

		public function chaEst(int $id, int $est) : bool
		{
			$qry = "UPDATE tblcontrol SET estado=:estado WHERE id_control = $id";
			$arr = ['estado' => [$est === 1 ? 0 : 1, 'INT']];

 			return Config::setConfigRow($qry, $arr);
		}
	}
 ?>