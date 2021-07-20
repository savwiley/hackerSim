//selectors
const consoleBG = document.querySelector(".console");
const video = document.querySelector(".video");
const start = document.querySelector(".start");
const yesBtn = document.querySelector("#yes");
const noBtn = document.querySelector("#no");

//buttons
const selectYes = () => {
  consoleBG.style.display = "block";
  start.style.display = "none";
}
const selectNo = () => {
  video.style.display = "block";
  start.style.display = "none";
}

//variables
let index = 0;
let code = [];
let selected = null;

//creates blinking cursor
let blinky = document.createElement("span");
blinky.setAttribute("id", "blink");
blinky.textContent = "▌";
consoleBG.appendChild(blinky);

//retrieves fake code
async function Typer() {
  const response = await fetch("./code.txt");
  const reader = response.body.getReader();
  const content = reader.read();
  return content;
}

//types one character at a time
async function getTyper(e) {
  const utf8Decoder = new TextDecoder('utf-8');
  const response = await Typer();
  const decode = utf8Decoder.decode(response.value);
  const newChar = decode.charAt(index).replace(/\n/g, "<br/>");
  code.push(newChar);
  consoleBG.innerHTML = code.join('');
  index += 1;
  consoleBG.scrollTop = consoleBG.scrollHeight;
  consoleBG.appendChild(blinky);
}

//keydown events
window.addEventListener("keydown", (e) => {
  if (consoleBG.style.display === "block") {
    getTyper(e);
  }
  if (e.keyCode === 37) {
    yesBtn.textContent = ">YES";
    noBtn.textContent = "NO";
    selected = "YES";
  } else if (e.keyCode === 39) {
    noBtn.textContent = ">NO";
    yesBtn.textContent = "YES";
    selected = "NO";
  } else if (e.keyCode === 13) {
    if (selected === "YES") {
      selectYes();
    } else if (selected === "NO") {
      selectNo();
    }
  }
})

//yes & no button events
yesBtn.addEventListener("click", selectYes);
noBtn.addEventListener("click", selectNo)