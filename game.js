const suspects = [
  { name: "アキラ", job: "会社員", image: "akira.svg", intro: "明るく社交的で、甘いものには目がない。", quote: "午後3時10分から3時20分までは、店の外で仕事の電話をしていたよ。ずっと電話していたから、ケーキを食べる時間なんてなかったはずだよ", clues: ["ミサキが戻ったとき、口元に白いクリームが付いていた。", "電話の履歴は残っているが、実際に誰とどのくらい話していたかは未確認。", "以前、この店のケーキを2つ食べたことがある。"] },
  { name: "サクラ", job: "デザイナー", image: "sakura.svg", intro: "几帳面な性格で、写真を撮ることが趣味。", quote: "私は窓際で写真を撮っていたよ。午後3時12分に撮った写真があるから、確認してみて", clues: ["写真にはケーキが3つしか写っていない。", "撮影前から2つなかったのか、撮影後になくなったのかは不明。", "写真を撮った後、スマートフォンを持って店の奥へ移動していた。"] },
  { name: "タクミ", job: "料理人", image: "takumi.svg", intro: "料理に詳しく、食べ物へのこだわりが強い。", quote: "午後3時10分から3時15分くらいまでは厨房にいたよ。紅茶のおかわりを準備していたんだ。ケーキには触っていないよ", clues: ["厨房のゴミ箱からケーキの包装紙が見つかった。", "ケーキを切り分けるためのナイフを扱える。", "ケーキの飾り付けについて、他の人より詳しい。"] },
  { name: "ミドリ", job: "学生", image: "midori.svg", intro: "おっちょこちょいだが、明るく親しみやすい性格。", quote: "私は午後3時10分から3時20分まで、本棚の前で本を読んでいたよ。ケーキのことなんて見ていなかったな", clues: ["テーブルの近くにミドリのハンカチが落ちていた。", "ケーキがなくなったことに、他の人より早く気づいていた。", "以前、冗談で『ここのケーキを全部食べてみたい』と話していた。"] }
];
const basicEvidence = [
  ["ケーキの数", "最初は5つ、現在は3つ。残った3つには一口も食べられた跡がない。"],
  ["フォーク", "テーブルに使用されたフォークが2本。どちらにもクリームとスポンジの跡が付いている。誰が使ったかは特定できない。"],
  ["イチゴのヘタ", "テーブルの下から2つ見つかった。ケーキのイチゴを食べた際に落ちたと考えられる。"],
  ["サクラの写真", "午後3時12分の写真にはケーキが3つしか写っていない。撮影時刻は正確。"],
  ["厨房の包装紙", "厨房のゴミ箱から今回のケーキと同じロゴの包装紙が見つかった。内側には同じクリームが付着。ただし、誰が捨てたかは不明。"],
  ["厨房の時計", "壁時計は午後3時14分から3時17分まで故障。タクミは厨房の時計で時間を確認していたため、正確な時刻は分からないと話す。"]
];
const extraEvidence = [
  ["店の外の防犯カメラ", "アキラは午後3時8分から3時16分まで店の外で電話をしていた。この間、店内に戻った様子はない。電話会社の記録にも午後3時9分から3時15分まで通話記録がある。"],
  ["サクラの撮影データ", "スマートフォンには午後3時11分から3時13分までの連続写真が保存されている。サクラ自身の影が窓際に映り、動いていない。最初の写真の時点ですでにケーキは3つだった。"],
  ["ミドリの読書記録と第三者の証言", "本には店内の読書記録用カードが挟まっていた。常連客ナオの証言：『午後3時8分から3時11分まで、ミドリさんを店内の席から見ていました。ずっと本棚の前の席で本を読み、一度も席を離れていませんでした』ナオは店内にいて、継続して確認できる位置にいた。"],
  ["厨房の出入口", "出入口は1つだけで、客席のテーブルのすぐ近く。厨房からテーブルまでは徒歩約5秒で、短時間だけ移動して戻ることは十分可能。入口付近には白いクリームが1滴落ちていた。"],
  ["タクミのエプロンに付着したスポンジ", "エプロンの裾にスポンジの細かな破片が付着。今回のショートケーキだけに使った特別な材料『ピスタチオパウダー』が、その破片にも含まれていた。店内の他のケーキや料理には使っていない。"],
  ["クリームの付着", "厨房入口付近のクリームと、タクミのエプロンに付着したクリームは、今回のケーキに使われたものと一致した。"]
];
const statements = [
  ["アキラ", "電話中に店内へ戻ったことはないよ。防犯カメラにも映っているんだろう？"],
  ["サクラ", "写真を撮るときに初めて3つしかないことに気づいたの"],
  ["タクミ", "厨房から出ていないよ。包装紙については、厨房で片付けをしていたときにゴミ箱に入れただけだよ"],
  ["ミドリ", "行っていないよ。ハンカチを落としたのはもっと前だと思う"]
];
const steps = ["事件の始まり", "容疑者の紹介", "現場の証拠", "追加調査", "最後の証言", "犯人を選ぶ", "事件の真相"];
let step = 0, selected = "", answered = false, resultCorrect = false;
const content = document.querySelector("#content"), navigation = document.querySelector("#navigation"), archive = document.querySelector("#archive");
function esc(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function story(){return `<div class="story"><p class="lead">ある日曜日の午後3時、喫茶店「ティールーム・ベル」でお茶会が開かれていた。</p><p>参加者は店主のミサキ、常連客のユウタ、そして4人の友人であるアキラ、サクラ、タクミ、ミドリ。</p><p>この日、ミサキはお茶会のために5つのショートケーキを用意していた。ケーキはすべて同じ大きさで、イチゴが1つずつ乗った特製のショートケーキだった。</p><p>お茶会が始まる直前、ミサキは5つのケーキをテーブルに並べ、全員にこう伝えた。</p><p class="quote">「今日は1人1つずつね。全員そろってから食べましょう」</p><p>しかし、午後3時20分。ミサキが厨房から戻ると、テーブルにはケーキが3つしか残っていなかった。</p><p>なくなったのは2つ。しかも、楽しみにしていたユウタは1つも食べられなかった。</p><p>4人はそれぞれ、自分は食べていないと主張した。しかし、話を聞いていくと、誰もが少しずつ怪しい行動をしていたことが分かった。</p><p class="lead">「犯人は誰なのか？ そして、なぜユウタはケーキを食べられなかったのか？」</p></div>`;}
function suspectCards(){return `<div class="cards">${suspects.map(s=>`<article class="card"><div class="card-head"><img class="suspect-avatar" src="images/${s.image}" alt="${s.name}の肖像"><div class="suspect-heading"><h3>${s.name}</h3><span class="job">${s.job}</span></div></div><p>${s.intro}</p><p class="quote-text"><img class="quote-avatar" src="images/${s.image}" alt="${s.name}"><span>「${s.quote}」</span></p><p class="suspicious"><strong>気になる点</strong><br>${s.clues.map(esc).join("<br>")}</p></article>`).join("")}</div>`;}
function evidenceCards(items){return `<div class="evidence-list">${items.map(([title,body],i)=>`<article class="evidence-card"><span class="evidence-number">${String(i+1).padStart(2,"0")}</span><div><h3>${esc(title)}</h3><p>${esc(body)}</p></div></article>`).join("")}</div>`;}
function clues(){return `<div class="note-card"><strong>推理のポイント</strong><p>ケーキがなくなった時刻と、それぞれの居場所を照らし合わせてみましょう。まだ結論は示されていません。公開された証拠を見返しながら、犯人と動機を考えてください。</p></div>`;}
function render(){
  document.querySelector("#chapter-count").textContent=`CHAPTER ${String(Math.min(step+1,6)).padStart(2,"0")} / 06`;
  document.querySelector("#progress").innerHTML=steps.slice(0,6).map((s,i)=>`<li class="${i===step?"active":i<step?"done":""}"><span class="num">${i<step?"✓":String(i+1).padStart(2,"0")}</span><span class="label">${s}</span></li>`).join("");
  let title="", body="";
  if(step===0){title="消えた2つのケーキ";body=`<p class="eyebrow">A SMALL MYSTERY AT TEA ROOM BELL</p>${story()}<div class="rule"></div><p class="small">公開情報を読み進め、最後に犯人を選んでください。</p>`;}
  if(step===1){title="4人の容疑者";body=`<p class="small">それぞれの証言と、気になる点を確認しましょう。</p>${suspectCards()}`;}
  if(step===2){title="テーブルに残された証拠";body=`<p class="small">現場で見つかった6つの証拠です。誰が犯人かは、まだ分かりません。</p>${evidenceCards(basicEvidence)}`;}
  if(step===3){title="追加調査";body=`<p class="small">調査で新たに分かったことを公開します。証拠を組み合わせて考えてみましょう。</p><button class="primary" id="reveal" type="button">追加証拠を確認する</button><div id="extra" class="${window.extraShown?"revealed":"hidden"}">${window.extraShown?evidenceCards(extraEvidence):""}</div>`;}
  if(step===4){title="最後の証言";body=`<p class="small">4人の最後の証言です。公開済みの情報も見返しながら、推理をまとめましょう。</p>${statements.map(([n,q])=>{const s=suspects.find(person=>person.name===n);return `<article class="statement-card"><img class="statement-avatar" src="images/${s.image}" alt="${n}"><div><h3>${n}</h3><p>「${esc(q)}」</p></div></article>`;}).join("")}<div class="rule"></div><h3>推理のポイント</h3><ul class="timeline"><li>ケーキがなくなったのは午後3時11分より前。</li><li>アキラは店外、サクラは窓際、ミドリは読書席にいたことがそれぞれ確認されている。</li><li>厨房とテーブルは約5秒の距離。タクミのエプロンには今回のケーキだけの材料入りスポンジが付着していた。</li><li>厨房のゴミ箱には今回の包装紙があり、エプロンのクリームもケーキのものと一致した。</li></ul>${clues()}`;}
  if(step===5){title="犯人は誰？";body=`<p class="lead">証拠をもとに、犯人だと思う人物を選んでください。</p><div class="choices" role="radiogroup" aria-label="犯人を選択">${suspects.map(s=>`<button type="button" class="choice ${selected===s.name?"selected":""}" role="radio" aria-checked="${selected===s.name}" data-name="${s.name}"><span class="radio"></span><span class="choice-name">${s.name}</span><span class="choice-role">${s.job}</span></button>`).join("")}</div><p class="inline-error" id="error"></p><button class="primary" id="submit-answer" type="button">推理を確定する</button>`;}
  if(step===6){title="事件の真相";body=resultPage();}
  content.innerHTML=`<h2>${title}</h2>${body}`;
  navigation.innerHTML=step<5?`${step>0?'<button class="secondary" id="prev" type="button">← 前へ</button>':'<span></span>'}<button class="primary" id="next" type="button">${step===0?"ゲームを始める":step===4?"犯人を選ぶ":"次へ"} →</button>`:step===5?'<span></span>':`<button class="primary" id="play-again" type="button">もう一度遊ぶ</button>`;
  document.querySelector("#prev")?.addEventListener("click",()=>go(step-1));
  document.querySelector("#next")?.addEventListener("click",()=>{if(step===3&&!window.extraShown){document.querySelector("#extra").classList.remove("hidden");document.querySelector("#extra").innerHTML=evidenceCards(extraEvidence);window.extraShown=true;document.querySelector("#next").textContent="次へ →";return;}go(step+1);});
  document.querySelector("#reveal")?.addEventListener("click",()=>{window.extraShown=true;render();});
  content.querySelectorAll(".choice").forEach(b=>b.addEventListener("click",()=>{selected=b.dataset.name;render();}));
  document.querySelector("#submit-answer")?.addEventListener("click",()=>{if(!selected){document.querySelector("#error").textContent="犯人を1人選んでください。";return;}if(confirm("犯人を決定しますか？ 回答後に正解と解説が表示されます")){resultCorrect=selected==="タクミ";answered=true;go(6);}});
  document.querySelector("#play-again")?.addEventListener("click",restart);
  renderArchive();
}
function resultPage(){return `<div class="result-banner ${resultCorrect?"":"wrong"}">${resultCorrect?"正解！事件の真相を見抜きました！":"残念、不正解です。事件の真相を確認してみましょう。"}</div>${resultCorrect?'<img class="solved-art" src="images/case-solved.svg" alt="タクミが新しいケーキを用意し、事件が解決した場面">':''}<p class="lead">犯人は料理人のタクミ。</p><p>決め手は、犯行時間帯が午後3時11分より前であること、他の3人は防犯カメラ・連続写真・第三者の証言でその時間帯の居場所が確認されていること、そしてタクミのエプロンに今回のケーキだけに使われたピスタチオパウダー入りのスポンジが付着していたことです。</p><p>厨房のゴミ箱から今回のケーキの包装紙が見つかり、エプロンには同じクリームも付着していました。厨房からテーブルまでは約5秒。タクミは一時的に客席へ移動し、ケーキを2つ食べて厨房に戻ったと考えられます。</p><div class="rule"></div><h3>犯行の流れ</h3><ol class="timeline"><li>お茶会が始まり、タクミは厨房で紅茶を準備する。</li><li>他の3人がそれぞれ別のことをしている間に、厨房から客席へ移動する。</li><li>テーブルのケーキを2つ食べ、使用したフォークや包装紙を片付ける。</li><li>厨房へ戻り、何事もなかったように振る舞う。</li><li>午後3時11分、サクラが写真を撮影。この時点ですでにケーキは3つだった。</li><li>午後3時20分、ミサキが事件に気づく。</li></ol><div class="rule"></div><h3>他の3人ではない理由</h3>${evidenceCards([["アキラ", "防犯カメラと通話記録で店外にいたことが確認されている。"],["サクラ", "午後3時11分から13分までの連続写真で窓際にいたことが確認されている。"],["ミドリ", "常連客ナオの証言で午後3時8分から11分まで席を離れていない。"],["タクミ", "厨房から客席へ移動でき、今回のケーキだけに使われた材料がエプロンから見つかった。"]])}<div class="rule"></div><h3>犯人の動機</h3><p>料理人のタクミは、今回のケーキの味に興味を持ち、つい1つ食べてしまった。ところが、あまりにもおいしかったため、もう1つ。ユウタの分までなくなってしまった。</p><p>タクミはユウタとミサキに謝罪し、新しいケーキを作ることを約束した。こうして「消えた2つのケーキ事件」は解決した。</p>`;}
function renderArchive(){archive.innerHTML=`<div class="archive-list">${steps.slice(0,6).map((s,i)=>`<button type="button" class="archive-button ${i<=step?"":"locked"} ${i===step?"current":""}" ${i<=step?`data-step="${i}"`:"disabled"}>${String(i+1).padStart(2,"0")}　${s}</button>`).join("")}</div>`;archive.querySelectorAll("[data-step]").forEach(b=>b.addEventListener("click",()=>go(Number(b.dataset.step))));}
function go(n){if(n<0||n>6)return;if(n===6&&!answered)return;step=n;render();window.scrollTo({top:0,behavior:"smooth"});}
function restart(){if(confirm("ゲームを最初からやり直しますか？ 公開した情報と回答はリセットされます。")){step=0;selected="";answered=false;window.extraShown=false;render();window.scrollTo({top:0,behavior:"smooth"});}}
document.querySelector("#restart").addEventListener("click",restart);render();
