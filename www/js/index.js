var ref = firebase.database().ref("Doctores");
var doctores = [];
var mails = [];
var ids = [];
var docMail;
ref.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.child("NDoc").val();
      var mails1 = childSnapshot.child("Mail").val();
      var ids1 = childSnapshot.key;
      doctores.push(key);
      mails.push(mails1);
      ids.push(ids1);

  });
  $(document).ready(function() {
    $("#doctorlist").select2({
      data: doctores
    });
    var user,pass,email,message;
  });
});


function myFunction() {
  console.log("Hola");
  var data = $('#doctorlist').val();
  var a = doctores.indexOf(data);
  docMail = mails[a];
  console.log(ids[a]);
  console.log(mails[a]);

  user=$("#fname").val();
  pass=$("#lname").val();
  email=$("#email").val();
  message=$("#message").val();
  var messageListRef = firebase.database().ref("Pacientes");
  var newMessageRef = messageListRef.push();
  newMessageRef.set({
    'Desc': message,
    'IDPaciente': 20,
    'IDoc': ids[a],
    'Mail': email,
    'NPaciente':user
  });
  // We've appended a new message to the message_list location.
  var path = newMessageRef.toString();
  $.post("http://10.40.52.24:8080/send",{email: email,msg: message,fname: user,lname: pass,docMail: docMail}, function(data){
    if(data)
      {
        alert("Sent!");
      }
  });
}
