(function(a) {
    'use strict';

    a.module('App.Module', ['App.Gbl.Find','usuForm_App']).controller('Module_Ctrl', ['$scope','$rootScope', function(s, rs) {
        console.log('en modules ');
        
        //FIND SEARCH STATE
        s.frmFind = {};
        s.idFind = {};

        s.frmDtFd = {};

    }]);

})(angular);