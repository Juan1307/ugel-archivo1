<header class="navbar pcoded-header navbar-expand-lg navbar-light headerpos-fixed header-blue">
    <div class="m-header">
        <a class="mobile-menu" id="mobile-collapse"><span></span></a>
        <a href="#!" class="b-brand">
            <!-- ========   change your logo hear   ============ -->
            <img src="assets/images/logo.png" alt="" class="logo">
            <img src="assets/images/logo-icon.png" alt="" class="logo-thumb">
        </a>
        <a href="#!" class="mob-toggler">
            <i class="feather icon-more-vertical"></i>
        </a>
    </div>
    <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto" ng-controller="gblFind_Ctrl">
            <li class="nav-item">
                <a class="pop-search" href ng-click="showFind()">
                    <i class="feather icon-search"></i>
                </a>
                <div class="search-bar" ng-style="{'background-color': rpStr == undefined ? '#ff8484' : '#fff'}">
                    <input type="text" ng-model="rpStr" ng-pattern="findPtrn" ng-init="rpStr = ''" class="form-control border-0 shadow-none" maxlength="5" id="find_gbl" placeholder="Buscar Usuario Resolución">
                    <button type="button" class="close" aria-label="Close" ng-click="hideFind()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </li>
            <li class="nav-item">
                <a href class="full-screen" onclick="javascript:toggleFullScreen()"><i class="feather icon-maximize"></i></a>
            </li>
            <div ng-include="'app-main/finder-gbl/finderMain.html'"></div>
        </ul>

        <ul class="navbar-nav ml-auto">
            <li>
                <div class="dropdown">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown">
                        <i class="icon feather icon-bell"></i>
                        <span class="badge bg-danger">
                            <span class="sr-only"></span>
                        </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right notification">
                        <div class="noti-head">
                            <h6 class="d-inline-block m-b-0">Notifications</h6>
                            <div class="float-right">
                                <a href="#!" class="m-r-10">mark as read</a>
                                <a href="#!">clear all</a>
                            </div>
                        </div>
                        <ul class="noti-body">
                            <li class="n-title">
                                <p class="m-b-0">NEW</p>
                            </li>
                            <li class="notification">
                                <div class="media">
                                    <img class="img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image">
                                    <div class="media-body">
                                        <p><strong>John Doe</strong><span class="n-time text-muted"><i class="icon feather icon-clock m-r-10"></i>5 min</span></p>
                                        <p>New ticket Added</p>
                                    </div>
                                </div>
                            </li>
                            <li class="n-title">
                                <p class="m-b-0">EARLIER</p>
                            </li>
                            <li class="notification">
                                <div class="media">
                                    <img class="img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image">
                                    <div class="media-body">
                                        <p><strong>Joseph William</strong><span class="n-time text-muted"><i class="icon feather icon-clock m-r-10"></i>10 min</span></p>
                                        <p>Prchace New Theme and make payment</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="noti-footer">
                            <a href="#!">show all</a>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <div class="dropdown drp-user">
                    <a href="#!" class="dropdown-toggle" data-toggle="dropdown">
                        <img src="assets/images/user/avatar-1.jpg" class="img-radius wid-40" alt="User-Profile-Image">
                    </a>
                    <div class="dropdown-menu dropdown-menu-right profile-notification">
                        <div class="pro-head">
                            <img src="assets/images/user/avatar-1.jpg" class="img-radius" alt="User-Profile-Image">
                            <span><?php echo "Admin Build"; ?></span>
                            <a href="auth-signin.html" class="dud-logout" title="Logout">
                                <i class="feather icon-log-out"></i>
                            </a>
                        </div>
                        <ul class="pro-body">
                            <li><a class="dropdown-item"><i class="feather icon-user"></i> Perfil</a></li>
                            <li><a class="dropdown-item"><i class="feather icon-mail"></i> Configuracion</a></li>
                            <li><a class="dropdown-item"><i class="feather icon-lock"></i> Cerrar Sesion</a></li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</header>

<div ng-if="fd_module === true">
    
    <!-- [ EDIT DATE RES ] -->
    <div id="find_det_edit_modal" class="modal fade bd-example-modal-sm" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="UsuEditModalLabel" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title h5">Editar Entrega</h5>
                    <button type="button" class="close" data-dismiss="modal" ng-click="clnDateFind()" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <div class="modal-body">
                    <label for="res_date">Fecha</label>
                    <input type="date" id="res_date" class="form-control" ng-model="frmDtFd.dat">
                            
                    <small class="text-danger" ng-show=" (frmDtFd.dat == null && valFindDate) ? true : false">
                        Ingrese fecha correctamente.
                    </small>

                    <hr>
                    <button class="btn btn-success" ng-click="chgDateFind(frmDtFd.idx, frmDtFd.dat)">
                        <span class="feather icon-save"></span> Editar</button>
                    <button class="btn btn-danger float-right" ng-click="clnDateFind()">
                        <span class="fa fa-times"></span> Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- [ EDIT DATE RES ] -->
</div>
