const express = require("express");
const nedb = require("nedb-promises");

const app = express(); 
const db = nedb.create("myfile.json"); 

app.use(express.static("public")); 
app.get("/hit", async (req, res) => {
    try {
        let hitRecord = await db.findOne({ name: "page_hits" });

        if (!hitRecord) {

            hitRecord = { name: "page_hits", count: 1 };
            await db.insert(hitRecord);
        } else {

            hitRecord.count += 1;
            await db.update({ name: "page_hits" }, { $set: { count: hitRecord.count } });
        }

        res.json({ hits: hitRecord.count });
    } catch (err) {
        res.status(500).send("Error updating hit count");
    }
});


app.all("*", (req, res) => {
    res.status(404).send("Invalid URL.");
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server started… http://localhost:${PORT}`));
