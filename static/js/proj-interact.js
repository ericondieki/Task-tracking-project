// Function to retrieve projects from the database
async function getProjects(){
    const res = await fetch('/getProjects');
    const projData = await res.json();
    console.log(projData);
    projectSlider.push(projData);
    const parr = projectSlider[0];
    parr.forEach((item, index) => {
        phead.innerHTML = Object.values(parr[index]);
        finalPslide.appendChild(pslide.cloneNode(true));
        document.querySelector('.projects-par').innerHTML = "";
    })
}
getProjects(); // Retrieving projects from the database

// Creating and manipulaing the DOM elements surrounding the projects page 
let projectSlider = [];
let finalPslide = document.querySelector('.p-scroller');
let pbutton = document.querySelector('.proj-btn');
let pslide = document.createElement("div");
pslide.setAttribute('class', 'project-slide');
pslide.setAttribute('onclick', 'openProject(this)')
let phead = document.createElement("h2");
phead.setAttribute('class', 'proj-head');
let ppar = document.createElement("p");
ppar.setAttribute('class', 'proj-p');
pslide.appendChild(phead);
pslide.appendChild(ppar);

const pdialog = document.querySelector('.project-form');
const pform = document.querySelector('.proj-form');
const pinput = document.querySelector('.project-input');

// Click event for the add projects button thatpresents the form for filling out a project's details
pbutton.addEventListener('click', () => {
    pdialog.show();
    pinput.value = "";
})
 
// Submit event that creates a new unique project upon form submission
pform.addEventListener('submit', () => {
    const pinputval = document.querySelector('.project-input').value;
    phead.innerHTML = pinputval;
    pdialog.close();
    addProject();
})

// Function component to add unique project to the page 
function addProject(){
    projectSlider.length+=2;
    for(projectSlider.length===0; projectSlider.length>0; pbutton.addEventListener("click", projectSlider.length--)){
        finalPslide.appendChild(pslide.cloneNode(true));
        document.querySelector('.projects-par').innerHTML = "";
        if(projectSlider.length>21){
            break;
        }
    }
    document.querySelector(".projects-par").innerHTML="No Projects Created";
}

const pmodall = document.querySelector('.project-modal');
function openProject(clickedSlide){
    const pshead = document.createElement('h1');
    pshead.setAttribute('class', 'slide-head');
    pshead.innerHTML = clickedSlide.querySelector(".proj-head").innerHTML;
    pmodall.appendChild(pshead);
    console.log("You pushed it!!!");
    pmodall.show();
}