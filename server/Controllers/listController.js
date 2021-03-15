const router = require("express").Router();
const User = require("../db").import("../Models/userModel");
const List = require("../db").import("../Models/listModel");
const Game = require('../db').import('../Models/gamesModel');

/**************** GET LISTS BY USER ID ****************/

router.get("/", (req, res) => {
  List.findAll({ where: { userId: req.user.id }, order: [["listName", "ASC"]] })
    .then((list) => res.status(200).json(list))
    .catch((err) => res.status(500).json({ error: err }));
});

/**************** GET LIST ITEMS BY USER ID ****************/

router.get("/:listId", (req, res) => {
    Item.findAll({ where: { listId: req.params.listId }, order: [["sortID", "ASC"]] })
      .then((items) => res.status(200).json(items))
      .catch((err) => res.status(500).json({ error: err }));
  }); 