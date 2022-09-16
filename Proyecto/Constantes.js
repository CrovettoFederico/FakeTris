const Ancho = 10;
const Alto = 20;
CrearGrilla();
const Grilla = $('#Tetris').find('div');
const Formas = ['L', 'LInvertida', 'N', 'NInvertida', 'Palito', 'T', 'Cuadrado']
var ElJuego = new Juego();
ElJuego.BtnJugar = $('#BotonJugar');
const Jugar = function(QueJuego) {  
    QueJuego.Playing = true;
    QueJuego.BtnJugar.prop('disabled', true);
    QueJuego.ScoreHtml = $('#Score');
    QueJuego.MaxScoreHtml = $('#MaxScore');
    window.setInterval(()=>{
      if(QueJuego.Playing)
        QueJuego.BajarPiezaOCrearNueva();
    }, 850);
}
ElJuego.BtnJugar.click(()=>{Jugar(ElJuego)});

document.onkeydown = function(evt) {     
    ElJuego.EventoTeclas(evt);
  };

