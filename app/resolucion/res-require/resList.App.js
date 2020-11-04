(function(a) {	
	'use strict';

	a.module('resList_App', []).constant('resFormPtrn', ['[0-9]{3,5}'])
	.controller('resList_Ctrl', ['$scope','$rootScope','resListPtrn','resGet.Srv','resGet.Fac', function(s, rs, ptrn, Rini, Rget){

		s.resListPtrn = ptrn;

		switch (rs.module) {
			case 'USU':
				// statements_1
			break;

			case 'INS': 

			break;

			default: console.error('error de modulo'); break;
		}

		
		
		s.viewRes = (id) => {
			rs.resusu_load = false;

			switch (rs.module) {
				case 'USU':
					
				break;
				
				case 'INS': 

				break;

				default: console.error('error de modulo en VIEW RES'); break;
			}
		};

		s.editRes = (id) => {
			switch (rs.module) {
				case 'usu':
					// statements_1
				break;

				case 'INS': 

				break;

				default: console.error('error de modulo en EDIT RES'); break;
			}
		};

		s.delRes = () => {

			switch (rs.module) {
				case 'USU':
					// statements_1
				break; 

				default: console.error('error de modulo en DET RES'); break;
			}
		};


	}]).factory('resUsuSet.Fac', ['$http', function(h){
		const config = { headers:{'Content-Type': undefined},
					     transformRequest: angular.identity };
		return {
			pstRes: (data) => {
				return h.post('../controller/AjaxResCtrl/Ajax.ResUsu.php', data, config).then(res => {
					console.log('res http post', res);
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			},
			putRes: (data) =>{

			}
		};
	}]).factory('resInsSet.Fac', ['$http', function(h){
		const config = { headers:{'Content-Type': undefined},
						 transformResponse: angular.identity };

		return {
			pstRes: (data) => {

			},
			putRes: (data) =>{

			}
		};
	}]);

})(angular);