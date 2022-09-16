var Juego = function(){

  this.Playing = false;

  this.PiezaActiva = new Forma(Formas[Math.floor(Math.random()*7)]);
  this.PiezaActiva.DibujarForma();
  this.Score = 0;
  this.ScoreHtml = undefined;
  this.MaxScore = 0;
  this.MaxScoreHtml = undefined;
  this.BtnJugar = undefined;

  this.VerificarSiHayLineas = function(){
    var PiezasEncontradas = 0;
    var LineasEncontradas= 0;
    for(var i = 0; i<Alto*Ancho; i++){
      if(i % 10 == 0) // Cada 10 casilleros es una fila nueva. Vuelvo a buscar 10 casilleros llenos.
        PiezasEncontradas = 0; 

      if (Grilla[i].style.backgroundColor != '') // Si Tiene asignado un background color, hay algo en el casillero.
        PiezasEncontradas++;

      if(PiezasEncontradas == 10){ // Al encontrar 10, la fila esta completa.
        LineasEncontradas++;
        for(var k = i; k> i-10; k--){
          Grilla[k].style.backgroundColor= ''; // Limpio la fila
        }      
        this.BajarTodoUnaFila(i-10)
        PiezasEncontradas = 0;
      }
    }
    this.Score += LineasEncontradas == 4? LineasEncontradas*2: LineasEncontradas;

  }

  this.BajarTodoUnaFila = function(Desde){
    for(var k = Desde; k>=0 ; k--)
    {
      Grilla[k+10].style.backgroundColor = Grilla[k].style.backgroundColor;
    }
  }

  this.PiezaTocoFondo = function(){
    if(this.PiezaActiva.Pos - 10 > 0)
    {
      this.VerificarSiHayLineas();
      this.PiezaActiva = new Forma(Formas[Math.floor(Math.random()*7)]);
      this.PiezaActiva.DibujarForma();
    }else{
      this.Perder();
    }
    this.ScoreHtml.text(this.Score);
  }

  this.Perder = function(){
    if(this.Score > this.MaxScore) this.MaxScore = this.Score
    this.MaxScoreHtml.text(this.MaxScore);
    this.Score = 0;
    this.ScoreHtml.text(this.Score);

    this.Playing=false;
    this.LimpiarGrilla();
    this.PiezaActiva = new Forma(Formas[Math.floor(Math.random()*7)]);
    this.PiezaActiva.DibujarForma();
    this.BtnJugar.prop('disabled', false);
  }

  this.LimpiarGrilla = function(){
    for(var i = 0; i<Ancho*Alto; i++)
    Grilla[i].style.backgroundColor = '';
  }
  this.BajarPiezaOCrearNueva = function(){
    if(this.PiezaActiva.BajarLaPieza() == false)
    {
      this.PiezaTocoFondo();
    }
  }
  
  this.EventoTeclas = function(evt){
    if(this.Playing){ 
      evt = evt || window.event;
      var charCode = evt.keyCode || evt.which;
      switch(charCode){
        case 37:
          this.PiezaActiva.MoverIzquierdaSiPuede();          
          break;        
        case 39:   
          this.PiezaActiva.MoverDerechaSiPuede();          
          break;

        case 38:          
          this.PiezaActiva.CambiarRotacionSiPuede();             
          break;
        
        case 40:
          this.BajarPiezaOCrearNueva();
          break;
      }
    }
  }

  
}