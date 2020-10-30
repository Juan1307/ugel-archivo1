<?php 
	declare(strict_types=1);

	class Ajax
	{
		private $cons = null;

		public static function valJsonIn( $json ) : array
		{
			$parse = json_decode($json, true);
			return (json_last_error() !== JSON_ERROR_NONE) ? ['error'=>'Ooops json error'] : $parse;
		}

		public static function valParArr(array $data) : array
		{
			$ndata = [];

			foreach ($data as $val) {
				$ndata[] = ($val == '' || $val == null) ? null : mb_strtoupper($val);
			}
			return $ndata;
		}

		public static function valFilesIn(array $files) : array
		{
			$narr = [];

			foreach ($files as $fil) {
				if ($fil['error'] == UPLOAD_ERR_OK && $fil['type'] == 'application/pdf') {
					$narr[] = $fil;
				}else{
					$narr = ['error'=>'Ooops file error'];
					break; 
				}
			}
			return $narr;
		}
	}
 ?>