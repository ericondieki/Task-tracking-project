
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js", {scope: '/'}).then(registration => {
        console.log('SW registered');
        console.log(registration);
    }).catch(error => {
        console.log('Sw registration failed');
        console.log(error);
    })
}