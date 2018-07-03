const Sequelize = require("sequelize");
const sequelize = require("../config/db");

// Load local Model
const Activity = require("./Activity");

const MainActivity = sequelize.define("main_activity", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { min: 4, max: 255 }
  }
});

// MainActivity.hasMany(Activity, { as: "activities" });

MainActivity.sync({ force: true }).then(() => {
  MainActivity.create({
    name: "ประชุมใหญ่สามัญประจำปี 2561"
  });
});

module.exports = MainActivity;
