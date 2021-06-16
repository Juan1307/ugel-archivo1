<?php 

	$array = false;
	echo json_encode($array, true);
	
	$data = array('name' => 'Carlos' , 'surname' =>'amiksñññóós' ,'age' => 12 ,'gender' => NULL );
	
	$ndata = [];
	foreach ($data as $val) {
		$ndata[] = ($val == '' || $val == null) ? null : mb_strtoupper($val);
	}

	var_export($ndata);

	$timestamp = strtotime('1973-04-18');
	var_export($timestamp);
	
	echo "<hr>";

	$new_date_format = date('Y-m-d', strtotime('12-07-2010'));
	var_export($new_date_format);

	date_default_timezone_set('America/Lima');

	echo date("Y-m-d H:i:s");

	/*if (is_numeric(($pag and $p_pag))) {
		echo "es entero $pag - $p_pag</hr>";
	}

	var_dump( (int) $pag);
	var_dump( (int) $p_pag);
	if (is_numeric()) {
		echo "son numeros";
	}else {
		echo "no son numeros";
	}

	SELECT u.id_usuario, u.nombres, u.apellidos, u.ndni, u.carnet, u.contacto, i.id_institucion, i.nombre, i.nivel, d.id_detresolucion, d.estado, d.f_entrega, r.id_resolucion, r.f_emision, r.nresolucion, r.nproyecto, a.nombre, m.descripcion FROM tbl_detresolucion AS d INNER JOIN tblresolucion AS r ON d.id_resolucion = r.id_resolucion INNER JOIN tblarea AS a ON r.id_area = a.id_area INNER JOIN tblmotivo AS m ON r.id_motivo = m.id_motivo LEFT JOIN tblusuarios AS u ON d.id_usuario = u.id_usuario LEFT JOIN tblinstitucion AS i ON d.id_institucion = i.id_institucion

	*/

 ?>