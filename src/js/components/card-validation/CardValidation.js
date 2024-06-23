import "./style.css";
import data from "./card-list.json";
import { importAll } from "../../functions";
import Validation from "./Validation";

const images = importAll(
  require.context("./images", false, /\.(png|jpe?g|svg)$/),
);

export default class CardValidation {
  constructor(container) {
    this.container = container;
    this.cards = data;
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

    this.cards.forEach((card) => {
      const _image = document.createElement("img");
      _image.src = images[card.image];
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

      _elements.forEach((_element) => {
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
    _elements.forEach((_element) =>
      _element.classList.remove("cards__card-filter"),
    );
  }

  defineCard(numberCard) {
    const validation = new Validation(numberCard);

    if (validation.algorithmLuhn()) {
      for (const card of this.cards) {
        if (
          validation.checkLength(card.rule.length) &&
          validation.checkIin(card.rule.iin)
        ) {
          this.card = card;
          break;
        }
      }
    }
  }
}
