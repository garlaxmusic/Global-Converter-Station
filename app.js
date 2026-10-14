const $=s=>document.querySelector(s);
const tabs=[...document.querySelectorAll(".source")];
const linkPanel=$("#linkPanel"),filePanel=$("#filePanel"),convert=$("#convert"),result=$("#result"),status=$("#status");
let ready=false;

function setStatus(text,ok=false){status.className="status"+(ok?" ready":"");status.innerHTML=`<span></span>${text}`}

tabs.forEach(tab=>tab.addEventListener("click",()=>{
 tabs.forEach(x=>x.classList.remove("active"));tab.classList.add("active");
 const link=tab.dataset.source==="link";
 linkPanel.classList.toggle("hidden",!link);filePanel.classList.toggle("hidden",link);
 ready=false;convert.disabled=true;result.classList.add("hidden");setStatus("Waiting for a source");
}));

[...document.querySelectorAll(".format-card")].forEach(card=>card.addEventListener("click",()=>{
 document.querySelectorAll(".format-card").forEach(x=>x.classList.remove("selected"));card.classList.add("selected");card.querySelector("input").checked=true;
}));

$("#inspect").addEventListener("click",()=>{
 const url=$("#url").value.trim();
 if(!url){setStatus("Paste a link first");return}
 try{new URL(url)}catch{setStatus("That doesn't look like a valid URL");return}
 $("#trackTitle").textContent=new URL(url).hostname.replace("www.","");
 $("#trackMeta").textContent="Link accepted · source details ready";
 result.classList.remove("hidden");ready=true;convert.disabled=false;setStatus("Source ready — choose a format",true);
});

$("#file").addEventListener("change",()=>{
 const f=$("#file").files[0];if(!f)return;
 $("#trackTitle").textContent=f.name;$("#trackMeta").textContent=`${(f.size/1024/1024).toFixed(1)} MB · local file`;
 result.classList.remove("hidden");ready=true;convert.disabled=false;setStatus("File ready — choose a format",true);
});

$("#reset").addEventListener("click",()=>{
 $("#url").value="";$("#file").value="";result.classList.add("hidden");ready=false;convert.disabled=true;setStatus("Waiting for a source");
});

convert.addEventListener("click",async()=>{
 if(!ready)return;
 const fmt=document.querySelector('input[name="fmt"]:checked').value;
 setStatus(`Preparing ${fmt.toUpperCase()} conversion…`);
 const url=$("#url").value.trim();
 try{
   const r=await fetch("/api/convert",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url,format:fmt})});
   const data=await r.json();
   if(!r.ok)throw new Error(data.error||"Conversion unavailable");
   setStatus("Conversion complete — download ready",true);
   $("#trackMeta").innerHTML=`<a style="color:var(--acid)" href="${data.downloadUrl}" download>Download ${fmt.toUpperCase()} ↗</a>`;
 }catch(e){setStatus(e.message)}
});

$("#themeBtn").addEventListener("click",()=>document.body.classList.toggle("bright"));
