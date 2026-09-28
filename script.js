
const seedTransfers=[
 {ref:"TRX-10482",date:"28 Sep 2026 10:42",sender:"Daniel Alier",receiver:"Mary James",route:"Juba → Wau",amount:50000,fee:500,status:"Completed",branch:"Juba Main"},
 {ref:"TRX-10481",date:"28 Sep 2026 10:35",sender:"Akot John",receiver:"Momo Peter",route:"Wau → Juba",amount:120000,fee:1800,status:"Pending",branch:"Wau"},
 {ref:"TRX-10480",date:"28 Sep 2026 10:10",sender:"Sarah Deng",receiver:"Akol John",route:"Juba → Malakal",amount:25000,fee:500,status:"Processing",branch:"Juba Main"},
 {ref:"TRX-10479",date:"28 Sep 2026 09:55",sender:"Mabior Kuol",receiver:"Lina Mary",route:"Yambio → Juba",amount:15000,fee:500,status:"Completed",branch:"Yambio"},
 {ref:"TRX-10478",date:"28 Sep 2026 09:30",sender:"James Bol",receiver:"Grace Nyang",route:"Malakal → Wau",amount:85000,fee:1275,status:"Completed",branch:"Malakal"},
 {ref:"TRX-10477",date:"28 Sep 2026 09:15",sender:"Peter Deng",receiver:"Awan Riak",route:"Juba → Wau",amount:30000,fee:500,status:"Cancelled",branch:"Juba Main"}
];
let transfers=JSON.parse(localStorage.getItem("dusiTransfers")||"null")||seedTransfers;
const payouts=[
 ["TRX-10470","Akol John","+211 923 456 789","Juba Main","50,000","10:05","Ready"],
 ["TRX-10469","Momo Peter","+211 977 120 441","Wau","120,000","09:50","Paid"],
 ["TRX-10468","Lina Mary","+211 925 671 333","Malakal","85,000","09:20","Verification"],
 ["TRX-10467","Grace Nyang","+211 921 220 551","Yambio","35,000","08:58","Paid"]
];
const deposits=[
 ["DEP-8821","28 Sep 2026","Juba Main","Juba Teller","250,000","220,000","30,000","Reconciled"],
 ["DEP-8820","28 Sep 2026","Wau","Wau Teller","180,000","160,000","20,000","Reconciled"],
 ["DEP-8819","27 Sep 2026","Malakal","Malakal Teller","310,000","300,000","10,000","Pending"],
 ["DEP-8818","27 Sep 2026","Yambio","Yambio Teller","145,000","145,000","0","Reconciled"]
];
const customers=[
 ["Momo Momo","+211 923 000 111","SS-458921","Juba Main","42","SSP 1,240,000","Verified"],
 ["Akol John","+211 923 456 789","SS-771020","Wau","18","SSP 520,000","Verified"],
 ["Mary James","+211 925 111 222","SS-230811","Juba Main","11","SSP 330,000","Pending"],
 ["Sarah Deng","+211 977 441 220","SS-880121","Malakal","27","SSP 890,000","Verified"]
];
const branches=[
 ["Juba Main","Juba Town","SSP 680,000","84","92"],
 ["Wau","Wau Town","SSP 320,000","51","74"],
 ["Malakal","Malakal Town","SSP 180,000","36","61"],
 ["Yambio","Yambio Town","SSP 120,000","22","48"],
 ["Bor","Bor Town","SSP 96,000","18","38"],
 ["Rumbek","Rumbek Town","SSP 74,000","14","31"]
];

