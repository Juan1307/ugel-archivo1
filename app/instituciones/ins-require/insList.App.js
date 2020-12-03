(function(a) {	
	'use strict';

	a.module('insList_App', []).constant('insListPtrn', ['[0-9a-zA-ZáéíóúñÑÁÉÍÓÚ°/# ]{2,70}'])
	.controller('insList_Ctrl', ['$scope','$rootScope','insListPtrn','insGet.Srv','insGet.Fac', function(s, rs, ptrn, Iini, Iget){
		
		console.log('INS LIST');
		s.insListPtrn = ptrn; 

		const getInsti = (flag, prm, p = 1, fpag) => {
			s.load_data = true;
			Iini.getAllIns(flag, prm, p).then( r => {
				s.insData = r.data; 
				//pagination
				s.pagAct = r.pag_act;
				s.totPag = r.total_p;
					s.pagTable(r.array_p, r.pag_act, r.total_p, fpag);

				s.load_data = false;
			},e => {
				console.error(e.status);
			});
		};

		s.$watch('paramIns', (vn, vo)  => {

    		if (vn !== undefined && vn !== '') {
    			getInsti(true, s.paramIns);
    		}else if (vn === ''){
    			getInsti(false);
    		}
  		});
		
		rs.allInsti = () => {
			if (s.paramIns !== undefined && s.paramIns !== '') {
    			getInsti(true, s.paramIns, s.pagAct);
    		}else{
    			getInsti(false, null, s.pagAct, false);
    		}
			s.focusInput('find_inst');
		};

		s.addUser = () => {
			//root
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

		s.editInsti = (id) => {
			if (typeof parseInt(id) !== 'number' ) {
				return console.error('number error');
			}
			
			Iget.getInsId(id).then(r => {
				console.log('res', r);
				s.idEdit.id_ins = r.id_institucion; 
				s.frmIns.institute = r.nombre;
				s.frmIns.level = r.nivel;

				rs.load_insti = true;
				s.focusInput('institute');
			},e => {
				console.error(e.status);
			});
		};

		s.viewInsti = (id, arr) => {
			if (typeof parseInt(id) !== 'number' ) {
				return console.error('number error');
			}
			console.log('arr',arr);

			s.estData.insti = {};
			s.estData.data = [];
			s.estData.count  = [0,0];

			Iget.getInsEst(id).then( r => {
					s.estData.insti = arr;
					s.estData.data = r;

					for (let idx of r) {
						(idx.estado == 0) ? s.estData.count[0]+=1 : s.estData.count[1]+=1;
					}

				$('#ins_view_modal').modal('show');
				s.focusInput('find_res_ins');
			},e => {
				console.error(e.status);
			});
		};

		s.goToPag = (pag = 1) => {
			
			if (s.paramIns !== undefined && s.paramIns !== '') {
				getInsti(true, s.paramIns, pag, false);
			}else{
				getInsti(false, null, pag, false);
			}
		};

	}]).factory('insGet.Srv', ['$http', function(h){
		const getAllIns = (flag = false, prm = null, p, pp = 10) => {
			let url;
			url = `OP=LIS&PAG=${p}&PPAG=${pp}`;
			
			if (flag) {
				url = `OP=PRM&PAG=${p}&PPAG=${pp}&STR=${prm}`;
			}
			return h.get(`../controller/Ajax.Instituciones.php?${url}`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};

		return {getAllIns : getAllIns};

	}]).factory('insGet.Fac', ['$http', function(h){
		return {
			getInsId: (id) => {
				return h.get(`../controller/Ajax.Instituciones.php?OP=IDX&ID=${id}`).then(res => {
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			},
			getInsEst: (id)  => {
				return h.get(`../controller/Ajax.Instituciones.php?OP=IDE&ID=${id}`).then(res => {
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);