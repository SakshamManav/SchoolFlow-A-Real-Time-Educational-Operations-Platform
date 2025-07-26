const express = require("express");
const router = express.Router();
const schoolUserModel = require("../models/User_School_Admin");


router.get("/getUser", async (req, res) => {
  try {
    const users = await schoolUserModel.getAllSchoolUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("getuserbyid/:id", async (req, res) => {
  try {
    const user = await schoolUserModel.getSchoolUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("update/:id", async (req, res) => {
  try {
    const result = await schoolUserModel.updateSchoolUser(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("delete/:id", async (req, res) => {
  try {
    const result = await schoolUserModel.deleteSchoolUser(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
