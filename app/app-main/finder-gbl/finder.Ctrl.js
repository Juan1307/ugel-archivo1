(function(a) {	
	'use strict';

	a.module('App.Gbl.Find',['usuForm_App']).constant('findPtrn', '[0-9a-zA-ZáéíóúñÑÁÉÍÓÚ ]{2,60}')
	.controller('gblFind_Ctrl', ['$scope','$rootScope','findPtrn','findRes.Srv','prodRes.Fac', function(s, rs, ptrn, Fres, Pres) {
		s.test = 'desde find ctrl';
		s.findPtrn = ptrn;

		const getFind = (prm, p = 1) => {
			s.load_data = true;
			Fres.getRes(prm, p).then(r => {
				console.log('res',r);
				s.findData = r.data;
				//pagination
				s.pagAct = r.pag_act;
				s.pagA = r.pag_a; 
				s.pagS = r.pag_s;
				s.totPag = r.total_p;

				s.load_data = false;
			},e => {
				console.error(e.status);
			});
		};

		s.$watch('rpStr', (vn, vo) => {
    		if (vn !== undefined && vn !== '') {
    			getFind(s.rpStr);
    		}else{
				s.findData = [];
    		}
  		});

  		rs.allFind = () => {
  			if (s.rpStr !== undefined && s.rpStr !== '') {
    			getFind(s.rpStr);
    		}else{
				s.findData = [];
    		}
  		};

  		s.showFind = () => {
  			s.barFind = true;
			rs.fd_module = true; 
  		};

  		s.hideFind = () => {
  			s.barFind = false;
  			s.frmFind = {}; s.idFind = {};
			rs.fd_module = false; rs.det_mod = false;
  		};

  		s.getUsuFind = (id) => {
  			rs.det_mod = true;
  			if (typeof parseInt(id) !== 'number' ) {
				return console.error('number error');
			}

			Fres.getUsuId(id).then( r => {
				s.idFind.idUser = r.id_usuario; 
				s.frmFind.last_name = r.apellidos;
				s.frmFind.first_name = r.nombres;
				s.frmFind.nro_dni = r.ndni;
				s.frmFind.nro_carnet = r.carnet;
				s.frmFind.nro_contact = r.contacto;
  				  			
				$('#usu_find_edit_modal').modal('show');
				s.focusInput('last_name');
			}, e => {
				console.error(e.status);
			});
  		};

  		rs.cleanFind = () => {
  			rs.det_mod = false;
			$('#usu_find_edit_modal').modal('hide');
			s.focusInput('find_gbl');
  		};
  		
  		s.getDateFind = (id, fec) => {
			if (fec !== null) {
				let d = moment(fec).format("MM[/]DD[/]YYYY");
				s.frmDtFd.dat = new Date(d);
			}else{
				s.frmDtFd.dat = null;
			}
			s.frmDtFd.idx = id;

			$('#find_det_edit_modal').modal('show');
			rs.valFindDate = false;
  		};

  		rs.chgDateFind = (id, fec) => {
  			if (typeof parseInt(id) !== "number") {
				return console.error('number , date error');
			}

			if (fec == null) {
				rs.valFindDate = true; s.focusInput('res_date'); return;
			}else{
				Pres.putResDate({id,fec}).then(r => {
					r ? ( s.alertMsj('Entrega actualizada','correctamente'), rs.clnDateFind(), s.allFind()) :
						s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
				},e => {
					console.error(e.status);
				});
			}
  		};
  		
  		rs.clnDateFind = () => {
  			s.frmDtFd.dat = null;
			s.frmDtFd.idx = 0;

			$('#find_det_edit_modal').modal('hide');
			s.focusInput('find_gbl');
  		};

  		s.chgDetFind = (id, est) => {
  			if (typeof parseInt(id, est) !== "number") {
				return console.error('number error');
			}

			swal({
				title: "¿Desea realizar cambios en la entrega?",
			  	text: "Según el estado se realizará o cancelará la entrega.",
			  	icon: "warning", buttons: ["Cancelar","Aceptar"], dangerMode: false,
			}).then( (mark) => {
			  	if (mark) {
					Pres.chgDetRes({id,est}).then(r => {
						if (!r) {
							s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
						}
						s.allFind();
					},e => {
						console.error(e.status);
					});
			  	}
			});
  		};

  		s.goToNext = (pag = 1) => {	
			if (s.rpStr !== undefined && s.rpStr !== '') {
				getFind(s.rpStr, pag);
			}
		};

	}]).factory('findRes.Srv', ['$http', function(h){
		return {
			getRes: (prm = null, p, pp = 5) => {
				let url = `&PAG=${p}&PPAG=${pp}&STR=${prm}`;

				return h.get(`../controller/AjaxResCtrl/Ajax.ResApp.php?OP=GBL${url}`).then(res => {
					console.log('res http', res);
					return res.data;
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
	}]).factory('prodRes.Fac', ['$http', function(h){
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