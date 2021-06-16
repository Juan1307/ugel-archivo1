(function(a) {	
	'use strict';

	a.module('control_App', ['conForm_App', 'conList_App'])
	.controller('control_Ctrl', ['$scope','$rootScope','resCIni.Srv','resCPro.Fac', function(s, rs, Rget, Rpro){
		//console.log('MODULO CONTROL');
		s.navLink(5);
		
		const getRes = (flag, prm, p = 1, fpag) => {
			s.load_data = true;
			Rget.getAll(flag, prm, p).then( r => {
				s.resData = r.data; 
				//pagination
				s.pagAct = r.pag_act;
				s.totPag = r.total_p;
					s.pagTable(r.array_p, r.pag_act, r.total_p, fpag);

				s.load_data = false;
			},e => {
				console.error(e.status);
			});
		};

		s.$watch('paramRes', (vn, vo) => {
			if (vn !== undefined && vn !== '' && vn !== null) {
    			getRes(true, s.paramRes);
			}else if(vn == '') {
    			getRes(false);
			}
  		});

		s.outRes = () => {
			$("#res_add_modal").modal('hide');
			s.focusInput('employe');
			s.paramRes = '';
		};
		
		s.inRes = () => {
			$("#res_add_modal").modal('show');
			s.focusInput('find_res');
			s.paramRes = '';
		};
		
		s.allRes = () => {
			if (s.paramRes !== undefined && s.paramRes !== '' && s.paramRes !== null) {
    			getRes(true, s.paramRes, s.pagAct);
    		}else{
    			getRes(false, null, s.pagAct, false);
    		}
			s.focusInput('find_res');
		};

		s.stateRes = (id , est) => {
			if (typeof parseInt(id, est) !== 'number') {
				return console.error('number error');
			}
			swal({
				title: "¿Desea cambiar el estado de esta resolución?",
			  	text: "Maneja en control de acceso a la resolución.",
			  	icon: "warning",
			  	buttons: ["Cancelar","Aceptar"],
			  	dangerMode: false,
			}).then( (mark) => {
			  	if (mark) {
					Rpro.chgRes({id,est}).then(r =>{
						if (!r) {
							s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
						}
						s.allRes();
					},e => {
						console.error(e.status);
					});
			  	}
			});
		};

		s.conLoad = (m, arg) => {
			s.focusInput(arg);
			s.con_load = true;
			if (!m) {
				s.con_load = false;
			}
		};
		s.conLoad(true,'employe');

		s.goToPag = (pag = 1) => {
			if (s.paramRes !== undefined && s.paramRes !== '' && s.paramRes !== null) {
				getRes(true, s.paramRes, pag, false);
			}else{
				getRes(false, null, pag, false);
			}
		};

		//FORM VARIABLE STATE
		s.frmConDate = {};
		s.frmCon = {};
		s.idEdit = {};

		//LIST VARIABLE STATE
		s.estData = {};

	}]).factory('resCIni.Srv', ['$http', function(h){
		const getAll = (flag = false, prm = null, p, pp = 10) => {
			let url;
			url = `OP=LIS&PAG=${p}&PPAG=${pp}`;
			
			if (flag) {
				url = `OP=PRM&PAG=${p}&PPAG=${pp}&STR=${prm}`;
			}
			return h.get(`../controller/AjaxConCtrl/Ajax.ConApp.php?${url}`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};
		return {getAll : getAll};
	}]).factory('resCPro.Fac', ['$http', function(h){
		return {
			chgRes: (dat) => {
				return h.put('../controller/AjaxResCtrl/Ajax.ResApp.php',dat).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);