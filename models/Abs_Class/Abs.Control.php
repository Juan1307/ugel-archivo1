<?php 
declare(strict_types=1);
	require_once __DIR__.'/../../config/Class.Config.php';

	abstract class Control extends Config
	{
		public function getAreaPers() : array
		{
			$qry['area'] = "SELECT * FROM tblarea";
			$qry['pers'] = "SELECT id_personal, CONCAT(apellidos,', ', nombres) AS persona FROM tblpersonal";

			$arr = [];
			foreach ($qry as $key => $q) {
				$arr[$key] = Config::getRows($q);
			}
			return $arr;
		}

		public function getDataRes(int $pag, int $p_pag) : array
		{
			$qry = "SELECT COUNT(1) FROM tblresolucion";
 			$s_qry = "SELECT r.id_resolucion, r.nresolucion, r.nproyecto, r.f_emision, m.descripcion, a.nombre, r.estado, r.est_tbl
 											FROM tblresolucion as r INNER JOIN tblmotivo AS m ON r.id_motivo = m.id_motivo 
 											INNER JOIN tblarea AS a ON r.id_area = a.id_area ORDER BY r.id_resolucion DESC";
 			
 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}
		
		public function getDataResFind(int $pag, int $p_pag, string $val) : array
		{
			$sql_w = 'r.nresolucion LIKE '."'$val%'".' OR r.nproyecto LIKE '."'$val%'";

			$qry = "SELECT COUNT(1) FROM tblresolucion AS r WHERE $sql_w";
 			$s_qry = "SELECT r.id_resolucion, r.nresolucion, r.nproyecto, r.f_emision, m.descripcion, a.nombre, r.estado
 											FROM tblresolucion as r INNER JOIN tblmotivo AS m ON r.id_motivo = m.id_motivo 
 											INNER JOIN tblarea AS a ON r.id_area = a.id_area WHERE $sql_w";

 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		protected function fullConArr(array $arr) : array
		{
			date_default_timezone_set('America/Lima');
			
			return ['id_personal' => [ $arr['employe'], 'INT'],
					'id_area' 	  => [ $arr['area'], 'INT'],
					'nfolios' 	  => [ $arr['folios'],'INT'],
					'f_entrega'   => [ $arr['f_entrega'] == NULL ? date('Y-m-d') : 
									   date('Y-m-d',strtotime($arr['f_entrega']))
									   , 'STR'] ];
		}

		public function postDataDetId(int $id, string $date) : bool
		{			
			$dat = ['f_recepcion' => [$date,'STR']];
			$qry = "UPDATE tbl_detcontrol SET f_recepcion=:f_recepcion, estado = 1 WHERE id_detcontrol = $id";
			
			return Config::setConfigRow($qry, $dat);
		}
		
		public function chaDetId(int $id, int $est) : bool
		{
			$qry = ($est === 0) ?  "UPDATE tbl_detcontrol SET f_recepcion = NOW(), estado = 1 WHERE id_detcontrol = $id" :
								   "UPDATE tbl_detcontrol SET f_recepcion = NULL, estado = 0 WHERE id_detcontrol = $id";
			return Config::execConfigRow($qry);
		}

		public function delDetData(int $s_id, int $id) : bool
		{
			$qry = "DELETE FROM tbl_detcontrol WHERE id_control = $s_id AND id_detcontrol = $id";
			return Config::execConfigRow($qry);
		}
	}
 ?>
