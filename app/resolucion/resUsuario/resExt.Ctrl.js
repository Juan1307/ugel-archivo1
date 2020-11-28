(function(a) {	
	'use strict';

	a.module('resUsersDet_App', []).constant('usuResDetPtrn', ['[0-9]{0,15}','[a-zA-ZáéíóúñÑÁÉÍÓÚ ]{0,60}','[0-9]{0,9}'])
	.controller('resUsersDet_Ctrl', ['$scope','$rootScope','usuResDetPtrn','resDetGet.Srv','resDetSet.Fac',
		function(s, rs, ptrn, RDini, RDset){

		console.log('EXTEND RES USU');
		s.usuDetPtrn = ptrn;

		s.backPoint = () => {
			rs.resusu_load = true; s.prmResDet = null; rs.allRes();
			s.focusInput('find_res');
		};

		const getDet = (id, flag, prm, num, p = 1, fpag) => {
			s.load_data = true;
			RDini.getAll(id, flag, prm, num, p).then(r => {
				console.log('res',r);
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

			console.log('a',s.frmDate);

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

  		s.chgDetRes = (id, est) => {
  			if (typeof parseInt(id, est) !== "number") {
				return console.error('number error');
			}

			swal({
				title: "¿Desea realizar cambios en la entrega?",
			  	text: "Según el estado se realizará o cancelará la entrega.",
			  	icon: "warning",
			  	buttons: ["Cancelar","Aceptar"],
			  	dangerMode: false,
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

		rs.nexPoint = (id) => {
			if (typeof parseInt(id) !== "number") {
				return console.error('number error')
			}
			
			s.id_rd = id;
			RDini.getIdx(id).then(r => {
				s.objRes = r.data; s.arrFil = r.files;
				rs.resusu_load = false;
			},e => {
				console.error(e.status);
			});

			s.selectPrm(1);
			s.focusInput('find_det_usu');
		};

	}]).factory('resDetGet.Srv', ['$http', function(h){
		const getAll = (id, flag = false, prm = null, num = null, p, pp = 10) => {
			let url;
			url = `OP=LIS&PAG=${p}&PPAG=${pp}`;
			
			if (flag) {
				url = `OP=PRM&PAG=${p}&PPAG=${pp}&PAR=${num}&STR=${prm}`;
			}
			return h.get(`../controller/AjaxResCtrl/Ajax.ResDet.php?${url}&ID=${id}`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};

		const getIdx = (id) => {
			return h.get(`../controller/AjaxResCtrl/Ajax.ResDet.php?OP=IDX&ID=${id}`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};

		return {getAll : getAll, getIdx : getIdx};

	}]).factory('resDetSet.Fac', ['$http', function(h){

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
			}
		};
	}]);

})(angular);