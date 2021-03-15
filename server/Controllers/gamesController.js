const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const {GamesModel} = require('../Models')

router.get('/test', validateJWT, (req,res) => {
    res.send('this is a test route');
})


router.post('/create', validateJWT, async (req, res) => {
    const { title, date, genre, company } = req.body.game;
    const {id} = req.user;
    const gameEntry = {
         title,
         date,
         genre,
         company,
                      owner: id
       }
       try {
        const newGame = await GamesModel.create(gameEntry);
        res.status(200).json(newGame);
       } catch (err) {
         res.status(500).json({ error: err });
       }
});


router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const gameId = req.params.id;

    try {
        const query = {
            where: {
                id: gameId,
                owner: ownerId
            }
        };

        await GamesModel.destroy(query);
        res.status(200).json({message: "This game has been removed from your list"})
    } catch (err) {
        res.status(500).json({error:err})
    }
})

module.exports = router;
