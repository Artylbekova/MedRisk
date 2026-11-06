// MedRisk educational REST API. In-memory only; no real patient information.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const port = Number(process.env.PORT || 3000);
const originAllowed = (process.env.ALLOWED_ORIGIN || 'http://localhost:5173').split(',');
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
const patients = db.patients;
function send(req,res,status,data) {
 const origin=req.headers.origin;
 if(originAllowed.includes(origin)) {res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Vary','Origin')}
 if(status===204){res.writeHead(204);return res.end()}
 res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data));
}
function body(req){return new Promise((resolve,reject)=>{let raw='';req.on('data',x=>{raw+=x;if(raw.length>100000){reject(new Error('Payload too large'));req.destroy()}});req.on('end',()=>{try{resolve(JSON.parse(raw||'null'))}catch{reject(new Error('Некорректный JSON'))}})})}
const isObj=x=>typeof x==='object'&&x!==null&&!Array.isArray(x);
function validate(x){
 if(!isObj(x))return 'Ожидается объект JSON';
 if(typeof x.fullName!=='string'||x.fullName.trim().length<2)return 'Укажите имя пациента (минимум 2 символа)';
 if(!Number.isInteger(x.age)||x.age<0||x.age>120)return 'Возраст должен быть от 0 до 120';
 if(!['male','female','other'].includes(x.sex))return 'Некорректное значение пола';
 if(!Number.isFinite(x.systolicBP)||x.systolicBP<60||x.systolicBP>260)return 'Систолическое давление должно быть от 60 до 260';
 if(!Number.isFinite(x.heartRate)||x.heartRate<30||x.heartRate>220)return 'Пульс должен быть от 30 до 220';
 if(!Number.isInteger(x.priorAdmissions)||x.priorAdmissions<0||x.priorAdmissions>100)return 'Некорректное число госпитализаций';
 if(typeof x.diabetes!=='boolean')return 'Поле диабета должно быть логическим';
 if(!['active','inactive'].includes(x.status))return 'Некорректный статус';
 return null;
}
function risk(p){let score=0.04+(p.age>=65?.18:p.age>=50?.08:0)+(p.systolicBP>=160?.18:p.systolicBP>=140?.10:0)+(p.heartRate>=100?.12:0)+Math.min(p.priorAdmissions*.10,.30)+(p.diabetes?.13:0);score=Math.min(.95,Math.round(score*100)/100);return {patientId:p.id,score,level:score>=.55?'high':score>=.25?'medium':'low',modelVersion:'educational-rules-v1',disclaimer:'Учебная демонстрация, не медицинский прогноз и не диагноз.'}}
async function handle(req,res){
 if(req.method==='OPTIONS'){const origin=req.headers.origin;if(originAllowed.includes(origin)){res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');res.setHeader('Vary','Origin')}res.writeHead(204);return res.end()}
 const u=new URL(req.url,'http://localhost');const parts=u.pathname.split('/').filter(Boolean);
 if(parts[0]!=='api')return send(req,res,404,{message:'Маршрут не найден'});
 if(parts[1]==='health'&&req.method==='GET')return send(req,res,200,{status:'ok'});
 if(parts[1]==='assessments'&&parts[2]&&req.method==='GET'){const p=patients.find(x=>x.id===Number(parts[2]));return p?send(req,res,200,risk(p)):send(req,res,404,{message:'Пациент не найден'})}
 if(parts[1]!=='patients')return send(req,res,404,{message:'Ресурс не найден'});
 if(!parts[2]){
  if(req.method==='GET'){const page=Math.max(1,Number(u.searchParams.get('page'))||1);const limit=Math.min(100,Math.max(1,Number(u.searchParams.get('limit'))||5));const q=(u.searchParams.get('q')||'').toLowerCase();const all=patients.filter(p=>p.fullName.toLowerCase().includes(q));return send(req,res,200,{items:all.slice((page-1)*limit,page*limit),total:all.length,page,limit})}
  if(req.method==='POST'){const x=await body(req);const error=validate(x);if(error)return send(req,res,422,{message:error});const p={fullName:x.fullName.trim(),age:x.age,sex:x.sex,systolicBP:x.systolicBP,heartRate:x.heartRate,priorAdmissions:x.priorAdmissions,diabetes:x.diabetes,status:x.status,id:Math.max(0,...patients.map(p=>p.id))+1,createdAt:new Date().toISOString()};patients.push(p);return send(req,res,201,p)}
  return send(req,res,405,{message:'Метод не поддерживается'});
 }
 const id=Number(parts[2]);if(!Number.isInteger(id)||id<=0)return send(req,res,400,{message:'Некорректный ID'});
 const index=patients.findIndex(p=>p.id===id);if(index<0)return send(req,res,404,{message:'Пациент не найден'});
 if(req.method==='GET')return send(req,res,200,patients[index]);
 if(req.method==='DELETE'){patients.splice(index,1);return send(req,res,204)}
 if(req.method==='PUT'){const x=await body(req);const error=validate(x);if(error)return send(req,res,422,{message:error});const p={fullName:x.fullName.trim(),age:x.age,sex:x.sex,systolicBP:x.systolicBP,heartRate:x.heartRate,priorAdmissions:x.priorAdmissions,diabetes:x.diabetes,status:x.status,id,createdAt:patients[index].createdAt};patients[index]=p;return send(req,res,200,p)}
 return send(req,res,405,{message:'Метод не поддерживается'});
}
http.createServer((req,res)=>{handle(req,res).catch(e=>send(req,res,e.message==='Некорректный JSON'?400:500,{message:e.message}))}).listen(port,()=>console.log(`MedRisk mock API: http://localhost:${port}/api/patients`));
