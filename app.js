const KEY='sat_v2_entries';
const ACADEMY=[
 ['01','Base de dados pessoal','Regista sessões de forma consistente antes de tentar tirar conclusões.'],
 ['02','Multiplicadores','Observa distribuição, média e extremos sem confundir histórico com previsão.'],
 ['03','Bónus','Marca momentos de bónus e compara-os com o teu próprio histórico.'],
 ['04','Contexto','Adiciona notas sobre duração da sessão, jogo e condições relevantes.'],
 ['05','Disciplina','Define limites de sessão e usa o tracker para rever decisões passadas.'],
 ['06','Revisão','Exporta os dados e procura padrões descritivos, não garantias de resultado.']
];
const $=id=>document.getElementById(id);
let entries=load();
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(entries));render()}catch{alert('Não foi possível guardar os dados neste browser.')}}
function render(){
 const sorted=[...entries].sort((a,b)=>b.ts-a.ts);
 $('historyBody').innerHTML=sorted.map(e=>'<tr><td>'+new Date(e.ts).toLocaleDateString('pt-PT')+'</td><td>'+esc(e.game)+'</td><td>€'+e.result.toFixed(2)+'</td><td>'+e.mult.toFixed(2)+'x</td><td>'+esc(e.bonus)+'</td><td>'+esc(e.note||'')+'</td></tr>').join('');
 $('emptyState').style.display=sorted.length?'none':'block';
 const mults=entries.map(e=>e.mult), avg=mults.length?mults.reduce((a,b)=>a+b,0)/mults.length:0, best=mults.length?Math.max(...mults):0,total=entries.reduce((a,b)=>a+b.result,0),bonus=entries.filter(e=>e.bonus==='Sim').length;
 $('hero-records').textContent=entries.length;$('hero-avg').textContent=fmtx(avg);$('hero-best').textContent=fmtx(best);
 $('stat-total').textContent='€'+total.toFixed(2);$('stat-avg').textContent=fmtx(avg);$('stat-best').textContent=fmtx(best);$('stat-bonus').textContent=bonus;
 const recent=mults.slice(-24);
 $('hero-spark').innerHTML=recent.map(m=>'<span class="spark-bar" style="height:'+Math.min(100,Math.max(4,m/(best||1)*100))+'%"></span>').join('')||'<span class="spark-empty">Sem dados para mostrar.</span>';
 $('chart').innerHTML=mults.slice(-30).map(m=>'<div class="bar" style="height:'+Math.min(100,Math.max(4,m/(best||1)*100))+'%"></div>').join('')||'<div class="empty">Sem dados para mostrar.</div>';
}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function fmtx(n){return n.toFixed(2).replace('.',',')+'x'}
$('entryForm').addEventListener('submit',e=>{e.preventDefault();const game=$('game').value.trim(),result=Number($('result').value),mult=Number($('mult').value);if(!game||!Number.isFinite(result)||!Number.isFinite(mult)||mult<0){alert('Preenche um jogo e valores numéricos válidos.');return}entries.push({ts:Date.now(),game,result,mult,bonus:$('bonus').value,note:$('note').value.trim()});e.target.reset();save()});
$('clearBtn').addEventListener('click',()=>{if(confirm('Apagar todo o histórico deste browser?')){entries=[];save()}});
$('exportBtn').addEventListener('click',()=>{const rows=[['Data','Jogo','Resultado EUR','Multiplicador','Bónus','Nota'],...entries.map(e=>[new Date(e.ts).toISOString(),e.game,e.result,e.mult,e.bonus,e.note])];const csv=rows.map(r=>r.map(x=>'"'+String(x??'').replaceAll('"','""')+'"').join(',')).join('\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='slot-algorithm-tracker.csv';a.click();URL.revokeObjectURL(a.href)});
$('academyGrid').innerHTML=ACADEMY.map(x=>'<article class="academy-card"><div class="num">MÓDULO '+x[0]+'</div><h3>'+x[1]+'</h3><p>'+x[2]+'</p></article>').join('');
render();
