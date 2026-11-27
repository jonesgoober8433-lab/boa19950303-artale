// official-fixes.js
// 三個版本共用的資料修正（放在各資料檔之後載入）。
// ① 原站資料的前置技能錯誤（前置指到不存在的技能 ID，導致前置提示缺漏）。修法與測試版的 artale-patch.js 相同，另外多一個英雄「防禦消除」。
// ② 拳霸「閃．爆破」攻擊次數：玩家在遊戲內實測 1 級與 30 級都是 4 下，不會隨等級增加。
(function fixOfficialPrerequisites() {
    if (typeof allProfessionsData === 'undefined') return;
    const FIX = {
        '聖騎士 (Paladin)': { '屬性強化': { elementalStrike: 'elementalCharge' } },   // 前置應為「屬性攻擊」（頁面寫：屬性攻擊30級）
        '箭神 (Bowmaster)': { '無形之箭': { crossbowBooster: 'bowBooster' } }          // 箭神應為「快速之箭」，不是弩的快速之弩
    };
    for (const [jobName, bySkill] of Object.entries(FIX)) {
        const job = allProfessionsData[jobName]; if (!job) continue;
        for (const arr of Object.values(job.skills)) for (const s of arr) {
            const map = bySkill[s.name]; if (!map || !s.preRequisite) continue;
            for (const [oldId, newId] of Object.entries(map)) {
                if (s.preRequisite[oldId] !== undefined) { s.preRequisite[newId] = s.preRequisite[oldId]; delete s.preRequisite[oldId]; }
            }
        }
    }
    // 英雄「防禦消除」：頁面只寫「前置技能：虎咆哮 3 級以上」，多出來的 shout 指到不存在的技能，拿掉
    const hero = allProfessionsData['英雄 (Hero)'];
    if (hero) for (const arr of Object.values(hero.skills)) for (const s of arr) {
        if (s.name !== '防禦消除' || !s.preRequisite || s.preRequisite.shout === undefined) continue;
        if (s.preRequisite.tigerOfFury === undefined) s.preRequisite.tigerOfFury = s.preRequisite.shout;   // 最初版只有 shout:3，點數與 11/24 頁面的「虎咆哮 3 級」一致
        delete s.preRequisite.shout;
    }
})();

(function fixFlashBlastHits() {
    if (typeof allProfessionsData === 'undefined') return;
    const job = allProfessionsData['拳霸 (Buccaneer)']; if (!job) return;
    for (const arr of Object.values(job.skills)) for (const s of arr) {
        if (s.name !== '閃．爆破' || !s.levels) continue;
        s.levels.forEach(lv => {
            if (!lv) return;
            if (lv.effect) lv.effect = lv.effect.replace(/攻擊次數: ?\d+次/, '攻擊次數: 4次');
            if (lv.fullDescription) lv.fullDescription = lv.fullDescription.replace(/造成\d+次/, '造成4次');
        });
        const line = '攻擊次數固定 4 次，不會隨等級增加（依玩家在遊戲內實測回報）。傷害數字沿用舊資料，尚未核對。';
        if ((s.description || '').indexOf(line) < 0) {
            s.description = (s.description ? s.description + '\n' : '') + line;
            s.levels.forEach(lv => { if (lv && lv.fullDescription && lv.fullDescription.indexOf(line) < 0) { /* 說明欄已有，逐級不重複 */ } });
        }
    }
})();
