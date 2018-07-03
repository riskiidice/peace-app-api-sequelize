const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const MainActivity = require("./MainActivity");

const Activity = sequelize.define("activity", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { min: 4, max: 255 }
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { min: 4, max: 255 }
  },
  issueDate: {
    type: Sequelize.DATE,
    isDate: true
  },
  isActive: {
    type: Sequelize.BOOLEAN
  }
});

// insert into activity(id,active,issue_date,location,name,main_activity_id)values(null, 1,'2018-08-15','จ.ปทุมธานี','อาคารอนุรักษ์พลังงานเฉลิมพระเกียรติ',1);
// insert into activity(id,active,issue_date,location,name,main_activity_id)values(null, 1,'2018-08-15','จ.อยุธยา','ศูนย์เรียนรู้พลังงานทดแทนบางจาก',1);
// insert into activity(id,active,issue_date,location,name,main_activity_id)values(null, 1,'2018-08-15','จปร.','กิจกรรมปลุกพลัง ณ จปร.',1);

// Relation Definition
Activity.belongsTo(MainActivity);

// force: true will drop the table if it already exists
Activity.sync({ force: true }).then(() => {
  // Table created
  return Activity.bulkCreate([
    {
      name: "อาคารอนุรักษ์พลังงานเฉลิมพระเกียรติ",
      location: "จ.ปทุมธานี",
      issueDate: "2018-08-15",
      isActive: true,
      mainActivityId: 1
    },
    {
      name: "ศูนย์เรียนรู้พลังงานทดแทนบางจาก",
      location: "จ.อยุธยา",
      issueDate: "2018-08-15",
      isActive: true,
      mainActivityId: 1
    },
    {
      name: "กิจกรรมปลุกพลัง ณ จปร.",
      location: "จปร.",
      issueDate: "2018-08-15",
      isActive: true,
      mainActivityId: 1
    }
  ]);
});

module.exports = Activity;
