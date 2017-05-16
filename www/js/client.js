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

//Funcion que
  function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('/clientes/'+getID()+'/').once('value').then(function(snapshot) {
          document.getElementById('name').value=snapshot.val().cliente;
          document.getElementById('project').value=snapshot.val().proyecto;
          document.getElementById('date').value=snapshot.val().fecha;
          document.getElementById('linkandroid').value=snapshot.val().linkandroid;
          document.getElementById('linkios').value=snapshot.val().linkios;
          document.getElementById('linkdesktop').value=snapshot.val().linkdesktop;
          document.getElementById('priority').value=snapshot.val().prioridad;
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
//Borra al cliente si se quiere
  function dD(){
    if (confirm("¿Estas seguro de borrar a este cliente?") == true) {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('clientes/' + getID()).set(
          null
        );
        window.location='clients.html';
    }
  }

//Guarda la informacion en la db
  function saveData(){
    var name=document.getElementById('name').value;
    var project=document.getElementById('project').value;
    var date=document.getElementById('date').value;
    var linkandroid=document.getElementById('linkandroid').value;
    var linkios=document.getElementById('linkios').value;
    var linkdesktop=document.getElementById('linkdesktop').value;
    var priority=document.getElementById('priority').value;
    var description=document.getElementById('description').value;
    firebase.database().ref('clientes/' + getID()).update({
      cliente : name,
      proyecto : project,
      fecha : date,
      linkandroid : linkandroid,
      linkios : linkios,
      linkdesktop : linkdesktop,
      prioridad : priority,
      descripcion : description
    });
    uploadPicture();
  }
//Metodo para subir una imagen
  function uploadPicture(){
    if(newImg){
      var file=img.files[0];
      console.log(file.name);
      var storageRef=firebase.storage().ref('clientes/'+file.name);
      var task = storageRef.put(file);
      task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {

      }, function(error) {
    }, function() {
      // Upload completed successfully, now we can get the download URL
      var downloadURL = task.snapshot.downloadURL;
      console.log(downloadURL);
      firebase.database().ref('clientes/' + getID()).update({
        logo : downloadURL
      });
      window.location='clients.html';
    });

    }
    else{
      console.log("no se selecciono ni una imagen");
      window.location='clients.html';
    }



  }

//Metodo que lee la url
  function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah')
                    .attr('src', e.target.result)
                    .height(75);
                    img=input;
                    console.log(img);
                    newImg=true;
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

  window.onload = function() {
    initApp();
  };
