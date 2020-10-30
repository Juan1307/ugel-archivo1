(function(a) {	
	'use strict';

	a.module('resUsers_App', []).constant('MOD', 'USU').controller('resUsers_Ctrl', ['$scope','$rootScope','MOD', function(s, rs, M){
		console.log('estamos en reolucion - USUARIOS');

		s.navLink(2, true, 0);
		rs.module = M;

		//FORM VARIABLE STATE
		s.frmData = {};
		s.idEdit = {};
		
		s.stepView = (val = true, foco = 'nro_res') => {
			rs.step = val;
			s.focusInput(foco);
		};

		s.resLoad = (m = 0) => {
			
			s.res_load0 = false;
			s.res_load1 = false;
			s.res_load2 = false;
			
			let arg = `res_load${m}`;
			s[arg] = true;

			switch (arg) {
				case 'res_load0': s.stepView(); break;
				
				case 'res_load1':

				break;
				
				case 'res_load2':

				break;
			}
		};
		s.resLoad();
		
	}]);

})(angular);