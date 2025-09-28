// Navegación entre pantallas
const links = document.querySelectorAll('.topnav a, .btn[data-screen]');
const screens = document.querySelectorAll('main.screen');
function show(screenId){
  screens.forEach(s=>s.classList.remove('visible'));
  document.querySelector('#screen-'+screenId).classList.add('visible');
  links.forEach(a=>a.classList.toggle('active', a.dataset.screen===screenId));
  loadComments(screenId);
}
links.forEach(a=>a.addEventListener('click', e=>{
  const id = e.currentTarget.dataset.screen;
  if(!id) return;
  e.preventDefault();
  show(id);
}));
// Arranque
show('home');

// Comentarios por pantalla (localStorage)
const fab = document.getElementById('fab');
const panel = document.getElementById('commentsPanel');
const closePanel = document.getElementById('closePanel');
const saveBtn = document.getElementById('saveComment');
const text = document.getElementById('commentText');
const list = document.getElementById('commentsList');
let current = 'home';

function storageKey(id){ return `m6:web:comments:${id}`; }

function loadComments(id){
  current = id;
  list.innerHTML = '';
  text.value = '';
  const data = JSON.parse(localStorage.getItem(storageKey(id))||'[]');
  data.forEach((t,i)=>{
    const li = document.createElement('li');
    li.textContent = t;
    list.appendChild(li);
  });
}

saveBtn.addEventListener('click', ()=>{
  const val = text.value.trim();
  if(!val) return;
  const key = storageKey(current);
  const data = JSON.parse(localStorage.getItem(key)||'[]');
  data.push(val);
  localStorage.setItem(key, JSON.stringify(data));
  loadComments(current);
});

fab.addEventListener('click', ()=> panel.style.display='block');
closePanel.addEventListener('click', ()=> panel.style.display='none');
