import {API_URL} from './config';
import {isRecord,isPatient,isPaginatedPatients,isRiskAssessment} from './guards';
import type {Patient,PatientInput,Paginated,Result,RiskAssessment} from './types';
async function request<T>(path:string,init:RequestInit,guard:(x:unknown)=>x is T):Promise<Result<T>>{
 let response:Response;
 try{response=await fetch(`${API_URL}${path}`,init)}catch(e){return {ok:false,error:{status:0,message:e instanceof DOMException&&e.name==='AbortError'?'Запрос отменён':'Нет связи с сервером'}}}
 let data:unknown;try{data=await response.json()}catch{data=undefined}
 if(!response.ok)return {ok:false,error:{status:response.status,message:isRecord(data)&&typeof data.message==='string'?data.message:`Ошибка HTTP ${response.status}`}};
 if(!guard(data))return {ok:false,error:{status:0,message:'Сервер вернул данные неправильного формата'}};
 return {ok:true,data};
}
const json=(method:string,value:PatientInput):RequestInit=>({method,headers:{'Content-Type':'application/json'},body:JSON.stringify(value)});
export const api={
 list:(page=1,limit=5,q='',signal?:AbortSignal)=>request<Paginated<Patient>>(`/api/patients?page=${page}&limit=${limit}&q=${encodeURIComponent(q)}`,{signal},isPaginatedPatients),
 get:(id:number)=>request<Patient>(`/api/patients/${id}`,{},isPatient),
 create:(input:PatientInput)=>request<Patient>('/api/patients',json('POST',input),isPatient),
 update:(id:number,input:PatientInput)=>request<Patient>(`/api/patients/${id}`,json('PUT',input),isPatient),
 assessment:(id:number)=>request<RiskAssessment>(`/api/assessments/${id}`,{},isRiskAssessment),
 async remove(id:number):Promise<Result<null>>{let res:Response;try{res=await fetch(`${API_URL}/api/patients/${id}`,{method:'DELETE'})}catch{return {ok:false,error:{status:0,message:'Нет связи с сервером'}}}if(res.status===204)return {ok:true,data:null};let body:unknown;try{body=await res.json()}catch{body=null}return {ok:false,error:{status:res.status,message:isRecord(body)&&typeof body.message==='string'?body.message:'Не удалось удалить запись'}}}
};
