const express = require("express");
const router = express.Router();
// Import Model
const Activity = require("../../model/Activity");
const MainActivity = require("../../model/MainActivity");

// @route GET /api/v1/activities
// @desc  Get current activities
// @access Public
router.get("/", (req, res) => {
  const activities = Activity.findAll({
    attributes: ["name", "location", "issueDate", "isActive"],
    include: [{ model: MainActivity, attributes: ["id", "name"] }]
  }).then(activities => {
    return res.json(activities);
  });
});

// @route POST /api/profile
// @desc  Get current user profile
// @access Private
router.post("/", (req, res) => {
  const { name, location, issueDate, mainActivityId } = req.body;

  Activity.create({
    name: name,
    location: location,
    issueDate: issueDate,
    isActive: true,
    mainActivityId: mainActivityId
  })
    .then(activity => {
      return res.json(activity);
    })
    .catch(err => {
      return res.status(400).json(err);
    });
});
// @route POST /api/v1/activities/:id
// @desc  Get Activity By id
// @access public

router.get("/:id", (req, res) => {
  Activity.findOne({
    where: { id: req.params.id }
  }).then(activity => {
    if (activity) {
      return res.json(activity);
    } else {
      return res.status(404).json({ activity: "ไม่พบกิจกรรม" });
    }
  });
});

module.exports = router;
