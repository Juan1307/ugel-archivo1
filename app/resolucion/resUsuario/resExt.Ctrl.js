(function(a) {	
	'use strict';

	a.module('resUsersDet_App', []).constant('usuResDetPtrn', ['[0-9]{0,15}','[a-zA-ZáéíóúñÑÁÉÍÓÚ ]{0,60}','[0-9]{0,9}'])
	.controller('resUsersDet_Ctrl', ['$scope','$rootScope','usuResDetPtrn','resDetUsuGet.Srv','resDetUsuSet.Fac','resDetUsu.Fac',
		function(s, rs, ptrn, RDini, RDset, RDusu) {
		s.usuDetPtrn = ptrn;

		s.backPoint = () => {
			rs.id_rd_ex = null;
			rs.resusu_load = true; s.prmResDet = null; rs.allRes();
			s.focusInput('find_res');
		};

		const getDet = (id, flag, prm, num, p = 1, fpag) => {
			s.load_data = true;
			RDini.getAll(id, flag, prm, num, p).then(r => {
				s.detData = r.data;
				//pagination
				s.pagAct = r.pag_act;
				s.totPag = r.total_p;
					s.pagTable(r.array_p, r.pag_act, r.total_p, fpag);

				s.load_data = false;
			},e => {
				console.error(e.status);
			});
		};

		s.$watch('prmResDet', (vn, vo)  => {
    		if (vn !== undefined && vn !== '' && vn !== null) {
    			getDet(s.id_rd, true, s.prmResDet, s.number);
    		}else if (vn === '') {
    			getDet(s.id_rd, false);
    		}
  		});

  		s.selectPrm = (n = 0) =>{
  			s.number = n;
  			s.textPrmDet = (n === 1) ? 'Apellidos ó Nombres': (n === 0) ? 'N° Dni ó N° Carnet' : 'Contacto';
  			s.prmResDet = ''; s.focusInput('find_det_usu');
  		};

  		rs.allDetRes = () => {
  			if (s.prmResDet !== undefined && s.prmResDet !== '' && s.prmResDet !== null) {
    			getDet(s.id_rd, true, s.prmResDet, s.number, s.pagAct);
    		}else{
    			getDet(s.id_rd, false, null, null, s.pagAct, false);
    		}
			s.focusInput('find_det_usu');
  		};

  		s.getDateRes = (id, fec) => {
			if (fec !== null) {
				let d = moment(fec).format("MM[/]DD[/]YYYY");
				s.frmDate.dat = new Date(d);
			}else{
				s.frmDate.dat = null;
			}
			s.frmDate.idx = id;

			$('#usu_det_edit_modal').modal('show');
			rs.valResDate = false;
  		};

  		rs.chgDateRes = (id, fec) => {
  			if (typeof parseInt(id) !== "number") {
				return console.error('number , date error');
			}

			if (fec == null) {
				rs.valResDate = true; s.focusInput('res_date'); return;
			}else{
				RDset.putResDate({id,fec}).then(r => {
					r ? ( s.alertMsj('Entrega actualizada','correctamente'), rs.clnDateRes(), s.allDetRes()) :
						s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
				},e => {
					console.error(e.status);
				});
			}
  		};
  		rs.clnDateRes = () => {
  			s.frmDate.dat = null;
			s.frmDate.idx = 0;

			$('#usu_det_edit_modal').modal('hide');
			s.focusInput('find_det_usu');
  		};
  		s.chgDetRes = (id, est) => {
  			if (typeof parseInt(id, est) !== "number") {
				return console.error('number error');
			}

			swal({
				title: "¿Desea realizar cambios en la entrega?",
			  	text: "Según el estado se realizará o cancelará la entrega.",
			  	icon: "warning", buttons: ["Cancelar","Aceptar"], dangerMode: false,
			}).then( (mark) => {
			  	if (mark) {
					RDset.chgDetRes({id,est}).then(r => {
						if (!r) {
							s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
						}
						s.allDetRes();
					},e => {
						console.error(e.status);
					});
			  	}
			});
  		};

  		s.editDetUser = (id) => {
			rs.load_usu0 = false; rs.load_usu1 = true;

			if (typeof parseInt(id) !== 'number' ) {
				return console.error('number error');
			}			
			RDusu.getUsuId(id).then(r => {
				s.idEdit.idUser = r.id_usuario; 
				s.frmData.last_name = r.apellidos;
				s.frmData.first_name = r.nombres;
				s.frmData.nro_dni = r.ndni;
				s.frmData.nro_carnet = r.carnet;
				s.frmData.nro_contact = r.contacto;
				
				rs.det_mod = null; 
				$('#usu_edit_modal').modal('show');
				s.focusInput('last_name');
			},e => {
				console.error(e.status);
			});
		};

		s.delDetUser = (id) => {
			const s_id = s.id_rd;

			if (typeof parseInt(id, s_id) !== "number") {
				return console.error('number error');
			}

			swal({
				title: "¿Desea eliminar este usuario de la resolución?",
			  	text: "",
			  	icon: "warning", buttons: ["Cancelar","Aceptar"], dangerMode: true,
			}).then( (mark) => {
			  	if (mark) {
					RDset.delResDet(id, s_id).then(r => {
						if (r) {
							s.sweetMsj('Usuario eliminado correctamente.','','success');
							s.allDetRes();
						}else{
							s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');							
						}
					},e => {
						console.error(e.status);
					});
			  	}
			});
		};

		rs.addUsuDet = (id) => {
			const id_r = s.id_rd;

			if (typeof parseInt(id, id_r) !== "number") {
				return console.error('number error');
			}
			RDusu.pstDetUsu({id, id_r}).then(r => {
				switch (r) {
					case 1: s.alertMsj('Usuario asignado','correctamente'); rs.outResDet(); break;
					case 2: s.sweetMsj('¡No se puede agregar!','El usuario ya existe en esta resolución.','info'); break;
					default: s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error'); break;
				}
			},e => {
				console.error(e.status);
			});
		};

  		s.addResDet = () => {
  			rs.resadd_load = true; 
			$('#usu_det_add_modal').modal('show');
			s.focusInput('find_user');
  		};
  		rs.outResDet = () => {
  			rs.resadd_load = false; rs.allDetRes();
			$('#usu_det_add_modal').modal('hide');
			s.focusInput('find_det_usu');
  		};

		rs.nexPoint = (id) => {
			if (typeof parseInt(id) !== "number") {
				return console.error('number error')
			}
			
			s.id_rd = id; rs.id_rd_ex = id;
			
			RDini.getIdx(id).then(r => {
				s.objRes = r.data; s.arrFil = r.files;
				rs.resusu_load = false;
			},e => {
				console.error(e.status);
			});

			s.selectPrm(1);
			s.focusInput('find_det_usu');
		};

		s.goToPag = (pag = 1) => {
			if (s.prmResDet !== undefined && s.prmResDet !== '' && s.prmResDet !== null) {
				getDet(s.id_rd, true, s.prmResDet, s.number, pag, false);
			}else{
				getDet(s.id_rd, false, null, null, pag, false);
			}
		};

	}]).factory('resDetUsuGet.Srv', ['$http', function(h){
		const getAll = (id, flag = false, prm = null, num = null, p, pp = 10) => {
			let url;
			url = `OP=LIS&PAG=${p}&PPAG=${pp}`;
			
			if (flag) {
				url = `OP=PRM&PAG=${p}&PPAG=${pp}&PAR=${num}&STR=${prm}`;
			}
			return h.get(`../controller/AjaxResCtrl/Ajax.ResDet.php?${url}&ID=${id}&MOD=USU`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};

		const getIdx = (id) => {
			return h.get(`../controller/AjaxResCtrl/Ajax.ResDet.php?OP=IDX&ID=${id}&MOD=USU`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};

		return {getAll : getAll, getIdx : getIdx};

	}]).factory('resDetUsuSet.Fac', ['$http', function(h){

		return {
			chgDetRes: (data) => {
				return h.put(`../controller/AjaxResCtrl/Ajax.ResDet.php?OP=EST`, data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			putResDate: (data) => {
				return h.put(`../controller/AjaxResCtrl/Ajax.ResDet.php?OP=DAT`, data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});	
			},
			delResDet: (id, s_id) => {
				return h.delete(`../controller/AjaxResCtrl/Ajax.ResDet.php?ID=${id}&IDS=${s_id}`).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});	
			}
		};
	}]).factory('resDetUsu.Fac', ['$http', function(h){

		return {
			pstDetUsu: (data) => {
				return h.post(`../controller/AjaxResCtrl/Ajax.ResDet.php?MOD=USU`,data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			getUsuId: (id) => {
				return h.get(`../controller/Ajax.Usuarios.php?OP=IDX&ID=${id}`).then(res => {
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);