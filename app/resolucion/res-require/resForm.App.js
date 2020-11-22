(function(a) {	
	'use strict';

	a.module('resForm_App', ['ngSanitize','ui.select']).constant('resFormPtrn', ['[0-9]{3,5}'])
	 .directive("selectNgFiles", function() {
	  	return {
		    require: "ngModel",
		    link: function getFile(scope, elem, attrs, ngModel) {
		      elem.on("change", (e) => {
		        let files = elem[0].files;
		        if (files.length > 3) {
		        	scope.sweetMsj('¡Ooops error!','Supero el limite de 3 archivos, porfavor revise.','error');
		        }else{
		        	ngModel.$setViewValue(Object.values(files));
		        }
		      });
		    }
	  };
	}).controller('resForm_Ctrl', ['$scope','$rootScope','resFormPtrn','iniGet.Srv','resSet.Fac', function(s, rs, ptrn, Rini, Rset){

		s.resFormPtrn = ptrn;
    	s.selected = {};
    	
    	rs.select_m = (id) => {
    		let mot = s.arrMotiv.filter( e => e.id_motivo == id);
    		s.selected.value = mot[0];
    	};

		Rini.then( r => {
			s.arrMotiv = r.moti;
			s.arrArea = r.area;
    	}, e => {
    		console.error(e.status);
    	});
    	
    	const sendRes = (nObj) => {
    		console.log('nobj', nObj);

			const data = nObj[0];
			const fils = nObj[1];
			const flag = nObj[2];

			let fd = new FormData();
			if (fils !== undefined) {
				for(let i = 0; i < fils.length; i++){
					fd.append(`file ${i}`,fils[i]);
				}
			}
			let arr;
			s.load_res = true; 

			switch (rs.module) {
				case 'USU':

					switch (flag) {
						case null:
							arr = rs.detData.map( e => e.id_usuario); fd.append('data',JSON.stringify({data,arr}));

							Rset.pstRes(fd,'Usu').then( r => {
								//console.log('send post', r);
								s.load_res = false;
								r ? ( s.alertMsj('Resolución registrada',' correctamente.'), s.cleanRes() ) : 
							 	s.sweetMsj('¡Ooops error!','No se pudo registrar la resolución, porfavor reportelo.','error');
							},e =>{
								console.error(e.status);
							});
						break;

						default:
							fd.append('data',JSON.stringify({data, id: flag}));

							Rset.putRes(fd,'Usu').then( r => {
								//console.log('send put', r);
    							s.load_res = false;
								r ? ( s.alertMsj('Resolución actualizada',' correctamente.'), s.cleanRes(true), rs.allRes() ) : 
							 	s.sweetMsj('¡Ooops error!','No se pudo actualizar la resolución, porfavor reportelo.','error');
							},e =>{
								console.error(e.status);
							});
						break;
					}

				break;
				
				case 'INS':

					switch (flag) {
						case null:
							console.log('INS INSERT',arr);
							arr = rs.detData.map( e => e.id_institucion); fd.append('data',JSON.stringify({data,arr}));
							
							Rset.pstRes(fd,'Insti').then( r => {
								console.log('res pst', r);
    							s.load_res = false;
							},e =>{
								console.error(e.status);
							});
						break;

						default:
							console.log('INS UPDATE');
							fd.append('data',{data,flag});
							
							Rset.pstRes(fd,'Insti').then( r => {
								console.log('res put', r);
    							s.load_res = false;
							},e =>{
								console.error(e.status);
							});

						break;
					}
				break;

				default: 
					s.sweetMsj('¡Ooops error!','Modulo no detectado, porfavor reportelo.','error'); s.cleanRes();  
				break;
			}
    	};

    	const parObj = (objData) => {

    		let r_m = s.selected.value === undefined ? undefined : s.selected.value.id_motivo;
    		let r_a = objData.res_area === undefined ? undefined : objData.res_area;

    		objData.nro_res = objData.nro_res === '' ? undefined : objData.nro_res;
			objData.nro_pro = objData.nro_pro === '' ? undefined : objData.nro_pro;
    		objData.res_fec = objData.res_fec === null ? undefined : objData.res_fec;

    		return {...objData, res_moti:r_m, res_area:r_a};
    	};

    	s.saveRes = (arrFiles, objData, idRes = null, next = false) => {
			//console.log('obj', objData);	
			s.valFrmRes = true;
    		const parData = parObj(objData);

			for (let prop in parData) {
				if (parData.hasOwnProperty(prop)) {
					if ( (prop === 'nro_res' || prop === 'nro_pro') && parData[prop] === undefined) {
						return s.focusInput(prop);
					}else if(parData[prop] === undefined){
						return s.focusInput(prop);
					}
				}else{
					return console.error('dont exist key');
				}
			}

			const arrFil = (arrFiles === undefined || arrFiles.length === 0) ? undefined : arrFiles;

			if (idRes === null && !next) {
				s.stepView(false,'find_user');
			} else if (idRes === null && next) {
				if (rs.detData.length <= 0) {
					s.sweetMsj('¡Ooops Info!','Debe asignar 1 o más datos a la lista, porfavor asigne.');
				} else {
					sendRes([parData, arrFil, idRes]);
				}
			} else {
				sendRes([parData, arrFil, idRes]);
			}
		};

		s.removeFile = (key) => s.resFiles.splice(key, 1);
 
		s.cleanRes = (mdlRes = false) => {
			s.valFrmRes = false;

			if (mdlRes) {
				rs.filDat = [];
				$('#res_edit_modal').modal('hide');
				s.focusInput('find_res');
			}else{
				s.stepView();
				rs.detData = []; //root vaiable 
			}

			s.resFiles = []; //de la directiva
			s.selected.value = undefined;

			s.frmResDat.nro_pro = '';
			s.frmResDat.nro_res = '';
			s.frmResDat.res_area = undefined;
			s.frmResDat.res_fec = null;
		};

	}]).factory('iniGet.Srv', ['$http', function(h){
		return h.get('../controller/AjaxResCtrl/Ajax.ResApp.php').then(res => {
			return res.data;
		}).catch(err => {
			console.error(err.status);
		});

	}]).factory('resSet.Fac', ['$http', function(h){
		const config = { headers:{'Content-Type': undefined},
					     transformRequest: angular.identity };
		return {
			pstRes: (data, uri) => {
				return h.post(`../controller/AjaxResCtrl/Ajax.Res${uri}.php?OP=PST`, data, config).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			putRes: (data, uri) =>{
				return h.post(`../controller/AjaxResCtrl/Ajax.Res${uri}.php?OP=PUT`, data, config).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);