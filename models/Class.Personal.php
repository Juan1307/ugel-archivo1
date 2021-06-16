<?php 
declare(strict_types=1);
	require_once __DIR__.'/../config/Class.Config.php';

	class Personal extends Config
	{
		public function verPersona(array $prm) : bool
		{	
			$qry = "SELECT COUNT(1) FROM tblpersonal WHERE nombres = '$prm[0]' AND apellidos = '$prm[1]'";

			return empty(Config::getConfigRowCol($qry)) ? false : true;
		}

		public function getData(int $pag, int $p_pag) : array
		{		    
		    $qry = "SELECT COUNT(1) FROM tblpersonal";
			$s_qry = "SELECT * FROM tblpersonal ORDER BY id_personal DESC";

 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataFind(int $pag, int $p_pag, string $val) : array
		{
			$sql_w = 'nombres LIKE '."'%$val%'".' OR apellidos LIKE '."'%$val%'";

		    $qry = "SELECT COUNT(1) FROM tblpersonal WHERE $sql_w";
			$s_qry = "SELECT * FROM tblpersonal WHERE $sql_w ORDER BY id_personal DESC";

 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataId(int $id) : array
		{
			$qry = "SELECT * FROM tblpersonal WHERE id_personal = $id";

 			return Config::getConfigRow($qry);
		}

		public function postData(array $arr) : bool
		{
			$arr = ['nombres'  => [$arr[0], 'STR'],'apellidos'=> [$arr[1], 'STR']];

			$qry = "INSERT INTO tblpersonal VALUES (NULL, :nombres, :apellidos)";
 			
 			return Config::setConfigRow($qry, $arr);
		}

		public function putData(array $arr, int $id) : bool
		{
			$arr = ['nombres'    => [$arr[0], 'STR'],
					'apellidos'  => [$arr[1], 'STR'],
					'id_personal'=> [$id, 'INT'],
				   ];
				   
			$qry = "UPDATE tblpersonal SET nombres=:nombres, apellidos=:apellidos WHERE id_personal=:id_personal";

 			return Config::setConfigRow($qry, $arr);
		}
	}
 ?>