import {useEffect,useState} from 'react';
import {api} from '../api';
import type {Patient} from '../types';
export function usePatients(page:number,q:string,refresh:number){const [items,setItems]=useState<Patient[]>([]);const [total,setTotal]=useState(0);const [loading,setLoading]=useState(true);const [error,setError]=useState('');useEffect(()=>{const controller=new AbortController();setLoading(true);setError('');api.list(page,5,q,controller.signal).then(r=>{if(controller.signal.aborted)return;if(r.ok){setItems(r.data.items);setTotal(r.data.total)}else setError(r.error.message)}).finally(()=>{if(!controller.signal.aborted)setLoading(false)});return()=>controller.abort()},[page,q,refresh]);return {items,total,loading,error}}
