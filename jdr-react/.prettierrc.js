module.exports = {
  semi: true,
  tabWidth: 2,
  printWidth: 120,
  trailingComma: "none",
  singleQuote: false,
  jsxSingleQuote: false,
  bracketSpacing: true,

  importOrder: [
    "^(.*)react(.*)$",
    "^(.*)@views/(.*)$",
    "^(.*)@atoms/(.*)$",
    "^(.*)@molecules/(.*)$",
    "^(.*)@templates/(.*)$",
    "^(.*)@routes/(.*)$",

    "^(.*)@config/(.*)$",
    "^(.*)@types/(.*)$",

    "^(.*)@hooks/(.*)$",
    "^(.*)@services/(.*)$",
    "^(.*)@contexts/(.*)$",
    "^(.*)@utils/(.*)$",

    "^(.*)@constants/(.*)$",
    "^(.*)@styles/(.*)$",

    "^(.*)$"
  ],
  importOrderSeparation: false
};
