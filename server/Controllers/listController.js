const router = require("express").Router();
let validateJWT = require("../middleware/validate-jwt");
const User = require("../Models/userModel");
const List = require("../Models/listModel");
const Game = require("../Models/gamesModel");

/**************** GET LISTS BY USER ID ****************/

router.get("/:id", validateJWT, async (req, res) => {
  const {id} = req.user

  try {
   const query = await List.findAll({
      where: {
        owner: id
      }
      })
        res.status(200).json(query)
      } catch(err) {
    res.status(500).json({error: err})
  }
} )

/**************** GET LIST ITEMS BY LIST ID ****************/

// router.get("/:listId", async (req, res) => {
//   Game.findAll({
//     where: { listId: req.params.listId },
//     order: [["sortID", "ASC"]],
//   })
//     .then((games) => res.status(200).json(games))
//     .catch((err) => res.status(500).json({ error: err }));
// });

/**************** UPDATE LISTS ****************/

router.put("/update/:listId", async (req, res) => {

  const {updatingList} = req.body.list.title;

  const {
    title,
  } = req.body;

  try {
    await List.update(
      updatingList,
      {where: {id: req.params.listId, userId: req.user.id }}
    ).then((result) => {
      res.status(200).json({
        message: "List successfully updated",
        updatedList: result,
      })
    })
  } catch(err) {
    res.status(500).json({error: err})
  }
})

/**************** CREATE LISTS ****************/

router.post('/create', validateJWT, async (req, res) => {
  const {id} = req.user;
  const {title} = req.body.list
  const list = {
    title,
    owner: id
  }
     try {
      const newList = await List.create(list);
      res.status(200).json(newList);
     } catch (err) {
       res.status(500).json({ error: err });
     }
});

/**************** DELETE LISTS ****************/

router.delete("/delete/:listId", async (req, res) => {
  try {
    await List.destroy({
      where: {
        id: req.params.listId,
      },
    }).then((result) => {
      res.status(200).json({
        message: "List successfully deleted",
        deletedList: result,
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Failed to delete list: ${err}`,
    });
  }
});


module.exports = router;