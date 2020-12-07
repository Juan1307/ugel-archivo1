(function(a) {	
	'use strict';

	a.module('resInstiDet_App', []).constant('insResDetPtrn', ['[0-9a-zA-ZáéíóúñÑÁÉÍÓÚ°/# ]{2,70}'])
	.controller('resInstiDet_Ctrl', ['$scope','$rootScope','insResDetPtrn','resDetInsGet.Srv','resDetInsSet.Fac','resDetIns.Fac','resRecIns.Fac',
		function(s, rs, ptrn, RDini, RDset, RDins, RIins) {

		s.insDetPtrn = ptrn;

		s.backPoint = () => {
			rs.id_rd_ex = null;
			rs.resins_load = true; s.prmResDet = null; rs.allRes();
			s.focusInput('find_res');
		};

		const getDet = (id, flag, prm, p = 1, fpag) => {
			s.load_data = true;
			RDini.getAll(id, flag, prm, p).then(r => {
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
    			getDet(s.id_rd, true, s.prmResDet);
    		}else if (vn === '') {
    			getDet(s.id_rd, false);
    		}
  		});

  		rs.allDetRes = () => {
  			if (s.prmResDet !== undefined && s.prmResDet !== '' && s.prmResDet !== null) {
    			getDet(s.id_rd, true, s.prmResDet, s.pagAct);
    		}else{
    			getDet(s.id_rd, false, null, s.pagAct, false);
    		}
			s.focusInput('find_det_ins');
  		};

  		s.getDateRes = (id, fec, id_u) => {
  			if (id_u == null) { return s.sweetMsj('¡Ooops info!','Asigne un usuario porfavor.','info'); }

			if (fec !== null) {
				let d = moment(fec).format("MM[/]DD[/]YYYY");
				s.frmDate.dat = new Date(d);
			}else{
				s.frmDate.dat = null;
			}
			s.frmDate.idx = id;
			
			$('#ins_det_edit_modal').modal('show');
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

			$('#ins_det_edit_modal').modal('hide');
			s.focusInput('find_det_ins');
  		};

  		s.chgDetRes = (id, est, id_u) => {
  			if (id_u == null) { return s.sweetMsj('¡Ooops info!','Asigne un usuario porfavor.','info'); }

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

		s.delDetIns = (id) => {
			const s_id = s.id_rd;
			if (typeof parseInt(id, s_id) !== "number") {
				return console.error('number error');
			}

			swal({
				title: "¿Desea eliminar esta institución de la resolución?",
			  	text: "",
			  	icon: "warning", buttons: ["Cancelar","Aceptar"], dangerMode: true,
			}).then( (mark) => {
			  	if (mark) {
					RDset.delResDet(id, s_id).then(r => {
						if (r) {
							s.sweetMsj('Institución eliminada correctamente.','','success');
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

		//EDIT INST
  		s.editDetIns = (id) => {

			if (typeof parseInt(id) !== 'number' ) {
				return console.error('number error');
			}			
			RDins.getInsId(id).then(r => {
				s.idEdit.id_ins = r.id_institucion; 
				s.frmIns.institute = r.nombre;
				s.frmIns.level = r.nivel;

				rs.load_insti = true;
				rs.det_mod = null; 
				$('#ins_edit_modal').modal('show');
				s.focusInput('institute');
			},e => {
				console.error(e.status);
			});
		};
		//EDIT INST

		//ADD INS RES
		rs.addInsDet = (id) => {
			const id_r = s.id_rd;

			if (typeof parseInt(id, id_r) !== "number") {
				return console.error('number error');
			}
			RDins.pstDetIns({id, id_r}).then(r => {
				switch (r) {
					case 1: s.alertMsj('Institución asignada','correctamente'); rs.outResDet(); break;
					case 2: s.sweetMsj('¡No se puede agregar!','La institución ya existe en esta resolución.','info'); break;
					default: s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error'); break;
				}
			},e => {
				console.error(e.status);
			});
		};
  		s.addResDet = () => {
  			rs.resadd_load = true; 
			$('#ins_det_add_modal').modal('show');
			s.focusInput('find_inst');
  		};
  		rs.outResDet = () => {
  			rs.resadd_load = false; rs.allDetRes();
			$('#ins_det_add_modal').modal('hide');
			s.focusInput('find_det_ins');
  		};
		//ADD INS RES

		//ADD REC INS RES
		rs.addRecDet = (id_u) => {
			const id = s.id_rd;
			const s_id = s.id_rd_det;


			if (typeof parseInt(id_u, id, s_id) !== "number") {
				return console.error('number error');
			}

			RIins.putRecIns({id_u, id, s_id}).then(r => {
				r ? ( s.alertMsj('Usuario asignado','correctamente'), rs.outUsuRec()) :
						s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
			},e => {
				console.error(e.status);
			});
		};
		
		s.delRecDet = (s_id) => {
			const id = s.id_rd;

			if (typeof parseInt(id, s_id) !== "number") {
				return console.error('number error');
			}
			
			swal({
				title: "¿Desea quitar el usuario de la entrega?",
			  	text: "",
			  	icon: "warning", buttons: ["Cancelar","Aceptar"], dangerMode: true,
			}).then( (mark) => {
			  	if (mark) {
					RIins.delRecIns({id, s_id}).then(r => {
						if (r) {
							s.sweetMsj('Usuario removido correctamente.','','success');
							rs.allDetRes();
						}else{
							s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');							
						}
					},e => {
						console.error(e.status);
					});
			  	}
			});

		};

  		s.addUsuRec = (id_d) => {
  			s.id_rd_det = id_d;
  			rs.resaddrec_load = true; 
			$('#usu_rec_add_modal').modal('show');
			s.focusInput('find_user');
  		};

  		rs.outUsuRec = () => {
  			rs.resaddrec_load = false; rs.allDetRes();
			$('#usu_rec_add_modal').modal('hide');
			s.focusInput('find_det_ins');
  		};
		//ADD REC INS RES

		rs.nexPoint = (id) => {
			if (typeof parseInt(id) !== "number") {
				return console.error('number error')
			}
			
			s.id_rd = id; rs.id_rd_ex = id;
			
			RDini.getIdx(id).then(r => {
				s.objRes = r.data; s.arrFil = r.files;
				rs.resins_load = false;
			},e => {
				console.error(e.status);
			});

			s.prmResDet = '';
			s.focusInput('find_det_ins');
		};

		s.goToPag = (pag = 1) => {
			if (s.prmResDet !== undefined && s.prmResDet !== '' && s.prmResDet !== null) {
				getDet(s.id_rd, true, s.prmResDet, pag, false);
			}else{
				getDet(s.id_rd, false, null, pag, false);
			}
		};

	}]).factory('resDetInsGet.Srv', ['$http', function(h){
		const getAll = (id, flag = false, prm = null, p, pp = 10) => {
			let url;
			url = `OP=LIS&PAG=${p}&PPAG=${pp}`;
			
			if (flag) {
				url = `OP=PRM&PAG=${p}&PPAG=${pp}&STR=${prm}`;
			}
			return h.get(`../controller/AjaxResCtrl/Ajax.ResDet.php?${url}&ID=${id}&MOD=INS`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};

		const getIdx = (id) => {
			return h.get(`../controller/AjaxResCtrl/Ajax.ResDet.php?OP=IDX&ID=${id}&MOD=INS`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};

		return {getAll : getAll, getIdx : getIdx};

	}]).factory('resDetInsSet.Fac', ['$http', function(h){

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
	}]).factory('resDetIns.Fac', ['$http', function(h){

		return {
			pstDetIns: (data) => {
				return h.post(`../controller/AjaxResCtrl/Ajax.ResDet.php?MOD=INS`,data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			getInsId: (id) => {
				return h.get(`../controller/Ajax.Instituciones.php?OP=IDX&ID=${id}`).then(res => {
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]).factory('resRecIns.Fac', ['$http', function(h){
		return {
			putRecIns: (data) => {
				return h.put(`../controller/AjaxResCtrl/Ajax.ResDet.php?OP=IU&SMOD=ADD`,data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			delRecIns: (data) => {
				return h.put(`../controller/AjaxResCtrl/Ajax.ResDet.php?OP=IU&SMOD=REM`,data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);