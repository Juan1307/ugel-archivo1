(function(a) {	
	'use strict';

	a.module('ofimot_App', []).constant('OfMoPtrn', '[0-9a-zA-ZáéíóúñÑÁÉÍÓÚ°/# -]{2,70}')
	.controller('ofimot_Ctrl', ['$scope','OfMoPtrn','OfiMot.Srv','OfitMot.Set', function(s, ptrn, Oget, Oset){
		console.log('MODULO OFICINA-MOTIVO');
		s.navLink(6);
		s.OfMoPtrn = ptrn; 
		s.focusInput('oficina');

		const gArea = () => {
			Oget.getArea().then(r =>{
				s.datArea = r;
			},e =>{
				console.error(e.status);
			});
		};

		const gMoti = () => {
			Oget.getMotivo().then(r =>{
				s.datMoti = r;
			},e =>{
				console.error(e.status);
			});
		};
		gArea(); gMoti();
		s.module = null;

		const sendOfMo = (data) => {
			const flag = data[2];
			switch (flag) {
				case null:
					console.log('posteo');
					Oset.pstOfMo([data[0],data[1]]).then(r => {
						if (r) {
							s.alertMsj('Dato registrado','correctamnete');
							switch (data[1]) {
							 	case 'A': s.cleanOfMo('A'); gArea(); break;
							 	default: s.cleanOfMo('M'); gMoti();  break;
							 }
						}else {
							s.sweetMsj('¡Ooops error!','No se pudo registrar el dato, porfavor reportelo.','error');
						}
					},e =>{
						console.log(e.status);
					});

				break;
				default:
					console.log('actualizacion');
					Oset.putOfMo(data).then(r =>{
						if (r) {
							s.alertMsj('Dato actualizado','correctamnete');
							switch (data[1]) {
							 	case 'A': s.cleanOfMo('A'); gArea(); break;
							 	default: s.cleanOfMo('M'); gMoti();  break;
							 }
						}else {
							s.sweetMsj('¡Ooops error!','No se pudo actualizar el dato, porfavor reportelo.','error');
						}
					},e =>{
						console.error(e.status);
					});
				break;
			}
		};

		const verOfMo = (data) => {
			Oset.verOfMo(data).then( r => {
				if (r) {
					return s.sweetMsj('Ooops ya existe','El dato ingresado ya existe. porfavor revise');
				}else{
					sendOfMo(data);
				}
			},e => {
				console.error(e.status);
			});
		};

		s.saveOfMo = (str, mod, idx = null) => {
			let fc = (mod === 'M') ? 'motivo' : 'oficina';
				str = str == '' ? undefined : str;
			
			if (str === undefined && mod === 'A') {
				s.valOM_0 = true;
				return s.focusInput(fc);
			}
			if (str === undefined && mod === 'M') {
				s.valOM_1 = true;
				return s.focusInput(fc);
			}
			let data = [str, mod, idx];
			verOfMo(data);
		};

		s.getOfMo = (id,mod) => {
			if (typeof parseInt(id) !== "number") {
				return console.error('number error');
			}
			Oget.getData(id,mod).then(r => {
				console.log('res',r);
				s.module = mod;
				if (mod === 'A') {
					s.oficina = r.nombre;
					s.id_edit = r.id_area;
					s.focusInput('oficina');
				}else{
					s.motivo = r.descripcion;
					s.id_edit = r.id_motivo;
					s.focusInput('motivo');
				}
			},e => {
				console.error(e.status);
			});
		};

		s.cleanOfMo = (mod) => {
			if (mod == 'A') {
				s.valOM_0 = false;
				s.oficina = '';
				s.focusInput('oficina');
			}else{
				s.valOM_1 = false;
				s.motivo = '';
				s.focusInput('motivo');
			}
			s.module = null;
			s.id_edit = null; 
		};

	}]).factory('OfiMot.Srv', ['$http', function(h){
		return {
			getArea:() => {
				return h.get('../controller/Ajax.AreMot.php?OP=LIS&MOD=A').then( res => {
					return res.data;
				}).catch( err => {
					console.error(err.status);
				});
			},
			getMotivo:() => {
				return h.get('../controller/Ajax.AreMot.php?OP=LIS&MOD=M').then( res => {
					return res.data;
				}).catch( err => {
					console.error(err.status);
				});
			},
			getData:(id, m) => {
				return h.get(`../controller/Ajax.AreMot.php?OP=IDX&ID=${id}&MOD=${m}`).then(res => {
					return res.data;
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]).factory('OfitMot.Set', ['$http', function(h){
		return {
			verOfMo:(str) => {
				return h.put(`../controller/Ajax.AreMot.php?OP=VER`,str).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			pstOfMo:(data) => {
				return h.post(`../controller/Ajax.AreMot.php`,data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			},
			putOfMo:(data) => {
				return h.put(`../controller/Ajax.AreMot.php?OP=UPD`,data).then(res => {
					return JSON.parse(res.data);
				}).catch(err => {
					console.error(err.status);
				});
			}
		};
	}]);

})(angular);