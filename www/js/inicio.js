var config = {
    apiKey: "AIzaSyBpMMTAyvGJ6fSaTOdGN6n8BE44TfKwOpU",
    authDomain: "altoweb-160020.firebaseapp.com",
    databaseURL: "https://altoweb-160020.firebaseio.com",
    projectId: "altoweb-160020",
    storageBucket: "altoweb-160020.appspot.com",
    messagingSenderId: "602851408086"
};
firebase.initializeApp(config);
//Funcion que nos sirve para sacar de la db lo que sea que necesitemos
function initApp() {
	//Consigue a los clientes
    firebase.database().ref('/clientes/').once('value').then(function(snapshot) {
    	var obj=[];
    	obj=snapshot.val();
	  	var arr  = Object.keys(obj).map(function (key) { return obj[key]; });
	  	arr.sort(function(a, b){return a.prioridad - b.prioridad});
	  	//Aqui imprimimos a los clientes para abajo usar el mismo arreglo
	  	printClients(arr);
	});
	//Consigue a las noticias
	firebase.database().ref('/news/').once('value').then(function(snapshot) {
    	var obj=[];
    	obj=snapshot.val();
	  	var arr  = Object.keys(obj).map(function (key) { return obj[key]; });
	  	arr.sort(function(a, b){return new Date(b.fecha) - new Date(a.fecha);});
	  	console.log(arr);
	  	//Se imprimen las noticias
	  	printNoticias(arr);
	});
	//Consigue las tecnologias
	firebase.database().ref('/tecnologias/').once('value').then(function(snapshot) {
    	var obj=[];
    	obj=snapshot.val();
	  	var arr  = Object.keys(obj).map(function (key) { return obj[key]; });
	  	arr.sort(function(a, b){return a.prioridad - b.prioridad});
	  	//Se imprimen
	  	printAPI(arr);
	});
}
//Funcion que imprime a los clientes
function printClients(arr){
    var goingToPrint="";
    if(arr.length==1){
  	  goingToPrint=goingToPrint+'<div class="column width-6"><div class="column width-6"><img src="'+arr[0].logo+'"width="150" height="150"></div><div class="column width-6"><h1 class="mb-5">'+arr[0].cliente+'</h1><h3>'+arr[0].descripcion+'</h3></div></div></div><br>';
  	}else if(arr.length==2){
  	  goingToPrint=goingToPrint+'<div class="column width-6"><div class="column width-6"><img src="'+arr[0].logo+'"width="150" height="150"></div><div class="column width-6"><h1 class="mb-5">'+arr[0].cliente+'</h1><h3>'+arr[0].descripcion+'</h3></div></div><div class="column width-6"><div class="column width-6"><img src="'+arr[1].logo+'" width="150" height="150"></div><div class="column width-4"><h1 class="mb-5">'+arr[1].cliente+'</h1><h3>'+arr[1].descripcion+'</h3></div></div></div><br>';
  	}else if(arr.length==3){
  		goingToPrint=goingToPrint+'<div class="column width-6"><div class="column width-6"><img src="'+arr[0].logo+'"width="150" height="150"></div><div class="column width-6"><h1 class="mb-5">'+arr[0].cliente+'</h1><h3>'+arr[0].descripcion+'</h3></div></div><div class="column width-6"><div class="column width-6"><img src="'+arr[1].logo+'" width="150" height="150"></div><div class="column width-4"><h1 class="mb-5">'+arr[1].cliente+'</h1><h3>'+arr[1].descripcion+'</h3></div></div></div><br>';
  		goingToPrint=goingToPrint+'<div class="column width-6"><div class="column width-6"><img src="'+arr[2].logo+'"width="150" height="150"></div><div class="column width-6"><h1 class="mb-5">'+arr[2].cliente+'</h1><h3>'+arr[2].descripcion+'</h3></div></div></div><br>';
  	}else if(arr.length>=4){
  		goingToPrint=goingToPrint+'<div class="column width-6"><div class="column width-6"><img src="'+arr[0].logo+'"width="150" height="150"></div><div class="column width-6"><h1 class="mb-5">'+arr[0].cliente+'</h1><h3>'+arr[0].descripcion+'</h3></div></div><div class="column width-6"><div class="column width-6"><img src="'+arr[1].logo+'" width="150" height="150"></div><div class="column width-4"><h1 class="mb-5">'+arr[1].cliente+'</h1><h3>'+arr[1].descripcion+'</h3></div></div></div><br>';
  		goingToPrint=goingToPrint+'<div class="column width-6"><div class="column width-6"><img src="'+arr[2].logo+'"width="150" height="150"></div><div class="column width-6"><h1 class="mb-5">'+arr[2].cliente+'</h1><h3>'+arr[2].descripcion+'</h3></div></div><div class="column width-6"><div class="column width-6"><img src="'+arr[3].logo+'" width="150" height="150"></div><div class="column width-4"><h1 class="mb-5">'+arr[3].cliente+'</h1><h3>'+arr[3].descripcion+'</h3></div></div></div><br>';
  	}else{
  	  
  	}
  	document.getElementById('clientes').innerHTML=goingToPrint;
}
//Funcion imprime hasta 3 noticias
function printNoticias(arr){
    var goingToPrint="";
    for(var i=0; i<arr.length && i<3; i++){
    	goingToPrint=goingToPrint+'<div class="row"><div class="column width-10"><h3 class="mb-5" style="color: #2294E3;">'+arr[i].titulo+'</h3><h5>'+arr[i].noticia+'</h5></div><div class="column width-2"><h5>'+arr[i].fecha+'</h5></div></div>';
    }
  	document.getElementById('noticias').innerHTML=goingToPrint;
}

//Funcion que imprime la api o las tecnologias
function printAPI(arr){
    var goingToPrint="";
    if(arr.length==1){
  	  goingToPrint=goingToPrint+'<div class="column width-6"><div class="column width-4"><img src="'+arr[0].logo+'" width="100" height="100"></div><div class="column width-8"><h3 class="mb-5" >'+arr[0].tecnologia+'</h3><h5>'+arr[0].descripcion+'</h5></div></div>';
  	}else if(arr.length>=2){
  	  goingToPrint=goingToPrint+'<div class="column width-6"><div class="column width-4"><img src="'+arr[0].logo+'" width="100" height="100"></div><div class="column width-8"><h3 class="mb-5" >'+arr[0].tecnologia+'</h3><h5>'+arr[0].descripcion+'</h5></div></div>'+'<div class="column width-6"><div class="column width-4"><img src="'+arr[1].logo+'" width="100" height="100"></div><div class="column width-8"><h3 class="mb-5" >'+arr[1].tecnologia+'</h3><h5>'+arr[1].descripcion+'</h5></div></div>';
  	}else{
  	  
  	}
    /*
    <div class="column width-6">
		<div class="column width-4">
			<img src="images/facebook.png" width="100" height="100">
		</div>
		<div class="column width-8">
			<h3 class="mb-5" >Facebook</h3>
			<h5>Bla bla bla</h5>
			<p style="color:#4AC5DE;">See more</p>
		</div>
	</div>
	<div class="column width-6">
		<div class="column width-4">
			<img src="images/gcloud.png" width="100" height="100">
		</div>
		<div class="column width-8">
			<h3 class="mb-5" >Google cloud</h3>
			<h5>Bla bla bla</h5>
			<p style="color:#4AC5DE;">See more</p>
		</div>
	</div>
    */
    
  	document.getElementById('tecnologias').innerHTML=goingToPrint;
}
  
  
window.onload = function() {
    initApp();
};