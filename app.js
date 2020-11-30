const m = document.getElementById('m');
const q = document.getElementById('q');

const btnCarica = document.getElementById('btnCarica');
const btnSalva = document.getElementById('btnSalva');
const btnDisegna = document.getElementById('btnDisegna');

const ss = window.sessionStorage;

const validaCampi = () => {
  const erroreM = document.getElementById('erroreM');
  const erroreQ = document.getElementById('erroreQ');

  let ret = 0;

  console.log('valido...');

  if (!m.value) {
    m.classList.add('is-invalid');
    erroreM.innerText = 'Compila questo campo';
    ret--;
  } else {
    m.classList.remove('is-invalid');
    m.classList.add('is-valid');
    erroreM.innerText = '';
  }

  if (!q.value) {
    q.classList.add('is-invalid');
    erroreQ.innerText = 'Compila questo campo';
    ret--;
  } else {
    q.classList.remove('is-invalid');
    q.classList.add('is-valid');
    erroreQ.innerText = '';
  }

  return ret;
};


const pulisciCanvas = () => {
  window.location.reload(false);
};

const disegnaFunzione = (ctx, m, q) => {
  /* y = mx + q */
  ctx.strokeStyle = '#FF0000';
  ctx.scale(1, -1);
  ctx.beginPath();
  ctx.moveTo(-200, -200);
  for (let x = -200; x < 200; x++) {
    console.log(`x: ${ x }, y:${ (m * x) + q }`);
    ctx.lineTo(x, m * x + q);
    ctx.stroke();
  }
};

const disegnaTestoSuCartesiano = (ctx, x, y, text) => {
  ctx.fillText(text, x, -(y));
};

const disegnaCanvas = () => {
  if (validaCampi() < 0)
    return -1;


  console.log('disegno...');

  const c = document.getElementById('cnvGrafico');
  const ctx = c.getContext('2d');

  ctx.translate(200, 200);

  ctx.beginPath();
  ctx.moveTo(-200, 0);
  ctx.lineTo(200, 0);
  ctx.stroke();
  ctx.moveTo(0, -200);
  ctx.lineTo(0, 200);
  ctx.stroke();

  ctx.font = '12px Arial';

  disegnaTestoSuCartesiano(ctx, -200, -200, `m=${ m.value } q=${ q.value }`);
  disegnaFunzione(ctx, m.value * 1, q.value * 1);

  btnSalva.disabled = false;
  btnDisegna.disabled = true;
};


const salvaDati = () => {
  console.log('salvo...');

  ss.setItem('m', m.value);
  ss.setItem('q', q.value);
};

const caricaDati = () => {
  console.log('carico...');

  m.value = ss.getItem('m');
  q.value = ss.getItem('q');

  if (!validaCampi()) {
    m.classList.remove('is-invalid');
    q.classList.remove('is-invalid');
  }

  m.classList.add('is-valid');
  q.classList.add('is-valid');

  btnCarica.disabled = true;
};


document.getElementById('btnDisegna').addEventListener('click', disegnaCanvas);
document.getElementById('btnClear').addEventListener('click', pulisciCanvas);
document.getElementById('btnSalva').addEventListener('click', salvaDati);
document.getElementById('btnCarica').addEventListener('click', caricaDati);