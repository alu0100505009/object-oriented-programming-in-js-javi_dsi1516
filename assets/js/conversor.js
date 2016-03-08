(function(exports) {
  "use strict";

  function Medida(valor,tipo){
    var _valor = valor;
    var _tipo = tipo || "type not defined";

    this.getValor = function(){
      return _valor;
    };

    this.getTipo = function(){
      return _tipo;
    };
  }
  
  function Conversor(valor,tipo){
    Medida.call(this, valor, tipo);
  }
  
  Conversor.prototype = new Medida();
  Conversor.prototype.constructor = Conversor;
  
  
  function Celsius(valor){
    Conversor.call(this, valor, "c");
		this.toFarenheit = function (){
      return (this.getValor() * 9/5 + 32);
    };
		this.toKelvin = function (){
      return (parseInt(this.getValor()) + 273.15);
    };
  }
  
  Celsius.prototype = new Conversor();
	Celsius.prototype.constructor = Celsius;
  
  
  
  function Farenheit(valor){
    Conversor.call(this, valor, "f");
		this.toCelsius = function () {
      return ((this.getValor() - 32) * 5/9);
    };

    this.toKelvin = function () {
      return ((this.getValor() - 32) * 5/9 + 273.15);
    };
  }
  
  Farenheit.prototype = new Conversor();
	Farenheit.prototype.constructor = Farenheit;
  
  
  function Kelvin(valor){
    Conversor.call(this, valor, "k");
    this.toFarenheit = function () {
		  return ((this.getValor() - 273.15) * 9/5 + 32);
    };

    this.toCelsius = function () {
		  return (this.getValor() - 237.15);
		};
  }
  
  
  Kelvin.prototype = new Conversor();
	Kelvin.prototype.constructor = Kelvin;
  
  function Metro(valor){
    Conversor.call(this, valor, "m");
    this.toPulgadas = function(){
      return (parseInt(this.getValor()) * 39.3701);
    };
  }
  
  
  Metro.prototype = new Conversor();
	Metro.prototype.constructor = Metro;
  
  
  
  function Pulgada(valor){
    Conversor.call(this, valor, "inch");
    this.toMetro = function(){
      return (parseInt(this.getValor()) * 0.0254);
    };
  }
  
  Pulgada.prototype = new Conversor();
	Pulgada.prototype.constructor = Pulgada;
	
	
  
  function Euro(valor){
    Conversor.call(this, valor, "€");
    this.toDollar = function(){
      return (parseInt(this.getValor()) * 1.09995);
    };
  }
  
  Euro.prototype = new Conversor();
	Euro.prototype.constructor = Euro;
	
  
  function Dollar(valor){
    Conversor.call(this, valor, "$");
    this.toEuro = function(){
      return (parseInt(this.getValor()) * 0.909132233);
    };
  }

	Dollar.prototype = new Conversor();
	Dollar.prototype.constructor = Dollar;
	
  exports.Conversor = Conversor;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;
  exports.Metro = Metro;
  exports.Pulgada = Pulgada;
  exports.Euro = Euro;
  exports.Dollar = Dollar;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value;
    var elemento  = document.getElementById('converted');
    var regexp = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([fkc€$mi])\s*(?:to)?\s*([fkc€$mi])$/i;
    valor = valor.match(regexp);
    
    if (valor) {
      var numero = valor[1],
          valorFrom   = valor[2].toLowerCase(),
          valorTo = valor[3].toLowerCase();
      
      numero = parseFloat(numero);
      console.log("Valor: " + numero + valorFrom + " to " + valorTo);
      
      switch (valorFrom) {
        case 'c':
          var celsius = new Celsius(numero);
          if (valorTo == 'f')
            elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          else if (valorTo == 'k')
            elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
        break;
          
        case 'f':
          var farenheit = new Farenheit(numero);
          if (valorTo == 'c')
            elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          else if (valorTo == 'k')
            elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
        break;
          
        case 'k':
          var kelvin = new Kelvin(valor);
          if (valorTo == 'c')
            elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
          else if (valorTo == 'f')
            elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
        break;
          
        case '€':
          var euro = new Euro(valor);
          if (valorTo == '$')
            elemento.innerHTML = euro.toDollar().toFixed(2) + " Dollars";
        break;
          
        case '$':
          var dollar = new Dollar(valor);
          if (valorTo == '€')
            elemento.innerHTML = dollar.toEuro().toFixed(2) + " Euros";
        break;
          
        case 'm':
          var metro = new Metro(valor);
          if (valorTo == 'i')
            elemento.innerHTML = metro.toPulgadas().toFixed(2) + " Pulgadas";
        break;
        
        case 'i':
          var pulgada = new Pulgada(valor);
          if (valorTo == 'm')
            elemento.innerHTML = pulgada.toMetro().toFixed(2) + " Metros";
        break;
        
        default:
           elemento.innerHTML = "Tipo no reconocido";
      }
    }
    else
      elemento.innerHTML = "";
  };
})(this);
