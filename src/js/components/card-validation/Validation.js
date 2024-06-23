export default class Validation {

  constructor(number) {
    this.number = number;
  }

  algorithmLuhn() {
    const input = this.number;
    const number = input.toString();
    const digits = number.replace(/\D/g, '').split('').map(Number);
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
    return rule.includes(',') ? rule.split(',') : [rule];
  }

  getRuleRange(rule) {
    if (rule.includes('-')) {
      return rule.split('-').map(Number);
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