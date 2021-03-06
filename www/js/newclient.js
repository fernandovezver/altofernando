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
    var name=document.getElementById('name').value;
    var project=document.getElementById('project').value;
    var date=document.getElementById('date').value;
    var linkandroid=document.getElementById('linkandroid').value;
    var linkios=document.getElementById('linkios').value;
    var linkdesktop=document.getElementById('linkdesktop').value;
    var priority=document.getElementById('priority').value;
    var description=document.getElementById('description').value;
    var newId=name+project+date;
    firebase.database().ref('clientes/' + newId).set({
      id : newId,
      cliente : name,
      proyecto : project,
      fecha : date,
      linkandroid : linkandroid,
      linkios : linkios,
      linkdesktop : linkdesktop,
      prioridad : priority,
      descripcion : description,
      logo : ""
    });

    //window.location='clients.html';
    uploadPicture(newId);
  }

  function uploadPicture(id){
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
      firebase.database().ref('clientes/' + id).update({
        logo : downloadURL
      });
        window.location='clients.html';
    });

    }
    else{
      var url='https://firebasestorage.googleapis.com/v0/b/altoweb-160020.appspot.com/o/clientes%2Faltolg.png?alt=media&token=80099f22-259e-46f4-99ed-3946f0180976';
      var gurl="";
      firebase.database().ref('clientes/' + id).update({
        logo : url
      });
      window.location='clients.html';

      console.log("no se selecciono ni una imagen");

    }
  }

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
