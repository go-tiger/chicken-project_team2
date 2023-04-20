const {} = require('../models');

class MenuRepository {
  itemList = async () => {
    return await chickenMenu.findAll({});
  };
}

module.exports = MenuRepository;
