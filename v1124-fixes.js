// v1124-fixes.js
// 2026.11.24 正式版專用的資料修正（放在 v1124-notes.js、official-fixes.js 之後載入）。
// 2026-11-28 對照官網 17 個職業頁面的結果：
// ① 官網說明文字有寫、本站舊的職業說明不同的 15 個技能，改成官網的說明（保留原本另外加的備註行）。
// ② 夜使者「楓幣攻擊」「忍影瞬殺」當初解析錯位：忍影瞬殺拿到楓幣攻擊的說明與前置（幸運術 5 級）。
// ③ 火毒大魔導新增的毒系技能沒有接上前置；閃雷悍將「閃光擊」前置雷鳴應為 30 級。
// ④ 說明裡殘留的「\\n」文字（來源資料跳脫過頭）換成真正的換行。
(function applyV1124Fixes() {
    if (typeof allProfessionsData === 'undefined') return;
    const jobOf = (en) => allProfessionsData[Object.keys(allProfessionsData).find(k => k.indexOf('(' + en + ')') >= 0)];
    const all = [];
    Object.values(allProfessionsData).forEach(j => Object.values(j.skills).forEach(arr => arr.forEach(s => all.push(s))));
    // ④ 殘留的跳脫字元
    all.forEach(s => {
        if (typeof s.description === 'string' && /\\+n/.test(s.description)) s.description = s.description.replace(/\\+n/g, '\n');
        (s.levels || []).forEach(lv => { if (lv && typeof lv.fullDescription === 'string' && /\\+n/.test(lv.fullDescription)) lv.fullDescription = lv.fullDescription.replace(/\\+n/g, '\n'); });
    });
    const find = (en, name) => { const j = jobOf(en); if (!j) return null; for (const arr of Object.values(j.skills)) for (const s of arr) if (s.name === name) return s; return null; };
    // ② 夜使者前置
    const meso = find('NightLord', '楓幣攻擊'), ninja = find('NightLord', '忍影瞬殺');
    if (ninja && ninja.preRequisite && meso) {
        const lucky = Object.keys(ninja.preRequisite).filter(id => { const s = all.find(x => x.id === id); return s && s.name === '幸運術'; });
        lucky.forEach(id => { delete ninja.preRequisite[id]; if (!meso.preRequisite || meso.preRequisite[id] == null) meso.preRequisite = Object.assign({}, meso.preRequisite, { [id]: 5 }); });
    }
    // ① 官網說明
    const OFFICIAL = {
 "ArchMageF/P|末日烈焰": "在自身周圍引發大爆炸。範圍內的多名敵方會受到火焰屬性攻擊，中毒的敵方會受到更高傷害。",
 "ArchMageI/L|落雷凝聚": "凝聚雷電之力形成槍，攻擊前方多名敵方。怪物將受到雷電屬性攻擊。",
 "FlameWizard|魔力激發": "消耗更多的MP，強化自身使用的所有攻擊魔法。",
 "FlameWizard|烈焰真理": "領悟火焰的真理，提升自身施放的火屬性攻擊魔法的熟練度，自己施加的燃燒有一定機率造成暴擊傷害。熟練度提升不適用於召喚獸與火牢術屏障造成的傷害。",
 "FlameWizard|火幕": "火牢術屏障的火焰變得更加猛烈。屏障攻擊燃燒狀態的敵人時有一定機率造成更強的暴擊，自己施加的燃燒總是會造成更強的傷害。",
 "NightLord|楓幣攻擊": "投擲楓幣，依投擲的金額比例對敵方造成傷害。造成無視怪物防禦力的傷害。",
 "NightLord|忍影瞬殺": "於一定時間內，埋伏中的同伴將挺身而出，以一定機率對攻擊的敵人追加攻擊1次。",
 "NightWalker|吸血": "攻擊多名敵人4次，並吸收傷害的一部分恢復自身HP。一次性恢復的HP不超過角色的最大HP 1/2以上，以及怪物最大HP以上。",
 "Shadower|勇者掠奪術": "在一定時間內，攻擊敵方時可累積楓幣。累積的金額會依技能等級與傷害提升。面對對BOSS怪物時減少70%。",
 "SoulMaster|終極攻擊": "有一定機率在使用攻擊技能後觸發連續攻擊。只會在裝備單手劍或雙手劍時發動。",
 "Striker|衝鋒": "在一定時間內提升自己的移動速度與跳躍力。",
 "Buccaneer|鬥神降世": "將鬥神的力量提升至極限，在一定時間內大幅提升物理防禦力與魔法防禦力。對BOSS會造成額外傷害。",
 "WindBreaker|風影漫步": "提升移動速度，並且可以在空中施放攻擊技能。",
 "WindBreaker|終極攻擊": "有一定機率在使用攻擊技能後觸發連續攻擊。只會在裝備弓類武器時發動。",
 "WindBreaker|進階暴風": "將暴風的力量注入弓中，可以進行更致命的攻擊。使用暴風時消耗召喚石1顆，不再召喚，而是在一定時間內提升暴擊機率和暴擊傷害。此外，使用疾風光速神弩或疾風掃射時，每隔一定時間阿爾法會出現並以相同技能一同攻擊。"
};
    Object.entries(OFFICIAL).forEach(([key, text]) => {
        const [en, name] = key.split('|'); const s = find(en, name); if (!s) return;
        const old = String(s.description || '').split('\n');
        const have = text.split('\n');
        const extras = old.slice(1).filter(l => l && have.indexOf(l) < 0 && !/^(前置技能|必要技能)/.test(l));
        s.description = have.concat(extras).join('\n');
        const head = have[0];
        (s.levels || []).forEach((lv, i) => { if (lv) lv.fullDescription = head + (lv.effect ? ' 等級' + i + '效果：' + lv.effect + '。' : ''); });
    });
    // ③ 前置
    const setPre = (en, name, preName, lv) => {
        const s = find(en, name), p = find(en, preName); if (!s || !p) return;
        s.preRequisite = Object.assign({}, s.preRequisite, { [p.id]: lv });
    };
    setPre('ArchMageF/P', '毒霧', '毒術大師 I', 1);
    setPre('ArchMageF/P', '毒術大師 II', '毒術大師 I', 20);
    setPre('ArchMageF/P', '致命毒霧', '毒術大師 II', 1);
    setPre('ArchMageF/P', '毒術大師 III', '毒術大師 II', 20);
    setPre('Striker', '閃光擊', '雷鳴', 30);
})();
