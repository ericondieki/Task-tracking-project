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
getMembers();

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
getMemberTeams();

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


  openMform.addEventListener('click', () =>{
    mbForm.show();
    mbInput.value = "";
} )

membForm.addEventListener('submit', (e) => {
  let mbfInput = document.getElementById("memb-input").value;
  membList.innerHTML = mbfInput;
  mbForm.close();
  addMember();
})

  

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