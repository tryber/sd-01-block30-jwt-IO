const Purchase = require('../../models/purchase');
const rescue = require('../rescue');

const readAll = async (req, res) => {
  const { userID: id } = req.user;
  const { id } = req.params;

  if (!(await Purchase.verifyUser(userID, id))) return res.status(403)
    .json({ message: 'Id do comprador,nao bate com id do usuário' });

  Purchase.getAll(userID).then((purchase) => {
    res.status(200).json(purchase);
  });
};

module.exports = rescue(readAll);
