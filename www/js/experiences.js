var config = {
    apiKey: "AIzaSyBpMMTAyvGJ6fSaTOdGN6n8BE44TfKwOpU",
    authDomain: "altoweb-160020.firebaseapp.com",
    databaseURL: "https://altoweb-160020.firebaseio.com",
    projectId: "altoweb-160020",
    storageBucket: "altoweb-160020.appspot.com",
    messagingSenderId: "602851408086"
};
firebase.initializeApp(config);

//Funcion que accede a firebase y consigue el snapshot de las API's
function initApp() {
    firebase.database().ref('/tecnologias/').once('value').then(function(snapshot) {
    	var obj=[];
    	obj=snapshot.val();
	  	var arr  = Object.keys(obj).map(function (key) { return obj[key]; });
	  	arr.sort(function(a, b){return a.prioridad - b.prioridad});
	  	printAPI(arr);
	});
}
//Aqui se imprime el arreglo de arriba
function printAPI(arr){
    var goingToPrint=" ";
    for(var i=0; i<arr.length; i++){
        //Se pegan en el string lo que se va a usar en el html
    	goingToPrint=goingToPrint+'<div class="container">';
    	goingToPrint=goingToPrint+'<div class="row">';
    	goingToPrint=goingToPrint+'<div class="column width-3">';
    	goingToPrint=goingToPrint+'<img src="'+arr[i].logo+'" width="100%">';//---
    	goingToPrint=goingToPrint+'</div>';
    	goingToPrint=goingToPrint+'<div class="column width-9 " >';
    	goingToPrint=goingToPrint+'<h1 class="mb-5" >'+arr[i].tecnologia+'</h1>';//---
    	goingToPrint=goingToPrint+'</div></div>';
    	goingToPrint=goingToPrint+'<div class="row">';
    	goingToPrint=goingToPrint+'<hr class="divisor">';
    	goingToPrint=goingToPrint+'<h4>'+arr[i].descripcion+'</h4>';//----
    	goingToPrint=goingToPrint+'</div>';
    	goingToPrint=goingToPrint+'</div>';
    	goingToPrint=goingToPrint+'<br><hr class="divisor">';
    }
    //Se pone como es el html para tener una mejor idea
    /*
        <div class="container">
        <div class="row">
            <div class="column width-3">
              <img src="images/microsoft.jpg" width="100%">
            </div>
            <div class="column width-9 ">
              <h1 class="mb-5 titulo">Microsoft</h1>
            </div>
        </div>
        <div class="row">
          <hr class="divisor">
          <h4>Es la descripción del proyecto</h4>
        </div>
      </div>
      <br>
      <hr class="divisor">
    */
    
    //Se pone el inner html
  	document.getElementById('cliente').innerHTML=goingToPrint;
}
//Se inicia
window.onload = function() {
    initApp();
};