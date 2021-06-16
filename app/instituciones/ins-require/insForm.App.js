(function(a) {	
	'use strict';

	a.module('insForm_App', []).constant('insFormPtrn', ['[0-9a-zA-ZáéíóúñÑÁÉÍÓÚ°/# -]{2,70}'])
	.controller('insForm_Ctrl', ['$scope','$rootScope','insFormPtrn', 'insSet.Fac', function(s, rs, ptrn, Iset){
		//console.log('INS FORM');
		s.insFormPtrn = ptrn;
		s.focusInput('institute');
		rs.det_mod = false;

		const sendIns = (nObj) => {
			const flag = nObj[0];
			const data = nObj[1];

			switch (flag) {
				case null: 
					Iset.pstIns(data).then(r => {
						//console.log('pst', r);
						r ? ( s.alertMsj('Institución registrada',' correctamente.'), s.cleanIns(data) ) : 
							  s.sweetMsj('¡Ooops error!','No se pudo registrar la institución, porfavor reportelo.','error');
					},e => {
						console.error(e.status);
					});
				break;

				default: 					
					Iset.putIns(data, flag).then(r => {
						//console.log('put', r);
						if (r) {
							s.alertMsj('Institución actualizada',' correctamente.');
							
							switch (rs.det_mod) {
								case null: rs.allDetRes();  s.focusInput('find_det_ins'); break;
								default: rs.allInsti();  s.focusInput('find_inst'); break;
							}
							s.cleanIns(data, true);
						}else{
							 s.sweetMsj('¡Ooops error!','No se pudo editar la institución, porfavor reportelo.','error');

						}
					},e => {
						console.error(e.status);
					}); 
				break;
			}
		};

		const checkIns = (arr) => {
			Iset.checkIns(arr[1]).then(r => {
				if (r) {
					s.sweetMsj(`¡Ooops, Institución!`,'La institución y el nivel ya existe, porfavor revise.');					
				}else{
					sendIns(arr);
				}
			},e => {
				console.error(e.status);
			}); 
		};

		s.saveIns = (objDat, idIns = null) => {
			s.valFrmIns = true;
			if (objDat.institute === undefined || objDat.institute == '') {
				return s.focusInput('institute');
			}else if (objDat.level === undefined || objDat.level == '') {
				return s.focusInput('level');
			}else{
				checkIns([idIns, objDat]);
			}
		};

		s.cleanIns = (frmIns, fEdit = false) => {
			s.valFrmIns = false;

			if (fEdit) {
				$('#ins_edit_modal').modal('hide');
				rs.load_insti = false;
				s.idEdit.id_ins = null;
			}else{
				s.focusInput('institute');
			}

			frmIns.institute = '';
			frmIns.level = undefined;
		};

	}]).factory('insSet.Fac', ['$http', function(h){
		
		return {
			checkIns: (data) => {
				return h.put('../controller/Ajax.instituciones.php?OP=VER', data).then( res => {
					return JSON.parse(res.data);
				}).catch( err => {
					console.error(err.status);
				});	
			},
			pstIns: (data) => {
				return h.post('../controller/Ajax.instituciones.php', data).then( res => {
					return JSON.parse(res.data);
				}).catch( err => {
					console.error(err.status);
				});
			},
			putIns:	(data, id) => {
				return h.put('../controller/Ajax.instituciones.php?OP=UPD', {data,id}).then( res => {
					return JSON.parse(res.data);
				}).catch( err => {
					console.error(err.status);
				});	
			}
		};
	}]);

})(angular);