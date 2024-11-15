const express = require("express");
const router = express.Router();
const { Show, User } = require("../models");

router.get("/", async (req, res) => {
  const shows = await Show.findAll();
  res.json(shows);
});

router.get("/genre/:genre", async (req, res) => {
  try {
    const shows = await Show.findAll({
      where: {
        genre: req.params.genre,
      },
    });
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (!show) {
    return res.status(404).json({ message: "Show not found" });
  }
  res.json(show);
});

router.get("/:id/users", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (!show) {
    return res.status(404).json({ message: "Show not found" });
  }
  const users = await show.getUsers();
  res.json(users);
});

router.put("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (!show) {
    return res.status(404).json({ message: "Show not found" });
  }
  show.title = req.body.title || show.title;
  show.available =
    req.body.available !== undefined ? req.body.available : show.available;
  await show.save();
  res.json(show);
});

router.delete("/:id", async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (!show) {
    return res.status(404).json({ message: "Show not found" });
  }
  await show.destroy();
  res.json({ message: "Show deleted" });
});

module.exports = router;
