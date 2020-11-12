(function(a) {	
	'use strict';

	a.module('App.Main',[]).controller('Main_Ctrl', ['$scope', function(s){
		console.log('app main pcoded-trigger');

		let res;
		s.navLink = (li = 0, flag = false, s_flag = null) => {

			[0,1,2,3,4,5].map( ele => {
				res = `link_${ele}`;
				s[res] = (ele === li) ? 'pcoded-trigger' : '';
			});

			s.styul_0 =  false; 
			if (flag && s_flag !== null) {
				
				s.styul_0 = true;	
				[0,1,3].map( sub_ele => {
					res = `link_${li}_sub_${sub_ele}`;
					s[res] = (sub_ele === s_flag) ? 'pcoded-trigger' : '';
				});
			}

			$(".loader-bg").fadeIn("slow");
				setTimeout( () => {
					$(".loader-bg").fadeOut("slow");
			}, 800);
		};

		s.sweetMsj = (tit, txt, icon = 'warning') => swal({ title: tit,text: txt,icon: icon,button: "Aceptar!"});
		
		s.alertMsj = (tit, txt, icon = 'success') => {

			s.alertTyp = `alert-${icon}`;
			s.alertTxt = txt;
			s.alertTit = tit;
			
			$(".alert-msj").fadeIn("slow");
			setTimeout( () => {
				$(".alert-msj").fadeOut("slow");
				s.alertTyp = undefined;
				s.alertTxt = undefined;
				s.alertTit = undefined;
			}, 3000);
		};

		s.focusInput = (elem) => {
			setTimeout(() => document.getElementById(elem).focus(), 500);
		};

		let arrMer;
		let p0,p1;

		s.pagTable = (arr, pag = 1, tot, flag = true) => {

			if (flag) {
				arrMer = []; p0 = null,p1 = null;
			}

			let arr_n = [...arr];

			if (arr.length > 10) {
				let arr_v = [];

				if (pag === 5 || pag === 1) {
					p0 = true; p1 = false;
				}
				
				if (pag + 4 === tot) {
					p0 = false; p1 = true;
				}

				if (arrMer.length <= 10 && arrMer.length !== 0 && pag !== 1) {
					s.arrPag = arrMer;
				}else if ((pag - 1) % 4 === 0 && p0 && pag < (tot - 4)) {
					arr_v = arr.slice(pag - 1);

					if (arr_v.length > 10) {
						let a, b;

						a = arr_n.splice(pag - 1, 5); b = arr_n.splice(arr_n.length - 5, 5);
						
						arrMer = [...a, false, ...b];
						s.arrPag = arrMer;
					}else{
						arrMer = arr_v;
						s.arrPag = arrMer;
					}
				}else if ((tot - pag) % 4 === 0 && p1){
					arr_v = arr.slice(0, pag);

					if (arr_v.length > 10) {
						let c, d;

						d = arr_n.splice(pag - 5, 5); c = arr_n.splice(0, 5);

						arrMer = [...c, false, ...d];
						s.arrPag = arrMer;
					} else {
						arrMer = arr_v;
						s.arrPag = arrMer;
					}
				}else{
					s.arrPag = arrMer;
				}

			}else{
				s.arrPag = arr_n;
			}
		};
	}]).filter('stringCut', function () {
		return function (str, num) {
			return (str.length <= num) ? str : str.substring(0, num) + ' . . .';
		};
	}).filter('porcenCut',function () {
		return function (num, cont) {
			return Math.round(num * 100 / cont);
		};
	}).filter('dateParse',function () {
		return function (str) {
			return moment(str).format('DD[/]MM[/]YYYY');
		};
	}).filter('fileSize',function () {
		return function (siz) {
			return Math.round(siz/1024);
		};
	});

})(angular);