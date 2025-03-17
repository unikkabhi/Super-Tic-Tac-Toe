import express from "express";
import pg from "pg";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

const db = new pg.Client({
    user:"*******",
    host:"*******",
    database:"********",
    password:"********",
    port:5432,
});
db.connect();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json);

app.use(express.static("public"));

app.post('/saveGame', async (req, res) => {
    const { winner, xMoves, yMoves } = req.body;

    try {
        await saveGameData(winner, xMoves, yMoves);
        res.status(200).json({ message: 'Game data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving game data', error });
    }
    res.redirect("/");
});

async function saveGameData(winner, xMoves, yMoves) {
     try {
        const queryText = 'INSERT INTO game_data(winner, x_moves, y_moves) VALUES($1, $2, $3)';
        const queryValues = [winner, xMoves, yMoves];
        await db.query(queryText, queryValues);
    } catch(error){
        console.log(error);
    }

}

app.get('/',(req,res)=>{
    res.render("index.ejs");
})


app.listen(port,()=>{
    console.log(`Server Live at port ${port}`)
})