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
  var img;
  var newImg=false;

  function singout(){
    firebase.auth().signOut();
    //window.location='index.html';
  }


  function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('/news/'+getID()+'/').once('value').then(function(snapshot) {
          document.getElementById('title').value=snapshot.val().titulo;
          document.getElementById('notice').value=snapshot.val().noticia;
          document.getElementById('date').value=snapshot.val().fecha;
          document.getElementById('description').value=snapshot.val().descripcion;
          $('#blah').attr('src', snapshot.val().logo).height(75);
		  });
      } else {
        console.log("no usuario");
        window.location='dashboard.html';
      }
    });
  }

  function getID(){
   var query = location.search.substr(1);
   var result = {};
   query.split("&").forEach(function(part) {
   var item = part.split("=");
   result[item[0]] = decodeURIComponent(item[1]);
   });
   console.log(result.id);
   return result.id;
  }

  function dD(){
    if (confirm("¿Estas seguro de borrar a este noticia?") == true) {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('news/' + getID()).set(
          null
        );
        window.location='news.html';
    }
  }


  function saveData(){
    var titulo=document.getElementById('title').value;
    var noticia=document.getElementById('notice').value;
    var date=document.getElementById('date').value;
    var description=document.getElementById('description').value;
    firebase.database().ref('news/' + getID()).update({
      titulo : titulo,
      noticia : noticia,
      fecha : date,
      descripcion : description
    });

    window.location='news.html';
  }


  window.onload = function() {
    initApp();
  };
