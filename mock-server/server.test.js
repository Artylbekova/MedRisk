const test=require('node:test');
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const path=require('node:path');
const port=31000+Math.floor(Math.random()*1000);
let server;
async function req(path,init){return fetch(`http://localhost:${port}${path}`,init)}
test('REST API integration',async t=>{
 server=spawn(process.execPath,[path.join(__dirname,'server.js')],{env:{...process.env,PORT:String(port)},stdio:'ignore'});
 t.after(()=>server.kill());
 let ok=false;for(let i=0;i<40;i++){try{const r=await req('/api/health');if(r.ok){ok=true;break}}catch{}await new Promise(r=>setTimeout(r,100))}assert.equal(ok,true);
 await t.test('pagination',async()=>{const r=await req('/api/patients?page=1&limit=2');assert.equal(r.status,200);const d=await r.json();assert.equal(d.items.length,2);assert.equal(d.total,6)});
 await t.test('validation',async()=>{const r=await req('/api/patients',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});assert.equal(r.status,422)});
 let id;
 await t.test('create',async()=>{const r=await req('/api/patients',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fullName:'Тестовая Пациентка',age:30,sex:'female',systolicBP:120,heartRate:70,priorAdmissions:0,diabetes:false,status:'active'})});assert.equal(r.status,201);id=(await r.json()).id;assert.ok(id)});
 await t.test('update',async()=>{const old=await(await req(`/api/patients/${id}`)).json();const r=await req(`/api/patients/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({...old,age:31})});assert.equal(r.status,200);assert.equal((await r.json()).age,31)});
 await t.test('assessment',async()=>{const r=await req(`/api/assessments/${id}`);assert.equal(r.status,200);assert.equal(typeof(await r.json()).score,'number')});
 await t.test('delete',async()=>{const r=await req(`/api/patients/${id}`,{method:'DELETE'});assert.equal(r.status,204);assert.equal((await req(`/api/patients/${id}`)).status,404)});
});
