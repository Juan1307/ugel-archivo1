(function(a) {	
	'use strict';

	a.module('resUsers_App', ['resForm_App','resList_App','resUsersDet_App']).controller('resUsers_Ctrl', ['$scope','$rootScope', function(s, rs){
		console.log('USERS MODULE RESADD');


		s.navLink(2, true, 0);
		rs.module = 'USU';

		//FORM VARIABLE STATE
		s.frmData = {};
		s.idEdit = {};
		
		s.stepView = (val = true, arg = 'nro_res') => {
			rs.step = val;
			s.focusInput(arg);
		};

		s.resLoad = (m = 0) => {
			
			s.res_load0 = false;
			s.res_load1 = false;
			
			let arg = `res_load${m}`;
			s[arg] = true;

			switch (arg) {
				case 'res_load0': s.stepView(); break;
				case 'res_load1': rs.resusu_load = true; break;
			}
		};
		s.resLoad();
		
		s.frmResDat = {};
		//DET STATE
		s.det_mod = false;
		s.frmDate = {};
	}]);

})(angular);