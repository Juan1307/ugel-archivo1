(function(a) {	
	'use strict';

	a.module('resInsti_App', []).controller('resInstis_Ctrl', ['$scope', function(s){
		console.log('estamos en res - INSTITUCIONES');
		s.navLink(2,true,1);
	}]);

})(angular);