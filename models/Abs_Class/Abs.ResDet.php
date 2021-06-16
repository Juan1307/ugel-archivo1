<?php 
declare(strict_types=1);
	require_once __DIR__.'/../../config/Class.Config.php';

	abstract class Det extends Config
	{
		public function getDataResAll(int $pag, int $p_pag, string $val) : array
		{
			$sql_w = 'u.apellidos LIKE '."'%$val%'".' OR u.nombres LIKE '."'%$val%'";

			$qry = "SELECT COUNT(1) FROM tbl_detresolucion AS d INNER JOIN tblresolucion AS r ON d.id_resolucion = r.id_resolucion 
									INNER JOIN tblarea AS a ON r.id_area = a.id_area INNER JOIN tblmotivo AS m ON r.id_motivo = m.id_motivo 
									LEFT JOIN tblusuarios AS u ON d.id_usuario = u.id_usuario WHERE r.est_tbl = 0 AND ($sql_w)";

			$s_qry = "SELECT u.id_usuario, u.nombres, u.apellidos, u.ndni, u.carnet, u.contacto, 
						     d.id_detresolucion, d.estado, d.f_entrega, 
						     r.id_resolucion, r.f_emision, r.nresolucion, r.nproyecto, a.nombre, m.descripcion 
						     FROM tbl_detresolucion AS d INNER JOIN tblresolucion AS r ON d.id_resolucion = r.id_resolucion INNER JOIN tblarea AS a ON r.id_area = a.id_area INNER JOIN tblmotivo AS m ON r.id_motivo = m.id_motivo INNER JOIN tblusuarios AS u ON d.id_usuario = u.id_usuario WHERE r.est_tbl = 0 AND ($sql_w) ORDER BY d.id_detresolucion DESC";

			return Config::getConfigNext($qry, $s_qry, $pag, $p_pag);
		}

		public function getUsu(int $pag, int $p_pag) : array
		{		    
		    $qry = "SELECT COUNT(1) FROM tblusuarios";
			$s_qry = "SELECT * FROM tblusuarios";

 			return Config::getConfigNext($qry, $s_qry, $pag, $p_pag);
		}

		public function postDataDetId(int $id, string $date) : bool
		{			
			$dat = ['f_entrega' => [$date,'STR']];
			$qry = "UPDATE tbl_detresolucion SET f_entrega=:f_entrega, estado = 1 WHERE id_detresolucion = $id";
			
			return Config::setConfigRow($qry, $dat);
		}

		public function chaDetRes(int $id, int $est) : bool
		{
			$qry = ($est === 0) ?  "UPDATE tbl_detresolucion SET f_entrega = NOW(), estado = 1 WHERE id_detresolucion = $id" :
								   "UPDATE tbl_detresolucion SET f_entrega = NULL, estado = 0 WHERE id_detresolucion = $id";
			return Config::execConfigRow($qry);
		}

		public function delDetDataId(int $id, int $s_id) : bool
		{
			$qry = "DELETE FROM tbl_detresolucion WHERE id_detresolucion = $id AND id_resolucion = $s_id";
			return Config::execConfigRow($qry);
		}	
	}
 ?>