function money(n){return Number(n).toLocaleString("en-US")}
function statusPill(s){let c=s==="Completed"||s==="Paid"||s==="Reconciled"||s==="Verified"||s==="Active"?"green":(s==="Pending"||s==="Processing"||s==="Ready"||s==="Limited"||s==="Review"||s==="Verification"?"orange":"red");return `<span class="pill ${c}">${s}</span>`}
function renderDashboard(){
 document.getElementById("recentList").innerHTML=transfers.slice(0,4).map(t=>`<div class="tx"><div class="tx-avatar">${t.sender.split(" ").map(x=>x[0]).join("").slice(0,2)}</div><div class="tx-info"><b>${t.sender}</b><span>${t.ref} · ${t.route}</span></div><div class="tx-amt"><b>SSP ${money(t.amount)}</b><small>${t.status}</small></div></div>`).join("");
 const vals=[58,82,63,95,72,88,78], days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
 document.getElementById("volumeChart").innerHTML=vals.map((v,i)=>`<div class="bar-col"><em>${v}</em><div class="bar" style="height:${v}%"></div><label>${days[i]}</label></div>`).join("");
 document.getElementById("dashboardBranches").innerHTML=branches.slice(0,3).map(b=>branchCard(b)).join("");
}
function branchCard(b){return `<div class="branch"><div class="branch-top"><div><h4>${b[0]}</h4><p>⌖ ${b[1]}</p></div><span class="pill green">Open</span></div><div class="amount">${b[2]}</div><p style="font-size:10px;color:var(--muted);margin-bottom:8px">${b[3]} transfers today</p><div class="progress"><span style="width:${b[4]}%"></span></div><p style="font-size:9px;color:var(--muted);margin-top:7px">${b[4]}% daily target</p></div>`}
function renderTransfers(){
 const q=(document.getElementById("transferSearch")?.value||"").toLowerCase(), st=document.getElementById("transferStatus")?.value||"", br=document.getElementById("transferBranch")?.value||"";
 const rows=transfers.filter(t=>(!q||JSON.stringify(t).toLowerCase().includes(q))&&(!st||t.status===st)&&(!br||t.branch===br));
 document.getElementById("transferTable").innerHTML=rows.length?rows.map(t=>`<tr><td><b>${t.ref}</b></td><td>${t.date}</td><td>${t.sender}</td><td>${t.receiver}</td><td>${t.route}</td><td><b>SSP ${money(t.amount)}</b></td><td>SSP ${money(t.fee)}</td><td>${statusPill(t.status)}</td><td><button class="btn btn-light" onclick="printReceipt('${t.ref}')">Receipt</button></td></tr>`).join(""):`<tr><td colspan="9"><div class="empty">No matching transfers found.</div></td></tr>`;
}
function renderPayouts(){document.getElementById("payoutTable").innerHTML=payouts.map(p=>`<tr>${p.slice(0,6).map((x,i)=>`<td>${i===4?"SSP "+x:x}</td>`).join("")}<td>${statusPill(p[6])}</td><td><button class="btn btn-light" onclick="showToast('Payout verification screen opened')">Verify</button></td></tr>`).join("")}
function renderDeposits(){document.getElementById("depositTable").innerHTML=deposits.map(p=>`<tr>${p.map((x,i)=>`<td>${i===4||i===5||i===6?"SSP "+x:(i===7?statusPill(x):x)}</td>`).join("")}</tr>`).join("")}
function renderBranches(){document.getElementById("branchGrid").innerHTML=branches.map(branchCard).join("")}
function renderCustomers(){const q=(document.getElementById("customerSearch")?.value||"").toLowerCase();document.getElementById("customerTable").innerHTML=customers.filter(c=>c.join(" ").toLowerCase().includes(q)).map(c=>`<tr><td><b>${c[0]}</b></td><td>${c[1]}</td><td>${c[2]}</td><td>${c[3]}</td><td>${c[4]}</td><td>${c[5]}</td><td>${statusPill(c[6])}</td><td><button class="btn btn-light" onclick="showToast('Customer profile opened')">View</button></td></tr>`).join("")}
function selectSendMethod(btn){document.querySelectorAll('.send-method').forEach(x=>x.classList.remove('active'));btn.classList.add('active');showToast(btn.querySelector('b').textContent+' selected');}
function updateSendSummary(){const amount=Number(document.getElementById('sendAmount')?.value||0),fee=amount<=50000?500:Math.round(amount*.015),from=document.getElementById('sendFromBranch')?.value||'Juba Main',to=document.getElementById('sendToBranch')?.value||'Wau',recipient=document.getElementById('sendRecipient')?.value.trim()||'—';document.getElementById('summaryRecipient').textContent=recipient;document.getElementById('summaryRoute').textContent=from+' → '+to;document.getElementById('summaryAmount').textContent='SSP '+money(amount);document.getElementById('summaryFee').textContent='SSP '+money(fee);document.getElementById('summaryTotal').textContent='SSP '+money(amount+fee);document.getElementById('summaryGrand').textContent='SSP '+money(amount+fee);}
function submitCustomerSend(){const customer=document.getElementById('sendCustomer').value.trim(),phone=document.getElementById('sendCustomerPhone').value.trim(),recipient=document.getElementById('sendRecipient').value.trim(),rphone=document.getElementById('sendRecipientPhone').value.trim(),amount=Number(document.getElementById('sendAmount').value),from=document.getElementById('sendFromBranch').value,to=document.getElementById('sendToBranch').value;if(!customer||!phone||!recipient||!rphone||!amount){showToast('Please complete sender, recipient and amount');return}const fee=amount<=50000?500:Math.round(amount*.015),t={ref:'TRX-'+(10500+transfers.length),date:new Date().toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}),sender:customer,receiver:recipient,route:from+' → '+to,amount,fee,status:'Pending',branch:from};transfers.unshift(t);localStorage.setItem('dusiTransfers',JSON.stringify(transfers));renderAll();renderSendHistory();showToast(t.ref+' created — ready for KYC/approval');clearSendForm(false);}
function clearSendForm(resetMessage=true){['sendCustomer','sendCustomerPhone','sendRecipient','sendRecipientPhone','sendAmount','sendCustomerId','sendNote'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});updateSendSummary();if(resetMessage)showToast('Send form cleared')}
function renderSendHistory(){const el=document.getElementById('sendHistory');if(!el)return;el.innerHTML=transfers.slice(0,4).map(t=>`<div class="tx"><div class="tx-avatar">${t.sender.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div class="tx-info"><b>${t.sender} → ${t.receiver}</b><span>${t.ref} · ${t.route}</span></div><div class="tx-amt"><b>SSP ${money(t.amount)}</b><small>${t.status}</small></div></div>`).join('')}
function createTransfer(){
 const sender=document.getElementById("sender").value.trim(), receiver=document.getElementById("receiver").value.trim(), amount=Number(document.getElementById("amount").value);
 if(!sender||!receiver||!amount){showToast("Please enter sender, receiver and amount");return}
 const t={ref:"TRX-"+(10500+transfers.length),date:new Date().toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}),sender,receiver,route:document.getElementById("sendBranch").value+" → "+document.getElementById("receiveBranch").value,amount,fee:amount<=50000?500:Math.round(amount*.015),status:"Pending",branch:document.getElementById("sendBranch").value};
 transfers.unshift(t);localStorage.setItem("dusiTransfers",JSON.stringify(transfers));closeModal("transferModal");document.getElementById("sender").value="";document.getElementById("receiver").value="";document.getElementById("amount").value="";renderAll();showToast(t.ref+" created successfully");}
