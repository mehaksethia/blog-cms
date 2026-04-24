const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const Post = require("../models/post");

const router = express.Router();

/* SIGNUP */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.json({ success: false, message: "User exists" });

  const hash = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hash });

  res.json({ success: true });
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email});
  if (!user) return res.json({ success: false });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false });

  req.session.userId = user._id;

  res.json({ success: true });
});

/* DASHBOARD */
router.get("/dashboard", async (req, res) => {
  if (!req.session.userId) return res.json({ loggedIn: false });

  const user = await User.findById(req.session.userId);

  res.json({ loggedIn: true, user });
});

/* POSTS */
router.post("/post", async (req, res) => {
  await Post.create({
    title: req.body.title,
    content: req.body.content,
    userId: req.session.userId
  });
  res.json({ success: true });
});

router.get("/posts", async (req, res) => {
  const posts = await Post.find({ userId: req.session.userId }).sort({ createdAt: -1 });
  res.json(posts);
});

router.delete("/post/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

/* LOGOUT */
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

module.exports = router;