(function(a) {	
	'use strict';

	a.module('instis_App', []).controller('instis_Ctrl', ['$scope', function(s){
		//'insForm_App', 'insList_App'
		s.navLink(4);
		console.log('MODULO ISNTI');

		//FORM VARIABLE STATE
		s.frmIns = {};
		s.idEdit = {};

		//LIST VARIABLE STATE
		s.estData = {};

	}]);

})(angular);