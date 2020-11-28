<?php 
declare(strict_types=1);
	require_once __DIR__.'/../../config/Class.Config.php';

	abstract class ResDet extends Config
	{
		public function pstDataDetId(int $id, string $date) : bool
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
