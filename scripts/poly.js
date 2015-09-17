(function () {
	document.getElementsByClassName = document.getElementsByClassName || function (className) {
	    var array = [],
	        regex = new RegExp("(^| )" + className + "( |$)"),
	        elements = document.getElementsByTagName("*"),
	        length = elements.length,
	        i = 0,
	        element;

	    while (i < length) {
	        element = elements[i];
	        if (regex.test(element.className)) {
	            array.push(element);
	        }

	        i += 1;
	    }

	    return array;
	}

	if (!Array.prototype.forEach) {

	  Array.prototype.forEach = function (callback, thisArg) {

	    var T, k;

	    if (this == null) {
	      throw new TypeError(' this is null or not defined');
	    }

	    var O = Object(this);

	    var len = O.length >>> 0;

	    if (typeof callback !== 'function') {
	        throw new TypeError(callback + ' is not a function');
	    }

	    if (arguments.length > 1) {
	      T = thisArg;
	    }

	    k = 0;

	    while (k < len) {

	      var kValue;

	      if (k in O) {

	        kValue = O[k];

	        callback.call(T, kValue, k, O);
	      }
	      k++;
	    }
	  };
	}

	if (!Array.prototype.indexOf) {
	  Array.prototype.indexOf = function(searchElement, fromIndex) {
	    var k;

	    if (this == null) {
	      throw new TypeError('"this" is null or not defined');
	    }

	    var O = Object(this);

	    var len = O.length >>> 0;

	    if (len === 0) {
	      return -1;
	    }

	    var n = +fromIndex || 0;

	    if (Math.abs(n) === Infinity) {
	      n = 0;
	    }

	    if (n >= len) {
	      return -1;
	    }

	    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

	    while (k < len) {
	      if (k in O && O[k] === searchElement) {
	        return k;
	      }
	      k++;
	    }
	    return -1;
	  };
	}
}());