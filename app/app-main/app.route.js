(function(a) {
    'use strict';

    a.module('App.Route', ['ui.router', 'oc.lazyLoad'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function(s, u, l) {
            //l.hashPrefix('main');

            s.state('m_home', {
                url: '/inicio',
                templateUrl: './dashboard/dashboard.html',
                controller: 'home_Ctrl',
                resolve: {
                    module: function($ocLazyLoad) {
                        return $ocLazyLoad.load(['./dashboard/source/dashboard.Ctrl.js',
                            					 './dashboard/source/dashboard.Srv.js'
                        ]);
                    }
                }
            }).state('m_graphics', {
                url: '/graficos',
                templateUrl: './graficos/graficos.html',
                controller: 'graphics_Ctrl',
                resolve: {
                    module: function($ocLazyLoad) {
                        return $ocLazyLoad.load(['./graficos/source/graficos.Ctrl.js',
                                                 './graficos/source/graficos.Srv.js'
                        ]);
                    }
                }
            }).state('m_users', {
                url: '/usuarios',
                templateUrl: '../app/usuarios/usuarios.html',
                controller: 'users_Ctrl',
                resolve: {
                    module: function($ocLazyLoad) {
                        return $ocLazyLoad.load(['./usuarios/usu-require/usuForm.App.js',
                                                 './usuarios/usu-require/usuList.App.js',
                                                 './usuarios/usuarios.Ctrl.js'
                        ]);
                    }
                }
            }).state('m_institutions', {
                url: '/instituciones',
                templateUrl: './instituciones/instituciones.html',
                controller: 'instis_Ctrl',
                resolve: {
                    module: function($ocLazyLoad) {
                        
                        return $ocLazyLoad.load(['./instituciones/ins-require/insForm.App.js',
                                                 './instituciones/ins-require/insList.App.js',
                                                 './instituciones/instituciones.Ctrl.js',
                        ]);
                    }
                }
            }).state('m_resUsers', {
                url: '/res-usuario',
                templateUrl: './resolucion/resUsuario/mainResUsu.html',
                controller: 'resUsers_Ctrl',
                resolve: {
                    module: function($ocLazyLoad) {
                        
                        return $ocLazyLoad.load(['./usuarios/usu-require/usuList.App.js',
                                                 './usuarios/usu-require/usuForm.App.js',

                                                 './resolucion/res-require/resForm.App.js',
                                                 './resolucion/res-require/resList.App.js',
                                                 './resolucion/resUsuario/resUsu.Ctrl.js',
                                                 './resolucion/resUsuario/resExt.Ctrl.js'
                        ]);
                    }
                }
            }).state('m_resInsti', {
                url: '/res-institucion',
                templateUrl: './resolucion/resInstitucion/mainResInsti.html',
                controller: 'resInsti_Ctrl',
                resolve: {
                    module: function($ocLazyLoad) {
                        
                        return $ocLazyLoad.load(['./instituciones/ins-require/insList.App.js',
                                                 './instituciones/ins-require/insForm.App.js',
                                                 './usuarios/usu-require/usuList.App.js',

                                                 './resolucion/res-require/resForm.App.js',
                                                 './resolucion/res-require/resList.App.js',
                                                 './resolucion/resInstitucion/resIns.Ctrl.js',
                                                 './resolucion/resInstitucion/resExt.Ctrl.js'
                        ]);
                    }
                }
            }).state('m_conRes', {
                url: '/control',
                templateUrl: './control/control.html',
                controller: 'control_Ctrl',
                resolve: {
                    module: function($ocLazyLoad) {
                        
                        return $ocLazyLoad.load(['./control/con-require/conList.App.js',
                                                 './control/con-require/conForm.App.js',
                                                 './control/control.Ctrl.js'
                        ]);
                    }
                }
            }).state('m_ofiMot', {
                url: '/oficina-motivo',
                templateUrl: './ofimot/ofimot.html',
                controller: 'ofimot_Ctrl',
                resolve: {
                    module: function($ocLazyLoad) {
                        
                        return $ocLazyLoad.load(['./ofimot/ofimot.Ctrl.js']);
                    }
                }
            }).state('m_employes',{
                url:'/personal',
                templateUrl:'./personal/personal.html',
                controller:'personal_Ctrl',
                resolve:{
                    module: function($ocLazyLoad) {
                        return $ocLazyLoad.load(['./personal/personal.Ctrl.js']);
                    }
                }
            });

            u.otherwise('/inicio');
        }]);

})(angular);