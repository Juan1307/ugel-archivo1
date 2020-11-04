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
	}).controller('resForm_Ctrl', ['$scope','$rootScope','resFormPtrn','iniGet.Srv','resUsuSet.Fac','resInsSet.Fac', function(s, rs, ptrn, Rini, RUset, RIset){

		s.resFormPtrn = ptrn;

    	s.selected = {};
		Rini.then( r => {
			s.arrMotiv = r.moti;
			s.arrArea = r.area;
    	}, e => {
    		console.error(e.status);
    	});
    	
    	const sendRes = (nObj) => {
    		const frmData = nObj[0];

			const data = nObj[1];
			const fils = nObj[2];
			const flag = nObj[3];

			let fd = new FormData();
			if (fils !== undefined) {
				for(let i = 0; i < fils.length; i++){
					fd.append(`file ${i}`,fils[i]);
				}
			}
			s.load_res = true;
    		let arr;

			switch (rs.module) {
				case 'USU':

					switch (flag) {
						case null:
							arr = rs.detData.map( e => e.id_usuario);
							console.log('USU INSERT',arr);					
							fd.append('data',JSON.stringify({data,arr}));

							RUset.pstRes(fd).then( r => {
								console.log('res pst', r);
    							s.load_res = false;
							},e =>{
								console.error(e.status);
							});
						break;

						default:
							console.log('USU INSERT',arr);
							fd.append('data',JSON.stringify({data,flag}));

							RUset.putRes(fd).then( r => {
								console.log('res put', r);
    							s.load_res = false;
							},e =>{
								console.error(e.status);
							});
						break;
					}

				break;
				
				case 'INS':

					switch (flag) {
						case null:
							arr = rs.detData.map( e => e.id_institucion);
							console.log('INS INSERT',arr);
							fd.append('data',JSON.stringify({data,arr}));
							
							RIset.pstRes(fd).then( r => {
								console.log('res pst', r);
    							s.load_res = false;
							},e =>{
								console.error(e.status);
							});
						break;

						default:
							console.log('INS UPDATE',arr);
							fd.append('data',JSON.stringify({data,flag}));
							
							RIset.pstRes(fd).then( r => {
								console.log('res pst', r);
    							s.load_res = false;
							},e =>{
								console.error(e.status);
							});

						break;
					}
				break;

				default: 
					s.sweetMsj('¡Ooops error!','Modulo no detectado, porfavor reportelo.','error'); s.cleanRes(frmData,data);  
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

    	s.saveRes = (arrFiles, formData, objData, idRes = null, next = false) => {
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
					sendRes([formData, parData, arrFil, idRes]);
				}
			} else {
				sendRes([formData, parData, arrFil, idRes]);
			}
		};

		s.removeFile = (key) => s.resFiles.splice(key, 1);
 
		s.cleanRes = (formData, objData, mdlRes = false) => {
			s.valFrmRes = false;
			
			if (mdlRes) {
				$('#res_edit_modal').modal('hide');
				s.focusInput('find_res');
			}else{
				s.stepView();
				rs.detData = []; //root vaiable 
			}
			
			s.resFiles = []; //de la directiva
			s.selected.value = undefined;
			for (let prop in objData) {
				if (!objData.hasOwnProperty(prop)) {
					return console.error('dont exist key');
				}else if(prop == 'res_area' || prop == 'res_fec'){
					objData[prop] = undefined;
				}else{
					objData[prop] = '';
				}
			}
		};

	}]).factory('iniGet.Srv', ['$http', function(h){
		return h.get('../controller/AjaxResCtrl/Ajax.ResApp.php').then(res => {
			return res.data;
		}).catch(err => {
			console.error(err.status);
		});

	}]).factory('resUsuSet.Fac', ['$http', function(h){
		const config = { headers:{'Content-Type': undefined},
					     transformRequest: angular.identity };
		return {
			pstRes: (data) => {
				return h.post('../controller/AjaxResCtrl/Ajax.ResUsu.php', data, config).then(res => {
					console.log('res http post', res);
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			},
			putRes: (data) =>{

			}
		};
	}]).factory('resInsSet.Fac', ['$http', function(h){
		const config = { headers:{'Content-Type': undefined},
						 transformResponse: angular.identity };

		return {
			pstRes: (data) => {

			},
			putRes: (data) =>{

			}
		};
	}]);

})(angular);