const unauthorisedsidemenu = require("./unauthorisedsidemenu.json");

export default function handler(req, res) {
  res.status(200).json(unauthorisedsidemenu);
}
