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
  
  function Temperatura(valor,tipo){
    Medida.call(this, valor, tipo);
  }
  
  function Celsius(valor){
    Temperatura.call(this, valor, "c");
		this.toFarenheit = function (){
      return (this.getValor() * 9/5 + 32);
    };
		this.toKelvin = function (){
      return (parseInt(this.getValor()) + 273.15);
    };
  }
  
  function Farenheit(valor){
    Temperatura.call(this, valor, "f");
		this.toCelsius = function () {
      return ((this.getValor() - 32) * 5/9);
    };

    this.toKelvin = function () {
      return ((this.getValor() - 32) * 5/9 + 273.15);
    };
  }
  
  var Kelvin = function(valor){
    Temperatura.call(this, valor, "k");
    this.toFarenheit = function () {
		  return ((this.getValor() - 273.15) * 9/5 + 32);
    };

    this.toCelsius = function () {
		  return (this.getValor() - 237.15);
		};
  }
  

  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;

  Celsius.prototype = new Temperatura();
	Celsius.prototype.constructor = Celsius;
	Farenheit.prototype = new Temperatura();
	Farenheit.prototype.constructor = Farenheit;
	Kelvin.prototype = new Temperatura();
	Kelvin.prototype.constructor = Kelvin;

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value;
    var elemento  = document.getElementById('converted');
    var regexp = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([fkc])\s*(?:to)?\s*([fkc])$/i;
    valor = valor.match(regexp);
    
    if (valor) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase();
      
      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);
      
      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;
        
        default:
           elemento.innerHTML = "Tipo no reconocido";
      }
    }
    else
      elemento.innerHTML = "";
  };
})(this);
