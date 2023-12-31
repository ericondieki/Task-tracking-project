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
getProjects();

let projectSlider = [];
let finalPslide = document.querySelector('.p-scroller');
let pbutton = document.querySelector('.proj-btn');
let pslide = document.createElement("div");
pslide.setAttribute('class', 'project-slide');
pslide.setAttribute('onclick', 'openProject()')
let phead = document.createElement("h2");
phead.setAttribute('class', 'proj-head');
let ppar = document.createElement("p");
ppar.setAttribute('class', 'proj-p');
pslide.appendChild(phead);
pslide.appendChild(ppar);

const pdialog = document.querySelector('.project-form');
const pform = document.querySelector('.proj-form');
const pinput = document.querySelector('.project-input');

pbutton.addEventListener('click', () => {
    pdialog.show();
    pinput.value = "";
})

pform.addEventListener('submit', () => {
    const pinputval = document.querySelector('.project-input').value;
    phead.innerHTML = pinputval;
    pdialog.close();
    addProject();
})

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
function openProject(){
    const pshead = document.createElement('h1');
    pshead.setAttribute('class', 'slide-head');
    pshead.innerHTML = pslide.innerHTML;
    pmodall.appendChild(pshead);
    console.log("You pushed it!!!")
    pmodall.show();
}