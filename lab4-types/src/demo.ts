import {parsePatient} from './guards.js';import {toCreatePatientDto,toPublicUserDto} from './mappers.js';
const good={id:1,fullName:'Тестовый Пациент',age:45,sex:'other',systolicBP:120,heartRate:72,priorAdmissions:0,diabetes:false,status:'active',createdAt:'2026-11-01T00:00:00Z'};
const samples:unknown[]=[good,null,{}, {...good,age:'45'},{...good,status:'unknown'},{...good,diabetes:'false'}];
for(const [i,s] of samples.entries()){const r=parsePatient(s);console.log(`Тест ${i+1}:`,r.ok?'VALID':'INVALID');if(r.ok)console.log('DTO:',toCreatePatientDto(r.data))}
console.log('Public user:',toPublicUserDto({id:1,email:'demo@example.test',passwordHash:'secret',role:'doctor',displayName:'Тестовый Врач'}));
