<?php 
	
	switch ($SERVER_['REQUEST_METHOD']) {
		case 'GET':
			
			switch ($option) {
				case 'LIS':
					# code...
				break;

				case 'PRM':
					# code...
				break;

				case 'IDX':
					# code...
				break;
				
				default: die; break;
			}

		break;

		case 'POST':
			# code...
		break;

		case 'PUT':
			# code...
		break;

		case 'DELETE':
			
			switch (variable) {
				case 'RES':
					# code...
					break;
				
				default:
					# code...
					break;
			}

		break;

		default: die; break;
	}

 ?>