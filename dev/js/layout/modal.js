let modal = document.getElementById("alert_modal");
let btn = document.getElementById("copyPhone");
let span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
modal.style.display = "block";
}
span.onclick = function() {
modal.style.display = "none";
}
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}