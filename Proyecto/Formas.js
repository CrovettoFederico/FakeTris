var CrearGrilla= function(){
    var ContenedorGrilla = $("#Tetris");
	for (var i = 0; i<Ancho*Alto; i++){
		ContenedorGrilla.append($('<div id="Casilla-'+i+'" class="Casillas"></div>'))
	}
}



var Forma = function(NombreForma) {    
    this.Color = '';
    this.Rotaciones = undefined;
    this.Anchos;
    this.Largos;
    this.CurrentRotation = 0;
    this.Pos=5;
    this.EsPalo = false;
    this.PudoRotar = true;
    this.OffsetX = 1;

    var CrearRotaciones = function(that, NombreForma){
        switch (NombreForma){
            case 'L':
                that.Rotaciones = [[0,1,Ancho,Ancho*2],[0,1,2,Ancho+2],[1,Ancho+1,Ancho*2,(Ancho*2)+1],[0,Ancho,Ancho+1,Ancho+2]];
                that.Color = 'grey';
                that.Anchos = [2,3,2,3];
                that.Largos =[3,2,3,2];
                break;

            case 'Palito':
                that.Rotaciones = [[0,Ancho,Ancho*2,Ancho*3],[0,1,2,3],[0,Ancho,Ancho*2,Ancho*3],[0,1,2,3]];
                that.Color = 'Red';
                that.Anchos = [1,4,1,4];
                that.Largos =[4,1,4,1];
                that.EsPalo = true;
                break;   

            case 'N':
                that.Rotaciones = [[1,Ancho,Ancho+1,Ancho*2],[0,1,Ancho+1,Ancho+2],[1,Ancho,Ancho+1,Ancho*2],[0,1,Ancho+1,Ancho+2]];
                that.Color = 'pink';
                that.Anchos = [2,3,2,3];
                that.Largos =[3,2,3,2];
                break;

            case 'NInvertida':
                that.Rotaciones = [[0,Ancho,Ancho+1, (Ancho*2) + 1],[1,2,Ancho,Ancho+1],[0,Ancho,Ancho+1, (Ancho*2) + 1],[1,2,Ancho,Ancho+1]];
                that.Color = 'blue';
                that.Anchos = [2,3,2,3];
                that.Largos =[3,2,3,2];
                break;

            case 'LInvertida':
                that.Rotaciones = [[0,1,Ancho+1,(Ancho*2)+1],[0,1,2,Ancho],[0,Ancho,Ancho*2,(Ancho*2)+1],[2,Ancho,Ancho+1,Ancho+2]];
                that.Color = 'green';
                that.Anchos = [2,3,2,3];
                that.Largos =[3,2,3,2];
                break;

            case 'Cuadrado':
                that.Rotaciones = [[0,1,Ancho,Ancho+1],[0,1,Ancho,Ancho+1],[0,1,Ancho,Ancho+1],[0,1,Ancho,Ancho+1]];
                that.Color = 'cyan';
                that.Anchos = [2,2,2,2];
                that.Largos =[2,2,2,2];
                break;  

            case 'T':
                that.Rotaciones = [[0,1,2,Ancho+1],[1,Ancho,Ancho+1,(Ancho*2)+1],[1,Ancho,Ancho+1,Ancho+2],[0,Ancho,Ancho+1,Ancho*2]];
                that.Color = 'orange';
                that.Anchos = [3,2,3,2];
                that.Largos = [2,3,2,3];
            break;               
        }
    }
    CrearRotaciones(this, NombreForma);

    

    this.RotacionRequiereOffset = function(){
        if((this.Pos + this.Anchos[this.ObtenerProximaRotacion()] - this.OffsetX) % 10 != 0)
            return true;
        else
            return false;
    }

    this.CalcularOffset = function(){
        this.OffsetX = this.Pos % 10 == 0 && this.EsPalo ? 2 : 1;
        
        if(this.EsPalo && this.Pos % 10 >=7 ){            
            this.OffsetX = (this.Pos + this.Anchos[this.ObtenerProximaRotacion()]) % 10;
        }    
    }

    this.PuedeRotar = function(){
        var PuedeRotar = true;
        this.Rotaciones[this.ObtenerProximaRotacion()].forEach(PosAPintar => {        
            if (Grilla[this.Pos + PosAPintar].style.backgroundColor != '' && PuedeRotar && !this.EsPropiaPosicion(this.Pos + PosAPintar)){
                PuedeRotar = false;
            }
        });
        return PuedeRotar;
    }

    this.ObtenerProximaRotacion = function(){
        if(this.CurrentRotation != 3){
            return this.CurrentRotation+1
        }else{
            return 0;
        }
    }

    this.CambiarRotacionSiPuede = function(){ 
        if(this.PuedeRotar()){
                this.BorrarForma();
            if(!this.PudoRotar){
                this.PudoRotar = true;            
                this.Pos += this.OffsetX;
            }else{
                this.CalcularOffset();
                if(!this.RotacionRequiereOffset()){                 
                    this.Pos -= this.OffsetX;
                    this.PudoRotar = false;
                }     
            }   
            this.CurrentRotation = this.ObtenerProximaRotacion();        
            this.DibujarForma();
        }
    }

    this.MoverDerechaSiPuede = function(){
        if((this.Pos+this.Anchos[this.CurrentRotation]) % 10 !=0 && !this.HayPiezaALaDerecha()){
            this.BorrarForma();
            this.Pos = this.Pos + 1;
            this.DibujarForma();   
            this.PudoRotar = true;
        }
    }

    this.MoverIzquierdaSiPuede = function(){
        if(this.Pos % 10 !=0 && !this.HayPiezaALaIzquierda()){
            this.BorrarForma();            
            this.Pos = this.Pos -1;
            this.DibujarForma();
            this.PudoRotar = true;
          }
    }

    this.BajarUnLugar = function(){
        this.BorrarForma();
        this.Pos = this.Pos + 10;
        this.DibujarForma();
    }

    this.DibujarForma = function(){
        this.Rotaciones[this.CurrentRotation].forEach(PosAPintar => {        
            Grilla[this.Pos + PosAPintar].style.backgroundColor = this.Color;
        });
    }
    
    this.BorrarForma = function(){
        this.Rotaciones[this.CurrentRotation].forEach(PosAPintar => {        
            Grilla[this.Pos + PosAPintar].style.backgroundColor = '';
        });
    }

    this.EsPropiaPosicion = function(LugarAPintar){
        for(let PosPintada of this.Rotaciones[this.CurrentRotation]){            
            if(LugarAPintar ==  this.Pos+PosPintada) return true;            
        }
        return false;
        
    }

    this.PuedeBajar = function (){
        var Caida = this.Pos + (Ancho*this.Largos[this.CurrentRotation]);
        var puede = true;
        //for (var i = Caida; i<Caida + this.Anchos[this.CurrentRotation]; i++){
            
        //}
        for(let PosAPintar of this.Rotaciones[this.CurrentRotation]){
            if (!this.EsPropiaPosicion(this.Pos+ Ancho + PosAPintar))
                puede = Grilla[this.Pos+ Ancho + PosAPintar].style.backgroundColor == '' || Grilla[this.Pos + Ancho + PosAPintar].style.backgroundColor == 'yellow';
            else
                puede = true;

            if(!puede) break;;
        }

        return puede;
    }

    this.BajarLaPieza = function(){
        try{
            if(this.PuedeBajar())
                this.BajarUnLugar();
            else return false;
        }catch{
            return false;
        }
    }


    this.HayPiezaALaDerecha = function(){
        var HayUnaPieza = false;
        this.Rotaciones[this.CurrentRotation].forEach(PosOcupada => {        
            if(!HayUnaPieza)
            {
                HayUnaPieza = Grilla[this.Pos + PosOcupada + 1].style.backgroundColor != '' && !this.EsPropiaPosicion(this.Pos + PosOcupada + 1)
            }
            
        });
        return HayUnaPieza;
    }

    this.HayPiezaALaIzquierda = function(){
        var HayUnaPieza = false;
        this.Rotaciones[this.CurrentRotation].forEach(PosOcupada => {        
            if(!HayUnaPieza)
            {
                HayUnaPieza = Grilla[this.Pos + PosOcupada - 1].style.backgroundColor != '' && !this.EsPropiaPosicion(this.Pos + PosOcupada - 1)
            }
            
        });
        return HayUnaPieza;
    }
}
