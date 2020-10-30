<?php 
declare(strict_types=1);
	require_once __DIR__.'/Abs_Class/Abs.Usuario.php';

	class UserPro extends User
	{
		public function getStatus() : array
		{
			$qry_arr[0] = "SELECT COUNT(1) FROM tblusuarios";
			$qry_arr[1] = "SELECT COUNT(1) FROM tblusuarios WHERE ndni IS NULL AND carnet IS NULL";

			return Config::getConfigCol($qry_arr);
		}

		public function getData(int $pag, int $p_pag) : array
		{		    
		    $qry = "SELECT COUNT(1) FROM tblusuarios";
			$s_qry = "SELECT * FROM tblusuarios";

 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataFind(int $pag, int $p_pag, array $arr) : array
		{
			switch ($arr[0]) {
				case 0:  $prm_arr['cols'] = ['ndni','carnet']; break;
				case 1:  $prm_arr['cols'] = ['apellidos','nombres']; break;
				default: $prm_arr['cols'] = 'contacto'; break;
			}
			$val = $arr[1];

			$sql_w = (is_string($prm_arr['cols']) )  ?  $prm_arr['cols'] .' LIKE '."'%$val%'":
		                                                #aplica para dos campos 
		                                                $prm_arr['cols'][0] .' LIKE '."'%$val%'".' OR '.
		    											$prm_arr['cols'][1] .' LIKE '."'%$val%'";

		    $qry = "SELECT COUNT(1) FROM tblusuarios WHERE $sql_w";
			$s_qry = "SELECT * FROM tblusuarios WHERE $sql_w";

 			return Config::getConfigPag($qry, $s_qry, $pag, $p_pag);
		}

		public function getDataId(int $id) : array
		{
			$qry = "SELECT * FROM tblusuarios WHERE id_usuario = $id";

 			return Config::getConfigRow($qry);
		}

		public function getDataEst(int $id) : array
		{
			$qry = "SELECT d.id_institucion, i.nombre AS institucion, i.nivel, r.nresolucion, r.nproyecto, r.f_emision, d.f_entrega, a.nombre, m.descripcion, d.estado FROM tbl_detresolucion AS d LEFT JOIN 
										tblinstitucion AS i ON d.id_institucion = i.id_institucion INNER JOIN 
										tblresolucion AS r ON r.id_resolucion = d.id_resolucion INNER JOIN 
										tblarea AS a ON a.id_area = r.id_area INNER JOIN 
										tblmotivo AS m ON m.id_motivo = r.id_motivo WHERE d.id_usuario = $id";
 			
 			$data = Config::getConfigRows($qry);
 			
 			if (count($data) > 0) {
 				$ndata = [];

 				foreach ($data as $idx) {
					$sub_arr = [];

					$sub_arr['id_institucion'] = $idx['id_institucion'];
					$sub_arr['institucion']    = $idx['institucion'];
					$sub_arr['nivel']          = $idx['nivel'];
					$sub_arr['nresolucion']    = $idx['nresolucion'];
					$sub_arr['nproyecto']      = $idx['nproyecto'];
					$sub_arr['f_emision']      = $idx['f_emision'] === null ? 'Por entregar' : date('d-m-Y', strtotime($idx['f_emision']));
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

		public function postData(array $arr) : bool
		{
			$arr = ['nombres'  =>[$arr[1], 'STR'],
					'apellidos'=>[$arr[0], 'STR'],
					'ndni'     =>[$arr[2], $arr[2] == null ? 'NULL' :'INT'],
					'carnet'   =>[$arr[3], $arr[3] == null ? 'NULL' :'INT'],
					'contacto' =>[$arr[4], $arr[4] == null ? 'NULL' :'INT'],
				   ];

			$qry = "INSERT INTO tblusuarios VALUES (NULL, :nombres, :apellidos, :ndni, :carnet, :contacto)";
 			
 			return Config::setConfigRow($qry, $arr);
		}

		public function putData(array $arr, int $id) : bool
		{
			$arr = ['nombres'   =>[$arr[1], 'STR'],
					'apellidos' =>[$arr[0], 'STR'],
					'ndni'      =>[$arr[2], $arr[2] == null ? 'NULL' :'INT'],
					'carnet'    =>[$arr[3], $arr[3] == null ? 'NULL' :'INT'],
					'contacto'  =>[$arr[4], $arr[4] == null ? 'NULL' :'INT'], 
					'id_usuario'=>[$id, 'INT'],
				   ];
				   
			$qry = "UPDATE tblusuarios SET nombres=:nombres, apellidos=:apellidos, ndni=:ndni, carnet=:carnet, contacto=:contacto
									   WHERE id_usuario=:id_usuario";

 			return Config::setConfigRow($qry, $arr);
		}
	}

	/*
		let arrMer = [];
		let p0,p1;

		let pagTable = (arr, pag = 1, tot) => {

			let arr_n = [...arr];
			if (arr.length > 10) {
				let arr_v = [];

				//en relacion a pag
				if (pag === 5 || pag === 1) {
					p0 = true;
					p1 = false;
					console.log('en relacion a 5', p0, p1);
				}
				
				//en ralacion a tot
				if (pag + 4 === tot) {
					p0 = false;
					p1 = true;
					console.log('en relacion a 18', p0, p1);
				}
				console.log('p0', p0);
				console.log('p1', p1);

				if (arrMer.length <= 10 && arrMer.length !== 0 && pag !== 1) {
					console.log('arrMer es menor a 10');
					s.arrPag = arrMer;
				}else if ((pag - 1) % 4 === 0 && p0 && pag < (tot - 4)) {
					arr_v = arr.slice(pag - 1);

					if (arr_v.length > 10) {
						let a, b;

						a = arr_n.splice(pag - 1, 5);
						b = arr_n.splice(arr_n.length - 5, 5);
						
						arrMer = [...a, false, ...b];
						console.log('cortamos arr_n');
						s.arrPag = arrMer;
					}else{
						arrMer = arr_v;
						s.arrPag = arrMer;
						console.log('arrMer es igual a arr_v');
					}

				}else if ((tot - pag) % 4 === 0 && p1){

					arr_v = arr.slice(0, pag);
					console.log('cortamos pag ',pag,' arr',arr_v);

					if (arr_v.length > 10) {
						let c, d;

						console.log('cortamos',arr_n);
						d = arr_n.splice(pag - 5, 5);
						console.log('cortamos d',d);
						c = arr_n.splice(0, 5);

						arrMer = [...c, false, ...d];
						s.arrPag = arrMer;
						console.log('cortamos arr_n en p1',arrMer);
					} else {
						arrMer = arr_v;
						s.arrPag = arrMer;
						console.log('arrMer es igual a arr_v');
					}
				}else{
					s.arrPag = arrMer;
					console.log('arrMer es igual a partido');
				}

			}else{
				s.arrPag = arr_n;
				console.log('es menor o igual a 10');
			}
		};*/
 ?>