



var
B= {

dt:{},//storage for places

Id(x){
return document.getElementById(x);
},

Id_It(el){
return typeof el === 'string' ? B.Id(el) : el;
},

prec(x,d){
return Math.round(x/d)*d;
},

nxt(el,ar,dir=1,pre=""){
let core = typeof el === "string" ? el.replace(pre,""):(pre=0,el);
let i = ar.indexOf(core)+dir;
return i>=ar.length ? pre+ar[0]: 
       i<0 ? pre+ar[ar.length-1]:
       pre+ar[i];
},



nxtInnTxt(el,ar,dir=1,pre=""){
if (Array.isArray(el)){
let outar=[];
for (ix=0; ix<el.length;ix++){outar[ix]=B.nxtInnTxt(el[ix],ar,dir,pre)}
return outar;
}else{
el = B.Id_It(el);
el.innerText = B.nxt(el.innerText,ar,dir,pre);
return el.innerText.replace(pre,"");}
},

set(mth,el){
B.dt[mth]=B.Id_It(el);
},


log(msg,where=B.dt.log,addy){

where = B.Id_It(where);
where.innerText = addy ? 
where.innerText+"\n" + msg : msg;
},

onOff(el){
el = B.Id_It(el);
el.style.display = el.style.display=='none' ? '':'none';
},

toggle(el){
el = B.Id_It(el);
if ($){
$("#"+el.id).animate({height:"toggle"});
}else{el.style.display = el.style.display=='none' ? '':'none';}
},



}