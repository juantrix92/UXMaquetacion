// Drawer & navegación
const drawer = document.getElementById('drawer');
document.getElementById('menuBtn').addEventListener('click', ()=> drawer.classList.toggle('open'));
const links = document.querySelectorAll('.drawer a, .btn[data-screen]');
const screens = document.querySelectorAll('main.screen');
function show(id){
  screens.forEach(s=>s.classList.remove('visible'));
  document.getElementById('screen-'+id).classList.add('visible');
  links.forEach(a=>a.classList.toggle('active', a.dataset.screen===id));
  drawer.classList.remove('open');
  loadComments(id);
}
links.forEach(a=>a.addEventListener('click', e=>{
  const id = e.currentTarget.dataset.screen;
  if(!id) return;
  e.preventDefault();
  show(id);
}));
show('home');

// Comentarios localStorage (mismo formato que web, clave diferente)
const fab = document.getElementById('fab');
const panel = document.getElementById('commentsPanel');
const closePanel = document.getElementById('closePanel');
const saveBtn = document.getElementById('saveComment');
const text = document.getElementById('commentText');
const list = document.getElementById('commentsList');
let current = 'home';
function storageKey(id){ return `m6:mobile:comments:${id}`; }
function loadComments(id){
  current = id;
  list.innerHTML = '';
  text.value = '';
  const data = JSON.parse(localStorage.getItem(storageKey(id))||'[]');
  data.forEach((t)=>{
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
