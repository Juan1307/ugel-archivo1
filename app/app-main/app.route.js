(function(a) {
    'use strict';

    a.module('App.Route', ['ui.router', 'oc.lazyLoad'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function(s, u, l) {
            //l.hashPrefix('main');

            s.state('m_home', {
                url: '/inicio',
                templateUrl: '../app/dashboard/dashboard.html',
                controller: 'home_Ctrl',
                resolve: {
                    module: function($ocLazyLoad) {
                        return $ocLazyLoad.load(['../app/dashboard/source/dashboard.Ctrl.js',
                            					 '../app/dashboard/source/dashboard.Srv.js'
                        ]);
                    }
                }
            }).state('m_graphics', {
                url: '/graficos',
                templateUrl: '../app/graficos/graficos.html',
                controller: 'graphics_Ctrl',
                resolve: {
                    module: function($ocLazyLoad) {
                        return $ocLazyLoad.load(['../app/graficos/source/graficos.Ctrl.js',
                                                 '../app/graficos/source/graficos.Srv.js'
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
            });

            u.otherwise('/inicio');
        }]);

})(angular);