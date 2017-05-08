// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBpMMTAyvGJ6fSaTOdGN6n8BE44TfKwOpU",
    authDomain: "altoweb-160020.firebaseapp.com",
    databaseURL: "https://altoweb-160020.firebaseio.com",
    projectId: "altoweb-160020",
    storageBucket: "altoweb-160020.appspot.com",
    messagingSenderId: "602851408086"
  };
  firebase.initializeApp(config);


  function singout(){
    firebase.auth().signOut();
    //window.location='index.html';
  }


  function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('/clientes/').once('value').then(function(snapshot) {
        	var obj=[];
        	obj=snapshot.val();
		  	var arr  = Object.keys(obj).map(function (key) { return obj[key]; });
		  	arr.sort(function(a, b){return a.prioridad - b.prioridad});
          	printButtons(arr);
		});
      } else {
        console.log("no usuario");
        window.location='index.html';
      }
    });
  }
  
  function printButtons(arr){
  	var goingToPrint="";
  	for(var i=0; i<arr.length; i++){
  		var p="'client.html?id="+arr[i].id+"'";
  		goingToPrint=goingToPrint+'<tr><td>'+arr[i].cliente+'</td><td>'+arr[i].proyecto+'</td><td>'+arr[i].fecha+'</td><td>'+arr[i].prioridad+'</td><td><i class="pe-7s-config" onclick="window.location=('+ p +');"></i></td></tr>';
  	}
  	/*
  	<tr>
		<th>Cliente</th>
		<th>Proyecto</th>
		<th>Fecha</th>
		<th>Prioridad</th>
	</tr>
  	*/
  	document.getElementById('clients').innerHTML=goingToPrint;
  }

  window.onload = function() {
    initApp();
  };