function themes() {var themes = document.getElementById("themes");var themebtn = document.querySelector("#themebtn i");themes.classList.toggle("d-none");themebtn.classList.toggle("fa-chevron-up");themebtn.classList.toggle("fa-chevron-down");}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    var site_data = JSON.parse(this.responseText);
    document.getElementById("hitcount").innerHTML = site_data.info.views;
    }
};

function spoiler(element){
    element.classList.toggle("show");
}

xhttp.open("GET", "https://weirdscifi.ratiosemper.com/neocities.php?sitename=podruff", true);
xhttp.send();









function setFont(font) {
    document.querySelector("body").setAttribute("style", "font-family: " + font + " !important;");
    localStorage.setItem('font', font);
}







const command = new Audio("/assets/audio/command.wav");
const hover = new Audio("/assets/audio/hover.wav");
const buttons = document.querySelectorAll("a");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    command.pause();
    command.play();
  });
});
