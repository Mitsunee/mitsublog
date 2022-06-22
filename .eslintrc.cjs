const restrictedGlobals = require("confusing-browser-globals");

module.exports = {
  parserOptions: { sourceType: "module" },
  extends: ["eslint:recommended", "foxkit", "foxkit/react", "next", "prettier"],
  rules: {
    "no-restricted-globals": ["error"].concat(restrictedGlobals),
    "@next/next/no-img-element": "off"
  }
};
