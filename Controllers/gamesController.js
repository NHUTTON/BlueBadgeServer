const Express = require('express');
const router = Express.Router();
let {validateJWT} = require("../middleware");
const {GamesModel} = require('../Models')

router.get('/test', validateJWT, (req,res) => {
    res.send('this is a test route');
})


router.post('/create', validateJWT, async (req, res) => {
    const { image, title, date, genre, platform } = req.body.game;
    const {id} = req.user;
    const gameEntry = {
         image,
         title,
         date,
         genre,
         platform,
        owner: id
       }
       try {
        const newGame = await GamesModel.create(gameEntry);
        res.status(200).json(newGame);
       } catch (err) {
         res.status(500).json({ error: err });
       }
});

/*

Get Games by User

*/

router.get("/mine", validateJWT, async (req,res) => {
    let {id} = req.user;
    try {
        const userGames = await GamesModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userGames);
    } catch (err) {
        res.status(500).json({error: err});
    }
});


// DELETE Games

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
