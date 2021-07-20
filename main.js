const consoleBG = document.querySelector(".console");

async function Typer() {
  const response = await fetch("./code.txt");
  const reader = response.body.getReader();
  const content = reader.read();
  return content;
}

let index = 0;
let code = [];

let blinky = document.createElement("span");
blinky.setAttribute("id", "blink");
blinky.textContent = "▌";

async function getTyper(e) {
  const utf8Decoder = new TextDecoder('utf-8');
  const response = await Typer();
  const decode = utf8Decoder.decode(response.value);
  const newChar = decode.charAt(index).replace(/\n/g, "<br/>");
  code.push(newChar);
  consoleBG.innerHTML = code.join('');
  consoleBG.appendChild(blinky);
  index += 1;
  consoleBG.scrollTop = consoleBG.scrollHeight;
}

consoleBG.addEventListener("keydown", (e) => {
  getTyper(e);
})