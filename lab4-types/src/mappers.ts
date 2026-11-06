import type {Patient,User} from './models.js';
import type {CreatePatientDto,PublicUserDto,UpdatePatientDto} from './dto.js';
export function toCreatePatientDto(p:Patient):CreatePatientDto {return {fullName:p.fullName,age:p.age,sex:p.sex,systolicBP:p.systolicBP,heartRate:p.heartRate,priorAdmissions:p.priorAdmissions,diabetes:p.diabetes,status:p.status,...(p.notes===undefined?{}:{notes:p.notes})}}
export function toUpdatePatientDto(p:Patient):UpdatePatientDto {return {status:p.status,heartRate:p.heartRate}}
export function toPublicUserDto(u:User):PublicUserDto{return {id:u.id,role:u.role,displayName:u.displayName}}
