$(document).ready(function(){
  $("#contenedor").hide();
  $("#hide").hide();
  $("#show").click(function(){
    console.log("Hola");
    $("#hide").show();
    $("#contenedor").show();
    $("#show").hide();
  });
  $("#hide").click(function(){
    console.log("Hola");
    $("#show").show();
    $("#hide").hide();
    $("#contenedor").hide();
  });
});
