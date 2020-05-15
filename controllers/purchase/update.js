const Purchase = require('../../models/purchase');
const rescue = require('../rescue');

const update = async (req, res) => {
  const { productId, quantity } = req.body;
  const userID = req.user.id;
  const { id } = req.params;

  if (!(await Purchase.verifyUser(userID, id))) return res.status(403)
    .json({ message: 'Id do comprador,nao bate com id do usuário' });

  if (!Purchase.validPurchase({ productId, quantity, userID }, true)) (
    res.status(422).json({ message: 'Dados Inválidos' })
  );

  const newObj = {
    productId,
    quantity,
    userID,
  }

  Purchase.update(newObj, id).then((purchase) => {
    res.status(200).json({ purchase });
  });
};

module.exports = rescue(update);
