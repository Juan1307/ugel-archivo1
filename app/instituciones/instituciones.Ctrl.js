(function(a) {	
	'use strict';

	a.module('instis_App', []).controller('instis_Ctrl', ['$scope', function(s){
		console.log('MODULO INsTI');

		s.navLink(4);

		//FORM VARIABLE STATE
		s.frmIns = {};
		s.idEdit = {};

		//LIST VARIABLE STATE
		s.estData = {};

	}]);

})(angular);