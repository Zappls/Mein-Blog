
const postBtn = document.getElementById('postBtn');
const getBtn = document.getElementById('getBtn');

postBtn.addEventListener("click", function() {
    const locationName = document.getElementById('locationName');
    const latitude = document.getElementById('latitude');
    const longitude = document.getElementById('longitude');
    const description = document.getElementById('description');
    const textElement = document.getElementById('postOutput');
    const postOutput = postfunction(locationName, latitude, longitude, description);
    textElement.innerText = `Result: ${postOutput}`;
});

getBtn.addEventListener("click", function() {
    const id = document.getElementById('locationId');
    const locationName = document.getElementById('locationName');
    const latitude = document.getElementById('latitude');
    const longitude = document.getElementById('longitude');
    const description = document.getElementById('description');
    const textElement = document.getElementById('getOutput');
});