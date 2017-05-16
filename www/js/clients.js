var config = {
    apiKey: "AIzaSyBpMMTAyvGJ6fSaTOdGN6n8BE44TfKwOpU",
    authDomain: "altoweb-160020.firebaseapp.com",
    databaseURL: "https://altoweb-160020.firebaseio.com",
    projectId: "altoweb-160020",
    storageBucket: "altoweb-160020.appspot.com",
    messagingSenderId: "602851408086"
};
firebase.initializeApp(config);

function initApp() {
    firebase.database().ref('/clientes/').once('value').then(function(snapshot) {
    	var obj=[];
    	obj=snapshot.val();
	  	var arr  = Object.keys(obj).map(function (key) { return obj[key]; });
	  	arr.sort(function(a, b){return a.prioridad - b.prioridad});
	  	printClients(arr);
	});
}

function printClients(arr){
    var goingToPrint=" ";
    for(var i=0; i<arr.length; i++){
    	goingToPrint=goingToPrint+'<div class="container">';
    	goingToPrint=goingToPrint+'<div class="row">';
    	goingToPrint=goingToPrint+'<div class="column width-6">';
    	goingToPrint=goingToPrint+'<div class="column width-6">';
    	goingToPrint=goingToPrint+'<img src="'+arr[i].logo+'" width="50%">';//---
    	goingToPrint=goingToPrint+'</div>';
    	goingToPrint=goingToPrint+'<div class="column width-6 ">';
    	goingToPrint=goingToPrint+'<h1 class="mb-5 titulo">'+arr[i].cliente+'</h1>';//---
    	goingToPrint=goingToPrint+'</div></div></div>';
    	goingToPrint=goingToPrint+'<div class="row">';
    	goingToPrint=goingToPrint+'<h2>'+arr[i].proyecto+'</h2>';//-----
    	goingToPrint=goingToPrint+'<div class="">';
    	goingToPrint=goingToPrint+'<h3>'+arr[i].fecha+'</h3></div>';//----
    	goingToPrint=goingToPrint+'<hr class="divisor">';
    	goingToPrint=goingToPrint+'<h4>'+arr[i].descripcion+'</h4>';//----
    	goingToPrint=goingToPrint+'</div><div class="row">Links</div>';
    	if (arr[i].linkios!="NA") {
    	    goingToPrint=goingToPrint+'<div class="row">IOS: '+arr[i].linkios+'</div>';//----
    	}
    	if (arr[i].linkandroid!="NA") {
    	    goingToPrint=goingToPrint+'<div class="row">Android: '+arr[i].linkandroid+'</div>';//----
    	}
    	if (arr[i].linkdesktop!="NA") {
    	    goingToPrint=goingToPrint+'<div class="row">PC: '+arr[i].linkdesktop+'</div>';//----
    	}
    	
    	
    	goingToPrint=goingToPrint+'</div>';
    	goingToPrint=goingToPrint+'<br><hr class="divisor">';
    }
    
    /*
        <div class="container">
        <div class="row">
          <div class="column width-6">
            <div class="column width-6">
              <img src="images/microsoft.jpg" width="100%">
            </div>
            <div class="column width-6 ">
              <h1 class="mb-5 titulo">Microsoft</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <h2>Proyecto</h2>
          <div class="">
            <h3>Fecha</h3>
          </div>
          <hr class="divisor">
          <h4>Es la descripción del proyecto</h4>
        </div>
        <div class="row">
          Link
        </div>
        <div class="row">
          iOS
        </div>
        <div class="row">
          Android
        </div>
        <div class="row">
          web
        </div>
      </div>
      <br>
      <hr class="divisor">
    */
    
    
  	document.getElementById('cliente').innerHTML=goingToPrint;
}

window.onload = function() {
    initApp();
};