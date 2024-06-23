import CardValidation from './components/card-validation/CardValidation';

const _cardValidation = document.querySelector('.validator');
const cardValidation = new CardValidation(_cardValidation);

cardValidation.init();