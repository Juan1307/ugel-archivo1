(function(a) {	
	'use strict';

	a.module('users_App', ['usuForm_App', 'usuList_App']).controller('users_Ctrl', ['$scope','UsuEst.Srv', function(s, Uest){

		s.navLink(3);
		console.log('MODULO usuarios');

		s.est = {};
		Uest.then(r => {
			s.est.tot = r[0];
			s.est.inc = r[1];
			s.est.com = r[0] - r[1];
			s.est.p_inc = Math.round(r[1] * 100 / 10000);
			s.est.p_com = Math.round(s.est.com * 100 / 10000);

		},e => {
			console.error(e.status);
		});

		s.userLoad = (m, arg) => {
			s.focusInput(arg);
			s.load_usu0 = true , s.load_usu1 = false;
			if (!m) {
				s.load_usu0 = false , s.load_usu1 = true;
			}
		};
		s.userLoad(true,'last_name');

		//FORM VARIABLE STATE
		s.frmData = {};
		s.idEdit = {};

		//LIST VARIABLE STATE
		s.estData = {};

	}]).factory('UsuEst.Srv', ['$http', function(h){
		return h.get('../controller/Ajax.usuarios.php?OP=INI').then(res => {
			return res.data;
		}).catch(err => {
			console.error(err.status);
		});
	}]);

})(angular);