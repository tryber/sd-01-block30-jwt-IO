const Purchase = require('../../models/purchase');
const rescue = require('../rescue');

const read = async (req, res) => {
  const userID = req.user.id;

  if (!(await Purchase.verifyUser(userID, id))) return res.status(403)
    .json({ message: 'Id do comprador,nao bate com id do usuário' });

  Purchase.getOne(userID, id).then((purchase) => {
    res.status(200).json(purchase);
  });
};

module.exports = rescue(read);
