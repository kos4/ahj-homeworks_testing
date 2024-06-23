/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 750:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./american-express.png": 589,
	"./diners-club.png": 698,
	"./discover.png": 745,
	"./jcb.png": 19,
	"./mastercard.png": 884,
	"./mir.png": 266,
	"./visa.png": 59
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 750;

/***/ }),

/***/ 589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "8d02ee8e1d372e2a5516.png";

/***/ }),

/***/ 698:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "bddb73f9ae7ec1b29c83.png";

/***/ }),

/***/ 745:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "62981e224684a6fe2e1c.png";

/***/ }),

/***/ 19:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "4c00aa99327abe07b23d.png";

/***/ }),

/***/ 884:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d52c11888bd78240ab09.png";

/***/ }),

/***/ 266:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d7ca826c4e475c6a595b.png";

/***/ }),

/***/ 59:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "8e7e7df128ceeaf0cc1e.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/js/components/card-validation/card-list.json
const card_list_namespaceObject = /*#__PURE__*/JSON.parse('[{"name":"mir","image":"mir.png","rule":{"length":"16-19","iin":"2200-2204"}},{"name":"visa","image":"visa.png","rule":{"length":"13,16,19","iin":"4"}},{"name":"mastercard","image":"mastercard.png","rule":{"length":"16","iin":"2221-2720,51-55"}},{"name":"jcb","image":"jcb.png","rule":{"length":"16-19","iin":"3528-3589"}},{"name":"discover","image":"discover.png","rule":{"length":"16-19","iin":"6011,644-649,65,622126-622925"}},{"name":"diners-club","image":"diners-club.png","rule":{"length":"14-19","iin":"36"}},{"name":"american-express","image":"american-express.png","rule":{"length":"15","iin":"34,37"}}]');
;// CONCATENATED MODULE: ./src/js/functions.js
function importAll(r) {
  let images = {};
  r.keys().map(item => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
;// CONCATENATED MODULE: ./src/js/components/card-validation/Validation.js
class Validation {
  constructor(number) {
    this.number = number;
  }
  algorithmLuhn() {
    const input = this.number;
    const number = input.toString();
    const digits = number.replace(/\D/g, "").split("").map(Number);
    let sum = 0;
    let isSecond = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      if (isSecond) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isSecond = !isSecond;
    }
    return sum % 10 === 0;
  }
  checkLength(length) {
    const numberCard = this.number;
    let result = false;
    const rules = this.getRules(length);
    for (const rule of rules) {
      const range = this.getRuleRange(rule);
      if (range) {
        if (numberCard.length >= range[0] && numberCard.length <= range[1]) {
          result = true;
          break;
        }
      } else {
        if (numberCard.length === Number(rule)) {
          result = true;
          break;
        }
      }
    }
    return result;
  }
  getRules(rule) {
    return rule.includes(",") ? rule.split(",") : [rule];
  }
  getRuleRange(rule) {
    if (rule.includes("-")) {
      return rule.split("-").map(Number);
    } else {
      return null;
    }
  }
  checkIin(iin) {
    const numberCard = this.number;
    let result = false;
    const rules = this.getRules(iin);
    for (const rule of rules) {
      const range = this.getRuleRange(rule);
      if (range) {
        const test = Number(numberCard.slice(0, range[0].toString().length));
        if (test >= range[0] && test <= range[1]) {
          result = true;
          break;
        }
      } else {
        if (numberCard.slice(0, rule.length) === rule) {
          result = true;
          break;
        }
      }
    }
    return result;
  }
}
;// CONCATENATED MODULE: ./src/js/components/card-validation/CardValidation.js




const CardValidation_images = importAll(__webpack_require__(750));
class CardValidation {
  constructor(container) {
    this.container = container;
    this.cards = card_list_namespaceObject;
    this.card = undefined;
    this.onSubmit = this.onSubmit.bind(this);
  }
  init() {
    this.container.innerHTML = CardValidation.markup;
    this.bindCardList();
    this.form = this.container.querySelector(CardValidation.form);
    this.valueForm = this.container.querySelector(CardValidation.valueForm);
    this.btnForm = this.container.querySelector(CardValidation.btnForm);
    this.form.addEventListener("submit", this.onSubmit);
  }
  static get form() {
    return ".form";
  }
  static get valueForm() {
    return ".form__input-text";
  }
  static get btnForm() {
    return ".form__btn";
  }
  static get markup() {
    return `
      <div class="validator__container">
        <div class="validator__title">Проверка номера карты</div>
        <form class="form">
          <input type="text" class="form__input-text" placeholder="Введите номер карты">
          <button class="form__btn">Проверить номер карты</button>
        </form>
      </div>
    `;
  }
  renderCardList() {
    const _container = document.createElement("ul");
    _container.classList.add("cards");
    this.cardsList = _container;
    this.cards.forEach(card => {
      const _image = document.createElement("img");
      _image.src = CardValidation_images[card.image];
      _image.alt = card.name;
      _image.className = "cards__card-image";
      const _element = document.createElement("li");
      _element.className = `cards__card cards__card-${card.name}`;
      _element.appendChild(_image);
      _container.appendChild(_element);
    });
    return _container;
  }
  bindCardList() {
    const _container = this.container.querySelector(".validator__container");
    const _element = _container.querySelector(".validator__title");
    const _list = this.renderCardList();
    _container.insertBefore(_list, _element.nextSibling);
  }
  onSubmit(e) {
    e.preventDefault();
    const numberCard = this.valueForm.value;
    this.setDefault();
    this.defineCard(numberCard);
    if (this.card) {
      const _elements = this.cardsList.querySelectorAll(`.cards__card`);
      _elements.forEach(_element => {
        const classList = _element.classList;
        if (!classList.contains(`cards__card-${this.card.name}`)) {
          classList.add("cards__card-filter");
        }
      });
    }
  }
  setDefault() {
    this.card = undefined;
    const _elements = this.cardsList.querySelectorAll(".cards__card");
    _elements.forEach(_element => _element.classList.remove("cards__card-filter"));
  }
  defineCard(numberCard) {
    const validation = new Validation(numberCard);
    if (validation.algorithmLuhn()) {
      for (const card of this.cards) {
        if (validation.checkLength(card.rule.length) && validation.checkIin(card.rule.iin)) {
          this.card = card;
          break;
        }
      }
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const _cardValidation = document.querySelector(".validator");
const cardValidation = new CardValidation(_cardValidation);
cardValidation.init();
;// CONCATENATED MODULE: ./src/index.js

})();

/******/ })()
;