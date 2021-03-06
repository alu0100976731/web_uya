$("document").ready(function() {
  if(localStorage.getItem('token') == null ) {
    $('header').append(`<nav class="grey darken-4" >
          <div class="nav-wrapper container grey darken-4">
            <a href="/" class="brand-logo">MusicArt</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
				<li><a href="/musicos" role="menuitem" aria-label="Musicos">Músicos</a></li>
				<li><a href="/grupos" role="menuitem" aria-label="Grupos">Grupos</a></li>
				<li><a class="black" href="/opiniones" role="menuitem" aria-label="Opiniones">Opiniones</a></li>
				<li><a href="/login" role="menuitem" aria-label="Iniciar sesion">Iniciar sesión</a></li>
				<li><a href="/registro" role="menuitem" aria-label="Registrarse">Registrarse</a></li>
			</ul>
          </div>
        </nav>
        <ul class="sidenav" id="mobile-demo">
          <li><a href="/musicos" role="menuitem" aria-label="Musicos">Músicos</a></li>
		  <li><a href="/grupos" role="menuitem" aria-label="Grupos">Grupos</a></li>
          <li><a href="/opiniones" role="menuitem" aria-label="Opiniones">Opiniones</a></li>
          <li><a href="/login" role="menuitem" aria-label="Iniciar sesión">Iniciar sesión</a></li>
          <li><a href="/registro" role="menuitem" aria-label="Registrarse">Registrarse</a></li>
        </ul>`)
        $('#zona-superior').append(`<div class="row center">
        <p class="caption center-align parrafo-texto">Inicia sesión o registrate para opinar.</p>
        <a href='/login' class="waves-effect waves-light btn amber darken-2">Iniciar Sesión</a>
                    <a href='/registro' class="waves-effect waves-light btn amber darken-4">Registrarse</a> <br>`)
  }
  else {
    $('header').append(`
      <nav class="grey darken-4" >
          <div class="nav-wrapper container grey darken-4">
            <a href="/" class="brand-logo">MusicArt</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <li><a href="/musicos" role="menuitem" aria-label="Musicos">Músicos</a></li>
              <li><a href="/grupos" role="menuitem" aria-label="Grupos">Grupos</a></li>
              <li><a class="black" href="/opiniones" role="menuitem" aria-label="Opiniones">Opiniones</a></li>
              <li><a class="salir" href="#" role="menuitem" aria-label="Salir">Salir</a></li>
            </ul>
          </div>
        </nav>
        <ul class="sidenav" id="mobile-demo">
          <li><a href="/musicos" role="menuitem" aria-label="Musicos">Músicos</a></li>
          <li><a href="/grupos" role="menuitem" aria-label="Grupos">Grupos</a></li>
          <li><a href="/opiniones" role="menuitem" aria-label="Opiniones">Opiniones</a></li>
          <li><a class="salir" href="#" role="menuitem" aria-label="Salir">Salir</a></li>
        </ul>`)
        $('#fzone').append(`
          <form class="white col s12 m8 offset-m2" id="opinar" method="post" action="">
            <div class="row">
            <br>
                <div class="input-field col s12">
                  <i alt="" class="material-icons prefix">insert_comment</i>
                  <textarea id="opinion" class="materialize-textarea" data-length="500" required></textarea>
                  <label for="opinion">Escriba aquí su opinión...</label>
              </div>
              <div class="center-align">
                <button class="btn waves-effect waves-light amber darken-4" type="submit" name="action">Enviar
                  <i class="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>`)
  }

    $("#opinar").submit(function(event){
      event.preventDefault();
      let data = $('#opinar').serializeArray()
      let formData = {username: localStorage.username, opinion:$("#opinion").val()}
      $.post('/opiniones',formData,data=>{
          document.location.href = '/opiniones';
      });
    });

    $.get('/opiniones/all',(datos)=>{
      var res = '';
      (datos.data).forEach (i => {
        let fecha = i['fecha'].slice(0,10);
        $('#zona-opiniones').append(`
        <li>
          <div class="collapsible-header">
          <ul class="list-inline">
            <li>
              <i alt="" class="material-icons prefix">person</i><span class="title-element">Usuario: </span>${i['username']}
            </li>
            <li>
              <i alt="" class="material-icons prefix">alarm</i><span class="title-element">Fecha: </span>${fecha}
            </li>
            <li>
              <i alt="" class="material-icons prefix">message</i><span class="title-element">Opinión: </span>${i['opinion']}
            </li>
          </div>
          </ul>
        </li>
        `);
      })
    });
});