function printReceipt(ref){
 const t=transfers.find(x=>x.ref===ref);if(!t)return;
 const w=window.open("","_blank","width=500,height=650");
 if(!w){showToast("Please allow pop-ups to print the receipt");return}
 const esc=v=>String(v).replace(/[&<>\"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
 const html='<!doctype html><html><head><title>'+esc(t.ref)+'</title><style>body{font-family:Arial;padding:35px;color:#15221b}h1{color:#08a64a}.box{border:1px solid #ddd;padding:18px;border-radius:12px}p{display:flex;justify-content:space-between;border-bottom:1px solid #eee;padding:8px 0}small{color:#777}</style></head><body><h1>DusiTransfer</h1><small>Money Transfer Receipt</small><div class="box">'
   +'<p><b>Reference</b><span>'+esc(t.ref)+'</span></p>'
   +'<p><b>Sender</b><span>'+esc(t.sender)+'</span></p>'
   +'<p><b>Receiver</b><span>'+esc(t.receiver)+'</span></p>'
   +'<p><b>Route</b><span>'+esc(t.route)+'</span></p>'
   +'<p><b>Amount</b><span>SSP '+money(t.amount)+'</span></p>'
   +'<p><b>Fee</b><span>SSP '+money(t.fee)+'</span></p>'
   +'<p><b>Status</b><span>'+esc(t.status)+'</span></p>'
   +'<p><b>Date</b><span>'+esc(t.date)+'</span></p>'
   +'</div><p><small>This is a demo receipt. Connect to your backend before production use.</small></p></body></html>';
 w.document.open();w.document.write(html);w.document.close();
 setTimeout(()=>w.print(),250);
}
function exportCSV(type){let rows=[];if(type==="transfers"){rows=[["Reference","Date","Sender","Receiver","Route","Amount","Fee","Status"],...transfers.map(t=>[t.ref,t.date,t.sender,t.receiver,t.route,t.amount,t.fee,t.status])]}else if(type==="deposits"){rows=[["ID","Date","Branch","Agent","Cash In","Bank Deposit","Balance","Status"],...deposits]}else{rows=[["Customer","Phone","ID","Branch","Transfers","Total Sent","KYC"],...customers]};const csv=rows.map(r=>r.map(x=>`"${String(x).replaceAll('"','""')}"`).join(",")).join("\\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download=type+"-export.csv";a.click();URL.revokeObjectURL(a.href);showToast("CSV exported")}
function toggleAccess(btn){btn.classList.toggle('on');showToast(btn.classList.contains('on')?'Access enabled':'Access restricted')}
function toggleMobileMenu(force){const sidebar=document.querySelector('.sidebar'),overlay=document.getElementById('mobileOverlay');const open=force===undefined?!sidebar.classList.contains('mobile-open'):force;sidebar.classList.toggle('mobile-open',open);overlay.classList.toggle('open',open)}
function filterStaff(){const q=(document.getElementById('staffSearch')?.value||'').toLowerCase();const role=document.getElementById('staffRoleFilter')?.value||'';document.querySelectorAll('#staffTable tr').forEach(tr=>{const txt=tr.textContent.toLowerCase();tr.style.display=(!q||txt.includes(q))&&(!role||txt.includes(role.toLowerCase()))?'':'none'})}
function go(section){document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));const target=document.getElementById(section);if(!target)return;target.classList.add("active");document.querySelectorAll("[data-section]").forEach(a=>a.classList.toggle("active",a.dataset.section===section));toggleMobileMenu(false);window.scrollTo({top:0,behavior:"smooth"})}
function openModal(id){document.getElementById(id).classList.add("open")}
function closeModal(id){document.getElementById(id).classList.remove("open")}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2800)}
document.querySelectorAll("[data-section]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();go(a.dataset.section)}));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open")}));
document.getElementById("globalSearch").addEventListener("input",e=>{const q=e.target.value.toLowerCase();if(q){go("transfers");document.getElementById("transferSearch").value=q;renderTransfers()}});
function renderAll(){renderDashboard();renderTransfers();renderPayouts();renderDeposits();renderBranches();renderCustomers();renderSendHistory();updateSendSummary();document.getElementById("statTransfers").textContent=transfers.length+122}
renderAll();

function toast(msg){ if(typeof showToast==='function'){showToast(msg)} else {alert(msg)} }
function simulateRole(btn,role){document.querySelectorAll('.role-list button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const d={"Super Admin":"All branches, all operational modules and permission management.","Branch Manager":"Own branch operations, staff, cash, approvals and reconciliation.","Agent / Teller":"Customer-facing transactions, payouts, deposits and assigned branch work.","Finance":"Reconciliation, settlements, commissions and financial reports.","HR":"Employee lifecycle, leave, training and workforce administration.","Compliance":"KYC review, risk holds, investigations and compliance reporting.","Auditor":"Read-only evidence, audit trails, reports and controlled exports."};document.getElementById('simRole').textContent=role;document.getElementById('simDesc').textContent=d[role]||'';}
