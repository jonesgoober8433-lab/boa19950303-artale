// v1124-notes.js
// 2026.11.24 改版頁和既有逐級表不一樣的地方。只填頁面上寫明的數字。
// 頁面只給區間、沒有逐級表的，不把區間拆成每一級。
// 來源：https://artale.live/tw/patch-notes/cygnus-knights/
(function applyV1124PatchNotes() {
    const jobOf = (en) => allProfessionsData[Object.keys(allProfessionsData).find(k => k.indexOf('(' + en + ')') >= 0)];
    const find = (en, name) => {
        const job = jobOf(en); if (!job) return null;
        for (const arr of Object.values(job.skills)) for (const s of arr) if (s.name === name) return s;
        return null;
    };
    const headOf = (s) => ((s.description || '').split('\n')[0]);
    const touch = (s) => {
        const head = headOf(s);
        (s.levels || []).forEach((lv, i) => {
            if (!lv) return;
            lv.fullDescription = (head ? head + ' ' : '') + (lv.effect ? '等級' + i + '效果：' + lv.effect + '。' : '');
        });
    };
    const say = (s, line) => {
        if (!s || (s.description || '').indexOf(line) >= 0) return;
        s.description = (s.description ? s.description + '\n' : '') + line;
        touch(s);
    };
    const addAll = (s, text) => {
        if (!s) return;
        (s.levels || []).forEach(lv => {
            if (!lv || (lv.effect || '').indexOf(text) >= 0) return;
            lv.effect = lv.effect ? lv.effect + '，' + text : text;
        });
        touch(s);
    };
    const addAt = (s, level, text) => {
        const lv = s && s.levels && s.levels[level]; if (!lv) return;
        if ((lv.effect || '').indexOf(text) < 0) lv.effect = lv.effect ? lv.effect + '，' + text : text;
        touch(s);
    };
    const rebuild = (s, max, fn) => {
        s.maxLevel = max;
        const head = headOf(s);
        s.levels = [null];
        for (let i = 1; i <= max; i++) {
            const effect = fn(i) || '';
            s.levels.push({ effect, fullDescription: (head ? head + ' ' : '') + (effect ? '等級' + i + '效果：' + effect + '。' : '') });
        }
    };
    const fieldRe = (label) => new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ': ([^，]*)');
    const field = (effect, label) => { const m = effect && effect.match(fieldRe(label)); return m ? m[1] : ''; };
    const dropField = (s, label) => {
        const re = new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ': [^，]*，?');
        (s.levels || []).forEach(lv => {
            if (!lv || !lv.effect) return;
            lv.effect = lv.effect.replace(re, '').replace(/，，/g, '，').replace(/^，|，$/g, '');
        });
        touch(s);
    };
    const num = (v) => { const m = String(v || '').match(/[\d.]+/); return m ? m[0] : ''; };
    // 頁面「A~B」代表最低與最高。對得上才留逐級表，對不上就拿掉，避免沿用錯的曲線。
    const keepCurve = (s, label, lo, hi, note) => {
        if (!s) return;
        const a = num(field(s.levels[1] && s.levels[1].effect, label));
        const b = num(field(s.levels[s.maxLevel] && s.levels[s.maxLevel].effect, label));
        if (a === String(lo) && b === String(hi)) return;
        dropField(s, label);
        say(s, note);
    };

    // ----- 聖魂劍士：逐級表和改版頁的最高等級、分段一致。補頁面上多寫的固定效果。 -----
    const echo = find('SoulMaster', '靈魂迴響');
    addAll(echo, '每1層迴響的傷害: +1%');
    say(echo, '每層迴響持續 5 秒。');
    const fastSword = find('SoulMaster', '快速之劍');
    addAll(fastSword, '攻擊速度: 提升1階段');
    keepCurve(fastSword, '持續時間', 15, 300, '持續時間頁面只寫 15~300秒，最初版同名技能的兩端對不上，中間每一級不填。');
    // 複檢補上（2026-11-24）：改版頁 MP 自然恢復 +2~30，舊逐級表 20 級是 40，對不上，所以只留兩端。
    const mpRec = find('SoulMaster', '魔力恢復');
    if (mpRec) {
        dropField(mpRec, '回復量');
        addAt(mpRec, 1, '回復量: 2');
        addAt(mpRec, 20, '回復量: 30');
        say(mpRec, '每 10 秒 MP 自然恢復 +2~30。頁面只寫兩端，1 級 2、20 級 30，中間每一級不填。');
    }
    // 頁面有寫、逐級表沒有的固定說明
    addAll(find('SoulMaster', '靈魂'), '攻擊: 最多3名敵人');
    addAll(find('SoulMaster', '劍氣縱橫'), '攻擊: 最多6名敵人');
    addAll(find('SoulMaster', '靈魂斬'), '攻擊: 每名2次');
    say(find('SoulMaster', '終極攻擊'), '頁面寫的發動條件：使用魔天一擊或劍氣縱橫時，有一定機率發動追加攻擊。');
    // 改版頁沒寫數字、沿用最初版逐級表的技能
    ['生命淨化', '生命擴展', '精準之劍'].forEach(n => say(find('SoulMaster', n), '改版頁沒寫這個技能的數字，逐級數值沿用最初版。'));
    say(fastSword, '消耗 HP／MP 改版頁沒寫，沿用最初版。');

    // ----- 烈焰巫師 -----
    addAll(find('FlameWizard', '火牢術'), '攻擊: 最多3名敵人');
    addAll(find('FlameWizard', '魔力爪'), '攻擊: 最多2名敵人，每名2次');
    addAll(find('FlameWizard', '烈焰箭'), '攻擊: 最多貫穿3名敵人');
    addAll(find('FlameWizard', '火柱'), '攻擊: 最多6名敵人');
    addAll(find('FlameWizard', '魔法封印'), '目標數量: 最多6名');
    addAll(find('FlameWizard', '火牢術屏障'), '施放時攻擊: 最多6名，每名1次');
    say(find('FlameWizard', '火牢術屏障'), '火焰屏障每 1 秒攻擊最多 6 名，同一目標每秒最多 3 次，不會擊退。同一張地圖最多 6 個火焰屏障。');
    addAll(find('FlameWizard', '火焰吐息'), '攻擊: 最多6名，每名2次');
    addAll(find('FlameWizard', '火步行'), '攻擊: 最多6名，每名1次');
    addAll(find('FlameWizard', '火之書'), '魔法石消耗: 1個，最終傷害: 每1點INT +0.018%');
    addAll(find('FlameWizard', '火流星'), '燃燒: 100%機率，持續5秒');
    addAll(find('FlameWizard', '火風暴'), '攻擊: 最多6名，每名2次');
    const spirit = find('FlameWizard', '烈焰水靈');
    addAll(spirit, '攻擊: 最多3名，召喚石消耗: 1個');
    dropField(spirit, '基礎攻擊力');
    addAt(spirit, 30, '基礎攻擊力: 200');
    say(spirit, '基礎攻擊力頁面寫 34~200，30 級是 200。中間每一級沒有列，所以不填。持續時間、燃燒時間的兩端仍是 10~300 秒、3~20 秒，逐級表沿用原本對得上的資料。');
    const truth = find('FlameWizard', '烈焰真理');
    if (truth) {
        say(truth, '熟練度增加 1~10%，燃燒暴擊機率 11~30%。頁面沒有逐級表，只填 20 級。');
        rebuild(truth, 20, i => i === 20 ? '熟練度增加: 10%，燃燒暴擊機率: 30%' : '');
    }
    const veil = find('FlameWizard', '火幕');
    addAt(veil, 30, '火焰屏障暴擊傷害: 250%');
    say(veil, '火焰屏障暴擊傷害頁面寫 150~250%，只標明 30 級是 250%，中間每一級不填。');

    // ----- 破風使者 -----
    const gust = find('WindBreaker', '暴風射擊');
    if (gust) {
        say(gust, '最高等級改為 30。傷害頁面只寫 65~160%、擊退機率 43~100%，沒有逐級表，只在 30 級填最高值。攻擊目標數量用頁面上的分段。');
        const tgt = i => i <= 7 ? '3隻' : i <= 15 ? '4隻' : i <= 22 ? '5隻' : '6隻';
        rebuild(gust, 30, i => '攻擊目標數量: ' + tgt(i) + (i === 30 ? '，傷害: 160%，擊退機率: 100%' : ''));
    }
    const eye = find('WindBreaker', '阿爾法之眼');
    if (eye) {
        say(eye, '最高等級改為 30。每 100 距離無視的物理防禦力頁面只寫 3~10%，30 級是 10%，中間每一級不填。');
        rebuild(eye, 30, i => i === 30 ? '每100距離無視的物理防禦力: 10%' : '');
    }
    addAll(find('WindBreaker', '阿爾法'), '召喚石消耗: 1個，移動速度: +40，跳躍力: +20');
    const prayer = find('WindBreaker', '風之祈禱');
    addAll(prayer, '攻擊速度: 提升2階段，適用對象: 僅限自身');
    keepCurve(prayer, '持續時間', 110, 300, '持續時間頁面只寫 110~300秒，最初版同名技能的兩端對不上，中間每一級不填。');
    const storm = find('WindBreaker', '進階暴風');
    addAll(storm, '持續時間: 300秒，物理防禦力與魔法防禦力增加: 25');
    addAt(storm, 30, '阿爾法追加攻擊冷卻時間: 3.0秒');
    say(storm, '冷卻時間頁面寫 15~3秒，只標明最高等級 3.0 秒，中間每一級不填。使用暴風消耗召喚石 1 顆。');

    // ----- 暗夜行者 -----
    addAll(find('NightWalker', '黑暗雷鳥'), '精靈的目標數量: 最多3名');
    addAll(find('NightWalker', '影網術'), '目標數量: 最多6名');
    const bat = find('NightWalker', '暗影蝙蝠');
    if (bat) {
        say(bat, '最高等級改為 40。用投擲飛鏢的攻擊每打中 4 次生成 1 隻，持續 60 秒；每次飛鏢攻擊，每隻有 35% 機率衝向敵人。蝙蝠傷害頁面只寫 53~140%，40 級是 140%，中間每一級不填。數量用頁面上的分段。');
        const n = i => i <= 10 ? '1隻' : i <= 30 ? '2隻' : '3隻';
        rebuild(bat, 40, i => '蝙蝠數量上限: ' + n(i) + (i === 40 ? '，蝙蝠傷害: 140%' : ''));
    }
    const quad = find('NightWalker', '四飛閃');
    if (quad) {
        say(quad, '最高等級改為 30。單枚傷害頁面只寫 86~107%，30 級是 107%（4 枚合計 428%）、MP 21，中間每一級不填。');
        rebuild(quad, 30, i => i === 30 ? '傷害 (單枚飛鏢): 107%，4枚合計: 428%，MP消耗: 21' : '');
    }
    addAll(find('NightWalker', '進階黑暗雷鳥'), '持續時間: 300秒');
    const link = find('NightWalker', '蝙蝠交流');
    if (link) {
        (link.levels || []).forEach(lv => { if (lv && lv.effect) lv.effect = lv.effect.replace(/暗影蝙蝠30級/g, '暗影蝙蝠40級'); });
        touch(link);
        addAll(link, '蝙蝠攻擊屬性: 毒屬性');
        say(link, '頁面把對照改成暗影蝙蝠 40 級（這個技能最高仍是 20）。40 級時傷害最高仍寫 280%。');
    }

    // ----- 閃雷悍將 -----
    const thunder = find('Striker', '雷鳴衝擊') || find('Striker', '雷鳴');
    if (thunder) {
        thunder.name = '雷鳴';
        say(thunder, '這頁的名稱是「雷鳴」，最高 30 級。持續時間只寫 26~300秒，30 級是 300 秒，中間每一級不填。無視防禦力用頁面上的分段。');
        const ign = i => i <= 6 ? '1%' : i <= 12 ? '2%' : i <= 18 ? '3%' : i <= 24 ? '4%' : '5%';
        rebuild(thunder, 30, i => '無視防禦力: ' + ign(i) + (i === 30 ? '，持續時間: 300秒' : ''));
    }
    const whirl = find('Striker', '颶風飛擊');
    if (whirl) {
        say(whirl, '最高等級改為 30。傷害頁面只寫 176~290%，30 級是 290%，中間每一級不填。MP 與目標數用頁面上寫明的數字。');
        const mp = i => i <= 7 ? '18' : i <= 15 ? '20' : i <= 22 ? '22' : '24';
        rebuild(whirl, 30, i => 'MP消耗: ' + mp(i) + '，最大攻擊目標數量: 6名' + (i === 30 ? '，傷害: 290%' : ''));
    }
    const crit = find('Striker', '衝壓暴擊');
    if (crit) {
        say(crit, '最高等級改為 30。暴擊機率頁面只寫 12~40%，30 級是 40%、暴擊傷害 200%，中間每一級不填。');
        rebuild(crit, 30, i => i === 30 ? '暴擊機率: 40%，暴擊傷害: 200%' : '');
    }
    const mast = find('Striker', '閃電精通');
    if (mast) {
        say(mast, '最高等級改為 30。雷屬性傷害頁面只寫 +1~10%，30 級是 10%，中間每一級不填。');
        rebuild(mast, 30, i => i === 30 ? '雷屬性傷害增加: 10%' : '');
    }
    const drain = find('Striker', '魔力汲取');
    if (drain) {
        say(drain, '最高等級改為 30。恢復機率頁面只寫 10~40%、MP 恢復 10~20，30 級是 40% 與 20，中間每一級不填。');
        rebuild(drain, 30, i => i === 30 ? '恢復機率: 40%，MP恢復: 20' : '');
    }
    const flash = find('Striker', '閃光');
    addAll(flash, '攻擊目標: 最多4名，連續使用限制: 2秒');

    const striker = jobOf('Striker');
    if (striker) {
        let sum = 0;
        striker.jobStagesOrder.forEach(k => {
            if (/^[123]轉/.test(k)) (striker.skills[k] || []).forEach(s => { sum += s.maxLevel || 0; });
        });
        striker._sp123 = sum;
        striker.specialCase = sum < (striker.spRequiredFor4thJob || 333);
    }

    const gaps = [];
    Object.entries(allProfessionsData).forEach(([jn, job]) => {
        if (!job || job.group !== '皇家騎士團') return;
        Object.entries(job.skills).forEach(([stage, arr]) => {
            (arr || []).forEach(s => {
                if (!s._cygnus) return;
                const filled = (s.levels || []).filter(l => l && l.effect && String(l.effect).trim()).length;
                if (filled < s.maxLevel) gaps.push(jn.split(' ')[0] + '／' + s.name + '：' + filled + '/' + s.maxLevel + ' 級有數字' + (s._effectFrom ? '（同名補自 ' + s._effectFrom + '）' : ''));
            });
        });
    });
    window.__V1124_GAPS = gaps;
})();
