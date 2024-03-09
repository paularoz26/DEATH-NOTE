let iconos;
let selectors = [];

generarTablero();

function cargarIconos() {
  iconos = [
    `<img src="68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f692d7552364b51495078325755413d3d2d31372e3135333364343638646362366333646335.jfif">`,
    `<img src="anime-death-note-boy-l-death-note-wallpaper-preview.jpg">`,
    `<img src="maxresdefault (1).jpg">`,
    `<img src="descarga (5).jfif">`,
    `<img src="images (D).jfif">`,
    `<img src="images (9).jfif">`,
    `<img src="images (10).jfif">`,
    `<img src="images (11).jfif">`,
    `<img src="images.png">`,
    `<img src="6d11803960d2cbfda1445c4e89ef6391.jpg">`,
    `<img src="51M0dfkoOgS._AC_UF1000,1000_QL80_.jpg">`,
    `<img src="9925eb18fbc693999e287a458ec4c3c0cdc60219v2_hq.jpg">`,
  ];
}

function generarTablero() {
  cargarIconos();

  let tablero = document.getElementById("tablero");

  let tarjetas = [];
  let len = iconos.length * 2;
  for (let i = 0; i < len; i++) {
    tarjetas.push(`
        <div class="card-area" onclick="cardSelector(${i})">
            <div class="card" id="card${i}">
                <div class="face front" id="back${i}">
                ${iconos[0]}
                </div>
                <div class="face back"><img src="bca1d41b914db8fb28eef6c69de77d2afbddc681_hq.jpg"></div>
            </div>
        </div>
      `);
    if (i % 2 == 1) {
      iconos.splice(0, 1);
    }
  }
  tarjetas.sort(() => Math.random() - 0.5);
  tablero.innerHTML = tarjetas.join("");
}

function cardSelector(i) {
  let card = document.getElementById("card" + i);
  if (card.style.transform != "rotateY(180deg)") {
    card.style.transform = "rotateY(180deg)";
    selectors.push(i);
  }
  if (selectors.length == 2) {
    desSelectors(selectors);
    selectors = [];
  }
}

function desSelectors(selectors) {
  setTimeout(() => {
    let back1 = document.getElementById("back" + selectors[0]);
    let back2 = document.getElementById("back" + selectors[1]);

    if (back1.innerHTML != back2.innerHTML) {
      let c1 = document.getElementById("card" + selectors[0]);
      let c2 = document.getElementById("card" + selectors[1]);
      c1.style.transform = "rotateY(0deg)";
      c2.style.transform = "rotateY(0deg)";
    } else {
      back1.style.opacity = 0.1;
      back2.style.opacity = 0.1;
    }
  }, 1000);
}