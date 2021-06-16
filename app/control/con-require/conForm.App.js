(function(a) {	
	'use strict';

	a.module('conForm_App', []).constant('conFormPtrn', ['[0-9]{1,5}'])
	.controller('conForm_Ctrl', ['$scope','$rootScope','conFormPtrn','iniGet.Srv','conSet.Fac', function(s, rs, ptrn, Cini, Cset){
		//console.log('CONTROL FORM');
    	s.conFormPtrn = ptrn;

    	rs.select_p = (id) => {
    		let per = s.arrPers.filter( e => e.id_personal == id);
    		s.employe = '';
    		s.selected_0.value = per[0].persona;
    		s.selected_0.id = per[0].id_personal;
    	};

    	s.selected_0 = {
    		value:'Seleccione encargado',
    		id : ''
    	};
    	s.selectEmp = (per) => {
    		s.employe = '';
    		s.selected_0.value = per.persona; 
    		s.selected_0.id = per.id_personal;
    	};
    	s.cleanEmp = () => {
    		s.selected_0.value = 'Seleccione encargado';
    		s.selected_0.id = '';
    	};

		Cini.then(r => {
			s.arrPers = r.pers;
			s.arrArea = r.area;
		},e => {
			console.error(e.status);
		});

		rs.arrResCon = [];
		rs.addRes = (res) => {
			if (res.estado == 0) {
				return s.sweetMsj('¡Ooops error!','Resolucion inactiva, porfavor revise.');
			}
			rs.arrResCon.some( e => (e.id_resolucion == res.id_resolucion))
				? s.sweetMsj('¡Ooops Resolución!','La resolución ya existe en la lista, porfavor revise.') 
				: rs.arrResCon.push(res); s.outRes();		
		};

		rs.remRes = (key) => {
			rs.arrResCon.splice(key, 1);
		};

		const sendCon = (nObj) => {
			const data = nObj[0];
			const flag = nObj[1];
			s.load_con = true;
			
			switch (flag) {
				case null:
					let arr = rs.arrResCon.map( e => e.id_resolucion);					
					
					Cset.pstCon({data, arr}).then(r => {
						s.load_con = false;
						r ? ( s.alertMsj('Entrega registrada',' correctamente.'), s.cleanCon() ) : 
							  s.sweetMsj('¡Ooops error!','No se pudo registrar la entrega, porfavor reportelo.','error');
					},e => {
						console.error(e.status);
					});
				break;
				
				default:
					Cset.putCon({data, id:flag}).then(r => {
						s.load_con = false;
						r ? ( s.alertMsj('Entrega actualizada',' correctamente.'), s.cleanCon(true), rs.allCon() ) : 
							  s.sweetMsj('¡Ooops error!','No se pudo actualizar la entrega, porfavor reportelo.','error');
					},e => {
						console.error(e.status);
					});
				break;
			}
		};

		const parObj = (objData) => {
    		let c_p = s.selected_0.id.length == 0 ? undefined : s.selected_0.id;
    		let c_a = objData.area === undefined ? undefined : objData.area;

    		objData.folios = objData.folios === '' ? undefined : objData.folios;
    		objData.f_entrega = objData.f_entrega === undefined ? null : objData.f_entrega;
    		return {employe:c_p, area:c_a, ...objData};
    	};

		s.saveCon = (obj, idCon = null) => {
			const parData = parObj(obj);
			s.valFrmCon = true;
			for (let prop in parData) {
				if (parData.hasOwnProperty(prop)) {
					if(parData[prop] === undefined){
						return s.focusInput(prop);
					}
				}else{
					return console.error('dont exist key');
				}	
			}

			if (idCon == null && rs.arrResCon.length == 0) {
				return s.sweetMsj('¡Ooops Resolución!','Agregue elementos a la entrega, porfavor revise.');
			}
			sendCon([parData,idCon]);		
		};

		s.cleanCon = (mdlCon = false) => {
			s.valFrmCon = false;

			if (mdlCon) {
				s.idEdit.idCon = null;
				$('#con_edit_modal').modal('hide');
				s.focusInput('find_con');
			}else{
				s.focusInput('employe');
				rs.arrResCon = []; //root vaiable 
			}

			s.cleanEmp();
			s.frmCon.folios = '';
			s.frmCon.area = undefined;
			s.frmCon.f_entrega = undefined;
		};

	}]).factory('iniGet.Srv', ['$http', function(h){
		return h.get('../controller/AjaxConCtrl/Ajax.ConApp.php?OP=PER').then(res => {
			return res.data;
		}).catch(err => {
			console.error(err.status);
		});
	}]).factory('conSet.Fac', ['$http', function(h){
		return {
			pstCon:(data) => {
				return h.post('../controller/AjaxConCtrl/Ajax.ConMod.php', data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			putCon:(data) => {
				return h.put('../controller/AjaxConCtrl/Ajax.ConMod.php?OP=UPD',data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);