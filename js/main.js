const qs=id=>document.getElementById(id)
const root=document.documentElement
const overlay=qs('overlay')

const STATE={
shape:'rectangle',
colors:['#00eaff','#00ffd5','#7a5cff','#0066ff'],
glow:90,
border:4,
angle:90,
obs:false
}

function lerp(a,b,t){return a+(b-a)*t}

/* URL MODE */
function checkURLMode(){
const p=new URLSearchParams(location.search)
if(p.get('overlay')==='1'){
document.body.classList.add('overlay-only')
}
if(p.has('state')){
try{
Object.assign(STATE,JSON.parse(atob(p.get('state'))))
}catch(e){}
}
}

function apply(){
STATE.colors.forEach((c,i)=>root.style.setProperty(--c,c))
root.style.setProperty('--glow',STATE.glow+'px')
root.style.setProperty('--border',STATE.border+'px')
root.style.setProperty('--angle',STATE.angle+'deg')
overlay.className='overlay '+STATE.shape
document.body.classList.toggle('obs',STATE.obs)
}

let currentAngle=STATE.angle
function animate(){
currentAngle=lerp(currentAngle,STATE.angle,0.04)
root.style.setProperty('--angle',currentAngle+'deg')
requestAnimationFrame(animate)
}

/* UI */
qs('shape').onchange=e=>{STATE.shape=e.target.value;apply()}
;['c1','c2','c3','c4'].forEach((id,i)=>{
qs(id).oninput=e=>{STATE.colors[i]=e.target.value;apply()}
})
qs('glow').oninput=e=>{STATE.glow=+e.target.value;apply()}
qs('border').oninput=e=>{STATE.border=+e.target.value;apply()}
qs('speed').oninput=e=>{STATE.angle+=+e.target.value}
qs('obs').onclick=()=>{STATE.obs=!STATE.obs;apply()}

qs('copyLink').onclick=()=>{
const encoded=btoa(JSON.stringify(STATE))
const base=location.href.split('?')[0]
navigator.clipboard.writeText(base+'?overlay=1&state='+encoded)
alert('Link OBS (overlay-only) copiado!')
}

checkURLMode()
apply()
animate()
