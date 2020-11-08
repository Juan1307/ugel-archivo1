(function(a) {	
	'use strict';

	a.module('resList_App', []).constant('resListPtrn', ['[0-9]{2,5}','[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}'])
	.controller('resListUsu_Ctrl', ['$scope','$rootScope','resListPtrn','resGet.Srv','resGet.Fac', function(s, rs, ptrn, Rini, Rget){

		console.log('LISTAR RES USU');
		s.resListPtrn = ptrn;
		//LIST MODULE
		const getRes = (flag, prm, num, p = 1, fpag) => {
			s.load_data = true;
			Rini.getAll(flag, prm, num, p).then( r => {
				console.log('res',r);
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

		//LIST DET MODULE

		s.$watch('paramRes', (vn, vo)  => {
    		if (vn !== undefined && vn !== '') {
    			getRes(true, s.paramRes, s.number);
    		}else if (vn === ''){
    			getRes(false);
    		}
  		});

		s.selectPrm = (bool = 0) => {
			s.number = bool;
			s.textPrmRes = (bool == 0) ?'N° Res ó N° Pro' : 'Fecha / D-M-A';
			s.focusInput('find_res');
		};
		s.selectPrm();

		s.viewRes = (id) => {

		};

		s.editRes = (id) => {
			
			if (typeof parseInt(id) !== 'number' ) {
				return console.error('number error');
			}

			Rget.getResId(id).then( r => {
				console.log('res', r);
				s.frmResDat.nro_res = r.nresolucion;
				s.frmResDat.nro_pro = r.nproyecto;
				rs.select_m(r.id_motivo);
				s.frmResDat.res_area = r.id_area;
				let d = moment(r.f_emision).format("MM[/]DD[/]YYYY");
				s.frmResDat.res_fec = new Date(d);
			},e => {
				console.error(e.status);
			});

			$('#res_edit_modal').modal('show');
			s.focusInput('nro_res');		
		};

		s.delRes = (id) => {

		};

		s.goToPag = (pag = 1) => {
			if (s.paramRes !== undefined && s.paramRes !== '') {
				getRes(true, s.paramRes, s.number, pag, false);
			}else{
				getRes(false, null, null, pag, false);
			}
		};

	}]).factory('resGet.Srv', ['$http', function(h){
		const getAll = (flag = false, prm = null, num = null, p, pp = 10) => {
			let url;
			url = `OP=LIS&PAG=${p}&PPAG=${pp}`;
			
			if (flag) {
				url = `OP=PRM&PAG=${p}&PPAG=${pp}&PAR=${num}&STR=${prm}`;
			}
			return h.get(`../controller/AjaxResCtrl/Ajax.ResUsu.php?${url}`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};

		return {getAll : getAll};

	}]).factory('resGet.Fac', ['$http', function(h){

		return {
			getResId: (id) => {
				return h.get(`../controller/AjaxResCtrl/Ajax.ResUsu.php?OP=IDX&ID=${id}`).then(res => {
					console.log('http', res);
					return res.data;
				}).catch( err => {
					console.error(err.status);
				});
			},
			getDetId: (id) =>{

			}
		};
	}]).factory('resUsuSet.Fac', ['$http', function(h){

		return {
			chgRes: (id, est) => {

			},
			delRes: (id) => {

			}
		};
	}]).factory('resDetUsu.Fac', ['$http', function(h){
		return {
			getResDetId: (id_0, id_1) => {

			},
			pstSendDetId: (id_0, id_1) => {

			},
			delResDetId: (id_0, id_1) => {

			}
		};
	}]);

})(angular);