import Validation from "../Validation";

test("algorithm Luhn check true", () => {
  const validation = new Validation("4627100101654724");

  expect(validation.algorithmLuhn()).toBe(true);
});

test("algorithm Luhn check false", () => {
  const validation = new Validation("4627100101654725");

  expect(validation.algorithmLuhn()).toBe(false);
});

test.each([
  [
    "2202200874799834",
    "mir",
    {
      length: "16-19",
      iin: "2200-2204",
    },
  ],
  [
    "4627100101654724",
    "visa",
    {
      length: "13,16,19",
      iin: "4",
    },
  ],
  [
    "5538300838605560",
    "mastercard",
    {
      length: "16",
      iin: "2221-2720,51-55",
    },
  ],
  [
    "3530111333300000",
    "jcb",
    {
      length: "16-19",
      iin: "3528-3589",
    },
  ],
  [
    "6011111111111117",
    "discover",
    {
      length: "16-19",
      iin: "6011,644-649,65,622126-622925",
    },
  ],
  [
    "36148900647913",
    "diners-club",
    {
      length: "14-19",
      iin: "36",
    },
  ],
  [
    "375700000000002",
    "american-express",
    {
      length: "15",
      iin: "34,37",
    },
  ],
])(
  "Checking number card %s the definition of the payment system %s",
  (number, expected, rule) => {
    const validation = new Validation(number);

    expect(
      validation.checkLength(rule.length) && validation.checkIin(rule.iin),
    ).toBe(true);
  },
);
