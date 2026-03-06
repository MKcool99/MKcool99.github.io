// Set your backend URL here. Use the Render URL when deployed.
const API_BASE = 'https://backend1-2mjj.onrender.com'; // <-- update to your Render backend URL
// For local development, you can use: const API_BASE = '';

// Countries to guess (name + central coordinates). Threshold in km for "correct".
const targets = [
  {id:'fr',name:'France',lat:46.2276,lng:2.2137,threshold:300},
  {id:'br',name:'Brazil',lat:-14.2350,lng:-51.9253,threshold:700},
  {id:'jp',name:'Japan',lat:36.2048,lng:138.2529,threshold:300},
  {id:'za',name:'South Africa',lat:-30.5595,lng:22.9375,threshold:700}
];

const completedKey = 'blind-country-completed';
const userIdKey = 'blind-country-userid';

const map = L.map('map', {attributionControl: false, zoomControl:true}).setView([20,0],2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18}).addTo(map);

let state = {index:0,guesses:[]};
const stateArea = document.getElementById('stateArea');

function kmDistance(a,b){
  const R=6371; const toRad=Math.PI/180; const dLat=(b.lat-a.lat)*toRad; const dLon=(b.lng-a.lng)*toRad;
  const lat1=a.lat*toRad,lat2=b.lat*toRad;
  const sinHalfLat=Math.sin(dLat/2), sinHalfLon=Math.sin(dLon/2);
  const h = sinHalfLat*sinHalfLat + Math.cos(lat1)*Math.cos(lat2)*sinHalfLon*sinHalfLon;
  return 2*R*Math.asin(Math.sqrt(h));
}

function renderState(){
  if(localStorage.getItem(completedKey)){
    renderResultsScreen(); return;
  }
  // show current target and guesses list
  const cur = targets[state.index];
  stateArea.innerHTML = '';
  const h = document.createElement('h2'); h.textContent = 'Current Guess'; stateArea.appendChild(h);
  const row = document.createElement('div'); row.className='country-row';
  const name = document.createElement('div'); name.innerHTML = `<div class="country-name">${cur.name}</div><div class="small muted">Guess ${state.index+1} of ${targets.length}</div>`;
  const info = document.createElement('div'); info.innerHTML = '<div class="small">Click map to place your guess</div>';
  row.appendChild(name); row.appendChild(info);
  stateArea.appendChild(row);
  const guide = document.createElement('p'); guide.className='small'; guide.textContent='No borders are shown — click where you think the country is.'; stateArea.appendChild(guide);

  const guessesTitle = document.createElement('h3'); guessesTitle.textContent='Your guesses'; stateArea.appendChild(guessesTitle);
  const list = document.createElement('div'); list.className='results-list';
  state.guesses.forEach((g,i)=>{
    const s = document.createElement('div'); s.className='submission'; s.innerHTML = `<div style="display:flex;justify-content:space-between"><div>${targets[i].name}</div><div class="small">lat ${g.lat.toFixed(2)}, lon ${g.lng.toFixed(2)}</div></div>`;
    list.appendChild(s);
  });
  stateArea.appendChild(list);
}

