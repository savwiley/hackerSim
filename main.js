const consoleBG = document.querySelector(".console");

async function Typer() {
  const response = await fetch("./code.txt");
  const reader = response.body.getReader();
  const content = reader.read();
  return content;
}

let index = 0;
let code = [];

async function getTyper(e) {
  const utf8Decoder = new TextDecoder('utf-8');
  const response = await Typer();
  const decode = utf8Decoder.decode(response.value);
  const newChar = decode.charAt(index);
  code.push(newChar);
  consoleBG.textContent = code.join('');
  index += 1;
}

//.replace(/\n/g, "<br/>")

// ^ won't work if i'm importing the "code" via a string since it brings in one char at a time instead of straight html

consoleBG.addEventListener("keydown", (e) => {
  getTyper(e);
})



/**
 * needs keydown functionality
 * display one character per keydown
 * display breaks & tabs
 * consoleBG needs to be a textbox
 */