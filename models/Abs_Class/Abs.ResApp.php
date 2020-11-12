<?php 
declare(strict_types=1);
	require_once __DIR__.'/../../config/Class.Config.php';

	abstract class Res extends Config {

		private static $directory = ['users' => __DIR__.'/../../files/res_users/',
								     'insti' => __DIR__.'/../../files/res_insti/'];


		public function getAreaMoti() : array
		{
			$qry['area'] = "SELECT * FROM tblarea";
			$qry['moti'] = "SELECT * FROM tblmotivo";

			$arr = [];
			foreach ($qry as $key => $q) {
				$arr[$key] = Config::getRows($q);
			}
			return $arr;
		}

		public function delResAll(int $id) : bool
		{
			$qry = "DELETE FROM tblresolucion WHERE id_resolucion = $id";
		}

		public function chaResAll(int $id, bool $est) : bool
		{
			$qry = "UPDATE tblresolucion SET estado=:estado WHERE id_resolucion = $id";
		}

		protected function fullResArr(array $arr, bool $mark) : array
		{
			$arr = ['id_motivo'  =>[$arr['res_moti'], 'INT'],
					'id_area'    =>[$arr['res_area'], 'INT'],
					'nresolucion'=>[$arr['nro_res'], 'INT'],
					'nproyecto'  =>[$arr['nro_pro'], 'INT'],
					'f_emision'	 =>[date('Y-m-d',strtotime($arr['res_fec'])), 'STR']
				   ];

			return ($mark) ? $arr : array_merge($arr,['est_tbl' => [1,'BOOL']]);
		}

		protected function saveResFile(int $l_id, array $arr, bool $mark) : array
		{
			$suf = '_US'; $PATH_FILE = self::$directory['users'];
			if ($mark) {
				$suf = '_IN'; $PATH_FILE = self::$directory['insti'];
			}

			$ndata = [];
			foreach ($arr as $key => $val) {
				$temp = $val['tmp_name']; $ext = '.'.pathinfo(basename($val['name']), PATHINFO_EXTENSION); //set extension
				$NAME_FILE = 'UQ_'.$l_id.uniqid($suf);

				move_uploaded_file($temp, $PATH_FILE.$NAME_FILE.$ext);
					
					$ndata[$key]['nombre_ori'] = [$val['name'],'STR'];
					$ndata[$key]['nombre_sys'] = [$NAME_FILE  ,'STR'];
					$ndata[$key]['tipo']       = [$ext        ,'STR'];
					$ndata[$key]['tamano'] 	   = [$val['size'],'INT'];
			}
			return $ndata;
		}

		protected function delResFile(array $arr, bool $mark) : bool
		{ 
			$PATH_FILE = ($mark) ? self::$directory['insti'] : self::$directory['users'];
			
			$flag = true;
			foreach ($arr as $val) {
				if (file_exists($PATH_FILE.$val) && is_file($PATH_FILE.$val)) {	
					unlink($PATH_FILE.$val);
				} else { 
					$flag = false; break; 
				}
			}
			return $flag;
		}

		protected function qryFindData(array $arr) : string
		{
			if ($arr[0] == 1) {
				$prm_arr['cols'] = 'f_emision'; $val = date('Y-m-d',strtotime($arr[1])); 
			}else{
				$prm_arr['cols'] = ['nresolucion','nproyecto']; $val = $arr[1];
			}

			return (is_string($prm_arr['cols']))  ? $prm_arr['cols'] .' LIKE '."'$val'":
		                                            #aplica para dos campos 
		                                            $prm_arr['cols'][0] .' LIKE '."'$val%'".' OR '.
		    										$prm_arr['cols'][1] .' LIKE '."'$val%'";
		}

	}
 ?>