if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', {scope: '/'})
    .then((registration) => {
        console.log("Register Success", registration)
    })
    .catch((error) => {
        console.log("Register Failed", error)
    })
}
else {
    console.log("Service workers is not supported.")
}