async function renderResultsScreen(){
  // fetch all submissions from server
  let subs = [];
  try {
    const resp = await fetch(`${API_BASE}/api/submissions`);
    subs = await resp.json();
  } catch(e) { subs = []; }
  // our submission
  let my = null;
  const userId = localStorage.getItem(userIdKey);
  if(userId) my = subs.find(s => s.userId === userId);
  stateArea.innerHTML = '';
  const title = document.createElement('h2'); title.textContent='Results'; stateArea.appendChild(title);
  const note = document.createElement('p'); note.className='small muted'; note.textContent='This browser has completed the challenge and can no longer guess.'; stateArea.appendChild(note);

  // show each target with markers on the map
  map.eachLayer(l=>{ if(l.options && l.options.pane==='markerPane') try{map.removeLayer(l);}catch(e){} });

  const grid = document.createElement('div'); grid.style.display='flex'; grid.style.flexDirection='column'; grid.style.gap='8px';

  targets.forEach((t,idx)=>{
    const wrap = document.createElement('div'); wrap.className='card'; wrap.style.padding='8px'; wrap.style.display='flex'; wrap.style.flexDirection='column';
    const header = document.createElement('div'); header.style.display='flex'; header.style.justifyContent='space-between'; header.innerHTML=`<div><strong>${t.name}</strong></div><div class='badge'>radius ${t.threshold}km</div>`;
    wrap.appendChild(header);
    // plot true location marker
    const trueMarker = L.circleMarker([t.lat,t.lng],{radius:8,color:'#00796b',fill:'#b2dfdb'}).addTo(map);
    trueMarker.bindPopup(`${t.name} (true)`).openPopup();
    // plot my guess if exists
    if(my){
      const g = my.guesses[idx];
      const m = L.marker([g.lat,g.lng],{title:'Your guess'}).addTo(map);
      m.bindPopup(`${t.name} — your guess<br>distance ${Math.round(g.distance)} km<br>${g.correct?'<strong style=color:green>Correct</strong>':'<strong style=color:red>Incorrect</strong>'}`);
    }
    // show other people's answers summary
    const others = subs.map(s=>s.guesses[idx]);
    const list = document.createElement('div'); list.className='small'; list.textContent = 'All submissions: ' + others.map(o=>`${o.lat.toFixed(1)},${o.lng.toFixed(1)} (${Math.round(o.distance)}km)`).join(' | ');
    wrap.appendChild(list);
    grid.appendChild(wrap);
  });

  stateArea.appendChild(grid);

  // summary of totals
  const summary = document.createElement('div'); summary.style.marginTop='12px';
  const myScore = my? my.guesses.filter(g=>g.correct).length : 0;
  summary.innerHTML = `<div><strong>Your correct:</strong> ${myScore} / ${targets.length}</div><div class='small muted'>Submissions stored on server.</div>`;
  stateArea.appendChild(summary);

  // zoom to fit markers
  const allLatLngs = [];
  targets.forEach(t=>allLatLngs.push([t.lat,t.lng]));
  if(my) my.guesses.forEach(g=>allLatLngs.push([g.lat,g.lng]));
  if(allLatLngs.length) map.fitBounds(allLatLngs,{padding:[40,40]});
}

// click handler for mapping guesses
map.on('click', async function(e){
  if(localStorage.getItem(completedKey)) return renderResultsScreen();
  if(state.index>=targets.length) return;
  const pos = {lat:e.latlng.lat, lng:e.latlng.lng};
  const target = targets[state.index];
  const dist = kmDistance(pos, target);
  const correct = dist <= target.threshold;
  state.guesses.push({lat:pos.lat,lng:pos.lng,distance:dist,correct:correct});
  // show temporary marker and popup
  const mark = L.circleMarker([pos.lat,pos.lng],{radius:6,color:'#ff6a00',fill:'#ffd9b3'}).addTo(map);
  mark.bindPopup(`${target.name}<br>dist ${Math.round(dist)} km<br>${correct?'<strong style=color:green>Correct</strong>':'<strong style=color:red>Incorrect</strong>'}`).openPopup();
  state.index++;
  if(state.index>=targets.length){
    // finished - record submission
    let userId = localStorage.getItem(userIdKey);
    if(!userId){ userId = Math.random().toString(36).slice(2)+Date.now(); localStorage.setItem(userIdKey,userId); }
    try {
      await fetch(`${API_BASE}/api/submit`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({userId, guesses: state.guesses})
      });
    } catch(e) {}
    localStorage.setItem(completedKey,'1');
    // show results
    setTimeout(()=>renderResultsScreen(),600);
  } else {
    renderState();
  }
});

// initial render
if(localStorage.getItem(completedKey)){
  // when returning, show results using stored submissions
  renderResultsScreen();
} else {
  renderState();
}
