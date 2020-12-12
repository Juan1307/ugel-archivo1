(function(a) {	
	'use strict';

	a.module('usuList_App', []).constant('usuListPtrn', ['[0-9]{0,15}','[a-zA-ZáéíóúñÑÁÉÍÓÚ ]{0,60}','[0-9]{0,9}'])
	.controller('usuList_Ctrl', ['$scope','$rootScope','usuListPtrn','usuGet.Srv','usuGet.Fac', function(s, rs, ptrn, Uini, Uget){
		//console.log('USU LIST');
		s.usuListPtrn = ptrn; 

		const getUsers = (flag, prm, num, p = 1, fpag) => {
			s.load_data = true;
			Uini.getAllUsu(flag, prm, num, p).then( r => {
				s.userData = r.data; 
				//pagination
				s.pagAct = r.pag_act;
				s.totPag = r.total_p;
					s.pagTable(r.array_p, r.pag_act, r.total_p, fpag);

				s.load_data = false;
			},e => {
				console.error(e.status);
			});
		};

		s.$watch('paramUser', (vn, vo)  => {

    		if (vn !== undefined && vn !== '') {
    			getUsers(true, s.paramUser, s.number);
    		}else if (vn === ''){
    			getUsers(false);
    		}
  		});

		s.selectPrm = (n) => {
			s.number = n;
			s.paramUser = '';
			s.textPrmUsu = (n === 0) ? 'N° Dni ó N° Carnet' : (n === 1 ) ? 'Apellidos ó Nombres' : 'Contacto';
			s.focusInput('find_user');
		};
		s.selectPrm(1);
		
		//root
		rs.detData = [];
		const addIndex = (arrdet) => {
			for (let p in arrdet) {
				arrdet[p].idx = p;
			}
			rs.detData = arrdet;
		};
		//root
		rs.addDet = (det) => {
			if (det.ndni == null && det.carnet == null) {
				rs.detData.push(det); addIndex(rs.detData);
			}else{
				rs.detData.some( e => (e.ndni == det.ndni && det.carnet == null) || (e.carnet == det.carnet && det.ndni == null) || 
									  (e.ndni == det.ndni && e.carnet == det.carnet))
					? s.sweetMsj('¡Ooops Dni ó Carnet!','El usuario ya existe en la lista, porfavor revise.') 
					: rs.detData.push(det); addIndex(rs.detData);
			}
			s.focusInput('find_user');
		};
		//root
		rs.remDet = (key) => {
			rs.detData.splice(key, 1); addIndex(rs.detData);
		};
		
		rs.allUsers = () => {
			if (s.paramUser !== undefined && s.paramUser !== '') {
    			getUsers(true, s.paramUser, s.number, s.pagAct);
    		}else{
    			getUsers(false, null, null, s.pagAct, false);
    		}
			s.focusInput('find_user');
		};

		//root
		s.addUser = () => {
			rs.load_usu1 = false; rs.load_usu0 = true;
				
				s.idEdit.idUser = ''; 
				s.frmData.last_name = '';
				s.frmData.first_name = '';
				s.frmData.nro_dni = '';
				s.frmData.nro_carnet = '';
				s.frmData.nro_contact = '';

			$('#usu_edit_modal').modal('show');
			s.focusInput('last_name');
		};

		s.editUser = (id) => {
			//root
			rs.load_usu0 = false; rs.load_usu1 = true;

			if (typeof parseInt(id) !== 'number' ) {
				return console.error('number error');
			}
			
			Uget.getUsuId(id).then(r => {
				s.idEdit.idUser = r.id_usuario; 
				s.frmData.last_name = r.apellidos;
				s.frmData.first_name = r.nombres;
				s.frmData.nro_dni = r.ndni;
				s.frmData.nro_carnet = r.carnet;
				s.frmData.nro_contact = r.contacto;

				$('#usu_edit_modal').modal('show');
				s.focusInput('last_name');
			},e => {
				console.error(e.status);
			});
		};

		s.viewUser = (id, arr) => {
			if (typeof parseInt(id) !== 'number' ) {
				return console.error('number error');
			}

			s.estData.user = {};
			s.estData.data = [];

			s.estData.count  = [0,0];

			Uget.getUsuEst(id).then( r => {
					s.estData.user = arr;
					s.estData.data = r;

					for (let idx of r) {
						(idx.estado == 0) ? s.estData.count[0]+=1 : s.estData.count[1]+=1;
					}

				$('#usu_view_modal').modal('show');
				s.focusInput('find_res_user');
			},e => {
				console.error(e.status);
			});
		};

		s.goToPag = (pag = 1) => {
			
			if (s.paramUser !== undefined && s.paramUser !== '') {
				getUsers(true, s.paramUser, s.number, pag, false);
			}else{
				getUsers(false, null, null, pag, false);
			}
		};

	}]).factory('usuGet.Srv', ['$http', function(h){
		const getAllUsu = (flag = false, prm = null, num = null, p, pp = 10) => {
			let url;
			url = `OP=LIS&PAG=${p}&PPAG=${pp}`;
			
			if (flag) {
				url = `OP=PRM&PAG=${p}&PPAG=${pp}&PAR=${num}&STR=${prm}`;
			}
			return h.get(`../controller/Ajax.Usuarios.php?${url}`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};

		return {getAllUsu : getAllUsu};

	}]).factory('usuGet.Fac', ['$http', function(h){
		return {
			getUsuId: (id) => {
				return h.get(`../controller/Ajax.Usuarios.php?OP=IDX&ID=${id}`).then(res => {
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			},
			getUsuEst: (id)  => {
				return h.get(`../controller/Ajax.Usuarios.php?OP=IDE&ID=${id}`).then(res => {
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);