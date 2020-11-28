
<!DOCTYPE html>
<html lang="es" ng-app="Arc_Sys" ng-controller="Main_Ctrl">

<head>
    <title>Sys Archivo</title>
    
    <!-- Required Meta -->
    <meta charset="utf-8">
    <meta name="description" content="Sys Archivo ">
    <meta name="robots" content="index, follow">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Required Css -->
    <link rel="stylesheet" href="../public/css/style.css">
    <link rel="stylesheet" href="../public/css/plugins/animate.min.css">
    
    <!-- Required Plugins -->
    <link rel="stylesheet" href=".assets/hint-css/hint.min.css">
    <link rel="stylesheet" href=".angular/ui-select/ui-select.min.css">

</head>

<body>
    <!-- [ Pre-loader ] start -->
    <div class="loader-bg">
        <div class="loader-track">
            <div class="loader-fill"></div>
        </div>
    </div>
    <!-- [ Pre-loader ] End -->

    <!-- [ navigation menu ] start -->
    <nav class="pcoded-navbar menupos-fixed menu-light">
        <div class="navbar-wrapper ">
            <div class="navbar-content scroll-div">
                <ul class="nav pcoded-inner-navbar">
                    <li class="nav-item pcoded-menu-caption">
                        <label>General</label>
                    </li>
                    <li class="nav-item" ng-class="link_0">
                        <a ui-sref="m_home" class="nav-link link-hov" >
                            <span class="pcoded-micon"><i class="feather icon-compass"></i></span>
                            <span class="pcoded-mtext">Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item" ng-class="link_1">
                        <a ui-sref="m_graphics" class="nav-link link-hov">
                            <span class="pcoded-micon"><i class="feather icon-bar-chart"></i></span>
                            <span class="pcoded-mtext">Graficos</span>
                        </a>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Modulos</label>
                    </li>
                    <li class="nav-item pcoded-hasmenu" ng-class="link_2">
                        <a class="nav-link link-hov" >
                            <span class="pcoded-micon"><i class="feather icon-book"></i></span>
                            <span class="pcoded-mtext">Resolucion</span>
                        </a>
                        <ul class="pcoded-submenu" ng-style="{ 'display' : styul_0 ? 'block' : 'none' }">
                            <li ng-class="link_2_sub_0">
                                <a ui-sref="m_resUsers"  class="link-hov">Usuario</a>
                            </li>
                            <li ng-class="link_2_sub_1">
                                <a ui-sref="m_resInsti"  class="link-hov">Institucion</a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item" ng-class="link_3">
                        <a ui-sref="m_users" class="nav-link link-hov">
                            <span class="pcoded-micon"><i class="feather icon-user"></i></span>
                            <span class="pcoded-mtext">Usuario</span>
                        </a>
                    </li>
                    <li class="nav-item" ng-class="link_4">
                        <a ui-sref="m_institutions" class="nav-link link-hov">
                            <span class="pcoded-micon"><i class="feather icon-home"></i></span>
                            <span class="pcoded-mtext">Institucion</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-hov">
                            <span class="pcoded-micon"><i class="feather icon-repeat"></i></span>
                            <span class="pcoded-mtext">Control</span>
                        </a>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Sub Mod.</label>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-hov">
                            <span class="pcoded-micon"><i class="feather icon-flag"></i></span>
                            <span class="pcoded-mtext">Oficina - Motivo</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-hov">
                            <span class="pcoded-micon"><i class="feather icon-user-check"></i></span>
                            <span class="pcoded-mtext">Personal</span>
                        </a>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Reportes</label>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link link-hov">
                            <span class="pcoded-micon"><i class="feather icon-file-text"></i></span>
                            <span class="pcoded-mtext">Estado General</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- [ navigation menu ] end -->

    <!-- [ Header ] start -->
    <header class="navbar pcoded-header navbar-expand-lg navbar-light headerpos-fixed header-blue">
        <?php require_once 'app-main/header.php'; ?>
    </header>
    <!-- [ Header ] end -->

    <!-- [ Main Content ] start -->
    <div class="pcoded-main-container" ui-view>
    </div>
    <!-- [ Main Content ] end -->
   
    <!-- Required Js -->
    <script src="../public/js/vendor-all.min.js"></script>
    <script src="../public/js/plugins/bootstrap.min.js"></script>
    <script src="../public/js/pcoded.min.js"></script>

    <!-- Required Angular -->
    <script src=".angular/ang-library/angular.js"></script>
    <script src=".angular/ang-sanitize/angular-sanitize.min.js"></script>
    <script src=".angular/ui-select/ui-select.min.js"></script>
    <script src=".angular/ui-router/angular-ui-router.min.js"></script>
    <script src=".angular/oclazyload/ocLazyLoad.min.js"></script>

    <!-- Required Plugins -->
    <script src=".assets/apex-charts/apexcharts.min.js"></script>
    <script src=".assets/sweet-alert/sweetalert.min.js"></script>
    <script src=".assets/moment-js/moment.min.js"></script>

    <!-- Required Main -->
    <script src="app-main/app.main.js"></script>
    <script src="app-main/app.route.js"></script>
    <script src="index.js"></script>

</body>

</html>
