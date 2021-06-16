<?php 
declare(strict_types=1);
	require_once __DIR__.'/../../config/Class.Config.php';

	abstract class ArMt extends Config {
		
		public function verOfMt(string $prm, bool $mod) : bool
		{	
			$col = ($mod) ? ['tblarea','nombre'] : ['tblmotivo','descripcion'];	
			$qry = "SELECT COUNT(1) FROM $col[0] WHERE $col[1] = '$prm'";

			return empty(Config::getConfigRowCol($qry)) ? false : true;
		}
	}

	$data = ArMt::verOfMt('PERSONAL-NEXUS',true);
	var_export($data);

	$data = ArMt::verOfMt('APROBAR CONTRATO',false);
	var_export($data);
 ?>