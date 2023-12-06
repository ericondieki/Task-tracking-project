async function getTeams(){
 const res = await fetch('/getTeams');
 const datat = await res.json();
 console.log(datat);
 teamSlider.push(datat);
 const tarr = teamSlider[0];
 tarr.forEach((item, index) => {
  slidePar.innerHTML = Object.values(tarr[index]);
  finalSlide.appendChild(tslide.cloneNode(true));
  document.getElementById("team-id").innerHTML = "";
 })
}
getTeams();

async function getTasks(){
  const res = await fetch('/getTasks');
  const datatsk = await res.json();
  console.log(datatsk);
  taskSlider.push(datatsk);
  const tskarr = taskSlider[0];
  console.log(tskarr);
  tskarr.forEach((item, index) => {
    ttskarr = tskarr[index];
    console.log(ttskarr);
    tskTitle.innerHTML = Object(ttskarr["taskname"]);
    tskName.innerHTML = Object(ttskarr['teamname']);
    finalTskslide.appendChild(tskslide.cloneNode(true));
    document.getElementById("task-id").innerHTML = "";
  })
}
getTasks();


let teamSlider = [];
let tslide = document.createElement("div");
tslide.setAttribute('class', 'slide');
let slidePar = document.createElement("p");
slidePar.setAttribute('class', 't-title');
let finalSlide = document.getElementById("t-scroll");
  tslide.appendChild(slidePar);
  let modalPos = document.querySelector('#t-form');
  let tInputs = document.querySelector('#team-input');
  

let taskSlider = [];
let tskslide = document.createElement("div");
tskslide.setAttribute('class', 'big-task');
let tskTitle = document.createElement("p");
tskTitle.setAttribute('class', 'task-title');
let tskName = document.createElement("div");
tskName.setAttribute('class', 'task-name');
tskName.innerHTML = "Team Name";
let bgPrior = document.createElement("p");
bgPrior.setAttribute('class', 'big-priority');
bgPrior.innerHTML = "";
let finalTskslide = document.getElementById("tsk-scroll");
tskslide.appendChild(tskTitle);
tskslide.appendChild(tskName);
tskslide.appendChild(bgPrior);
tskInputs = document.querySelector('#task-input');




const tmForm = document.querySelector('#tm-form');
const tForm = document.querySelector('#t-form');
const openTform = document.querySelector('#t-button');

const tskForm = document.querySelector('#tsk-form');
const tkForm = document.querySelector('#tk-form');



openTform.addEventListener('click', () =>{
    tForm.show();
    modalPos.style.bottom = '215px';
    tInputs.value = "";
} )

tmForm.addEventListener('submit', (e) => {
  let tmfInput = document.getElementById("team-input").value;
  slidePar.innerHTML = tmfInput;
  tForm.close();
  addTeam();
})

 
function openTask(){
  tskForm.show();
  tskInputs.value = "";
}

function showTask(){
  let tkfInput = document.getElementById("task-input").value;
  tskTitle.innerHTML = tkfInput;
  tskForm.close();
  addTask();
}



function addTeam(){
    teamSlider.length +=2;
for(teamSlider.length === 0; teamSlider.length >0; document.getElementById("t-button").addEventListener("click", teamSlider.length--)){
  
  finalSlide.appendChild(tslide.cloneNode(true));
    document.getElementById("team-id").innerHTML = " ";
    if(teamSlider.length >0){
      modalPos.style.bottom = '215px';
    }

if(teamSlider.length > 21){
    break;
} 
}
document.getElementById("team-id").innerHTML = "No Teams Created";
}




function addTask(){
    taskSlider.length +=2;
    for(taskSlider.length === 0; taskSlider.length >0; document.getElementById("tsk-button").addEventListener("click", taskSlider.length--)){
      finalTskslide.appendChild(tskslide.cloneNode(true));
      document.getElementById("task-id").innerHTML = " ";
      if(taskSlider.length===31){
        break;
      }
    }
    document.getElementById("task-id").innerHTML = "No Tasks Created";
}

