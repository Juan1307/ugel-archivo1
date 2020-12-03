(function(a) {	
	'use strict';

	a.module('usuForm_App', []).constant('usuFormPtrn', ['[a-zA-ZáéíóúñÑÁÉÍÓÚ ]{2,60}','[0-9]{8}','[0-9]{2,15}','[0-9]{5,9}'])
	.controller('usuForm_Ctrl', ['$scope','$rootScope','usuFormPtrn', 'usuVal.Ftr', 'usuSet.Ftr', function(s, rs, ptrn, Uval, Uset){

		console.log('en formulario usuarios');
		s.usuFormPtrn = ptrn;
		rs.det_mod = false;

		const sendUser = (nObj) => {
			const frmData = nObj[0];

			const data = nObj[1];
			const flag = nObj[2];

			switch (flag) {
				case null:
					Uset.pstUser(data).then( r => {
						//console.log('send post', r);
						r ? ( s.alertMsj('Usuario registrado',' correctamente.'), s.cleanUser(frmData,data) ) : 
							  s.sweetMsj('¡Ooops error!','No se pudo registrar el usuario, porfavor reportelo.','error');
					},e => {
						console.error(e.status);
					});
				break;
				
				default:
					Uset.putUser(data, flag).then( r => {
						//console.log('send put', r);
						if (r) {
							s.alertMsj('Usuario actualizado',' correctamente.'); 	
							switch (rs.det_mod) {
								case null: rs.allDetRes();  s.focusInput('find_det_usu'); break;
								default: s.allUsers();  s.focusInput('find_user'); break;
							}
							s.cleanUser(frmData,data);
							$('#usu_edit_modal').modal('hide');
						}else{
							 s.sweetMsj('¡Ooops error!','No se pudo editar el usuario, porfavor reportelo.','error');

						} 
					},e => {
						console.error(e.status);
					});
					
				break;
			}
		};

		const checkUser = (nObj) =>{

			const obj = nObj[1];
			const type = nObj[2];
			const nro_val = [obj.nro_dni, obj.nro_carnet, type];

			Uval.valDC(nro_val).then( r => {
				if (r[0]) {
					s.sweetMsj(`¡Ooops, Dni ${nro_val[0]}!`,'El n° Dni ya existe en otro usuario porfavor revise.');
				}else if (r[1]) {
					s.sweetMsj(`¡Ooops, Carnet ${nro_val[1]}!`,'El n° Carnet ya existe en otro usuario porfavor revise.');
				}else{
					sendUser(nObj);
				}
	        }, e => {
		        console.error(e.status);
	    	});
		};

		s.saveUser = (formData, objData, idUser = null) => {
			formData.$submitted = true;

			objData.last_name = objData.last_name === '' ? undefined : objData.last_name;
			objData.first_name = objData.first_name === '' ? undefined : objData.first_name;
			
			for (let prop in objData) {
				if (objData.hasOwnProperty(prop)) {
					if (objData[prop] === undefined) {
					 	return s.focusInput(prop);
					}
				}else{
					return console.error('dont exist key');
				}
			}

			const nObj = [formData,objData,idUser];
			
			objData.nro_dni === '' && objData.nro_carnet === '' && sendUser(nObj);
			(objData.nro_dni !== '' || objData.nro_carnet !== '') && checkUser(nObj);
		};

		s.cleanUser = (formData, objData, mdlUsu = false) => {
			if (mdlUsu) {
				$('#usu_edit_modal').modal('hide');
				if (rs.det_mod == null) {
					s.focusInput('find_det_usu');
				}else{
					s.focusInput('find_user');
				}
				
			}else{
				s.focusInput('last_name');
			}

			formData.$submitted = false;

			for (let prop in objData) {
				if (!objData.hasOwnProperty(prop)) {
					return console.error('dont exist key');
				}
				objData[prop] = '';
			}
		};

	}]).factory('usuVal.Ftr', ['$http', function(h){
		return {
			valDC: (data) => {
				return h.put('../controller/Ajax.Usuarios.php?OP=VER', data).then( res => {
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			}
		};

	}]).factory('usuSet.Ftr', ['$http', function(h){
		return {
			pstUser: (data) => {
				return h.post('../controller/Ajax.Usuarios.php', data).then( res => {
					return JSON.parse(res.data);
				}).catch( err => {
					console.error(err.status);
				});
			},
			putUser: (data, id) => {
				return h.put('../controller/Ajax.Usuarios.php?OP=UPD',{data, id}).then( res => {
					return JSON.parse(res.data);
				}).catch( err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);