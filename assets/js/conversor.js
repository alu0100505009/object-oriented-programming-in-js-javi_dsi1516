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
  
  function Celsius(valor){
    Conversor.call(this, valor, "c");
		this.toFarenheit = function (){
      return (this.getValor() * 9/5 + 32);
    };
		this.toKelvin = function (){
      return (parseInt(this.getValor()) + 273.15);
    };
  }
  
  function Farenheit(valor){
    Conversor.call(this, valor, "f");
		this.toCelsius = function () {
      return ((this.getValor() - 32) * 5/9);
    };

    this.toKelvin = function () {
      return ((this.getValor() - 32) * 5/9 + 273.15);
    };
  }
  
  function Kelvin(valor){
    Conversor.call(this, valor, "k");
    this.toFarenheit = function () {
		  return ((this.getValor() - 273.15) * 9/5 + 32);
    };

    this.toCelsius = function () {
		  return (this.getValor() - 237.15);
		};
  }
  
  function Metro(valor){
    Conversor.call(this, valor, "m");
    this.toPulgadas = function(){
      return (this.getValor() * 39.3701);
    };
  }
  
  function Euro(valor){
    Conversor.call(this, valor, "€");
    this.toDollar = function(){
      return (parseInt(this.getValor()) * 1.09995);
    };
  }
  
  function Dollar(valor){
    Conversor.call(this, valor, "$");
    this.toEuro = function(){
      return (parseInt(this.getValor()) * 0.909132233);
    };
  }

  Conversor.prototype = new Medida();
  Conversor.prototype.constructor = Conversor;

  Celsius.prototype = new Conversor();
	Celsius.prototype.constructor = Celsius;
	Farenheit.prototype = new Conversor();
	Farenheit.prototype.constructor = Farenheit;
	Kelvin.prototype = new Conversor();
	Kelvin.prototype.constructor = Kelvin;
	Metro.prototype = new Conversor();
	Metro.prototype.constructor = Metro;
	Euro.prototype = new Conversor();
	Euro.prototype.constructor = Euro;
	Dollar.prototype = new Conversor();
	Dollar.prototype.constructor = Dollar;
	
  exports.Conversor = Conversor;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;
  exports.Metro = Metro;
  exports.Euro = Euro;
  exports.Dollar = Dollar;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value;
    var elemento  = document.getElementById('converted');
    var regexp = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([fkc€$])\s*(?:to)?\s*([fkc€$])$/i;
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
        
        default:
           elemento.innerHTML = "Tipo no reconocido";
      }
    }
    else
      elemento.innerHTML = "";
  };
})(this);
