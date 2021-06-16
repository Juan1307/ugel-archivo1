<?php 
declare(strict_types=1);

	require_once __DIR__.'/../config/Class.Config.php';

	class InstiPro extends Config
	{
		public function getData(int $pag, int $p_pag) : array
		{		    
		    $qry = "SELECT COUNT(1) FROM tblinstitucion";
			$s_qry = "SELECT * FROM tblinstitucion ORDER BY id_institucion DESC";

 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataFind(int $pag, int $p_pag, string $val) : array
		{
			$sql_w = 'nombre LIKE '."'$val%'".' OR '.' nivel LIKE '."'$val%'";

		    $qry = "SELECT COUNT(1) FROM tblinstitucion WHERE $sql_w";
			$s_qry = "SELECT * FROM tblinstitucion WHERE $sql_w ORDER BY id_institucion DESC";

 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataId(int $id) : array
		{
			$qry = "SELECT * FROM tblinstitucion WHERE id_institucion = $id";
			$data = Config::getConfigRow($qry);

			switch ($data['nivel']) {
				case 'INICIAL': $n_lvl = '0'; break;
				case 'PRIMARIA':$n_lvl = '1';break;
				default: $n_lvl = '2'; break;
			}
			unset($data['nivel']);

 			return array_merge($data,['nivel' => $n_lvl]);
		}

		public function getDataEst(int $id) : array
		{
			$qry = "SELECT d.id_usuario, u.nombres , u.apellidos, u.ndni, u.carnet, r.nresolucion, r.nproyecto, r.f_emision, d.f_entrega, a.nombre, m.descripcion, d.estado FROM tbl_detresolucion AS d LEFT JOIN tblusuarios AS u ON d.id_usuario = u.id_usuario 
													INNER JOIN tblresolucion AS r ON r.id_resolucion = d.id_resolucion 
													INNER JOIN tblarea AS a ON a.id_area = r.id_area 
													INNER JOIN tblmotivo AS m ON m.id_motivo = r.id_motivo WHERE d.id_institucion = $id";
			$data = Config::getConfigRows($qry);
 			
 			if (count($data) > 0) {
 				$ndata = [];

 				foreach ($data as $idx) {
					$sub_arr = [];

					$sub_arr['id_usuario']     = $idx['id_usuario'];
					$sub_arr['nombres']    	   = $idx['nombres'];
					$sub_arr['apellidos']      = $idx['apellidos'];
					$sub_arr['ndni']    	   = $idx['ndni'] === null ? 'S/N DNI' : $idx['ndni'];
					$sub_arr['carnet']    	   = $idx['carnet'] === null ? 'S/N CARNET' : $idx['carnet'];
					$sub_arr['nresolucion']    = $idx['nresolucion'];
					$sub_arr['nproyecto']      = $idx['nproyecto'];
					$sub_arr['f_emision']      = date('d-m-Y', strtotime($idx['f_emision']));
					$sub_arr['f_entrega']      = $idx['f_entrega'] === null ? 'Por entregar' : date('d-m-Y', strtotime($idx['f_entrega']));
					$sub_arr['nombre']         = $idx['nombre'];
					$sub_arr['descripcion']    = $idx['descripcion'];
					$sub_arr['estado']         = $idx['estado'];

					$ndata[] = $sub_arr;
				}
				return $ndata;

 			} else {
				return $data;
 			}
		}

		public function verInsti(string $ins, string $lvl) : bool
		{	
			$qry = "SELECT COUNT(1) FROM tblinstitucion WHERE nombre = '$ins' AND nivel = '$lvl'";

			return empty(Config::getConfigRowCol($qry)) ? false : true;
		}

		public function levelAdd(int $lvl) : string
		{
			switch ($lvl) {
				case 0: $nlvl = 'INICIAL'; break;
				case 1: $nlvl = 'PRIMARIA'; break;
				default:$nlvl = 'SECUNDARIA'; break;
			}
			return $nlvl;
		}

		public function postData(array $arr) : bool
		{
			$arr = ['nombre'  =>[$arr[0], 'STR'],
					'nivel'   =>[$arr[1], 'STR']];
			$qry = "INSERT INTO tblinstitucion VALUES (NULL, :nombre, :nivel)";
 			
 			return Config::setConfigRow($qry, $arr);
		}

		public function putData(array $arr, int $id) : bool
		{
			$arr = ['nombre'  =>[$arr[0], 'STR'],
					'nivel'   =>[$arr[1], 'STR'],
					'id_institucion' =>[$id, 'INT']];
				   
			$qry = "UPDATE tblinstitucion SET nombre=:nombre, nivel=:nivel WHERE id_institucion=:id_institucion";

 			return Config::setConfigRow($qry, $arr);
		}
	}
 ?>