const mapLoc = document.getElementById("team-map");
const openMap = document.querySelector(".pic-map");
const taskCor = document.getElementById("team-coord");

let mapz;

// Script to import Google maps API to the project
async function initMapz() {
  // Import the library in an object labeled Map
  const { Map } = await google.maps.importLibrary("maps"); 
 
  // Appending the Google map to the modal that appears when the 'pick location' button is pressed on the tasks form
  mapz = new Map(document.querySelector(".pic-map"), {
    center: { lat: -1.3107, lng: 36.8250 },
    zoom: 12,
  });
  // Click event that adds to the text box labeled 'team-coord' the coordinates of the point that was clicked
  mapz.addListener("click", (e) => {
    maploc = JSON.stringify(e.latLng, null, 2);
    console.log(maploc);
    taskCor.value = maploc;
    openMap.close(); // Closing the modal with the map
})
}




mapLoc.addEventListener('click', () => {
    initMapz();
    openMap.show();
    })