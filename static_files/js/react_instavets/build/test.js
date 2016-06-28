/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var forms = __webpack_require__(1);
	__webpack_require__(130);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validators = __webpack_require__(2)

	var locales = __webpack_require__(13)
	var util = __webpack_require__(15)

	module.exports = {
	  addLocale: locales.addLocale
	, allValid: util.allValid
	, BaseTemporalField: __webpack_require__(18)
	, BooleanField: __webpack_require__(62)
	, BoundField: __webpack_require__(64)
	, CharField: __webpack_require__(66)
	, CheckboxChoiceInput: __webpack_require__(69)
	, CheckboxFieldRenderer: __webpack_require__(71)
	, CheckboxInput: __webpack_require__(63)
	, CheckboxSelectMultiple: __webpack_require__(73)
	, ChoiceField: __webpack_require__(77)
	, ChoiceFieldRenderer: __webpack_require__(72)
	, ChoiceInput: __webpack_require__(70)
	, ClearableFileInput: __webpack_require__(78)
	, ComboField: __webpack_require__(80)
	, DateField: __webpack_require__(81)
	, DateInput: __webpack_require__(82)
	, DateTimeBaseInput: __webpack_require__(83)
	, DateTimeField: __webpack_require__(84)
	, DateTimeInput: __webpack_require__(85)
	, DecimalField: __webpack_require__(86)
	, EmailField: __webpack_require__(89)
	, EmailInput: __webpack_require__(90)
	, env: __webpack_require__(68)
	, ErrorList: __webpack_require__(91)
	, ErrorObject: __webpack_require__(92)
	, Field: __webpack_require__(20)
	, FileField: __webpack_require__(93)
	, FileInput: __webpack_require__(79)
	, FilePathField: __webpack_require__(94)
	, FloatField: __webpack_require__(95)
	, Form: __webpack_require__(96)
	, formats: __webpack_require__(19)
	, FormRow: __webpack_require__(101)
	, FormSet: __webpack_require__(103)
	, GenericIPAddressField: __webpack_require__(105)
	, getFormData: util.getFormData
	, HiddenInput: __webpack_require__(21)
	, ImageField: __webpack_require__(106)
	, Input: __webpack_require__(22)
	, IntegerField: __webpack_require__(87)
	, IPAddressField: __webpack_require__(107)
	, isFormAsync: __webpack_require__(104)
	, locales: locales
	, MultipleChoiceField: __webpack_require__(108)
	, MultipleFileField: __webpack_require__(100)
	, MultipleHiddenInput: __webpack_require__(109)
	, MultiValueField: __webpack_require__(110)
	, MultiWidget: __webpack_require__(111)
	, NullBooleanField: __webpack_require__(112)
	, NullBooleanSelect: __webpack_require__(113)
	, NumberInput: __webpack_require__(88)
	, PasswordInput: __webpack_require__(67)
	, RadioChoiceInput: __webpack_require__(114)
	, RadioFieldRenderer: __webpack_require__(115)
	, RadioSelect: __webpack_require__(116)
	, RegexField: __webpack_require__(117)
	, RendererMixin: __webpack_require__(74)
	, RenderForm: __webpack_require__(118)
	, RenderFormSet: __webpack_require__(119)
	, Select: __webpack_require__(76)
	, SelectMultiple: __webpack_require__(75)
	, setDefaultLocale: locales.setDefaultLocale
	, SlugField: __webpack_require__(120)
	, SplitDateTimeField: __webpack_require__(121)
	, SplitDateTimeWidget: __webpack_require__(122)
	, SplitHiddenDateTimeWidget: __webpack_require__(124)
	, SubWidget: __webpack_require__(60)
	, Textarea: __webpack_require__(65)
	, TextInput: __webpack_require__(61)
	, TimeField: __webpack_require__(125)
	, TimeInput: __webpack_require__(123)
	, TypedChoiceField: __webpack_require__(126)
	, TypedMultipleChoiceField: __webpack_require__(127)
	, URLField: __webpack_require__(128)
	, util: util
	, validateAll: util.validateAll
	, ValidationError: validators.ValidationError
	, validators: validators
	, Widget: __webpack_require__(59)
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// HACK: requiring './validators' here makes the circular import in ipv6.js work
	//       after browserification.
	module.exports = __webpack_require__(3)

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var punycode = __webpack_require__(7)
	var url = __webpack_require__(9)

	var errors = __webpack_require__(10)
	var ipv6 = __webpack_require__(12)

	var ValidationError = errors.ValidationError
	var isValidIPv6Address = ipv6.isValidIPv6Address

	var EMPTY_VALUES = [null, undefined, '']

	function String_rsplit(str, sep, maxsplit) {
	  var split = str.split(sep)
	  return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split
	}

	/**
	 * Validates that input matches a regular expression.
	 */
	var RegexValidator = Concur.extend({
	  constructor: function(kwargs) {
	    if (!(this instanceof RegexValidator)) { return new RegexValidator(kwargs) }
	    kwargs = object.extend({
	      regex: null, message: null, code: null, inverseMatch: null
	    }, kwargs)
	    if (kwargs.regex) {
	      this.regex = kwargs.regex
	    }
	    if (kwargs.message) {
	      this.message = kwargs.message
	    }
	    if (kwargs.code) {
	      this.code = kwargs.code
	    }
	    if (kwargs.inverseMatch) {
	      this.inverseMatch = kwargs.inverseMatch
	    }
	    // Compile the regex if it was not passed pre-compiled
	    if (is.String(this.regex)) {
	      this.regex = new RegExp(this.regex)
	    }
	    return this.__call__.bind(this)
	  }
	, regex: ''
	, message: 'Enter a valid value.'
	, code: 'invalid'
	, inverseMatch: false
	, __call__: function(value) {
	    if (this.inverseMatch === this.regex.test(''+value)) {
	      throw ValidationError(this.message, {code: this.code})
	    }
	  }
	})

	/**
	 * Validates that input looks like a valid URL.
	 */
	var URLValidator = RegexValidator.extend({
	  regex: new RegExp(
	    '^(?:[a-z0-9\\.\\-]*)://'                         // schema is validated separately
	  + '(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\\.)+(?:[A-Z]{2,6}\\.?|[A-Z0-9-]{2,}\\.?)|' // Domain...
	  + 'localhost|'                                      // localhost...
	  + '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|'      // ...or IPv4
	  + '\\[?[A-F0-9]*:[A-F0-9:]+\\]?)'                   // ...or IPv6
	  + '(?::\\d+)?'                                      // Optional port
	  + '(?:/?|[/?]\\S+)$'
	  , 'i'
	  )
	, message: 'Enter a valid URL.'
	, schemes: ['http', 'https', 'ftp', 'ftps']

	, constructor:function(kwargs) {
	    if (!(this instanceof URLValidator)) { return new URLValidator(kwargs) }
	    kwargs = object.extend({schemes: null}, kwargs)
	    RegexValidator.call(this, kwargs)
	    if (kwargs.schemes !== null) {
	      this.schemes = kwargs.schemes
	    }
	    return this.__call__.bind(this)
	  }

	, __call__: function(value) {
	    value = ''+value
	    // Check if the scheme is valid first
	    var scheme = value.split('://')[0].toLowerCase()
	    if (this.schemes.indexOf(scheme) === -1) {
	      throw ValidationError(this.message, {code: this.code})
	    }

	    // Check the full URL
	    try {
	      RegexValidator.prototype.__call__.call(this, value)
	    }
	    catch (e) {
	      if (!(e instanceof ValidationError)) { throw e }

	      // Trivial case failed - try for possible IDN domain
	      var urlFields = url.parseUri(value)
	      try {
	        urlFields.host = punycode.toASCII(urlFields.host)
	      }
	      catch (unicodeError) {
	        throw e
	      }
	      value = url.makeUri(urlFields)
	      RegexValidator.prototype.__call__.call(this, value)
	    }
	  }
	})

	/** Validates that input looks like a valid e-mail address. */
	var EmailValidator = Concur.extend({
	  message: 'Enter a valid email address.'
	, code: 'invalid'
	, userRegex: new RegExp(
	    "(^[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*$"                                 // Dot-atom
	  + '|^"([\\001-\\010\\013\\014\\016-\\037!#-\\[\\]-\\177]|\\\\[\\001-\\011\\013\\014\\016-\\177])*"$)' // Quoted-string
	  , 'i')
	, domainRegex: new RegExp(
	    '^(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\\.)+(?:[A-Z]{2,6}|[A-Z0-9-]{2,})$'          // Domain
	  + '|^\\[(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)(\\.(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)){3}\\]$' // Literal form, ipv4 address (SMTP 4.1.3)
	  , 'i')
	, domainWhitelist: ['localhost']

	, constructor: function(kwargs) {
	    if (!(this instanceof EmailValidator)) { return new EmailValidator(kwargs) }
	    kwargs = object.extend({message: null, code: null, whitelist: null}, kwargs)
	    if (kwargs.message !== null) {
	      this.message = kwargs.message
	    }
	    if (kwargs.code !== null) {
	      this.code = kwargs.code
	    }
	    if (kwargs.whitelist !== null) {
	      this.domainWhitelist = kwargs.whitelist
	    }
	    return this.__call__.bind(this)
	  }

	, __call__ : function(value) {
	    value = ''+value

	    if (!value || value.indexOf('@') == -1) {
	      throw ValidationError(this.message, {code: this.code})
	    }

	    var parts = String_rsplit(value, '@', 1)
	    var userPart = parts[0]
	    var domainPart = parts[1]

	    if (!this.userRegex.test(userPart)) {
	      throw ValidationError(this.message, {code: this.code})
	    }

	    if (this.domainWhitelist.indexOf(domainPart) == -1 &&
	        !this.domainRegex.test(domainPart)) {
	      // Try for possible IDN domain-part
	      try {
	        domainPart = punycode.toASCII(domainPart)
	        if (this.domainRegex.test(domainPart)) {
	          return
	        }
	      }
	      catch (unicodeError) {
	        // Pass through to throw the ValidationError
	      }
	      throw ValidationError(this.message, {code: this.code})
	    }
	  }
	})

	var validateEmail = EmailValidator()

	var SLUG_RE = /^[-a-zA-Z0-9_]+$/
	/** Validates that input is a valid slug. */
	var validateSlug = RegexValidator({
	  regex: SLUG_RE
	, message: 'Enter a valid "slug" consisting of letters, numbers, underscores or hyphens.'
	, code: 'invalid'
	})

	var IPV4_RE = /^(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}$/
	/** Validates that input is a valid IPv4 address. */
	var validateIPv4Address = RegexValidator({
	  regex: IPV4_RE
	, message: 'Enter a valid IPv4 address.'
	, code: 'invalid'
	})

	/** Validates that input is a valid IPv6 address. */
	function validateIPv6Address(value) {
	  if (!isValidIPv6Address(value)) {
	    throw ValidationError('Enter a valid IPv6 address.', {code: 'invalid'})
	  }
	}

	/** Validates that input is a valid IPv4 or IPv6 address. */
	function validateIPv46Address(value) {
	  try {
	    validateIPv4Address(value)
	  }
	  catch (e) {
	    if (!(e instanceof ValidationError)) { throw e }
	    try {
	      validateIPv6Address(value)
	    }
	    catch (e) {
	      if (!(e instanceof ValidationError)) { throw e }
	      throw ValidationError('Enter a valid IPv4 or IPv6 address.',
	                            {code: 'invalid'})
	    }
	  }
	}

	var ipAddressValidatorLookup = {
	  both: {validators: [validateIPv46Address], message: 'Enter a valid IPv4 or IPv6 address.'}
	, ipv4: {validators: [validateIPv4Address], message: 'Enter a valid IPv4 address.'}
	, ipv6: {validators: [validateIPv6Address], message: 'Enter a valid IPv6 address.'}
	}

	/**
	 * Depending on the given parameters returns the appropriate validators for
	 * a GenericIPAddressField.
	 */
	function ipAddressValidators(protocol, unpackIPv4) {
	  if (protocol != 'both' && unpackIPv4) {
	    throw new Error('You can only use unpackIPv4 if protocol is set to "both"')
	  }
	  protocol = protocol.toLowerCase()
	  if (typeof ipAddressValidatorLookup[protocol] == 'undefined') {
	    throw new Error('The protocol "' + protocol +'" is unknown')
	  }
	  return ipAddressValidatorLookup[protocol]
	}

	var COMMA_SEPARATED_INT_LIST_RE = /^[\d,]+$/
	/** Validates that input is a comma-separated list of integers. */
	var validateCommaSeparatedIntegerList = RegexValidator({
	  regex: COMMA_SEPARATED_INT_LIST_RE
	, message: 'Enter only digits separated by commas.'
	, code: 'invalid'
	})

	/**
	 * Base for validators which compare input against a given value.
	 */
	var BaseValidator = Concur.extend({
	  constructor: function(limitValue) {
	    if (!(this instanceof BaseValidator)) { return new BaseValidator(limitValue) }
	    this.limitValue = limitValue
	    return this.__call__.bind(this)
	  }
	, compare: function(a, b) { return a !== b }
	, clean: function(x) { return x }
	, message: 'Ensure this value is {limitValue} (it is {showValue}).'
	, code: 'limitValue'
	, __call__: function(value) {
	    var cleaned = this.clean(value)
	    var params = {limitValue: this.limitValue, showValue: cleaned}
	    if (this.compare(cleaned, this.limitValue)) {
	      throw ValidationError(this.message, {code: this.code, params: params})
	    }
	  }
	})

	/**
	 * Validates that input is less than or equal to a given value.
	 */
	var MaxValueValidator = BaseValidator.extend({
	  constructor: function(limitValue) {
	    if (!(this instanceof MaxValueValidator)) { return new MaxValueValidator(limitValue) }
	    return BaseValidator.call(this, limitValue)
	  }
	, compare: function(a, b) { return a > b }
	, message: 'Ensure this value is less than or equal to {limitValue}.'
	, code: 'maxValue'
	})

	/**
	 * Validates that input is greater than or equal to a given value.
	 */
	var MinValueValidator = BaseValidator.extend({
	  constructor: function(limitValue) {
	    if (!(this instanceof MinValueValidator)) { return new MinValueValidator(limitValue) }
	    return BaseValidator.call(this, limitValue)
	  }
	, compare: function(a, b) { return a < b }
	, message: 'Ensure this value is greater than or equal to {limitValue}.'
	, code: 'minValue'
	})

	/**
	 * Validates that input is at least a given length.
	 */
	var MinLengthValidator = BaseValidator.extend({
	  constructor: function(limitValue) {
	    if (!(this instanceof MinLengthValidator)) { return new MinLengthValidator(limitValue) }
	    return BaseValidator.call(this, limitValue)
	  }
	, compare: function(a, b) { return a < b }
	, clean: function(x) { return x.length }
	, message: 'Ensure this value has at least {limitValue} characters (it has {showValue}).'
	, code: 'minLength'
	})

	/**
	 * Validates that input is at most a given length.
	 */
	var MaxLengthValidator = BaseValidator.extend({
	  constructor: function(limitValue) {
	    if (!(this instanceof MaxLengthValidator)) { return new MaxLengthValidator(limitValue) }
	    return BaseValidator.call(this, limitValue)
	  }
	, compare: function(a, b) { return a > b }
	, clean: function(x) { return x.length }
	, message: 'Ensure this value has at most {limitValue} characters (it has {showValue}).'
	, code: 'maxLength'
	})

	module.exports = {
	  EMPTY_VALUES: EMPTY_VALUES
	, RegexValidator: RegexValidator
	, URLValidator: URLValidator
	, EmailValidator: EmailValidator
	, validateEmail: validateEmail
	, validateSlug: validateSlug
	, validateIPv4Address: validateIPv4Address
	, validateIPv6Address: validateIPv6Address
	, validateIPv46Address: validateIPv46Address
	, ipAddressValidators: ipAddressValidators
	, validateCommaSeparatedIntegerList: validateCommaSeparatedIntegerList
	, BaseValidator: BaseValidator
	, MaxValueValidator: MaxValueValidator
	, MinValueValidator: MinValueValidator
	, MaxLengthValidator: MaxLengthValidator
	, MinLengthValidator: MinLengthValidator
	, ValidationError: ValidationError
	, ipv6: ipv6
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty
	var toString = Object.prototype.toString

	function type(obj) {
	  return toString.call(obj).slice(8, -1).toLowerCase()
	}

	function inherits(childConstructor, parentConstructor) {
	  var F = function() {}
	  F.prototype = parentConstructor.prototype
	  childConstructor.prototype = new F()
	  childConstructor.prototype.constructor = childConstructor
	  return childConstructor
	}

	function extend(dest, src) {
	  for (var prop in src) {
	    if (hasOwn.call(src, prop)) {
	      dest[prop] = src[prop]
	    }
	  }
	  return dest
	}

	/**
	 * Mixes in properties from one object to another. If the source object is a
	 * Function, its prototype is mixed in instead.
	 */
	function mixin(dest, src) {
	  if (type(src) == 'function') {
	    extend(dest, src.prototype)
	  }
	  else {
	    extend(dest, src)
	  }
	}

	/**
	 * Applies mixins specified as a __mixins__ property on the given properties
	 * object, returning an object containing the mixed in properties.
	 */
	function applyMixins(properties) {
	  var mixins = properties.__mixins__
	  if (type(mixins) != 'array') {
	    mixins = [mixins]
	  }
	  var mixedProperties = {}
	  for (var i = 0, l = mixins.length; i < l; i++) {
	    mixin(mixedProperties, mixins[i])
	  }
	  delete properties.__mixins__
	  return extend(mixedProperties, properties)
	}

	/**
	 * Inherits another constructor's prototype and sets its prototype and
	 * constructor properties in one fell swoop.
	 *
	 * If a child constructor is not provided via prototypeProps.constructor,
	 * a new constructor will be created.
	 */
	function inheritFrom(parentConstructor, childConstructor, prototypeProps, constructorProps) {
	  // Create a child constructor if one wasn't given
	  if (childConstructor == null) {
	    childConstructor = function() {
	      parentConstructor.apply(this, arguments)
	    }
	  }

	  // Make sure the new prototype has the correct constructor set up
	  prototypeProps.constructor = childConstructor

	  // Base constructors should only have the properties they're defined with
	  if (parentConstructor !== Concur) {
	    // Inherit the parent's prototype
	    inherits(childConstructor, parentConstructor)
	    childConstructor.__super__ = parentConstructor.prototype
	  }

	  // Add prototype properties - this is why we took a copy of the child
	  // constructor reference in extend() - if a .constructor had been passed as a
	  // __mixins__ and overitten prototypeProps.constructor, these properties would
	  // be getting set on the mixed-in constructor's prototype.
	  extend(childConstructor.prototype, prototypeProps)

	  // Add constructor properties
	  extend(childConstructor, constructorProps)

	  return childConstructor
	}

	/**
	 * Namespace and dummy constructor for initial extension.
	 */
	var Concur = module.exports = function() {}

	/**
	 * Details of a constructor's inheritance chain - Concur just facilitates sugar
	 * so we don't include it in the initial chain. Arguably, Object.prototype could
	 * go here, but it's just not that interesting.
	 */
	Concur.__mro__ = []

	/**
	 * Creates or uses a child constructor to inherit from the the call
	 * context, which is expected to be a constructor.
	 */
	Concur.extend = function(prototypeProps, constructorProps) {
	  // Ensure we have prop objects to work with
	  prototypeProps = prototypeProps || {}
	  constructorProps = constructorProps || {}

	  // If the constructor being inherited from has a __meta__ function somewhere
	  // in its prototype chain, call it to customise prototype and constructor
	  // properties before they're used to set up the new constructor's prototype.
	  if (typeof this.prototype.__meta__ != 'undefined') {
	    this.prototype.__meta__(prototypeProps, constructorProps)
	  }

	  // Any child constructor passed in should take precedence - grab a reference
	  // to it befoer we apply any mixins.
	  var childConstructor = (hasOwn.call(prototypeProps, 'constructor')
	                          ? prototypeProps.constructor
	                          : null)

	  // If any mixins are specified, mix them into the property objects
	  if (hasOwn.call(prototypeProps, '__mixins__')) {
	    prototypeProps = applyMixins(prototypeProps)
	  }
	  if (hasOwn.call(constructorProps, '__mixins__')) {
	    constructorProps = applyMixins(constructorProps)
	  }

	  // Set up the new child constructor and its prototype
	  childConstructor = inheritFrom(this,
	                                 childConstructor,
	                                 prototypeProps,
	                                 constructorProps)

	  // Pass on the extend function for extension in turn
	  childConstructor.extend = this.extend

	  // Expose the inheritance chain for programmatic access
	  childConstructor.__mro__ = [childConstructor].concat(this.__mro__)

	  return childConstructor
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString

	// Type checks

	function isArray(o) {
	  return toString.call(o) == '[object Array]'
	}

	function isBoolean(o) {
	  return toString.call(o) == '[object Boolean]'
	}

	function isDate(o) {
	  return toString.call(o) == '[object Date]'
	}

	function isError(o) {
	  return toString.call(o) == '[object Error]'
	}

	function isFunction(o) {
	  return toString.call(o) == '[object Function]'
	}

	function isNumber(o) {
	  return toString.call(o) == '[object Number]'
	}

	function isObject(o) {
	  return toString.call(o) == '[object Object]'
	}

	function isRegExp(o) {
	  return toString.call(o) == '[object RegExp]'
	}

	function isString(o) {
	  return toString.call(o) == '[object String]'
	}

	// Content checks

	function isEmpty(o) {
	  /* jshint ignore:start */
	  for (var prop in o) {
	    return false
	  }
	  /* jshint ignore:end */
	  return true
	}

	module.exports = {
	  Array: isArray
	, Boolean: isBoolean
	, Date: isDate
	, Empty: isEmpty
	, Error: isError
	, Function: isFunction
	, NaN: isNaN
	, Number: isNumber
	, Object: isObject
	, RegExp: isRegExp
	, String: isString
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Wraps Object.prototype.hasOwnProperty() so it can be called with an object
	 * and property name.
	 */
	var hasOwn = (function() {
	  var hasOwnProperty = Object.prototype.hasOwnProperty
	  return function(obj, prop) { return hasOwnProperty.call(obj, prop) }
	})()

	/**
	 * Returns the type of an object as a lowercase string.
	 */
	var type = (function() {
	  var toString = Object.prototype.toString
	  return function(obj) { return toString.call(obj).slice(8, -1).toLowerCase() }
	})()

	/**
	 * Copies own properties from any given objects to a destination object.
	 */
	function extend(dest) {
	  for (var i = 1, l = arguments.length, src; i < l; i++) {
	    src = arguments[i]
	    if (src) {
	      for (var prop in src) {
	        if (hasOwn(src, prop)) {
	          dest[prop] = src[prop]
	        }
	      }
	    }
	  }
	  return dest
	}

	/**
	 * Makes a constructor inherit another constructor's prototype without
	 * having to actually use the constructor.
	 */
	function inherits(childConstructor, parentConstructor) {
	  var F = function() {}
	  F.prototype = parentConstructor.prototype
	  childConstructor.prototype = new F()
	  childConstructor.prototype.constructor = childConstructor
	  return childConstructor
	}

	/**
	 * Creates an Array of [property, value] pairs from an Object.
	 */
	function items(obj) {
	  var items_ = []
	  for (var prop in obj) {
	    if (hasOwn(obj, prop)) {
	      items_.push([prop, obj[prop]])
	    }
	  }
	  return items_
	}

	/**
	 * Creates an Object from an Array of [property, value] pairs.
	 */
	function fromItems(items) {
	  var obj = {}
	  for (var i = 0, l = items.length, item; i < l; i++) {
	    item = items[i]
	    obj[item[0]] = item[1]
	  }
	  return obj
	}

	/**
	 * Creates a lookup Object from an Array, coercing each item to a String.
	 */
	function lookup(arr) {
	  var obj = {}
	  for (var i = 0, l = arr.length; i < l; i++) {
	    obj[''+arr[i]] = true
	  }
	  return obj
	}

	/**
	 * If the given object has the given property, returns its value, otherwise
	 * returns the given default value.
	 */
	function get(obj, prop, defaultValue) {
	  return (hasOwn(obj, prop) ? obj[prop] : defaultValue)
	}

	/**
	 * Deletes and returns an own property from an object, optionally returning a
	 * default value if the object didn't have theproperty.
	 * @throws if given an object which is null (or undefined), or if the property
	 *   doesn't exist and there was no defaultValue given.
	 */
	function pop(obj, prop, defaultValue) {
	  if (obj == null) {
	    throw new Error('pop was given ' + obj)
	  }
	  if (hasOwn(obj, prop)) {
	    var value = obj[prop]
	    delete obj[prop]
	    return value
	  }
	  else if (arguments.length == 2) {
	    throw new Error("pop was given an object which didn't have an own '" +
	                    prop + "' property, without a default value to return")
	  }
	  return defaultValue
	}

	/**
	 * If the prop is in the object, return its value. If not, set the prop to
	 * defaultValue and return defaultValue.
	 */
	function setDefault(obj, prop, defaultValue) {
	  if (obj == null) {
	    throw new Error('setDefault was given ' + obj)
	  }
	  defaultValue = defaultValue || null
	  if (hasOwn(obj, prop)) {
	    return obj[prop]
	  }
	  else {
	    obj[prop] = defaultValue
	    return defaultValue
	  }
	}

	module.exports = {
	  hasOwn: hasOwn
	, type: type
	, extend: extend
	, inherits: inherits
	, items: items
	, fromItems: fromItems
	, lookup: lookup
	, get: get
	, pop: pop
	, setDefault: setDefault
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.4.1 by @mathias */
	;(function(root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw new RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * https://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.4.1',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) {
				// in Node.js, io.js, or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.punycode = punycode;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module), (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	function parseUri (str) {
	  var o = parseUri.options
	    , m = o.parser[o.strictMode ? "strict" : "loose"].exec(str)
	    , uri = {}
	    , i = 14

	  while (i--) { uri[o.key[i]] = m[i] || "" }

	  uri[o.q.name] = {};
	  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
	    if ($1) { uri[o.q.name][$1] = $2 }
	  })

	  return uri
	}

	parseUri.options = {
	  strictMode: false
	, key: ['source','protocol','authority','userInfo','user','password','host','port','relative','path','directory','file','query','anchor']
	, q: {
	    name: 'queryKey'
	  , parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	  }
	, parser: {
	    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
	  , loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	  }
	}

	// makeURI 1.2.2 - create a URI from an object specification; compatible with
	// parseURI (http://blog.stevenlevithan.com/archives/parseuri)
	// (c) Niall Smart <niallsmart.com>
	// MIT License
	function makeUri(u) {
	  var uri = ''
	  if (u.protocol) {
	    uri += u.protocol + '://'
	  }
	  if (u.user) {
	    uri += u.user
	  }
	  if (u.password) {
	    uri += ':' + u.password
	  }
	  if (u.user || u.password) {
	    uri += '@'
	  }
	  if (u.host) {
	    uri += u.host
	  }
	  if (u.port) {
	    uri += ':' + u.port
	  }
	  if (u.path) {
	    uri += u.path
	  }
	  var qk = u.queryKey
	  var qs = []
	  for (var k in qk) {
	    if (!qk.hasOwnProperty(k)) {
	      continue
	    }
	    var v = encodeURIComponent(qk[k])
	    k = encodeURIComponent(k)
	    if (v) {
	      qs.push(k + '=' + v)
	    }
	    else {
	      qs.push(k)
	    }
	  }
	  if (qs.length > 0) {
	    uri += '?' + qs.join('&')
	  }
	  if (u.anchor) {
	    uri += '#' + u.anchor
	  }
	  return uri
	}

	module.exports = {
	  parseUri: parseUri
	, makeUri: makeUri
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var format = __webpack_require__(11).formatObj
	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var NON_FIELD_ERRORS = '__all__'

	/**
	 * A validation error, containing a list of messages. Single messages (e.g.
	 * those produced by validators) may have an associated error code and
	 * parameters to allow customisation by fields.
	 *
	 * The message argument can be a single error, a list of errors, or an object
	 * that maps field names to lists of errors. What we define as an "error" can
	 * be either a simple string or an instance of ValidationError with its message
	 * attribute set, and what we define as list or object can be an actual list or
	 * object or an instance of ValidationError with its errorList or errorObj
	 * property set.
	 */
	var ValidationError = Concur.extend({
	  constructor: function ValidationError(message, kwargs) {
	    if (!(this instanceof ValidationError)) { return new ValidationError(message, kwargs) }
	    kwargs = object.extend({code: null, params: null}, kwargs)

	    var code = kwargs.code
	    var params = kwargs.params

	    if (message instanceof ValidationError) {
	      if (object.hasOwn(message, 'errorObj')) {
	        message = message.errorObj
	      }
	      else if (object.hasOwn(message, 'message')) {
	        message = message.errorList
	      }
	      else {
	        code = message.code
	        params = message.params
	        message = message.message
	      }
	    }

	    if (is.Object(message)) {
	      this.errorObj = {}
	      Object.keys(message).forEach(function(field) {
	        var messages = message[field]
	        if (!(messages instanceof ValidationError)) {
	          messages = ValidationError(messages)
	        }
	        this.errorObj[field] = messages.errorList
	      }.bind(this))
	    }
	    else if (is.Array(message)) {
	      this.errorList = []
	      message.forEach(function(message) {
	        // Normalize strings to instances of ValidationError
	        if (!(message instanceof ValidationError)) {
	          message = ValidationError(message)
	        }
	        this.errorList.push.apply(this.errorList, message.errorList)
	      }.bind(this))
	    }
	    else {
	      this.message = message
	      this.code = code
	      this.params = params
	      this.errorList = [this]
	    }
	  }
	})

	/**
	 * Returns validation messages as an object with field names as properties.
	 * Throws an error if this validation error was not created with a field error
	 * object.
	 */
	ValidationError.prototype.messageObj = function() {
	  if (!object.hasOwn(this, 'errorObj')) {
	    throw new Error('ValidationError has no errorObj')
	  }
	  return this.__iter__()
	}

	/**
	 * Returns validation messages as a list.
	 */
	ValidationError.prototype.messages = function() {
	  if (object.hasOwn(this, 'errorObj')) {
	    var messages = []
	    Object.keys(this.errorObj).forEach(function(field) {
	      var errors = this.errorObj[field]
	      messages.push.apply(messages, ValidationError(errors).__iter__())
	    }.bind(this))
	    return messages
	  }
	  else {
	    return this.__iter__()
	  }
	}

	/**
	 * Generates an object of field error messags or a list of error messages
	 * depending on how this ValidationError has been constructed.
	 */
	ValidationError.prototype.__iter__ = function() {
	  if (object.hasOwn(this, 'errorObj')) {
	    var messageObj = {}
	    Object.keys(this.errorObj).forEach(function(field) {
	      var errors = this.errorObj[field]
	      messageObj[field] = ValidationError(errors).__iter__()
	    }.bind(this))
	    return messageObj
	  }
	  else {
	    return this.errorList.map(function(error) {
	      var message = error.message
	      if (error.params) {
	        message = format(message, error.params)
	      }
	      return message
	    })
	  }
	}

	/**
	 * Passes this error's messages on to the given error object, adding to a
	 * particular field's error messages if already present.
	 */
	ValidationError.prototype.updateErrorObj = function(errorObj) {
	  if (object.hasOwn(this, 'errorObj')) {
	    if (errorObj) {
	      Object.keys(this.errorObj).forEach(function(field) {
	        if (!object.hasOwn(errorObj, field)) {
	          errorObj[field] = []
	        }
	        var errors = errorObj[field]
	        errors.push.apply(errors, this.errorObj[field])
	      }.bind(this))
	    }
	    else {
	      errorObj = this.errorObj
	    }
	  }
	  else {
	    if (!object.hasOwn(errorObj, NON_FIELD_ERRORS)) {
	      errorObj[NON_FIELD_ERRORS] = []
	    }
	    var nonFieldErrors = errorObj[NON_FIELD_ERRORS]
	    nonFieldErrors.push.apply(nonFieldErrors, this.errorList)
	  }
	  return errorObj
	}

	ValidationError.prototype.toString = function() {
	  return ('ValidationError(' + JSON.stringify(this.__iter__()) + ')')
	}

	module.exports = {
	  ValidationError: ValidationError
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var slice = Array.prototype.slice
	  , formatRegExp = /%[%s]/g
	  , formatObjRegExp = /({{?)(\w+)}/g

	/**
	 * Replaces %s placeholders in a string with positional arguments.
	 */
	function format(s) {
	  return formatArr(s, slice.call(arguments, 1))
	}

	/**
	 * Replaces %s placeholders in a string with array contents.
	 */
	function formatArr(s, a) {
	  var i = 0
	  return s.replace(formatRegExp, function(m) { return m == '%%' ? '%' : a[i++] })
	}

	/**
	 * Replaces {propertyName} placeholders in a string with object properties.
	 */
	function formatObj(s, o) {
	  return s.replace(formatObjRegExp, function(m, b, p) { return b.length == 2 ? m.slice(1) : o[p] })
	}

	var units = 'kMGTPEZY'
	  , stripDecimals = /\.00$|0$/

	/**
	 * Formats bytes as a file size with the appropriately scaled units.
	 */
	function fileSize(bytes, threshold) {
	  threshold = Math.min(threshold || 768, 1024)
	  var i = -1
	    , unit = 'bytes'
	    , size = bytes
	  while (size > threshold && i < units.length) {
	    size = size / 1024
	    i++
	  }
	  if (i > -1) {
	    unit = units.charAt(i) + 'B'
	  }
	  return size.toFixed(2).replace(stripDecimals, '') + ' ' + unit
	}

	module.exports = {
	  format: format
	, formatArr: formatArr
	, formatObj: formatObj
	, fileSize: fileSize
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var errors = __webpack_require__(10)

	var ValidationError = errors.ValidationError

	var hexRE = /^[0-9a-f]+$/

	/**
	 * Cleans a IPv6 address string.
	 *
	 * Validity is checked by calling isValidIPv6Address() - if an invalid address
	 * is passed, a ValidationError is thrown.
	 *
	 * Replaces the longest continious zero-sequence with '::' and removes leading
	 * zeroes and makes sure all hextets are lowercase.
	 */
	function cleanIPv6Address(ipStr, kwargs) {
	  kwargs = object.extend({
	    unpackIPv4: false, errorMessage: 'This is not a valid IPv6 address.'
	  }, kwargs)

	  var bestDoublecolonStart = -1
	  var bestDoublecolonLen = 0
	  var doublecolonStart = -1
	  var doublecolonLen = 0

	  if (!isValidIPv6Address(ipStr)) {
	    throw ValidationError(kwargs.errorMessage, {code: 'invalid'})
	  }

	  // This algorithm can only handle fully exploded IP strings
	  ipStr = _explodeShorthandIPstring(ipStr)
	  ipStr = _sanitiseIPv4Mapping(ipStr)

	  // If needed, unpack the IPv4 and return straight away
	  if (kwargs.unpackIPv4) {
	    var ipv4Unpacked = _unpackIPv4(ipStr)
	    if (ipv4Unpacked) {
	      return ipv4Unpacked
	    }
	  }

	  var hextets = ipStr.split(':')

	  for (var i = 0, l = hextets.length; i < l; i++) {
	    // Remove leading zeroes
	    hextets[i] = hextets[i].replace(/^0+/, '')
	    if (hextets[i] === '') {
	      hextets[i] = '0'
	    }

	    // Determine best hextet to compress
	    if (hextets[i] == '0') {
	      doublecolonLen += 1
	      if (doublecolonStart == -1) {
	        // Start a sequence of zeros
	        doublecolonStart = i
	      }
	      if (doublecolonLen > bestDoublecolonLen) {
	        // This is the longest sequence so far
	        bestDoublecolonLen = doublecolonLen
	        bestDoublecolonStart = doublecolonStart
	      }
	    }
	    else {
	      doublecolonLen = 0
	      doublecolonStart = -1
	    }
	  }

	  // Compress the most suitable hextet
	  if (bestDoublecolonLen > 1) {
	    var bestDoublecolonEnd = bestDoublecolonStart + bestDoublecolonLen
	    // For zeros at the end of the address
	    if (bestDoublecolonEnd == hextets.length) {
	      hextets.push('')
	    }
	    hextets.splice(bestDoublecolonStart, bestDoublecolonLen, '')
	    // For zeros at the beginning of the address
	    if (bestDoublecolonStart === 0) {
	      hextets.unshift('')
	    }
	  }

	  return hextets.join(':').toLowerCase()
	}

	/**
	 * Sanitises IPv4 mapping in a expanded IPv6 address.
	 *
	 * This converts ::ffff:0a0a:0a0a to ::ffff:10.10.10.10.
	 * If there is nothing to sanitise, returns an unchanged string.
	 */
	function _sanitiseIPv4Mapping(ipStr) {
	  if (ipStr.toLowerCase().indexOf('0000:0000:0000:0000:0000:ffff:') !== 0) {
	    // Not an ipv4 mapping
	    return ipStr
	  }

	  var hextets = ipStr.split(':')

	  if (hextets[hextets.length - 1].indexOf('.') != -1) {
	    // Already sanitized
	    return ipStr
	  }

	  var ipv4Address = [
	    parseInt(hextets[6].substring(0, 2), 16)
	  , parseInt(hextets[6].substring(2, 4), 16)
	  , parseInt(hextets[7].substring(0, 2), 16)
	  , parseInt(hextets[7].substring(2, 4), 16)
	  ].join('.')

	  return hextets.slice(0, 6).join(':') +  ':' + ipv4Address
	}

	/**
	 * Unpacks an IPv4 address that was mapped in a compressed IPv6 address.
	 *
	 * This converts 0000:0000:0000:0000:0000:ffff:10.10.10.10 to 10.10.10.10.
	 * If there is nothing to sanitize, returns null.
	 */
	function _unpackIPv4(ipStr) {
	  if (ipStr.toLowerCase().indexOf('0000:0000:0000:0000:0000:ffff:') !== 0) {
	    return null
	  }

	  var hextets = ipStr.split(':')
	  return hextets.pop()
	}

	/**
	 * Determines if we have a valid IPv6 address.
	 */
	function isValidIPv6Address(ipStr) {
	  var validateIPv4Address = __webpack_require__(3).validateIPv4Address

	  // We need to have at least one ':'
	  if (ipStr.indexOf(':') == -1) {
	    return false
	  }

	  // We can only have one '::' shortener
	  if (String_count(ipStr, '::') > 1) {
	    return false
	  }

	  // '::' should be encompassed by start, digits or end
	  if (ipStr.indexOf(':::') != -1) {
	    return false
	  }

	  // A single colon can neither start nor end an address
	  if ((ipStr.charAt(0) == ':' && ipStr.charAt(1) != ':') ||
	      (ipStr.charAt(ipStr.length - 1) == ':' &&
	       ipStr.charAt(ipStr.length - 2) != ':')) {
	    return false
	  }

	  // We can never have more than 7 ':' (1::2:3:4:5:6:7:8 is invalid)
	  if (String_count(ipStr, ':') > 7) {
	    return false
	  }

	  // If we have no concatenation, we need to have 8 fields with 7 ':'
	  if (ipStr.indexOf('::') == -1 && String_count(ipStr, ':') != 7) {
	    // We might have an IPv4 mapped address
	    if (String_count(ipStr, '.') != 3) {
	      return false
	    }
	  }

	  ipStr = _explodeShorthandIPstring(ipStr)

	  // Now that we have that all squared away, let's check that each of the
	  // hextets are between 0x0 and 0xFFFF.
	  var hextets = ipStr.split(':')
	  for (var i = 0, l = hextets.length, hextet; i < l; i++) {
	    hextet = hextets[i]
	    if (String_count(hextet, '.') == 3) {
	      // If we have an IPv4 mapped address, the IPv4 portion has to
	      // be at the end of the IPv6 portion.
	      if (ipStr.split(':').pop() != hextet) {
	        return false
	      }
	      try {
	        validateIPv4Address(hextet)
	      }
	      catch (e) {
	        if (!(e instanceof ValidationError)) {
	          throw e
	        }
	        return false
	      }
	    }
	    else {
	      if (!hexRE.test(hextet)) {
	        return false
	      }
	      var intValue = parseInt(hextet, 16)
	      if (isNaN(intValue) || intValue < 0x0 || intValue > 0xFFFF) {
	        return false
	      }
	    }
	  }

	  return true
	}

	/**
	 * Expands a shortened IPv6 address.
	 */
	function _explodeShorthandIPstring(ipStr) {
	  if (!_isShortHand(ipStr)) {
	    // We've already got a longhand ipStr
	    return ipStr
	  }

	  var newIp = []
	  var hextets = ipStr.split('::')

	  // If there is a ::, we need to expand it with zeroes to get to 8 hextets -
	  // unless there is a dot in the last hextet, meaning we're doing v4-mapping
	  var fillTo = (ipStr.split(':').pop().indexOf('.') != -1) ? 7 : 8

	  if (hextets.length > 1) {
	    var sep = hextets[0].split(':').length + hextets[1].split(':').length
	    newIp = hextets[0].split(':')
	    for (var i = 0, l = fillTo - sep; i < l; i++) {
	      newIp.push('0000')
	    }
	    newIp = newIp.concat(hextets[1].split(':'))
	  }
	  else {
	    newIp = ipStr.split(':')
	  }

	  // Now need to make sure every hextet is 4 lower case characters.
	  // If a hextet is < 4 characters, we've got missing leading 0's.
	  var retIp = []
	  for (i = 0, l = newIp.length; i < l; i++) {
	    retIp.push(zeroPadding(newIp[i], 4) + newIp[i].toLowerCase())
	  }
	  return retIp.join(':')
	}

	/**
	 * Determines if the address is shortened.
	 */
	function _isShortHand(ipStr) {
	  if (String_count(ipStr, '::') == 1) {
	    return true
	  }
	  var parts = ipStr.split(':')
	  for (var i = 0, l = parts.length; i < l; i++) {
	    if (parts[i].length < 4) {
	      return true
	    }
	  }
	  return false
	}

	// Utilities

	function zeroPadding(str, length) {
	  if (str.length >= length) {
	    return ''
	  }
	  return new Array(length - str.length + 1).join('0')
	}

	function String_count(str, subStr) {
	  return str.split(subStr).length - 1
	}

	module.exports = {
	  cleanIPv6Address: cleanIPv6Address
	, isValidIPv6Address: isValidIPv6Address
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var time = __webpack_require__(14)

	var defaultLocale = {lang: 'en'}

	var localeCache = {
	  en: {
	    DATE_INPUT_FORMATS: [
	      '%Y-%m-%d'                        // '2006-10-25'
	    , '%m/%d/%Y', '%m/%d/%y'            // '10/25/2006', '10/25/06'
	    , '%b %d %Y', '%b %d, %Y'           // 'Oct 25 2006', 'Oct 25, 2006'
	    , '%d %b %Y', '%d %b, %Y'           // '25 Oct 2006', '25 Oct, 2006'
	    , '%B %d %Y', '%B %d, %Y'           // 'October 25 2006', 'October 25, 2006'
	    , '%d %B %Y', '%d %B, %Y'           // '25 October 2006', '25 October, 2006'
	    ]
	  , DATETIME_INPUT_FORMATS: [
	      '%Y-%m-%d %H:%M:%S'               // '2006-10-25 14:30:59'
	    , '%Y-%m-%d %H:%M'                  // '2006-10-25 14:30'
	    , '%Y-%m-%d'                        // '2006-10-25'
	    , '%m/%d/%Y %H:%M:%S'               // '10/25/2006 14:30:59'
	    , '%m/%d/%Y %H:%M'                  // '10/25/2006 14:30'
	    , '%m/%d/%Y'                        // '10/25/2006'
	    , '%m/%d/%y %H:%M:%S'               // '10/25/06 14:30:59'
	    , '%m/%d/%y %H:%M'                  // '10/25/06 14:30'
	    , '%m/%d/%y'                        // '10/25/06'
	    ]
	  }
	, en_GB: {
	    DATE_INPUT_FORMATS: [
	      '%d/%m/%Y', '%d/%m/%y'            // '25/10/2006', '25/10/06'
	    , '%b %d %Y', '%b %d, %Y'           // 'Oct 25 2006', 'Oct 25, 2006'
	    , '%d %b %Y', '%d %b, %Y'           // '25 Oct 2006', '25 Oct, 2006'
	    , '%B %d %Y', '%B %d, %Y'           // 'October 25 2006', 'October 25, 2006'
	    , '%d %B %Y', '%d %B, %Y'           // '25 October 2006', '25 October, 2006'
	    ]
	  , DATETIME_INPUT_FORMATS: [
	      '%Y-%m-%d %H:%M:%S'               // '2006-10-25 14:30:59'
	    , '%Y-%m-%d %H:%M'                  // '2006-10-25 14:30'
	    , '%Y-%m-%d'                        // '2006-10-25'
	    , '%d/%m/%Y %H:%M:%S'               // '25/10/2006 14:30:59'
	    , '%d/%m/%Y %H:%M'                  // '25/10/2006 14:30'
	    , '%d/%m/%Y'                        // '25/10/2006'
	    , '%d/%m/%y %H:%M:%S'               // '25/10/06 14:30:59'
	    , '%d/%m/%y %H:%M'                  // '25/10/06 14:30'
	    , '%d/%m/%y'                        // '25/10/06'
	    ]
	  }
	}

	/**
	 * Adds a locale object to our own cache (for formats) and isomorph.time's cache
	 * (for time parsing/formatting).
	 * @param {string} lang
	 * @param {string=} locale
	 */
	function addLocale(lang, locale) {
	  localeCache[lang] = locale
	  time.locales[lang] = locale
	}

	/**
	 * Gets the most applicable locale, falling back to the language code if
	 * necessary and to the default locale if no matching locale was found.
	 * @param {string=} lang
	 */
	function getLocale(lang) {
	  if (lang) {
	    if (object.hasOwn(localeCache, lang)) {
	      return localeCache[lang]
	    }
	    if (lang.indexOf('_') != -1) {
	      lang = lang.split('_')[0]
	      if (object.hasOwn(localeCache, lang)) {
	        return localeCache[lang]
	      }
	    }
	  }
	  return localeCache[defaultLocale.lang]
	}

	/**
	 * Gets all applicable locales, with the most specific first, falling back to
	 * the default locale if necessary.
	 * @param {string=} lang
	 * @return {Array.<Object>}
	 */
	function getLocales(lang) {
	  if (lang) {
	    var locales = []
	    if (object.hasOwn(localeCache, lang)) {
	       locales.push(localeCache[lang])
	    }
	    if (lang.indexOf('_') != -1) {
	      lang = lang.split('_')[0]
	      if (object.hasOwn(localeCache, lang)) {
	        locales.push(localeCache[lang])
	      }
	    }
	    if (locales.length) {
	      return locales
	    }
	  }
	  return [localeCache[defaultLocale.lang]]
	}

	/**
	 * Sets the language code for the default locale.
	 * @param {string} lang
	 */
	function setDefaultLocale(lang) {
	  if (!object.hasOwn(localeCache, lang)) {
	    throw new Error('Unknown locale: ' + lang)
	  }
	  defaultLocale.lang = lang
	}

	/**
	 * @return {string} the language code for the default locale.
	 */
	function getDefaultLocale() {
	  return defaultLocale.lang
	}

	module.exports = {
	  addLocale: addLocale
	, getDefaultLocale: getDefaultLocale
	, getLocale: getLocale
	, getLocales: getLocales
	, setDefaultLocale: setDefaultLocale
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	/**
	 * Pads a number with a leading zero if necessary.
	 */
	function pad(number) {
	  return (number < 10 ? '0' + number : number)
	}

	/**
	 * Returns the index of item in list, or -1 if it's not in list.
	 */
	function indexOf(item, list) {
	  for (var i = 0, l = list.length; i < l; i++) {
	    if (item === list[i]) {
	      return i
	    }
	  }
	  return -1
	}

	/**
	 * Maps directive codes to regular expression patterns which will capture the
	 * data the directive corresponds to, or in the case of locale-dependent
	 * directives, a function which takes a locale and generates a regular
	 * expression pattern.
	 */
	var parserDirectives = {
	  // Locale's abbreviated month name
	  'b': function(l) { return '(' + l.b.join('|') + ')' }
	  // Locale's full month name
	, 'B': function(l) { return '(' + l.B.join('|') + ')' }
	  // Locale's equivalent of either AM or PM.
	, 'p': function(l) { return '(' + l.AM + '|' + l.PM + ')' }
	, 'd': '(\\d\\d?)' // Day of the month as a decimal number [01,31]
	, 'H': '(\\d\\d?)' // Hour (24-hour clock) as a decimal number [00,23]
	, 'I': '(\\d\\d?)' // Hour (12-hour clock) as a decimal number [01,12]
	, 'm': '(\\d\\d?)' // Month as a decimal number [01,12]
	, 'M': '(\\d\\d?)' // Minute as a decimal number [00,59]
	, 'S': '(\\d\\d?)' // Second as a decimal number [00,59]
	, 'y': '(\\d\\d?)' // Year without century as a decimal number [00,99]
	, 'Y': '(\\d{4})'  // Year with century as a decimal number
	, '%': '%'         // A literal '%' character
	}

	/**
	 * Maps directive codes to functions which take the date to be formatted and
	 * locale details (if required), returning an appropriate formatted value.
	 */
	var formatterDirectives = {
	  'a': function(d, l) { return l.a[d.getDay()] }
	, 'A': function(d, l) { return l.A[d.getDay()] }
	, 'b': function(d, l) { return l.b[d.getMonth()] }
	, 'B': function(d, l) { return l.B[d.getMonth()] }
	, 'd': function(d) { return pad(d.getDate(), 2) }
	, 'H': function(d) { return pad(d.getHours(), 2) }
	, 'M': function(d) { return pad(d.getMinutes(), 2) }
	, 'm': function(d) { return pad(d.getMonth() + 1, 2) }
	, 'S': function(d) { return pad(d.getSeconds(), 2) }
	, 'w': function(d) { return d.getDay() }
	, 'Y': function(d) { return d.getFullYear() }
	, '%': function(d) { return '%' }
	}

	/** Test for hanging percentage symbols. */
	var strftimeFormatCheck = /[^%]%$/

	/**
	 * A partial implementation of strptime which parses time details from a string,
	 * based on a format string.
	 * @param {String} format
	 * @param {Object} locale
	 */
	function TimeParser(format, locale) {
	  this.format = format
	  this.locale = locale
	  var cachedPattern = TimeParser._cache[locale.name + '|' + format]
	  if (cachedPattern !== undefined) {
	    this.re = cachedPattern[0]
	    this.matchOrder = cachedPattern[1]
	  }
	  else {
	    this.compilePattern()
	  }
	}

	/**
	 * Caches RegExps and match orders generated per locale/format string combo.
	 */
	TimeParser._cache = {}

	TimeParser.prototype.compilePattern = function() {
	  // Normalise whitespace before further processing
	  var format = this.format.split(/(?:\s|\t|\n)+/).join(' ')
	    , pattern = []
	    , matchOrder = []
	    , c
	    , directive

	  for (var i = 0, l = format.length; i < l; i++) {
	    c = format.charAt(i)
	    if (c != '%') {
	      if (c === ' ') {
	        pattern.push(' +')
	      }
	      else {
	        pattern.push(c)
	      }
	      continue
	    }

	    if (i == l - 1) {
	      throw new Error('strptime format ends with raw %')
	    }

	    c = format.charAt(++i)
	    directive = parserDirectives[c]
	    if (directive === undefined) {
	      throw new Error('strptime format contains an unknown directive: %' + c)
	    }
	    else if (is.Function(directive)) {
	      pattern.push(directive(this.locale))
	    }
	    else {
	      pattern.push(directive)
	    }

	    if (c != '%') {
	       matchOrder.push(c)
	    }
	  }

	  this.re = new RegExp('^' + pattern.join('') + '$')
	  this.matchOrder = matchOrder
	  TimeParser._cache[this.locale.name + '|' + this.format] = [this.re, matchOrder]
	}

	/**
	 * Attempts to extract date and time details from the given input.
	 * @param {string} input
	 * @return {Array.<number>}
	 */
	TimeParser.prototype.parse = function(input) {
	  var matches = this.re.exec(input)
	  if (matches === null) {
	    throw new Error('Time data did not match format: data=' + input +
	                    ', format=' + this.format)
	  }

	    // Default values for when more accurate values cannot be inferred
	  var time = [1900, 1, 1, 0, 0, 0]
	    // Matched time data, keyed by directive code
	    , data = {}

	  for (var i = 1, l = matches.length; i < l; i++) {
	    data[this.matchOrder[i - 1]] = matches[i]
	  }

	  // Extract year
	  if (data.hasOwnProperty('Y')) {
	    time[0] = parseInt(data.Y, 10)
	  }
	  else if (data.hasOwnProperty('y')) {
	    var year = parseInt(data.y, 10)
	    if (year < 68) {
	        year = 2000 + year
	    }
	    else if (year < 100) {
	        year = 1900 + year
	    }
	    time[0] = year
	  }

	  // Extract month
	  if (data.hasOwnProperty('m')) {
	    var month = parseInt(data.m, 10)
	    if (month < 1 || month > 12) {
	      throw new Error('Month is out of range: ' + month)
	    }
	    time[1] = month
	  }
	  else if (data.hasOwnProperty('B')) {
	    time[1] = indexOf(data.B, this.locale.B) + 1
	  }
	  else if (data.hasOwnProperty('b')) {
	    time[1] = indexOf(data.b, this.locale.b) + 1
	  }

	  // Extract day of month
	  if (data.hasOwnProperty('d')) {
	    var day = parseInt(data.d, 10)
	    if (day < 1 || day > 31) {
	      throw new Error('Day is out of range: ' + day)
	    }
	    time[2] = day
	  }

	  // Extract hour
	  var hour
	  if (data.hasOwnProperty('H')) {
	    hour = parseInt(data.H, 10)
	    if (hour > 23) {
	      throw new Error('Hour is out of range: ' + hour)
	    }
	    time[3] = hour
	  }
	  else if (data.hasOwnProperty('I')) {
	    hour = parseInt(data.I, 10)
	    if (hour < 1 || hour > 12) {
	      throw new Error('Hour is out of range: ' + hour)
	    }

	    // If we don't get any more information, we'll assume this time is
	    // a.m. - 12 a.m. is midnight.
	    if (hour == 12) {
	        hour = 0
	    }

	    time[3] = hour

	    if (data.hasOwnProperty('p')) {
	      if (data.p == this.locale.PM) {
	        // We've already handled the midnight special case, so it's
	        // safe to bump the time by 12 hours without further checks.
	        time[3] = time[3] + 12
	      }
	    }
	  }

	  // Extract minute
	  if (data.hasOwnProperty('M')) {
	    var minute = parseInt(data.M, 10)
	    if (minute > 59) {
	        throw new Error('Minute is out of range: ' + minute)
	    }
	    time[4] = minute
	  }

	  // Extract seconds
	  if (data.hasOwnProperty('S')) {
	    var second = parseInt(data.S, 10)
	    if (second > 59) {
	      throw new Error('Second is out of range: ' + second)
	    }
	    time[5] = second
	  }

	  // Validate day of month
	  day = time[2], month = time[1], year = time[0]
	  if (((month == 4 || month == 6 || month == 9 || month == 11) &&
	      day > 30) ||
	      (month == 2 && day > ((year % 4 === 0 && year % 100 !== 0 ||
	                             year % 400 === 0) ? 29 : 28))) {
	    throw new Error('Day is out of range: ' + day)
	  }

	  return time
	}

	var time  = {
	  /** Default locale name. */
	  defaultLocale: 'en'

	  /** Locale details. */
	, locales: {
	    en: {
	      name: 'en'
	    , a: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	    , A: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
	          'Friday', 'Saturday']
	    , AM: 'AM'
	    , b: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	          'Oct', 'Nov', 'Dec']
	    , B: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
	          'August', 'September', 'October', 'November', 'December']
	    , PM: 'PM'
	    }
	  }
	}

	/**
	 * Retrieves the locale with the given code.
	 * @param {string} code
	 * @return {Object}
	 */
	var getLocale = time.getLocale = function(code) {
	  if (code) {
	    if (time.locales.hasOwnProperty(code)) {
	      return time.locales[code]
	    }
	    else if (code.length > 2) {
	      // If we appear to have more than a language code, try the
	      // language code on its own.
	      var languageCode = code.substring(0, 2)
	      if (time.locales.hasOwnProperty(languageCode)) {
	        return time.locales[languageCode]
	      }
	    }
	  }
	  return time.locales[time.defaultLocale]
	}

	/**
	 * Parses time details from a string, based on a format string.
	 * @param {string} input
	 * @param {string} format
	 * @param {string=} locale
	 * @return {Array.<number>}
	 */
	var strptime = time.strptime = function(input, format, locale) {
	  return new TimeParser(format, getLocale(locale)).parse(input)
	}

	/**
	 * Convenience wrapper around time.strptime which returns a JavaScript Date.
	 * @param {string} input
	 * @param {string} format
	 * @param {string=} locale
	 * @return {date}
	 */
	time.strpdate = function(input, format, locale) {
	  var t = strptime(input, format, locale)
	  return new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5])
	}

	/**
	 * A partial implementation of <code>strftime</code>, which formats a date
	 * according to a format string. An Error will be thrown if an invalid
	 * format string is given.
	 * @param {date} date
	 * @param {string} format
	 * @param {string=} locale
	 * @return {string}
	 */
	time.strftime = function(date, format, locale) {
	  if (strftimeFormatCheck.test(format)) {
	    throw new Error('strftime format ends with raw %')
	  }
	  locale = getLocale(locale)
	  return format.replace(/(%.)/g, function(s, f) {
	    var code = f.charAt(1)
	    if (typeof formatterDirectives[code] == 'undefined') {
	      throw new Error('strftime format contains an unknown directive: ' + f)
	    }
	    return formatterDirectives[code](date, locale)
	  })
	}

	module.exports = time


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var getFormData = __webpack_require__(17)

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	/**
	 * Replaces String {placeholders} with properties of a given object, but
	 * interpolates into and returns an Array instead of a String.
	 * By default, any resulting empty strings are stripped out of the Array. To
	 * disable this, pass an options object with a 'strip' property which is false.
	 */
	function formatToArray(str, obj, options) {
	  var parts = str.split(/\{(\w+)\}/g)
	  for (var i = 1, l = parts.length; i < l; i += 2) {
	    parts[i] = (object.hasOwn(obj, parts[i])
	                ? obj[parts[i]]
	                : '{' + parts[i] + '}')
	  }
	  if (!options || (options && options.strip !== false)) {
	    parts = parts.filter(function(p) { return p !== ''})
	  }
	  return parts
	}

	/**
	 * Get named properties from an object.
	 * @param src {Object}
	 * @param props {Array.<string>}
	 * @return {Object}
	 */
	function getProps(src, props) {
	  var result = {}
	  for (var i = 0, l = props.length; i < l ; i++) {
	    var prop = props[i]
	    if (object.hasOwn(src, prop)) {
	      result[prop] = src[prop]
	    }
	  }
	  return result
	}

	/**
	 * Get a named property from an object, calling it and returning its result if
	 * it's a function.
	 */
	function maybeCall(obj, prop) {
	  var value = obj[prop]
	  if (is.Function(value)) {
	    value = value.call(obj)
	  }
	  return value
	}

	/**
	 * Creates a list of choice pairs from a list of objects using the given named
	 * properties for the value and label.
	 */
	function makeChoices(list, valueProp, labelProp) {
	  return list.map(function(item) {
	    return [maybeCall(item, valueProp), maybeCall(item, labelProp)]
	  })
	}

	/**
	 * Validates choice input and normalises lazy, non-Array choices to be
	 * [value, label] pairs
	 * @return {Array} a normalised version of the given choices.
	 * @throws if an Array with length != 2 was found where a choice pair was expected.
	 */
	function normaliseChoices(choices) {
	  if (!choices.length) { return choices }

	  var normalisedChoices = []
	  for (var i = 0, l = choices.length, choice; i < l; i++) {
	    choice = choices[i]
	    if (!is.Array(choice)) {
	      // TODO In the development build, emit a warning about a choice being
	      //      automatically converted from 'blah' to ['blah', 'blah'] in case it
	      //      wasn't intentional
	      choice = [choice, choice]
	    }
	    if (choice.length != 2) {
	      throw new Error('Choices in a choice list must contain exactly 2 values, ' +
	                      'but got ' + JSON.stringify(choice))
	    }
	    if (is.Array(choice[1])) {
	      var normalisedOptgroupChoices = []
	      // This is an optgroup, so look inside the group for options
	      var optgroupChoices = choice[1]
	      for (var j = 0, m = optgroupChoices.length, optgroupChoice; j < m; j++) {
	        optgroupChoice = optgroupChoices[j]
	        if (!is.Array(optgroupChoice)) {
	          optgroupChoice = [optgroupChoice, optgroupChoice]
	        }
	        if (optgroupChoice.length != 2) {
	          throw new Error('Choices in an optgroup choice list must contain ' +
	                          'exactly 2 values, but got ' +
	                          JSON.stringify(optgroupChoice))
	        }
	        normalisedOptgroupChoices.push(optgroupChoice)
	      }
	      normalisedChoices.push([choice[0], normalisedOptgroupChoices])
	    }
	    else {
	      normalisedChoices.push(choice)
	    }
	  }
	  return normalisedChoices
	}

	/**
	 * @param {Array.<string>} events
	 */
	function normaliseValidationEvents(events) {
	  events = events.map(function(event) {
	    if (event.indexOf('on') === 0) { return event }
	    return 'on' + event.charAt(0).toUpperCase() + event.substr(1)
	  })
	  var onChangeIndex = events.indexOf('onChange')
	  if (onChangeIndex != -1) {
	    events.splice(onChangeIndex, 1)
	  }
	  return {events: events, onChange: (onChangeIndex != -1)}
	}

	/**
	 * @param {string} events
	 */
	function normaliseValidationString(events) {
	  return normaliseValidationEvents(strip(events).split(/ +/g))
	}

	/**
	 * @param {(string|Object)} validation
	 */
	function normaliseValidation(validation) {
	  if (!validation || validation === 'manual') {
	    return validation
	  }
	  else if (validation === 'auto') {
	    return {events: ['onBlur'], onChange: true, onChangeDelay: 369}
	  }
	  else if (is.String(validation)) {
	    return normaliseValidationString(validation)
	  }
	  else if (is.Object(validation)) {
	    var normalised
	    if (is.String(validation.on)) {
	      normalised = normaliseValidationString(validation.on)
	    }
	    else if (is.Array(validation.on)) {
	      normalised = normaliseValidationEvents(validation.on)
	    }
	    else {
	      throw new Error("Validation config Objects must have an 'on' String or Array")
	    }
	    normalised.onChangeDelay = object.get(validation, 'onChangeDelay', validation.delay)
	    return normalised
	  }
	  throw new Error('Unexpected validation config: ' + validation)
	}

	/**
	 * Converts 'firstName' and 'first_name' to 'First name', and
	 * 'SHOUTING_LIKE_THIS' to 'SHOUTING LIKE THIS'.
	 */
	var prettyName = (function() {
	  var capsRE = /([A-Z]+)/g
	  var splitRE = /[ _]+/
	  var allCapsRE = /^[A-Z][A-Z0-9]+$/

	  return function(name) {
	    // Prefix sequences of caps with spaces and split on all space
	    // characters.
	    var parts = name.replace(capsRE, ' $1').split(splitRE)

	    // If we had an initial cap...
	    if (parts[0] === '') {
	      parts.splice(0, 1)
	    }

	    // Give the first word an initial cap and all subsequent words an
	    // initial lowercase if not all caps.
	    for (var i = 0, l = parts.length; i < l; i++) {
	      if (i === 0) {
	        parts[0] = parts[0].charAt(0).toUpperCase() +
	                   parts[0].substr(1)
	      }
	      else if (!allCapsRE.test(parts[i])) {
	        parts[i] = parts[i].charAt(0).toLowerCase() +
	                   parts[i].substr(1)
	      }
	    }

	    return parts.join(' ')
	  }
	})()

	/**
	 * Coerces to string and strips leading and trailing spaces.
	 */
	var strip = function() {
	  var stripRE =/(^\s+|\s+$)/g
	  return function strip(s) {
	    return (''+s).replace(stripRE, '')
	  }
	}()

	/**
	 * From Underscore.js 1.5.2
	 * http://underscorejs.org
	 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 *
	 * Modified to give the returned function:
	 * - a .cancel() method which prevents the debounced function being called.
	 * - a .trigger() method which calls the debounced function immediately.
	 */
	function debounce(func, wait, immediate) {
	  var timeout, args, context, timestamp, result
	  var debounced = function() {
	    context = this
	    args = arguments
	    timestamp = new Date()
	    var later = function() {
	      var last = (new Date()) - timestamp
	      if (last < wait) {
	        timeout = setTimeout(later, wait - last)
	      } else {
	        timeout = null
	        if (!immediate) { result = func.apply(context, args) }
	      }
	    };
	    var callNow = immediate && !timeout
	    if (!timeout) {
	      timeout = setTimeout(later, wait)
	    }
	    if (callNow) { result = func.apply(context, args) }
	    return result
	  }

	  // Clear any pending timeout
	  debounced.cancel = function() {
	    if (timeout) {
	      clearTimeout(timeout)
	    }
	  }

	  // Clear any pending timeout and execute the function immediately
	  debounced.trigger = function() {
	    debounced.cancel()
	    return func.apply(context, args)
	  }

	  return debounced
	}

	/**
	 * Returns a function with a .cancel() function which can be used to prevent the
	 * given function from being called. If the given function has an onCancel(),
	 * it will be called when it's being cancelled.
	 *
	 * Use case: triggering an asynchronous function with new data while an existing
	 * function for the same task but with old data is still pending a callback, so
	 * the callback only gets called for the last one to run.
	 */
	function cancellable(func) {
	  var cancelled = false

	  var cancellabled = function() {
	    if (!cancelled) {
	      func.apply(null, arguments)
	    }
	  }

	  cancellabled.cancel = function() {
	    cancelled = true
	    if (is.Function(func.onCancel)) {
	      func.onCancel()
	    }
	  }

	  return cancellabled
	}

	/**
	 * Wrapper for getFormData which allows you to pass a React form ref.
	 * @param {HTMLFormElement|ReactElement} form a form element.
	 * @return {Object.<string,(string|Array.<string>)>} an object containing the
	 *    submittable value(s) held in each of the form's elements.
	 */
	function getMaybeReactFormData(form) {
	  if (typeof form.getDOMNode == 'function') {
	    form = form.getDOMNode()
	  }
	  return getFormData(form)
	}

	/**
	 * Extracts data from a <form> and validates it with a list of forms and/or
	 * formsets.
	 * @param form the <form> into which any given forms and formsets have been
	 *   rendered - this can be a React <form> component or a real <form> DOM node.
	 * @param {Array.<(Form|FormSet)>} formsAndFormsets a list of forms and/or
	 *   formsets to be used to validate the <form>'s input data.
	 * @return {boolean} true if the <form>'s input data are valid according to all
	 *   given forms and formsets.
	 */
	function validateAll(form, formsAndFormsets) {
	  var data = getMaybeReactFormData(form)
	  var isValid = true
	  for (var i = 0, l = formsAndFormsets.length; i < l; i++) {
	    if (!formsAndFormsets[i].setFormData(data)) {
	      isValid = false
	    }
	  }
	  return isValid
	}

	/**
	 * Returns true if every form/formset is valid.
	 */
	function allValid(formsOrFormsets) {
	  var valid = true
	  for (var i = 0, l = formsOrFormsets.length; i < l; i++) {
	    if (!formsOrFormsets[i].isValid()) {
	      valid = false
	    }
	  }
	  return valid
	}

	var info = function() {}
	var warning = function() {}

	if ('production' !== process.env.NODE_ENV) {
	  info = function(message) {
	    console.warn('[newforms] ' + message)
	  }
	  warning = function(message) {
	    console.warn('[newforms] Warning: ' + message)
	  }
	}

	function autoIdChecker(props, propName, componentName, location) {
	  var autoId = props.autoId
	  if (props.autoId && !(is.String(autoId) && autoId.indexOf('{name}') != -1)) {
	    return new Error(
	      'Invalid `autoId` ' + location + ' supplied to ' +
	      '`' + componentName + '`. Must be falsy or a String containing a ' +
	      '`{name}` placeholder'
	    )
	  }
	}

	module.exports = {
	  allValid: allValid
	, autoIdChecker: autoIdChecker
	, cancellable: cancellable
	, debounce: debounce
	, info: info
	, formatToArray: formatToArray
	, getFormData: getMaybeReactFormData
	, getProps: getProps
	, makeChoices: makeChoices
	, normaliseChoices: normaliseChoices
	, normaliseValidation: normaliseValidation
	, prettyName: prettyName
	, strip: strip
	, validateAll: validateAll
	, warning: warning
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var NODE_LIST_CLASSES = {
	  '[object HTMLCollection]': true,
	  '[object NodeList]': true,
	  '[object RadioNodeList]': true
	};

	// .type values for elements which can appear in .elements and should be ignored
	var IGNORED_ELEMENT_TYPES = {
	  'button': true,
	  'fieldset': true,
	  // 'keygen': true,
	  // 'output': true,
	  'reset': true,
	  'submit': true
	};

	var CHECKED_INPUT_TYPES = {
	  'checkbox': true,
	  'radio': true
	};

	var TRIM_RE = /^\s+|\s+$/g;

	var slice = Array.prototype.slice;
	var toString = Object.prototype.toString;

	/**
	 * @param {HTMLFormElement} form
	 * @param {Object} options
	 * @return {Object.<string,(string|Array.<string>)>} an object containing
	 *   submittable value(s) held in the form's .elements collection, with
	 *   properties named as per element names or ids.
	 */
	function getFormData(form) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? { trim: false } : arguments[1];

	  if (!form) {
	    throw new Error('A form is required by getFormData, was given form=' + form);
	  }

	  var data = {};
	  var elementName = undefined;
	  var elementNames = [];
	  var elementNameLookup = {};

	  // Get unique submittable element names for the form
	  for (var i = 0, l = form.elements.length; i < l; i++) {
	    var element = form.elements[i];
	    if (IGNORED_ELEMENT_TYPES[element.type] || element.disabled) {
	      continue;
	    }
	    elementName = element.name || element.id;
	    if (elementName && !elementNameLookup[elementName]) {
	      elementNames.push(elementName);
	      elementNameLookup[elementName] = true;
	    }
	  }

	  // Extract element data name-by-name for consistent handling of special cases
	  // around elements which contain multiple inputs.
	  for (var i = 0, l = elementNames.length; i < l; i++) {
	    elementName = elementNames[i];
	    var value = getNamedFormElementData(form, elementName, options);
	    if (value != null) {
	      data[elementName] = value;
	    }
	  }

	  return data;
	}

	/**
	 * @param {HTMLFormElement} form
	 * @param {string} elementName
	 * @param {Object} options
	 * @return {(string|Array.<string>)} submittable value(s) in the form for a
	 *   named element from its .elements collection, or null if there was no
	 *   element with that name or the element had no submittable value(s).
	 */
	function getNamedFormElementData(form, elementName) {
	  var options = arguments.length <= 2 || arguments[2] === undefined ? { trim: false } : arguments[2];

	  if (!form) {
	    throw new Error('A form is required by getNamedFormElementData, was given form=' + form);
	  }
	  if (!elementName && toString.call(elementName) !== '[object String]') {
	    throw new Error('A form element name is required by getNamedFormElementData, was given elementName=' + elementName);
	  }

	  var element = form.elements[elementName];
	  if (!element || element.disabled) {
	    return null;
	  }

	  if (!NODE_LIST_CLASSES[toString.call(element)]) {
	    return getFormElementValue(element, options.trim);
	  }

	  // Deal with multiple form controls which have the same name
	  var data = [];
	  var allRadios = true;
	  for (var i = 0, l = element.length; i < l; i++) {
	    if (element[i].disabled) {
	      continue;
	    }
	    if (allRadios && element[i].type !== 'radio') {
	      allRadios = false;
	    }
	    var value = getFormElementValue(element[i], options.trim);
	    if (value != null) {
	      data = data.concat(value);
	    }
	  }

	  // Special case for an element with multiple same-named inputs which were all
	  // radio buttons: if there was a selected value, only return the value.
	  if (allRadios && data.length === 1) {
	    return data[0];
	  }

	  return data.length > 0 ? data : null;
	}

	/**
	 * @param {HTMLElement} element a form element.
	 * @param {booleam} trim should values for text entry inputs be trimmed?
	 * @return {(string|Array.<string>|File|Array.<File>)} the element's submittable
	 *   value(s), or null if it had none.
	 */
	function getFormElementValue(element, trim) {
	  var value = null;
	  var type = element.type;

	  if (type === 'select-one') {
	    if (element.options.length) {
	      value = element.options[element.selectedIndex].value;
	    }
	    return value;
	  }

	  if (type === 'select-multiple') {
	    value = [];
	    for (var i = 0, l = element.options.length; i < l; i++) {
	      if (element.options[i].selected) {
	        value.push(element.options[i].value);
	      }
	    }
	    if (value.length === 0) {
	      value = null;
	    }
	    return value;
	  }

	  // If a file input doesn't have a files attribute, fall through to using its
	  // value attribute.
	  if (type === 'file' && 'files' in element) {
	    if (element.multiple) {
	      value = slice.call(element.files);
	      if (value.length === 0) {
	        value = null;
	      }
	    } else {
	      // Should be null if not present, according to the spec
	      value = element.files[0];
	    }
	    return value;
	  }

	  if (!CHECKED_INPUT_TYPES[type]) {
	    value = trim ? element.value.replace(TRIM_RE, '') : element.value;
	  } else if (element.checked) {
	    value = element.value;
	  }

	  return value;
	}

	getFormData.getNamedFormElementData = getNamedFormElementData;

	exports['default'] = getFormData;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var time = __webpack_require__(14)

	var formats = __webpack_require__(19)
	var locales = __webpack_require__(13)

	var Field = __webpack_require__(20)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError
	var $__1=  __webpack_require__(15),strip=$__1.strip

	/**
	 * Base field for fields which validate that their input is a date or time.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var BaseTemporalField = Field.extend({
	  inputFormatType: ''
	, constructor: function BaseTemporalField(kwargs) {
	    kwargs = object.extend({inputFormats: null}, kwargs)
	    Field.call(this, kwargs)
	    this.inputFormats = kwargs.inputFormats
	  }
	})

	/**
	 * Validates that its input is a valid date or time.
	 * @param {(string|Date)} value user input.
	 * @return {Date}
	 * @throws {ValidationError} if the input is invalid.
	 */
	BaseTemporalField.prototype.toJavaScript = function(value) {
	  if (!is.Date(value)) {
	    value = strip(value)
	  }
	  if (is.String(value)) {
	    if (this.inputFormats === null) {
	      this.inputFormats = formats.getFormat(this.inputFormatType)
	    }
	    for (var i = 0, l = this.inputFormats.length; i < l; i++) {
	      try {
	        return this.strpdate(value, this.inputFormats[i])
	      }
	      catch (e) {
	        // pass
	      }
	    }
	  }
	  throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	}

	/**
	 * Creates a Date from the given input if it's valid based on a format.
	 * @param {string} value
	 * @param {string} format
	 * @return {Date}
	 */
	BaseTemporalField.prototype.strpdate = function(value, format) {
	  return time.strpdate(value, format, locales.getDefaultLocale())
	}

	BaseTemporalField.prototype._hasChanged = function(initial, data) {
	  try {
	    data = this.toJavaScript(data)
	  }
	  catch (e) {
	    if (!(e instanceof ValidationError)) { throw e }
	    return true
	  }
	  initial = this.toJavaScript(initial)
	  if (!!initial && !!data) {
	    return initial.getTime() !== data.getTime()
	  }
	  else {
	    return initial !== data
	  }
	}


	module.exports = BaseTemporalField

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var locales = __webpack_require__(13)

	/**
	 * Standard input formats which will always be accepted.
	 */
	var ISO_INPUT_FORMATS = {
	  'DATE_INPUT_FORMATS': ['%Y-%m-%d']
	, 'TIME_INPUT_FORMATS': ['%H:%M:%S', '%H:%M']
	, 'DATETIME_INPUT_FORMATS': [
	    '%Y-%m-%d %H:%M:%S'
	  , '%Y-%m-%d %H:%M'
	  , '%Y-%m-%d'
	  ]
	}

	var formatCache = {}

	/**
	 * Gets all acceptable formats of a certain type (e.g. DATE_INPUT_FORMATS) for a
	 * particular language code. All date/time formats will have the applicable ISO
	 * formats added as lowest-precedence.
	 * If an unknown language code is given, the default locale's formats will be
	 * used instead.
	 * If the locale doesn't have configuration for the format type, only the ISO
	 * formats will be returned.
	 * @param {string} formatType
	 * @param {string=} lang language code - if not given, the default locale's
	 *   formats will be returned.
	 * @return {Array.<string>} a list of formats
	 */
	function getFormat(formatType, lang) {
	  if (!lang) {
	    lang = locales.getDefaultLocale()
	  }
	  var cacheKey = formatType + ':' + lang
	  if (!object.hasOwn(formatCache, cacheKey)) {
	    var langLocales = locales.getLocales(lang)
	    var localeFormats = []
	    for (var i = 0, l = langLocales.length; i < l; i++) {
	      var locale = langLocales[i]
	      if (object.hasOwn(locale, formatType)) {
	        // Copy locale-specific formats, as we may be adding to them
	        localeFormats = locale[formatType].slice()
	        break
	      }
	    }
	    if (object.hasOwn(ISO_INPUT_FORMATS, formatType)) {
	      var isoFormats = ISO_INPUT_FORMATS[formatType]
	      for (var j = 0, m = isoFormats.length; j < m; j++) {
	        var isoFormat = isoFormats[j]
	        if (localeFormats.indexOf(isoFormat) == -1) {
	          localeFormats.push(isoFormat)
	        }
	      }
	    }
	    formatCache[cacheKey] = localeFormats
	  }
	  return formatCache[cacheKey]
	}

	module.exports = {
	  getFormat: getFormat
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var HiddenInput = __webpack_require__(21)
	var Widget = __webpack_require__(59)
	var TextInput = __webpack_require__(61)

	var $__0=   __webpack_require__(2),EMPTY_VALUES=$__0.EMPTY_VALUES,ValidationError=$__0.ValidationError
	var $__1=  __webpack_require__(15),normaliseValidation=$__1.normaliseValidation

	/**
	 * An object that is responsible for doing validation and normalisation, or
	 * "cleaning", for example: an EmailField makes sure its data is a valid
	 * e-mail address and makes sure that acceptable "blank" values all have the
	 * same representation.
	 * @constructor
	 * @param {Object=} kwargs
	 */
	var Field = Concur.extend({
	  widget: TextInput         // Default widget to use when rendering this type of Field
	, hiddenWidget: HiddenInput // Default widget to use when rendering this as "hidden"
	, defaultValidators: []             // Default list of validators
	  // Add an 'invalid' entry to defaultErrorMessages if you want a specific
	  // field error message not raised by the field validators.
	, defaultErrorMessages: {
	    required: 'This field is required.'
	  }
	, emptyValues: EMPTY_VALUES.slice()
	, emptyValueArray: true // Should isEmptyValue check for empty Arrays?

	, constructor: function Field(kwargs) {
	    kwargs = object.extend({
	      required: true, widget: null, label: null, initial: null,
	      helpText: null, errorMessages: null, showHiddenInitial: false,
	      validators: [], cssClass: null, validation: null, controlled: null,
	      custom: null, widgetAttrs: {}
	    }, kwargs)
	    this.required = kwargs.required
	    this.label = kwargs.label
	    this.initial = kwargs.initial
	    this.showHiddenInitial = kwargs.showHiddenInitial
	    this.helpText = kwargs.helpText || ''
	    this.cssClass = kwargs.cssClass
	    this.validation = normaliseValidation(kwargs.validation)
	    this.controlled = kwargs.controlled
	    this.custom = kwargs.custom
	    this.widgetAttrs = kwargs.widgetAttrs

	    var widget = kwargs.widget || this.widget
	    if (!(widget instanceof Widget)) {
	      // We must have a Widget constructor, so construct with it
	      widget = new widget()
	    }
	    // Let the widget know whether it should display as required
	    widget.isRequired = this.required
	    // Hook into this.getWidgetAttrs() for any Field-specific HTML attributes
	    object.extend(widget.attrs, this.getWidgetAttrs(widget))
	    this.widget = widget

	    // Increment the creation counter and save our local copy
	    this.creationCounter = Field.creationCounter++

	    // Copy error messages for this instance into a new object and override
	    // with any provided error messages.
	    var messages = [{}]
	    for (var i = this.constructor.__mro__.length - 1; i >=0; i--) {
	      messages.push(object.get(this.constructor.__mro__[i].prototype,
	                               'defaultErrorMessages', null))
	    }
	    messages.push(kwargs.errorMessages)
	    this.errorMessages = object.extend.apply(object, messages)

	    this.validators = this.defaultValidators.concat(kwargs.validators)
	  }
	})

	/**
	 * Tracks each time a Field instance is created; used to retain order.
	 */
	Field.creationCounter = 0

	Field.prototype.prepareValue = function(value) {
	  return value
	}

	/**
	 * @param {*} value user input.
	 * @throws {ValidationError} if the input is invalid.
	 */
	Field.prototype.toJavaScript = function(value) {
	  return value
	}

	/**
	 * Checks for the given value being === one of the configured empty values, plus
	 * any additional checks required due to JavaScript's lack of a generic object
	 * equality checking mechanism.
	 */
	Field.prototype.isEmptyValue = function(value) {
	  if (this.emptyValues.indexOf(value) != -1) {
	    return true
	  }
	  return (this.emptyValueArray === true && is.Array(value) && value.length === 0)
	}

	Field.prototype.validate = function(value) {
	  if (this.required && this.isEmptyValue(value)) {
	    throw ValidationError(this.errorMessages.required, {code: 'required'})
	  }
	}

	Field.prototype.runValidators = function(value) {
	  if (this.isEmptyValue(value)) {
	    return
	  }
	  var errors = []
	  for (var i = 0, l = this.validators.length; i < l; i++) {
	    var validator = this.validators[i]
	    try {
	      validator(value)
	    }
	    catch (e) {
	      if (!(e instanceof ValidationError)) { throw e }
	      if (object.hasOwn(e, 'code') &&
	          object.hasOwn(this.errorMessages, e.code)) {
	        e.message = this.errorMessages[e.code]
	      }
	      errors.push.apply(errors, e.errorList)
	    }
	  }
	  if (errors.length > 0) {
	    throw ValidationError(errors)
	  }
	}

	/**
	 * Validates the given value and returns its "cleaned" value as an appropriate
	 * JavaScript object.
	 * @param {string} value user input.
	 * @throws {ValidationError} if the input is invalid.
	 */
	Field.prototype.clean = function(value) {
	  value = this.toJavaScript(value)
	  this.validate(value)
	  this.runValidators(value)
	  return value
	}

	/**
	 * Return the value that should be shown for this field on render of a bound
	 * form, given the submitted data for the field and the initial data, if any.
	 * For most fields, this will simply be data; FileFields need to handle it a bit
	 * differently.
	 */
	Field.prototype.boundData = function(data, initial) {
	  return data
	}

	/**
	 * Specifies HTML attributes which should be added to a given widget for this
	 * field.
	 * @param {Widget} widget a widget.
	 * @return {Object} an object specifying HTML attributes that should be added to
	 *   the given widget when rendered, based on this field.
	 */
	Field.prototype.getWidgetAttrs = function(widget) {
	  return object.extend({}, this.widgetAttrs)
	}

	/**
	 * @return {boolean} true if data differs from initial.
	 */
	Field.prototype._hasChanged = function(initial, data) {
	  // For purposes of seeing whether something has changed, null is the same
	  // as an empty string, if the data or initial value we get is null, replace
	  // it with ''.
	  var initialValue = (initial === null ? '' : initial)
	  try {
	    data = this.toJavaScript(data)
	    if (typeof this._coerce == 'function') {
	      data = this._coerce(data)
	    }
	  }
	  catch (e) {
	    if (!(e instanceof ValidationError)) { throw e }
	    return true
	  }
	  var dataValue = (data === null ? '' : data)
	  return (''+initialValue != ''+dataValue) // TODO is forcing to string necessary?
	}

	module.exports = Field

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Input = __webpack_require__(22)

	/**
	 * An HTML <input type="hidden"> widget.
	 * @constructor
	 * @extends {Input}
	 * @param {Object=} kwargs
	 */
	var HiddenInput = Input.extend({
	  constructor: function HiddenInput(kwargs) {
	    if (!(this instanceof HiddenInput)) { return new HiddenInput(kwargs) }
	    Input.call(this, kwargs)
	  }
	, inputType: 'hidden'
	, isHidden: true
	})

	module.exports = HiddenInput

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var Widget = __webpack_require__(59)

	/**
	 * An HTML <input> widget.
	 * @constructor
	 * @extends {Widget}
	 * @param {Object=} kwargs
	 */
	var Input = Widget.extend({
	  constructor: function Input(kwargs) {
	    if (!(this instanceof Input)) { return new Input(kwargs) }
	    Widget.call(this, kwargs)
	  }
	  /** The type attribute of this input - subclasses must define it. */
	, inputType: null
	})

	Input.prototype._formatValue = function(value) {
	  return value
	}

	Input.prototype.render = function(name, value, kwargs) {
	  kwargs = object.extend({attrs: null}, kwargs)
	  if (value === null) {
	    value = ''
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {type: this.inputType,
	                                                  name: name})
	  // Hidden inputs can be made controlled inputs by default, as the user
	  // can't directly interact with them.
	  var valueAttr = (kwargs.controlled || this.isHidden ? 'value' : 'defaultValue')
	  if (!(valueAttr == 'defaultValue' && value === '')) {
	    finalAttrs[valueAttr] = (value !== '' ? ''+this._formatValue(value) : value)
	  }
	  return React.createElement('input', finalAttrs)
	}

	module.exports = Input

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(24);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule React
	 */

	'use strict';

	var _assign = __webpack_require__(25);

	var ReactChildren = __webpack_require__(26);
	var ReactComponent = __webpack_require__(37);
	var ReactClass = __webpack_require__(48);
	var ReactDOMFactories = __webpack_require__(53);
	var ReactElement = __webpack_require__(29);
	var ReactElementValidator = __webpack_require__(54);
	var ReactPropTypes = __webpack_require__(56);
	var ReactVersion = __webpack_require__(57);

	var onlyChild = __webpack_require__(58);
	var warning = __webpack_require__(31);

	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;

	if (process.env.NODE_ENV !== 'production') {
	  createElement = ReactElementValidator.createElement;
	  createFactory = ReactElementValidator.createFactory;
	  cloneElement = ReactElementValidator.cloneElement;
	}

	var __spread = _assign;

	if (process.env.NODE_ENV !== 'production') {
	  var warned = false;
	  __spread = function () {
	    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
	    warned = true;
	    return _assign.apply(null, arguments);
	  };
	}

	var React = {

	  // Modern

	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    toArray: ReactChildren.toArray,
	    only: onlyChild
	  },

	  Component: ReactComponent,

	  createElement: createElement,
	  cloneElement: cloneElement,
	  isValidElement: ReactElement.isValidElement,

	  // Classic

	  PropTypes: ReactPropTypes,
	  createClass: ReactClass.createClass,
	  createFactory: createFactory,
	  createMixin: function (mixin) {
	    // Currently a noop. Will be used to validate and trace mixins.
	    return mixin;
	  },

	  // This looks DOM specific but these are actually isomorphic helpers
	  // since they are just generating DOM strings.
	  DOM: ReactDOMFactories,

	  version: ReactVersion,

	  // Deprecated hook for JSX spread, don't use this for anything.
	  __spread: __spread
	};

	module.exports = React;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactChildren
	 */

	'use strict';

	var PooledClass = __webpack_require__(27);
	var ReactElement = __webpack_require__(29);

	var emptyFunction = __webpack_require__(32);
	var traverseAllChildren = __webpack_require__(34);

	var twoArgumentPooler = PooledClass.twoArgumentPooler;
	var fourArgumentPooler = PooledClass.fourArgumentPooler;

	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */
	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.func = forEachFunction;
	  this.context = forEachContext;
	  this.count = 0;
	}
	ForEachBookKeeping.prototype.destructor = function () {
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;

	  func.call(context, child, bookKeeping.count++);
	}

	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */
	function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
	  this.result = mapResult;
	  this.keyPrefix = keyPrefix;
	  this.func = mapFunction;
	  this.context = mapContext;
	  this.count = 0;
	}
	MapBookKeeping.prototype.destructor = function () {
	  this.result = null;
	  this.keyPrefix = null;
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result;
	  var keyPrefix = bookKeeping.keyPrefix;
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;


	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (ReactElement.isValidElement(mappedChild)) {
	      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
	      // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }
	    result.push(mappedChild);
	  }
	}

	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	}

	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}

	function forEachSingleChildDummy(traverseContext, child, name) {
	  return null;
	}

	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, forEachSingleChildDummy, null);
	}

	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
	 */
	function toArray(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
	  return result;
	}

	var ReactChildren = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
	  count: countChildren,
	  toArray: toArray
	};

	module.exports = ReactChildren;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PooledClass
	 */

	'use strict';

	var invariant = __webpack_require__(28);

	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function (copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler = function (a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler = function (a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fourArgumentPooler = function (a1, a2, a3, a4) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};

	var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4, a5);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4, a5);
	  }
	};

	var standardReleaser = function (instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : invariant(false) : void 0;
	  instance.destructor();
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;

	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances (optional).
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function (CopyConstructor, pooler) {
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};

	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fourArgumentPooler: fourArgumentPooler,
	  fiveArgumentPooler: fiveArgumentPooler
	};

	module.exports = PooledClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */

	'use strict';

	var _assign = __webpack_require__(25);

	var ReactCurrentOwner = __webpack_require__(30);

	var warning = __webpack_require__(31);
	var canDefineProperty = __webpack_require__(33);

	// The Symbol used to tag the ReactElement type. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};

	var specialPropKeyWarningShown, specialPropRefWarningShown;

	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allow us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,

	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,

	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  if (process.env.NODE_ENV !== 'production') {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {};

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    if (canDefineProperty) {
	      Object.defineProperty(element._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: false
	      });
	      // self and source are DEV only properties.
	      Object.defineProperty(element, '_self', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: self
	      });
	      // Two elements created in two different places should be considered
	      // equal for testing purposes and therefore we hide it from enumeration.
	      Object.defineProperty(element, '_source', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: source
	      });
	    } else {
	      element._store.validated = false;
	      element._self = self;
	      element._source = source;
	    }
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};

	/**
	 * Create and return a new ReactElement of the given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
	 */
	ReactElement.createElement = function (type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;

	  if (config != null) {
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(
	      /* eslint-disable no-proto */
	      config.__proto__ == null || config.__proto__ === Object.prototype,
	      /* eslint-enable no-proto */
	      'React.createElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
	      ref = !config.hasOwnProperty('ref') || Object.getOwnPropertyDescriptor(config, 'ref').get ? null : config.ref;
	      key = !config.hasOwnProperty('key') || Object.getOwnPropertyDescriptor(config, 'key').get ? null : '' + config.key;
	    } else {
	      ref = config.ref === undefined ? null : config.ref;
	      key = config.key === undefined ? null : '' + config.key;
	    }
	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    // Create dummy `key` and `ref` property to `props` to warn users
	    // against its use
	    if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
	      if (!props.hasOwnProperty('key')) {
	        Object.defineProperty(props, 'key', {
	          get: function () {
	            if (!specialPropKeyWarningShown) {
	              specialPropKeyWarningShown = true;
	              process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', typeof type === 'function' && 'displayName' in type ? type.displayName : 'Element') : void 0;
	            }
	            return undefined;
	          },
	          configurable: true
	        });
	      }
	      if (!props.hasOwnProperty('ref')) {
	        Object.defineProperty(props, 'ref', {
	          get: function () {
	            if (!specialPropRefWarningShown) {
	              specialPropRefWarningShown = true;
	              process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', typeof type === 'function' && 'displayName' in type ? type.displayName : 'Element') : void 0;
	            }
	            return undefined;
	          },
	          configurable: true
	        });
	      }
	    }
	  }
	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	};

	/**
	 * Return a function that produces ReactElements of a given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
	 */
	ReactElement.createFactory = function (type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

	  return newElement;
	};

	/**
	 * Clone and return a new ReactElement using element as the starting point.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
	 */
	ReactElement.cloneElement = function (element, config, children) {
	  var propName;

	  // Original props are copied
	  var props = _assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;
	  // Self is preserved since the owner is preserved.
	  var self = element._self;
	  // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.
	  var source = element._source;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(
	      /* eslint-disable no-proto */
	      config.__proto__ == null || config.__proto__ === Object.prototype,
	      /* eslint-enable no-proto */
	      'React.cloneElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
	    }
	    if (config.ref !== undefined) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (config.key !== undefined) {
	      key = '' + config.key;
	    }
	    // Remaining properties override existing props
	    var defaultProps;
	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  return ReactElement(element.type, key, ref, self, source, owner, props);
	};

	/**
	 * Verifies the object is a ReactElement.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function (object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	};

	module.exports = ReactElement;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */

	'use strict';

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */

	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(32);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  warning = function warning(condition, format) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }

	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule canDefineProperty
	 */

	'use strict';

	var canDefineProperty = false;
	if (process.env.NODE_ENV !== 'production') {
	  try {
	    Object.defineProperty({}, 'x', { get: function () {} });
	    canDefineProperty = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	module.exports = canDefineProperty;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule traverseAllChildren
	 */

	'use strict';

	var ReactCurrentOwner = __webpack_require__(30);
	var ReactElement = __webpack_require__(29);

	var getIteratorFn = __webpack_require__(35);
	var invariant = __webpack_require__(28);
	var KeyEscapeUtils = __webpack_require__(36);
	var warning = __webpack_require__(31);

	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';

	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */

	var didWarnAboutMaps = false;

	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return KeyEscapeUtils.escape(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}

	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }

	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;
	      if (iteratorFn !== children.entries) {
	        var ii = 0;
	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey(child, ii++);
	          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	        }
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.') : void 0;
	          didWarnAboutMaps = true;
	        }
	        // Iterator will provide entry [k,v] tuples rather than values.
	        while (!(step = iterator.next()).done) {
	          var entry = step.value;
	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
	            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      if (process.env.NODE_ENV !== 'production') {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
	        if (children._isReactElement) {
	          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
	        }
	        if (ReactCurrentOwner.current) {
	          var name = ReactCurrentOwner.current.getName();
	          if (name) {
	            addendum += ' Check the render method of `' + name + '`.';
	          }
	        }
	      }
	      var childrenString = String(children);
	       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : invariant(false) : void 0;
	    }
	  }

	  return subtreeCount;
	}

	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}

	module.exports = traverseAllChildren;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getIteratorFn
	 */

	'use strict';

	/* global Symbol */

	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	module.exports = getIteratorFn;

/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule KeyEscapeUtils
	 */

	'use strict';

	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {*} key to be escaped.
	 * @return {string} the escaped key.
	 */

	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });

	  return '$' + escapedString;
	}

	/**
	 * Unescape and unwrap key for human-readable display
	 *
	 * @param {string} key to unescape.
	 * @return {string} the unescaped key.
	 */
	function unescape(key) {
	  var unescapeRegex = /(=0|=2)/g;
	  var unescaperLookup = {
	    '=0': '=',
	    '=2': ':'
	  };
	  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

	  return ('' + keySubstring).replace(unescapeRegex, function (match) {
	    return unescaperLookup[match];
	  });
	}

	var KeyEscapeUtils = {
	  escape: escape,
	  unescape: unescape
	};

	module.exports = KeyEscapeUtils;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponent
	 */

	'use strict';

	var ReactNoopUpdateQueue = __webpack_require__(38);
	var ReactInstrumentation = __webpack_require__(39);

	var canDefineProperty = __webpack_require__(33);
	var emptyObject = __webpack_require__(47);
	var invariant = __webpack_require__(28);
	var warning = __webpack_require__(31);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	ReactComponent.prototype.isReactComponent = {};

	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.setState = function (partialState, callback) {
	  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.') : invariant(false) : void 0;
	  if (process.env.NODE_ENV !== 'production') {
	    ReactInstrumentation.debugTool.onSetState();
	    process.env.NODE_ENV !== 'production' ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : void 0;
	  }
	  this.updater.enqueueSetState(this, partialState);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'setState');
	  }
	};

	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'forceUpdate');
	  }
	};

	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };
	  var defineDeprecationWarning = function (methodName, info) {
	    if (canDefineProperty) {
	      Object.defineProperty(ReactComponent.prototype, methodName, {
	        get: function () {
	          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
	          return undefined;
	        }
	      });
	    }
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}

	module.exports = ReactComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNoopUpdateQueue
	 */

	'use strict';

	var warning = __webpack_require__(31);

	function warnTDZ(publicInstance, callerName) {
	  if (process.env.NODE_ENV !== 'production') {
	    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor && publicInstance.constructor.displayName || '') : void 0;
	  }
	}

	/**
	 * This is the abstract API for an update queue.
	 */
	var ReactNoopUpdateQueue = {

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },

	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback) {},

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	    warnTDZ(publicInstance, 'forceUpdate');
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState) {
	    warnTDZ(publicInstance, 'replaceState');
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {
	    warnTDZ(publicInstance, 'setState');
	  }
	};

	module.exports = ReactNoopUpdateQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInstrumentation
	 */

	'use strict';

	var ReactDebugTool = __webpack_require__(40);

	module.exports = { debugTool: ReactDebugTool };

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDebugTool
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(41);

	var performanceNow = __webpack_require__(42);
	var warning = __webpack_require__(31);

	var eventHandlers = [];
	var handlerDoesThrowForEvent = {};

	function emitEvent(handlerFunctionName, arg1, arg2, arg3, arg4, arg5) {
	  if (process.env.NODE_ENV !== 'production') {
	    eventHandlers.forEach(function (handler) {
	      try {
	        if (handler[handlerFunctionName]) {
	          handler[handlerFunctionName](arg1, arg2, arg3, arg4, arg5);
	        }
	      } catch (e) {
	        process.env.NODE_ENV !== 'production' ? warning(!handlerDoesThrowForEvent[handlerFunctionName], 'exception thrown by devtool while handling %s: %s', handlerFunctionName, e.message) : void 0;
	        handlerDoesThrowForEvent[handlerFunctionName] = true;
	      }
	    });
	  }
	}

	var isProfiling = false;
	var flushHistory = [];
	var currentFlushNesting = 0;
	var currentFlushMeasurements = null;
	var currentFlushStartTime = null;
	var currentTimerDebugID = null;
	var currentTimerStartTime = null;
	var currentTimerType = null;

	function clearHistory() {
	  ReactComponentTreeDevtool.purgeUnmountedComponents();
	  ReactNativeOperationHistoryDevtool.clearHistory();
	}

	function getTreeSnapshot(registeredIDs) {
	  return registeredIDs.reduce(function (tree, id) {
	    var ownerID = ReactComponentTreeDevtool.getOwnerID(id);
	    var parentID = ReactComponentTreeDevtool.getParentID(id);
	    tree[id] = {
	      displayName: ReactComponentTreeDevtool.getDisplayName(id),
	      text: ReactComponentTreeDevtool.getText(id),
	      updateCount: ReactComponentTreeDevtool.getUpdateCount(id),
	      childIDs: ReactComponentTreeDevtool.getChildIDs(id),
	      // Text nodes don't have owners but this is close enough.
	      ownerID: ownerID || ReactComponentTreeDevtool.getOwnerID(parentID),
	      parentID: parentID
	    };
	    return tree;
	  }, {});
	}

	function resetMeasurements() {
	  if (process.env.NODE_ENV !== 'production') {
	    var previousStartTime = currentFlushStartTime;
	    var previousMeasurements = currentFlushMeasurements || [];
	    var previousOperations = ReactNativeOperationHistoryDevtool.getHistory();

	    if (!isProfiling || currentFlushNesting === 0) {
	      currentFlushStartTime = null;
	      currentFlushMeasurements = null;
	      clearHistory();
	      return;
	    }

	    if (previousMeasurements.length || previousOperations.length) {
	      var registeredIDs = ReactComponentTreeDevtool.getRegisteredIDs();
	      flushHistory.push({
	        duration: performanceNow() - previousStartTime,
	        measurements: previousMeasurements || [],
	        operations: previousOperations || [],
	        treeSnapshot: getTreeSnapshot(registeredIDs)
	      });
	    }

	    clearHistory();
	    currentFlushStartTime = performanceNow();
	    currentFlushMeasurements = [];
	  }
	}

	function checkDebugID(debugID) {
	  process.env.NODE_ENV !== 'production' ? warning(debugID, 'ReactDebugTool: debugID may not be empty.') : void 0;
	}

	var ReactDebugTool = {
	  addDevtool: function (devtool) {
	    eventHandlers.push(devtool);
	  },
	  removeDevtool: function (devtool) {
	    for (var i = 0; i < eventHandlers.length; i++) {
	      if (eventHandlers[i] === devtool) {
	        eventHandlers.splice(i, 1);
	        i--;
	      }
	    }
	  },
	  beginProfiling: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      if (isProfiling) {
	        return;
	      }

	      isProfiling = true;
	      flushHistory.length = 0;
	      resetMeasurements();
	    }
	  },
	  endProfiling: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!isProfiling) {
	        return;
	      }

	      isProfiling = false;
	      resetMeasurements();
	    }
	  },
	  getFlushHistory: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      return flushHistory;
	    }
	  },
	  onBeginFlush: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      currentFlushNesting++;
	      resetMeasurements();
	    }
	    emitEvent('onBeginFlush');
	  },
	  onEndFlush: function () {
	    if (process.env.NODE_ENV !== 'production') {
	      resetMeasurements();
	      currentFlushNesting--;
	    }
	    emitEvent('onEndFlush');
	  },
	  onBeginLifeCycleTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    emitEvent('onBeginLifeCycleTimer', debugID, timerType);
	    if (process.env.NODE_ENV !== 'production') {
	      if (isProfiling && currentFlushNesting > 0) {
	        process.env.NODE_ENV !== 'production' ? warning(!currentTimerType, 'There is an internal error in the React performance measurement code. ' + 'Did not expect %s timer to start while %s timer is still in ' + 'progress for %s instance.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
	        currentTimerStartTime = performanceNow();
	        currentTimerDebugID = debugID;
	        currentTimerType = timerType;
	      }
	    }
	  },
	  onEndLifeCycleTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    if (process.env.NODE_ENV !== 'production') {
	      if (isProfiling && currentFlushNesting > 0) {
	        process.env.NODE_ENV !== 'production' ? warning(currentTimerType === timerType, 'There is an internal error in the React performance measurement code. ' + 'We did not expect %s timer to stop while %s timer is still in ' + 'progress for %s instance. Please report this as a bug in React.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
	        currentFlushMeasurements.push({
	          timerType: timerType,
	          instanceID: debugID,
	          duration: performanceNow() - currentTimerStartTime
	        });
	        currentTimerStartTime = null;
	        currentTimerDebugID = null;
	        currentTimerType = null;
	      }
	    }
	    emitEvent('onEndLifeCycleTimer', debugID, timerType);
	  },
	  onBeginReconcilerTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    emitEvent('onBeginReconcilerTimer', debugID, timerType);
	  },
	  onEndReconcilerTimer: function (debugID, timerType) {
	    checkDebugID(debugID);
	    emitEvent('onEndReconcilerTimer', debugID, timerType);
	  },
	  onBeginProcessingChildContext: function () {
	    emitEvent('onBeginProcessingChildContext');
	  },
	  onEndProcessingChildContext: function () {
	    emitEvent('onEndProcessingChildContext');
	  },
	  onNativeOperation: function (debugID, type, payload) {
	    checkDebugID(debugID);
	    emitEvent('onNativeOperation', debugID, type, payload);
	  },
	  onSetState: function () {
	    emitEvent('onSetState');
	  },
	  onSetDisplayName: function (debugID, displayName) {
	    checkDebugID(debugID);
	    emitEvent('onSetDisplayName', debugID, displayName);
	  },
	  onSetChildren: function (debugID, childDebugIDs) {
	    checkDebugID(debugID);
	    emitEvent('onSetChildren', debugID, childDebugIDs);
	  },
	  onSetOwner: function (debugID, ownerDebugID) {
	    checkDebugID(debugID);
	    emitEvent('onSetOwner', debugID, ownerDebugID);
	  },
	  onSetText: function (debugID, text) {
	    checkDebugID(debugID);
	    emitEvent('onSetText', debugID, text);
	  },
	  onMountRootComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onMountRootComponent', debugID);
	  },
	  onMountComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onMountComponent', debugID);
	  },
	  onUpdateComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onUpdateComponent', debugID);
	  },
	  onUnmountComponent: function (debugID) {
	    checkDebugID(debugID);
	    emitEvent('onUnmountComponent', debugID);
	  }
	};

	if (process.env.NODE_ENV !== 'production') {
	  var ReactInvalidSetStateWarningDevTool = __webpack_require__(44);
	  var ReactNativeOperationHistoryDevtool = __webpack_require__(45);
	  var ReactComponentTreeDevtool = __webpack_require__(46);
	  ReactDebugTool.addDevtool(ReactInvalidSetStateWarningDevTool);
	  ReactDebugTool.addDevtool(ReactComponentTreeDevtool);
	  ReactDebugTool.addDevtool(ReactNativeOperationHistoryDevtool);
	  var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
	  if (/[?&]react_perf\b/.test(url)) {
	    ReactDebugTool.beginProfiling();
	  }
	}

	module.exports = ReactDebugTool;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	var performance = __webpack_require__(43);

	var performanceNow;

	/**
	 * Detect if we can use `window.performance.now()` and gracefully fallback to
	 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
	 * because of Facebook's testing infrastructure.
	 */
	if (performance.now) {
	  performanceNow = function performanceNow() {
	    return performance.now();
	  };
	} else {
	  performanceNow = function performanceNow() {
	    return Date.now();
	  };
	}

	module.exports = performanceNow;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(41);

	var performance;

	if (ExecutionEnvironment.canUseDOM) {
	  performance = window.performance || window.msPerformance || window.webkitPerformance;
	}

	module.exports = performance || {};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInvalidSetStateWarningDevTool
	 */

	'use strict';

	var warning = __webpack_require__(31);

	if (process.env.NODE_ENV !== 'production') {
	  var processingChildContext = false;

	  var warnInvalidSetState = function () {
	    process.env.NODE_ENV !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
	  };
	}

	var ReactInvalidSetStateWarningDevTool = {
	  onBeginProcessingChildContext: function () {
	    processingChildContext = true;
	  },
	  onEndProcessingChildContext: function () {
	    processingChildContext = false;
	  },
	  onSetState: function () {
	    warnInvalidSetState();
	  }
	};

	module.exports = ReactInvalidSetStateWarningDevTool;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNativeOperationHistoryDevtool
	 */

	'use strict';

	var history = [];

	var ReactNativeOperationHistoryDevtool = {
	  onNativeOperation: function (debugID, type, payload) {
	    history.push({
	      instanceID: debugID,
	      type: type,
	      payload: payload
	    });
	  },
	  clearHistory: function () {
	    if (ReactNativeOperationHistoryDevtool._preventClearing) {
	      // Should only be used for tests.
	      return;
	    }

	    history = [];
	  },
	  getHistory: function () {
	    return history;
	  }
	};

	module.exports = ReactNativeOperationHistoryDevtool;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentTreeDevtool
	 */

	'use strict';

	var invariant = __webpack_require__(28);

	var tree = {};
	var rootIDs = [];

	function updateTree(id, update) {
	  if (!tree[id]) {
	    tree[id] = {
	      parentID: null,
	      ownerID: null,
	      text: null,
	      childIDs: [],
	      displayName: 'Unknown',
	      isMounted: false,
	      updateCount: 0
	    };
	  }
	  update(tree[id]);
	}

	function purgeDeep(id) {
	  var item = tree[id];
	  if (item) {
	    var childIDs = item.childIDs;

	    delete tree[id];
	    childIDs.forEach(purgeDeep);
	  }
	}

	var ReactComponentTreeDevtool = {
	  onSetDisplayName: function (id, displayName) {
	    updateTree(id, function (item) {
	      return item.displayName = displayName;
	    });
	  },
	  onSetChildren: function (id, nextChildIDs) {
	    updateTree(id, function (item) {
	      var prevChildIDs = item.childIDs;
	      item.childIDs = nextChildIDs;

	      nextChildIDs.forEach(function (nextChildID) {
	        var nextChild = tree[nextChildID];
	        !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected devtool events to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;
	        !(nextChild.displayName != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetDisplayName() to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;
	        !(nextChild.childIDs != null || nextChild.text != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() or onSetText() to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;
	        !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;

	        if (prevChildIDs.indexOf(nextChildID) === -1) {
	          nextChild.parentID = id;
	        }
	      });
	    });
	  },
	  onSetOwner: function (id, ownerID) {
	    updateTree(id, function (item) {
	      return item.ownerID = ownerID;
	    });
	  },
	  onSetText: function (id, text) {
	    updateTree(id, function (item) {
	      return item.text = text;
	    });
	  },
	  onMountComponent: function (id) {
	    updateTree(id, function (item) {
	      return item.isMounted = true;
	    });
	  },
	  onMountRootComponent: function (id) {
	    rootIDs.push(id);
	  },
	  onUpdateComponent: function (id) {
	    updateTree(id, function (item) {
	      return item.updateCount++;
	    });
	  },
	  onUnmountComponent: function (id) {
	    updateTree(id, function (item) {
	      return item.isMounted = false;
	    });
	    rootIDs = rootIDs.filter(function (rootID) {
	      return rootID !== id;
	    });
	  },
	  purgeUnmountedComponents: function () {
	    if (ReactComponentTreeDevtool._preventPurging) {
	      // Should only be used for testing.
	      return;
	    }

	    Object.keys(tree).filter(function (id) {
	      return !tree[id].isMounted;
	    }).forEach(purgeDeep);
	  },
	  isMounted: function (id) {
	    var item = tree[id];
	    return item ? item.isMounted : false;
	  },
	  getChildIDs: function (id) {
	    var item = tree[id];
	    return item ? item.childIDs : [];
	  },
	  getDisplayName: function (id) {
	    var item = tree[id];
	    return item ? item.displayName : 'Unknown';
	  },
	  getOwnerID: function (id) {
	    var item = tree[id];
	    return item ? item.ownerID : null;
	  },
	  getParentID: function (id) {
	    var item = tree[id];
	    return item ? item.parentID : null;
	  },
	  getText: function (id) {
	    var item = tree[id];
	    return item ? item.text : null;
	  },
	  getUpdateCount: function (id) {
	    var item = tree[id];
	    return item ? item.updateCount : 0;
	  },
	  getRootIDs: function () {
	    return rootIDs;
	  },
	  getRegisteredIDs: function () {
	    return Object.keys(tree);
	  }
	};

	module.exports = ReactComponentTreeDevtool;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactClass
	 */

	'use strict';

	var _assign = __webpack_require__(25);

	var ReactComponent = __webpack_require__(37);
	var ReactElement = __webpack_require__(29);
	var ReactPropTypeLocations = __webpack_require__(49);
	var ReactPropTypeLocationNames = __webpack_require__(51);
	var ReactNoopUpdateQueue = __webpack_require__(38);

	var emptyObject = __webpack_require__(47);
	var invariant = __webpack_require__(28);
	var keyMirror = __webpack_require__(50);
	var keyOf = __webpack_require__(52);
	var warning = __webpack_require__(31);

	var MIXINS_KEY = keyOf({ mixins: null });

	/**
	 * Policies that describe methods in `ReactClassInterface`.
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods may be defined only once by the class specification or mixin.
	   */
	  DEFINE_ONCE: null,
	  /**
	   * These methods may be defined by both the class specification and mixins.
	   * Subsequent definitions will be chained. These methods must return void.
	   */
	  DEFINE_MANY: null,
	  /**
	   * These methods are overriding the base class.
	   */
	  OVERRIDE_BASE: null,
	  /**
	   * These methods are similar to DEFINE_MANY, except we assume they return
	   * objects. We try to merge the keys of the return values of all the mixed in
	   * functions. If there is a key conflict we throw.
	   */
	  DEFINE_MANY_MERGED: null
	});

	var injectedMixins = [];

	/**
	 * Composite components are higher-level components that compose other composite
	 * or native components.
	 *
	 * To create a new type of `ReactClass`, pass a specification of
	 * your new class to `React.createClass`. The only requirement of your class
	 * specification is that you implement a `render` method.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return <div>Hello World</div>;
	 *     }
	 *   });
	 *
	 * The class specification supports a specific protocol of methods that have
	 * special meaning (e.g. `render`). See `ReactClassInterface` for
	 * more the comprehensive protocol. Any other properties and methods in the
	 * class specification will be available on the prototype.
	 *
	 * @interface ReactClassInterface
	 * @internal
	 */
	var ReactClassInterface = {

	  /**
	   * An array of Mixin objects to include when defining your component.
	   *
	   * @type {array}
	   * @optional
	   */
	  mixins: SpecPolicy.DEFINE_MANY,

	  /**
	   * An object containing properties and methods that should be defined on
	   * the component's constructor instead of its prototype (static methods).
	   *
	   * @type {object}
	   * @optional
	   */
	  statics: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  contextTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types this component sets for its children.
	   *
	   * @type {object}
	   * @optional
	   */
	  childContextTypes: SpecPolicy.DEFINE_MANY,

	  // ==== Definition methods ====

	  /**
	   * Invoked when the component is mounted. Values in the mapping will be set on
	   * `this.props` if that prop is not specified (i.e. using an `in` check).
	   *
	   * This method is invoked before `getInitialState` and therefore cannot rely
	   * on `this.state` or use `this.setState`.
	   *
	   * @return {object}
	   * @optional
	   */
	  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Invoked once before the component is mounted. The return value will be used
	   * as the initial value of `this.state`.
	   *
	   *   getInitialState: function() {
	   *     return {
	   *       isOn: false,
	   *       fooBaz: new BazFoo()
	   *     }
	   *   }
	   *
	   * @return {object}
	   * @optional
	   */
	  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * @return {object}
	   * @optional
	   */
	  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Uses props from `this.props` and state from `this.state` to render the
	   * structure of the component.
	   *
	   * No guarantees are made about when or how often this method is invoked, so
	   * it must not have side effects.
	   *
	   *   render: function() {
	   *     var name = this.props.name;
	   *     return <div>Hello, {name}!</div>;
	   *   }
	   *
	   * @return {ReactComponent}
	   * @nosideeffects
	   * @required
	   */
	  render: SpecPolicy.DEFINE_ONCE,

	  // ==== Delegate methods ====

	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component has been mounted and has a DOM representation.
	   * However, there is no guarantee that the DOM node is in the document.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been mounted (initialized and rendered) for the first time.
	   *
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked before the component receives new props.
	   *
	   * Use this as an opportunity to react to a prop transition by updating the
	   * state using `this.setState`. Current props are accessed via `this.props`.
	   *
	   *   componentWillReceiveProps: function(nextProps, nextContext) {
	   *     this.setState({
	   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	   *     });
	   *   }
	   *
	   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	   * transition may cause a state change, but the opposite is not true. If you
	   * need it, you are probably looking for `componentWillUpdate`.
	   *
	   * @param {object} nextProps
	   * @optional
	   */
	  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked while deciding if the component should be updated as a result of
	   * receiving new props, state and/or context.
	   *
	   * Use this as an opportunity to `return false` when you're certain that the
	   * transition to the new props/state/context will not require a component
	   * update.
	   *
	   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	   *     return !equal(nextProps, this.props) ||
	   *       !equal(nextState, this.state) ||
	   *       !equal(nextContext, this.context);
	   *   }
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @return {boolean} True if the component should update.
	   * @optional
	   */
	  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

	  /**
	   * Invoked when the component is about to update due to a transition from
	   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	   * and `nextContext`.
	   *
	   * Use this as an opportunity to perform preparation before an update occurs.
	   *
	   * NOTE: You **cannot** use `this.setState()` in this method.
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @param {ReactReconcileTransaction} transaction
	   * @optional
	   */
	  componentWillUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component's DOM representation has been updated.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been updated.
	   *
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @param {?object} prevContext
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component is about to be removed from its parent and have
	   * its DOM representation destroyed.
	   *
	   * Use this as an opportunity to deallocate any external resources.
	   *
	   * NOTE: There is no `componentDidUnmount` since your component will have been
	   * destroyed by that point.
	   *
	   * @optional
	   */
	  componentWillUnmount: SpecPolicy.DEFINE_MANY,

	  // ==== Advanced methods ====

	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @overridable
	   */
	  updateComponent: SpecPolicy.OVERRIDE_BASE

	};

	/**
	 * Mapping from class specification keys to special processing functions.
	 *
	 * Although these are declared like instance properties in the specification
	 * when defining classes using `React.createClass`, they are actually static
	 * and are accessible on the constructor instead of the prototype. Despite
	 * being static, they must be defined outside of the "statics" key under
	 * which all other static methods are defined.
	 */
	var RESERVED_SPEC_KEYS = {
	  displayName: function (Constructor, displayName) {
	    Constructor.displayName = displayName;
	  },
	  mixins: function (Constructor, mixins) {
	    if (mixins) {
	      for (var i = 0; i < mixins.length; i++) {
	        mixSpecIntoComponent(Constructor, mixins[i]);
	      }
	    }
	  },
	  childContextTypes: function (Constructor, childContextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
	    }
	    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
	  },
	  contextTypes: function (Constructor, contextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
	    }
	    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
	  },
	  /**
	   * Special case getDefaultProps which should move into statics but requires
	   * automatic merging.
	   */
	  getDefaultProps: function (Constructor, getDefaultProps) {
	    if (Constructor.getDefaultProps) {
	      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
	    } else {
	      Constructor.getDefaultProps = getDefaultProps;
	    }
	  },
	  propTypes: function (Constructor, propTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
	    }
	    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	  },
	  statics: function (Constructor, statics) {
	    mixStaticSpecIntoComponent(Constructor, statics);
	  },
	  autobind: function () {} };

	// noop
	function validateTypeDef(Constructor, typeDef, location) {
	  for (var propName in typeDef) {
	    if (typeDef.hasOwnProperty(propName)) {
	      // use a warning instead of an invariant so components
	      // don't show up in prod but only in __DEV__
	      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
	    }
	  }
	}

	function validateMethodOverride(isAlreadyDefined, name) {
	  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

	  // Disallow overriding of base class methods unless explicitly allowed.
	  if (ReactClassMixin.hasOwnProperty(name)) {
	    !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(false) : void 0;
	  }

	  // Disallow defining methods more than once unless explicitly allowed.
	  if (isAlreadyDefined) {
	    !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(false) : void 0;
	  }
	}

	/**
	 * Mixin helper which handles policy validation and reserved
	 * specification keys when building React classes.
	 */
	function mixSpecIntoComponent(Constructor, spec) {
	  if (!spec) {
	    return;
	  }

	  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.') : invariant(false) : void 0;
	  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(false) : void 0;

	  var proto = Constructor.prototype;
	  var autoBindPairs = proto.__reactAutoBindPairs;

	  // By handling mixins before any other properties, we ensure the same
	  // chaining order is applied to methods with DEFINE_MANY policy, whether
	  // mixins are listed before or after these methods in the spec.
	  if (spec.hasOwnProperty(MIXINS_KEY)) {
	    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	  }

	  for (var name in spec) {
	    if (!spec.hasOwnProperty(name)) {
	      continue;
	    }

	    if (name === MIXINS_KEY) {
	      // We have already handled mixins in a special case above.
	      continue;
	    }

	    var property = spec[name];
	    var isAlreadyDefined = proto.hasOwnProperty(name);
	    validateMethodOverride(isAlreadyDefined, name);

	    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	      RESERVED_SPEC_KEYS[name](Constructor, property);
	    } else {
	      // Setup methods on prototype:
	      // The following member methods should not be automatically bound:
	      // 1. Expected ReactClass methods (in the "interface").
	      // 2. Overridden methods (that were mixed in).
	      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	      var isFunction = typeof property === 'function';
	      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

	      if (shouldAutoBind) {
	        autoBindPairs.push(name, property);
	        proto[name] = property;
	      } else {
	        if (isAlreadyDefined) {
	          var specPolicy = ReactClassInterface[name];

	          // These cases should already be caught by validateMethodOverride.
	          !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(false) : void 0;

	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property, merging if appropriate.
	          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	          if (process.env.NODE_ENV !== 'production') {
	            // Add verbose displayName to the function, which helps when looking
	            // at profiling tools.
	            if (typeof property === 'function' && spec.displayName) {
	              proto[name].displayName = spec.displayName + '_' + name;
	            }
	          }
	        }
	      }
	    }
	  }
	}

	function mixStaticSpecIntoComponent(Constructor, statics) {
	  if (!statics) {
	    return;
	  }
	  for (var name in statics) {
	    var property = statics[name];
	    if (!statics.hasOwnProperty(name)) {
	      continue;
	    }

	    var isReserved = name in RESERVED_SPEC_KEYS;
	    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(false) : void 0;

	    var isInherited = name in Constructor;
	    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(false) : void 0;
	    Constructor[name] = property;
	  }
	}

	/**
	 * Merge two objects, but throw if both contain the same key.
	 *
	 * @param {object} one The first object, which is mutated.
	 * @param {object} two The second object
	 * @return {object} one after it has been mutated to contain everything in two.
	 */
	function mergeIntoWithNoDuplicateKeys(one, two) {
	  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(false) : void 0;

	  for (var key in two) {
	    if (two.hasOwnProperty(key)) {
	      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(false) : void 0;
	      one[key] = two[key];
	    }
	  }
	  return one;
	}

	/**
	 * Creates a function that invokes two functions and merges their return values.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    var a = one.apply(this, arguments);
	    var b = two.apply(this, arguments);
	    if (a == null) {
	      return b;
	    } else if (b == null) {
	      return a;
	    }
	    var c = {};
	    mergeIntoWithNoDuplicateKeys(c, a);
	    mergeIntoWithNoDuplicateKeys(c, b);
	    return c;
	  };
	}

	/**
	 * Creates a function that invokes two functions and ignores their return vales.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	/**
	 * Binds a method to the component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 * @param {function} method Method to be bound.
	 * @return {function} The bound method.
	 */
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	  if (process.env.NODE_ENV !== 'production') {
	    boundMethod.__reactBoundContext = component;
	    boundMethod.__reactBoundMethod = method;
	    boundMethod.__reactBoundArguments = null;
	    var componentName = component.constructor.displayName;
	    var _bind = boundMethod.bind;
	    boundMethod.bind = function (newThis) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      // User is trying to bind() an autobound method; we effectively will
	      // ignore the value of "this" that the user is trying to use, so
	      // let's warn.
	      if (newThis !== component && newThis !== null) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
	      } else if (!args.length) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
	        return boundMethod;
	      }
	      var reboundMethod = _bind.apply(boundMethod, arguments);
	      reboundMethod.__reactBoundContext = component;
	      reboundMethod.__reactBoundMethod = method;
	      reboundMethod.__reactBoundArguments = args;
	      return reboundMethod;
	    };
	  }
	  return boundMethod;
	}

	/**
	 * Binds all auto-bound methods in a component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 */
	function bindAutoBindMethods(component) {
	  var pairs = component.__reactAutoBindPairs;
	  for (var i = 0; i < pairs.length; i += 2) {
	    var autoBindKey = pairs[i];
	    var method = pairs[i + 1];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}

	/**
	 * Add more to the ReactClass base class. These are all legacy features and
	 * therefore not already part of the modern ReactComponent.
	 */
	var ReactClassMixin = {

	  /**
	   * TODO: This will be deprecated because state should always keep a consistent
	   * type signature and the only use case for this, is to avoid that.
	   */
	  replaceState: function (newState, callback) {
	    this.updater.enqueueReplaceState(this, newState);
	    if (callback) {
	      this.updater.enqueueCallback(this, callback, 'replaceState');
	    }
	  },

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function () {
	    return this.updater.isMounted(this);
	  }
	};

	var ReactClassComponent = function () {};
	_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

	/**
	 * Module for creating composite components.
	 *
	 * @class ReactClass
	 */
	var ReactClass = {

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  createClass: function (spec) {
	    var Constructor = function (props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (initialState === undefined && this.getInitialState._isMockFunction) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : invariant(false) : void 0;

	      this.state = initialState;
	    };
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, spec);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : invariant(false) : void 0;

	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  },

	  injection: {
	    injectMixin: function (mixin) {
	      injectedMixins.push(mixin);
	    }
	  }

	};

	module.exports = ReactClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocations
	 */

	'use strict';

	var keyMirror = __webpack_require__(50);

	var ReactPropTypeLocations = keyMirror({
	  prop: null,
	  context: null,
	  childContext: null
	});

	module.exports = ReactPropTypeLocations;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 */

	'use strict';

	var invariant = __webpack_require__(28);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function keyMirror(obj) {
	  var ret = {};
	  var key;
	  !(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : void 0;
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocationNames
	 */

	'use strict';

	var ReactPropTypeLocationNames = {};

	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}

	module.exports = ReactPropTypeLocationNames;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 52 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function keyOf(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMFactories
	 */

	'use strict';

	var ReactElement = __webpack_require__(29);
	var ReactElementValidator = __webpack_require__(54);

	var mapObject = __webpack_require__(55);

	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @param {string} tag Tag name (e.g. `div`).
	 * @private
	 */
	function createDOMFactory(tag) {
	  if (process.env.NODE_ENV !== 'production') {
	    return ReactElementValidator.createFactory(tag);
	  }
	  return ReactElement.createFactory(tag);
	}

	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOMFactories = mapObject({
	  a: 'a',
	  abbr: 'abbr',
	  address: 'address',
	  area: 'area',
	  article: 'article',
	  aside: 'aside',
	  audio: 'audio',
	  b: 'b',
	  base: 'base',
	  bdi: 'bdi',
	  bdo: 'bdo',
	  big: 'big',
	  blockquote: 'blockquote',
	  body: 'body',
	  br: 'br',
	  button: 'button',
	  canvas: 'canvas',
	  caption: 'caption',
	  cite: 'cite',
	  code: 'code',
	  col: 'col',
	  colgroup: 'colgroup',
	  data: 'data',
	  datalist: 'datalist',
	  dd: 'dd',
	  del: 'del',
	  details: 'details',
	  dfn: 'dfn',
	  dialog: 'dialog',
	  div: 'div',
	  dl: 'dl',
	  dt: 'dt',
	  em: 'em',
	  embed: 'embed',
	  fieldset: 'fieldset',
	  figcaption: 'figcaption',
	  figure: 'figure',
	  footer: 'footer',
	  form: 'form',
	  h1: 'h1',
	  h2: 'h2',
	  h3: 'h3',
	  h4: 'h4',
	  h5: 'h5',
	  h6: 'h6',
	  head: 'head',
	  header: 'header',
	  hgroup: 'hgroup',
	  hr: 'hr',
	  html: 'html',
	  i: 'i',
	  iframe: 'iframe',
	  img: 'img',
	  input: 'input',
	  ins: 'ins',
	  kbd: 'kbd',
	  keygen: 'keygen',
	  label: 'label',
	  legend: 'legend',
	  li: 'li',
	  link: 'link',
	  main: 'main',
	  map: 'map',
	  mark: 'mark',
	  menu: 'menu',
	  menuitem: 'menuitem',
	  meta: 'meta',
	  meter: 'meter',
	  nav: 'nav',
	  noscript: 'noscript',
	  object: 'object',
	  ol: 'ol',
	  optgroup: 'optgroup',
	  option: 'option',
	  output: 'output',
	  p: 'p',
	  param: 'param',
	  picture: 'picture',
	  pre: 'pre',
	  progress: 'progress',
	  q: 'q',
	  rp: 'rp',
	  rt: 'rt',
	  ruby: 'ruby',
	  s: 's',
	  samp: 'samp',
	  script: 'script',
	  section: 'section',
	  select: 'select',
	  small: 'small',
	  source: 'source',
	  span: 'span',
	  strong: 'strong',
	  style: 'style',
	  sub: 'sub',
	  summary: 'summary',
	  sup: 'sup',
	  table: 'table',
	  tbody: 'tbody',
	  td: 'td',
	  textarea: 'textarea',
	  tfoot: 'tfoot',
	  th: 'th',
	  thead: 'thead',
	  time: 'time',
	  title: 'title',
	  tr: 'tr',
	  track: 'track',
	  u: 'u',
	  ul: 'ul',
	  'var': 'var',
	  video: 'video',
	  wbr: 'wbr',

	  // SVG
	  circle: 'circle',
	  clipPath: 'clipPath',
	  defs: 'defs',
	  ellipse: 'ellipse',
	  g: 'g',
	  image: 'image',
	  line: 'line',
	  linearGradient: 'linearGradient',
	  mask: 'mask',
	  path: 'path',
	  pattern: 'pattern',
	  polygon: 'polygon',
	  polyline: 'polyline',
	  radialGradient: 'radialGradient',
	  rect: 'rect',
	  stop: 'stop',
	  svg: 'svg',
	  text: 'text',
	  tspan: 'tspan'

	}, createDOMFactory);

	module.exports = ReactDOMFactories;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElementValidator
	 */

	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */

	'use strict';

	var ReactElement = __webpack_require__(29);
	var ReactPropTypeLocations = __webpack_require__(49);
	var ReactPropTypeLocationNames = __webpack_require__(51);
	var ReactCurrentOwner = __webpack_require__(30);

	var canDefineProperty = __webpack_require__(33);
	var getIteratorFn = __webpack_require__(35);
	var invariant = __webpack_require__(28);
	var warning = __webpack_require__(31);

	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = ReactCurrentOwner.current.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}

	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};

	var loggedTypeFailures = {};

	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;

	  var addenda = getAddendaForKeyUse('uniqueKey', element, parentType);
	  if (addenda === null) {
	    // we already showed the warning
	    return;
	  }
	  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s%s', addenda.parentOrOwner || '', addenda.childOwner || '', addenda.url || '') : void 0;
	}

	/**
	 * Shared warning and monitoring code for the key warnings.
	 *
	 * @internal
	 * @param {string} messageType A key used for de-duping warnings.
	 * @param {ReactElement} element Component that requires a key.
	 * @param {*} parentType element's parent's type.
	 * @returns {?object} A set of addenda to use in the warning message, or null
	 * if the warning has already been shown before (and shouldn't be shown again).
	 */
	function getAddendaForKeyUse(messageType, element, parentType) {
	  var addendum = getDeclarationErrorAddendum();
	  if (!addendum) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	    if (parentName) {
	      addendum = ' Check the top-level render call using <' + parentName + '>.';
	    }
	  }

	  var memoizer = ownerHasKeyUseWarning[messageType] || (ownerHasKeyUseWarning[messageType] = {});
	  if (memoizer[addendum]) {
	    return null;
	  }
	  memoizer[addendum] = true;

	  var addenda = {
	    parentOrOwner: addendum,
	    url: ' See https://fb.me/react-warning-keys for more information.',
	    childOwner: null
	  };

	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    addenda.childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
	  }

	  return addenda;
	}

	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if (typeof node !== 'object') {
	    return;
	  }
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (ReactElement.isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactElement.isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    // Entry iterators provide implicit keys.
	    if (iteratorFn) {
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (ReactElement.isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}

	/**
	 * Assert that the props are valid
	 *
	 * @param {string} componentName Name of the component for error messages.
	 * @param {object} propTypes Map of prop name to a ReactPropType
	 * @param {object} props
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @private
	 */
	function checkPropTypes(componentName, propTypes, props, location) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        !(typeof propTypes[propName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : void 0;
	        error = propTypes[propName](props, propName, componentName, location);
	      } catch (ex) {
	        error = ex;
	      }
	      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], propName, typeof error) : void 0;
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;

	        var addendum = getDeclarationErrorAddendum();
	        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed propType: %s%s', error.message, addendum) : void 0;
	      }
	    }
	  }
	}

	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  var componentClass = element.type;
	  if (typeof componentClass !== 'function') {
	    return;
	  }
	  var name = componentClass.displayName || componentClass.name;
	  if (componentClass.propTypes) {
	    checkPropTypes(name, componentClass.propTypes, element.props, ReactPropTypeLocations.prop);
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
	  }
	}

	var ReactElementValidator = {

	  createElement: function (type, props, children) {
	    var validType = typeof type === 'string' || typeof type === 'function';
	    // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.
	    process.env.NODE_ENV !== 'production' ? warning(validType, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;

	    var element = ReactElement.createElement.apply(this, arguments);

	    // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.
	    if (element == null) {
	      return element;
	    }

	    // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)
	    if (validType) {
	      for (var i = 2; i < arguments.length; i++) {
	        validateChildKeys(arguments[i], type);
	      }
	    }

	    validatePropTypes(element);

	    return element;
	  },

	  createFactory: function (type) {
	    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
	    // Legacy hook TODO: Warn if this is accessed
	    validatedFactory.type = type;

	    if (process.env.NODE_ENV !== 'production') {
	      if (canDefineProperty) {
	        Object.defineProperty(validatedFactory, 'type', {
	          enumerable: false,
	          get: function () {
	            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
	            Object.defineProperty(this, 'type', {
	              value: type
	            });
	            return type;
	          }
	        });
	      }
	    }

	    return validatedFactory;
	  },

	  cloneElement: function (element, props, children) {
	    var newElement = ReactElement.cloneElement.apply(this, arguments);
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], newElement.type);
	    }
	    validatePropTypes(newElement);
	    return newElement;
	  }

	};

	module.exports = ReactElementValidator;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 55 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object and constructs a new object from the results. The `callback` is
	 * invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `mapObject` will not be visited
	 * by `callback`. If the values of existing properties are changed, the value
	 * passed to `callback` will be the value at the time `mapObject` visits them.
	 * Properties that are deleted before being visited are not visited.
	 *
	 * @grep function objectMap()
	 * @grep function objMap()
	 *
	 * @param {?object} object
	 * @param {function} callback
	 * @param {*} context
	 * @return {?object}
	 */
	function mapObject(object, callback, context) {
	  if (!object) {
	    return null;
	  }
	  var result = {};
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      result[name] = callback.call(context, object[name], name, object);
	    }
	  }
	  return result;
	}

	module.exports = mapObject;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypes
	 */

	'use strict';

	var ReactElement = __webpack_require__(29);
	var ReactPropTypeLocationNames = __webpack_require__(51);

	var emptyFunction = __webpack_require__(32);
	var getIteratorFn = __webpack_require__(35);

	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */

	var ANONYMOUS = '<<anonymous>>';

	var ReactPropTypes = {
	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),

	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  element: createElementTypeChecker(),
	  instanceOf: createInstanceTypeChecker,
	  node: createNodeChecker(),
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	/*eslint-disable no-self-compare*/
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	/*eslint-enable no-self-compare*/

	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName, location, propFullName) {
	    componentName = componentName || ANONYMOUS;
	    propFullName = propFullName || propName;
	    if (props[propName] == null) {
	      var locationName = ReactPropTypeLocationNames[location];
	      if (isRequired) {
	        return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
	      }
	      return null;
	    } else {
	      return validate(props, propName, componentName, location, propFullName);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = ReactPropTypeLocationNames[location];
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);

	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
	  return createChainableTypeChecker(emptyFunction.thatReturns(null));
	}

	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	    }
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createElementTypeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!ReactElement.isValidElement(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      var actualClassName = getClassName(props[propName]);
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
	  if (!Array.isArray(expectedValues)) {
	    return createChainableTypeChecker(function () {
	      return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
	    });
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (is(propValue, expectedValues[i])) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    var valuesString = JSON.stringify(expectedValues);
	    return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	    }
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  if (!Array.isArray(arrayOfTypeCheckers)) {
	    return createChainableTypeChecker(function () {
	      return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
	    });
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, componentName, location, propFullName) == null) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createNodeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!isNode(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function isNode(propValue) {
	  switch (typeof propValue) {
	    case 'number':
	    case 'string':
	    case 'undefined':
	      return true;
	    case 'boolean':
	      return !propValue;
	    case 'object':
	      if (Array.isArray(propValue)) {
	        return propValue.every(isNode);
	      }
	      if (propValue === null || ReactElement.isValidElement(propValue)) {
	        return true;
	      }

	      var iteratorFn = getIteratorFn(propValue);
	      if (iteratorFn) {
	        var iterator = iteratorFn.call(propValue);
	        var step;
	        if (iteratorFn !== propValue.entries) {
	          while (!(step = iterator.next()).done) {
	            if (!isNode(step.value)) {
	              return false;
	            }
	          }
	        } else {
	          // Iterator will provide entry [k,v] tuples rather than values.
	          while (!(step = iterator.next()).done) {
	            var entry = step.value;
	            if (entry) {
	              if (!isNode(entry[1])) {
	                return false;
	              }
	            }
	          }
	        }
	      } else {
	        return false;
	      }

	      return true;
	    default:
	      return false;
	  }
	}

	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue;
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  return propType;
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}

	// Returns class name of the object, if any.
	function getClassName(propValue) {
	  if (!propValue.constructor || !propValue.constructor.name) {
	    return ANONYMOUS;
	  }
	  return propValue.constructor.name;
	}

	module.exports = ReactPropTypes;

/***/ },
/* 57 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactVersion
	 */

	'use strict';

	module.exports = '15.1.0';

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule onlyChild
	 */
	'use strict';

	var ReactElement = __webpack_require__(29);

	var invariant = __webpack_require__(28);

	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
	 *
	 * The current implementation of this function assumes that a single child gets
	 * passed without a wrapper, but the purpose of this helper function is to
	 * abstract away the particular structure of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactElement} The first and only `ReactElement` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : invariant(false) : void 0;
	  return children;
	}

	module.exports = onlyChild;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var object = __webpack_require__(6)
	var SubWidget = __webpack_require__(60)

	/**
	 * An HTML form widget.
	 * @constructor
	 * @param {Object=} kwargs
	 */
	var Widget = Concur.extend({
	  constructor: function Widget(kwargs) {
	    kwargs = object.extend({attrs: null}, kwargs)
	    this.attrs = object.extend({}, kwargs.attrs)
	  }
	  /** Determines whether this corresponds to an <input type="hidden">. */
	, isHidden: false
	  /** Determines whether this widget needs a multipart-encoded form. */
	, needsMultipartForm: false
	  /** Determines whether this widget is for a required field. */
	, isRequired: false
	  /** Override for active validation config a particular widget needs to use. */
	, validation: null
	  /** Determines whether this widget's render logic always needs to use the initial value. */
	, needsInitialValue: false
	  /** Determines whether this widget's value can be set. */
	, isValueSettable: true
	})

	/**
	 * Yields all "subwidgets" of this widget. Used only by RadioSelect to
	 * allow access to individual <input type="radio"> buttons.
	 * Arguments are the same as for render().
	 * @return {Array.<SubWidget>}
	 */
	Widget.prototype.subWidgets = function(name, value, kwargs) {
	  return [SubWidget(this, name, value, kwargs)]
	}

	/**
	 * Returns this Widget rendered as HTML.
	 * The value given is not guaranteed to be valid input, so subclass
	 * implementations should program defensively.
	 * @abstract
	 */
	Widget.prototype.render = function(name, value, kwargs) {
	  throw new Error('Constructors extending Widget must implement a render() method.')
	}

	/**
	 * Helper function for building an HTML attributes object.
	 */
	Widget.prototype.buildAttrs = function(kwargAttrs, renderAttrs) {
	  return object.extend({}, this.attrs, renderAttrs, kwargAttrs)
	}

	/**
	 * Retrieves a value for this widget from the given data.
	 * @param {Object} data form data.
	 * @param {Object} files file data.
	 * @param {string} name the field name to be used to retrieve data.
	 * @return a value for this widget, or null if no value was provided.
	 */
	Widget.prototype.valueFromData = function(data, files, name) {
	  return object.get(data, name, null)
	}

	/**
	 * Determines the HTML id attribute of this Widget for use by a
	 * <label>, given the id of the field.
	 * This hook is necessary because some widgets have multiple HTML elements and,
	 * thus, multiple ids. In that case, this method should return an ID value that
	 * corresponds to the first id in the widget's tags.
	 * @param {string} id a field id.
	 * @return {string} the id which should be used by a <label> for this Widget.
	 */
	Widget.prototype.idForLabel = function(id) {
	  return id
	}

	module.exports = Widget

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var object = __webpack_require__(6)

	/**
	 * Some widgets are made of multiple HTML elements -- namely, RadioSelect.
	 * This represents the "inner" HTML element of a widget.
	 * @constructor
	 */
	var SubWidget = Concur.extend({
	  constructor: function SubWidget(parentWidget, name, value, kwargs) {
	    if (!(this instanceof SubWidget)) {
	      return new SubWidget(parentWidget, name, value, kwargs)
	    }
	    this.parentWidget = parentWidget
	    this.name = name
	    this.value = value
	    kwargs = object.extend({attrs: null, choices: []}, kwargs)
	    this.attrs = kwargs.attrs
	    this.choices = kwargs.choices
	  }
	})

	SubWidget.prototype.render = function() {
	  var kwargs = {attrs: this.attrs}
	  if (this.choices.length) {
	    kwargs.choices = this.choices
	  }
	  return this.parentWidget.render(this.name, this.value, kwargs)
	}

	module.exports = SubWidget

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var Input = __webpack_require__(22)

	/**
	 * An HTML <input type="text"> widget.
	 * @constructor
	 * @extends {Input}
	 * @param {Object=} kwargs
	 */
	var TextInput = Input.extend({
	  constructor: function TextInput(kwargs) {
	    if (!(this instanceof TextInput)) { return new TextInput(kwargs) }
	    kwargs = object.extend({attrs: null}, kwargs)
	    if (kwargs.attrs != null) {
	      this.inputType = object.pop(kwargs.attrs, 'type', this.inputType)
	    }
	    Input.call(this, kwargs)
	  }
	, inputType: 'text'
	})

	module.exports = TextInput

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	var CheckboxInput = __webpack_require__(63)
	var Field = __webpack_require__(20)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * Normalises its input to a Boolean primitive.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var BooleanField = Field.extend({
	  widget: CheckboxInput

	, constructor: function BooleanField(kwargs) {
	    if (!(this instanceof BooleanField)) { return new BooleanField(kwargs) }
	    Field.call(this, kwargs)
	  }
	})

	BooleanField.prototype.toJavaScript = function(value) {
	  // Explicitly check for a 'false' string, which is what a hidden field will
	  // submit for false. Also check for '0', since this is what RadioSelect will
	  // provide. Because Boolean('anything') == true, we don't need to handle that
	  // explicitly.
	  if (is.String(value) && (value.toLowerCase() == 'false' || value == '0')) {
	    value = false
	  }
	  else {
	    value = Boolean(value)
	  }
	  value = Field.prototype.toJavaScript.call(this, value)
	  if (!value && this.required) {
	    throw ValidationError(this.errorMessages.required, {code: 'required'})
	  }
	  return value
	}

	BooleanField.prototype._hasChanged = function(initial, data) {
	  // Sometimes data or initial could be null or '' which should be the same
	  // thing as false.
	  if (initial === 'false') {
	    // showHiddenInitial may have transformed false to 'false'
	    initial = false
	  }
	  return (Boolean(initial) != Boolean(data))
	}

	module.exports = BooleanField

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var Widget = __webpack_require__(59)

	function defaultCheckTest(value) {
	  return (value !== false && value != null && value !== '')
	}

	/**
	 * An HTML <input type="checkbox"> widget.
	 * @constructor
	 * @extends {Widget}
	 * @param {Object=} kwargs
	 */
	var CheckboxInput = Widget.extend({
	  constructor: function CheckboxInput(kwargs) {
	    if (!(this instanceof Widget)) { return new CheckboxInput(kwargs) }
	    kwargs = object.extend({checkTest: defaultCheckTest}, kwargs)
	    Widget.call(this, kwargs)
	    this.checkTest = kwargs.checkTest
	  }
	, validation: {onChange: true}
	})

	CheckboxInput.prototype.render = function(name, value, kwargs) {
	  kwargs = object.extend({}, kwargs)
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {type: 'checkbox',
	                                                  name: name})
	  if (value !== '' && value !== true && value !== false && value !== null &&
	      value !== undefined) {
	    // Only add the value attribute if value is non-empty
	    finalAttrs.value = value
	  }
	  var checkedAttr = (kwargs.controlled ? 'checked' : 'defaultChecked')
	  finalAttrs[checkedAttr] = this.checkTest(value)
	  return React.createElement('input', finalAttrs)
	}

	CheckboxInput.prototype.valueFromData = function(data, files, name) {
	  if (typeof data[name] == 'undefined') {
	    //  A missing value means False because HTML form submission does not
	    // send results for unselected checkboxes.
	    return false
	  }
	  var value = data[name]
	  var values = {'true': true, 'false': false}
	  // Translate true and false strings to boolean values
	  if (is.String(value)) {
	    value = object.get(values, value.toLowerCase(), value)
	  }
	  return !!value
	}

	module.exports = CheckboxInput

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var is = __webpack_require__(5)
	var format = __webpack_require__(11).formatObj
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var TextInput = __webpack_require__(61)
	var Textarea = __webpack_require__(65)

	var $__0=  __webpack_require__(15),prettyName=$__0.prettyName

	var SUFFIX_CHARS = ':?.!'

	/**
	 * A helper for rendering a field.
	 * @param {Form} form the form instance which the field is a part of.
	 * @param {Field} field the field to be rendered.
	 * @param {string} name the name associated with the field in the form.
	 * @constructor
	 */
	var BoundField = Concur.extend({
	  constructor: function BoundField(form, field, name) {
	    if (!(this instanceof BoundField)) { return new BoundField(form, field, name) }
	    this.form = form
	    this.field = field
	    this.name = name
	    this.htmlName = form.addPrefix(name)
	    this.htmlInitialName = form.addInitialPrefix(name)
	    this.htmlInitialId = form.addInitialPrefix(this.autoId())
	    this.label = this.field.label !== null ? this.field.label : prettyName(name)
	    this.helpText = field.helpText || ''
	  }
	})

	// ================================================================== Status ===

	/**
	 * @return {boolean} true if the value which will be displayed in the field's
	 *   widget is empty.
	 */
	BoundField.prototype.isEmpty = function() {
	  return this.field.isEmptyValue(this.value())
	}

	/**
	 * @return {boolean} true if the field has a pending async validation.
	 */
	BoundField.prototype.isPending = function() {
	  return typeof this.form._pendingAsyncValidation[this.name] != 'undefined'
	}

	/**
	 * @return {boolean} true if the field has some data in its form's cleanedData.
	 */
	BoundField.prototype.isCleaned = function() {
	  return typeof this.form.cleanedData[this.name] != 'undefined'
	}

	/**
	 * @return {boolean} true if the field's widget will render hidden field(s).
	 */
	BoundField.prototype.isHidden = function() {
	  return this.field.widget.isHidden
	}

	/**
	 * Determines the field's curent status in the form. Statuses are determined in
	 * the following order:
	 * * 'pending' - the field has a pending async validation.
	 * * 'error' - the field has a validation error.
	 * * 'valid' - the field has a value in form.cleanedData.
	 * * 'default' - the field meets none of the above criteria, e.g. it's been
	 *   rendered but hasn't been interacted with or validated yet.
	 * @return {string}
	 */
	BoundField.prototype.status = function() {
	  if (this.isPending()) { return 'pending' }
	  if (this.errors().isPopulated()) { return 'error' }
	  if (this.isCleaned()) { return 'valid' }
	  return 'default'
	}

	// ============================================================== Field Data ===

	/**
	 * Calculates and returns the id attribute for this BoundField if the associated
	 * form has an autoId. Returns an empty string otherwise.
	 */
	BoundField.prototype.autoId = function() {
	  var autoId = this.form.autoId
	  if (autoId) {
	    autoId = ''+autoId
	    if (autoId.indexOf('{name}') != -1) {
	      return format(autoId, {name: this.htmlName})
	    }
	    return this.htmlName
	  }
	  return ''
	}

	/**
	 * @return {*} user input data for the field, or null if none has been given.
	 */
	BoundField.prototype.data = function() {
	  return this.field.widget.valueFromData(this.form.data,
	                                         this.form.files,
	                                         this.htmlName)
	}

	/**
	 * @return {ErrorObject} errors for the field, which may be empty.
	 */
	BoundField.prototype.errors = function() {
	  return this.form.errors(this.name) || new this.form.errorConstructor()
	}

	/**
	 * @return {string=} the first error message for the field, or undefined if
	 *   there were none.
	 */
	BoundField.prototype.errorMessage = function() {
	  return this.errors().first()
	}

	/**
	 * @return {Array.<string>} all error messages for the field, will be empty if
	 *   there were none.
	 */
	BoundField.prototype.errorMessages = function() {
	  return this.errors().messages()
	}

	/**
	 * Gets or generates an id for the field's <label>.
	 * @return {string}
	 */
	BoundField.prototype.idForLabel = function() {
	  var widget = this.field.widget
	  var id = object.get(widget.attrs, 'id', this.autoId())
	  return widget.idForLabel(id)
	}

	/**
	 * @return {*} the value to be displayed in the field's widget.
	 */
	BoundField.prototype.value = function() {
	  var data
	  if (this.form.isInitialRender) {
	    data = this.initialValue()
	  }
	  else {
	    data = this.field.boundData(this.data(),
	                                object.get(this.form.initial,
	                                           this.name,
	                                           this.field.initial))
	  }
	  return this.field.prepareValue(data)
	}

	/**
	 * @return {*} the initial value for the field, will be null if none was
	 *   configured on the field or given to the form.
	 */
	BoundField.prototype.initialValue = function() {
	  var value = object.get(this.form.initial, this.name, this.field.initial)
	  if (is.Function(value)) {
	    value = value()
	  }
	  return value
	}

	// =============================================================== Rendering ===

	/**
	 * Renders a widget for the field.
	 * @param {Object=} kwargs widgets options.
	 * @param {Widget} kwargs.widget an override for the widget used to render the
	 *   field - if not provided, the field's configured widget will be used.
	 * @param {Object} kwargs.attrs additional attributes to be added to the field's
	 *   widget.
	 * @return {ReactElement}
	 */
	BoundField.prototype.asWidget = function(kwargs) {
	  kwargs = object.extend({
	    widget: null, attrs: null, onlyInitial: false
	  }, kwargs)
	  var widget = (kwargs.widget !== null ? kwargs.widget : this.field.widget)
	  var attrs = (kwargs.attrs !== null ? kwargs.attrs : {})
	  var autoId = this.autoId()
	  var name = !kwargs.onlyInitial ? this.htmlName : this.htmlInitialName
	  if (autoId &&
	      typeof attrs.id == 'undefined' &&
	      typeof widget.attrs.id == 'undefined') {
	    attrs.id = (!kwargs.onlyInitial ? autoId : this.htmlInitialId)
	  }
	  if (typeof attrs.key == 'undefined') {
	    attrs.key = name
	  }

	  var validation = this._getValidation(widget)

	  // Always Add an onChange event handler to update form.data when the field is
	  // changed.
	  attrs.onChange = this.form._handleFieldEvent.bind(this.form, {
	    event: 'onChange'
	  , validate: !!validation.onChange
	  , delay: validation.onChangeDelay
	  })

	  // If validation should happen on events other than onChange, also add event
	  // handlers for them.
	  if (validation != 'manual' && validation.events) {
	    for (var i = 0, l = validation.events.length; i < l; i++) {
	      var eventName = validation.events[i]
	      attrs[eventName] =
	        this.form._handleFieldEvent.bind(this.form, {event: eventName})
	    }
	  }

	  var renderKwargs = {attrs:attrs, controlled: this._isControlled(widget)}
	  if (widget.needsInitialValue) {
	    renderKwargs.initialValue = this.initialValue()
	  }
	  return widget.render(name, this.value(), renderKwargs)
	}

	/**
	 * Renders the field as a hidden field.
	 * @param {Object=} kwargs widget options.
	 * @return {ReactElement}
	 */
	BoundField.prototype.asHidden = function(kwargs) {
	  kwargs = object.extend({}, kwargs, {widget: new this.field.hiddenWidget()})
	  return this.asWidget(kwargs)
	}

	/**
	 * Renders the field as a text input.
	 * @param {Object=} kwargs widget options.
	 * @return {ReactElement}
	 */
	BoundField.prototype.asText = function(kwargs) {
	  kwargs = object.extend({}, kwargs, {widget: TextInput()})
	  return this.asWidget(kwargs)
	}

	/**
	 * Renders the field as a textarea.
	 * @param {Object=} kwargs widget options.
	 * @return {ReactElement}
	 */
	BoundField.prototype.asTextarea = function(kwargs) {
	  kwargs = object.extend({}, kwargs, {widget: Textarea()})
	  return this.asWidget(kwargs)
	}

	/**
	 * Determines CSS classes for this field based on what's configured in the field
	 * and form, and the field's current status.
	 * @param {string=} extraCssClasses additional CSS classes for the field.
	 * @return {string} space-separated CSS classes for this field.
	 */
	BoundField.prototype.cssClasses = function(extraCssClasses) {
	  var cssClasses = (extraCssClasses ? [extraCssClasses] : [])

	  // Field/row classes
	  if (this.field.cssClass !== null) {
	    cssClasses.push(this.field.cssClass)
	  }
	  if (typeof this.form.rowCssClass != 'undefined') {
	    cssClasses.push(this.form.rowCssClass)
	  }

	  // Status class
	  var status = this.status()
	  if (typeof this.form[status + 'CssClass'] != 'undefined') {
	    cssClasses.push(this.form[status + 'CssClass'])
	  }

	  // Required-ness classes
	  if (this.field.required) {
	    if (typeof this.form.requiredCssClass != 'undefined') {
	      cssClasses.push(this.form.requiredCssClass)
	    }
	  }
	  else if (typeof this.form.optionalCssClass != 'undefined') {
	    cssClasses.push(this.form.optionalCssClass)
	  }

	  return cssClasses.join(' ')
	}

	/**
	 * Renders a tag containing help text for the field.
	 * @param {Object=} kwargs configuration options.
	 * @param {string} kwargs.tagName allows overriding the type of tag - defaults
	 *   to 'span'.
	 * @param {string} kwargs.contents help text contents - if not provided,
	 *   contents will be taken from the field itself. To render raw HTML in help
	 *   text, it should be specified using the React convention for raw HTML,
	 *   which is to provide an object with a __html property.
	 * @param {Object} kwargs.attrs additional attributes to be added to the tag -
	 *   by default it will get a className of 'helpText'
	 * @return {ReactElement}
	 */
	BoundField.prototype.helpTextTag = function(kwargs) {
	  kwargs = object.extend({
	    tagName: 'span', attrs: null, contents: this.helpText
	  }, kwargs)
	  if (kwargs.contents) {
	    var attrs = object.extend({className: 'helpText'}, kwargs.attrs)
	    var contents = kwargs.contents
	    if (is.Object(contents) && object.hasOwn(contents, '__html')) {
	      attrs.dangerouslySetInnerHTML = contents
	      return React.createElement(kwargs.tagName, attrs)
	    }
	    return React.createElement(kwargs.tagName, attrs, contents)
	  }
	}

	/**
	 * Wraps the given contents in a <label> if the field has an id attribute. If
	 * contents aren't given, uses the field's label.
	 * If attrs are given, they're used as HTML attributes on the <label> tag.
	 * @param {Object=} kwargs configuration options.
	 * @param {string} kwargs.contents contents for the label - if not provided,
	 *   label contents will be generated from the field itself.
	 * @param {Object} kwargs.attrs additional attributes to be added to the label.
	 * @param {string} kwargs.labelSuffix allows overriding the form's labelSuffix.
	 * @return {ReactElement}
	 */
	BoundField.prototype.labelTag = function(kwargs) {
	  kwargs = object.extend({
	    contents: this.label, attrs: null, labelSuffix: this.form.labelSuffix
	  }, kwargs)
	  var contents = this._addLabelSuffix(kwargs.contents, kwargs.labelSuffix)
	  var widget = this.field.widget
	  var id = object.get(widget.attrs, 'id', this.autoId())
	  if (id) {
	    var attrs = object.extend(kwargs.attrs || {}, {htmlFor: widget.idForLabel(id)})
	    contents = React.createElement('label', attrs, contents)
	  }
	  return contents
	}

	/**
	 * @return {ReactElement}
	 */
	BoundField.prototype.render = function(kwargs) {
	  if (this.field.showHiddenInitial) {
	    return React.createElement('div', null, this.asWidget(kwargs),
	                               this.asHidden({onlyInitial: true}))
	  }
	  return this.asWidget(kwargs)
	}

	/**
	 * Returns a list of SubWidgets that comprise all widgets in this BoundField.
	 * This really is only useful for RadioSelect and CheckboxSelectMultiple
	 * widgets, so that you can iterate over individual inputs when rendering.
	 * @return {Array.<SubWidget>}
	 */
	BoundField.prototype.subWidgets = function() {
	  var id = this.field.widget.attrs.id || this.autoId()
	  var kwargs = {attrs: {}}
	  if (id) {
	    kwargs.attrs.id = id
	  }
	  return this.field.widget.subWidgets(this.htmlName, this.value(), kwargs)
	}

	/**
	 * @return {string}
	 */
	BoundField.prototype._addLabelSuffix = function(label, labelSuffix) {
	  // Only add the suffix if the label does not end in punctuation
	  if (labelSuffix && SUFFIX_CHARS.indexOf(label.charAt(label.length - 1)) == -1) {
	    return label + labelSuffix
	  }
	  return label
	}

	/**
	 * Determines if the widget should be a controlled or uncontrolled React
	 * component.
	 * @return {boolean}
	 */
	BoundField.prototype._isControlled = function(widget) {
	  if (arguments.length === 0) {
	    widget = this.field.widget
	  }
	  var controlled = false
	  if (widget.isValueSettable) {
	    // If the field has any controlled config set, it should take precedence,
	    // otherwise use the form's as it has a default.
	    controlled = (this.field.controlled !== null
	                  ? this.field.controlled
	                  : this.form.controlled)
	  }
	  return controlled
	}

	/**
	 * Gets the configured validation for the field or form, allowing the widget
	 * which is going to be rendered to override it if necessary.
	 * @param {Widget=} widget
	 * @return {?(Object|string)}
	 */
	BoundField.prototype._getValidation = function(widget) {
	  // If the field has any validation config set, it should take precedence,
	  // otherwise use the form's as it has a default.
	  var validation = this.field.validation || this.form.validation

	  // Allow widgets to override the type of validation that's used for them -
	  // primarily for inputs which can only be changed by click/selection.
	  if (validation !== 'manual' && widget.validation !== null) {
	    validation = widget.validation
	  }

	  return validation
	}

	module.exports = BoundField

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var Widget = __webpack_require__(59)

	/**
	 * An HTML <textarea> widget.
	 * @param {Object} [kwargs] configuration options
	 * @config {object} [attrs] HTML attributes for the rendered widget. Default
	 *   rows and cols attributes will be used if not provided.
	 * @constructor
	 * @extends {Widget}
	 * @param {Object=} kwargs
	 */
	var Textarea = Widget.extend({
	  constructor: function Textarea(kwargs) {
	    if (!(this instanceof Textarea)) { return new Textarea(kwargs) }
	    // Ensure we have something in attrs
	    kwargs = object.extend({attrs: null}, kwargs)
	    // Provide default 'cols' and 'rows' attributes
	    kwargs.attrs = object.extend({rows: '3', cols: '40'}, kwargs.attrs)
	    Widget.call(this, kwargs)
	  }
	})

	Textarea.prototype.render = function(name, value, kwargs) {
	  kwargs = object.extend({}, kwargs)
	  if (value === null) {
	    value = ''
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {name: name})
	  var valueAttr = (kwargs.controlled ? 'value' : 'defaultValue')
	  finalAttrs[valueAttr] = value
	  return React.createElement('textarea', finalAttrs)
	}

	module.exports = Textarea

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)
	var PasswordInput = __webpack_require__(67)
	var TextInput = __webpack_require__(61)

	var $__0=   __webpack_require__(2),MinLengthValidator=$__0.MinLengthValidator,MaxLengthValidator=$__0.MaxLengthValidator

	/**
	 * Validates that its input is a valid String.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var CharField = Field.extend({
	  constructor: function CharField(kwargs) {
	    if (!(this instanceof CharField)) { return new CharField(kwargs) }
	    kwargs = object.extend({maxLength: null, minLength: null}, kwargs)
	    this.maxLength = kwargs.maxLength
	    this.minLength = kwargs.minLength
	    Field.call(this, kwargs)
	    if (this.minLength !== null) {
	      this.validators.push(MinLengthValidator(this.minLength))
	    }
	    if (this.maxLength !== null) {
	      this.validators.push(MaxLengthValidator(this.maxLength))
	    }
	  }
	})

	/**
	 * @return {string}
	 */
	CharField.prototype.toJavaScript = function(value) {
	  if (this.isEmptyValue(value)) {
	    return ''
	  }
	  return ''+value
	}

	/**
	 * If this field is configured to enforce a maximum length, adds a suitable
	 * maxLength attribute to text input fields.
	 * @param {Widget} widget the widget being used to render this field's value.
	 * @return {Object} additional attributes which should be added to the widget.
	 */
	CharField.prototype.getWidgetAttrs = function(widget) {
	  var attrs = Field.prototype.getWidgetAttrs.call(this, widget)
	  if (this.maxLength !== null && (widget instanceof TextInput ||
	                                  widget instanceof PasswordInput)) {
	    attrs.maxLength = ''+this.maxLength
	  }
	  return attrs
	}

	module.exports = CharField

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var env = __webpack_require__(68)
	var TextInput = __webpack_require__(61)

	/**
	 * An HTML <input type="password"> widget.
	 * @constructor
	 * @extends {TextInput}
	 * @param {Object=} kwargs
	 */
	var PasswordInput = TextInput.extend({
	  constructor: function PasswordInput(kwargs) {
	    if (!(this instanceof PasswordInput)) { return new PasswordInput(kwargs) }
	    kwargs = object.extend({renderValue: false}, kwargs)
	    TextInput.call(this, kwargs)
	    this.renderValue = kwargs.renderValue
	  }
	, inputType: 'password'
	})

	PasswordInput.prototype.render = function(name, value, kwargs) {
	  if (!env.browser && !this.renderValue) {
	    value = ''
	  }
	  return TextInput.prototype.render.call(this, name, value, kwargs)
	}

	module.exports = PasswordInput

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  browser: typeof window != 'undefined'
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	var ChoiceInput = __webpack_require__(70)

	var CheckboxChoiceInput = ChoiceInput.extend({
	  constructor: function CheckboxChoiceInput(name, value, attrs, controlled, choice, index) {
	    if (!(this instanceof CheckboxChoiceInput)) {
	      return new CheckboxChoiceInput(name, value, attrs, controlled, choice, index)
	    }
	    if (!is.Array(value)) {
	      value = [value]
	    }
	    ChoiceInput.call(this, name, value, attrs, controlled, choice, index)
	    for (var i = 0, l = this.value.length; i < l; i++) {
	      this.value[i] = ''+this.value[i]
	    }
	  }
	, inputType: 'checkbox'
	})

	CheckboxChoiceInput.prototype.isChecked = function() {
	  return this.value.indexOf(this.choiceValue) !== -1
	}

	module.exports = CheckboxChoiceInput

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var SubWidget = __webpack_require__(60)
	var Widget = __webpack_require__(59)

	/**
	 * An object used by ChoiceFieldRenderer that represents a single
	 * <input>.
	 */
	var ChoiceInput = SubWidget.extend({
	  constructor: function ChoiceInput(name, value, attrs, controlled, choice, index) {
	    this.name = name
	    this.value = value
	    this.attrs = attrs
	    this.controlled = controlled
	    this.choiceValue = ''+choice[0]
	    this.choiceLabel = ''+choice[1]
	    this.index = index
	    if (typeof this.attrs.id != 'undefined') {
	      this.attrs.id += '_' + this.index
	    }
	    if (typeof this.attrs.key != 'undefined') {
	      this.attrs.key += '_' + this.index
	    }
	  }
	, inputType: null // Subclasses must define this
	})

	/**
	 * Renders a <label> enclosing the widget and its label text.
	 */
	ChoiceInput.prototype.render = function() {
	  var labelAttrs = {}
	  if (this.idForLabel()) {
	    labelAttrs.htmlFor = this.idForLabel()
	  }
	  return React.createElement('label', labelAttrs, this.tag(), ' ', this.choiceLabel)
	}

	ChoiceInput.prototype.isChecked = function() {
	  return this.value === this.choiceValue
	}

	/**
	 * Renders the <input> portion of the widget.
	 */
	ChoiceInput.prototype.tag = function() {
	  var finalAttrs = Widget.prototype.buildAttrs.call(this, {}, {
	    type: this.inputType, name: this.name, value: this.choiceValue
	  })
	  var checkedAttr = (this.controlled ? 'checked' : 'defaultChecked')
	  finalAttrs[checkedAttr] = this.isChecked()
	  return React.createElement('input', finalAttrs)
	}

	ChoiceInput.prototype.idForLabel = function() {
	  return object.get(this.attrs, 'id', '')
	}

	module.exports = ChoiceInput

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CheckboxChoiceInput = __webpack_require__(69)
	var ChoiceFieldRenderer = __webpack_require__(72)

	var CheckboxFieldRenderer = ChoiceFieldRenderer.extend({
	  constructor: function CheckboxFieldRenderer(name, value, attrs, controlled, choices) {
	    if (!(this instanceof CheckboxFieldRenderer)) {
	      return new CheckboxFieldRenderer(name, value, attrs, controlled, choices)
	    }
	    ChoiceFieldRenderer.apply(this, arguments)
	  }
	, choiceInputConstructor: CheckboxChoiceInput
	})

	module.exports = CheckboxFieldRenderer

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	/**
	 * An object used by choice Selects to enable customisation of choice widgets.
	 * @constructor
	 * @param {string} name
	 * @param {string} value
	 * @param {Object} attrs
	 * @param {boolean} controlled
	 * @param {Array} choices
	 */
	var ChoiceFieldRenderer = Concur.extend({
	  constructor: function ChoiceFieldRenderer(name, value, attrs, controlled, choices) {
	    if (!(this instanceof ChoiceFieldRenderer)) {
	      return new ChoiceFieldRenderer(name, value, attrs, controlled, choices)
	    }
	    this.name = name
	    this.value = value
	    this.attrs = attrs
	    this.controlled = controlled
	    this.choices = choices
	  }
	, choiceInputConstructor: null
	})

	ChoiceFieldRenderer.prototype.choiceInputs = function() {
	  var inputs = []
	  for (var i = 0, l = this.choices.length; i < l; i++) {
	    inputs.push(this.choiceInputConstructor(this.name, this.value,
	                                            object.extend({}, this.attrs),
	                                            this.controlled,
	                                            this.choices[i], i))
	  }
	  return inputs
	}

	ChoiceFieldRenderer.prototype.choiceInput = function(i) {
	  if (i >= this.choices.length) {
	    throw new Error('Index out of bounds: ' + i)
	  }
	  return this.choiceInputConstructor(this.name, this.value,
	                                     object.extend({}, this.attrs),
	                                     this.controlled,
	                                     this.choices[i], i)
	  }

	/**
	 * Outputs a <ul> for this set of choice fields.
	 * If an id was given to the field, it is applied to the <ul> (each item in the
	 * list will get an id of `$id_$i`).
	 */
	ChoiceFieldRenderer.prototype.render = function() {
	  var id = object.get(this.attrs, 'id', null)
	  var key = object.pop(this.attrs, 'key', null)
	  var items = []
	  for (var i = 0, l = this.choices.length; i < l; i++) {
	    var choice = this.choices[i]
	    var choiceValue = choice[0]
	    var choiceLabel = choice[1]
	    if (is.Array(choiceLabel)) {
	      var attrsPlus = object.extend({}, this.attrs)
	      if (id) {
	        attrsPlus.id +='_' + i
	      }
	      if (key) {
	        attrsPlus.key += '_' + i
	      }
	      var subRenderer = ChoiceFieldRenderer(this.name, this.value,
	                                            attrsPlus,
	                                            this.controlled,
	                                            choiceLabel)
	      subRenderer.choiceInputConstructor = this.choiceInputConstructor
	      items.push(React.createElement('li', null, choiceValue, subRenderer.render()))
	    }
	    else {
	      var w = this.choiceInputConstructor(this.name, this.value,
	                                          object.extend({}, this.attrs),
	                                          this.controlled,
	                                          choice, i)
	      items.push(React.createElement('li', null, w.render()))
	    }
	  }
	  var listAttrs = {}
	  if (id) {
	    listAttrs.id = id
	  }
	  return React.createElement('ul', listAttrs, items)
	}

	module.exports = ChoiceFieldRenderer

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CheckboxFieldRenderer = __webpack_require__(71)
	var RendererMixin = __webpack_require__(74)
	var SelectMultiple = __webpack_require__(75)

	/**
	 * Multiple selections represented as a list of <input type="checkbox"> widgets.
	 * @constructor
	 * @extends {SelectMultiple}
	 * @param {Object=} kwargs
	 */
	var CheckboxSelectMultiple = SelectMultiple.extend({
	  __mixins__: [RendererMixin]
	, constructor: function(kwargs) {
	    if (!(this instanceof CheckboxSelectMultiple)) { return new CheckboxSelectMultiple(kwargs) }
	    RendererMixin.call(this, kwargs)
	    SelectMultiple.call(this, kwargs)
	  }
	, renderer: CheckboxFieldRenderer
	, _emptyValue: []
	})

	module.exports = CheckboxSelectMultiple

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var object = __webpack_require__(6)

	var RendererMixin = Concur.extend({
	  constructor: function RendererMixin(kwargs) {
	    kwargs = object.extend({renderer: null}, kwargs)
	    // Override the default renderer if we were passed one
	    if (kwargs.renderer !== null) {
	      this.renderer = kwargs.renderer
	    }
	  }
	, _emptyValue: null
	, validation: {onChange: true}
	})

	RendererMixin.prototype.subWidgets = function(name, value, kwargs) {
	  return this.getRenderer(name, value, kwargs).choiceInputs()
	}

	/**
	 * @return an instance of the renderer to be used to render this widget.
	 */
	RendererMixin.prototype.getRenderer = function(name, value, kwargs) {
	  kwargs = object.extend({choices: [], controlled: false}, kwargs)
	  if (value === null) {
	    value = this._emptyValue
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs)
	  var choices = this.choices.concat(kwargs.choices)
	  return new this.renderer(name, value, finalAttrs, kwargs.controlled, choices)
	}

	RendererMixin.prototype.render = function(name, value, kwargs) {
	  return this.getRenderer(name, value, kwargs).render()
	}

	/**
	 * Widgets using this RendererMixin are made of a collection of subwidgets, each
	 * with their own <label>, and distinct ID.
	 * The IDs are made distinct by y "_X" suffix, where X is the zero-based index
	 * of the choice field. Thus, the label for the main widget should reference the
	 * first subwidget, hence the "_0" suffix.
	 */
	RendererMixin.prototype.idForLabel = function(id) {
	  if (id) {
	    id += '_0'
	  }
	  return id
	}

	module.exports = RendererMixin

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var Select = __webpack_require__(76)

	/**
	 * An HTML <select> widget which allows multiple selections.
	 * @constructor
	 * @extends {Select}
	 * @param {Object=} kwargs
	 */
	var SelectMultiple = Select.extend({
	  constructor: function SelectMultiple(kwargs) {
	    if (!(this instanceof SelectMultiple)) { return new SelectMultiple(kwargs) }
	    Select.call(this, kwargs)
	  }
	, allowMultipleSelected: true
	, validation: {onChange: true}
	})

	/**
	 * Renders the widget.
	 * @param {string} name the field name.
	 * @param {Array} selectedValues the values of options which should be marked as
	 *   selected, or null if no values are selected - these will be normalised to
	 *   Strings for comparison with choice values.
	 * @param {Object} [kwargs] additional rendering options.
	 * @return a <select> element which allows multiple selections.
	 */
	SelectMultiple.prototype.render = function(name, selectedValues, kwargs) {
	  kwargs = object.extend({choices: []}, kwargs)
	  if (selectedValues === null) {
	    selectedValues = []
	  }
	  if (!is.Array(selectedValues)) {
	    selectedValues = [selectedValues]
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {name: name,
	                                                  multiple: 'multiple'})
	  var options = this.renderOptions(kwargs.choices)
	  var valueAttr = (kwargs.controlled ? 'value' : 'defaultValue')
	  finalAttrs[valueAttr] = selectedValues
	  return React.createElement('select', finalAttrs, options)
	}

	/**
	 * Retrieves values for this widget from the given data.
	 * @param {Object} data form data.
	 * @param {Object} files file data.
	 * @param {string} name the field name to be used to retrieve data.
	 * @return {Array} values for this widget, or null if no values were provided.
	 */
	SelectMultiple.prototype.valueFromData = function(data, files, name) {
	  if (object.hasOwn(data, name) && data[name] != null) {
	    return [].concat(data[name])
	  }
	  return null
	}

	module.exports = SelectMultiple


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var Widget = __webpack_require__(59)

	var $__0=  __webpack_require__(15),normaliseChoices=$__0.normaliseChoices

	/**
	 * An HTML <select> widget.
	 * @constructor
	 * @extends {Widget}
	 * @param {Object=} kwargs
	 */
	var Select = Widget.extend({
	  constructor: function Select(kwargs) {
	    if (!(this instanceof Select)) { return new Select(kwargs) }
	    kwargs = object.extend({choices: []}, kwargs)
	    Widget.call(this, kwargs)
	    this.choices = normaliseChoices(kwargs.choices)
	  }
	, allowMultipleSelected: false
	, validation: {onChange: true}
	})

	/**
	 * Renders the widget.
	 * @param {string} name the field name.
	 * @param {*} selectedValue the value of an option which should be marked as
	 *   selected, or null if no value is selected -- will be normalised to a String
	 *   for comparison with choice values.
	 * @param {Object=} kwargs rendering options
	 * @param {Object=} kwargs.attrs additional HTML attributes for the rendered widget.
	 * @param {Array=} kwargs.choices choices to be used when rendering the widget, in
	 *   addition to those already held by the widget itself.
	 * @return a <select> element.
	 */
	Select.prototype.render = function(name, selectedValue, kwargs) {
	  kwargs = object.extend({choices: []}, kwargs)
	  if (selectedValue === null) {
	    selectedValue = ''
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {name: name})
	  var options = this.renderOptions(kwargs.choices)
	  var valueAttr = (kwargs.controlled ? 'value' : 'defaultValue')
	  finalAttrs[valueAttr] = selectedValue
	  return React.createElement('select', finalAttrs, options)
	}

	Select.prototype.renderOptions = function(additionalChoices) {
	  var options = []
	  var choices = this.choices.concat(normaliseChoices(additionalChoices))
	  for (var i = 0, l = choices.length, choice; i < l; i++) {
	    choice = choices[i]
	    if (is.Array(choice[1])) {
	      var optgroupOptions = []
	      var optgroupChoices = choice[1]
	      for (var j = 0, m = optgroupChoices.length; j < m; j++) {
	        optgroupOptions.push(this.renderOption(optgroupChoices[j][0],
	                                               optgroupChoices[j][1]))
	      }
	      options.push(React.createElement('optgroup', {label: choice[0], key: choice[9]}, optgroupOptions))
	    }
	    else {
	      options.push(this.renderOption(choice[0],
	                                     choice[1]))
	    }
	  }
	  return options
	}

	Select.prototype.renderOption = function(optValue, optLabel) {
	  optValue = ''+optValue
	  var attrs = {value: optValue, key: optValue + optLabel}
	  return React.createElement('option', attrs, optLabel)
	}

	module.exports = Select


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)
	var Select = __webpack_require__(76)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError
	var $__1=  __webpack_require__(15),normaliseChoices=$__1.normaliseChoices

	/**
	 * Validates that its input is one of a valid list of choices.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var ChoiceField = Field.extend({
	  widget: Select
	, defaultErrorMessages: {
	    invalidChoice: 'Select a valid choice. {value} is not one of the available choices.'
	  }

	, constructor: function ChoiceField(kwargs) {
	    if (!(this instanceof ChoiceField)) { return new ChoiceField(kwargs) }
	    kwargs = object.extend({choices: []}, kwargs)
	    Field.call(this, kwargs)
	    this.setChoices(kwargs.choices)
	  }
	})

	ChoiceField.prototype.choices = function() { return this._choices }
	ChoiceField.prototype.setChoices = function(choices) {
	  // Setting choices also sets the choices on the widget
	  this._choices = this.widget.choices = normaliseChoices(choices)
	}

	ChoiceField.prototype.toJavaScript = function(value) {
	  if (this.isEmptyValue(value)) {
	    return ''
	  }
	  return ''+value
	}

	/**
	 * Validates that the given value is in this field's choices.
	 */
	ChoiceField.prototype.validate = function(value) {
	  Field.prototype.validate.call(this, value)
	  if (value && !this.validValue(value)) {
	    throw ValidationError(this.errorMessages.invalidChoice, {
	      code: 'invalidChoice'
	    , params: {value: value}
	    })
	  }
	}

	/**
	 * Checks to see if the provided value is a valid choice.
	 * @param {string} value the value to be validated.
	 */
	ChoiceField.prototype.validValue = function(value) {
	  var choices = this.choices()
	  for (var i = 0, l = choices.length; i < l; i++) {
	    if (is.Array(choices[i][1])) {
	      // This is an optgroup, so look inside the group for options
	      var optgroupChoices = choices[i][1]
	      for (var j = 0, m = optgroupChoices.length; j < m; j++) {
	        if (value === ''+optgroupChoices[j][0]) {
	          return true
	        }
	      }
	    }
	    else if (value === ''+choices[i][0]) {
	      return true
	    }
	  }
	  return false
	}

	module.exports = ChoiceField

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var CheckboxInput = __webpack_require__(63)
	var FileInput = __webpack_require__(79)

	var $__0=  __webpack_require__(15),formatToArray=$__0.formatToArray

	var FILE_INPUT_CONTRADICTION = {}

	/**
	 * @constructor
	 * @extends {FileInput}
	 * @param {Object=} kwargs
	 */
	var ClearableFileInput = FileInput.extend({
	  needsInitialValue: true
	, isValueSettable: false
	, constructor: function ClearableFileInput(kwargs) {
	    if (!(this instanceof ClearableFileInput)) { return new ClearableFileInput(kwargs) }
	    FileInput.call(this, kwargs)
	  }
	, initialText: 'Currently'
	, inputText: 'Change'
	, clearCheckboxLabel: 'Clear'
	, templateWithInitial: function(params) {
	    return formatToArray(
	      '{initialText}: {initial} {clearTemplate}{br}{inputText}: {input}'
	    , object.extend(params, {br: React.createElement('br', null)})
	    )
	  }
	, templateWithClear: function(params) {
	    return formatToArray(
	      '{checkbox} {label}'
	    , object.extend(params, {
	        label: React.createElement('label', {htmlFor: params.checkboxId}, params.label)
	      })
	    )
	  }
	, urlMarkupTemplate: function(href, name) {
	    return React.createElement('a', {href: href}, name)
	  }
	})

	ClearableFileInput.FILE_INPUT_CONTRADICTION = FILE_INPUT_CONTRADICTION

	/**
	 * Given the name of the file input, return the name of the clear checkbox
	 * input.
	 */
	ClearableFileInput.prototype.clearCheckboxName = function(name) {
	  return name + '-clear'
	}

	/**
	 * Given the name of the clear checkbox input, return the HTML id for it.
	 */
	ClearableFileInput.prototype.clearCheckboxId = function(name) {
	  return name + '_id'
	}

	ClearableFileInput.prototype.render = function(name, value, kwargs) {
	  kwargs = object.extend({attrs: {}}, kwargs)
	  kwargs.attrs.key = 'input'
	  var input = FileInput.prototype.render.call(this, name, value, kwargs)
	  var initialValue = kwargs.initialValue
	  if (!initialValue && value && typeof value.url != 'undefined') {
	    initialValue = value
	  }
	  if (initialValue && typeof initialValue.url != 'undefined') {
	    var clearTemplate
	    if (!this.isRequired) {
	      var clearCheckboxName = this.clearCheckboxName(name)
	      var clearCheckboxId = this.clearCheckboxId(clearCheckboxName)
	      clearTemplate = this.templateWithClear({
	        checkbox: CheckboxInput().render(clearCheckboxName, false, {attrs: {'id': clearCheckboxId}})
	      , checkboxId: clearCheckboxId
	      , label: this.clearCheckboxLabel
	      })
	    }
	    var contents = this.templateWithInitial({
	      initialText: this.initialText
	    , initial: this.urlMarkupTemplate(initialValue.url, ''+initialValue)
	    , clearTemplate: clearTemplate
	    , inputText: this.inputText
	    , input: input
	    })
	    return React.createElement('span', null, contents)
	  }
	  else {
	    return React.createElement('span', null, input)
	  }
	}

	ClearableFileInput.prototype.valueFromData = function(data, files, name) {
	  var upload = FileInput.prototype.valueFromData(data, files, name)
	  if (!this.isRequired &&
	      CheckboxInput.prototype.valueFromData.call(this, data, files,
	                                                 this.clearCheckboxName(name))) {
	    if (upload) {
	      // If the user contradicts themselves (uploads a new file AND
	      // checks the "clear" checkbox), we return a unique marker
	      // object that FileField will turn into a ValidationError.
	      return FILE_INPUT_CONTRADICTION
	    }
	    // false signals to clear any existing value, as opposed to just null
	    return false
	  }
	  return upload
	}

	module.exports = ClearableFileInput

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var Input = __webpack_require__(22)

	var env =__webpack_require__(68)

	/**
	 * An HTML <input type="file"> widget.
	 * @constructor
	 * @extends {Input}
	 * @param {Object=} kwargs
	 */
	var FileInput = Input.extend({
	  constructor: function FileInput(kwargs) {
	    if (!(this instanceof FileInput)) { return new FileInput(kwargs) }
	    Input.call(this, kwargs)
	  }
	, inputType: 'file'
	, needsMultipartForm: true
	, validation: {onChange: true}
	, isValueSettable: false
	})

	FileInput.prototype.render = function(name, value, kwargs) {
	  return Input.prototype.render.call(this, name, null, kwargs)
	}

	/**
	 * On the client, files will be populated with File objects from the input's
	 * FileList when supported, otherwise its value will be in data as a fallback.
	 */
	FileInput.prototype.valueFromData = function(data, files, name) {
	  var dataSource = files
	  if (env.browser && !(name in files)) {
	    dataSource = data
	  }
	  return object.get(dataSource, name, null)
	}

	module.exports = FileInput

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)

	/**
	 * A Field whose clean() method calls multiple Field clean() methods.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var ComboField = Field.extend({
	  constructor: function ComboField(kwargs) {
	    if (!(this instanceof ComboField)) { return new ComboField(kwargs) }
	    kwargs = object.extend({fields: []}, kwargs)
	    Field.call(this, kwargs)
	    // Set required to False on the individual fields, because the required
	    // validation will be handled by ComboField, not by those individual fields.
	    for (var i = 0, l = kwargs.fields.length; i < l; i++) {
	      kwargs.fields[i].required = false
	    }
	    this.fields = kwargs.fields
	  }
	})

	ComboField.prototype.clean = function(value) {
	  Field.prototype.clean.call(this, value)
	  for (var i = 0, l = this.fields.length; i < l; i++) {
	    value = this.fields[i].clean(value)
	  }
	  return value
	}

	module.exports = ComboField

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BaseTemporalField = __webpack_require__(18)
	var DateInput = __webpack_require__(82)

	/**
	 * Validates that its input is a date.
	 * @constructor
	 * @extends {BaseTemporalField}
	 * @param {Object=} kwargs
	 */
	var DateField = BaseTemporalField.extend({
	  widget: DateInput
	, inputFormatType: 'DATE_INPUT_FORMATS'
	, defaultErrorMessages: {
	    invalid: 'Enter a valid date.'
	  }

	, constructor: function DateField(kwargs) {
	    if (!(this instanceof DateField)) { return new DateField(kwargs) }
	    BaseTemporalField.call(this, kwargs)
	  }
	})

	/**
	 * Validates that the input can be converted to a date.
	 * @param {?(string|Date)} value user input.
	 * @return {?Date} a with its year, month and day attributes set, or null for
	 *   empty values when they are allowed.
	 * @throws {ValidationError} if the input is invalid.
	 */
	DateField.prototype.toJavaScript = function(value) {
	  if (this.isEmptyValue(value)) {
	    return null
	  }
	  if (value instanceof Date) {
	    return new Date(value.getFullYear(), value.getMonth(), value.getDate())
	  }
	  return BaseTemporalField.prototype.toJavaScript.call(this, value)
	}

	module.exports = DateField

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DateTimeBaseInput = __webpack_require__(83)

	/**
	 * @constructor
	 * @extends {DateTimeBaseInput}
	 * @param {Object=} kwargs
	 */
	var DateInput = DateTimeBaseInput.extend({
	  formatType: 'DATE_INPUT_FORMATS'
	, constructor: function DateInput(kwargs) {
	    if (!(this instanceof DateInput)) { return new DateInput(kwargs) }
	    DateTimeBaseInput.call(this, kwargs)
	  }
	})

	module.exports = DateInput

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var time = __webpack_require__(14)

	var formats = __webpack_require__(19)
	var locales = __webpack_require__(13)
	var TextInput = __webpack_require__(61)

	/**
	 * A <input type="text"> which, if given a Date object to display, formats it as
	 * an appropriate date/time String.
	 * @constructor
	 * @extends {TextInput}
	 * @param {Object=} kwargs
	 */
	var DateTimeBaseInput = TextInput.extend({
	  formatType: ''
	, constructor: function DateTimeBaseInput(kwargs) {
	    kwargs = object.extend({format: null}, kwargs)
	    TextInput.call(this, kwargs)
	    this.format = kwargs.format
	  }
	})

	DateTimeBaseInput.prototype._formatValue = function(value) {
	  if (is.Date(value)) {
	    if (this.format === null) {
	      this.format = formats.getFormat(this.formatType)[0]
	    }
	    return time.strftime(value, this.format, locales.getDefaultLocale())
	  }
	  return value
	}

	module.exports = DateTimeBaseInput

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	var BaseTemporalField = __webpack_require__(18)
	var DateTimeInput = __webpack_require__(85)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * Validates that its input is a date/time.
	 * @constructor
	 * @extends {BaseTemporalField}
	 * @param {Object=} kwargs
	 */
	var DateTimeField = BaseTemporalField.extend({
	  widget: DateTimeInput
	, inputFormatType: 'DATETIME_INPUT_FORMATS'
	, defaultErrorMessages: {
	    invalid: 'Enter a valid date/time.'
	  }

	, constructor: function DateTimeField(kwargs) {
	    if (!(this instanceof DateTimeField)) { return new DateTimeField(kwargs) }
	    BaseTemporalField.call(this, kwargs)
	  }
	})

	/**
	 * @param {?(string|Date|Array.<string>)} value user input.
	 * @return {?Date}
	 * @throws {ValidationError} if the input is invalid.
	 */
	DateTimeField.prototype.toJavaScript = function(value) {
	  if (this.isEmptyValue(value)) {
	    return null
	  }
	  if (value instanceof Date) {
	    return value
	  }
	  if (is.Array(value)) {
	    // Input comes from a SplitDateTimeWidget, for example, so it's two
	    // components: date and time.
	    if (value.length != 2) {
	      throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	    }
	    if (this.isEmptyValue(value[0]) && this.isEmptyValue(value[1])) {
	      return null
	    }
	    value = value.join(' ')
	  }
	  return BaseTemporalField.prototype.toJavaScript.call(this, value)
	}


	module.exports = DateTimeField

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DateTimeBaseInput = __webpack_require__(83)

	/**
	 * @constructor
	 * @extends {DateTimeBaseInput}
	 * @param {Object=} kwargs
	 */
	var DateTimeInput = DateTimeBaseInput.extend({
	  formatType: 'DATETIME_INPUT_FORMATS'
	, constructor: function DateTimeInput(kwargs) {
	    if (!(this instanceof DateTimeInput)) { return new DateTimeInput(kwargs) }
	    DateTimeBaseInput.call(this, kwargs)
	  }
	})

	module.exports = DateTimeInput

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)
	var IntegerField = __webpack_require__(87)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError
	var $__1=  __webpack_require__(15),strip=$__1.strip

	/**
	 * Validates that its input is a decimal number.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var DecimalField = IntegerField.extend({
	  defaultErrorMessages: {
	    invalid: 'Enter a number.'
	  , maxDigits: 'Ensure that there are no more than {max} digits in total.'
	  , maxDecimalPlaces: 'Ensure that there are no more than {max} decimal places.'
	  , maxWholeDigits: 'Ensure that there are no more than {max} digits before the decimal point.'
	  }

	, constructor: function DecimalField(kwargs) {
	    if (!(this instanceof DecimalField)) { return new DecimalField(kwargs) }
	    kwargs = object.extend({maxDigits: null, decimalPlaces: null}, kwargs)
	    this.maxDigits = kwargs.maxDigits
	    this.decimalPlaces = kwargs.decimalPlaces
	    IntegerField.call(this, kwargs)
	  }
	})

	/** Decimal validation regular expression, in lieu of a Decimal type. */
	DecimalField.DECIMAL_REGEXP = /^[-+]?(?:\d+(?:\.\d*)?|(?:\d+)?\.\d+)$/

	/**
	 * DecimalField overrides the clean() method as it performs its own validation
	 * against a different value than that given to any defined validators, due to
	 * JavaScript lacking a built-in Decimal type. Decimal format and component size
	 * checks will be performed against a normalised string representation of the
	 * input, whereas Validators will be passed a float version of the value for
	 * min/max checking.
	 * @param {string|Number} value
	 * @return {string} a normalised version of the input.
	 */
	DecimalField.prototype.clean = function(value) {
	  // Take care of empty, required validation
	  Field.prototype.validate.call(this, value)
	  if (this.isEmptyValue(value)) {
	    return null
	  }

	  // Coerce to string and validate that it looks Decimal-like
	  value = strip(''+value)
	  if (!DecimalField.DECIMAL_REGEXP.test(value)) {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }

	  // In lieu of a Decimal type, DecimalField validates against a string
	  // representation of a Decimal, in which:
	  // * Any leading sign has been stripped
	  var negative = false
	  if (value.charAt(0) == '+' || value.charAt(0) == '-') {
	    negative = (value.charAt(0) == '-')
	    value = value.substr(1)
	  }
	  // * Leading zeros have been stripped from digits before the decimal point,
	  //   but trailing digits are retained after the decimal point.
	  value = value.replace(/^0+/, '')
	  // Reset to zero if we just wiped out all the digits in the input
	  if (value === '' || value == '.') {
	    value = '0'
	  }
	  // * If the input ended with a '.', it is stripped
	  if (value.indexOf('.') == value.length - 1) {
	    value = value.substring(0, value.length - 1)
	  }

	  // Perform own validation
	  var pieces = value.split('.')
	  var wholeDigits = pieces[0].length
	  var decimals = (pieces.length == 2 ? pieces[1].length : 0)
	  var digits = wholeDigits + decimals
	  if (this.maxDigits !== null && digits > this.maxDigits) {
	    throw ValidationError(this.errorMessages.maxDigits, {
	      code: 'maxDigits'
	    , params: {max: this.maxDigits}
	    })
	  }
	  if (this.decimalPlaces !== null && decimals > this.decimalPlaces) {
	    throw ValidationError(this.errorMessages.maxDecimalPlaces, {
	      code: 'maxDecimalPlaces'
	    , params: {max: this.decimalPlaces}
	    })
	  }
	  if (this.maxDigits !== null &&
	      this.decimalPlaces !== null &&
	      wholeDigits > (this.maxDigits - this.decimalPlaces)) {
	    throw ValidationError(this.errorMessages.maxWholeDigits, {
	      code: 'maxWholeDigits'
	    , params: {max: (this.maxDigits - this.decimalPlaces)}
	    })
	  }

	  // * Values which did not have a leading zero gain a single leading zero
	  if (value.charAt(0) == '.') {
	    value = '0' + value
	  }
	  // Restore sign if necessary
	  if (negative) {
	    value = '-' + value
	  }

	  // Validate against a float value - best we can do in the meantime
	  this.runValidators(parseFloat(value))

	  // Return the normalised String representation
	  return value
	}

	DecimalField.prototype.getWidgetAttrs = function(widget) {
	  var attrs = IntegerField.prototype.getWidgetAttrs.call(this, widget)
	   if (!object.hasOwn(widget.attrs, 'step')) {
	    var step = 'any'
	    if (this.decimalPlaces !== null) {
	      // Use exponential notation for small values since they might
	      // be parsed as 0 otherwise.
	      if (this.decimalPlaces === 0) {
	        step = '1'
	      }
	      else if (this.decimalPlaces < 7) {
	        step = '0.' + '000001'.slice(-this.decimalPlaces)
	      }
	      else {
	        step = '1e-' + this.decimalPlaces
	      }
	    }
	    object.setDefault(attrs, 'step', step)
	  }
	  return attrs
	}

	module.exports = DecimalField

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var Field = __webpack_require__(20)
	var NumberInput = __webpack_require__(88)

	var $__0=    __webpack_require__(2),MaxValueValidator=$__0.MaxValueValidator,MinValueValidator=$__0.MinValueValidator,ValidationError=$__0.ValidationError

	/**
	 * Validates that its input is a valid integer.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var IntegerField = Field.extend({
	  widget: NumberInput
	, defaultErrorMessages: {
	    invalid: 'Enter a whole number.'
	  }

	, constructor: function IntegerField(kwargs) {
	    if (!(this instanceof IntegerField)) { return new IntegerField(kwargs) }
	    kwargs = object.extend({maxValue: null, minValue: null}, kwargs)
	    this.maxValue = kwargs.maxValue
	    this.minValue = kwargs.minValue
	    Field.call(this, kwargs)

	    if (this.minValue !== null) {
	      this.validators.push(MinValueValidator(this.minValue))
	    }
	    if (this.maxValue !== null) {
	      this.validators.push(MaxValueValidator(this.maxValue))
	    }
	  }
	})

	/**
	 * Validates that Number() can be called on the input with a result that isn't
	 * NaN and doesn't contain any decimal points.
	 * @param {*} value user input.
	 * @return {?number} the result of Number(), or null for empty values.
	 * @throws {ValidationError} if the input is invalid.
	 */
	IntegerField.prototype.toJavaScript = function(value) {
	  value = Field.prototype.toJavaScript.call(this, value)
	  if (this.isEmptyValue(value)) {
	    return null
	  }
	  value = Number(value)
	  if (isNaN(value) || value.toString().indexOf('.') != -1) {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }
	  return value
	}

	IntegerField.prototype.getWidgetAttrs = function(widget) {
	  var attrs = Field.prototype.getWidgetAttrs.call(this, widget)
	  if (this.minValue !== null && !object.hasOwn(widget.attrs, 'min')) {
	    object.setDefault(attrs, 'min', this.minValue)
	  }
	  if (this.maxValue !== null && !object.hasOwn(widget.attrs, 'max')) {
	    object.setDefault(attrs, 'max', this.maxValue)
	  }
	  return attrs
	}

	module.exports = IntegerField

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TextInput = __webpack_require__(61)

	/**
	 * An HTML <input type="number"> widget.
	 * @constructor
	 * @extends {TextInput}
	 * @param {Object=} kwargs
	 */
	var NumberInput = TextInput.extend({
	  constructor: function NumberInput(kwargs) {
	    if (!(this instanceof NumberInput)) { return new NumberInput(kwargs) }
	    TextInput.call(this, kwargs)
	  }
	, inputType: 'number'
	})

	module.exports = NumberInput

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(15)

	var CharField = __webpack_require__(66)
	var EmailInput = __webpack_require__(90)

	var $__0=  __webpack_require__(2),validateEmail=$__0.validateEmail

	/**
	 * Validates that its input appears to be a valid e-mail address.
	 * @constructor
	 * @extends {CharField}
	 * @param {Object=} kwargs
	 */
	var EmailField = CharField.extend({
	  widget: EmailInput
	, defaultValidators: [validateEmail]

	, constructor: function EmailField(kwargs) {
	    if (!(this instanceof EmailField)) { return new EmailField(kwargs) }
	    CharField.call(this, kwargs)
	  }
	})

	EmailField.prototype.clean = function(value) {
	  value = util.strip(this.toJavaScript(value))
	  return CharField.prototype.clean.call(this, value)
	}


	module.exports = EmailField

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TextInput = __webpack_require__(61)

	/**
	 * An HTML <input type="email"> widget.
	 * @constructor
	 * @extends {TextInput}
	 * @param {Object=} kwargs
	 */
	var EmailInput = TextInput.extend({
	  constructor: function EmailInput(kwargs) {
	    if (!(this instanceof EmailInput)) { return new EmailInput(kwargs) }
	    TextInput.call(this, kwargs)
	  }
	, inputType: 'email'
	})

	module.exports = EmailInput

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * A list of errors which knows how to display itself in various formats.
	 * @param {Array=} list a list of errors.
	 * @constructor
	 */
	var ErrorList = Concur.extend({
	  constructor: function ErrorList(list) {
	    if (!(this instanceof ErrorList)) { return new ErrorList(list) }
	    this.data = list || []
	  }
	})

	/**
	 * @param {Array.<Object>} list
	 * @return {ErrorList}
	 */
	ErrorList.fromJSON = function(list) {
	  var result = new ErrorList()
	  result.fromJSON(list)
	  return result
	}

	/**
	 * Adds more errors.
	 * @param {Array} errorList a list of errors.
	 */
	ErrorList.prototype.extend = function(errorList) {
	  this.data.push.apply(this.data, errorList)
	}

	/**
	 * @return {number} the number of errors.
	 */
	ErrorList.prototype.length = function() {
	  return this.data.length
	}

	/**
	 * @return {boolean} true if any errors are present.
	 */
	ErrorList.prototype.isPopulated = function() {
	  return (this.length() > 0)
	}

	/**
	 * @return {string} the first message held in this ErrorList.
	 */
	ErrorList.prototype.first = function() {
	  if (this.data.length > 0) {
	    var error = this.data[0]
	    if (error instanceof ValidationError) {
	      error = error.messages()[0]
	    }
	    return error
	  }
	}

	/**
	 * @return {Array.<string>} the list of messages held in this ErrorList.
	 */
	ErrorList.prototype.messages = function() {
	  var messages = []
	  for (var i = 0, l = this.data.length; i < l; i++) {
	    var error = this.data[i]
	    if (error instanceof ValidationError) {
	      error = error.messages()[0]
	    }
	    messages.push(error)
	  }
	  return messages
	}

	/**
	 * Default display is as a list.
	 * @return {ReactElement}
	 */
	ErrorList.prototype.render = function(kwargs) {
	  return this.asUl(kwargs)
	}

	/**
	 * Displays errors as a list.
	 * @return {ReactElement}
	 */
	ErrorList.prototype.asUl = function(kwargs) {
	  if (!this.isPopulated()) {
	    return
	  }
	  kwargs = object.extend({className: 'errorlist'}, kwargs)
	  return React.createElement('ul', {className: kwargs.className},
	    this.messages().map(function(error) {
	      return React.createElement('li', null, error)
	    })
	  )
	}

	/**
	 * Displays errors as text.
	 * @return {string}
	 */
	ErrorList.prototype.asText = ErrorList.prototype.toString =function() {
	  return this.messages().map(function(error) {
	    return '* ' + error
	  }).join('\n')
	}

	/**
	 * @return {Array}
	 */
	ErrorList.prototype.asData = function() {
	  return this.data
	}

	/**
	 * @return {Object}
	 */
	ErrorList.prototype.toJSON = function() {
	  return new ValidationError(this.data).errorList.map(function(error) {
	    return {
	      message: error.messages()[0]
	    , code: error.code || ''
	    }
	  })
	}

	/**
	 * @param {Array.<Object>} list
	 */
	ErrorList.prototype.fromJSON = function(list) {
	  this.data = list.map(function(err) {
	    return new ValidationError(err.message, {code: err.code})
	  })
	}

	module.exports = ErrorList


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Concur = __webpack_require__(4)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var ErrorList = __webpack_require__(91)

	/**
	 * A collection of field errors that knows how to display itself in various
	 * formats. This object's .error properties are the field names and
	 * corresponding values are the errors.
	 * @constructor
	 */
	var ErrorObject = Concur.extend({
	  constructor: function ErrorObject() {
	    if (!(this instanceof ErrorObject)) { return new ErrorObject() }
	    this.errors = {}
	  }
	})

	/**
	 * @param {Object} jsonObj
	 * @param {function=} errorConstructor
	 * @return {ErrorObject}
	 */
	ErrorObject.fromJSON = function(jsonObj, errorConstructor) {
	  var result = new ErrorObject()
	  result.fromJSON(jsonObj, errorConstructor)
	  return result
	}

	/**
	 * Sets a field's errors.
	 * @param {string} fieldName
	 * @param {ErrorList} errors
	 */
	ErrorObject.prototype.set = function(fieldName, errors) {
	  this.errors[fieldName] = errors
	}

	/**
	 * Gets a field's errors.
	 * @param {string} fieldName
	 * @return {ErrorList}
	 */
	ErrorObject.prototype.get = function(fieldName) {
	  return this.errors[fieldName]
	}

	/**
	 * Removes errors for a field.
	 * @param {string} fieldName
	 * @return {boolean} true if there were errors for the field.
	 */
	ErrorObject.prototype.remove = function(fieldName) {
	  return delete this.errors[fieldName]
	}

	/**
	 * Removes errors for multiple fields.
	 * @param {Array.<string>} fieldNames
	 */
	ErrorObject.prototype.removeAll = function(fieldNames) {
	  for (var i = 0, l = fieldNames.length; i < l; i++) {
	    delete this.errors[fieldNames[i]]
	  }
	}

	/**
	 * @return {boolean} true if the field has errors.
	 */
	ErrorObject.prototype.hasField = function(fieldName) {
	  return object.hasOwn(this.errors, fieldName)
	}

	/**
	 * @return {number}
	 */
	ErrorObject.prototype.length = function() {
	  return Object.keys(this.errors).length
	}

	/**
	 * @return {boolean} true if any errors are present.
	 */
	ErrorObject.prototype.isPopulated = function() {
	  return (this.length() > 0)
	}

	/**
	 * Default display is as a list.
	 * @return {ReactElement}
	 */
	ErrorObject.prototype.render = function(kwargs) {
	  return this.asUl(kwargs)
	}

	/**
	 * Displays error details as a list.
	 * @return {ReactElement}
	 */
	ErrorObject.prototype.asUl = function(kwargs) {
	  kwargs = object.extend({className: 'errorlist'}, kwargs)
	  var items = Object.keys(this.errors).map(function(fieldName) {
	    return React.createElement('li', null, fieldName, this.errors[fieldName].asUl())
	  }.bind(this))
	  if (items.length === 0) { return }
	  return React.createElement('ul', {className: kwargs.className}, items)
	}

	/**
	 * Displays error details as text.
	 * @return {string}
	 */
	ErrorObject.prototype.asText = ErrorObject.prototype.toString = function() {
	  return Object.keys(this.errors).map(function(fieldName) {
	    var messages = this.errors[fieldName].messages()
	    return ['* ' + fieldName].concat(messages.map(function(message) {
	      return ('  * ' + message)
	    })).join('\n')
	  }.bind(this)).join('\n')
	}

	/**
	 * @return {Object}
	 */
	ErrorObject.prototype.asData = function() {
	  var data = {}
	  Object.keys(this.errors).map(function(fieldName) {
	    data[fieldName] = this.errors[fieldName].asData()
	  }.bind(this))
	  return data
	}

	/**
	 * @return {Object}
	 */
	ErrorObject.prototype.toJSON = function() {
	  var jsonObj = {}
	  Object.keys(this.errors).map(function(fieldName) {
	    jsonObj[fieldName] = this.errors[fieldName].toJSON()
	  }.bind(this))
	  return jsonObj
	}

	/**
	 * @param {Object} jsonObj
	 * @param {function=} errorConstructor
	 */
	ErrorObject.prototype.fromJSON = function(jsonObj, errorConstructor) {
	  errorConstructor = errorConstructor || ErrorList
	  this.errors = {}
	  var fieldNames = Object.keys(jsonObj)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    var fieldName = fieldNames[i]
	    this.errors[fieldName] = errorConstructor.fromJSON(jsonObj[fieldName])
	  }
	}

	module.exports = ErrorObject


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var env = __webpack_require__(68)

	var ClearableFileInput = __webpack_require__(78)
	var Field = __webpack_require__(20)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * Validates that its input is a valid uploaded file.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var FileField = Field.extend({
	  widget: ClearableFileInput
	, defaultErrorMessages: {
	    invalid: 'No file was submitted. Check the encoding type on the form.'
	  , missing: 'No file was submitted.'
	  , empty: 'The submitted file is empty.'
	  , maxLength: 'Ensure this filename has at most {max} characters (it has {length}).'
	  , contradiction: 'Please either submit a file or check the clear checkbox, not both.'
	  }

	, constructor: function FileField(kwargs) {
	    if (!(this instanceof FileField)) { return new FileField(kwargs) }
	    kwargs = object.extend({maxLength: null, allowEmptyFile: false}, kwargs)
	    this.maxLength = kwargs.maxLength
	    this.allowEmptyFile = kwargs.allowEmptyFile
	    delete kwargs.maxLength
	    Field.call(this, kwargs)
	  }
	})

	FileField.prototype.toJavaScript = function(data, initial) {
	  if (this.isEmptyValue(data)) {
	    return null
	  }

	  // If the browser doesn't support File objects, we can't do anything more
	  if (env.browser && is.String(data)) {
	    return data
	  }

	  // File objects should have name and size attributes
	  if (typeof data.name == 'undefined' || typeof data.size == 'undefined') {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }

	  var name = data.name
	  var suze = Number(data.size)

	  if (this.maxLength !== null && name.length > this.maxLength) {
	    throw ValidationError(this.errorMessages.maxLength, {
	      code: 'maxLength'
	    , params: {max: this.maxLength, length: name.length}
	    })
	  }
	  if (!name) {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }
	  if (!this.allowEmptyFile && suze === 0) {
	    throw ValidationError(this.errorMessages.empty, {code: 'empty'})
	  }

	  return data
	}

	FileField.prototype.clean = function(data, initial) {
	  // If the widget got contradictory inputs, we raise a validation error
	  if (data === ClearableFileInput.FILE_INPUT_CONTRADICTION) {
	    throw ValidationError(this.errorMessages.contradiction,
	                          {code: 'contradiction'})
	  }
	  // false means the field value should be cleared; further validation is
	  // not needed.
	  if (data === false) {
	    if (!this.required) {
	      return false
	    }
	    // If the field is required, clearing is not possible (the widget
	    // shouldn't return false data in that case anyway). false is not
	    // in EMPTY_VALUES; if a false value makes it this far it should be
	    // validated from here on out as null (so it will be caught by the
	    // required check).
	    data = null
	  }
	  if (!data && initial) {
	    return initial
	  }
	  return Field.prototype.clean.call(this, data)
	}

	FileField.prototype.boundData = function(data, initial) {
	  if (data === null || data === ClearableFileInput.FILE_INPUT_CONTRADICTION) {
	    return initial
	  }
	  return data
	}

	FileField.prototype._hasChanged = function(initial, data) {
	  return (data !== null)
	}

	module.exports = FileField

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var ChoiceField = __webpack_require__(77)

	/**
	 * Allows choosing from files inside a certain directory.
	 * @constructor
	 * @extends {ChoiceField}
	 * @param {string} path
	 * @param {Object=} kwargs
	 */
	var FilePathField = ChoiceField.extend({
	  constructor: function FilePathField(path, kwargs) {
	    if (!(this instanceof FilePathField)) { return new FilePathField(path, kwargs) }
	    kwargs = object.extend({
	      match: null, recursive: false, required: true, widget: null,
	      label: null, initial: null, helpText: null,
	      allowFiles: true, allowFolders: false
	    }, kwargs)

	    this.path = path
	    this.match = object.pop(kwargs, 'match')
	    this.recursive = object.pop(kwargs, 'recursive')
	    this.allowFiles = object.pop(kwargs, 'allowFiles')
	    this.allowFolders = object.pop(kwargs, 'allowFolders')
	    delete kwargs.match
	    delete kwargs.recursive

	    kwargs.choices = []
	    ChoiceField.call(this, kwargs)

	    if (this.required) {
	      this.setChoices([])
	    }
	    else {
	      this.setChoices([['', '---------']])
	    }

	    if (this.match !== null) {
	      this.matchRE = new RegExp(this.match)
	    }

	    // TODO Plug in file paths when running on the server

	    this.widget.choices = this.choices()
	  }
	})

	module.exports = FilePathField

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)
	var IntegerField = __webpack_require__(87)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError
	var $__1=  __webpack_require__(15),strip=$__1.strip

	/**
	 * Validates that its input is a valid float.
	 * @constructor
	 * @extends {IntegerField}
	 * @param {Object=} kwargs
	 */
	var FloatField = IntegerField.extend({
	  defaultErrorMessages: {
	    invalid: 'Enter a number.'
	  }

	, constructor: function FloatField(kwargs) {
	    if (!(this instanceof FloatField)) { return new FloatField(kwargs) }
	    IntegerField.call(this, kwargs)
	  }
	})

	/** Float validation regular expression, as parseFloat() is too forgiving. */
	FloatField.FLOAT_REGEXP = /^[-+]?(?:\d+(?:\.\d*)?|(?:\d+)?\.\d+)$/

	/**
	 * Validates that the input looks like valid input for parseFloat() and the
	 * result of calling it isn't NaN.
	 * @param {*} value user input.
	 * @return a Number obtained from parseFloat(), or null for empty values.
	 * @throws {ValidationError} if the input is invalid.
	 */
	FloatField.prototype.toJavaScript = function(value) {
	  value = Field.prototype.toJavaScript.call(this, value)
	  if (this.isEmptyValue(value)) {
	    return null
	  }
	  value = strip(value)
	  if (!FloatField.FLOAT_REGEXP.test(value)) {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }
	  value = parseFloat(value)
	  if (isNaN(value)) {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }
	  return value
	}

	/**
	 * Determines if data has changed from initial. In JavaScript, trailing zeroes
	 * in floats are dropped when a float is coerced to a String, so e.g., an
	 * initial value of 1.0 would not match a data value of '1.0' if we were to use
	 * the Widget object's _hasChanged, which checks coerced String values.
	 * @return {boolean} true if data has changed from initial.
	 */
	FloatField.prototype._hasChanged = function(initial, data) {
	  // For purposes of seeing whether something has changed, null is the same
	  // as an empty string, if the data or initial value we get is null, replace
	  // it with ''.
	  var dataValue = (data === null ? '' : data)
	  var initialValue = (initial === null ? '' : initial)
	  if (initialValue === dataValue) {
	    return false
	  }
	  else if (initialValue === '' || dataValue === '') {
	    return true
	  }
	  return (parseFloat(''+initialValue) != parseFloat(''+dataValue))
	}

	FloatField.prototype.getWidgetAttrs = function(widget) {
	  var attrs = IntegerField.prototype.getWidgetAttrs.call(this, widget)
	  if (!object.hasOwn(widget.attrs, 'step')) {
	    object.setDefault(attrs, 'step', 'any')
	  }
	  return attrs
	}

	module.exports = FloatField

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var Concur = __webpack_require__(4)
	var getFormData = __webpack_require__(17)
	var copy = __webpack_require__(97)
	var $__0=  __webpack_require__(11),formatObj=$__0.formatObj
	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var constants = __webpack_require__(98)

	var BoundField = __webpack_require__(64)
	var DeclarativeFieldsMeta = __webpack_require__(99)
	var ErrorList = __webpack_require__(91)
	var ErrorObject = __webpack_require__(92)
	var FileField = __webpack_require__(93)
	var MultipleFileField = __webpack_require__(100)

	var $__1=  __webpack_require__(2),ValidationError=$__1.ValidationError
	var $__2=      __webpack_require__(15),cancellable=$__2.cancellable,debounce=$__2.debounce,info=$__2.info,warning=$__2.warning,normaliseValidation=$__2.normaliseValidation

	function noop() {}
	var sentinel = {}

	var NON_FIELD_ERRORS = constants.NON_FIELD_ERRORS

	/**
	 * Checks if a field's view of raw input data (via its Widget) has changed.
	 */
	function fieldDataHasChanged(previous, current) {
	  if (is.Array(previous) && is.Array(current)) {
	    if (previous.length != current.length) { return true }
	    for (var i = 0, l = previous.length; i < l; i++) {
	      if (previous[i] != current[i]) { return true }
	    }
	    return false
	  }
	  return previous != current
	}

	if ('production' !== process.env.NODE_ENV) {
	  var warnedOnImpliedValidateAuto = false
	}

	/**
	 * A collection of Fields that knows how to validate and display itself.
	 * @constructor
	 * @param {Object.<string, *>} kwargs form options.
	 */
	var Form = Concur.extend({
	  __meta__: DeclarativeFieldsMeta,

	  prefixFormat: '{prefix}-{name}',

	  constructor: function Form(kwargs) {
	    // TODO Perform PropType checks on kwargs in development mode
	    kwargs = object.extend({
	      data: null, files: null, autoId: 'id_{name}', prefix: null,
	      initial: null, errorConstructor: ErrorList, labelSuffix: ':',
	      emptyPermitted: false, validation: null, controlled: false,
	      onChange: null, errors: null
	    }, kwargs)
	    this.isInitialRender = (kwargs.data == null && kwargs.files == null)
	    this.data = kwargs.data || {}
	    this.files = kwargs.files || {}
	    this.autoId = kwargs.autoId
	    this.prefix = kwargs.prefix
	    this.initial = kwargs.initial || {}
	    this.cleanedData = {}
	    this.errorConstructor = kwargs.errorConstructor
	    this.labelSuffix = kwargs.labelSuffix
	    this.emptyPermitted = kwargs.emptyPermitted
	    this.controlled = kwargs.controlled
	    this.onChange = kwargs.onChange

	    // Auto validation is implied when onChange is passed
	    if (is.Function(kwargs.onChange)) {
	      if ('production' !== process.env.NODE_ENV) {
	        if (!warnedOnImpliedValidateAuto && kwargs.validation === 'auto') {
	          info('Passing onChange to a Form or FormSet constructor also ' +
	               "implies validation: 'auto' by default - you don't have " +
	               'to set it manually.')
	          warnedOnImpliedValidateAuto = true
	        }
	      }
	      if (kwargs.validation == null) {
	        kwargs.validation = 'auto'
	      }
	    }
	    this.validation = normaliseValidation(kwargs.validation || 'manual')

	    this._errors = kwargs.errors

	    // Cancellable debounced functions for delayed event validation
	    this._pendingEventValidation = {}
	    // Input data as it was last time validation was performed on a field
	    this._lastValidatedData = {}
	    // Cached result of the last call to hasChanged()
	    this._lastHasChanged = null

	    // Lookup for names of fields pending validation
	    this._pendingValidation = {}
	    // Cancellable callbacks for pending async validation
	    this._pendingAsyncValidation = {}
	    // Lookup for names of fields pending validation which clean() depends on
	    this._runCleanAfter = {}
	    // Callback to be run the next time validation finishes
	    this._onValidate = null

	    // The baseFields attribute is the *prototype-wide* definition of fields.
	    // Because a particular *instance* might want to alter this.fields, we
	    // create this.fields here by deep copying baseFields. Instances should
	    // always modify this.fields; they should not modify baseFields.
	    this.fields = copy.deepCopy(this.baseFields)

	    if ('production' !== process.env.NODE_ENV) {
	      // Now that form.fields exists, we can check if there's any configuration
	      // which *needs* onChange on the form or its fields.
	      if (!is.Function(kwargs.onChange) && this._needsOnChange()) {
	        warning("You didn't provide an onChange callback for a " +
	                this._formName() + ' which has controlled fields. This ' +
	                'will result in read-only fields.')
	      }
	    }

	    // Copy initial values to the data object, as it represents form input -
	    // literally so in the case of controlled components once we start taking
	    // some data and isInitialRender flips to false.
	    if (this.isInitialRender) {
	      this._copyInitialToData()
	    }
	  }
	})

	// XXX Don't alter form extension arguments - fix this in Concur
	var _extend = Form.extend
	Form.extend = function(prototypeProps, constructorProps) {
	  return _extend.call(this, object.extend({}, prototypeProps), constructorProps)
	}

	/**
	 * Calls the onChange function if it's been provided. This method will be called
	 * every time the form makes a change to its state which requires redisplay.
	 */
	Form.prototype._stateChanged = function() {
	  if (typeof this.onChange == 'function') {
	    this.onChange()
	  }
	}

	/**
	 * Copies initial data to the input data object, as it represents form input -
	 * when using controlled components once we start taking some data,
	 * isInitialRender flips to false and this.data is used for rendering widgets.
	 */
	Form.prototype._copyInitialToData = function() {
	  var initialData = object.extend(this._fieldInitialData(), this.initial)
	  var initialFieldNames = Object.keys(initialData)
	  for (var i = 0, l = initialFieldNames.length; i < l; i++) {
	    var fieldName = initialFieldNames[i]
	    if (typeof this.fields[fieldName] == 'undefined') { continue }
	    // Don't copy initial to input data for fields which can't have the
	    // initial data set as their current value.
	    if (!this.fields[fieldName].widget.isValueSettable) { continue }
	    this.data[this.addPrefix(fieldName)] = initialData[fieldName]
	  }
	}

	/**
	 * Gets initial data configured in this form's fields.
	 * @return {Object.<string,*>}
	 */
	Form.prototype._fieldInitialData = function() {
	  var fieldInitial = {}
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l; i++) {
	    var fieldName = fieldNames[i]
	    var initial = this.fields[fieldName].initial
	    if (initial !== null) {
	      fieldInitial[fieldName] = initial
	    }
	  }
	  return fieldInitial
	}

	/**
	 * Tries to construct a display name for the form for display in messages.
	 * @return {string}
	 */
	Form.prototype._formName = function() {
	  var name = this.displayName || this.constructor.name
	  return (name ? "'" + name + "'" : 'Form')
	}

	/**
	 * @return {boolean} true if the form or any of its fields are configured to
	 *   generate controlled components.
	 */
	Form.prototype._needsOnChange = function() {
	  if (this.controlled === true) {
	    return true
	  }
	  var names = Object.keys(this.fields)
	  for (var i = 0, l = names.length; i < l; i++) {
	    if (this.fields[names[i]].controlled === true) {
	      return true
	    }
	  }
	  return false
	}

	// ============================================================== Validation ===

	/**
	 * Validates the form from scratch. If a <form> is given, data from it will be
	 * set on this form first. Otherwise, validation will be done with this form's
	 * current input data.
	 * @param {(ReactElement|HTMLFormElement)=} form the <form> containing this
	 * form's rendered widgets - this can be a React <form> component or a real
	 * <form> DOM node.
	 * @param {function(err, isValid, cleanedData)=} cb callback for asynchronous
	 *   validation.
	 * @return {boolean|undefined} true if the form only has synchronous validation
	 *   and is valid.
	 * @throws if the form has asynchronous validation and a callback is not
	 *   provided.
	 */
	Form.prototype.validate = function(form, cb) {
	  this._cancelPendingOperations()
	  if (is.Function(form)) {
	    cb = form
	    form = null
	  }
	  if (form) {
	    if (typeof form.getDOMNode == 'function') {
	      form = form.getDOMNode()
	    }
	    this.data = getFormData(form)
	  }
	  return (this.isAsync() ? this._validateAsync(cb) : this._validateSync())
	}

	Form.prototype._validateAsync = function(cb) {
	  if (!is.Function(cb)) {
	    throw new Error(
	      'You must provide a callback to validate() when a form has ' +
	      'asynchronous validation.'
	    )
	  }
	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  this._onValidate = cb
	  this.fullClean()
	  // Display async progress indicators
	  this._stateChanged()
	}

	Form.prototype._validateSync = function() {
	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  this.fullClean()
	  // Display changes to valid/invalid state
	  this._stateChanged()
	  return this.isValid()
	}

	/**
	 * Cleans data for all fields and triggers cross-form cleaning.
	 */
	Form.prototype.fullClean = function() {
	  this._errors = new ErrorObject()
	  if (this.isInitialRender) {
	    return // Stop further processing
	  }

	  this.cleanedData = {}

	  // If the form is permitted to be empty, and none of the form data has
	  // changed from the initial data, short circuit any validation.
	  if (this.emptyPermitted && !this.hasChanged()) {
	    this._finishedValidation(null)
	    return
	  }

	  this._cleanFields()
	}

	/**
	 * Cleans data for the given field names and triggers cross-form cleaning in
	 * case any cleanedData it uses has changed.
	 * @param {Array.<string>} fields field names.
	 */
	Form.prototype.partialClean = function(fields) {
	  this._removeErrors(fields)

	  // If the form is permitted to be empty, and none of the form data has
	  // changed from the initial data, short circuit any validation.
	  if (this.emptyPermitted && !this.hasChanged()) {
	    if (this._errors.isPopulated()) {
	      this._errors = ErrorObject()
	    }
	    return
	  }

	  this._preCleanFields(fields)
	  for (var i = 0, l = fields.length; i < l; i++) {
	    this._cleanField(fields[i])
	  }
	}

	/**
	 * Validates and cleans every field in the form.
	 */
	Form.prototype._cleanFields = function() {
	  var fieldNames = Object.keys(this.fields)
	  this._preCleanFields(fieldNames)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    this._cleanField(fieldNames[i])
	  }
	}

	/**
	 * Sets up pending validation state prior to cleaning fields and configures
	 * cross-field cleaning to run after its dependent fields have been cleaned, or
	 * after all fields have been cleaned if dependencies have not been configured.
	 * @param {Array.<string>} fieldNames fields which are about to be cleaned.
	 */
	Form.prototype._preCleanFields = function(fieldNames) {
	  // Add all field names to those pending validation
	  object.extend(this._pendingValidation, object.lookup(fieldNames))

	  // Add appropriate field names to determine when to run cross-field cleaning
	  var i, l
	  if (typeof this.clean.fields != 'undefined') {
	    for (i = 0, l = fieldNames.length; i < l; i++) {
	      if (this.clean.fields[fieldNames[i]]) {
	        this._runCleanAfter[fieldNames[i]] = true
	      }
	    }
	  }
	  else {
	    // Ignore any invalid field names given
	    for (i = 0, l = fieldNames.length; i < l; i++) {
	      if (this.fields[fieldNames[i]]) {
	        this._runCleanAfter[fieldNames[i]] = true
	      }
	    }
	  }
	}

	/**
	 * Validates and cleans the named field and runs any custom validation function
	 * that's been provided for it.
	 * @param {string} name the name of a form field.
	 */
	Form.prototype._cleanField = function(name) {
	  if (!object.hasOwn(this.fields, name)) {
	    throw new Error(this._formName() + " has no field named '" + name + "'")
	  }

	  var field = this.fields[name]
	  // valueFromData() gets the data from the data objects.
	  // Each widget type knows how to retrieve its own data, because some widgets
	  // split data over several HTML fields.
	  var value = field.widget.valueFromData(this.data, this.files,
	                                         this.addPrefix(name))
	  var async = false
	  var error = null

	  try {
	    if (field instanceof FileField) {
	      var initial = object.get(this.initial, name, field.initial)
	      value = field.clean(value, initial)
	    }
	    else {
	      value = field.clean(value)
	    }
	    this.cleanedData[name] = value
	    var customClean = this._getCustomClean(name)
	    if (is.Function(customClean)) {
	      async = this._runCustomClean(name, customClean)
	    }
	  }
	  catch (e) {
	    if (e instanceof ValidationError) {
	      this.addError(name, e)
	    }
	    else {
	      error = e
	    }
	  }

	  if (!async) {
	    this._fieldCleaned(name, error)
	  }
	}

	/**
	 * Gets the custom cleaning method for a field. These can be named clean<Name>
	 * or clean_<name>.
	 * @param {string} fieldName
	 * @return {function|undefined}
	 */
	Form.prototype._getCustomClean = function(fieldName) {
	  return (this['clean' + fieldName.charAt(0).toUpperCase() + fieldName.substr(1)] ||
	          this['clean_' + fieldName])
	}

	/**
	 * Calls a custom cleaning method, expecting synchronous or asynchronous
	 * behaviour, depending on its arity.
	 * @param {string} fieldName a field name.
	 * @param {(function()|function(function(Error, string, string|ValidationError)))} customClean
	 *   the custom cleaning method for the field.
	 * @return {boolean} true if cleaning is running asynchronously, false if it just
	 *   ran synchronously.
	 */
	Form.prototype._runCustomClean = function(fieldName, customClean) {
	  // Check arity to see if we have a callback in the function signature
	  if (customClean.length === 0) {
	    // Synchronous processing only expected
	    customClean.call(this)
	    return false
	  }

	  // If custom validation is async and there's one pending, prevent its
	  // callback from doing anything.
	  if (typeof this._pendingAsyncValidation[fieldName] != 'undefined') {
	    object.pop(this._pendingAsyncValidation, fieldName).cancel()
	  }
	  // Set up callback for async processing - the argument for addError()
	  // should be passed via the callback as calling it directly prevents us
	  // from completely ignoring the callback if validation fires again.
	  var callback = function(err, validationError) {
	    if (validationError) {
	      this.addError(fieldName == NON_FIELD_ERRORS ? null : fieldName, validationError)
	    }
	    this._fieldCleaned(fieldName, err)
	    this._stateChanged()
	  }.bind(this)
	  var cancellableCallback = cancellable(callback)

	  // An explicit return value of false indicates that async processing is
	  // being skipped (e.g. because sync checks in the method failed first)
	  var returnValue = customClean.call(this, cancellableCallback)
	  if (returnValue !== false) {
	    // Async processing is happening! Make the callback cancellable and
	    // hook up any custom onCancel handling provided.
	    if (returnValue && typeof returnValue.onCancel == 'function') {
	      callback.onCancel = returnValue.onCancel
	    }
	    this._pendingAsyncValidation[fieldName] = cancellableCallback
	    return true
	  }
	}

	/**
	 * Callback for completion of field cleaning. Triggers further field cleaning or
	 * signals the end of validation, as necessary.
	 * @param {string} fieldName
	 * @param {Error=} err an error caught while cleaning the field.
	 */
	Form.prototype._fieldCleaned = function(fieldName, err) {
	  var wasPending = delete this._pendingValidation[fieldName]
	  if (this._pendingAsyncValidation[fieldName]) {
	    delete this._pendingAsyncValidation[fieldName]
	  }

	  if (err) {
	    if ("production" !== process.env.NODE_ENV) {
	      console.error('Error cleaning ' + this._formName() + '.' + fieldName +
	                    ':' + err.message)
	    }
	    // Stop tracking validation progress on error, and don't call clean()
	    this._pendingValidation = {}
	    this._runCleanAfter = {}
	    this._finishedValidation(err)
	    return
	  }

	  // Run clean() if this was the last field it was waiting for
	  if (this._runCleanAfter[fieldName]) {
	    delete this._runCleanAfter[fieldName]
	    if (is.Empty(this._runCleanAfter)) {
	      this._cleanForm()
	      return
	    }
	  }

	  // Signal the end of validation if this was the last field we were waiting for
	  if (wasPending && is.Empty(this._pendingValidation)) {
	    this._finishedValidation(null)
	  }
	}

	/**
	 * Hook for doing any extra form-wide cleaning after each Field has been cleaned.
	 * Any ValidationError thrown by synchronous validation in this method will not
	 * be associated with a particular field; it will have a special-case association
	 * with the field named '__all__'.
	 * @param {function(Error, string, string|ValidationError)=} cb a callback to signal the
	 *   end of asynchronous validation.
	 */
	Form.prototype.clean = noop

	/**
	 * Calls the clean() hook.
	 */
	Form.prototype._cleanForm = function() {
	  var async = false
	  var error = null
	  try {
	    if (this.clean !== noop) {
	      async = this._runCustomClean(NON_FIELD_ERRORS, this.clean)
	    }
	  }
	  catch (e) {
	    if (e instanceof ValidationError) {
	      this.addError(null, e)
	    }
	    else {
	      error = e
	    }
	  }

	  if (!async) {
	    this._fieldCleaned(NON_FIELD_ERRORS, error)
	  }
	}

	Form.prototype._finishedValidation = function(err) {
	  if (!this.isAsync()) {
	    if (err) {
	      throw err
	    }
	    // Synchronous form validation results will be returned via the original
	    // call which triggered validation.
	    return
	  }
	  if (is.Function(this._onValidate)) {
	    var callback = this._onValidate
	    this._onValidate = null
	    if (err) {
	      return callback(err)
	    }
	    var isValid = this.isValid()
	    callback(null, isValid, isValid ? this.cleanedData : null)
	  }
	}

	/**
	 * Cancels any pending field validations and async validations.
	 */
	Form.prototype._cancelPendingOperations = function() {
	  Object.keys(this._pendingEventValidation).forEach(function(field) {
	    object.pop(this._pendingEventValidation, field).cancel()
	  }.bind(this))
	  Object.keys(this._pendingAsyncValidation).forEach(function(field) {
	    object.pop(this._pendingAsyncValidation, field).cancel()
	  }.bind(this))
	}

	// ========================================================== Event Handling ===

	/**
	 * Handles validating the field which is the target of the given event based
	 * on its validation config. This will be hooked up to the appropriate event
	 * as per the field's validation config.
	 * @param {Object} validation the field's validation config for the event.
	 * @param {SyntheticEvent} e the event being handled.
	 */
	Form.prototype._handleFieldEvent = function(validation, e) {
	  // Update form.data with the current value of the field which is the target of
	  // the event.
	  var htmlName = e.target.name
	  var fieldName = this.removePrefix(e.target.getAttribute('data-newforms-field') || htmlName)
	  var field = this.fields[fieldName]
	  var targetData = getFormData.getNamedFormElementData(e.target.form, htmlName)
	  this.data[htmlName] = targetData
	  if (field instanceof FileField && 'files' in e.target) {
	    var files = e.target.files
	    this.files[htmlName] = (field instanceof MultipleFileField
	                            ? Array.prototype.slice.call(files)
	                            : files[0])
	  }
	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  if (this.controlled || field.controlled) {
	    this._stateChanged()
	  }

	  // Bail out early if the event is only being handled to update the field's data
	  if (validation.validate === false) { return }

	  var validate = false

	  // Special cases for onBlur, as it ends a user's interaction with a text input
	  if (validation.event == 'onBlur') {
	    // If there is any pending validation, trigger it immediately
	    if (typeof this._pendingEventValidation[fieldName] != 'undefined') {
	      this._pendingEventValidation[fieldName].trigger()
	      return
	    }
	    // Always validate if the field is required and the input which was blurred
	    // was empty (some fields have multiple inputs).
	    validate = (field.required && field.isEmptyValue(targetData))
	  }

	  // Always validate if this is the first time the field has been interacted
	  // with.
	  if (!validate) {
	    var lastValidatedData = object.get(this._lastValidatedData, fieldName, sentinel)
	    validate = (lastValidatedData === sentinel)
	  }

	  // Otherwise, validate if data has changed since validation was last performed
	  // - this prevents displayed validation errors being cleared unnecessarily.
	  if (!validate) {
	    var fieldData = field.widget.valueFromData(this.data, this.files, this.addPrefix(fieldName))
	    validate = fieldDataHasChanged(lastValidatedData, fieldData)
	  }

	  // Cancel any pending validation as it's no longer needed - this can happen
	  // if the user edits a field with debounced validation and it ends up back
	  // at its original value before validation is triggered.
	  if (!validate && typeof this._pendingEventValidation[fieldName] != 'undefined') {
	    object.pop(this._pendingEventValidation, fieldName).cancel()
	  }

	  // If we don't need to validate, we're done handling the event
	  if (!validate) { return }

	  if (validation.delay) {
	    this._delayedFieldValidation(fieldName, validation.delay)
	  }
	  else {
	    this._immediateFieldValidation(fieldName)
	  }
	}

	/**
	 * Sets up delayed validation of a field with a debounced function and calls it,
	 * or just calls the function again if it already exists, to reset the delay.
	 * @param {string} fieldName
	 * @param {number} delay delay time in ms.
	 */
	Form.prototype._delayedFieldValidation = function(fieldName, delay) {
	  if (typeof this._pendingEventValidation[fieldName] == 'undefined') {
	    this._pendingEventValidation[fieldName] = debounce(function() {
	      delete this._pendingEventValidation[fieldName]
	      this._immediateFieldValidation(fieldName)
	    }.bind(this), delay)
	  }
	  this._pendingEventValidation[fieldName]()
	}

	/**
	 * Validates a field and notifies the React component that state has changed.
	 * @param {string} fieldName
	 */
	Form.prototype._immediateFieldValidation = function(fieldName) {
	  // Remove and cancel any pending validation for the field to avoid doubling up
	  // when both delayed and immediate validation are configured.
	  if (typeof this._pendingEventValidation[fieldName] != 'undefined') {
	    object.pop(this._pendingEventValidation, fieldName).cancel()
	  }
	  this._lastValidatedData[fieldName] =
	      this.fields[fieldName].widget.valueFromData(this.data, this.files,
	                                                  this.addPrefix(fieldName))
	  this.partialClean([fieldName])
	  this._stateChanged()
	}

	// ============================================================== Mutability ===

	/**
	 * Resets a form data back to its initial state, optionally providing new initial
	 * data.
	 * @param {Object.<string, *>=} newInitial new initial data for the form.
	 */
	Form.prototype.reset = function(newInitial) {
	  this._cancelPendingOperations()

	  if (typeof newInitial != 'undefined') {
	    this.initial = newInitial
	  }

	  this.data = {}
	  this.cleanedData = {}
	  this.isInitialRender = true

	  this._errors = null
	  this._lastHasChanged = null
	  this._pendingValidation = {}
	  this._runCleanAfter = {}
	  this._lastValidatedData = {}
	  this._onValidate = null

	  this._copyInitialToData()
	  this._stateChanged()
	}

	/**
	 * Sets the form's entire input data, also triggering validation by default.
	 * @param {object.<string,*>} data new input data for the form.
	 * @param {object.<string,boolean>} kwargs data setting options.
	 * @return {boolean|undefined} if data setting options indicate the new data
	 *   should be validated and the form does not have asynchronous validation
	 *   configured: true if the new data is valid.
	 */
	Form.prototype.setData = function(data, kwargs) {
	  kwargs = object.extend({
	    prefixed: false, validate: true, _triggerStateChange: true
	  }, kwargs)

	  this.data = (kwargs.prefixed ? data : this._prefixData(data))

	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  if (kwargs.validate) {
	    this._errors = null
	    // This call ultimately triggers a fullClean() because _errors is null
	    var isValid = this.isValid()
	  }
	  else {
	    // Prevent validation being triggered if errors() is accessed during render
	    this._errors = new ErrorObject()
	  }

	  if (kwargs._triggerStateChange) {
	    this._stateChanged()
	  }

	  if (kwargs.validate && !this.isAsync()) {
	    return isValid
	  }
	}

	/**
	 * Sets the form's entire input data wth data extracted from a <form>, which
	 * will be prefixed, if prefixes are being used.
	 * @param {Object.<strong, *>} formData
	 * @param {Object.<string, boolean>} kwargs setData options.
	 */
	Form.prototype.setFormData = function(formData, kwargs) {
	  return this.setData(formData, object.extend(kwargs || {}, {prefixed: true}))
	}

	/**
	 * Updates some of the form's input data, optionally triggering validation of
	 * updated fields and form-wide cleaning, or clears existing errors from the
	 * updated fields.
	 * @param {Object.<string, *>} data updated input data for the form.
	 * @param {Object.<string, boolean>} kwargs update options.
	 */
	Form.prototype.updateData = function(data, kwargs) {
	  kwargs = object.extend({
	    prefixed: false, validate: true, clearValidation: true
	  }, kwargs)

	  object.extend(this.data, (kwargs.prefixed ? data : this._prefixData(data)))
	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }

	  var fields = Object.keys(data)
	  if (kwargs.prefixed) {
	    fields = fields.map(this.removePrefix.bind(this))
	  }

	  if (kwargs.validate) {
	    this.partialClean(fields)
	  }
	  else if (kwargs.clearValidation) {
	    this._removeErrors(fields)
	    this._removeCleanedData(fields)
	    this._cleanForm()
	  }

	  this._stateChanged()
	}

	/**
	 * Removes any cleanedData present for the given form fields.
	 * @param {Array.<string>} fields field names.
	 */
	Form.prototype._removeCleanedData = function(fields) {
	  for (var i = 0, l = fields.length; i < l; i++) {
	    delete this.cleanedData[fields[i]]
	  }
	}

	// ============================================================= BoundFields ===

	/**
	 * Creates a BoundField for the field with the given name.
	 * @param {string} name a field name.
	 * @return {BoundField} a BoundField for the field.
	 */
	Form.prototype.boundField = function(name) {
	  if (!object.hasOwn(this.fields, name)) {
	    throw new Error(this._formName() + " does not have a '" + name + "' field.")
	  }
	  return new BoundField(this, this.fields[name], name)
	}

	/**
	 * Creates a BoundField for each field in the form, in the order in which the
	 * fields were created.
	 * @param {function(Field, string)=} test if provided, this function will be
	 *   called with field and name arguments - BoundFields will only be generated
	 *   for fields for which true is returned.
	 * @return {Array.<BoundField>} a list of BoundField objects.
	 */
	Form.prototype.boundFields = function(test) {
	  var bfs = []
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    var fieldName = fieldNames[i]
	    if (!test || test(this.fields[fieldName], fieldName)) {
	      bfs.push(new BoundField(this, this.fields[fieldName], fieldName))
	    }
	  }
	  return bfs
	}

	/**
	 * Like boundFields(), but returns a name -> BoundField object instead.
	 * @return {Object.<string, BoundField>}
	 */
	Form.prototype.boundFieldsObj = function() {
	  var bfs = {}
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    var fieldName = fieldNames[i]
	    bfs[fieldName] = new BoundField(this, this.fields[fieldName], fieldName)
	  }
	  return bfs
	}

	/**
	 * Returns a list of all the BoundField objects that correspond to hidden
	 * fields. Useful for manual form layout.
	 * @return {Array.<BoundField>}
	 */
	Form.prototype.hiddenFields = function() {
	  return this.boundFields(function(field) {
	    return field.widget.isHidden
	  })
	}

	/**
	 * Returns a list of BoundField objects that do not correspond to hidden fields.
	 * The opposite of the hiddenFields() method.
	 * @return {Array.<BoundField>}
	 */
	Form.prototype.visibleFields = function() {
	  return this.boundFields(function(field) {
	    return !field.widget.isHidden
	  })
	}

	// ================================================================== Errors ===

	/**
	 * Updates the content of this._errors.
	 * The field argument is the name of the field to which the errors should be
	 * added. If its value is null the errors will be treated as NON_FIELD_ERRORS.
	 * The error argument can be a single error, a list of errors, or an object that
	 * maps field names to lists of errors. What we define as an "error" can be
	 * either a simple string or an instance of ValidationError with its message
	 * attribute set and what we define as list or object can be an actual list or
	 * object or an instance of ValidationError with its errorList or errorObj
	 * property set.
	 * If error is an object, the field argument *must* be null and errors will be
	 * added to the fields that correspond to the properties of the object.
	 * @param {?string} field the name of a form field.
	 * @param {(string|ValidationError|Array.<(string|ValidationError)>|Object<string,(string|ValidationError|Array.<(string|ValidationError)>))} error
	 */
	Form.prototype.addError = function(field, error) {
	  if (!(error instanceof ValidationError)) {
	    // Normalise to ValidationError and let its constructor do the hard work of
	    // making sense of the input.
	    error = ValidationError(error)
	  }

	  if (object.hasOwn(error, 'errorObj')) {
	    if (field !== null) {
	      throw new Error("The 'field' argument to form.addError() must be null when " +
	                      "the 'error' argument contains errors for multiple fields.")
	    }
	    error = error.errorObj
	  }
	  else {
	    var errorList = error.errorList
	    error = {}
	    error[field || NON_FIELD_ERRORS] = errorList
	  }

	  var fields = Object.keys(error)
	  for (var i = 0, l = fields.length; i < l; i++) {
	    field = fields[i]
	    errorList = error[field]
	    if (!this._errors.hasField(field)) {
	      if (field !== NON_FIELD_ERRORS && !object.hasOwn(this.fields, field)) {
	        throw new Error(this._formName() + " has no field named '" + field + "'")
	      }
	      this._errors.set(field, new this.errorConstructor())
	    }
	    else {
	      // Filter out any error messages which are duplicates of existing
	      // messages. This can happen if onChange validation which uses addError()
	      // is fired repeatedly and is adding an error message to a field other
	      // then the one being changed.
	      var messageLookup = object.lookup(this._errors.get(field).messages())
	      var newMessages = ErrorList(errorList).messages()
	      for (var j = errorList.length - 1; j >= 0; j--) {
	        if (messageLookup[newMessages[j]]) {
	          errorList.splice(j, 1)
	        }
	      }
	    }

	    if (errorList.length > 0) {
	      this._errors.get(field).extend(errorList)
	    }

	    if (object.hasOwn(this.cleanedData, field)) {
	      delete this.cleanedData[field]
	    }
	  }
	}

	/**
	 * Getter for errors, which first cleans the form if there are no errors
	 * defined yet.
	 * @param {string=} name if given, errors for this field name will be returned
	 *   instead of the full error object.
	 * @return {ErrorObject|ErrorList} form or field errors
	 */
	Form.prototype.errors = function(name) {
	  if (this._errors == null) {
	    this.fullClean()
	  }
	  if (name) {
	    return this._errors.get(name)
	  }
	  return this._errors
	}

	/**
	 * @return {ErrorObject} errors that aren't associated with a particular field -
	 *   i.e., errors generated by clean(). Will be empty if there are none.
	 */
	Form.prototype.nonFieldErrors = function() {
	  return (this.errors(NON_FIELD_ERRORS) || new this.errorConstructor())
	}

	/**
	 * @param {ErrorObject} errors
	 */
	Form.prototype.setErrors = function(errors) {
	  this._errors = errors
	  this._stateChanged()
	}

	/**
	 * Removes any validation errors present for the given form fields. If validation
	 * has not been performed yet, initialises the errors object.
	 * @param {Array.<string>} fields field names.
	 */
	Form.prototype._removeErrors = function(fields) {
	  if (this._errors == null) {
	    this._errors = ErrorObject()
	  }
	  else {
	    // TODO use clean.fields if available
	    this._errors.remove(NON_FIELD_ERRORS)
	    this._errors.removeAll(fields)
	  }
	}

	// ================================================================= Changes ===

	/**
	 * Determines which fields have changed from initial form data.
	 * @param {boolean=} _hasChangedCheck if true, the method is only being run to
	 *   determine if any fields have changed, not to get the list of fields.
	 * @return {Array.<string>|boolean} a list of changed field names or true if
	 *   only checking for changes and one is found.
	 */
	Form.prototype.changedData = function(_hasChangedCheck) {
	  var changedData = []
	  var initialValue
	  // XXX: For now we're asking the individual fields whether or not
	  // the data has changed. It would probably be more efficient to hash
	  // the initial data, store it in a hidden field, and compare a hash
	  // of the submitted data, but we'd need a way to easily get the
	  // string value for a given field. Right now, that logic is embedded
	  // in the render method of each field's widget.
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    var name = fieldNames[i]
	    var field = this.fields[name]
	    var prefixedName = this.addPrefix(name)
	    var dataValue = field.widget.valueFromData(this.data, this.files, prefixedName)
	    if (!field.showHiddenInitial) {
	      initialValue = object.get(this.initial, name, field.initial)
	      if (is.Function(initialValue)) {
	        initialValue = initialValue()
	      }
	    }
	    else {
	      var initialPrefixedName = this.addInitialPrefix(name)
	      var hiddenWidget = new field.hiddenWidget()
	      try {
	        initialValue = hiddenWidget.valueFromData(
	                this.data, this.files, initialPrefixedName)
	      }
	      catch (e) {
	        if (!(e instanceof ValidationError)) { throw e }
	        // Always assume data has changed if validation fails
	        if (_hasChangedCheck) {
	          return true
	        }
	        changedData.push(name)
	        continue
	      }
	    }
	    if (field._hasChanged(initialValue, dataValue)) {
	      if (_hasChangedCheck) {
	        return true
	      }
	      changedData.push(name)
	    }
	  }
	  if (_hasChangedCheck) {
	    return false
	  }
	  return changedData
	}

	/**
	 * @return {boolean} true if input data differs from initial data.
	 */
	Form.prototype.hasChanged = function() {
	  this._lastHasChanged = this.changedData(true)
	  return this._lastHasChanged
	}

	// ================================================================== Status ===

	/**
	 * @return {boolean} true if the form needs a callback argument for final
	 *   validation.
	 */
	Form.prototype.isAsync = function() {
	  if (this.clean.length == 1) { return true }
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    var customClean = this._getCustomClean(fieldNames[i])
	    if (is.Function(customClean) && customClean.length == 1) {
	      return true
	    }
	  }
	  return false
	}

	/**
	 * @return {boolean} true if all required fields have been completed.
	 */
	Form.prototype.isComplete = function() {
	  if (!this.isValid() || this.isPending()) {
	    return false
	  }
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l; i++) {
	    var fieldName = fieldNames[i]
	    if (this.fields[fieldName].required &&
	        typeof this.cleanedData[fieldName] == 'undefined') {
	      return false
	    }
	  }
	  return true
	}

	/**
	 * @return {boolean} true if the form needs to be multipart-encoded, in other
	 *   words, if it has a FileField.
	 */
	Form.prototype.isMultipart = function() {
	  var fieldNames = Object.keys(this.fields)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    if (this.fields[fieldNames[i]].widget.needsMultipartForm) {
	      return true
	    }
	  }
	  return false
	}

	/**
	 * @return {boolean} true if the form is waiting for async validation to
	 *   complete.
	 */
	Form.prototype.isPending = function() {
	  return !is.Empty(this._pendingAsyncValidation)
	}

	/**
	 * @return {boolean} true if the form doesn't have any errors.
	 */
	Form.prototype.isValid = function() {
	  if (this.isInitialRender) {
	    return false
	  }
	  return !this.errors().isPopulated()
	}

	/**
	 * @return {boolean} true if the form is waiting for async validation of its
	 *   clean() method to complete.
	 */
	Form.prototype.nonFieldPending = function() {
	  return typeof this._pendingAsyncValidation[NON_FIELD_ERRORS] != 'undefined'
	}

	/**
	 * @return {boolean} true if this form is allowed to be empty and if input data
	 *   differs from initial data. This can be used to determine when required
	 *   fields in an extra FormSet form become truly required.
	 */
	Form.prototype.notEmpty = function() {
	  return (this.emptyPermitted && this._lastHasChanged === true)
	}

	// ================================================================ Prefixes ===

	/**
	 * Adds an initial prefix for checking dynamic initial values.
	 * @param {string} fieldName a field name.
	 * @return {string}
	 */
	Form.prototype.addInitialPrefix = function(fieldName) {
	  return 'initial-' + this.addPrefix(fieldName)
	}

	/**
	 * Prepends a prefix to a field name if this form has one set.
	 * @param {string} fieldName a form field name.
	 * @return {string} the field name with a prefix prepended if this form has a
	 *   prefix set, otherwise the field name as-is.
	 * @return {string}
	 */
	Form.prototype.addPrefix = function(fieldName) {
	  if (this.prefix !== null) {
	    return formatObj(this.prefixFormat, {prefix: this.prefix, name: fieldName})
	  }
	  return fieldName
	}

	/**
	 * Extracts a form field name from the name attribute of a rendered form input.
	 * @param {string} htmlName a name attribute from a rendered form input.
	 * @return {string}
	 */
	Form.prototype.removePrefix = function(htmlName) {
	  if (this.prefix !== null) {
	    var partialPrefix = this.prefixFormat.replace('{prefix}', this.prefix)
	    var startIndex = partialPrefix.indexOf('{name}')
	    var lengthDiff = htmlName.length - partialPrefix.length
	    return htmlName.substr(startIndex, /* length of {name} */ 6 + lengthDiff)
	  }
	  return htmlName
	}

	/**
	 * Creates a version of the given data object with prefixes removed from the
	 * property names if this form has a prefix, otherwise returns the object
	 * itself.
	 * @param {object.<string,*>} data
	 * @return {Object.<string,*>}
	 */
	Form.prototype._deprefixData = function(data) {
	  if (this.prefix == null) { return data }
	  var prefixedData = {}
	  var fieldNames = Object.keys(data)
	  for (var i = 0, l = fieldNames.length; i < l; i++) {
	    prefixedData[this.removePrefix(fieldNames[i])] = data[fieldNames[i]]
	  }
	  return prefixedData
	}

	/**
	 * Creates a version of the given data object with prefixes added to the
	 * property names if this form has a prefix, otherwise returns the object
	 * itself.
	 * @param {object.<string,*>} data
	 * @return {Object.<string,*>}
	 */
	Form.prototype._prefixData = function(data) {
	  if (this.prefix == null) { return data }
	  var prefixedData = {}
	  var fieldNames = Object.keys(data)
	  for (var i = 0, l = fieldNames.length; i < l; i++) {
	    prefixedData[this.addPrefix(fieldNames[i])] = data[fieldNames[i]]
	  }
	  return prefixedData
	}

	module.exports = Form
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 97 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty
	var toString = Object.prototype.toString
	var type = function(obj) { return toString.call(obj).slice(8, -1).toLowerCase() }

	var primitiveWrapperTypes = {
	  boolean: true
	, number: true
	, string: true
	}

	var stringPropsRE = /^(?:\d+|length)$/

	/* This file is part of OWL JavaScript Utilities.

	OWL JavaScript Utilities is free software: you can redistribute it and/or
	modify it under the terms of the GNU Lesser General Public License
	as published by the Free Software Foundation, either version 3 of
	the License, or (at your option) any later version.

	OWL JavaScript Utilities is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Lesser General Public License for more details.

	You should have received a copy of the GNU Lesser General Public
	License along with OWL JavaScript Utilities.  If not, see
	<http://www.gnu.org/licenses/>.
	*/

	// Re-usable constructor function used by clone()
	function Clone() {}

	// Clone objects, skip other types
	function clone(target) {
	  if (typeof target == 'object') {
	    Clone.prototype = target
	    return new Clone()
	  }
	  else {
	    return target
	  }
	}

	// Shallow Copy
	function copy(target) {
	  var c, property
	  if (typeof target != 'object') {
	    // Non-objects have value semantics, so target is already a copy
	    return target
	  }
	  else {
	    var value = target.valueOf()
	    if (target == value) {
	      // The object is a standard object wrapper for a native type, say String.
	      // we can make a copy by instantiating a new object around the value.
	      c = new target.constructor(value)
	      var notString = type(target) != 'string'

	      // Wrappers can have properties added to them
	      for (property in target) {
	        if (hasOwn.call(target, property) && (notString || !stringPropsRE.test(property))) {
	          c[property] = target[property]
	        }
	      }

	      return c
	    }
	    else {
	      // We have a normal object. If possible, we'll clone the original's
	      // prototype (not the original) to get an empty object with the same
	      // prototype chain as the original. If just copy the instance properties.
	      // Otherwise, we have to copy the whole thing, property-by-property.
	      if (target instanceof target.constructor && target.constructor !== Object) {
	        c = clone(target.constructor.prototype)

	        // Give the copy all the instance properties of target. It has the same
	        // prototype as target, so inherited properties are already there.
	        for (property in target) {
	          if (hasOwn.call(target, property)) {
	            c[property] = target[property]
	          }
	        }
	      }
	      else {
	        c = {}
	        for (property in target) {
	          c[property] = target[property]
	        }
	      }

	      return c
	    }
	  }
	}

	// Deep Copy
	var deepCopiers = []

	function DeepCopier(config) {
	  for (var key in config) {
	    this[key] = config[key]
	  }
	}

	DeepCopier.prototype = {
	  constructor: DeepCopier

	  // Determines if this DeepCopier can handle the given object.
	, canCopy: function(source) { return false }

	  // Starts the deep copying process by creating the copy object. You can
	  // initialize any properties you want, but you can't call recursively into the
	  // DeepCopyAlgorithm.
	, create: function(source) {}

	  // Completes the deep copy of the source object by populating any properties
	  // that need to be recursively deep copied. You can do this by using the
	  // provided deepCopyAlgorithm instance's deepCopy() method. This will handle
	  // cyclic references for objects already deepCopied, including the source
	  // object itself. The "result" passed in is the object returned from create().
	, populate: function(deepCopyAlgorithm, source, result) {}
	}

	function DeepCopyAlgorithm() {
	  // copiedObjects keeps track of objects already copied by this deepCopy
	  // operation, so we can correctly handle cyclic references.
	  this.copiedObjects = []
	  var thisPass = this
	  this.recursiveDeepCopy = function(source) {
	    return thisPass.deepCopy(source)
	  }
	  this.depth = 0
	}
	DeepCopyAlgorithm.prototype = {
	  constructor: DeepCopyAlgorithm

	, maxDepth: 256

	  // Add an object to the cache.  No attempt is made to filter duplicates; we
	  // always check getCachedResult() before calling it.
	, cacheResult: function(source, result) {
	    this.copiedObjects.push([source, result])
	  }

	  // Returns the cached copy of a given object, or undefined if it's an object
	  // we haven't seen before.
	, getCachedResult: function(source) {
	    var copiedObjects = this.copiedObjects
	    var length = copiedObjects.length
	    for ( var i=0; i<length; i++ ) {
	      if ( copiedObjects[i][0] === source ) {
	        return copiedObjects[i][1]
	      }
	    }
	    return undefined
	  }

	  // deepCopy handles the simple cases itself: non-objects and object's we've
	  // seen before. For complex cases, it first identifies an appropriate
	  // DeepCopier, then calls applyDeepCopier() to delegate the details of copying
	  // the object to that DeepCopier.
	, deepCopy: function(source) {
	    // null is a special case: it's the only value of type 'object' without
	    // properties.
	    if (source === null) { return null }

	    // All non-objects use value semantics and don't need explict copying
	    if (typeof source != 'object') { return source }

	    var cachedResult = this.getCachedResult(source)

	    // We've already seen this object during this deep copy operation so can
	    // immediately return the result. This preserves the cyclic reference
	    // structure and protects us from infinite recursion.
	    if (cachedResult) { return cachedResult }

	    // Objects may need special handling depending on their class. There is a
	    // class of handlers call "DeepCopiers" that know how to copy certain
	    // objects. There is also a final, generic deep copier that can handle any
	    // object.
	    for (var i=0; i<deepCopiers.length; i++) {
	      var deepCopier = deepCopiers[i]
	      if (deepCopier.canCopy(source)) {
	        return this.applyDeepCopier(deepCopier, source)
	      }
	    }
	    // The generic copier can handle anything, so we should never reach this
	    // line.
	    throw new Error('no DeepCopier is able to copy ' + source)
	  }

	  // Once we've identified which DeepCopier to use, we need to call it in a
	  // very particular order: create, cache, populate.This is the key to detecting
	  // cycles. We also keep track of recursion depth when calling the potentially
	  // recursive populate(): this is a fail-fast to prevent an infinite loop from
	  // consuming all available memory and crashing or slowing down the browser.
	, applyDeepCopier: function(deepCopier, source) {
	    // Start by creating a stub object that represents the copy.
	    var result = deepCopier.create(source)

	    // We now know the deep copy of source should always be result, so if we
	    // encounter source again during this deep copy we can immediately use
	    // result instead of descending into it recursively.
	    this.cacheResult(source, result)

	    // Only DeepCopier.populate() can recursively deep copy. So, to keep track
	    // of recursion depth, we increment this shared counter before calling it,
	    // and decrement it afterwards.
	    this.depth++
	    if (this.depth > this.maxDepth) {
	      throw new Error("Exceeded max recursion depth in deep copy.")
	    }

	    // It's now safe to let the deepCopier recursively deep copy its properties
	    deepCopier.populate(this.recursiveDeepCopy, source, result)

	    this.depth--

	    return result
	  }
	}

	// Entry point for deep copy.
	//   source is the object to be deep copied.
	//   maxDepth is an optional recursion limit. Defaults to 256.
	function deepCopy(source, maxDepth) {
	  var deepCopyAlgorithm = new DeepCopyAlgorithm()
	  if (maxDepth) {
	    deepCopyAlgorithm.maxDepth = maxDepth
	  }
	  return deepCopyAlgorithm.deepCopy(source)
	}

	// Publicly expose the DeepCopier class
	deepCopy.DeepCopier = DeepCopier

	// Publicly expose the list of deepCopiers
	deepCopy.deepCopiers = deepCopiers

	// Make deepCopy() extensible by allowing others to register their own custom
	// DeepCopiers.
	deepCopy.register = function(deepCopier) {
	  if (!(deepCopier instanceof DeepCopier)) {
	    deepCopier = new DeepCopier(deepCopier)
	  }
	  deepCopiers.unshift(deepCopier)
	}

	// Generic Object copier
	// The ultimate fallback DeepCopier, which tries to handle the generic case.
	// This should work for base Objects and many user-defined classes.
	deepCopy.register({
	  canCopy: function(source) { return true }

	, create: function(source) {
	    if (source instanceof source.constructor) {
	      return clone(source.constructor.prototype)
	    }
	    else {
	      return {}
	    }
	  }

	, populate: function(deepCopy, source, result) {
	    for (var key in source) {
	      if (hasOwn.call(source, key)) {
	        result[key] = deepCopy(source[key])
	      }
	    }
	    return result
	  }
	})

	// Standard primitive wrapper copier
	deepCopy.register({
	  canCopy: function(source) {
	    return primitiveWrapperTypes[type(source)]
	  }

	, create: function(source) {
	    return new source.constructor(source.valueOf())
	  }

	, populate: function(deepCopy, source, result) {
	    var notString = type(source) != 'string'
	    for (var key in source) {
	      if (hasOwn.call(source, key) && (notString || !stringPropsRE.test(key))) {
	        result[key] = deepCopy(source[key])
	      }
	    }
	    return result
	  }
	})

	// RegExp copier
	deepCopy.register({
	  canCopy: function(source) {
	    return type(source) == 'regexp'
	  }

	, create: function(source) {
	    return source
	  }


	})

	// Date copier
	deepCopy.register({
	  canCopy: function(source) {
	    return type(source) == 'date'
	  }

	, create: function(source) {
	    return new Date(source)
	  }
	})

	// Array copier
	deepCopy.register({
	  canCopy: function(source) {
	    return type(source) == 'array'
	  }

	, create: function(source) {
	    return new source.constructor()
	  }

	, populate: function(deepCopy, source, result) {
	    for (var i = 0; i < source.length; i++) {
	      result.push(deepCopy(source[i]))
	    }
	    return result
	  }
	})

	module.exports = {
	  DeepCopyAlgorithm: DeepCopyAlgorithm
	, copy: copy
	, clone: clone
	, deepCopy: deepCopy
	}


/***/ },
/* 98 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  /** Default maximum number of forms in a formset, to prevent memory exhaustion. */
	  FORMSET_DEFAULT_MAX_NUM: 1000
	  /** Default minimum number of forms in a formset. */
	, FORMSET_DEFAULT_MIN_NUM: 0
	  /** Property under which non-field-specific errors are stored. */
	, NON_FIELD_ERRORS: '__all__'
	}

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)

	// TODO Support declaring propTypes when extending forms - merge them in here

	/**
	 * Meta function for handling declarative fields and inheriting fields from
	 * forms further up the inheritance chain or being explicitly mixed-in, which
	 * sets up baseFields and declaredFields on a new Form constructor's prototype.
	 * @param {Object.<string,*>} prototypeProps
	 */
	function DeclarativeFieldsMeta(prototypeProps) {
	  // Pop Fields instances from prototypeProps to build up the new form's own
	  // declaredFields.
	  var fields = []
	  Object.keys(prototypeProps).forEach(function(name) {
	    if (prototypeProps[name] instanceof Field) {
	      fields.push([name, prototypeProps[name]])
	      delete prototypeProps[name]
	    }
	  })
	  fields.sort(function(a, b) {
	    return a[1].creationCounter - b[1].creationCounter
	  })
	  prototypeProps.declaredFields = object.fromItems(fields)

	  // Build up final declaredFields from the form being extended, forms being
	  // mixed in and the new form's own declaredFields, in that order of
	  // precedence.
	  var declaredFields = {}

	  // If we're extending another form, we don't need to check for shadowed
	  // fields, as it's at the bottom of the pile for inheriting declaredFields.
	  if (object.hasOwn(this, 'declaredFields')) {
	    object.extend(declaredFields, this.declaredFields)
	  }

	  // If any mixins which look like Form constructors were given, inherit their
	  // declaredFields and check for shadowed fields.
	  if (object.hasOwn(prototypeProps, '__mixins__')) {
	    var mixins = prototypeProps.__mixins__
	    if (!is.Array(mixins)) { mixins = [mixins] }
	    // Process mixins from left-to-right, the same precedence they'll get for
	    // having their prototype properties mixed in.
	    for (var i = 0, l = mixins.length; i < l; i++) {
	      var mixin = mixins[i]
	      if (is.Function(mixin) && object.hasOwn(mixin.prototype, 'declaredFields')) {
	        // Extend mixed-in declaredFields over the top of what's already there,
	        // then delete any fields which have been shadowed by a non-Field
	        // property in its prototype.
	        object.extend(declaredFields, mixin.prototype.declaredFields)
	        Object.keys(mixin.prototype).forEach(function(name) {
	          if (object.hasOwn(declaredFields, name)) {
	            delete declaredFields[name]
	          }
	        })
	        // To avoid overwriting the new form's baseFields, declaredFields or
	        // constructor when the rest of the mixin's prototype is mixed-in by
	        // Concur, replace the mixin with an object containing only its other
	        // prototype properties.
	        var mixinPrototype = object.extend({}, mixin.prototype)
	        delete mixinPrototype.baseFields
	        delete mixinPrototype.declaredFields
	        delete mixinPrototype.constructor
	        mixins[i] = mixinPrototype
	      }
	    }
	    // We may have wrapped a single mixin in an Array - assign it back to the
	    // new form's prototype for processing by Concur.
	    prototypeProps.__mixins__ = mixins
	  }

	  // Finally - extend the new form's own declaredFields over the top of
	  // declaredFields being inherited, then delete any fields which have been
	  // shadowed by a non-Field property in its prototype.
	  object.extend(declaredFields, prototypeProps.declaredFields)
	  Object.keys(prototypeProps).forEach(function(name) {
	    if (object.hasOwn(declaredFields, name)) {
	      delete declaredFields[name]
	    }
	  })

	  prototypeProps.baseFields = declaredFields
	  prototypeProps.declaredFields = declaredFields

	  // If a clean method is specified as [field1, field2, ..., cleanFunction],
	  // replace it with the clean function and attach the field names to the
	  // function.
	  if (object.hasOwn(prototypeProps, 'clean') && is.Array(prototypeProps.clean)) {
	    var clean = prototypeProps.clean.pop()
	    clean.fields = object.lookup(prototypeProps.clean)
	    prototypeProps.clean = clean
	  }
	}

	module.exports = DeclarativeFieldsMeta

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	var env = __webpack_require__(68)

	var Field = __webpack_require__(20)
	var FileInput = __webpack_require__(79)
	var FileField = __webpack_require__(93)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * Validates that its input is a list of valid files.
	 * @constructor
	 * @extends {FileField}
	 * @param {Object=} kwargs
	 */
	var MultipleFileField = FileField.extend({
	  widget: FileInput,

	  defaultErrorMessages: {
	    invalid: 'No files were submitted. Check the encoding type on the form.',
	    missing: 'No files were submitted.',
	    empty: '{name} is empty.',
	    maxLength: 'Ensure filenames have at most {max} characters ({name} has {length}).'
	  },

	  constructor: function MultipleFileField(kwargs) {
	    if (!(this instanceof MultipleFileField)) { return new MultipleFileField(kwargs) }
	    FileField.call(this, kwargs)
	  }
	})

	MultipleFileField.prototype.getWidgetAttrs = function(widget) {
	  var attrs = FileField.prototype.getWidgetAttrs.call(this, widget)
	  attrs.multiple = true
	  return attrs
	}

	MultipleFileField.prototype.toJavaScript = function(data, initial) {
	  if (this.isEmptyValue(data)) {
	    return []
	  }

	  // If the browser doesn't support File objects, we can't do anything more
	  if (env.browser && is.String(data)) {
	    return data
	  }

	  for (var i = 0, l = data.length; i < l; i++) {
	    var file = data[i]

	    // File objects should have name and size attributes
	    if (typeof file.name == 'undefined' || typeof file.size == 'undefined') {
	      throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	    }

	    var name = file.name
	    var size = Number(file.size)

	    if (this.maxLength !== null && name.length > this.maxLength) {
	      throw ValidationError(this.errorMessages.maxLength, {
	        code: 'maxLength',
	        params: {max: this.maxLength, name:name, length: name.length}
	      })
	    }
	    if (!name) {
	      throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	    }
	    if (!this.allowEmptyFile && size === 0) {
	      throw ValidationError(this.errorMessages.empty, {
	        code: 'empty',
	        params: {name:name}
	      })
	    }
	  }

	  return data
	}

	MultipleFileField.prototype.clean = function(data, initial) {
	  if (this.isEmptyValue(data) && !this.isEmptyValue(initial)) {
	    return initial
	  }
	  return Field.prototype.clean.call(this, data)
	}

	MultipleFileField.prototype.validate = function(value) {
	  if (this.required && !value.length) {
	    throw ValidationError(this.errorMessages.required, {code: 'required'})
	  }
	}

	MultipleFileField.prototype._hasChanged = function(initial, data) {
	  return !this.isEmptyValue(data)
	}

	module.exports = MultipleFileField

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(23)

	var BoundField = __webpack_require__(64)
	var ProgressMixin = __webpack_require__(102)

	/**
	 * Renders a "row" in a form. This can contain manually provided contents, or
	 * if a BoundField is given, it will be used to display a field's label, widget,
	 * error message(s), help text and async pending indicator.
	 */
	var FormRow = React.createClass({displayName: "FormRow",
	  mixins: [ProgressMixin],
	  propTypes: {
	    bf: React.PropTypes.instanceOf(BoundField)
	  , className: React.PropTypes.string
	  , component: React.PropTypes.any
	  , content: React.PropTypes.any
	  , hidden: React.PropTypes.bool
	  , __all__:function(props) {
	      if (!props.bf && !props.content) {
	        return new Error(
	          'Invalid props supplied to `FormRow`, either `bf` or `content` ' +
	          'must be specified.'
	        )
	      }
	      if (props.bf && props.content) {
	        return new Error(
	          'Both `bf` and `content` props were passed to `FormRow` - `bf` ' +
	          'will be ignored.'
	        )
	      }
	    }
	  },

	  getDefaultProps:function() {
	    return {
	      component: 'div'
	    }
	  },

	  render:function() {
	    var attrs = {}
	    if (this.props.className) {
	      attrs.className = this.props.className
	    }
	    if (this.props.hidden) {
	      attrs.style = {display: 'none'}
	    }
	    // If content was given, use it
	    if (this.props.content) {
	      return React.createElement(this.props.component, React.__spread({},  attrs), this.props.content)
	    }
	    // Otherwise render a BoundField
	    var bf = this.props.bf
	    var isPending = bf.isPending()
	    return React.createElement(this.props.component, React.__spread({},  attrs), 
	      bf.label && bf.labelTag(), " ", bf.render(), 
	      isPending && ' ', 
	      isPending && this.renderProgress(), 
	      bf.errors().render(), 
	      bf.helpText && ' ', 
	      bf.helpTextTag()
	    )
	  }
	})

	module.exports = FormRow

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var React = __webpack_require__(23)

	var ProgressMixin = {
	  propTypes: {
	    progress: React.PropTypes.any // Component or function to render async progress
	  },

	  renderProgress:function() {
	    if (!this.props.progress) {
	      return React.createElement("progress", null, "Validating...")
	    }
	    if (is.Function(this.props.progress)) {
	      return this.props.progress()
	    }
	    return React.createElement(this.props.progress, null)
	  }
	}

	module.exports = ProgressMixin

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var Concur = __webpack_require__(4)
	var getFormData = __webpack_require__(17)
	var is = __webpack_require__(5)
	var $__0=  __webpack_require__(11),formatObj=$__0.formatObj
	var object = __webpack_require__(6)

	var constants = __webpack_require__(98)
	var env = __webpack_require__(68)

	var BooleanField = __webpack_require__(62)
	var ErrorList = __webpack_require__(91)
	var Form = __webpack_require__(96)
	var HiddenInput = __webpack_require__(21)
	var IntegerField = __webpack_require__(87)
	var isFormAsync = __webpack_require__(104)

	var $__1=  __webpack_require__(2),ValidationError=$__1.ValidationError
	var $__2=  __webpack_require__(15),cancellable=$__2.cancellable

	function noop() {}

	// Name associated with clean() validation
	var CLEAN_VALIDATION = 'clean'

	// Special field names
	var DELETION_FIELD_NAME = 'DELETE'
	var INITIAL_FORM_COUNT = 'INITIAL_FORMS'
	var MAX_NUM_FORM_COUNT = 'MAX_NUM_FORMS'
	var MIN_NUM_FORM_COUNT = 'MIN_NUM_FORMS'
	var ORDERING_FIELD_NAME = 'ORDER'
	var TOTAL_FORM_COUNT = 'TOTAL_FORMS'

	// Default minimum number of forms in a formset
	var DEFAULT_MIN_NUM = constants.FORMSET_DEFAULT_MIN_NUM

	// Default maximum number of forms in a formset, to prevent memory exhaustion
	var DEFAULT_MAX_NUM = constants.FORMSET_DEFAULT_MAX_NUM

	/**
	 * ManagementForm is used to keep track of how many form instances are displayed
	 * on the page. If adding new forms via JavaScript, you should increment the
	 * count field of this form as well.
	 * @constructor
	 */
	var ManagementForm = (function() {
	  var fields = {}
	  fields[TOTAL_FORM_COUNT] = IntegerField({widget: HiddenInput})
	  fields[INITIAL_FORM_COUNT] = IntegerField({widget: HiddenInput})
	  // MIN_NUM_FORM_COUNT and MAX_NUM_FORM_COUNT are output with the rest of
	  // the management form, but only for the convenience of client-side
	  // code. The POST value of them returned from the client is not checked.
	  fields[MIN_NUM_FORM_COUNT] = IntegerField({required: false, widget: HiddenInput})
	  fields[MAX_NUM_FORM_COUNT] = IntegerField({required: false, widget: HiddenInput})
	  return Form.extend(fields)
	})()

	/**
	 * A collection of instances of the same Form.
	 * @constructor
	 * @param {Object=} kwargs
	 */
	var FormSet = Concur.extend({
	  prefixFormat: '{prefix}-{index}',

	  constructor: function FormSet(kwargs) {
	    // TODO Perform PropType checks on kwargs in development mode
	    kwargs = object.extend({
	      // Formset options
	      form: this.form || null, extra: is.Number(this.extra) ? this.extra : 1,
	      canOrder: this.canOrder || false, canDelete: this.canDelete || false,
	      maxNum: is.Number(this.maxNum) ? this.maxNum : DEFAULT_MAX_NUM,
	      validateMax: this.validateMax || false,
	      minNum: is.Number(this.minNum) ? this.minNum : DEFAULT_MIN_NUM,
	      validateMin: this.validateMin || false,
	      managementFormCssClass: this.magagementFormCssClass || null,
	      // Form options
	      data: null, files: null, autoId: 'id_{name}', prefix: null,
	      initial: null, errorConstructor: ErrorList, validation: null,
	      controlled: false, onChange: null
	    }, kwargs)

	    if (!is.Function(kwargs.form)) {
	      throw new Error(
	        'A FormSet must be given a Form constructor to use, either via its ' +
	        'constructor\'s `form` option or via its prototype, passing a `form` ' +
	        'property to `FormSet.extend()`.'
	      )
	    }

	    this.form = kwargs.form
	    this.extra = kwargs.extra + kwargs.minNum
	    this.canOrder = kwargs.canOrder
	    this.canDelete = kwargs.canDelete
	    this.maxNum = kwargs.maxNum
	    this.validateMax = kwargs.validateMax
	    this.minNum = kwargs.minNum
	    this.validateMin = kwargs.validateMin
	    // Hard limit on forms instantiated, to prevent memory-exhaustion attacks
	    // limit is simply maxNum + DEFAULT_MAX_NUM (which is 2 * DEFAULT_MAX_NUM
	    // if maxNum is not provided in the first place)
	    this.absoluteMax = kwargs.maxNum + DEFAULT_MAX_NUM

	    this.isInitialRender = (kwargs.data === null && kwargs.files === null)
	    this.prefix = kwargs.prefix || this.getDefaultPrefix()
	    this.autoId = kwargs.autoId
	    this.data = kwargs.data || {}
	    this.files = kwargs.files || {}
	    this.initial = kwargs.initial
	    this.errorConstructor = kwargs.errorConstructor
	    this.managementFormCssClass = kwargs.managementFormCssClass
	    this.validation = kwargs.validation
	    this.controlled = kwargs.controlled
	    this.onChange = kwargs.onChange

	    this._forms = null
	    this._errors = null
	    this._nonFormErrors = null

	    // Lookup for pending validation
	    this._pendingValidation = {}
	    // Cancellable callbacks for pending async validation
	    this._pendingAsyncValidation = {}
	    // Lookup for pending validation which formset cleaning depends on
	    this._cleanFormsetAfter = {}
	    // Callback to be run the next time validation finishes
	    this._onValidate = null
	  }
	})

	/**
	 * Tries to construct a display name for the formset for display in messages.
	 * @return {string}
	 */
	FormSet.prototype._formsetName = function() {
	  var name = this.displayName || this.constructor.name
	  return (name ? "'" + name + "'" : 'FormSet')
	}

	/**
	 * Calls the onChange function if it's been provided. This method will be called
	 * every time the formset makes a change to its state which requires redisplay.
	 */
	FormSet.prototype._stateChanged = function() {
	  if (typeof this.onChange == 'function') {
	    this.onChange()
	  }
	}

	// ============================================================== Validation ===

	/**
	 * Forces the formset to revalidate from scratch. If a <form> is given, data
	 * from it will be set on this formset's forms first. Otherwise, validation will
	 * be done with current input data.
	 * @param {(ReactElement|HTMLFormElement)=} form the <form> containing this
	 *   formset's rendered widgets - this can be a React <form> component or a real
	 *   <form> DOM node.
	 * @param {function(err, isValid, cleanedData)=} cb callback for asynchronous
	 *   validation.
	 * @return {boolean|undefined} true if the form only has synchronous validation
	 *   and is valid.
	 * @throws if the formset or its form has asynchronous validation and a callback
	 *   is not provided.
	 */
	FormSet.prototype.validate = function(form, cb) {
	  this._cancelPendingOperations()
	  if (is.Function(form)) {
	    cb = form
	    form = null
	  }
	  if (form) {
	    if (typeof form.getDOMNode == 'function') {
	      form = form.getDOMNode()
	    }
	    this.setData(getFormData(form), {
	      validate: false
	    , _triggerStateChange: false
	    })
	  }
	  return (this.isAsync() ? this._validateAsync(cb) : this._validateSync())
	}

	FormSet.prototype._validateAsync = function(cb) {
	  if (!is.Function(cb)) {
	    throw new Error(
	      'You must provide a callback to validate() when a formset or its form ' +
	      'has asynchronous validation.'
	    )
	  }
	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  this._onValidate = cb
	  this.fullClean()
	  // Update state to display async progress indicators
	  this._stateChanged()
	}

	FormSet.prototype._validateSync = function() {
	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  this.fullClean()
	  // Display changes to valid/invalid state
	  this._stateChanged()
	  return this.isValid()
	}

	/**
	 * Cleans all of this.data and populates this._errors and this._nonFormErrors.
	 */
	FormSet.prototype.fullClean = function() {
	  this._errors = []
	  this._nonFormErrors = new this.errorConstructor()

	  if (this.isInitialRender) {
	    return // Stop further processing
	  }

	  this._cleanForms()
	}

	/**
	 * Validates and cleans every form in the formset.
	 */
	FormSet.prototype._cleanForms = function() {
	  var forms = this.forms()
	  var formIndexLookup = object.lookup(Object.keys(forms))
	  object.extend(this._pendingValidation, formIndexLookup)
	  object.extend(this._cleanFormsetAfter, formIndexLookup)
	  for (var i = 0, l = forms.length; i < l; i++) {
	    this._cleanForm(i, forms[i])
	  }
	  // Make sure clean gets called even if the formset is empty
	  if (forms.length === 0) {
	    this._cleanFormsetAfter.empty = true
	    this._formCleaned('empty', null)
	  }
	}

	/**
	 * Validates and cleans the form at the given index.
	 * @param {number} index the index of the form in the formset.
	 * @param {Form} form
	 */
	FormSet.prototype._cleanForm = function(index, form) {
	  if (!form.isAsync()) {
	    form.validate()
	    this._errors[index] = form.errors()
	    this._formCleaned(index, null)
	    return
	  }

	  // If the form is async and there's one pending, prevent its callback from
	  // doing anything.
	  if (typeof this._pendingAsyncValidation[index] != 'undefined') {
	    object.pop(this._pendingAsyncValidation, index).cancel()
	  }
	  // Set up callback for async processing
	  var callback = function(err) {
	    if (!err) {
	      this._errors[index] = form.errors()
	    }
	    this._formCleaned(index, err)
	    this._stateChanged()
	  }.bind(this)
	  callback.onCancel = function() {
	    form._cancelPendingOperations()
	  }
	  this._pendingAsyncValidation[index] = cancellable(callback)
	  form.validate(callback)
	}

	/**
	 * Callback for completion of form cleaning. Triggers formset cleaning or
	 * signals the end of validation, as necessary.
	 * @param {number|string} name the name associated with the cleaning that's completed.
	 * @param {Error=} err an error caught while cleaning.
	 */
	FormSet.prototype._formCleaned = function(name, err) {
	  delete this._pendingValidation[name]
	  if (this._pendingAsyncValidation[name]) {
	    delete this._pendingAsyncValidation[name]
	  }

	  if (err) {
	    if ("production" !== process.env.NODE_ENV) {
	      console.error('Error cleaning formset[' + name + ']:' + err.message)
	    }
	    // Stop tracking validation progress on error, and don't call clean()
	    this._pendingValidation = {}
	    this._cleanFormsetAfter = {}
	    this._finishedValidation(err)
	    return
	  }

	  // Run clean() if this this was the last field it was waiting for
	  if (this._cleanFormsetAfter[name]) {
	    delete this._cleanFormsetAfter[name]
	    if (is.Empty(this._cleanFormsetAfter)) {
	      this._cleanFormset()
	      return
	    }
	  }

	  // Signal the end of validation if this was the last field we were waiting for
	  if (name == CLEAN_VALIDATION) {
	    this._finishedValidation(null)
	  }
	}

	/**
	 * Hook for doing any extra formset-wide cleaning after Form.clean() has been
	 * called on every form. Any ValidationError raised by this method will not be
	 * associated with a particular form; it will be accessible via
	 * formset.nonFormErrors()
	 */
	FormSet.prototype.clean = noop

	/**
	 * Validates the number of forms and calls the clean() hook.
	 */
	FormSet.prototype._cleanFormset = function() {
	  var async = false
	  var error = null
	  try {
	    var totalFormCount = this.totalFormCount()
	    var deletedFormCount = this.deletedForms().length
	    if ((this.validateMax && totalFormCount - deletedFormCount > this.maxNum) ||
	        (!env.browser && this.managementForm().cleanedData[TOTAL_FORM_COUNT] > this.absoluteMax)) {
	      throw ValidationError('Please submit ' + this.maxNum + ' or fewer forms.',
	                            {code: 'tooManyForms'})
	    }
	    if (this.validateMin && totalFormCount - deletedFormCount < this.minNum) {
	      throw ValidationError('Please submit ' + this.minNum + ' or more forms.',
	                            {code: 'tooFewForms'})
	    }
	    // Give this.clean() a chance to do cross-form validation.
	    if (this.clean !== noop) {
	      async = this._runCustomClean(CLEAN_VALIDATION, this.clean)
	    }
	  }
	  catch (e) {
	    if (e instanceof ValidationError) {
	      this._nonFormErrors = new this.errorConstructor(e.messages())
	    }
	    else {
	      error = e
	    }
	  }

	  if (!async) {
	    this._formCleaned(CLEAN_VALIDATION, error)
	  }
	}

	/**
	 * Calls a custom cleaning method, expecting synchronous or asynchronous
	 * behaviour, depending on its arity.
	 * @param {string} name a name to associate with the cleaning method.
	 * @param {function} customClean
	 * @return {boolean} true if cleaning is running asynchronously, false if it just
	 *   ran synchronously.
	 */
	FormSet.prototype._runCustomClean = function(name, customClean) {
	  // Check arity to see if we have a callback in the function signature
	  if (customClean.length === 0) {
	    // Synchronous processing only expected
	    customClean.call(this)
	    return false
	  }

	  // If custom validation is async and there's one pending, prevent its
	  // callback from doing anything.
	  if (typeof this._pendingAsyncValidation[name] != 'undefined') {
	    object.pop(this._pendingAsyncValidation, name).cancel()
	  }
	  // Set up callback for async processing - arguments for addError()
	  // should be passed via the callback as calling it directly prevents us
	  // from completely ignoring the callback if validation fires again.
	  var callback = function(err, validationError) {
	    if (typeof validationError != 'undefined') {
	      this.addError(validationError)
	    }
	    this._formCleaned(name, err)
	    this._stateChanged()
	  }.bind(this)

	  // An explicit return value of false indicates that async processing is
	  // being skipped (e.g. because sync checks in the method failed first)
	  var returnValue = customClean.call(this, callback)
	  if (returnValue !== false) {
	    // Async processing is happening! Make the callback cancellable and
	    // hook up any custom onCancel handling provided.
	    if (returnValue && typeof returnValue.onCancel == 'function') {
	      callback.onCancel = returnValue.onCancel
	    }
	    this._pendingAsyncValidation[name] = cancellable(callback)
	    return true
	  }
	}

	FormSet.prototype._finishedValidation = function(err) {
	  if (!this.isAsync()) {
	    if (err) {
	      throw err
	    }
	    // Synchronous formset validation results will be returned via the original
	    // call which triggered validation.
	    return
	  }
	  if (is.Function(this._onValidate)) {
	    var callback = this._onValidate
	    this._onValidate = null
	    if (err) {
	      return callback(err)
	    }
	    var isValid = this.isValid()
	    callback(null, isValid, isValid ? this.cleanedData() : null)
	  }
	}

	/**
	 * Cancels any pending async validations.
	 */
	FormSet.prototype._cancelPendingOperations = function() {
	  Object.keys(this._pendingAsyncValidation).forEach(function(field) {
	    object.pop(this._pendingAsyncValidation, field).cancel()
	  }.bind(this))
	}

	/**
	 * Returns a list of form.cleanedData objects for every form in this.forms().
	 */
	FormSet.prototype.cleanedData = function() {
	  var forms = this.initialForms()
	  // Don't include empty or incomplete extra forms
	  forms.push.apply(forms, this.extraForms().filter(function(form) {
	    return form.hasChanged() && form.isComplete()
	  }))
	  return forms.map(function(form) { return form.cleanedData })
	}


	// ============================================================== Mutability ===

	/**
	 * Sets the formset's entire input data, also triggering validation by default.
	 * @param {Object.<string,*>} data new input data for forms, which must be
	 *   prefixed for uniqueness.
	 * @param {Object.<string,boolean>} kwargs data setting options.
	 * @return {boolean} if date setting options indicate the new data should be
	 *   validated, true if the new data is valid.
	 */
	FormSet.prototype.setData = function(data, kwargs) {
	  kwargs = object.extend({validate: true, _triggerStateChange: true}, kwargs)

	  this.data = data
	  var formDataSettingOptions = {
	    prefixed: true, validate: kwargs.validate, _triggerStateChange: false
	  }
	  this.forms().forEach(function(form) {
	    form.setData(data, formDataSettingOptions)
	  })

	  if (this.isInitialRender) {
	    this.isInitialRender = false
	  }
	  if (kwargs.validate) {
	    this._errors = null
	    // This call ultimately triggers a fullClean() because _errors is null
	    var isValid = this.isValid()
	  }
	  else {
	    // Prevent validation being triggered if errors() is accessed during render
	    this._errors = []
	    this._nonFormErrors = new this.errorConstructor()
	  }

	  if (kwargs._triggerStateChange) {
	    this._stateChanged()
	  }

	  if (kwargs.validate) {
	    return isValid
	  }
	}

	/**
	 * Alias to keep the FormSet data setting API the same as Form's.
	 */
	FormSet.prototype.setFormData = FormSet.prototype.setData

	// =================================================================== Forms ===

	/**
	 * Returns the ManagementForm instance for this FormSet.
	 * @browser the form is unbound and uses initial data from this FormSet.
	 * @server the form is bound to submitted data.
	 */
	FormSet.prototype.managementForm = function() {
	  var form
	  if (!env.browser && !this.isInitialRender) {
	    form = new ManagementForm({data: this.data, autoId: this.autoId,
	                               prefix: this.prefix})
	    if (!form.isValid()) {
	      throw ValidationError('ManagementForm data is missing or has been tampered with',
	                            {code: 'missing_management_form'})
	    }
	  }
	  else {
	    var initial = {}
	    initial[TOTAL_FORM_COUNT] = this.totalFormCount()
	    initial[INITIAL_FORM_COUNT] = this.initialFormCount()
	    initial[MIN_NUM_FORM_COUNT] = this.minNum
	    initial[MAX_NUM_FORM_COUNT] = this.maxNum
	    form = new ManagementForm({autoId: this.autoId,
	                               prefix: this.prefix,
	                               initial: initial})
	  }
	  if (this.managementFormCssClass !== null) {
	    form.hiddenFieldRowCssClass = this.managementFormCssClass
	  }
	  return form
	}

	/**
	 * Determines the number of form instances this formset contains, based on
	 * either submitted management data or initial configuration, as appropriate.
	 */
	FormSet.prototype.totalFormCount = function() {
	  if (!env.browser && !this.isInitialRender) {
	    // Return absoluteMax if it is lower than the actual total form count in
	    // the data; this is DoS protection to prevent clients  from forcing the
	    // server to instantiate arbitrary numbers of forms.
	    return Math.min(this.managementForm().cleanedData[TOTAL_FORM_COUNT], this.absoluteMax)
	  }
	  else {
	    var initialForms = this.initialFormCount()
	    var totalForms = this.initialFormCount() + this.extra
	    // Allow all existing related objects/inlines to be displayed, but don't
	    // allow extra beyond max_num.
	    if (this.maxNum !== null &&
	        initialForms > this.maxNum &&
	        this.maxNum >= 0) {
	      totalForms = initialForms
	    }
	    if (this.maxNum !== null &&
	        totalForms > this.maxNum &&
	        this.maxNum >= 0) {
	      totalForms = this.maxNum
	    }
	    return totalForms
	  }
	}

	/**
	 * Determines the number of initial form instances this formset contains, based
	 * on either submitted management data or initial configuration, as appropriate.
	 */
	FormSet.prototype.initialFormCount = function() {
	  if (!env.browser && !this.isInitialRender) {
	    return this.managementForm().cleanedData[INITIAL_FORM_COUNT]
	  }
	  else {
	    // Use the length of the initial data if it's there, 0 otherwise.
	    return (this.initial !== null && this.initial.length > 0
	            ? this.initial.length
	            : 0)
	  }
	}

	/**
	 * Instantiates forms when first accessed.
	 */
	FormSet.prototype.forms = function() {
	  if (this._forms !== null) { return this._forms }
	  var forms = []
	  var totalFormCount = this.totalFormCount()
	  for (var i = 0; i < totalFormCount; i++) {
	    forms.push(this._constructForm(i))
	  }
	  this._forms = forms
	  return forms
	}

	/**
	 * Adds another form and increments extra.
	 */
	FormSet.prototype.addAnother = function() {
	  var currentFormCount = this.totalFormCount()
	  this.extra++
	  if (this._forms !== null) {
	    this._forms[currentFormCount] = this._constructForm(currentFormCount)
	  }
	 this._stateChanged()
	}

	// Assumption - the UI will only let the user remove extra forms
	FormSet.prototype.removeForm = function(index) {
	  if (this.extra === 0) {
	    throw new Error("Can't remove a form when there are no extra forms")
	  }
	  this.extra--
	  if (this._forms !== null) {
	    this._forms.splice(index, 1)
	  }
	  if (this._errors !== null) {
	    this._errors.splice(index, 1)
	  }
	 this._stateChanged()
	}

	/**
	 * Instantiates and returns the ith form instance in the formset.
	 */
	FormSet.prototype._constructForm = function(i) {
	  var defaults = {
	    autoId: this.autoId
	  , prefix: this.addPrefix(i)
	  , errorConstructor: this.errorConstructor
	  , validation: this.validation
	  , controlled: this.controlled
	  , onChange: this.onChange
	  }
	  if (!this.isInitialRender) {
	    defaults.data = this.data
	    defaults.files = this.files
	  }
	  if (this.initial !== null && this.initial.length > 0) {
	    if (typeof this.initial[i] != 'undefined') {
	      defaults.initial = this.initial[i]
	    }
	  }
	  // Allow extra forms to be empty
	  if (i >= this.initialFormCount()) {
	    defaults.emptyPermitted = true
	  }

	  var form = new this.form(defaults)
	  this.addFields(form, i)
	  return form
	}

	/**
	 * Returns a list of all the initial forms in this formset.
	 */
	FormSet.prototype.initialForms = function() {
	  return this.forms().slice(0, this.initialFormCount())
	}

	/**
	 * Returns a list of all the extra forms in this formset.
	 */
	FormSet.prototype.extraForms = function() {
	  return this.forms().slice(this.initialFormCount())
	}

	FormSet.prototype.emptyForm = function() {
	  var kwargs = {
	    autoId: this.autoId,
	    prefix: this.addPrefix('__prefix__'),
	    emptyPermitted: true
	  }
	  var form = new this.form(kwargs)
	  this.addFields(form, null)
	  return form
	}

	/**
	 * Returns a list of forms that have been marked for deletion.
	 */
	FormSet.prototype.deletedForms = function() {
	  if (!this.isValid() || !this.canDelete) { return [] }

	  var forms = this.forms()

	  // Construct _deletedFormIndexes, which is just a list of form indexes
	  // that have had their deletion widget set to true.
	  if (typeof this._deletedFormIndexes == 'undefined') {
	    this._deletedFormIndexes = []
	    for (var i = 0, l = forms.length; i < l; i++) {
	      var form = forms[i]
	      // If this is an extra form and hasn't changed, ignore it
	      if (i >= this.initialFormCount() && !form.hasChanged()) {
	        continue
	      }
	      if (this._shouldDeleteForm(form)) {
	        this._deletedFormIndexes.push(i)
	      }
	    }
	  }

	  return this._deletedFormIndexes.map(function(i) { return forms[i] })
	}

	/**
	 * Returns a list of forms in the order specified by the incoming data.
	 * Throws an Error if ordering is not allowed.
	 */
	FormSet.prototype.orderedForms = function() {
	  if (!this.isValid() || !this.canOrder) {
	    throw new Error(this.constructor.name +
	                    " object has no attribute 'orderedForms'")
	  }

	  var forms = this.forms()

	  // Construct _ordering, which is a list of [form index, orderFieldValue]
	  // pairs. After constructing this list, we'll sort it by orderFieldValue
	  // so we have a way to get to the form indexes in the order specified by
	  // the form data.
	  if (typeof this._ordering == 'undefined') {
	    this._ordering = []
	    for (var i = 0, l = forms.length; i < l; i++) {
	      var form = forms[i]
	      // If this is an extra form and hasn't changed, ignore it
	      if (i >= this.initialFormCount() && !form.hasChanged()) {
	        continue
	      }
	      // Don't add data marked for deletion
	      if (this.canDelete && this._shouldDeleteForm(form)) {
	        continue
	      }
	      this._ordering.push([i, form.cleanedData[ORDERING_FIELD_NAME]])
	    }

	    // Null should be sorted below anything else. Allowing null as a
	    // comparison value makes it so we can leave ordering fields blank.
	    this._ordering.sort(function(x, y) {
	      if (x[1] === null && y[1] === null) {
	        // Sort by form index if both order field values are null
	        return x[0] - y[0]
	      }
	      if (x[1] === null) {
	        return 1
	      }
	      if (y[1] === null) {
	        return -1
	      }
	      return x[1] - y[1]
	    })
	  }

	  return this._ordering.map(function(ordering) { return forms[ordering[0]]})
	}

	/**
	 * A hook for adding extra fields on to each form instance.
	 * @param {Form} form the form fields are to be added to.
	 * @param {Number} index the index of the given form in the formset.
	 */
	FormSet.prototype.addFields = function(form, index) {
	  if (this.canOrder) {
	    // Only pre-fill the ordering field for initial forms
	    if (index != null && index < this.initialFormCount()) {
	      form.fields[ORDERING_FIELD_NAME] =
	          IntegerField({label: 'Order', initial: index + 1,
	                        required: false})
	    }
	    else {
	      form.fields[ORDERING_FIELD_NAME] =
	          IntegerField({label: 'Order', required: false})
	    }
	  }
	  if (this.canDelete) {
	    form.fields[DELETION_FIELD_NAME] =
	        BooleanField({label: 'Delete', required: false})
	  }
	}

	/**
	 * Returns whether or not the form was marked for deletion.
	 */
	FormSet.prototype._shouldDeleteForm = function(form) {
	  return object.get(form.cleanedData, DELETION_FIELD_NAME, false)
	}

	// ================================================================== Errors ===

	FormSet.prototype.addError = function(error) {
	  if (!(error instanceof ValidationError)) {
	    // Normalise to ValidationError and let its constructor do the hard work of
	    // making sense of the input.
	    error = ValidationError(error)
	  }

	  this._nonFormErrors.extend(error.errorList)
	}

	/**
	 * Returns a list of form.errors for every form in this.forms.
	 */
	FormSet.prototype.errors = function() {
	  if (this._errors === null) {
	    this.fullClean()
	  }
	  return this._errors
	}

	/**
	 * Returns an ErrorList of errors that aren't associated with a particular
	 * form -- i.e., from formset.clean(). Returns an empty ErrorList if there are
	 * none.
	 */
	FormSet.prototype.nonFormErrors = function() {
	  if (this._nonFormErrors === null) {
	    this.fullClean()
	  }
	  return this._nonFormErrors
	}

	/**
	 * Returns the number of errors across all forms in the formset.
	 */
	FormSet.prototype.totalErrorCount = function() {
	  return (this.nonFormErrors().length() +
	          this.errors().reduce(function(sum, formErrors) {
	            return sum + formErrors.length()
	          }, 0))
	}

	// ================================================================== Status ===

	/**
	 * Returns true if any form differs from initial.
	 */
	FormSet.prototype.hasChanged = function() {
	  var forms = this.forms()
	  for (var i = 0, l = forms.length; i < l; i++) {
	    if (forms[i].hasChanged()) {
	      return true
	    }
	  }
	  return false
	}

	/**
	 * @return {boolean} true if the formset needs a callback argument for final
	 *   validation.
	 */
	FormSet.prototype.isAsync = function() {
	  return (this.clean.length == 1 || isFormAsync(this.form))
	}

	/**
	 * @return {boolean} true if the formset needs to be multipart-encoded, i.e. it
	 * has a FileInput. Otherwise, false.
	 */
	FormSet.prototype.isMultipart = function() {
	  return (this.forms().length > 0 && this.forms()[0].isMultipart())
	}

	/**
	 * @return {boolean} true if the formset is waiting for async validation to
	 *   complete.
	 */
	FormSet.prototype.isPending = function() {
	  return !is.Empty(this._pendingAsyncValidation)
	}

	/**
	 * Returns true if every form in this.forms() is valid and there are no non-form
	 * errors.
	 */
	FormSet.prototype.isValid = function() {
	  if (this.isInitialRender) {
	    return false
	  }
	  // Triggers a full clean
	  var errors = this.errors()
	  var forms = this.forms()
	  for (var i = 0, l = errors.length; i < l ; i++) {
	    if (errors[i].isPopulated()) {
	      if (this.canDelete && this._shouldDeleteForm(forms[i])) {
	        // This form is going to be deleted so any of its errors should
	        // not cause the entire formset to be invalid.
	        continue
	      }
	      return false
	    }
	  }
	  return !this.nonFormErrors().isPopulated()
	}

	/**
	 * @return {boolean} true if the formset is waiting for async validation of its
	 *   clean() method to complete.
	 */
	FormSet.prototype.nonFormPending = function() {
	  return typeof this._pendingAsyncValidation[CLEAN_VALIDATION] != 'undefined'
	}

	// ================================================================ Prefixes ===

	/**
	 * Returns the formset prefix with the form index appended.
	 * @param {Number} index the index of a form in the formset.
	 */
	FormSet.prototype.addPrefix = function(index) {
	  return formatObj(this.prefixFormat, {prefix: this.prefix, index: index})
	}

	FormSet.prototype.getDefaultPrefix = function() {
	  return 'form'
	}

	module.exports = FormSet
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	function isFormAsync(constructor) {
	  var proto = constructor.prototype
	  if (proto.clean.length == 1) { return true }
	  var fieldNames = Object.keys(proto.baseFields)
	  for (var i = 0, l = fieldNames.length; i < l ; i++) {
	    var customClean = proto._getCustomClean(fieldNames[i])
	    if (is.Function(customClean) && customClean.length == 1) {
	      return true
	    }
	  }
	  return false
	}

	module.exports = isFormAsync

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var validators = __webpack_require__(2)

	var CharField = __webpack_require__(66)

	var cleanIPv6Address = validators.ipv6.cleanIPv6Address

	var GenericIPAddressField = CharField.extend({
	  constructor: function GenericIPAddressField(kwargs) {
	    if (!(this instanceof GenericIPAddressField)) { return new GenericIPAddressField(kwargs) }
	    kwargs = object.extend({protocol: 'both', unpackIPv4: false}, kwargs)
	    this.unpackIPv4 = kwargs.unpackIPv4
	    this.defaultValidators =
	      validators.ipAddressValidators(kwargs.protocol, kwargs.unpackIPv4).validators
	    CharField.call(this, kwargs)
	  }
	})

	GenericIPAddressField.prototype.toJavaScript = function(value) {
	  if (!value) {
	    return ''
	  }
	  if (value && value.indexOf(':') != -1) {
	    return cleanIPv6Address(value, {unpackIPv4: this.unpackIPv4})
	  }
	  return value
	}


	module.exports = GenericIPAddressField

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var FileField = __webpack_require__(93)

	/**
	 * Validates that its input is a valid uploaded image.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var ImageField = FileField.extend({
	  defaultErrorMessages: {
	    invalidImage: 'Upload a valid image. The file you uploaded was either not an image or a corrupted image.'
	  }

	, constructor: function ImageField(kwargs) {
	    if (!(this instanceof ImageField)) { return new ImageField(kwargs) }
	    FileField.call(this, kwargs)
	  }
	})

	/**
	 * Checks that the file-upload field data contains a valid image.
	 */
	ImageField.prototype.toJavaScript = function(data, initial) {
	  var f = FileField.prototype.toJavaScript.call(this, data, initial)
	  if (f === null) {
	    return null
	  }

	  // TODO Plug in image processing code when running on the server

	  return f
	}

	ImageField.prototype.getWidgetAttrs = function(widget) {
	  var attrs = FileField.prototype.getWidgetAttrs.call(this, widget)
	  attrs.accept = 'image/*'
	  return attrs
	}


	module.exports = ImageField

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var CharField = __webpack_require__(66)

	var $__0=  __webpack_require__(2),validateIPv4Address=$__0.validateIPv4Address

	/**
	 * Validates that its input is a valid IPv4 address.
	 * @constructor
	 * @extends {CharField}
	 * @param {Object=} kwargs
	 * @deprecated in favour of GenericIPAddressField
	 */
	var IPAddressField = CharField.extend({
	  defaultValidators: [validateIPv4Address]

	, constructor: function IPAddressField(kwargs) {
	    if (!(this instanceof IPAddressField)) { return new IPAddressField(kwargs) }
	    CharField.call(this, kwargs)
	  }
	})

	module.exports = IPAddressField

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var ChoiceField = __webpack_require__(77)
	var MultipleHiddenInput = __webpack_require__(109)
	var SelectMultiple = __webpack_require__(75)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * Validates that its input is one or more of a valid list of choices.
	 * @constructor
	 * @extends {ChoiceField}
	 * @param {Object=} kwargs
	 */
	var MultipleChoiceField = ChoiceField.extend({
	  hiddenWidget: MultipleHiddenInput
	, widget: SelectMultiple
	, defaultErrorMessages: {
	    invalidChoice: 'Select a valid choice. {value} is not one of the available choices.'
	  , invalidList: 'Enter a list of values.'
	  }

	, constructor: function MultipleChoiceField(kwargs) {
	    if (!(this instanceof MultipleChoiceField)) { return new MultipleChoiceField(kwargs) }
	    ChoiceField.call(this, kwargs)
	  }
	})

	MultipleChoiceField.prototype.toJavaScript = function(value) {
	  if (this.isEmptyValue(value)) {
	    return []
	  }
	  else if (!is.Array(value)) {
	    throw ValidationError(this.errorMessages.invalidList, {code: 'invalidList'})
	  }
	  var stringValues = []
	  for (var i = 0, l = value.length; i < l; i++) {
	    stringValues.push(''+value[i])
	  }
	  return stringValues
	}

	/**
	 * Validates that the input is a list and that each item is in this field's
	 * choices.
	 * @param {Array.<string>} value user input.
	 * @throws {ValidationError} if the input is invalid.
	 */
	MultipleChoiceField.prototype.validate = function(value) {
	  if (this.required && !value.length) {
	    throw ValidationError(this.errorMessages.required, {code: 'required'})
	  }
	  for (var i = 0, l = value.length; i < l; i++) {
	    if (!this.validValue(value[i])) {
	      throw ValidationError(this.errorMessages.invalidChoice, {
	        code: 'invalidChoice'
	      , params: {value: value[i]}
	      })
	    }
	  }
	}

	MultipleChoiceField.prototype._hasChanged = function(initial, data) {
	  if (initial === null) {
	    initial = []
	  }
	  if (data === null) {
	    data = []
	  }
	  if (initial.length != data.length) {
	    return true
	  }
	  var dataLookup = object.lookup(data)
	  for (var i = 0, l = initial.length; i < l; i++) {
	    if (typeof dataLookup[''+initial[i]] == 'undefined') {
	      return true
	    }
	  }
	  return false
	}

	module.exports = MultipleChoiceField

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var HiddenInput = __webpack_require__(21)

	/**
	 * A widget that handles <input type="hidden"> for fields that have a list of
	 * values.
	 * @constructor
	 * @extends {HiddenInput}
	 * @param {Object=} kwargs
	 */
	var MultipleHiddenInput = HiddenInput.extend({
	  constructor: function MultipleHiddenInput(kwargs) {
	    if (!(this instanceof MultipleHiddenInput)) { return new MultipleHiddenInput(kwargs) }
	    HiddenInput.call(this, kwargs)
	  }
	})

	MultipleHiddenInput.prototype.render = function(name, value, kwargs) {
	  kwargs = object.extend({attrs: null}, kwargs)
	  if (value === null) {
	    value = []
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {type: this.inputType,
	                                                  name: name})
	  var id = object.get(finalAttrs, 'id', null)
	  var key = object.get(finalAttrs, 'key', null)
	  var inputs = []
	  for (var i = 0, l = value.length; i < l; i++) {
	    var inputAttrs = object.extend({}, finalAttrs, {value: value[i]})
	    // Add numeric index suffixes to attributes which should be unique
	    if (id) {
	      inputAttrs.id = id + '_' + i
	    }
	    if (key) {
	      inputAttrs.key = id + '_' + i
	    }
	    inputs.push(React.createElement('input', inputAttrs))
	  }
	  return React.createElement('div', null, inputs)
	}

	MultipleHiddenInput.prototype.valueFromData = function(data, files, name) {
	  if (typeof data[name] != 'undefined') {
	    return [].concat(data[name])
	  }
	  return null
	}

	module.exports = MultipleHiddenInput

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var Field = __webpack_require__(20)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * A Field that aggregates the logic of multiple Fields.
	 * Its clean() method takes a "decompressed" list of values, which are then
	 * cleaned into a single value according to this.fields. Each value in this
	 * list is cleaned by the corresponding field -- the first value is cleaned by
	 * the first field, the second value is cleaned by the second field, etc. Once
	 * all fields are cleaned, the list of clean values is "compressed" into a
	 * single value.
	 * Subclasses should not have to implement clean(). Instead, they must
	 * implement compress(), which takes a list of valid values and returns a
	 * "compressed" version of those values -- a single value.
	 * You'll probably want to use this with MultiWidget.
	 * @constructor
	 * @extends {Field}
	 * @param {Object=} kwargs
	 */
	var MultiValueField = Field.extend({
	  defaultErrorMessages: {
	    invalid: 'Enter a list of values.'
	  , incomplete: 'Enter a complete value.'
	  }

	, constructor: function MultiValueField(kwargs) {
	    if (!(this instanceof Field)) { return new MultiValueField(kwargs) }
	    kwargs = object.extend({fields: []}, kwargs)
	    this.requireAllFields = object.pop(kwargs, 'requireAllFields', true)
	    Field.call(this, kwargs)

	    for (var i = 0, l = kwargs.fields.length; i < l; i++) {
	      var f = kwargs.fields[i]
	      object.setDefault(f.errorMessages, 'incomplete',
	                        this.errorMessages.incomplete)
	      if (this.requireAllFields) {
	        // Set required to false on the individual fields, because the required
	        // validation will be handled by MultiValueField, not by those
	        // individual fields.
	        f.required = false
	      }
	    }
	    this.fields = kwargs.fields
	  }
	})

	MultiValueField.prototype.validate = function() {}

	/**
	 * Validates every value in the given list. A value is validated against the
	 * corresponding Field in this.fields.
	 * For example, if this MultiValueField was instantiated with
	 * {fields: [forms.DateField(), forms.TimeField()]}, clean() would call
	 * DateField.clean(value[0]) and TimeField.clean(value[1]).
	 * @param {Array} value user input for each field.
	 * @return the result of calling compress() on the cleaned input.
	 * @throws {ValidationError} if the input is invalid.
	 */
	MultiValueField.prototype.clean = function(value) {
	  var cleanData = []
	  var errors = []

	  if (!value || is.Array(value)) {
	    var allValuesEmpty = true
	    if (is.Array(value)) {
	      for (var i = 0, l = value.length; i < l; i++) {
	        if (value[i]) {
	          allValuesEmpty = false
	          break
	        }
	      }
	    }

	    if (!value || allValuesEmpty) {
	      if (this.required) {
	        throw ValidationError(this.errorMessages.required, {code: 'required'})
	      }
	      else {
	        return this.compress([])
	      }
	    }
	  }
	  else {
	    throw ValidationError(this.errorMessages.invalid, {code: 'invalid'})
	  }

	  for (i = 0, l = this.fields.length; i < l; i++) {
	    var field = this.fields[i]
	    var fieldValue = value[i]
	    if (fieldValue === undefined) {
	      fieldValue = null
	    }
	    if (this.isEmptyValue(fieldValue)) {
	      if (this.requireAllFields) {
	        // Throw a 'required' error if the MultiValueField is required and any
	        // field is empty.
	        if (this.required) {
	          throw ValidationError(this.errorMessages.required, {code: 'required'})
	        }
	      }
	      else if (field.required) {
	        // Otherwise, add an 'incomplete' error to the list of collected errors
	        // and skip field cleaning, if a required field is empty.
	        if (errors.indexOf(field.errorMessages.incomplete) == -1) {
	          errors.push(field.errorMessages.incomplete)
	        }
	        continue
	      }
	    }

	    try {
	      cleanData.push(field.clean(fieldValue))
	    }
	    catch (e) {
	      if (!(e instanceof ValidationError)) { throw e }
	      // Collect all validation errors in a single list, which we'll throw at
	      // the end of clean(), rather than throwing a single exception for the
	      // first error we encounter. Skip duplicates.
	      errors = errors.concat(e.messages().filter(function(m) {
	        return errors.indexOf(m) == -1
	      }))
	    }
	  }

	  if (errors.length !== 0) {
	    throw ValidationError(errors)
	  }

	  var out = this.compress(cleanData)
	  this.validate(out)
	  this.runValidators(out)
	  return out
	}

	/**
	 * Returns a single value for the given list of values. The values can be
	 * assumed to be valid.
	 * For example, if this MultiValueField was instantiated with
	 * {fields: [forms.DateField(), forms.TimeField()]}, this might return a Date
	 * object created by combining the date and time in dataList.
	 * @param {Array} dataList
	 * @abstract
	 */
	MultiValueField.prototype.compress = function(dataList) {
	  throw new Error('Subclasses must implement this method.')
	}

	MultiValueField.prototype._hasChanged = function(initial, data) {
	  if (initial === null) {
	    initial = []
	    for (var i = 0, l = data.length; i < l; i++) {
	      initial.push('')
	    }
	  }
	  else if (!(is.Array(initial))) {
	    initial = this.widget.decompress(initial)
	  }

	  for (i = 0, l = this.fields.length; i < l; i++) {
	    if (this.fields[i]._hasChanged(initial[i], data[i])) {
	      return true
	    }
	  }
	  return false
	}

	module.exports = MultiValueField

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var Widget = __webpack_require__(59)

	/**
	 * A widget that is composed of multiple widgets.
	 * @constructor
	 * @extends {Widget}
	 * @param {Object=} kwargs
	 */
	var MultiWidget = Widget.extend({
	  constructor: function MultiWidget(widgets, kwargs) {
	    if (!(this instanceof MultiWidget)) { return new MultiWidget(widgets, kwargs) }
	    this.widgets = []
	    var needsMultipartForm = false
	    for (var i = 0, l = widgets.length; i < l; i++) {
	      var widget = widgets[i] instanceof Widget ? widgets[i] : new widgets[i]()
	      if (widget.needsMultipartForm) {
	        needsMultipartForm = true
	      }
	      this.widgets.push(widget)
	    }
	    this.needsMultipartForm = needsMultipartForm
	    Widget.call(this, kwargs)
	  }
	})

	/**
	 * This method is different than other widgets', because it has to figure out
	 * how to split a single value for display in multiple widgets.
	 *
	 * If the given value is NOT a list, it will first be "decompressed" into a list
	 * before it is rendered by calling the  MultiWidget#decompress function.
	 *
	 * Each value in the list is rendered  with the corresponding widget -- the
	 * first value is rendered in the first widget, the second value is rendered in
	 * the second widget, and so on.
	 *
	 * @param {string} name the field name.
	 * @param {(array.<*>|*)} value a list of values, or a normal value (e.g., a String that has
	 *   been "compressed" from a list of values).
	 * @param {Object=} kwargs rendering options.
	 * @return a rendered collection of widgets.
	 */
	MultiWidget.prototype.render = function(name, value, kwargs) {
	  kwargs = object.extend({}, kwargs)
	  if (!(is.Array(value))) {
	    value = this.decompress(value)
	  }
	  var finalAttrs = this.buildAttrs(kwargs.attrs, {'data-newforms-field': name})
	  var id = object.get(finalAttrs, 'id', null)
	  var key = object.get(finalAttrs, 'key', null)
	  var renderedWidgets = []
	  for (var i = 0, l = this.widgets.length; i < l; i++) {
	    var widget = this.widgets[i]
	    var widgetValue = null
	    if (typeof value[i] != 'undefined') {
	      widgetValue = value[i]
	    }
	    if (id) {
	      finalAttrs.id = id + '_' + i
	    }
	    if (key) {
	      finalAttrs.key = key + '_' + i
	    }
	    renderedWidgets.push(
	        widget.render(name + '_' + i, widgetValue, {attrs: finalAttrs,
	                                                    controlled: kwargs.controlled}))
	  }
	  return this.formatOutput(renderedWidgets)
	}

	MultiWidget.prototype.idForLabel = function(id) {
	  if (id) {
	    id += '_0'
	  }
	  return id
	}

	MultiWidget.prototype.valueFromData = function(data, files, name) {
	  var values = []
	  for (var i = 0, l = this.widgets.length; i < l; i++) {
	    values[i] = this.widgets[i].valueFromData(data, files, name + '_' + i)
	  }
	  return values
	}

	/**
	 * Creates an element containing a given list of rendered widgets.
	 *
	 * This hook allows you to format the HTML design of the widgets, if needed.
	 *
	 * @param {Array} renderedWidgets a list of rendered widgets.
	 * @return a <div> containing the rendered widgets.
	 */
	MultiWidget.prototype.formatOutput = function(renderedWidgets) {
	  return React.createElement('div', null, renderedWidgets)
	}

	/**
	 * Creates a list of decompressed values for the given compressed value.
	 * @abstract
	 * @param value a compressed value, which can be assumed to be valid, but not
	 *   necessarily non-empty.
	 * @return a list of decompressed values for the given compressed value.
	 */
	MultiWidget.prototype.decompress = function(value) {
	  throw new Error('MultiWidget subclasses must implement a decompress() method.')
	}

	module.exports = MultiWidget

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BooleanField = __webpack_require__(62)
	var NullBooleanSelect = __webpack_require__(113)

	/**
	 * A field whose valid values are null, true and false.
	 * Invalid values are cleaned to null.
	 * @constructor
	 * @extends {BooleanField}
	 * @param {Object=} kwargs
	 */
	var NullBooleanField = BooleanField.extend({
	  widget: NullBooleanSelect

	, constructor: function NullBooleanField(kwargs) {
	    if (!(this instanceof NullBooleanField)) { return new NullBooleanField(kwargs) }
	    BooleanField.call(this, kwargs)
	  }
	})

	NullBooleanField.prototype.toJavaScript = function(value) {
	  // Explicitly checks for the string 'True' and 'False', which is what a
	  // hidden field will submit for true and false, and for '1' and '0', which
	  // is what a RadioField will submit. Unlike the BooleanField we also need
	  // to check for true, because we are not using Boolean() function.
	  if (value === true || value == 'True' || value == 'true' || value == '1') {
	    return true
	  }
	  else if (value === false || value == 'False' || value == 'false' || value == '0') {
	    return false
	  }
	  return null
	}

	NullBooleanField.prototype.validate = function(value) {}

	NullBooleanField.prototype._hasChanged = function(initial, data) {
	  // null (unknown) and false (No) are not the same
	  if (initial !== null) {
	      initial = Boolean(initial)
	  }
	  if (data !== null) {
	      data = Boolean(data)
	  }
	  return initial != data
	}

	module.exports = NullBooleanField

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Select = __webpack_require__(76)

	/**
	 * A <select> widget intended to be used with NullBooleanField.
	 * @constructor
	 * @extends {Select}
	 * @param {Object=} kwargs
	 */
	var NullBooleanSelect = Select.extend({
	  constructor: function NullBooleanSelect(kwargs) {
	    if (!(this instanceof NullBooleanSelect)) { return new NullBooleanSelect(kwargs) }
	    kwargs = kwargs || {}
	    // Set or override choices
	    kwargs.choices = [['1', 'Unknown'], ['2', 'Yes'], ['3', 'No']]
	    Select.call(this, kwargs)
	  }
	})

	NullBooleanSelect.prototype.render = function(name, value, kwargs) {
	  if (value === true || value == '2') {
	    value = '2'
	  }
	  else if (value === false || value == '3') {
	    value = '3'
	  }
	  else {
	    value = '1'
	  }
	  return Select.prototype.render.call(this, name, value, kwargs)
	}

	NullBooleanSelect.prototype.valueFromData = function(data, files, name) {
	  var value = null
	  if (typeof data[name] != 'undefined') {
	    var dataValue = data[name]
	    if (dataValue === true || dataValue == 'True' || dataValue == 'true' ||
	        dataValue == '2') {
	      value = true
	    }
	    else if (dataValue === false || dataValue == 'False' ||
	             dataValue == 'false' || dataValue == '3') {
	      value = false
	    }
	  }
	  return value
	}

	module.exports = NullBooleanSelect

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ChoiceInput = __webpack_require__(70)

	var RadioChoiceInput = ChoiceInput.extend({
	  constructor: function RadioChoiceInput(name, value, attrs, controlled, choice, index) {
	    if (!(this instanceof RadioChoiceInput)) {
	      return new RadioChoiceInput(name, value, attrs, controlled, choice, index)
	    }
	    ChoiceInput.call(this, name, value, attrs, controlled, choice, index)
	    this.value = ''+this.value
	  }
	, inputType: 'radio'
	})

	module.exports = RadioChoiceInput

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ChoiceFieldRenderer = __webpack_require__(72)
	var RadioChoiceInput = __webpack_require__(114)

	var RadioFieldRenderer = ChoiceFieldRenderer.extend({
	  constructor: function RadioFieldRenderer(name, value, attrs, controlled, choices) {
	    if (!(this instanceof RadioFieldRenderer)) {
	      return new RadioFieldRenderer(name, value, attrs, controlled, choices)
	    }
	    ChoiceFieldRenderer.apply(this, arguments)
	  }
	, choiceInputConstructor: RadioChoiceInput
	})

	module.exports = RadioFieldRenderer

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var RadioFieldRenderer = __webpack_require__(115)
	var RendererMixin = __webpack_require__(74)
	var Select = __webpack_require__(76)

	/**
	 * Renders a single select as a list of <input type="radio"> elements.
	 * @constructor
	 * @extends {Select}
	 * @param {Object=} kwargs
	 */
	var RadioSelect = Select.extend({
	  __mixins__: [RendererMixin]
	, constructor: function(kwargs) {
	    if (!(this instanceof RadioSelect)) { return new RadioSelect(kwargs) }
	    RendererMixin.call(this, kwargs)
	    Select.call(this, kwargs)
	  }
	, renderer: RadioFieldRenderer
	, _emptyValue: ''
	})

	module.exports = RadioSelect

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)

	var CharField = __webpack_require__(66)

	var $__0=  __webpack_require__(2),RegexValidator=$__0.RegexValidator

	/**
	 * Validates that its input matches a given regular expression.
	 * @constructor
	 * @extends {CharField}
	 * @param {(RegExp|string)} regex
	 * @param {Object=} kwargs
	 */
	var RegexField = CharField.extend({
	  constructor: function RegexField(regex, kwargs) {
	    if (!(this instanceof RegexField)) { return new RegexField(regex, kwargs) }
	    CharField.call(this, kwargs)
	    if (is.String(regex)) {
	      regex = new RegExp(regex)
	    }
	    this.regex = regex
	    this.validators.push(RegexValidator({regex: this.regex}))
	  }
	})

	module.exports = RegexField

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var ErrorObject = __webpack_require__(92)
	var Form = __webpack_require__(96)
	var FormRow = __webpack_require__(101)
	var ProgressMixin = __webpack_require__(102)

	var $__0=  __webpack_require__(98),NON_FIELD_ERRORS=$__0.NON_FIELD_ERRORS
	var $__1=   __webpack_require__(15),autoIdChecker=$__1.autoIdChecker,getProps=$__1.getProps

	var formProps = {
	  autoId: autoIdChecker
	, controlled: React.PropTypes.bool
	, data: React.PropTypes.object
	, emptyPermitted: React.PropTypes.bool
	, errorConstructor: React.PropTypes.func
	, errors: React.PropTypes.instanceOf(ErrorObject)
	, files: React.PropTypes.object
	, initial: React.PropTypes.object
	, labelSuffix: React.PropTypes.string
	, onChange: React.PropTypes.func
	, prefix: React.PropTypes.string
	, validation: React.PropTypes.oneOfType([
	    React.PropTypes.string
	  , React.PropTypes.object
	  ])
	}

	/**
	 * Renders a Form. A form instance or constructor can be given. If a constructor
	 * is given, an instance will be created when the component is mounted, and any
	 * additional props will be passed to the constructor as options.
	 */
	var RenderForm = React.createClass({displayName: "RenderForm",
	  mixins: [ProgressMixin],
	  propTypes: object.extend({}, formProps, {
	    className: React.PropTypes.string      // Class for the component wrapping all rows
	  , component: React.PropTypes.any         // Component to wrap all rows
	  , form: React.PropTypes.oneOfType([      // Form instance or constructor
	      React.PropTypes.func,
	      React.PropTypes.instanceOf(Form)
	    ]).isRequired
	  , row: React.PropTypes.any               // Component to render form rows
	  , rowComponent: React.PropTypes.any      // Component to wrap each row
	  }),

	  childContextTypes: {
	    form: React.PropTypes.instanceOf(Form)
	  },

	  getChildContext:function() {
	    return {form: this.form}
	  },

	  getDefaultProps:function() {
	    return {
	      component: 'div'
	    , row: FormRow
	    , rowComponent: 'div'
	    }
	  },

	  componentWillMount:function() {
	    if (this.props.form instanceof Form) {
	      this.form = this.props.form
	    }
	    else {
	      this.form = new this.props.form(object.extend({
	        onChange: this.forceUpdate.bind(this)
	      }, getProps(this.props, Object.keys(formProps))))
	    }
	  },

	  getForm:function() {
	    return this.form
	  },

	  render:function() {
	    // Allow a single child to be passed for custom rendering - passing any more
	    // will throw an error.
	    if (React.Children.count(this.props.children) !== 0) {
	      // Pass a form prop to the child, which will also be available via context
	      return React.cloneElement(React.Children.only(this.props.children), {form: this.form})
	    }

	    // Default rendering
	    var $__0=   this,form=$__0.form,props=$__0.props
	    var attrs = {}
	    if (this.props.className) {
	      attrs.className = props.className
	    }
	    var topErrors = form.nonFieldErrors()
	    var hiddenFields = form.hiddenFields().map(function(bf)  {
	      var errors = bf.errors()
	      if (errors.isPopulated) {
	        topErrors.extend(errors.messages().map(function(error)  {
	          return '(Hidden field ' + bf.name + ') ' + error
	        }))
	      }
	      return bf.render()
	    })

	    return React.createElement(props.component, React.__spread({},  attrs), 
	      topErrors.isPopulated() && React.createElement(props.row, {
	        className: form.errorCssClass, 
	        component: props.rowComponent, 
	        content: topErrors.render(), 
	        key: form.addPrefix(NON_FIELD_ERRORS)}
	      ), 
	      form.visibleFields().map(function(bf)  {return React.createElement(props.row, {
	        bf: bf, 
	        className: bf.cssClasses(), 
	        component: props.rowComponent, 
	        key: bf.htmlName, 
	        progress: props.progress}
	      );}), 
	      form.nonFieldPending() && React.createElement(props.row, {
	        className: form.pendingRowCssClass, 
	        component: props.rowComponent, 
	        content: this.renderProgress(), 
	        key: form.addPrefix('__pending__')}
	      ), 
	      hiddenFields.length > 0 && React.createElement(props.row, {
	        className: form.hiddenFieldRowCssClass, 
	        component: props.rowComponent, 
	        content: hiddenFields, 
	        hidden: true, 
	        key: form.addPrefix('__hidden__')}
	      )
	    )
	  }
	})

	module.exports = RenderForm


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)
	var React = __webpack_require__(23)

	var FormRow = __webpack_require__(101)
	var FormSet = __webpack_require__(103)
	var ProgressMixin = __webpack_require__(102)
	var RenderForm = __webpack_require__(118)

	var $__0=  __webpack_require__(98),NON_FIELD_ERRORS=$__0.NON_FIELD_ERRORS
	var $__1=   __webpack_require__(15),autoIdChecker=$__1.autoIdChecker,getProps=$__1.getProps

	var formsetProps = {
	  canDelete: React.PropTypes.bool
	, canOrder: React.PropTypes.bool
	, extra: React.PropTypes.number
	, form: React.PropTypes.func
	, maxNum: React.PropTypes.number
	, minNum: React.PropTypes.number
	, validateMax: React.PropTypes.bool
	, validateMin: React.PropTypes.bool

	, autoId: autoIdChecker
	, controlled: React.PropTypes.bool
	, data: React.PropTypes.object
	, errorConstructor: React.PropTypes.func
	, files: React.PropTypes.object
	, initial: React.PropTypes.object
	, onChange: React.PropTypes.func
	, prefix: React.PropTypes.string
	, validation: React.PropTypes.oneOfType([
	    React.PropTypes.string
	  , React.PropTypes.object
	  ])
	}

	/**
	 * Renders a Formset. A formset instance or constructor can be given. If a
	 * constructor is given, an instance will be created when the component is
	 * mounted, and any additional props will be passed to the constructor as
	 * options.
	 */
	var RenderFormSet = React.createClass({displayName: "RenderFormSet",
	  mixins: [ProgressMixin],
	  propTypes: object.extend({}, formsetProps, {
	    className: React.PropTypes.string         // Class for the component wrapping all forms
	  , component: React.PropTypes.any            // Component to wrap all forms
	  , formComponent: React.PropTypes.any        // Component to wrap each form
	  , formset: React.PropTypes.oneOfType([      // Formset instance or constructor
	      React.PropTypes.func,
	      React.PropTypes.instanceOf(FormSet)
	    ])
	  , row: React.PropTypes.any                  // Component to render form rows
	  , rowComponent: React.PropTypes.any         // Component to wrap each form row
	  , useManagementForm: React.PropTypes.bool   // Should ManagementForm hidden fields be rendered?
	  , __all__:function(props) {
	      if (!props.form && !props.formset) {
	        return new Error(
	          'Invalid props supplied to `RenderFormSet`, either `form` or ' +
	          '`formset` must be specified.'
	        )
	      }
	    }
	  }),

	  getDefaultProps:function() {
	    return {
	      component: 'div'
	    , formComponent: 'div'
	    , formset: FormSet
	    , row: FormRow
	    , rowComponent: 'div'
	    , useManagementForm: false
	    }
	  },

	  componentWillMount:function() {
	    if (this.props.formset instanceof FormSet) {
	      this.formset = this.props.formset
	    }
	    else {
	      this.formset = new this.props.formset(object.extend({
	        onChange: this.forceUpdate.bind(this)
	      }, getProps(this.props, Object.keys(formsetProps))))
	    }
	  },

	  getFormset:function() {
	    return this.formset
	  },

	  render:function() {
	    var $__0=   this,formset=$__0.formset,props=$__0.props
	    var attrs = {}
	    if (this.props.className) {
	      attrs.className = props.className
	    }
	    var topErrors = formset.nonFormErrors()

	    return React.createElement(props.component, React.__spread({},  attrs), 
	      topErrors.isPopulated() && React.createElement(props.row, {
	        className: formset.errorCssClass, 
	        content: topErrors.render(), 
	        key: formset.addPrefix(NON_FIELD_ERRORS), 
	        rowComponent: props.rowComponent}
	      ), 
	      formset.forms().map(function(form)  {return React.createElement(RenderForm, {
	        form: form, 
	        formComponent: props.formComponent, 
	        progress: props.progress, 
	        row: props.row, 
	        rowComponent: props.rowComponent}
	      );}), 
	      formset.nonFormPending() && React.createElement(props.row, {
	        className: formset.pendingRowCssClass, 
	        content: this.renderProgress(), 
	        key: formset.addPrefix('__pending__'), 
	        rowComponent: props.rowComponent}
	      ), 
	      props.useManagementForm && React.createElement(RenderForm, {
	        form: formset.managementForm(), 
	        formComponent: props.formComponent, 
	        row: props.row, 
	        rowComponent: props.rowComponent}
	      )
	    )
	  }
	})

	module.exports = RenderFormSet

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var validators = __webpack_require__(2)

	var CharField = __webpack_require__(66)

	var $__0=  __webpack_require__(15),strip=$__0.strip

	/**
	 * Validates that its input is a valid slug.
	 * @constructor
	 * @extends {CharField}
	 * @param {Object=} kwargs
	 */
	var SlugField = CharField.extend({
	  defaultValidators: [validators.validateSlug]
	, constructor: function SlugField(kwargs) {
	    if (!(this instanceof SlugField)) { return new SlugField(kwargs) }
	    CharField.call(this, kwargs)
	  }
	})

	SlugField.prototype.clean = function(value) {
	  value = strip(this.toJavaScript(value))
	  return CharField.prototype.clean.call(this, value)
	}

	module.exports = SlugField

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)

	var DateField = __webpack_require__(81)
	var MultiValueField = __webpack_require__(110)
	var SplitDateTimeWidget = __webpack_require__(122)
	var SplitHiddenDateTimeWidget = __webpack_require__(124)
	var TimeField = __webpack_require__(125)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * A MultiValueField consisting of a DateField and a TimeField.
	 * @constructor
	 * @extends {MultiValueField}
	 * @param {Object=} kwargs
	 */
	var SplitDateTimeField = MultiValueField.extend({
	  hiddenWidget: SplitHiddenDateTimeWidget
	, widget: SplitDateTimeWidget
	, defaultErrorMessages: {
	    invalidDate: 'Enter a valid date.'
	  , invalidTime: 'Enter a valid time.'
	  }

	, constructor: function SplitDateTimeField(kwargs) {
	    if (!(this instanceof SplitDateTimeField)) { return new SplitDateTimeField(kwargs) }
	    kwargs = object.extend({
	      inputDateFormats: null, inputTimeFormats: null
	    }, kwargs)
	    var errors = object.extend({}, this.defaultErrorMessages)
	    if (typeof kwargs.errorMessages != 'undefined') {
	      object.extend(errors, kwargs.errorMessages)
	    }
	    kwargs.fields = [
	      DateField({inputFormats: kwargs.inputDateFormats,
	                 errorMessages: {invalid: errors.invalidDate}})
	    , TimeField({inputFormats: kwargs.inputTimeFormats,
	                 errorMessages: {invalid: errors.invalidTime}})
	    ]
	    MultiValueField.call(this, kwargs)
	  }
	})

	/**
	 * Validates that, if given, its input does not contain empty values.
	 * @param {?Array.<Date>} dataList a two-item list consisting of two Date
	 *   objects, the first of which represents a date, the second a time.
	 * @return {?Date} a Dare representing the given date and time, or null for
	 *   empty values.
	 */
	SplitDateTimeField.prototype.compress = function(dataList) {
	  if (is.Array(dataList) && dataList.length > 0) {
	    var d = dataList[0]
	    var t = dataList[1]
	    // Raise a validation error if date or time is empty (possible if
	    // SplitDateTimeField has required == false).
	    if (this.isEmptyValue(d)) {
	      throw ValidationError(this.errorMessages.invalidDate, {code: 'invalidDate'})
	    }
	    if (this.isEmptyValue(t)) {
	      throw ValidationError(this.errorMessages.invalidTime, {code: 'invalidTime'})
	    }
	    return new Date(d.getFullYear(), d.getMonth(), d.getDate(),
	                    t.getHours(), t.getMinutes(), t.getSeconds())
	  }
	  return null
	}

	module.exports = SplitDateTimeField

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var DateInput = __webpack_require__(82)
	var MultiWidget = __webpack_require__(111)
	var TimeInput = __webpack_require__(123)

	/**
	 * Splits Date input into two <input type="text"> elements.
	 * @constructor
	 * @extends {MultiWidget}
	 * @param {Object=} kwargs
	 */
	var SplitDateTimeWidget = MultiWidget.extend({
	  constructor: function SplitDateTimeWidget(kwargs) {
	    if (!(this instanceof SplitDateTimeWidget)) { return new SplitDateTimeWidget(kwargs) }
	    kwargs = object.extend({dateFormat: null, timeFormat: null}, kwargs)
	    var widgets = [
	      DateInput({attrs: kwargs.attrs, format: kwargs.dateFormat})
	    , TimeInput({attrs: kwargs.attrs, format: kwargs.timeFormat})
	    ]
	    MultiWidget.call(this, widgets, kwargs.attrs)
	  }
	})

	SplitDateTimeWidget.prototype.decompress = function(value) {
	  if (value) {
	    return [
	      new Date(value.getFullYear(), value.getMonth(), value.getDate())
	    , new Date(1900, 0, 1, value.getHours(), value.getMinutes(), value.getSeconds())
	    ]
	  }
	  return [null, null]
	}

	module.exports = SplitDateTimeWidget

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var DateTimeBaseInput = __webpack_require__(83)

	/**
	 * @constructor
	 * @extends {DateTimeBaseInput}
	 * @param {Object=} kwargs
	 */
	var TimeInput = DateTimeBaseInput.extend({
	  formatType: 'TIME_INPUT_FORMATS'
	, constructor: function TimeInput(kwargs) {
	    if (!(this instanceof TimeInput)) { return new TimeInput(kwargs) }
	    DateTimeBaseInput.call(this, kwargs)
	  }
	})

	module.exports = TimeInput

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SplitDateTimeWidget = __webpack_require__(122)

	/**
	 * Splits Date input into two <input type="hidden"> elements.
	 * @constructor
	 * @extends {SplitDateTimeWidget}
	 * @param {Object=} kwargs
	 */
	var SplitHiddenDateTimeWidget = SplitDateTimeWidget.extend({
	  constructor: function SplitHiddenDateTimeWidget(kwargs) {
	    if (!(this instanceof SplitHiddenDateTimeWidget)) { return new SplitHiddenDateTimeWidget(kwargs) }
	    SplitDateTimeWidget.call(this, kwargs)
	    for (var i = 0, l = this.widgets.length; i < l; i++) {
	      this.widgets[i].inputType = 'hidden'
	      this.widgets[i].isHidden = true
	    }
	  }
	, isHidden: true
	})

	module.exports = SplitHiddenDateTimeWidget

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var time = __webpack_require__(14)

	var locales = __webpack_require__(13)

	var BaseTemporalField = __webpack_require__(18)
	var TimeInput = __webpack_require__(123)

	/**
	 * Validates that its input is a time.
	 * @constructor
	 * @extends {BaseTemporalField}
	 * @param {Object=} kwargs
	 */
	var TimeField = BaseTemporalField.extend({
	  widget: TimeInput
	, inputFormatType: 'TIME_INPUT_FORMATS'
	, defaultErrorMessages: {
	    invalid: 'Enter a valid time.'
	  }

	, constructor: function TimeField(kwargs) {
	    if (!(this instanceof TimeField)) { return new TimeField(kwargs) }
	    BaseTemporalField.call(this, kwargs)
	  }
	})

	/**
	 * Validates that the input can be converted to a time.
	 * @param {?(string|Date)} value user input.
	 * @return {?Date} a Date with its hour, minute and second attributes set, or
	 *   null for empty values when they are allowed.
	 * @throws {ValidationError} if the input is invalid.
	 */
	TimeField.prototype.toJavaScript = function(value) {
	  if (this.isEmptyValue(value)) {
	    return null
	  }
	  if (value instanceof Date) {
	    return new Date(1900, 0, 1, value.getHours(), value.getMinutes(), value.getSeconds())
	  }
	  return BaseTemporalField.prototype.toJavaScript.call(this, value)
	}

	/**
	 * Creates a Date representing a time from the given input if it's valid based
	 * on the format.
	 * @param {string} value
	 * @param {string} format
	 * @return {Date}
	 */
	TimeField.prototype.strpdate = function(value, format) {
	  var t = time.strptime(value, format, locales.getDefaultLocale())
	  return new Date(1900, 0, 1, t[3], t[4], t[5])
	}

	module.exports = TimeField

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(6)

	var ChoiceField = __webpack_require__(77)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * A ChoiceField which returns a value coerced by some provided function.
	 * @constructor
	 * @extends {ChoiceField}
	 * @param {Object=} kwargs
	 */
	var TypedChoiceField = ChoiceField.extend({
	  constructor: function TypedChoiceField(kwargs) {
	    if (!(this instanceof TypedChoiceField)) { return new TypedChoiceField(kwargs) }
	    kwargs = object.extend({
	      coerce: function(val) { return val }, emptyValue: ''
	    }, kwargs)
	    this.coerce = object.pop(kwargs, 'coerce')
	    this.emptyValue = object.pop(kwargs, 'emptyValue')
	    ChoiceField.call(this, kwargs)
	  }
	})

	/**
	 * Validate that the value can be coerced to the right type (if not empty).
	 */
	TypedChoiceField.prototype._coerce = function(value) {
	  if (value === this.emptyValue || this.isEmptyValue(value)) {
	    return this.emptyValue
	  }
	  try {
	    value = this.coerce(value)
	  }
	  catch (e) {
	    throw ValidationError(this.errorMessages.invalidChoice, {
	      code: 'invalidChoice'
	    , params: {value: value}
	    })
	  }
	  return value
	}

	TypedChoiceField.prototype.clean = function(value) {
	  value = ChoiceField.prototype.clean.call(this, value)
	  return this._coerce(value)
	}


	module.exports = TypedChoiceField

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(5)
	var object = __webpack_require__(6)
	var MultipleChoiceField = __webpack_require__(108)

	var $__0=  __webpack_require__(2),ValidationError=$__0.ValidationError

	/**
	 * A MultipleChoiceField which returns values coerced by some provided function.
	 * @constructor
	 * @extends {MultipleChoiceField}
	 * @param {Object=} kwargs
	 */
	var TypedMultipleChoiceField = MultipleChoiceField.extend({
	  constructor: function TypedMultipleChoiceField(kwargs) {
	    if (!(this instanceof TypedMultipleChoiceField)) { return new TypedMultipleChoiceField(kwargs) }
	    kwargs = object.extend({
	      coerce: function(val) { return val }, emptyValue: []
	    }, kwargs)
	    this.coerce = object.pop(kwargs, 'coerce')
	    this.emptyValue = object.pop(kwargs, 'emptyValue')
	    MultipleChoiceField.call(this, kwargs)
	  }
	})

	TypedMultipleChoiceField.prototype._coerce = function(value) {
	  if (value === this.emptyValue || this.isEmptyValue(value) ||
	      (is.Array(value) && !value.length)) {
	    return this.emptyValue
	  }
	  var newValue = []
	  for (var i = 0, l = value.length; i < l; i++) {
	    try {
	      newValue.push(this.coerce(value[i]))
	    }
	    catch (e) {
	      throw ValidationError(this.errorMessages.invalidChoice, {
	        code: 'invalidChoice'
	      , params: {value: value[i]}
	      })
	    }
	  }
	  return newValue
	}

	TypedMultipleChoiceField.prototype.clean = function(value) {
	  value = MultipleChoiceField.prototype.clean.call(this, value)
	  return this._coerce(value)
	}

	TypedMultipleChoiceField.prototype.validate = function(value) {
	  if (value !== this.emptyValue || (is.Array(value) && value.length)) {
	    MultipleChoiceField.prototype.validate.call(this, value)
	  }
	  else if (this.required) {
	    throw ValidationError(this.errorMessages.required, {code: 'required'})
	  }
	}

	module.exports = TypedMultipleChoiceField

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var url = __webpack_require__(9)

	var CharField = __webpack_require__(66)
	var URLInput = __webpack_require__(129)

	var $__0=  __webpack_require__(2),URLValidator=$__0.URLValidator
	var $__1=  __webpack_require__(15),strip=$__1.strip

	/**
	 * Validates that its input appears to be a valid URL.
	 * @constructor
	 * @extends {CharField}
	 * @param {Object=} kwargs
	 */
	var URLField = CharField.extend({
	  widget: URLInput
	, defaultErrorMessages: {
	    invalid: 'Enter a valid URL.'
	  }
	, defaultValidators: [URLValidator()]

	, constructor: function URLField(kwargs) {
	    if (!(this instanceof URLField)) { return new URLField(kwargs) }
	    CharField.call(this, kwargs)
	  }
	})

	URLField.prototype.toJavaScript = function(value) {
	  if (value) {
	    var urlFields = url.parseUri(value)
	    if (!urlFields.protocol) {
	      // If no URL protocol given, assume http://
	      urlFields.protocol = 'http'
	    }
	    if (!urlFields.path) {
	      // The path portion may need to be added before query params
	      urlFields.path = '/'
	    }
	    value = url.makeUri(urlFields)
	  }
	  return CharField.prototype.toJavaScript.call(this, value)
	}

	URLField.prototype.clean = function(value) {
	  value = strip(this.toJavaScript(value))
	  return CharField.prototype.clean.call(this, value)
	}

	module.exports = URLField

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TextInput = __webpack_require__(61)

	/**
	 * An HTML <input type="url"> widget.
	 * @constructor
	 * @extends {TextInput}
	 * @param {Object=} kwargs
	 */
	var URLInput = TextInput.extend({
	  constructor: function URLInput(kwargs) {
	    if (!(this instanceof URLInput)) { return new URLInput(kwargs) }
	    TextInput.call(this, kwargs)
	  }
	, inputType: 'url'
	})

	module.exports = URLInput

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var forms = __webpack_require__(1);
	var BootstrapForm = __webpack_require__(131);

	/* Forms Locale*/
	forms.addLocale('es', {
	  b: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	  B: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	  DATE_INPUT_FORMATS: ['%d/%m/%Y', '%d/%m/%y', '%d %b %Y', '%d %b %y', '%d %B %Y', '%d %B %y',, '%m/%d/%Y'],
	  DATETIME_INPUT_FORMATS: ['%d/%m/%Y %H:%M:%S', '%d/%m/%Y %H:%M', '%d/%m/%Y', '%m/%d/%Y', '%Y/%m/%d', '%H:%M']
	});

	forms.setDefaultLocale('es');

	/* We are selecting the step of the process by means of the id, and in the case of the 3rd step
	we took advantage of the id_nesting */

	var Header = React.createClass({
	  displayName: 'Header',

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'header-booking' },
	      React.createElement(
	        'div',
	        { className: 'container' },
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement('img', { className: 'img-responsive checkout-logo', alt: 'File logo', src: '/static/images/index/logo-y-nombre.png' })
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-5 col-md-offset-2' },
	            React.createElement(
	              'div',
	              { className: 'checkout-col' },
	              React.createElement('i', { className: 'fa fa-user fa-2x checkout-icon', 'aria-hidden': 'true' }),
	              React.createElement(
	                'p',
	                { className: 'checkout-text' },
	                '1.Contacto'
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'checkout-col' },
	              React.createElement('i', { className: 'fa fa-long-arrow-right fa-2x checkout-icon arrow', 'aria-hidden': 'true', id: this.props.stepid })
	            ),
	            React.createElement(
	              'div',
	              { className: 'checkout-col' },
	              React.createElement('i', { className: 'fa fa-paw fa-2x checkout-icon', 'aria-hidden': 'true', id: this.props.stepid }),
	              React.createElement(
	                'p',
	                { className: 'checkout-text', id: this.props.stepid },
	                '2.Mascota'
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'checkout-col select' },
	              React.createElement('i', { className: 'fa fa-long-arrow-right fa-2x checkout-icon arrow', 'aria-hidden': 'true', id: this.props.stepid })
	            ),
	            React.createElement(
	              'div',
	              { className: 'checkout-col select' },
	              React.createElement('i', { className: 'fa fa-credit-card fa-2x checkout-icon', 'aria-hidden': 'true', id: this.props.stepid }),
	              React.createElement(
	                'p',
	                { className: 'checkout-text', id: this.props.stepid },
	                '3.Pago'
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	});

	var PaymentForm = forms.Form.extend({
	  card_name: forms.CharField({ label: 'Nombre del titular:', required: true }),
	  card_number: forms.CharField({ label: 'Número Tarjeta:', required: true }),
	  exp_date: forms.DateTimeField({ label: 'Fecha Caducidad:', required: true, widget: forms.DateInput({ format: '%M/%Y' }) }),
	  csv: forms.CharField({ label: 'CSV:', required: true })

	});

	/* function renderField(bf) {
	  var className = 'form-field'
	    return <div className={className}>
	      {bf.labelTag()} {bf.render()}
	      {bf.helpTextTag()} {bf.errors().render()}
	    </div>
	  } */

	var BookingForm = forms.Form.extend({
	  booking_date: forms.DateTimeField({ label: 'Fecha de la cita:', requiered: true, custom: 'readonly', requiered: true, errorMessages: { required: 'Rellena este campo porfavor.' } }),
	  booking_hour: forms.DateTimeField({ label: 'Hora de la cita:', custom: 'readonly', requiered: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  phone_number: forms.CharField({ label: 'Número de teléfono:', requiered: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  email: forms.EmailField({ label: 'Email:', requiered: true, errorMessages: { invalid: 'Porfavor introduce un email válido.', required: 'Rellena éste campo porfavor.' } }),
	  first_name: forms.CharField({ label: 'Nombre:', requiered: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  second_name: forms.CharField({ label: 'Apellido:', requiered: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  adress: forms.CharField({ label: 'Dirección:', requiered: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  city: forms.CharField({ label: 'Ciudad:', requiered: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  acceptTerms: forms.BooleanField({ label: 'Acepto los términos de usuario:', required: true, errorMessages: { required: 'Es necesario aceptar los términos de usuario para seguir con el proceso.' } })

	});

	var SPECIES = [['cat', 'Gato'], ['dog', 'Perro'], ['other', 'Otro']];
	var GENDER = [['hembra_normal', 'Hembra Normal'], ['hembra_esterilizada', 'Hembra Esterilizada'], ['macho_normal', 'Macho Normal'], ['macho_esterilizado', 'Macho Esterilizado']];
	/* var BigForm = forms.Form.extend({
	  booking_date: forms.CharField({label: 'Fecha de la cita:', requiered: true, custom: 'readonly', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'} }),
	  booking_hour: forms.CharField({label:'Hora de la cita:', custom: 'readonly', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
	  phone_number: forms.CharField({label: 'Número de teléfono:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
	  email: forms.EmailField({label: 'Email:', requiered: true, errorMessages: {invalid: 'Porfavor introduce un email válido.', required:'Rellena éste campo porfavor.'}}),
	  first_name: forms.CharField({label: 'Nombre:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
	  second_name: forms.CharField({label: 'Apellido:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
	  adress: forms.CharField({label: 'Dirección:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
	  city: forms.CharField({label: 'Ciudad:', requiered: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
	  acceptTerms: forms.BooleanField({label: 'Acepto los términos de usuario:', required: true, errorMessages: {required:'Es necesario aceptar los términos de usuario para seguir con el proceso.'}}),
	  pet_name: forms.CharField({label: 'Nombre de la mascota:', required: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
	  pet_birthday: forms.CharField({label: 'Edad (Años):', required: true, errorMessages: {required:'Rellena éste campo porfavor.'}}),
	  pet_species: forms.ChoiceField({required: true, label: 'Especie:', choices: SPECIES, errorMessages: {required:'Rellena éste campo porfavor.'}}),
	  pet_gender: forms.ChoiceField({required: true, choices: GENDER, label: 'Sexo de la mascota:', errorMessages: {required:'Selecciona una de las opciones porfavor.'}}),
	  pet_breed: forms.CharField({label: 'Raza:', required: true, errorMessages: {required:'Selecciona una de las opciones porfavor.'}}),

	}) */

	var NewPetForm = forms.Form.extend({
	  pet_name: forms.CharField({ label: 'Nombre de la mascota:', required: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  pet_birthday: forms.CharField({ label: 'Edad (Años):', required: true, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  pet_species: forms.ChoiceField({ required: true, label: 'Especie:', choices: SPECIES, errorMessages: { required: 'Rellena éste campo porfavor.' } }),
	  pet_gender: forms.ChoiceField({ required: true, choices: GENDER, label: 'Sexo de la mascota:', errorMessages: { required: 'Selecciona una de las opciones porfavor.' } }),
	  pet_breed: forms.CharField({ label: 'Raza:', required: true, errorMessages: { required: 'Selecciona una de las opciones porfavor.' } })
	});

	var Payment = React.createClass({
	  displayName: 'Payment',

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'col-md-5 col-md-offset-1 checkout-form-container' },
	      React.createElement(
	        'p',
	        { className: 'form-title' },
	        'Datos de pago'
	      ),
	      React.createElement(
	        'p',
	        { className: 'form-sub' },
	        'Estás a punto de completar el pago'
	      ),
	      React.createElement(
	        forms.RenderForm,
	        { form: PaymentForm, ref: 'paymentForm' },
	        React.createElement(BootstrapForm, null)
	      ),
	      React.createElement(
	        'button',
	        { className: 'btn-cta-green' },
	        'Pagar'
	      )
	    );
	  },
	  //Esta funcion que hace?
	  onSignup: function (cleanedData) {
	    console.log('on isgnup');
	    //Handle payment right here with the tpv
	  },
	  _onSubmit: function (e) {
	    e.preventDefault();
	    var form = this.refs.paymentForm.getForm();
	    //console.log(form.cleanedData)
	    $.ajax({
	      url: "http://localhost:8000/checkout/", // the endpoint
	      type: "POST", // http method
	      data: { data: form.cleanedData }, // data sent with the post request

	      // handle a successful response
	      success: function (json) {
	        $('#post-text').val(''); // remove the value from the input
	        //   console.log(json); // log the returned json to the console
	        console.log("success"); // another sanity check
	      },

	      // handle a non-successful response
	      error: function (xhr, errmsg, err) {
	        $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg + " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
	        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
	      }
	    });
	    var isValid = form.validate();
	    if (isValid) {
	      this.onSignup(form.cleanedData);
	      this.props.nextStep();
	    }
	  }
	});

	//Loads the booking form
	var Booking = React.createClass({
	  displayName: 'Booking',

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'col-md-7 checkout-form-container' },
	      React.createElement(
	        'p',
	        { className: 'form-title' },
	        'Reserve su cita'
	      ),
	      React.createElement(
	        'p',
	        { className: 'form-sub' },
	        'Facilítenos alguna información básica porfavor'
	      ),
	      React.createElement(
	        'form',
	        { onSubmit: this._onSubmit, onChange: this.onFormChange },
	        React.createElement(
	          forms.RenderForm,
	          { form: BookingForm, component: 'ul',
	            rowComponent: 'li',
	            autoId: true, ref: 'bookingForm' },
	          React.createElement(BootstrapForm, null)
	        ),
	        React.createElement(
	          'button',
	          { className: 'btn-cta-green' },
	          'Guardar y continuar'
	        )
	      )
	    );
	  },

	  /* var Booking = React.createClass({
	     render: function() {
	       return <div class="col-md-7 checkout-form-container">
	                 <p class="form-title" >Reserve su cita</p>
	                 <p class="form-sub" >Facilítenos alguna información básica porfavor</p>
	                   <form onSubmit={this._onSubmit} onChange={this.onFormChange}>
	                     {this.props.booking_form.boundFields().map(renderField)}
	                     <BootstrapForm/>
	                     <div>
	                     <input type="submit" value="Submit"/>{' '}
	                     </div>
	                   <button class="btn-cta-green">Guardar y continuar</button>
	                 </form>
	               </div>
	     }, */

	  renderDateSelectWidget: function () {
	    $.datetimepicker.setLocale('es');
	    $('#booking_date').datetimepicker({
	      timepicker: false,
	      //  minDate:'-1970/01/0', //yesterday is minimum date(for today use 0 or -1970/01/01)
	      format: 'm/d/Y',
	      lang: 'es'
	    });
	    $('#booking_hour').datetimepicker({
	      datepicker: false,
	      format: 'H:i',
	      lang: 'es',
	      allowTimes: ['8:00', '8:15', '8:30', '8:45', '9:00', '9:15', '9:30', '9:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45']
	    });
	  },
	  componentDidMount: function () {
	    this.renderDateSelectWidget();
	  },
	  onSignup: function (cleanedData) {
	    console.log('on isgnup');
	  },
	  propTypes: {
	    onSignup: React.PropTypes.func.isRequired
	  },
	  _onSubmit: function (e) {
	    e.preventDefault();
	    var form = this.refs.bookingForm.getForm();
	    $.ajax({
	      url: "http://localhost:8000/checkout/", // the endpoint
	      type: "POST", // http method
	      data: { data: form.cleanedData }, // data sent with the post request

	      // handle a successful response
	      success: function (json) {
	        $('#post-text').val(''); // remove the value from the input
	        //   console.log(json); // log the returned json to the console
	        console.log("success"); // another sanity check
	      },

	      // handle a non-successful response
	      error: function (xhr, errmsg, err) {
	        $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg + " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
	        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
	      }
	    });
	    var isValid = form.validate();
	    if (isValid) {
	      this.onSignup(form.cleanedData);
	      this.props.updateContactFormParams(form.cleanedData);
	      this.props.nextStep();
	    }
	  }
	});

	/* Renders the pet form */
	var NewPet = React.createClass({
	  displayName: 'NewPet',

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'col-md-7 checkout-form-container' },
	      React.createElement(
	        'p',
	        { className: 'form-title' },
	        'Registre a su mascota'
	      ),
	      React.createElement(
	        'p',
	        { className: 'form-sub' },
	        'Nos preocupamos por su amigo peludo'
	      ),
	      React.createElement(
	        'form',
	        { onSubmit: this._onSubmit, onChange: this.onFormChange },
	        React.createElement(
	          forms.RenderForm,
	          { form: NewPetForm, ref: 'newPetForm' },
	          React.createElement(BootstrapForm, null)
	        ),
	        React.createElement(
	          'button',
	          { className: 'btn-cta-green' },
	          'Guardar y continuar'
	        )
	      )
	    );
	  },
	  onSignup: function (cleanedData) {
	    console.log('on isgnup');
	  },
	  propTypes: {
	    onSignup: React.PropTypes.func.isRequired
	  },
	  _onSubmit: function (e) {
	    e.preventDefault();
	    var form = this.refs.newPetForm.getForm();
	    console.log(form);
	    $.ajax({
	      url: "http://localhost:8000/checkout/", // the endpoint
	      type: "POST", // http method
	      data: { data: form.cleanedData }, // data sent with the post request

	      // handle a successful response
	      success: function (json) {
	        $('#post-text').val(''); // remove the value from the input
	        //   console.log(json); // log the returned json to the console
	        console.log("success"); // another sanity check
	      },

	      // handle a non-successful response
	      error: function (xhr, errmsg, err) {
	        $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg + " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
	        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
	      }
	    });
	    var isValid = form.validate();
	    if (isValid) {
	      this.onSignup(form.cleanedData);
	      this.props.updatePetFormParams(form.cleanedData);
	      this.props.nextStep();
	    }
	  }
	});

	/* Shows the status of the payment process */
	var ProgressColumn = React.createClass({
	  displayName: 'ProgressColumn',

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'col-md-3 col-progress col-md-offset-1' },
	      React.createElement(
	        'h3',
	        null,
	        'Resumen:'
	      ),
	      React.createElement(
	        'h4',
	        { className: 'title' },
	        'Datos de la cita'
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.date
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.city
	      ),
	      React.createElement(
	        'h4',
	        { className: 'title' },
	        'Contacto'
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.email
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.phone_number
	      ),
	      React.createElement(
	        'h4',
	        { className: 'title' },
	        'Mascota'
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.pet_name
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.pet_breed
	      ),
	      React.createElement(
	        'h4',
	        { className: 'title' },
	        'Pago'
	      ),
	      React.createElement(
	        'h4',
	        null,
	        this.props.payment_status
	      )
	    );
	  }
	});
	var bigform = [{ step: 1, step_id: 'step1', city: ' ', acceptTerms: 'False', booking_date: 'Incompleto', phone_number: 'Incompleto',
	  email: '', first_name: 'Nombre', second_name: 'Apellidos', adress: 'Dirección', pet_name: 'Incompleto', pet_birthday: 'Fecha nacimiento mascota',
	  pet_species: 'Gato', pet_gender: 'Hembra normal', pet_breed: '' }];
	/* PARENT TO ALL THE ELEMENTS OF THE APP*/
	var CheckoutContainer = React.createClass({
	  displayName: 'CheckoutContainer',

	  getInitialState: function () {
	    return {
	      step: 1,
	      step_id: 'step1',
	      //Step 1
	      city: ' ',
	      acceptTerms: 'False',
	      booking_date: 'Incompleto',
	      phone_number: 'Incompleto',
	      email: '',
	      first_name: 'Nombre',
	      second_name: 'Apellidos',
	      adress: 'Dirección',
	      //Step 2
	      pet_name: 'Incompleto',
	      pet_birthday: 'Fecha nacimiento mascota',
	      pet_species: 'Gato',
	      pet_gender: 'Hembra normal',
	      pet_breed: '',
	      payment_status: 'Incompleto'
	    };
	  },

	  //    booking_form: new BookingForm,
	  // Updates Contact Form Parameters
	  updateContactFormParams: function (form_params) {
	    this.setState({
	      city: form_params.city,
	      acceptTerms: form_params.acceptTerms,
	      booking_date: form_params.booking_date,
	      phone_number: form_params.phone_number,
	      email: form_params.email,
	      first_name: form_params.first_name,
	      second_name: form_params.second_name,
	      adress: form_params.adress
	    });
	  },

	  // Updates Pet Form Parameters
	  updatePetFormParams: function (form_params) {
	    this.setState({
	      pet_name: form_params.pet_name,
	      pet_birthday: form_params.pet_birthday,
	      pet_species: form_params.pet_species,
	      pet_gender: form_params.pet_gender,
	      pet_breed: form_params.pet_breed
	    });
	  },

	  // Increases the state counter in 1
	  nextStep: function () {
	    this.setState({
	      step: this.state.step + 1,
	      step_id: 'step' + this.state.step
	    });
	  },

	  //Decreases the state counter in 1
	  previousStep: function () {
	    this.setState({
	      step: this.state.step - 1
	    });
	  },

	  render: function () {
	    switch (this.state.step) {
	      case 1:
	        return React.createElement(
	          'div',
	          { className: 'container' },
	          React.createElement(Header, { stepid: this.state.step_id }),
	          React.createElement(
	            'div',
	            { className: 'container' },
	            React.createElement(
	              'div',
	              { className: 'row' },
	              React.createElement(Booking, {
	                nextStep: this.nextStep,
	                form_params: this.state.form_params,
	                updateContactFormParams: this.updateContactFormParams,
	                step: this.state.step
	                //   booking_form={this.state.booking_form}
	              }),
	              React.createElement(ProgressColumn, {
	                city: this.state.city,
	                date: this.state.booking_date,
	                payment_status: this.state.payment_status,
	                email: this.state.email,
	                phone_number: this.state.phone_number,
	                pet_name: this.state.pet_name,
	                pet_breed: this.state.pet_breed
	              })
	            )
	          )
	        );

	      case 2:
	        return React.createElement(
	          'div',
	          { className: 'container' },
	          React.createElement(Header, { stepid: this.state.step_id }),
	          React.createElement(
	            'div',
	            { className: 'row' },
	            React.createElement(NewPet, {
	              nextStep: this.nextStep,
	              updatePetFormParams: this.updatePetFormParams,
	              step: this.state.step
	            }),
	            React.createElement(ProgressColumn, {
	              city: this.state.city,
	              date: this.state.booking_date,
	              payment_status: this.state.payment_status,
	              email: this.state.email,
	              phone_number: this.state.phone_number,
	              pet_name: this.state.pet_name,
	              pet_breed: this.state.pet_breed
	            })
	          )
	        );
	      case 3:
	        return React.createElement(
	          'div',
	          { className: 'container' },
	          React.createElement(Header, null),
	          React.createElement(
	            'div',
	            { className: 'row' },
	            React.createElement(Payment, { nextStep: this.nextStep
	            }),
	            React.createElement(ProgressColumn, {
	              city: this.state.city,
	              date: this.state.booking_date,
	              payment_status: this.state.payment_status,
	              email: this.state.email,
	              phone_number: this.state.phone_number,
	              pet_name: this.state.pet_name,
	              pet_breed: this.state.pet_breed
	            })
	          )
	        );
	    }
	  }
	});

	ReactDOM.render(React.createElement(CheckoutContainer, null), document.getElementById('container-checkout'));

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var React = __webpack_require__(23)

	var $__0=
	     
	     
	      
	  __webpack_require__(1),BooleanField=$__0.BooleanField,BoundField=$__0.BoundField,CheckboxChoiceInput=$__0.CheckboxChoiceInput,CheckboxFieldRenderer=$__0.CheckboxFieldRenderer,CheckboxSelectMultiple=$__0.CheckboxSelectMultiple,ChoiceFieldRenderer=$__0.ChoiceFieldRenderer,FileField=$__0.FileField,Form=$__0.Form,MultiValueField=$__0.MultiValueField,MultiWidget=$__0.MultiWidget,RadioChoiceInput=$__0.RadioChoiceInput,RadioFieldRenderer=$__0.RadioFieldRenderer,RadioSelect=$__0.RadioSelect

	var SPINNER = 'data:image/gif;base64,R0lGODlhDgAOANU%2FAJ2rtf39%2FfL09a65wvX2993i5qq2v9Ta35CgrLjCyuTo6%2Bfq7aGvub3Hzs7V2vX3%2BI6eq9rf47rEzOvu8NLZ3ens7u7w8sDJ0ODl6MfP1aazvYqbqNDX3Pr7%2FLW%2Fx4iZpomap%2BPn6vHz9Y2dqqSxu%2FT19%2Bjr7tfd4dvg5KOwuvj5%2BeLm6ae0vd%2Fk5%2Fj5%2BvHz9Nbc4Nbc4Y2dqff4%2Bebp7NXb3%2FDy9Iqbp%2BXp7Pv8%2FL%2FIz%2Fn6%2B7nDy%2FDy84%2Bfq%2F%2F%2F%2FyH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FwtYTVAgRGF0YVhNUDw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNzA4MjZFM0EyRUExMUUzQjE2OUQwNUQ1MzZBQ0M2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNzA4MjZFNEEyRUExMUUzQjE2OUQwNUQ1MzZBQ0M2NyI%2BIDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk2NDkzOTlDQTJBOTExRTNCMTY5RDA1RDUzNkFDQzY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI3MDgyNkUyQTJFQTExRTNCMTY5RDA1RDUzNkFDQzY3Ii8%2BIDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY%2BIDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8%2BAf%2F%2B%2Ffz7%2Bvn49%2Fb19PPy8fDv7u3s6%2Brp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M%2FOzczLysnIx8bFxMPCwcC%2Fvr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ%2BenZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8%2BPTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEBQMAPwAsAAAAAA4ADgAABhTAn3BILBqPyKRyyWw6n9CodGoMAgAh%2BQQFAwA%2FACwHAAAAAQADAAAGBcCOrRMEACH5BAUDAD8ALAcAAAABAAMAAAYFwNKhFAQAIfkEBQMAPwAsBwAAAAEAAwAABgXABQkXBAAh%2BQQFAwA%2FACwHAAAAAgADAAAGB8DQ7FOLPYIAIfkEBQMAPwAsBwAAAAMAAwAABgrAX%2Bn3%2B0xOmV8QACH5BAUDAD8ALAcAAAAEAAMAAAYLQMxvOCSJfjpNIAgAIfkEBQMAPwAsBwAAAAUABAAABg%2FA0G9I%2FCmGDR%2BoMiRQfkEAIfkEBQMAPwAsBwAAAAYABQAABhNAzG9IHIaGNcnQQXwwPotm7RcEACH5BAUDAD8ALAcAAAAHAAYAAAYVwNVvSCwSTw3ExzgECYkEBMOYMXSCACH5BAUDAD8ALAcAAAAHAAgAAAYcwNBvSCQqij8fiFMkDIXIFPLyERRRn1axl1gEAQAh%2BQQFAwA%2FACwLAAcAAwADAAAGCsDIB3P5CFCeXxAAIfkEBQMAPwAsCgAHAAQABQAABhHAn7Al%2FIkeiNTP8An9MA5hEAAh%2BQQFAwA%2FACwIAAMABgAKAAAGHMCf8LcaGo9II%2BpXOL6MDCGBASrWEKBhjRQaBgEAIfkEBQMAPwAsBgAAAAgADgAABirA3%2BRHLP4YxJCxYGw6i4%2BndEpsPQVGwi%2F1VE5ODd%2BPQxx8Pj9FsRIqNYMAIfkECQMAPwAsAwAAAAkADgAABiLAn%2FA3Gxp%2FjuNw8kMgldAhIUqtWq%2FKC692DLA%2BHyhhdQwCACH5BAkDAD8ALAAAAAAOAA4AAAZGwJ9wKOwQj0QGKYQ8XnwgR5NIYHymxAeCgR1efqLuDyUWkstfYgBJQBAdgPCwCiLWQBAJ7NSAco4VBh%2BDHyQKUw8KISVHQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGUcCfcEgsGn%2BBQehItCBADubwwQCtpMIHgoEVXj6vLupTEH9aP1OE%2BRX8DCORkYBICU0bgHtIqC6FNRsQEicnDT4gHEULGh%2BOHyQKTA8hISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGVsCfcEgsGoe9Y1EBciiHDwYI8xSWEIyqUPexBVQBZeRTWHwoStSn5QIllJeP4GeQvYwEREpY2QBERARSIUMwGyMSMScNPiAcRSYsH5MfJApKDwohJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZRwJ9wSCwaj8ghLTl0gFbMHwGR%2Bs0GCuTlI8B9DkjUp7X4UMJjFyih5f4MspdxWv1VNgARkcAAhYYwGyMSMScNPiAcRSYsH44fJFlHDwohJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZVwJ9wSCwaj8gjIZBk%2FlgaZCb1m30kSN3HhvvUkJFPYfGhIFGflguUQF4%2Bgp9B9jISENRfZQMQEQkMICFDMBsjEjEnDT4gHEUmLB%2BSHyQKSA8KISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGUcCfcEgsGo%2FCCZJo2nCWQsNIBHWBeEvLjvY5IAuf1uJDQaLC1gTy8hH8DLKXkYBICSsbAHVIYIBCQzAbIxIxJw0%2BIE9MLB%2BOHyQKSA8KISVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGU8CfcEgsCnNGYw3gSg5NG0DJKWSNetTf7JPI%2FhQfincRdgoUOReom7x8BD%2BD7GV8IBjCSlREJDA%2BIUMwGyMSMScNPiAORSYsH5AfKYFJDwohU0RBACH5BAkDAD8ALAAAAAAOAA4AAAZPwJ9wSCwKFyhjsXYDKIemDUDwFLJG1Orsw6sKcZ%2BD97f4UMYuUGL8M8hexkemI6xIRcQHA7QawjYjEjE1Ej4gDkUmLB%2BMHyQhTw8KGCVFQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGSsCfcEgsChcajJFY20BOS6FpAxBEhYaR6PqbfXjcH%2B5zCC8%2BlLALlAj%2FDLJXuELdDh%2BBImwzksRODQgNRiYsH4cfJCFRDworJUVBACH5BAkDAD8ALAAAAAAOAA4AAAZGwJ9Q2BkajQsN4nisbUaSAFNougEE06FhJMoKZyCeV0j7HMa%2FxYeCdoES6J9B9kJXNoDuGPaUxGA2WSYsH4UZYw8KGARHQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGPMCfUPhQDY%2FDBetzQB5rN4hk4hRWNgBBdWgYibZCFYgHFtKY5d%2B5WRaT091v%2BQqQg6HSV1n5MaV%2FDwFVQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGPMCfUPiwDI%2FDBetjQB5rG4ik5RSaNgBRdWgYabc%2FF4gHFtI%2Bh%2FIP96GoZ5%2BE%2Bsca9dQLrEBdA6HmRnNqQQAh%2BQQJAwA%2FACwAAAAADgAOAAAGN8CfUPgwDY9DE%2BvjQx5jm5Ek4hSaNgBRdWiQvbZCF4gHFtI%2Bh%2FIPh1bPPmS1YURQmxzqvH4%2FDAIAIfkECQMAPwAsAAAAAA4ADgAABjXAn1D4UASGSKGJ9fmokkPYZiSJHaGmDUAERRpkr%2B7QBeKJh4sP5SzEfWrs38yziNvv%2BLw%2BCAAh%2BQQJAwA%2FACwAAAAADgAOAAAGL8CfUPhQBIZIoYn1%2BaiSQ9hmJIkdoaYNQARFGmTcrlAF4omHFhLqzG673%2FC4%2FBwEACH5BAkDAD8ALAAAAAAOAA4AAAYqwJ9Q%2BAgFhkjhQvP5qJLD2gYiOR2hpg1AAEUaRqIu8rESm8%2FotHrNbrODACH5BAkDAD8ALAAAAAAOAA4AAAYowJ9QSFgFhkghTfP5qJLD2g3Cqx2hOQDABk3uSt2weEwum8%2FotBoZBAAh%2BQQJAwA%2FACwAAAAADgAOAAAGI8CfUEgIBYZI4ULz%2BaiSwx1iJDkdoUKTCMvter%2FgsHhMLpeDACH5BAkDAD8ALAAAAAAOAA4AAAYgwJ9QSFgFhkihSvP5qJLJAe9whFqv2Kx2y%2B16v%2BDwMAgAIfkECQMAPwAsAAAAAA4ADgAABh7An1BICAWGyKHl81Eln5nT8UmtWq%2FYrHbL7Xq%2FwyAAIfkECQMAPwAsAAAAAA4ADgAABh3An1D4WAWGSCTno0o6S7Wjc0qtWq%2FYrHbL7XqHQQAh%2BQQFAwA%2FACwAAAAADgAOAAAGGsCfcIgLDI9IgArJ%2FBWb0Kh0Sq1ar9isVhoEACH5BAUDAD8ALAYAAAABAAMAAAYFQAFHEAQAIfkECQMAPwAsBgAAAAEAAwAABgXAnK0TBAAh%2BQQJAwA%2FACwAAAAADgAOAAAGFMCfcEgsGo%2FIpHLJbDqf0Kh0agwCACH5BAUDAD8ALAAAAAAOAA4AAAYUwJ9wSCwaj8ikcslsOp%2FQqHRqDAIAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAIfkEBQMAPwAsAAAAAAEAAQAABgPAXxAAOw%3D%3D'

	var BOOTSTRAP_COLUMN_SIZES = ['xs', 'sm', 'md', 'lg']

	// =================================================================== Utils ===

	var noobj = {}

	var warn = function()  {}

	if ("production" !== process.env.NODE_ENV) {
	  warn = function(message ) {for (var args=[],$__0=1,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
	    var index = 0
	    console.warn('[newforms-bootstrap] Warning: ' + message.replace(/%s/g, function()  {return args[index++];}))
	  }
	}

	var toString = Object.prototype.toString

	function cx(/*[...staticClasses: (string|falsy)[, conditionalClasses: Object.<string, booleanish>]]*/) {
	  var classNames = []
	  var staticClassCount = arguments.length
	  var conditionalClasses = null
	  if (toString.call(arguments[arguments.length - 1]) == '[object Object]') {
	    conditionalClasses = arguments[arguments.length - 1]
	    staticClassCount -= 1
	  }
	  for (var i = 0, l = staticClassCount; i < l; i++) {
	    if (arguments[i]) {
	      classNames.push(arguments[i])
	    }
	  }
	  if (conditionalClasses != null) {
	    Object.keys(conditionalClasses).forEach(function(className)  {
	      if (!!conditionalClasses[className]) {
	        classNames.push(className)
	      }
	    })
	  }
	  return classNames.join(' ')
	}

	function extend(dest, src) {
	  if (src) {
	    var props = Object.keys(src)
	    for (var i = 0, l = props.length; i < l ; i++) {
	      dest[props[i]] = src[props[i]]
	    }
	  }
	  return dest
	}

	function errorMessage(message) {
	  return React.createElement("span", {className: "help-block"}, 
	    React.createElement("span", {className: "glyphicon glyphicon-exclamation-sign"}), " ", message
	  )
	}

	// ============================================== Bootstrap Newforms Objects ===

	function patchForm(form) {
	  if (!form.__patchedByBootstrapForm) {
	    BootstrapForm.patchFields(form)
	    form.__patchedByBootstrapForm = true
	  }
	}

	var BootstrapChoiceFieldRenderer = ChoiceFieldRenderer.extend({
	  className: null,

	  constructor:function(name, value, attrs, controlled, choices) {
	    if (!(this instanceof BootstrapChoiceFieldRenderer)) {
	      return new BootstrapChoiceFieldRenderer(name, value, attrs, controlled, choices)
	    }
	    ChoiceFieldRenderer.call(this, name, value, attrs, controlled, choices)
	  },

	  render:function() {
	    var id = this.attrs.id || null
	    var key = this.attrs.key || null
	    if (key) {
	      delete this.attrs.key
	    }
	    var items = []
	    for (var i = 0, l = this.choices.length; i < l; i++) {
	      var choice = this.choices[i]
	      var $__0=   choice,choiceValue=$__0[0],choiceLabel=$__0[1]
	      if (Array.isArray(choiceLabel)) {
	        var attrsPlus = extend({}, this.attrs)
	        if (id) { attrsPlus.id +='_' + i }
	        if (key) { attrsPlus.key += '_' + i }
	        var subRenderer = BootstrapChoiceFieldRenderer(
	          this.name, this.value, attrsPlus, this.controlled, choiceLabel)
	        subRenderer.choiceInputConstructor = this.choiceInputConstructor
	        subRenderer.className = this.className
	        items.push(React.createElement("li", null, React.createElement("em", {className: "help-block"}, choiceValue), subRenderer.render()))
	      }
	      else {
	        var w = this.choiceInputConstructor(
	          this.name, this.value, extend({}, this.attrs), this.controlled, choice, i)
	        items.push(React.createElement("li", {className: this.className}, w.render()))
	      }
	    }
	    var listAttrs = {className: 'list-unstyled'}
	    if (id) {
	      listAttrs.id = id
	    }
	    return React.createElement("ul", React.__spread({},  listAttrs), items)
	  }
	})

	var BootstrapCheckboxRenderer = BootstrapChoiceFieldRenderer.extend({
	  choiceInputConstructor: CheckboxChoiceInput,
	  className: 'checkbox'
	})

	var BootstrapRadioRenderer = BootstrapChoiceFieldRenderer.extend({
	  choiceInputConstructor: RadioChoiceInput,
	  className: 'radio'
	})

	var BootstrapCheckboxInlineRenderer = CheckboxFieldRenderer.extend({
	  render:function() {
	    return React.createElement("div", {className: "checkbox"}, 
	      this.choiceInputs().map(function(input)  {return React.createElement("label", {className: "checkbox-inline"}, 
	        input.tag(), " ", input.choiceLabel
	      );})
	    )
	  }
	})

	var BootstrapRadioInlineRenderer = RadioFieldRenderer.extend({
	  render:function() {
	    return React.createElement("div", {className: "radio"}, 
	      this.choiceInputs().map(function(input)  {return React.createElement("label", {className: "radio-inline"}, 
	        input.tag(), " ", input.choiceLabel
	      );})
	    )
	  }
	})

	// ========================================================= Form Components ===

	var BootstrapForm = React.createClass({displayName: "BootstrapForm",
	  statics: {
	    patchFields:function(form) {
	      if (form.__patchedByBootstrapForm) { return }
	      var fieldNames = Object.keys(form.fields)
	      for (var i = 0, l = fieldNames.length; i < l ; i++) {
	        var field = form.fields[fieldNames[i]]
	        if (field.widget instanceof CheckboxSelectMultiple) {
	          if (field.widget.renderer === CheckboxFieldRenderer) {
	            field.widget.renderer = BootstrapCheckboxRenderer
	          }
	        }
	        else if (field.widget instanceof RadioSelect) {
	          if (field.widget.renderer === RadioFieldRenderer) {
	            field.widget.renderer = BootstrapRadioRenderer
	          }
	        }
	        else if (field instanceof MultiValueField) {
	          if (field.fields.length < 5 &&
	              field.widget.formatOutput === MultiWidget.prototype.formatOutput) {
	            var colClass = 'col-sm-' + (12 / field.fields.length)
	            field.widget.formatOutput = function(widgets) {
	              return React.createElement("div", {className: "row"}, 
	                widgets.map(function(widget)  {return React.createElement("div", {className: colClass}, widget);})
	              )
	            }
	          }
	        }
	      }
	    }
	  },

	  propTypes: {
	    form: React.PropTypes.instanceOf(Form).isRequired,
	    spinner: React.PropTypes.string
	  },

	  getDefaultProps:function() {
	    return {
	      spinner: SPINNER
	    }
	  },

	  render:function() {
	    patchForm(this.props.form)
	    return React.createElement("div", null, 
	      this.renderRows()
	    )
	  },

	  renderRows:function() {
	    var rows = []
	    var form = this.props.form
	    var formErrors = form.nonFieldErrors()
	    if (formErrors.isPopulated()) {
	      rows.push(React.createElement("div", {key: form.addPrefix('__all__'), className: "alert alert-danger has-error"}, 
	        formErrors.messages().map(errorMessage)
	      ))
	    }
	    rows.push.apply(rows, form.visibleFields().map(function(field) 
	      {return React.createElement(BootstrapField, {key: field.htmlName, field: field, spinner: this.props.spinner});}.bind(this)
	    ))
	    var hiddenFields = form.hiddenFields()
	    if (hiddenFields.length > 0) {
	      rows.push(React.createElement("div", {key: form.addPrefix('__hiddenFields__'), style: {display: 'none'}}, 
	        hiddenFields.map(function(field)  {return field.render();})
	      ))
	    }
	    if (form.nonFieldPending()) {
	      rows.push(React.createElement("span", {key: form.addPrefix('__pending__'), className: "help-block"}, 
	        React.createElement("img", {src: this.props.spinner}), " Validating…"
	      ))
	    }
	    return rows
	  }
	})

	var BootstrapField = React.createClass({displayName: "BootstrapField",
	  propTypes: {
	    field: React.PropTypes.instanceOf(BoundField).isRequired
	  , spinner: React.PropTypes.string
	  },

	  getDefaultProps:function() {
	    return {
	      spinner: SPINNER
	    }
	  },

	  render:function() {
	    var field = this.props.field
	    var status = field.status()
	    var isBooleanField = field.field.constructor === BooleanField
	    var isFileField = field.field instanceof FileField
	    var isSpecialCaseWidget = isBooleanField || isFileField
	    var containerClasses = cx({
	      'checkbox': isBooleanField
	    , 'form-group': !isBooleanField
	    , 'has-error': status == 'error'
	    , 'has-success': status == 'valid'
	    })
	    var widgetAttrs = {attrs: {className: cx({
	      'form-control': !isFileField  &&
	                      !(field.field.widget instanceof RadioSelect) &&
	                      !(field.field.widget instanceof CheckboxSelectMultiple)
	    })}}
	    // Always show help text for empty fields, regardless of status
	    var showHelpText = field.helpText && (field.isEmpty() || status == 'default')

	    return React.createElement("div", {className: containerClasses}, 
	      !isBooleanField && field.labelTag({attrs: {className: 'control-label'}}), 
	      !isSpecialCaseWidget && field.asWidget(widgetAttrs), 
	      isBooleanField && React.createElement("label", {htmlFor: field.idForLabel()}, 
	        field.asWidget(), " ", field.label
	      ), 
	      isFileField && React.createElement("div", null, 
	        field.asWidget(widgetAttrs)
	      ), 
	      showHelpText && field.helpTextTag({attrs: {className: 'help-block'}}), 
	      status == 'pending' && React.createElement("span", {className: "help-block"}, 
	        React.createElement("img", {src: this.props.spinner}), " Validating…"
	      ), 
	      status == 'error' && field.errors().messages().map(errorMessage)
	    )
	  }
	})

	// ========================================================= Grid Components ===

	/**
	 * Validates that a prop is a String or a Number with a value between 1 and 12.
	 */
	function colSizeChecker(props, propName, componentName, location) {
	  var originalValue = props[propName]
	  var value = props[propName]
	  var type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
	  if (value != null) {
	    if (type == 'string') {
	      value = Number(value)
	      type = 'number'
	    }

	    if (type == 'number' && !isNaN(value)) {
	      if (value < 1 || value > 12) {
	        return new Error(
	          ("Invalid " + location + " `" + propName + "` of value `" + value + "` ") +
	          ("supplied to `" + componentName + "`, Bootstrap column sizes must be ") +
	          ("between 1 and 12.")
	        )
	      }
	    }
	    else {
	      return new Error(
	        ("Invalid " + location + " `" + propName + "` of value `" + originalValue + "` ") +
	        ("supplied to `" + componentName + "`, expected a String or a Number.")
	      )
	    }
	  }
	}

	function calculateColumnProps(childProps, options) {
	  // Final column sizing prop object for each child - existing props will be
	  // copied to this object and missing props will be calculated.
	  var colSizeProps = childProps.map(function()  {return {};})
	  var $__0=   options,colProp=$__0.colProp,rowNum=$__0.rowNum

	  var availableCols = 12
	  var needColSizeIndexes = []
	  var offsetProp = (colProp + "Offset")

	  childProps.forEach(function(props, index)  {
	    if (colProp in props) {
	      var colSize = Number(props.md)
	      availableCols -= colSize
	      colSizeProps[index][colProp] = colSize
	    }
	    else {
	      needColSizeIndexes.push(index)
	    }

	    if (offsetProp in props) {
	      var offsetSize = Number(props[offsetProp])
	      availableCols -= offsetSize
	      colSizeProps[index][offsetProp] = offsetSize
	    }
	  })

	  if (needColSizeIndexes.length === 0) {
	    ("production" !== process.env.NODE_ENV ? warn(
	      '[Row %s] All Cols/Fields already have %s column units specified, so ' +
	      'you don\'t need to use autoColumns.',
	      rowNum, colProp
	    ) : null)
	  }
	  else if (availableCols < 0) {
	    ("production" !== process.env.NODE_ENV ? warn(
	      '[Row %s] Too many %s column units specified - widths and offsets ' +
	      'added up to %s.',
	      rowNum, colProp, 12 - availableCols
	    ) : null)
	  }
	  else if (availableCols === 0) {
	    ("production" !== process.env.NODE_ENV ? warn(
	      '[Row %s] There are no %s column units left to distribute to the %s ' +
	      'Cols/Fields which needthem.',
	      rowNum, colProp, needColSizeIndexes.length
	    ) : null)
	  }
	  else if (availableCols < needColSizeIndexes.length) {
	    ("production" !== process.env.NODE_ENV ? warn(
	      '[Row %s] There are more Cols/Fields needing column widths ' +
	      '(%s) than there are %s column units remaining to distribute (%s).',
	      rowNum, needColSizeIndexes.length, colProp, availableCols
	    ) : null)
	  }
	  else {
	    // Distribute remaining columns equally if possible. Otherwise, leftover
	    // column width will be distributed among initial columns.
	    var baseColSize = Math.floor(availableCols / needColSizeIndexes.length)
	    var leftoverCols = availableCols % needColSizeIndexes.length
	    needColSizeIndexes.forEach(function(colIndex, index)  {
	      colSizeProps[colIndex][colProp] = baseColSize + (index < leftoverCols ? 1 : 0)
	    })
	  }

	  return colSizeProps
	}

	var ColMixin = {
	  propTypes: {
	    className: React.PropTypes.string
	  , xs: colSizeChecker
	  , sm: colSizeChecker
	  , md: colSizeChecker
	  , lg: colSizeChecker
	  , xsOffset: colSizeChecker
	  , smOffset: colSizeChecker
	  , mdOffset: colSizeChecker
	  , lgOffset: colSizeChecker
	  },

	  getColClassName:function() {
	    var props = this.props
	    var classNames = {}
	    classNames[("col-xs-" + props.xs)] = !!props.xs
	    classNames[("col-sm-" + props.sm)] = !!props.sm
	    classNames[("col-md-" + props.md)] = !!props.md
	    classNames[("col-lg-" + props.lg)] = !!props.lg
	    classNames[("col-xs-offset-" + props.xsOffset)] = !!props.xsOffset
	    classNames[("col-sm-offset-" + props.smOffset)] = !!props.smOffset
	    classNames[("col-md-offset-" + props.mdOffset)] = !!props.mdOffset
	    classNames[("col-lg-offset-" + props.lgOffset)] = !!props.lgOffset
	    return cx(props.className, classNames)
	  }
	}

	var Container = React.createClass({displayName: "Container",
	  propTypes: {
	    autoColumns: React.PropTypes.oneOf(BOOTSTRAP_COLUMN_SIZES)
	  , className: React.PropTypes.string
	  , fluid: React.PropTypes.bool
	  , spinner: React.PropTypes.string
	  },

	  getDefaultProps:function() {
	    return {
	      autoColumns: null
	    , fluid: false
	    , spinner: SPINNER
	    }
	  },

	  render:function() {
	    var $__0=  this.props,form=$__0.form
	    patchForm(form)
	    var formErrors = form.nonFieldErrors()
	    return React.createElement("div", {className: cx(this.props.className, {'container': !this.props.fluid, 'fluid': this.props.fluid})}, 
	      formErrors.isPopulated() && React.createElement("div", {key: form.addPrefix('__all__'), className: "alert alert-danger has-error"}, 
	        formErrors.messages().map(errorMessage)
	      ), 
	      React.Children.map(this.props.children, function(row, index)  {return React.cloneElement(row, {
	        autoColumns: this.props.autoColumns
	      , form: this.props.form
	      , index: index
	      , spinner: this.props.spinner
	      });}.bind(this)), 
	      form.nonFieldPending() && React.createElement("span", {key: form.addPrefix('__pending__'), className: "help-block"}, 
	        React.createElement("img", {src: this.props.spinner}), " Validating…"
	      )
	    )
	  }
	})

	var Row = React.createClass({displayName: "Row",
	  propTypes: {
	    autoColumns: React.PropTypes.oneOf(BOOTSTRAP_COLUMN_SIZES)
	  , className: React.PropTypes.string
	  },

	  render:function() {
	    var columnProps = noobj
	    if (this.props.autoColumns) {
	      var childProps = []
	      React.Children.forEach(this.props.children, function(child)  {
	        childProps.push(child.props)
	      })
	      columnProps = calculateColumnProps(childProps, {
	        colProp: this.props.autoColumns
	      , rowNum: this.props.index + 1
	      })
	    }
	    return React.createElement("div", {className: cx('row', this.props.className)}, 
	      React.Children.map(this.props.children, function(child, index)  {
	        return React.cloneElement(child, extend({
	          form: this.props.form
	        , spinner: this.props.spinner
	        }, columnProps[index]))
	      }.bind(this))
	    )
	  }
	})

	var Col = React.createClass({displayName: "Col",
	  mixins: [ColMixin],

	  render:function() {
	    return React.createElement("div", {className: this.getColClassName()}, 
	      this.props.children
	    )
	  }
	})

	var Field = React.createClass({displayName: "Field",
	  mixins: [ColMixin],

	  propTypes: {
	    name: React.PropTypes.string.isRequired
	  },

	  render:function() {
	    var field = this.props.form.boundField(this.props.name)
	    return React.createElement("div", {className: this.getColClassName()}, 
	      React.createElement(BootstrapField, {key: field.htmlName, field: field})
	    )
	  }
	})

	extend(BootstrapForm, {
	  calculateColumnProps:calculateColumnProps
	, CheckboxInlineRenderer: BootstrapCheckboxInlineRenderer
	, CheckboxRenderer: BootstrapCheckboxRenderer
	, Col:Col
	, Container:Container
	, Field:Field
	, PropTypes: {
	    colSize: colSizeChecker
	  }
	, RadioInlineRenderer: BootstrapRadioInlineRenderer
	, RadioRenderer: BootstrapRadioRenderer
	, Row:Row
	})

	module.exports = BootstrapForm
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }
/******/ ]);