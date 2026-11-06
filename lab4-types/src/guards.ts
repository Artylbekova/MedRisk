import type {Patient} from './models.js';
import type {Paginated,Result} from './dto.js';
export function isRecord(v:unknown):v is Record<string,unknown>{return typeof v==='object'&&v!==null&&!Array.isArray(v)}
export function isPatient(v:unknown):v is Patient {if(!isRecord(v))return false;return Number.isInteger(v.id)&&typeof v.fullName==='string'&&v.fullName.length>=2&&Number.isInteger(v.age)&&v.age>=0&&v.age<=120&&['male','female','other'].includes(String(v.sex))&&typeof v.systolicBP==='number'&&Number.isFinite(v.systolicBP)&&typeof v.heartRate==='number'&&Number.isFinite(v.heartRate)&&Number.isInteger(v.priorAdmissions)&&typeof v.diabetes==='boolean'&&['active','inactive'].includes(String(v.status))&&typeof v.createdAt==='string'&&(v.notes===undefined||typeof v.notes==='string')}
export function isPaginatedPatients(v:unknown):v is Paginated<Patient>{return isRecord(v)&&Array.isArray(v.items)&&v.items.every(isPatient)&&Number.isInteger(v.total)&&Number.isInteger(v.page)&&Number.isInteger(v.limit)}
export function parsePatient(v:unknown):Result<Patient>{return isPatient(v)?{ok:true,data:v}:{ok:false,error:'Неверный формат пациента'}}
