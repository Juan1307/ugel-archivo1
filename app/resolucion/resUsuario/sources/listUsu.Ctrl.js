(function(a) {	
	'use strict';

	a.module('resList_App', []).constant('resListPtrn', ['[0-9]{3,5}','[0-9]{3,5}'])
	.controller('resListUsu_Ctrl', ['$scope','$rootScope','resListPtrn','resGet.Srv','resGet.Fac', function(s, rs, ptrn, Rini, Rget){

		s.resListPtrn = ptrn;
		const getResUsu = (flag, prm, num, p = 1, fpag) => {
			s.load_data = true;
			/*Rini.getAllUsu(flag, prm, num, p).then( r => {
				s.userData = r.data; 
				//pagination
				s.pagAct = r.pag_act;
				s.totPag = r.total_p;
					s.pagTable(r.array_p, r.pag_act, r.total_p, fpag);

				s.load_data = false;
			},e => {
				console.error(e.status);
			});*/
		};

		s.$watch('paramRes', (vn, vo)  => {
    		
    		/*
    		if (vn !== undefined && vn !== '') {
    			getUsers(true, s.paramUser, s.number);
    		}else if (vn === ''){
    			getUsers(false);
    		}*/
  		});

		s.selectPrm = (bool = true) => {
			s.mark = bool;
			s.txtPrmRes = (bool) ?'N° Res ó N° Pro' : 'Fecha / D-M-A';
		};
		selectPrm();

		s.viewRes = (id) => {
			rs.resusu_load = false;

		};

		s.editRes = (id) => {
			
		};

		s.delRes = () => {

		};


	}]).factory('resUsuGet.Srv', ['$http', function(h){
		return {
			getRes: () => {

			}
		};
	}]).factory('resUsuGet.Fac', ['$http', function(h){
		
		return {
			getResId: (id) => {

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