// 正式版（最初版）的 0 轉（新手）技能；由 build_official.py 從測試版的同一段產生，內容一致
// ===== 0 轉（新手）技能：來源＝使用者提供的遊戲內截圖。0 轉（1~10 級）只給 6 點，三個技能各最高 3 級（合計最多 9 點，只能點 6 點）=====
(function addBeginnerSkills() {
    const lv = (arr) => [null].concat(arr.map(e => ({ effect: e, fullDescription: '' })));
    const SNAIL = { id: 'b_snailThrow', name: '嫩寶丟擲術', maxLevel: 3, requiredLevel: 1, preRequisite: {}, imageUrl: 'images/b_snailThrow.png',
        description: '投擲蝸牛殼攻擊遠距離敵人。',
        levels: lv(['消耗MP: 3，傷害: 10', '消耗MP: 5，傷害: 25', '消耗MP: 7，傷害: 40']) };
    const NIMBLE = { id: 'b_nimbleFeet', name: '疾風之步', maxLevel: 3, requiredLevel: 1, preRequisite: {}, imageUrl: 'images/b_nimbleFeet.png',
        description: '瞬間內快速移動。\n再次使用等待時間：1分鐘',
        levels: lv(['消耗MP: 4，持續時間: 4秒，提升移動速度: 10', '消耗MP: 7，持續時間: 8秒，提升移動速度: 15', '消耗MP: 10，持續時間: 12秒，提升移動速度: 20']) };
    const recovery = (name) => ({ id: 'b_recovery', name, maxLevel: 3, requiredLevel: 1, preRequisite: {}, imageUrl: 'images/b_recovery.png',
        description: '在30秒內，持續恢復自身HP。\n再次使用等待時間：2分鐘',
        levels: lv(['消耗MP: 5，持續時間: 30秒，恢復HP: 24', '消耗MP: 10，持續時間: 30秒，恢復HP: 48', '消耗MP: 15，持續時間: 30秒，恢復HP: 72']) });
    const clone = (o) => JSON.parse(JSON.stringify(o));
    for (const [jobName, job] of Object.entries(allProfessionsData)) {
        const stage = job.jobStagesOrder[0];            // '0轉 (新手)'
        const noble = job.group === '皇家騎士團';
        // 冒險家：嫩寶丟擲術、疾風之步、恢復；皇家騎士團（貴族技術）：嫩寶丟擲術、恢復、疾風之步（使用者確認：兩邊都叫「恢復」，順序依遊戲內截圖）
        job.skills[stage] = noble ? [clone(SNAIL), recovery('恢復'), clone(NIMBLE)] : [clone(SNAIL), clone(NIMBLE), recovery('恢復')];
        job.beginnerSp = 6;                              // 0 轉（1~10 級）給 6 點技能點
    }
})();

