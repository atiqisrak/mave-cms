const topnavdata = require("./topNavData.json");

export default function handler(req, res) {
  res.status(200).json(topnavdata);
}
