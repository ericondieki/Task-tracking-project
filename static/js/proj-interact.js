// Function to retrieve projects from the database
async function getProjects(){
    const res = await fetch('/getProjects');
    const projData = await res.json();
    console.log(projData);
    projectSlider.push(projData);
    const parr = projectSlider[0];
    parr.forEach((item, index) => {
       const existingSlide = finalPslide.querySelector(`.proj-head[data-name="${parr[index].projectname}"]`);
        if(existingSlide) {
            // If slide already exists, just append the team badge
            const projectBadge = document.createElement("span");
            projectBadge.setAttribute("class", "badge bg-secondary p-badge");
            projectBadge.innerHTML = parr[index].teamname;
            existingSlide.parentNode.appendChild(projectBadge);
        } else {
            // Create a new slide for the project
            const pslide = document.createElement("div");
            pslide.setAttribute('class', 'project-slide');
            pslide.setAttribute('onclick', 'openProject(this)');

            const phead = document.createElement("h2");
            phead.setAttribute('class', 'proj-head');
            phead.setAttribute('data-name', parr[index].projectname); // Add data attribute for identifying project name
            phead.setAttribute('style', 'margin-top: 30px;');
            phead.innerHTML = parr[index].projectname;

            const ppar = document.createElement("p");
            ppar.setAttribute('class', 'proj-p');
            ppar.setAttribute('style', 'margin-top: 20px; margin-bottom: 30px;');
            ppar.innerHTML = parr[index].projdescription;

            const projectBadge = document.createElement("span");
            projectBadge.setAttribute("class", "badge bg-secondary p-badge");
            projectBadge.innerHTML = parr[index].teamname;
            pslide.appendChild(phead);
            pslide.appendChild(ppar);
            pslide.appendChild(projectBadge);

            finalPslide.appendChild(pslide);
        }
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
phead.setAttribute('style', 'margin-top: 30px;');
let ppar = document.createElement("p");
ppar.setAttribute('class', 'proj-p');
ppar.setAttribute('style', 'margin-top: 20px; margin-bottom: 30px;');
ppar.innerHTML = "This is a somewhat lengthy description of a project not fully defined and honestly not really useful for much of anything in the real world in all likelihood"
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
   const isActive = pmodall.classList.contains("active");
   if(isActive){
    pmodall.classList.remove('active');
   }
    pmodall.innerHTML = "";
    pmodall.appendChild(pshead);
    pmodall.classList.add('active');
    console.log("You pushed it!!!");
   
}