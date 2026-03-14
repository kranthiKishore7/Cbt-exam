const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const FILE="results.json";

if(!fs.existsSync(FILE)){
fs.writeFileSync(FILE,"[]");
}

app.use(express.static("public"));

app.post("/submit",(req,res)=>{

let data=req.body;

let results=JSON.parse(fs.readFileSync(FILE));

let exists=results.find(r=>r.email===data.email);

if(exists){
return res.send("ALREADY");
}

results.push(data);

fs.writeFileSync(FILE,JSON.stringify(results,null,2));

res.send("OK");

});

app.get("/download",(req,res)=>{

let results=JSON.parse(fs.readFileSync(FILE));

let csv="Name,Roll,College,Email,Score\n";

results.forEach(r=>{
csv+="${r.name},${r.roll},${r.college},${r.email},${r.score}\\n";
});

res.setHeader("Content-Disposition","attachment; filename=results.csv");
res.set("Content-Type","text/csv");

res.send(csv);

});

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log("Server running");

});
