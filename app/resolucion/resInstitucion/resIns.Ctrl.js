(function(a) {	
	'use strict';

	a.module('resInsti_App', ['resForm_App','resList_App','resInstiDet_App']).controller('resInsti_Ctrl', ['$scope','$rootScope', function(s, rs){
		console.log('RES - INSTITUCIONES');
		
		s.navLink(2, true, 1);
		rs.module = 'INS';

		//FORM VARIABLE STATE
		s.frmIns = {};
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
				case 'res_load1': rs.resins_load = true; break;
			}
		};
		s.resLoad();

		s.frmResDat = {};
		//DET STATE
		s.det_mod = false;
		s.frmDate = {};
	}]);

})(angular);