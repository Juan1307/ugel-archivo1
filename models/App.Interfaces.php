<?php 
	interface getInter{
		public function getData();	
	}

	interface getExtInter{
		public function getFind(); 
	}

	interface getFullInter extends getInter, getExtInter{

	}
 ?>