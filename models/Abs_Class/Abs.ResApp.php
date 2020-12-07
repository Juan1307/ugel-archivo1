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

		public function chaResAll(int $id, int $est) : bool
		{
			$qry = "UPDATE tblresolucion SET estado=:estado WHERE id_resolucion = $id";
			$arr = ['estado' => [$est === 1 ? 0 : 1, 'INT']];

			return Config::setConfigRow($qry, $arr);
		}

		public function delData(int $id, bool $mark) : int
		{
			$s_mark = ($mark) ? true : false;
			$s_estt = ($mark) ? 1 : 0;

			$v_qry = "SELECT COUNT(1) FROM tbl_detcontrol WHERE id_resolucion = $id";
			$v_data = Config::getConfigRowCol($v_qry);

			if (!empty($v_data)) {
				return 3;
			}else{
				$qry = "SELECT CONCAT(nombre_sys,tipo) FROM tblarchivos WHERE id_resolucion = $id";
				$data = Config::getConfigRowsCol($qry); $flag = null;

				if (count($data) > 0) {
					$d_data = Res::delResFile($data, $s_mark); $flag = $d_data;
				}

				if ($flag === null || $flag === true) {
					$s_qry = "DELETE FROM tblresolucion WHERE id_resolucion = $id AND est_tbl = $s_estt";
					return (Config::execConfigRow($s_qry)) ? 1 : 0;
				}else{
					return 2;//error FILES
				}
			}
		}

		public function delFiles(int $id, bool $mark) : int
		{
			$qry = "SELECT CONCAT(nombre_sys,tipo) FROM tblarchivos WHERE id_resolucion = $id";
			$data = Config::getConfigRowsCol($qry);

			if (count($data) > 0) {
				$d_data = Res::delResFile($data, $mark);
				if ($d_data) {
					$s_qry = "DELETE FROM tblarchivos WHERE id_resolucion = $id";
					
					return (Config::execConfigRow($s_qry)) ? 1 : 0;
				} else {
					return 2;
				}
			}else{
				return 3;
			}
		}

		public function valMonthYear(array $arr) : array
		{
			$ml = $arr[1][0];
			switch ($arr[0]) {
				case 1:
					$rp = is_null($ml['rp']) ? '' : $ml['rp']; $m = $ml['fec']['month']; $y = $ml['fec']['year'];

					if( ((int) $m > 0 && (int) $m <= 12) && 
						((int) $y >= 2015 && (int) $y <= 2025)) {
						settype($m, "int"); settype($y, "int");
						
						$narr = ['rp'=> $rp,'m'=> $m,'y'=> $y];
					}
				break;
				
				default: 
					if ((int) $ml >= 0) {
						$narr['rp'] = $ml;
					}
				break;
			}
			return (!isset($narr['rp'])) ? ['error'=> 'error val date'] : $narr;
		}

		protected function fullResArr(array $arr) : array
		{
			$arr = ['id_motivo'  =>[$arr['res_moti'], 'INT'],
					'id_area'    =>[$arr['res_area'], 'INT'],
					'nresolucion'=>[$arr['nro_res'], 'STR'],
					'nproyecto'  =>[$arr['nro_pro'], 'STR'],
					'f_emision'	 =>[date('Y-m-d',strtotime($arr['res_fec'])), 'STR']
				   ];
				   
			return $arr;
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

		protected function qryFindData(int $prm, array $arr) : string
		{
			//R M A SELECT r.id_resolucion, r.nresolucion, r.nproyecto, r.f_emision, m.descripcion, a.nombre, r.estado FROM tblresolucion as r INNER JOIN tblmotivo AS m ON r.id_motivo = m.id_motivo INNER JOIN tblarea AS a ON r.id_area = a.id_area WHERE r.est_tbl = 0 AND (nresolucion LIKE '0%' OR nproyecto LIKE '0%') AND f_emision LIKE '2019-07%'

			define('COLS', ['nresolucion','nproyecto']);			
			$rp = $arr['rp'];

			if ($prm === 1) {
				$year = $arr['y']; $month = $arr['m'];					
				$f_like = '('.COLS[0].' LIKE '."'$rp%'".' OR '.COLS[1].' LIKE '."'$rp%'".') 
						   AND YEAR(f_emision) = '.$year.' AND MONTH(f_emision) ='.$month;
			}else{
				$f_like = '('.COLS[0].' LIKE '."'$rp%'".' OR '.COLS[1].' LIKE '."'$rp%'".')';
			}
			return $f_like;
		}
	}
 ?>