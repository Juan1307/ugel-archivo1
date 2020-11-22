(function(a) {	
	'use strict';

	a.module('resUsersDet_App', []).controller('resUsersDet_Ctrl', ['$scope','$rootScope','resGet.Srv','resGet.Fac', function(s, rs, Rini, Rget){

		console.log('EXTEND RES USU');
		s.endPoint = () => {
			rs.resusu_load = true;
		};

		rs.viewRes = (id) => {
			/*
			Rget.getDetId(id).then(r =>{
				console.log('res', r);
			},e => {
				console.error(e.status);
			});*/
		};


	}]).factory('resGet.Srv', ['$http', function(h){
		const getAll = (uri, flag = false, prm = null, num = null, p, pp = 10) => {
			let url;
			url = `OP=LIS&PAG=${p}&PPAG=${pp}`;
			
			if (flag) {
				url = `OP=PRM&PAG=${p}&PPAG=${pp}&PAR=${num}&STR=${prm}`;
			}
			return h.get(`../controller/AjaxResCtrl/Ajax.Res${uri}.php?${url}`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};

		return {getAll : getAll};

	}]).factory('resGet.Fac', ['$http', function(h){

		return {
			getDetId: (uri, id) => {
				return h.get(`../controller/AjaxResCtrl/Ajax.Res${uri}.php?OP=DET&ID=${id}`).then(res => {
					console.log('http',res);
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			},
			getResId: (uri, id) => {
				return h.get(`../controller/AjaxResCtrl/Ajax.Res${uri}.php?OP=IDX&ID=${id}`).then(res => {
					return res.data;
				}).catch( err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);