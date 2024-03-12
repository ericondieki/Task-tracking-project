// Creating function to retrieve members from the database
async function getMembers(){
    const res = await fetch('/getMembers');
    const datamemb = await res.json();
    console.log(datamemb);
    memberSlider.push(datamemb);
    const mtarr = memberSlider[0];
    mtarr.forEach((item, index) => {
        mid.innerHTML = mtarr[index].membID;
        mname.innerHTML = mtarr[index].membername;
        memail.innerHTML = mtarr[index].membemail;
        mteam.innerHTML = mtarr[index].teamname;
        membtable.appendChild(mtable.cloneNode(true));
    })
}
getMembers(); // Retrieve members fromthe database

// Function to retrieve teams pertaining to specific members on the member page
async function getMemberTeams(){
    const mSlider = [];
    const mdropdown = document.getElementById('memb_dropdown');
    const res = await fetch('/getMemberTeams');
    const membData = await res.json();
    mSlider.push(membData);
    const mparr = mSlider[0];
    mparr.forEach((item, index) => {
        const option = document.createElement('option');
        mdropdown.appendChild(option);
        option.text = Object.values(mparr[index]);
    })

}
getMemberTeams(); // Retrieving teams pertaining to specific members from the database

// Creating and manipulating the DOM surrounding the member page
let memberSlider =[];
let membtable = document.querySelector(".table-body");
let mtable = document.createElement("tr");
let mid = document.createElement("td");
mid.innerHTML = "1";
let mname = document.createElement("td");
mname.setAttribute("style", "color: black;");
mname.innerHTML = "Erick Getange";
let memail = document.createElement("td");
memail.innerHTML = "ondiekidaystar@gmail.com";
let mteam = document.createElement("td");
mteam.innerHTML = "Team Avatar";
mtable.appendChild(mid);
mtable.appendChild(mname);
mtable.appendChild(memail);
mtable.appendChild(mteam);

  let midNo = 1;
  const mbInput = document.getElementById("memb-input");
  const mbForm = document.querySelector('#m-form');
  const membForm = document.querySelector('#mb-form');
  const openMform = document.querySelector('#m-button')

// Click event for the add member button that presents form for filling out a member's details
  openMform.addEventListener('click', () =>{
    mbForm.show();
    mbInput.value = "";
    document.getElementById("member-id").value = "";
} )

// Submission event that adds a specific member to the page upon submission 
membForm.addEventListener('submit', (e) => {
  let mbfInput = document.getElementById("memb-input").value;
  let einput = document.getElementById("member-id").value;
  let dropinput = document.getElementById("memb_dropdown").value;
  mid.innerHTML = midNo;
  mname.innerHTML = mbfInput;
  memail.innerHTML = einput;
  mteam.innerHTML = dropinput;
  mbForm.close();
  addMember();
})

  
// Function component to add multiple unique members to a page
    function addMember(){
        memberSlider.length =+2;
        for(memberSlider.length === 0; memberSlider.length > 0; document.getElementById("m-button").addEventListener('click', memberSlider.length--)){
            midNo += 1;
            membtable.appendChild(mtable.cloneNode(true));
            if(memberSlider.length === 21){
                break;
            }
        }
    }