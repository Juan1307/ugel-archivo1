(function(a) {	
	'use strict';

	a.module('personal_App', []).constant('perPtrn', '[a-zA-ZáéíóúñÑÁÉÍÓÚ ]{2,70}')
	.controller('personal_Ctrl', ['$scope','perPtrn','Personal.Srv','Personal.Set', function(s, ptrn, Pget, Pset){
		console.log('MODULO PERSONAL');
		s.navLink(7);
		s.persoPtrn = ptrn; 
		s.focusInput('surname');
		s.id_edit = null;

		const getPers = (flag, prm, p = 1, fpag) => {
			s.load_data = true;
			Pget.getAllPers(flag, prm, p).then( r => {
				 console.log('r',r);
				s.perData = r.data; 
				//pagination
				s.pagAct = r.pag_act;
				s.totPag = r.total_p;
					s.pagTable(r.array_p, r.pag_act, r.total_p, fpag);

				s.load_data = false;
			},e => {
				console.error(e.status);
			});
		};

		s.$watch('paramPer', (vn, vo)  => {
    		if (vn !== undefined && vn !== '') {
    			getPers(true, s.paramPer);
    		}else if (vn === ''){
    			getPers(false);
    		}
  		});

  		s.allPers = () => {
			if (s.paramPer !== undefined && s.paramPer !== '') {
    			getPers(true, s.paramPer, s.pagAct);
    		}else{
    			getPers(false, null, s.pagAct, false);
    		}
			s.focusInput('find_perso');
		};

  		const sendPer = (data) => {
  			switch (data[1]) {
  				case null:
  					Pset.pstPerso(data[0]).then(r => {
						(r) ? (s.alertMsj('Persona registrada','correctamnete'), s.allPers(), s.cleanPer() ) : 
							   s.sweetMsj('¡Ooops error!','No se pudo registrar la persona, porfavor reportelo.','error');
  						//console.log('r',r);
  					},e => {
  						console.error(e.status);
  					});
  				break;

  				default:
  					Pset.putPerso(data).then(r => {
						(r) ? (s.alertMsj('Persona actualizada','correctamnete'), s.allPers(), s.cleanPer(true) ) : 
							   s.sweetMsj('¡Ooops error!','No se pudo actualizar la persona, porfavor reportelo.','error');
  						//console.log('r',r);
  					},e => {
  						console.error(e.status);
  					});
  				break;
  			}
  		};
		
		const verPer = (data) => {
			Pset.verPerso(data[0]).then( r => {
				if (r) {
					return s.sweetMsj('Ooops ya existe','La persona ingresada ya existe. porfavor revise');
				}else{
					sendPer(data);
				}
			},e => {
				console.error(e.status);
			});
		};

		s.savePer = (arr, idx = null) => {
			arr[0] = arr[0] == '' ? undefined :arr[0] ;
			arr[1] = arr[1] == '' ? undefined :arr[1] ;
			
			if (arr[1] == undefined) {
				s.valEm = true;
				return s.focusInput('surname');
			}
			if (arr[0] == undefined) {
				s.valEm = true;
				return s.focusInput('name');
			}
			let data = [arr, idx];
			verPer(data);
		};

		s.editPer = (id) => {
			if (typeof parseInt(id) !== "number") {
				return console.error('number error');				
			}
			Pget.getPersId(id).then(r => {
				
				s.id_edit = r.id_personal;
				s.name = r.nombres;
				s.surname = r.apellidos;
				s.focusInput('surname');
			},e => {
				console.error(e.status);
			});			
		};
		s.cleanPer = (flag = false) => {
			if (flag) {
				s.id_edit = null;	
			}
			s.name = '';
			s.surname = '';
			s.focusInput('surname');
		};

		s.goToPag = (pag = 1) => {	
			if (s.paramPer !== undefined && s.paramPer !== '') {
				getPers(true, s.paramPer, pag, false);
			}else{
				getPers(false, null, pag, false);
			}
		};

	}]).factory('Personal.Srv', ['$http', function(h){
		const getPersId = (id) => {
			return h.get(`../controller/Ajax.Personal.php?OP=IDX&ID=${id}`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};

		const getAllPers = (flag = false, prm = null, p, pp = 10) => {
			let url;
			url = `OP=LIS&PAG=${p}&PPAG=${pp}`;
			
			if (flag) {
				url = `OP=PRM&PAG=${p}&PPAG=${pp}&STR=${prm}`;
			}
			return h.get(`../controller/Ajax.Personal.php?${url}`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};
		return { getAllPers : getAllPers ,getPersId : getPersId };

	}]).factory('Personal.Set', ['$http', function(h){
		return {
			verPerso:(data) => {
				return h.put('../controller/Ajax.Personal.php?OP=VER',data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			putPerso:(data) => {
				return h.put('../controller/Ajax.Personal.php?OP=UPD',data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			pstPerso:(data) => {
				return h.post('../controller/Ajax.Personal.php',data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);