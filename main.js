const consoleBG = document.querySelector(".console");

async function Typer() {
  const response = await fetch("./code.txt");
  const reader = response.body.getReader();
  const content = reader.read();
  return content;
}

async function getTyper () {
  const utf8Decoder = new TextDecoder('utf-8');
  const response = await Typer();
  const decode = utf8Decoder.decode(response.value)
  consoleBG.textContent = decode;
}

consoleBG.addEventListener("click", getTyper)



/**
 * needs keydown functionality
 * display one character per keydown
 * display breaks & tabs
 * consoleBG needs to be a textbox
 */