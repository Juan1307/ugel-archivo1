(function(a) {	
	'use strict';
	a.module('resList_App', []).constant('resListPtrn', ['[0-9]{2,5}','[0-9]{0,5}','[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}'])
	.constant('qryData', { 
		months : [ {num:1,name:'Enero'}, {num:2,name:'Febrero'}, {num:3,name:'Marzo'}, {num:4,name:'Abril'},
				  	{num:5,name:'Mayo'}, {num:6,name:'Junio'}, {num:7,name:'Julio'}, {num:8,name:'Agosto'},
				  	{num:9,name:'Septiembre'}, {num:10,name:'Octubre'}, {num:11,name:'Noviembre'}, {num:12,name:'Diciembre'}
				  ],
		years   : [2018, 2019, 2020, 2021, 2022, 2023]}
	).controller('resList_Ctrl', ['$scope','$rootScope','resListPtrn','qryData','resGet.Srv','resGet.Fac','resCet.Fac', 
	  function(s, rs, ptrn, qryd, Rini, Rget, Rcet){

		console.log('LISTAR RES');
		
		s.qryData = qryd;
		s.resListPtrn = ptrn;

		const gbl = (rs.module === 'USU') ? 'USU' : 'INS';

		const getRes = (flag, prm, num, p = 1, fpag) => {

			if (num === 1) {
				if (s.qrm.month === undefined || s.qrm.year === undefined || prm === undefined) {
					return;
				} else { prm = {rp: prm, fec:s.qrm}; }
			}

			s.load_data = true;
			Rini.getAll(gbl, flag, JSON.stringify([prm]), num, p).then( r => {
				s.resData = r.data; 
				//pagination
				s.pagAct = r.pag_act;
				s.totPag = r.total_p;
					s.pagTable(r.array_p, r.pag_act, r.total_p, fpag);

				s.load_data = false;
			},e => {
				console.error(e.status);
			});
		};

		s.$watch('paramRes', (vn, vo) => {
			if (s.number === 1 && vn !== undefined) {
    			getRes(true, s.paramRes, s.number);
			}else if (vn !== undefined && vn !== '' && vn !== null) {
    			getRes(true, s.paramRes, s.number);
			}else if (vn === '') {
    			getRes(false);
			}
  		});
		
		rs.allRes = () => {
			if (s.number === 1 && s.paramRes !== undefined) {
    			getRes(true, s.paramRes, s.number, s.pagAct);
			}else if (s.paramRes !== undefined && s.paramRes !== '' && s.paramRes !== null) {
    			getRes(true, s.paramRes, s.number, s.pagAct);
    		}else{
    			getRes(false, null, null, s.pagAct, false);
    		}
			s.focusInput('find_res');
		};

		s.selectPrm = (n = 0) => {
			s.number = n; getRes(false); s.paramRes = null;
			if (n === 0) {
				s.textPrmRes = 'N° Res ó N° Pro';
			} else {
				s.textPrmRes = 'Fecha - Mes/Año';
				s.qrm.month = undefined; s.qrm.year = undefined;
			}
			s.focusInput('find_res');
		};
		s.selectPrm();

		s.editRes = (id) => {
			if (typeof parseInt(id) !== 'number' ) {
				return console.error('number error');
			}

			Rget.getResId(gbl, id).then(r => {
				let dat = r.data;
					s.idEdit.idRes = dat.id_resolucion;
					s.frmResDat.nro_res = dat.nresolucion;
					s.frmResDat.nro_pro = dat.nproyecto;
					rs.select_m(dat.id_motivo);
					s.frmResDat.res_area = dat.id_area;
					let d = moment(dat.f_emision).format("MM[/]DD[/]YYYY");
					s.frmResDat.res_fec = new Date(d);
					rs.filDat = r.files;
				
				$('#res_edit_modal').modal('show');
				s.focusInput('nro_res');

			},e => {
				console.error(e.status);
			});
		};

		s.stateRes = (id , est) => {
			if (typeof parseInt(id, est) !== 'number') {
				return console.error('number error');
			}

			swal({
				title: "¿Desea cambiar el estado de esta resolución?",
			  	text: "Maneja en control de acceso a la resolución.",
			  	icon: "warning",
			  	buttons: ["Cancelar","Aceptar"],
			  	dangerMode: false,
			}).then( (mark) => {
			  	if (mark) {
					Rcet.chgRes({id,est}).then(r =>{
						if (!r) {
							s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error');
						}
						rs.allRes();
					},e => {
						console.error(e.status);
					});
			  	}
			});
		};

		s.deletRes = (id) => {
			if (typeof parseInt(id) !== 'number' ) {
				return console.error('number error');
			}

			swal({
				title: "¿Desea eliminar esta resolución?",
			  	text: "Se eliminarán todos los datos de la resolución.",
			  	icon: "warning",
			  	buttons: ["Cancelar","Aceptar"],
			  	dangerMode: true,
			}).then( (mark) => {
			  	if (mark) {
					Rcet.delRes(gbl, id).then(r => {
					switch (r) {
						case 0 : s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error'); break;
						case 1 : s.sweetMsj('Resolución eliminada correctamente.','','success'); rs.allRes(); break;
						case 2 : s.sweetMsj('¡Ooops error!','Archivos no eliminados, porfavor reportelo.','error'); break;
						default: s.sweetMsj('¡No se puede eliminar!','La resolución influye en M.CONTROL, porfavor revise.','info'); break;
					}
					},e => {
						console.error(e.status);
					});
			  	}
			});
		};

		rs.delFil = (id) => {
			if (typeof parseInt(id) !== 'number' ) {
				return console.error('number error');
			}

			swal({
				title: "¿Desea eliminar los archivos?",
			  	text: "Se eliminarán todos los archivos de esta resolución.",
			  	icon: "warning",
			  	buttons: ["Cancelar","Aceptar"],
			  	dangerMode: true,
			}).then( (mark) => {
			  	if (mark) {
					Rcet.delFil(gbl, id).then(r => {
					switch (r) {
						case 0 : s.sweetMsj('¡Ooops error!','La acción no se puede realizar, porfavor reportelo.','error'); break;
						case 1 : s.sweetMsj('Archivos eliminados correctamente.','','success'); rs.filDat = []; break;
						case 2 : s.sweetMsj('¡Ooops error!','Archivos no eliminados, porfavor reportelo.','error'); break;
						default: s.sweetMsj('¡No se puede eliminar!','No contiene archivos, porfavor revise.','info'); break;
					}
					},e => {
						console.error(e.status);
					});
			  	}
			});
		};

		s.goToPag = (pag = 1) => {
			if (s.number == 1 && (s.paramRes === null || s.paramRes === undefined || s.paramRes == '')) {
				getRes(true, s.paramRes, s.number, pag, false);
			}else if (s.paramRes !== undefined && s.paramRes !== '' && s.paramRes !== null) {
				getRes(true, s.paramRes, s.number, pag, false);
			}else{
				getRes(false, null, null, pag, false);
			}
		};

	}]).factory('resGet.Srv', ['$http', function(h){
		const getAll = (uri, flag = false, prm = null, num = null, p, pp = 10) => {
			let url;
			url = `OP=LIS&PAG=${p}&PPAG=${pp}`;
			
			if (flag) {
				url = `OP=PRM&PAG=${p}&PPAG=${pp}&PAR=${num}&STR=${prm}`;
			}
			return h.get(`../controller/AjaxResCtrl/Ajax.ResMod.php?${url}&MOD=${uri}`).then(res => {
				return res.data;
			}).catch(err => {
				console.error(err.status);
			});
		};

		return {getAll : getAll};

	}]).factory('resGet.Fac', ['$http', function(h){

		return {
			getResId: (uri, id) => {
				return h.get(`../controller/AjaxResCtrl/Ajax.ResMod.php?OP=IDX&ID=${id}&MOD=${uri}`).then(res => {
					return res.data;
				}).catch( err => {
					console.error(err.status);
				});
			}
		};
	}]).factory('resCet.Fac', ['$http', function(h){

		return {
			delFil: (uri, id) => {
				return h.delete(`../controller/AjaxResCtrl/Ajax.ResMod.php?OP=FIL&ID=${id}&MOD=${uri}`).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			delRes: (uri, id) => {
				return h.delete(`../controller/AjaxResCtrl/Ajax.ResMod.php?OP=RES&ID=${id}&MOD=${uri}`).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			chgRes: (dat) => {
				return h.put('../controller/AjaxResCtrl/Ajax.ResApp.php',dat).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			
		};
	}]);

})(angular);