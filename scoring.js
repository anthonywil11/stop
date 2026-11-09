export const CATEGORIES = ['Nombre','Apellido','Fruta','Animal','País','Famoso','Cosa'];
export function normalize(value) {return String(value||'').trim().toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ');}
export function validInitial(value,letter){return !!normalize(value) && normalize(value).startsWith(normalize(letter));}
export function scoreAnswers(players,letter,invalid=[]){
 const rejected = new Set(invalid);
 const result={};
 for(const p of players) result[p.id]={total:0,items:{}};
 for(const cat of CATEGORIES){
  const freq=new Map();
  for(const p of players){const word=normalize(p.answers?.[cat]);if(word && validInitial(word,letter) && !rejected.has(`${p.id}:${cat}`)) freq.set(word,(freq.get(word)||0)+1);}
  for(const p of players){const word=normalize(p.answers?.[cat]);const count=freq.get(word)||0;const points=!word||!validInitial(word,letter)||rejected.has(`${p.id}:${cat}`)?0:count===1?100:count===2?50:25;result[p.id].items[cat]=points;result[p.id].total+=points;}
 }
 return result;
}
