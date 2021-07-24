//selectors
const console = document.querySelector(".console");
const consoleBG = document.querySelector("#consoleBG");
const video = document.querySelector(".video");
const start = document.querySelector(".start");
const yesBtn = document.querySelector("#yes");
const noBtn = document.querySelector("#no");

//button functions
const selectYes = () => {
  console.style.display = "block";
  start.style.display = "none";
}
const yesHover = () => {
  yesBtn.textContent = ">YES";
  noBtn.textContent = "NO";
}
const selectNo = () => {
  video.style.display = "block";
  start.style.display = "none";
}
const noHover = () => {
  noBtn.textContent = ">NO";
  yesBtn.textContent = "YES";
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
  if (console.style.display === "block") {
    getTyper(e);
    selected = null;
  }
  if (e.key === "ArrowLeft") {
    yesHover();
    selected = "YES";
  } else if (e.key === "ArrowRight") {
    noHover();
    selected = "NO";
  } else if (e.key === "Enter") {
    if (selected === "YES") {
      selectYes();
    } else if (selected === "NO") {
      selectNo();
    }
  }
})

//yes & no button events
yesBtn.addEventListener("click", selectYes);
yesBtn.addEventListener("mouseover", yesHover);
noBtn.addEventListener("click", selectNo)
noBtn.addEventListener("mouseover", noHover);