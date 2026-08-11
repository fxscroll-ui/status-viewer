(() => {
"use strict";
const DATA="data/database.json";
const s={all:[],filtered:[],page:1,size:25,key:"transactionNumber",dir:1};
const $=id=>document.getElementById(id);

document.addEventListener("DOMContentLoaded",()=>{bind();load()});
function bind(){
  $("search").addEventListener("input",filter);
  ["department","status","account"].forEach(id=>$(id).addEventListener("change",filter));
  $("pageSize").addEventListener("change",()=>{s.size=+$("pageSize").value;s.page=1;render()});
  $("clear").addEventListener("click",()=>{["search","department","status","account"].forEach(id=>$(id).value="");s.page=1;filter()});
  $("prev").addEventListener("click",()=>{s.page--;render()});
  $("next").addEventListener("click",()=>{s.page++;render()});
  document.querySelectorAll("th[data-key]").forEach(th=>th.addEventListener("click",()=>{
    const k=th.dataset.key;s.dir=s.key===k?-s.dir:1;s.key=k;render();
  }));
}
async function load(){
  try{
    const r=await fetch(DATA+"?v="+Date.now(),{cache:"no-store"});
    if(!r.ok)throw new Error("Could not load data/database.json (HTTP "+r.status+").");
    const p=await r.json();s.all=Array.isArray(p)?p:(p.transactions||[]);
    fill("department",s.all.map(x=>x.department));fill("status",s.all.map(x=>x.status));fill("account",s.all.map(x=>x.accountCode));
    $("total").textContent=s.all.length.toLocaleString();
    $("withStatus").textContent=s.all.filter(x=>String(x.status||"").trim()).length.toLocaleString();
    $("pending").textContent=s.all.filter(x=>/pending|review|approval/i.test(x.status||"")).length.toLocaleString();
    const total=s.all.reduce((a,x)=>a+(Number(x.estimatedAmount)||0),0);
    $("amount").textContent=total.toLocaleString("en-PH",{style:"currency",currency:"PHP"});
    $("updated").textContent=p.meta?.generatedAt?"Database generated: "+new Date(p.meta.generatedAt).toLocaleString("en-PH"):"";
    $("loading").classList.add("hidden");filter();
  }catch(e){$("loading").classList.add("hidden");$("error").textContent=e.message;$("error").classList.remove("hidden")}
}
function fill(id,values){
  const el=$(id), first=el.options[0];el.innerHTML="";el.appendChild(first);
  [...new Set(values.filter(x=>x!==null&&x!==undefined&&String(x).trim()).map(String))].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})).forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;el.appendChild(o)});
}
function filter(){
  const q=$("search").value.toLowerCase().trim(),d=$("department").value,st=$("status").value,a=$("account").value;
  s.filtered=s.all.filter(x=>{const text=[x.transactionNumber,x.accountCode,x.particulars,x.department,x.referenceNumber,x.dvNumber,x.status].join(" ").toLowerCase();return(!q||text.includes(q))&&(!d||String(x.department)===d)&&(!st||String(x.status)===st)&&(!a||String(x.accountCode)===a)});
  s.page=1;render();
}
function render(){
  const rows=[...s.filtered].sort((a,b)=>{let x=a[s.key],y=b[s.key];if(s.key==="estimatedAmount")return((Number(x)||0)-(Number(y)||0))*s.dir;x=String(x??"").toLowerCase();y=String(y??"").toLowerCase();return(x<y?-1:x>y?1:0)*s.dir});
  const pages=Math.max(1,Math.ceil(rows.length/s.size));s.page=Math.min(Math.max(s.page,1),pages);
  const slice=rows.slice((s.page-1)*s.size,s.page*s.size),body=$("rows");body.innerHTML="";
  slice.forEach(x=>{const tr=document.createElement("tr");add(tr,x.transactionNumber,true);add(tr,x.particulars);add(tr,x.department);add(tr,x.estimatedAmount==null?"—":Number(x.estimatedAmount).toLocaleString("en-PH",{style:"currency",currency:"PHP"}),"amount");add(tr,x.referenceNumber);add(tr,x.dvNumber);
    const td=document.createElement("td"),b=document.createElement("span"),status=String(x.status||"No Status");b.className="status "+statusClass(status);b.textContent=status;td.appendChild(b);tr.appendChild(td);body.appendChild(tr)});
  $("count").textContent=rows.length.toLocaleString()+" matching transaction"+(rows.length===1?"":"s");
  $("page").textContent="Page "+s.page+" of "+pages;$("prev").disabled=s.page<=1;$("next").disabled=s.page>=pages;
  $("tableBox").classList.toggle("hidden",rows.length===0);$("empty").classList.toggle("hidden",rows.length!==0);
}
function add(tr,v,strong=false,cls=""){const td=document.createElement("td");td.className=cls;const t=v===null||v===undefined||v===""?"—":String(v);if(strong){const b=document.createElement("strong");b.textContent=t;td.appendChild(b)}else td.textContent=t;tr.appendChild(td)}
function statusClass(v){const s=v.toLowerCase();if(s.includes("approved"))return"approved";if(s.includes("completed"))return"completed";if(s.includes("pending")||s.includes("review")||s.includes("approval"))return"pending";if(s.includes("cancel"))return"cancelled";if(s.includes("reject"))return"rejected";if(s.includes("draft"))return"draft";return"unknown"}
})();
