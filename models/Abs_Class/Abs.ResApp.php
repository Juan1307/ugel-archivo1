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

		protected function saveResFile(array $o_arr, array $arr, bool $mark) : array
		{
			$suf = '_US'; $PATH_FILE = self::$directory['users'];
			if ($mark) {
				$suf = '_IN'; $PATH_FILE = self::$directory['insti'];
			}

			$NAME_0 = $o_arr['nresolucion'][0].'_'.$o_arr['nproyecto'][0].'_'.$o_arr['f_emision'][0];
			$ndata = [];

			foreach ($arr as $key => $val) {
				$temp = $val['tmp_name']; $ext = '.'.pathinfo(basename($val['name']), PATHINFO_EXTENSION); //set extension
				$NAME_FILE = $NAME_0.uniqid($suf);

				move_uploaded_file($temp, $PATH_FILE.$NAME_FILE.$ext);
					
					$ndata[$key]['nombre_ori'] = [$val['name'],'STR'];
					$ndata[$key]['nombre_sys'] = [$NAME_FILE  ,'STR'];
					$ndata[$key]['tipo']       = [$val['type'],'STR'];
					$ndata[$key]['tamano'] 	   = [$val['size'],'INT'];
			}
			return $ndata;
		}

	}
 ?>