var config = {
    apiKey: "AIzaSyBpMMTAyvGJ6fSaTOdGN6n8BE44TfKwOpU",
    authDomain: "altoweb-160020.firebaseapp.com",
    databaseURL: "https://altoweb-160020.firebaseio.com",
    projectId: "altoweb-160020",
    storageBucket: "altoweb-160020.appspot.com",
    messagingSenderId: "602851408086"
};
firebase.initializeApp(config);

//Funcion que ayuda a cargar las noticias, las guarda en arr
function initApp() {
    firebase.database().ref('/news/').once('value').then(function(snapshot) {
    	var obj=[];
    	obj=snapshot.val();
	  	var arr  = Object.keys(obj).map(function (key) { return obj[key]; });
	  	arr.sort(function(a, b){return new Date(b.fecha) - new Date(a.fecha);});
	  	console.log(arr);
	  	printNoticias(arr);
	});
}
//Funcion que imprime las noticias, modifica el inner html y se itera en el snapshot obtenido
function printNoticias(arr){
    var goingToPrint=" ";
    for(var i=0; i<arr.length; i++){
    	goingToPrint=goingToPrint+'<div class="container"><div class="row"><h4>'+arr[i].titulo+'</h4><div class=""><h3>'+arr[i].fecha+'</h3></div><hr class="divisor"><h7>'+arr[i].descripcion+'</h7></div></div><br><hr class="divisor"><br>';
    	
    }
    
    /*
        <div class="container">
        <div class="row">
              <h4>Nombre de la noticia</h4>
              <div class="">
                <h3>Fecha de la noticia</h3>
              </div>
              <hr class="divisor">
              <h7>Descripcion noticia</h7>
            </div>
          </div>
          <br>
          <hr class="divisor">
          <br>
    */
    
    
  	document.getElementById('noticias').innerHTML=goingToPrint;
}

//Se llama a esta funcion para iniciar todo
window.onload = function() {
    initApp();
};