const Purchase = require('../../models/purchase');
const rescue = require('../rescue');

const remove = async (req, res) => {
  const userID = req.user.id;
  const { id } = req.params;

  if (!(await Purchase.verifyUser(userID, id))) return res.status(403)
    .json({ message: 'Id do comprador,nao bate com id do usuário' });

  Purchase.remove(id).then(() => {
    res.status(204).end();
  });
};

module.exports = rescue(remove);
