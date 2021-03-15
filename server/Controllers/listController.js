const router = require("express").Router();
const User = require("../Models/userModel");
const List = require("../Models/listModel");
const Game = require("../Models/gamesModel");
let validateJWT = require("../middleware/validate-jwt");

/**************** GET LISTS BY USER ID ****************/

router.get("/", validateJWT, (req, res) => {
  List.findAll({
    where: { userId: req.user.id },
    order: [["listName", "ASC"]],
  })
    .then((list) => res.status(200).json(list))
    .catch((err) => res.status(500).json({ error: err }));
});

/**************** GET LIST ITEMS BY LIST ID ****************/

router.get("/:listId", validateJWT, (req, res) => {
  Game.findAll({
    where: { listId: req.params.listId },
    order: [["sortID", "ASC"]],
  })
    .then((games) => res.status(200).json(games))
    .catch((err) => res.status(500).json({ error: err }));
});

/**************** UPDATE LISTS ****************/

router.put("/update/:id", validateJWT, (req, res) => {
  const updateList = {
    listName: req.body.list.title,
  };

  const query = { where: { id: req.params.id, userId: req.user.id } };

  List.update(updateList, query)
    .then((list) => res.status(200).json(list))
    .catch((err) => res.status(500).json({ error: err }));
});

/**************** CREATE LISTS ****************/

router.post("/add", validateJWT, (req, res) => {
  User.findOne({ where: { id: req.user.id } })
    .then((user) => {
      List.create({
        listName: req.body.list.title,
        userId: user.id,
      });
    })
    .then((list) => res.status(200).json(list))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;