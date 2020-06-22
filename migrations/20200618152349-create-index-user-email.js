'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex(
      'Users', 
      ['email'], 
      {
        fields: 'email',
        unique: true
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Users', 'email')
  }
};
