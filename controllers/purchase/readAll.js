const Purchase = require('../../models/purchase');
const rescue = require('../rescue');

const readAll = async (req, res) => {
  const userID = req.user.id;
  Purchase.getAll(userID).then((purchase) => {
    res.status(200).json(purchase);
  });
};

module.exports = rescue(readAll);
