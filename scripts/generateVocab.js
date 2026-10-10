const fs = require("fs");
const mongoose = require("mongoose");
const Workshop = require("../models/workshop");

async function run() {
  const conn = mongoose.createConnection("mongodb://localhost:27017/beta_06");

conn.once("open", async () => {
  const Workshop = conn.model("Workshop", require("../models/workshop").schema);

  const workshops = await Workshop.find();

  let vocabSet = new Set();
  workshops.forEach(ws => ws.skills.forEach(s => vocabSet.add(s.toLowerCase())));

  fs.writeFileSync("./data/vocab.json", JSON.stringify([...vocabSet], null, 2));

  console.log("✅ Vocabulary created!");
  conn.close();
});


  const workshops = await Workshop.find();

  let vocabSet = new Set();

  workshops.forEach(ws => {
    ws.skills.forEach(skill => vocabSet.add(skill.toLowerCase()));
  });

  const vocab = Array.from(vocabSet);

  fs.writeFileSync("./data/vocab.json", JSON.stringify(vocab));

  console.log("✅ Vocabulary created:", vocab);
  process.exit();
}

run();
