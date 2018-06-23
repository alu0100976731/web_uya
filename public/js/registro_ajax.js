$("document").ready(function() {
  $("#username").on("keyup",function(){
    if($('#username').val()!="") {
    $.post('/usuario',$('#username').serialize(),function(data){
      $('#respuesta').empty()
      if (data.data!=null)
      {
        $('#respuesta').append(`<span role="alert" id="error" class="mensaje-error">El usuario ya existe</span>`)
      }
      else {
        $('#respuesta').empty()
        $('#respuesta').append(`<span role="alert" class="mensaje-valido">El nombre de usuario está disponible</span>`)
      }
    })
  }
  else {
    $('#respuesta').empty()
  }
})
$("#registro").submit(function(event){
  event.preventDefault();
  //let data = $('#registro').serializeArray()
  //let formData = { 'username':data[0].value, 'password':data[1].value}

  $.post('/usuario',$('#username').serialize(),function(data){
    if(data.data==null){
      $.post('/singup',$("#registro").serialize(),data2=>{
        document.location.href = '/login';
      });
    }
    else {
      $('#errores').empty()
      $('#errores').append('Datos introducidos no válidos. Revise los campos con mensaje de error.<br>')
    }
  });
})
});
