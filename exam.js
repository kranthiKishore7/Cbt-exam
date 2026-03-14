let current=0;
let score=0;
let time=120;
let q=[];

function startExam(){
  if(!questions || questions.length===0){
alert("Questions not loaded.");
    return;}

q=[...questions].sort(()=>Math.random()-0.5);

document.getElementById("login").style.display="none";
document.getElementById("exam").style.display="block";

loadQuestion();
}

function startExam(){

if(typeof questions === "undefined"){
alert("Questions not loaded.");
return;
}

q=[...questions].sort(()=>Math.random()-0.5);

current=0;
score=0;

document.getElementById("login").style.display="none";
document.getElementById("exam").style.display="block";

loadQuestion();

}

function loadQuestion(){

let item=q[current];

document.getElementById("sectionTitle").innerHTML=item.section;
document.getElementById("question").innerHTML=item.question;

let html="";

item.options.forEach((opt,i)=>{

html+="<button onclick="answer(${i})">${opt}</button><br><br>";

});

document.getElementById("options").innerHTML=html;

startTimer();

}

function answer(i){

if(i==q[current].correct) score+=2;
else score-=0.5;

next();

}

function next(){

current++;

if(current>=q.length){

finish();

}else{

time=120;
loadQuestion();

}

}

function startTimer(){

let t=setInterval(()=>{

time--;

document.getElementById("timer").innerHTML=time;

if(time<=0){

clearInterval(t);
next();

}

},1000);

}

function finish(){

document.getElementById("exam").style.display="none";
document.getElementById("result").style.display="block";

document.getElementById("score").innerHTML="Your Score: "+score;

fetch("/submit",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:document.getElementById("name").value,
roll:document.getElementById("roll").value,
college:document.getElementById("college").value,
email:document.getElementById("email").value,
score:score

})

}).then(r=>r.text()).then(msg=>{

if(msg=="ALREADY"){
alert("You have already attempted this exam.");
}

});

}

}
