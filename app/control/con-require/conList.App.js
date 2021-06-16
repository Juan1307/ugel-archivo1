(function(a) {	
	'use strict';

	a.module('conList_App', []).controller('conList_Ctrl', ['$scope','$rootScope','conIni.Srv','conPro.Fac','conDet.Fac', 
		function(s, rs, Cini, Cpro, Cdet){
		
		//console.log('CONTROL LISTAR');
		s.con_load_det = true;
		const getCon = (flag, prm, num, p = 1, fpag) => {
			s.load_data = true;
			Cini.getAll(flag, prm, num, p).then( r => {
				s.conData = r.data; 
				//pagination
				s.pagAct = r.pag_act;
				s.totPag = r.total_p;
					s.pagTable(r.array_p, r.pag_act, r.total_p, fpag);

				s.load_data = false;
			},e => {
				console.error(e.status);
			});
		};

		rs.allCon = () => {
			if (s.paramCon !== undefined && s.paramCon !== '') {
    			getCon(true, s.paramCon, s.number, s.pagAct);
    		}else{
    			getCon(false, null, null, s.pagAct, false);
    		}
			s.focusInput('find_con');
		};

		s.$watch('paramCon', (vn, vo)  => {
    		if (vn !== undefined && vn !== '') {
    			getCon(true, s.paramCon, s.number);
    		}else if (vn === ''){
    			getCon(false);
    		}
  		});

		s.selectPrm = (n) => {
			s.number = n;
			s.paramCon = '';
			s.textPrmCon = (n === 0) ? 'Oficina' : 'Encargado';
			s.focusInput('find_con');
		};
		s.selectPrm(0);
		
		s.editCon = (id) => {
			if (typeof parseInt(id) !== "number") {
				return console.error('number error');
			}

			Cpro.getCon(id).then(r => {
				s.idEdit.idCon = r.id_control;
				rs.select_p(r.id_personal);
				s.frmCon.area = r.id_area;
				s.frmCon.folios = r.nfolios;
				let d = moment(r.f_entrega).format("MM[/]DD[/]YYYY");
				s.frmCon.f_entrega = new Date(d);
								
				$('#con_edit_modal').modal('show');
				s.focusInput('employe');
			},e => {
				console.error(e.status);
			});
		};

		s.stateCon = (id, est) => {
			if (typeof parseInt(id, est) !== "number") {
				return console.error('number error');
			}

			swal({
				title: "¿Desea cambiar el estado de esta entrega?",
			  	text: "Maneja el control de la entrega.",
			  	icon: "warning",
			  	buttons: ["Cancelar","Aceptar"],
			  	dangerMode: false,
			}).then( (mark) => {
			  	if (mark) {
					Cpro.chgCon({id,est}).then(r => {
						if (!r) {
							s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
						}
						rs.allCon();
					},e => {
						console.error(e.status);
					});
			  	}
			});	
		};

		s.delCon = (id) => {
			if (typeof parseInt(id) !== "number") {
				return console.error('number error');
			}

			swal({
				title: "¿Desea eliminar esta entrega?",
			  	text: "Se eliminarán todos los datos de esta entrega.",
			  	icon: "warning",
			  	buttons: ["Cancelar","Aceptar"],
			  	dangerMode: true,
			}).then( (mark) => {
			  	if (mark) {
					Cpro.delCon(id).then(r => {
						if (r) {
							s.sweetMsj('Entrega eliminada correctamente.','','success'); rs.allCon();
						}else{
							s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
						}
					},e => {
						console.error(e.status);
					});
			  	}
			});	
		};

		s.outDetCon = () => {
			s.con_load_det = true;
			s.findResCon = '';
			s.focusInput('find_con');
		};

		s.viewCon = (con, id) => {
			if (typeof parseInt(id) !== "number") {
				return console.error('number error');
			}
			s.id_con = id;

			Cpro.estCon(id).then(r => {
				s.detConData = r;
				s.detInfData = con;
				s.con_load_det = false;
				s.focusInput('find_rescon');
			},e => {
				console.error(e.status);
			});
		};
		s.allDetCon = () => {
			Cpro.estCon(s.id_con).then(r => {
				s.detConData = r;
				s.focusInput('find_rescon');
			},e => {
				console.error(e.status);
			});
		};









		s.steDetCon = (id, est) => {
			if (typeof parseInt(id, est) !== "number") {
				return console.error('number error');
			}

			swal({
				title: "¿Desea cambiar estado de recepción?",
			  	text: "Según el estado se asignará o cancelará la recepción.",
			  	icon: "warning", buttons: ["Cancelar","Aceptar"], dangerMode: false,
			}).then( (mark) => {
			  	if (mark) {
					Cdet.chgDet({id,est}).then(r => {
						if (!r) {
							s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
						}
						s.allDetCon();
					},e => {
						console.error(e.status);
					});
			  	}
			});
		};

		s.delDetCon = (id) => {
			let s_id = s.id_con;
			if (typeof parseInt(id,s_id) !== "number") {
				return console.error('number error');
			}
			swal({
				title: "¿Desea eliminar esta resolución?",
			  	text: "Se eliminará la resolución de esta entrega .",
			  	icon: "warning", buttons: ["Cancelar","Aceptar"], dangerMode: true,
			}).then( (mark) => {
			  	if (mark) {
					Cdet.delDet(id,s_id).then(r => {
						if (r) {
							s.sweetMsj('Resolución eliminada correctamente.','','success');
							s.allDetCon();
						}else{
							s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
						}
					},e => {
						console.error(e.status);
					});
			  	}
			});
		};
		
		s.conGetDate = (id, fec) => {
			if (fec !== null) {
				let d = moment(fec).format("MM[/]DD[/]YYYY");
				s.frmConDate.dat = new Date(d);
			}else{
				s.frmConDate.dat = null;
			}
  			s.frmConDate.idx = id;

			$('#con_det_edit_modal').modal('show');
			rs.valConDate = false;
  		};

  		rs.conSavDate = (id, fec) => {
  			if (typeof parseInt(id) !== "number") {
				return console.error('number , date error');
			}

			if (fec == null) {
				rs.valConDate = true; s.focusInput('con_date'); return;
			}else{
				Cdet.putDet({id,fec}).then(r => {
					r ? ( s.alertMsj('Recepción actualizada','correctamente'), rs.conClnDate(), s.allDetCon()) :
						s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
				},e => {
					console.error(e.status);
				});
			}
  		};

  		rs.conClnDate = () => {
  			s.frmConDate.dat = null;
  			s.frmConDate.idx = 0;

			$('#con_det_edit_modal').modal('hide');
			s.focusInput('find_rescon');
  		};




		s.goToPag = (pag = 1) => {	
			if (s.paramCon !== undefined && s.paramCon !== '') {
				getCon(true, s.paramCon, s.number, pag, false);
			}else{
				getCon(false, null, null, pag, false);
			}
		};

	}]).factory('conIni.Srv', ['$http', function(h){
		const getAll = (flag = false, prm = null, num = null, p, pp = 10) => {
			let url;
			url = `OP=LIS&PAG=${p}&PPAG=${pp}`;
			
			if (flag) {
				url = `OP=PRM&PAG=${p}&PPAG=${pp}&PAR=${num}&STR=${prm}`;
			}
			return h.get(`../controller/AjaxConCtrl/Ajax.ConMod.php?${url}`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};
		return {getAll : getAll};
	}]).factory('conPro.Fac', ['$http', function(h) {
		return {
			getCon: (id) => {
				return h.get(`../controller/AjaxConCtrl/Ajax.ConMod.php?OP=IDX&ID=${id}`).then(res => {
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			},
			estCon: (id) => {
				return h.get(`../controller/AjaxConCtrl/Ajax.ConMod.php?OP=EST&ID=${id}`).then(res => {
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			},
			chgCon: (data) => {
				return h.put('../controller/AjaxConCtrl/Ajax.ConMod.php?OP=CHG',data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			delCon: (id) => {
				return h.delete(`../controller/AjaxConCtrl/Ajax.ConMod.php?OP=CON&ID=${id}`).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]).factory('conDet.Fac', ['$http', function(h){
		return {
			putDet: (data) => {
				return h.put('../controller/AjaxConCtrl/Ajax.ConMod.php?OP=D_UPD',data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			chgDet: (data) => {
				return h.put('../controller/AjaxConCtrl/Ajax.ConMod.php?OP=D_CHG',data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			delDet: (id, sid) => {
				return h.delete(`../controller/AjaxConCtrl/Ajax.ConMod.php?OP=DET&ID=${id}&S_ID=${sid}`).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);