<?php 
declare(strict_types = 1);
	require_once __DIR__.'/../config/Class.Config.php';

	class AreMot extends Config
	{
		public function verOfMt(bool $mod, string $prm) : bool
		{	
			$col = ($mod) ? ['tblarea','nombre'] : ['tblmotivo','descripcion'];	
			$qry = "SELECT COUNT(1) FROM $col[0] WHERE $col[1] = '$prm'";

			return empty(Config::getConfigRowCol($qry)) ? false : true;
		}

		public function getData(bool $mod) : array
		{
			$mrk = ($mod) ?  'area' : 'motivo';
			$tbl = "tbl$mrk"; $idx = "id_$mrk";

			$s_qry = "SELECT * FROM $tbl ORDER BY $idx DESC";			
			return Config::getConfigRows($s_qry);
		}
		
		public function getDataId(bool $mod, int $id) : array
		{
			$mrk = ($mod) ?  'area' : 'motivo';
			$tbl = "tbl$mrk"; $idx = "id_$mrk";

			$qry = "SELECT * FROM $tbl WHERE $idx = $id";
			
			return Config::getConfigRow($qry);
		}

		public function postData(bool $mod, string $str) : bool
		{
			$mrk = ($mod) ? 'nombre' :'descripcion';
			$tbl = ($mod) ? 'tblarea' :'tblmotivo';

			$arr = [ $mrk => [$str, 'STR']];
			$qry = "INSERT INTO $tbl VALUES (NULL, :$mrk)";

 			return Config::setConfigRow($qry, $arr);
		}

		public function putData(bool $mod, string $str, int $id) : bool
		{
			$mrk = ($mod) ? ['id_area','nombre'] : ['id_motivo','descripcion'];
			$tbl = ($mod) ?  'tblarea' : 'tblmotivo';

			$arr = [ $mrk[1] => [$str, 'STR'],
					 $mrk[0] => [$id, 'INT']];
			$qry = "UPDATE $tbl SET $mrk[1]=:$mrk[1] WHERE $mrk[0]=:$mrk[0]";

 			return Config::setConfigRow($qry, $arr);
		}
	}
?>