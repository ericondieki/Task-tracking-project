// Creating function to retrieve members from the database
async function getMembers(){
    const res = await fetch('/getMembers');
    const datamemb = await res.json();
    console.log(datamemb);
    memberSlider.push(datamemb);
    const mtarr = memberSlider[0];
    mtarr.forEach((item, index) => {
        membList.innerHTML = Object.values(mtarr[index]);
        mslide.appendChild(membList.cloneNode(true));
        document.getElementById("memb-id").innerHTML = "";
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
let mslide = document.createElement("ol");
mslide.setAttribute('class', 'memb-order');
let membList = document.createElement("li");
membList.setAttribute('class', 'memblist');
let finalmemb = document.getElementById("m-scroll");
finalmemb.appendChild(mslide);
let modalMemb = document.querySelector('.team-form');
  let mbInput = document.querySelector('#memb-input');

  const mbForm = document.querySelector('#m-form');
  const membForm = document.querySelector('#mb-form');
  const openMform = document.querySelector('#m-button')

// Click event for the add member button that presents form for filling out a member's details
  openMform.addEventListener('click', () =>{
    mbForm.show();
    mbInput.value = "";
} )

// Submission event that adds a specific member to the page upon submission 
membForm.addEventListener('submit', (e) => {
  let mbfInput = document.getElementById("memb-input").value;
  membList.innerHTML = mbfInput;
  mbForm.close();
  addMember();
})

  
// Function component to add multiple unique members to a page
    function addMember(){
        memberSlider.length =+2;
        for(memberSlider.length === 0; memberSlider.length > 0; document.getElementById("m-button").addEventListener('click', memberSlider.length--)){
            mslide.appendChild(membList.cloneNode(true));
            document.getElementById("memb-id").innerHTML = "";
            if(memberSlider.length === 21){
                break;
            }
        }
        document.getElementById("memb-id").innerHTML = "No Members Added";
    }