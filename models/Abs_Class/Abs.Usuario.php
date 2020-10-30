<?php 
declare(strict_types=1);
	require_once __DIR__.'/../../config/Class.Config.php';

	abstract class User extends Config {

		public function filterDni(int $val, $tp) : bool
		{
			$qry = "SELECT ndni FROM tblusuarios WHERE ndni = $val";
			$data = Config::getConfigCol($qry);

			if($tp !== false){
				$s_qry = "SELECT ndni FROM tblusuarios WHERE id_usuario = $tp";
				$s_data = Config::getConfigCol($s_qry);

				$resp = ($s_data[0] == $val) ? false : ($data[0] == $val) ? true : false;
			}else{
				$resp = ($data[0] == $val) ? true : false;				
			}

			return $resp;
		}

		public function filterCrn(int $val, $tp) : bool
		{
			$qry = "SELECT carnet FROM tblusuarios WHERE carnet = $val";
			$data = Config::getConfigCol($qry);

			if($tp !== false){
				$s_qry = "SELECT carnet FROM tblusuarios WHERE id_usuario = $tp";
				$s_data = Config::getConfigCol($s_qry);

				$resp = ($s_data[0] == $val) ? false : ($data[0] == $val) ? true : false;
			}else{
				$resp = ($data[0] == $val) ? true : false;				
			}

			return $resp;
		}
	}

 ?>