const authorisedSideMenu = require("./authorisedsidemenus.json");

export default function handler(req, res) {
  res.status(200).json(authorisedSideMenu);
}
