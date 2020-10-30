<?php
declare(strict_types=1);

	require_once "Connect.php";
	
	class Config extends DB
	{
		protected function getConfigCol($qry_arr) : array
		{
			if (is_array($qry_arr)) {
			
			$arr = [];
				foreach ($qry_arr as $qry) {
					$res = DB::getRowColumn($qry);
					$arr[] = $res;
				}
			}else{
				$arr[] = DB::getRowColumn($qry_arr);
			}
			return $arr;
		}

		protected function getConfigPag(string $qry, string $s_qry, int $pag, int $p_pag) : array
		{
			$total = DB::getRowColumn($qry);
			$total_pag = ceil($total / $p_pag);

		        if ($pag > $total_pag) {
		            $pag = $total_pag;
		        }

		    $pag = ($pag <= 0) ? 0 : $pag - 1;
		    $d_h = $pag * $p_pag;

		    $array_pag = [];

		        for ($i=0; $i < $total_pag ; $i++) { 
		          array_push($array_pag, $i+1);
		        }

		    $s_qry .=" LIMIT $d_h, $p_pag";
	        $data = DB::getRows($s_qry);

	        return ['total'   => $total,     'data'    => $data, 'pag_act' => ($pag + 1),
	                'total_p' => $total_pag, 'array_p' => $array_pag ];
		}

		protected function getConfigNext(string $qry, string $s_qry, int $pag, int $p_pag) : array
		{
			$total = DB::getRowColumn($qry);
			$total_pag = ceil($total / $p_pag);

			if ($pag > $total_pag) {
		        $pag = $total_pag;
		    }
		    
		    $pag = ($pag <= 0) ? 0 : $pag - 1;
		    $d_h = $pag * $p_pag;

		    $pag_s = ($pag >= $total_pag - 1) ? 1 : $pag + 2;
          	$pag_a = ($pag < 1) ? 1 : $pag;

		    $s_qry .=" LIMIT $d_h, $p_pag";
	        $data = DB::getRows($s_qry);

	        return ['total'   => $total,     'data'  => $data,  'pag_act' => ($pag + 1),
	                'total_p' => $total_pag, 'pag_s' => $pag_s, 'pag_a'   => $pag_a];
		}

		protected function getConfigRows(string $qry) : array
		{
			return DB::getRows($qry);
		}

		protected function getConfigRow(string $qry) : array
		{
			return DB::getRow($qry);
		}

		protected function setConfigRow(string $qry, array $arr) : bool
		{
			return DB::setRow($qry, $arr);
		}

		protected function setConfigTran(array $qry_0, array $qry_1) : array
		{
			return DB::setTransaction($qry_0,$qry_1);
		}

		protected function setConfigTranRows(array $query_dat) : bool
		{
			return DB::setTransactionRows($query_dat);
		}
	}
 ?>	
