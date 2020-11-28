(function(a) {	
	'use strict';

	a.module('resDet_App', [])
	.controller('resDet_Ctrl', ['$scope','$rootScope','resDetGet.Fac','resDetSet.Fac', function(s, rs, RDget, RDset){

		console.log('EXTEND RES DET');

  		s.editResDet = (id) => {
  			if (typeof parseInt(id) !== "number") {
				return console.error('number error')
			}

  		};

  		s.sendResDet = () => {

  		};
  		

  		s.addResDet = (id, s_id) => {
  			if (typeof parseInt(id, s_id) !== "number") {
				return console.error('number error')
			}

			RDset.chgRes({id,s_id}).then(r =>{
				console.log('res',r);
					/*if (!r) {
						s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
					}*/
					//s.allDetRes();
			},e => {
				console.error(e.status);
			});

  		};

  		s.delDetRes = (id, s_id) => {
  			if (typeof parseInt(id, s_id) !== "number") {
				return console.error('number error')
			}

			swal({
				title: "¿Desea eliminar este dato de la resolución?",
			  	text: "",
			  	icon: "warning",
			  	buttons: ["Cancelar","Aceptar"],
			  	dangerMode: false,
			}).then( (mark) => {
			  	if (mark) {
					RDset.chgRes({id, s_id}).then(r =>{
						console.log('res',r);
						/*if (!r) {
							s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
						}*/
						//s.allDetRes();
					},e => {
						console.error(e.status);
					});
			  	}
			});
  		};

	}]).factory('resDetGet.Fac', ['$http', function(h){

		return {
			getDetDate: (uri, id) => {
				return h.get(`../controller/AjaxResCtrl/Ajax.ResDet.php?ID=${id}`).then(res => {
					return res.data;
				}).catch( err => {
					console.error(err.status);
				});
			}
		};
	}]).factory('resDetSet.Fac', ['$http', function(h){

		return {
			pstResDet: (data) => {
				return h.post(`../controller/AjaxResCtrl/Ajax.ResDet.php`, data).then(res => {
					console.log('http',res);
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			},
			putDetDate: (data) => {
				return h.put(`../controller/AjaxResCtrl/Ajax.ResDet.php`, data).then(res => {
					return res.data;
				}).catch( err => {
					console.error(err.status);
				});
			},
			delDetRes: (data) => {
				return h.delete(`../controller/AjaxResCtrl/Ajax.ResDet.php?ID=${id}`).then(res => {
					console.log('http',res);
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);