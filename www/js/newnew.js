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
        firebase.database().ref('/clientes/').once('value').then(function(snapshot) {

        });
      } else {
        console.log("no usuario");
        window.location='dashboard.html';
      }
    });
  }

  function saveData(){
    var titulo=document.getElementById('title').value;
    var noticia=document.getElementById('notice').value;
    var date=document.getElementById('date').value;
    var description=document.getElementById('description').value;
    var newId=titulo+noticia+date;
    firebase.database().ref('news/' + newId).set({
      id : newId,
      titulo : titulo,
      noticia : noticia,
      fecha : date,
      descripcion : description
    });

    window.location='news.html';
    //uploadPicture(newId);
  }


  window.onload = function() {
    var date=new Date();
    var month='0'+date.getMonth();
    var day='0'+date.getDate();
    if(date.getMonth()<10){
      month='0'+date.getMonth();
    }
    if(date.getDate()<10){
      day='0'+date.getDate();
    }
    document.getElementById('date').value=date.getFullYear()+"-"+month+"-"+day;

    initApp();

  };
