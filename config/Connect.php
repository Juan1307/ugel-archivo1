<?php 
declare(strict_types=1);
	
	class DB
	{
		//Db constants
		private $DB_HOST = 'localhost';
		private $DB_NAME = 'bdarchivo';
		private $DB_PORT = 3306;
		private $DB_CHARSET = 'utf8mb4';
		
		//Db Access
		private $DB_USER = 'root';
		private $DB_PASS = '';

		//Db Connect
		private static $connection;
		private static $attributes = ['STR' => PDO::PARAM_STR,'INT' => PDO::PARAM_INT,
						              'BOOL'=> PDO::PARAM_BOOL,'NULL'=> PDO::PARAM_NULL];
		private function __construct()
		{
			try{
				self::$connection = $this->get_Connection();
			}catch(PDOException $e){
				echo $e->getMessage();
				die;
			}
		}

		private function get_Connection()
		{
			#Opciones para PDO
			$OP_PDO = [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];
			
				#Api DBH handle
	        	$dbh = new PDO('mysql:host='.$this->DB_HOST.';dbname='.$this->DB_NAME.';port='.$this->DB_PORT.';charset='.$this->DB_CHARSET,
	        					$this->DB_USER,$this->DB_PASS,$OP_PDO);

				$dbh->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
				$dbh->setAttribute( PDO::ATTR_PERSISTENT, false );

			return $dbh;
		}

		private function get_Instance()
		{
			#Singleton en connection
			if (!self::$connection instanceof self) {
				new DB();
			}
			return self::$connection;
		}

		final protected function getRowColumn(string $query) : string
		{
			$con = self::get_Instance();

				$sql = $con->prepare("$query");
					$sql->execute();

				$out = $sql->fetchColumn();

			return (is_bool($out) || is_null($out)) ? '' : $out;
		}

		final protected function getRows(string $query) : array
		{
			$con = self::get_Instance();

				$sql = $con->prepare("$query");
					$sql->execute();

			return $sql->fetchAll();
		}

		final protected function getRow(string $query) : array
		{
			$con = self::get_Instance();

				$sql = $con->prepare("$query");
					$sql->execute();

			return $sql->fetch();
		}

		final protected function setRow(string $query, array $data) : bool
		{
			$con = self::get_Instance();
				$sql = $con->prepare("$query");
				
				foreach ($data as $key => $val) {
					$sql->bindValue(":$key", $val[0], self::$attributes[$val[1]]);
				}
				
			return $sql->execute();
		}

		final protected function setTransaction(array $qry_0, array $qry_1) : array
		{
			$con = self::get_Instance();

			try {
				$con->beginTransaction();
					//main query
					$sql = $con->prepare($qry_0['qry']);	
						foreach ($qry_0['dat'] as $key => $val) {
							$sql->bindValue(":$key", $val[0], self::$attributes[$val[1]]);
						}
					$sql->execute();
					
					$id_last = $con->lastInsertId();

					//sub query
					$s_sql = $con->prepare($qry_1['qry']);
						foreach ($qry_1['dat'][0] as $val) {
							$s_sql->bindParam(":".$qry_1['dat'][1], $val, self::$attributes['INT']);
							$s_sql->bindParam(":".$qry_1['dat'][2], $id_last, self::$attributes['INT']);//set last_id
							
							$s_sql->execute();
						}
				$con->commit();
				
				return ['id_last' => $id_last];

			}catch (PDOException $e) {
				$con->rollback();

				return ['error' => $e->getMessage()];
			}
		}

		final protected function setTransactionRows(array $qry_dat) : bool
		{
			$con = self::get_Instance();
			
			try {
				$con->beginTransaction();

				$sql = $con->prepare($qry_dat['qry']);
					foreach ($qry_dat['dat'][0] as $val) {
						foreach ($val as $s_key => $prm) {
							$sql->bindParam(":$s_key", $prm[0], self::$attributes[$prm[1]]);
							$sql->bindParam(":".$qry_dat['dat'][1], $qry_dat['dat'][2], self::$attributes['INT']);
						}
						$sql->execute();
					}
				$con->commit();
				
				return true; 

			} catch (PDOException $e) {
				$con->rollback();
				
				return false;
			}
		}
	}
 ?>