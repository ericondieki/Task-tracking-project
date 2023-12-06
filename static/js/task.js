const mapLoc = document.getElementById("team-map");
const openMap = document.querySelector(".pic-map");
const taskCor = document.getElementById("team-coord");

let mapz;

async function initMapz() {
  const { Map } = await google.maps.importLibrary("maps");

  mapz = new Map(document.querySelector(".pic-map"), {
    center: { lat: -1.3107, lng: 36.8250 },
    zoom: 12,
  });
  mapz.addListener("click", (e) => {
    maploc = JSON.stringify(e.latLng, null, 2);
    console.log(maploc);
    taskCor.value = maploc;
    openMap.close();
})
}




mapLoc.addEventListener('click', () => {
    initMapz();
    openMap.show();
    })