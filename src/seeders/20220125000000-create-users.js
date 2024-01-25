"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const superAdminData = {
      name: "Super Admin",
      email: "admin@gmail.com",
      password: "admin1234",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const saltRounds = 10;
    superAdminData.password = await bcrypt.hash(
      superAdminData.password,
      saltRounds
    );

    await queryInterface.bulkInsert("Users", [superAdminData], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", { email: "admin@gmail.com" }, {});
  },
};
