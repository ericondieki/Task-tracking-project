// Function to retrieve teams from the database
async function getTeams(){
 const res = await fetch('/getTeams');
 const datat = await res.json();
 console.log(datat);
 teamSlider.push(datat);
 const tarr = teamSlider[0];
 tarr.forEach((item, index) => {
  slidePar.innerHTML = tarr[index].teamname;
  teamBadge.innerHTML = tarr[index].projectname;
  finalSlide.appendChild(tslide.cloneNode(true));
  document.getElementById("team-id").innerHTML = "";
 })
}
getTeams(); // Retrieve teams from the database


// Function to retrieve tasks from the database
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
  
    finalTskslide.appendChild(tskslide.cloneNode(true));
    document.getElementById("task-id").innerHTML = "";
  })
}
getTasks(); // Retrieve tasks from the database

// Creating the manpulatng the DOM element surrounging the teams page
let teamSlider = [];
let tslide = document.createElement("div");
tslide.setAttribute('class', 'card slide');
tslide.setAttribute('onclick', 'openTeams(this)');
let teamImg = document.createElement("img");
teamImg.setAttribute("class", "card-img-top");
let teamBod = document.createElement('div');
teamBod.setAttribute("class", "card-body")
let slidePar = document.createElement("h5");
slidePar.setAttribute('class', 'card-title t-title');
let teamBadge = document.createElement("span");
teamBadge.setAttribute("class", "badge bg-secondary p-badge");
teamBadge.innerHTML = "Project Teams";
let finalSlide = document.getElementById("t-scroll");
  teamBod.appendChild(slidePar);
  teamBod.appendChild(teamBadge);
  tslide.appendChild(teamImg);
  tslide.appendChild(teamBod);
  let modalPos = document.querySelector('#t-form');
  let tInputs = document.querySelector('#team-input');
  
// Creating and manipulting the DOM element surrounding the tasks page
let taskSlider = [];
let tskslide = document.createElement("div");
tskslide.setAttribute('class', 'big-task');
tskslide.setAttribute('onclick', 'openTasks(this)');
let tskTitle = document.createElement("h1S");
tskTitle.setAttribute('class', 'task-title')
let bgPrior = document.createElement("p");
bgPrior.setAttribute('class', 'big-priority');
bgPrior.innerHTML = "";
let finalTskslide = document.getElementById("tsk-scroll");
tskslide.appendChild(tskTitle);

tskslide.appendChild(bgPrior);
tskInputs = document.querySelector('#task-input');




const tmForm = document.querySelector('#tm-form');
const tForm = document.querySelector('#t-form');
const openTform = document.querySelector('#t-button');

const tskForm = document.querySelector('#tsk-form');
const tkForm = document.querySelector('#tk-form');


// Click event event for the add teams button that presents a form on the teams page
openTform.addEventListener('click', () =>{
    tForm.show();
    modalPos.style.bottom = '215px';
    tInputs.value = "";
} )
 
// Submit event script for the form that appears with the teams page add team button
tmForm.addEventListener('submit', (e) => {
  let tmfInput = document.getElementById("team-input").value;
  slidePar.innerHTML = tmfInput;
  tForm.close();
  addTeam(); // Execute fuction to add a team to the teams page upon form submission
})

 // Function that open form for filling out tasks on tasks page upon click of the tasks button
function openTask(){
  tskForm.show();
  tskInputs.value = "";
}

// Function to execute script to add task to the tasks page upon form submission
function showTask(){
  let tkfInput = document.getElementById("task-input").value;
  tskTitle.innerHTML = tkfInput;
  tskForm.close();
  addTask(); 
}


// Function component that faciliates the appearance of multiple teams within the teams page 
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



// Function component for the appearance of multiple tasks on tasks page
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


function openTeams(clickedSlide){
  const tmodal = document.querySelector(".team-modal");
  const thead = document.createElement("h1");
  thead.setAttribute("class", "team-head");
  thead.innerHTML = clickedSlide.querySelector(".t-title").innerHTML;
  const activeTeam = tmodal.classList.contains("active");
  if(activeTeam){
    tmodal.classList.remove("active");
  }
  tmodal.innerHTML = "";
  tmodal.appendChild(thead);
  tmodal.classList.add("active");
  console.log("You pushed it!");
}

function openTasks(clickedSlide){
  const tskmdoal = document.querySelector(".task-modal");
  const tskhead = document.createElement("h1");
  tskhead.setAttribute("class", "task-head");
  tskhead.innerHTML = clickedSlide.querySelector(".task-title").innerHTML;
  const activeTask = tskmdoal.classList.contains("active");
  if(activeTask){
    tskmdoal.classList.remove("active");
  }
  tskmdoal.innerHTML = "";
  tskmdoal.appendChild(tskhead);
  tskmdoal.classList.add("active");
  console.log("You pushed it!")
}