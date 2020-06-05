const Purchase = require('../../models/purchase');
const rescue = require('../rescue');

const read = async (req, res) => {
  const userID = req.user.id;
  const { id } = req.params;

  if (!(await Purchase.verifyUser(userID, id))) return res.status(403)
    .json({ message: 'Id do comprador,nao bate com id do usuário' });

  const onePurchase = await Purchase.getOne(userID, id);
  res.status(200).json(onePurchase);
};

module.exports = rescue(read);
