(function(a) {	
	'use strict';

	a.module('home_App', []).controller('home_Ctrl', ['$scope', function(s){
		console.log('estamos en dashboard');

		s.navLink();
	}]);

})(angular);