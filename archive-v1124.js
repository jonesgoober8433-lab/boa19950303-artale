// 魔改存檔的第三個版本。數字不另外抄一份，頁面載入後直接讀
// v1124-cygnus.js／v1124-notes.js 建好的技能（和 2026.11.24 模擬器同一份）。
// 要等 archive.html 的 IMG 建好再呼叫。
window.buildV1124Archive = function () {
    const ORDER = ['SoulMaster', 'FlameWizard', 'WindBreaker', 'NightWalker', 'Striker'];
    const FACE = {
        SoulMaster: 'emblems/soulmaster_face.webp',
        FlameWizard: 'emblems/flamewizard_face.webp',
        WindBreaker: 'emblems/windbreaker_face.webp',
        NightWalker: 'emblems/nightwalker_face.webp',
        Striker: 'emblems/striker_face.webp'
    };
    const STAGE = { '1': '一轉', '2': '二轉', '3': '三轉', '4': '四轉' };
    const splitEffect = (effect) => {
        if (!effect) return [];
        return effect.split(/，|,\s+(?=[^，,:]+?:)/).map(part => {
            const i = part.indexOf(':');
            if (i < 0) return null;
            const label = part.slice(0, i).trim();
            const value = part.slice(i + 1).trim();
            return label && value ? [label, value] : null;
        }).filter(Boolean);
    };
    const known = (v) => v && v !== '—' && v !== '無';
    const summaryOf = (arr) => {
        const real = [];
        arr.forEach((v, i) => { if (known(v)) real.push({ i, v }); });
        if (!real.length) return '無';
        const uniq = [...new Set(real.map(x => x.v))];
        if (uniq.length === 1) return uniq[0];
        if (real.length === arr.length) return real[0].v + '~' + real[real.length - 1].v;
        if (real.length <= 3) return real.map(x => (x.i + 1) + '級 ' + x.v).join('、');
        return real[0].v + '~' + real[real.length - 1].v + '（只有部分等級有數字，見下方表）';
    };
    const preText = (job, skill) => {
        const bits = [];
        Object.entries(skill.preRequisite || {}).forEach(([id, lv]) => {
            let name = id;
            Object.values(job.skills).forEach(arr => arr.forEach(s => { if (s.id === id) name = s.name; }));
            bits.push(name + ' ' + lv + '級以上');
        });
        return bits.length ? '必要技能：' + bits.join('、') : null;
    };
    const toSkill = (job, skill, stageKey) => {
        const labels = [];
        const byLevel = [];
        for (let i = 1; i <= skill.maxLevel; i++) {
            const row = new Map();
            splitEffect(skill.levels[i] && skill.levels[i].effect).forEach(([label, value]) => {
                if (!labels.includes(label)) labels.push(label);
                row.set(label, value);
            });
            byLevel.push(row);
        }
        const stats = labels.map(label => ({
            label, unit: '',
            before: byLevel.map(() => '無'),
            after: byLevel.map(row => row.get(label) || '—')
        })).filter(st => st.after.some(known));
        const lines = String(skill.description || '').split('\n');
        const pid = String(skill.id || '').replace(/^c/, '');
        const icon = 'ico:v1124:' + skill.id;
        IMG[icon] = skill.imageUrl || ('images/c_' + pid + '.png');
        const skillOut = {
            name: skill.name,
            oldName: null,
            stage: STAGE[stageKey[0]] || stageKey,
            icon,
            maxLevel: skill.maxLevel,
            tags: ['新增'],
            comment: lines.slice(1).join('\n'),
            tables: stats.length ? [[['項目', '調整前', '調整後']].concat(stats.map(st => [st.label, '無', summaryOf(st.after)]))] : [],
            desc: lines[0] || '',
            pre: preText(job, skill),
            panels: stats.length ? [{ title: '各等級數值（1～' + skill.maxLevel + '級）', axis: '等級', from: 1, stats }] : []
        };
        return skillOut;
    };

    const ADVENTURERS = [
        ['Hero', 'emblems/hero_face.webp', 'hero'],
        ['Paladin', 'emblems/paladin_face.webp', 'paladin'],
        ['DarkKnight', 'emblems/darkknight_face.webp', 'darkknight'],
        ['ArchMageF/P', 'emblems/archmage-fp_face.webp', 'archmage-fp'],
        ['ArchMageI/L', 'emblems/archmage-il_face.webp', 'archmage-il'],
        ['Bishop', 'emblems/bishop_face.webp', 'bishop'],
        ['Bowmaster', 'emblems/bowmaster_face.webp', 'bowmaster'],
        ['Marksman', 'emblems/marksman_face.webp', 'marksman'],
        ['NightLord', 'emblems/nightlord_face.webp', 'nightlord'],
        ['Shadower', 'emblems/shadower_face.webp', 'shadower'],
        ['Buccaneer', 'emblems/viper_face.webp', 'viper'],
        ['Corsair', 'emblems/captain_face.webp', 'captain']
    ];
    const jobs = [];
    function pushJob(key, facePath, group, slug, onlyCygnus) {
        const name = Object.keys(allProfessionsData).find(k => k.indexOf('(' + key + ')') >= 0);
        const job = name && allProfessionsData[name];
        if (!job) return;
        const face = 'face:v1124:' + key;
        IMG[face] = facePath;
        const skills = [];
        job.jobStagesOrder.forEach(stage => {
            if (!/^[1-4]轉/.test(stage)) return;
            (job.skills[stage] || []).forEach(s => {
                if (!s || (onlyCygnus && !s._cygnus)) return;
                const card = toSkill(job, s, stage);
                if (!s._v1124) card.tags = [];
                const demo = (typeof SKILL_DEMOS !== 'undefined') && SKILL_DEMOS[name.split(' ')[0] + '|' + s.name];
                if (demo) card.demo = demo;
                const C = (typeof V1124_COMMENTS !== 'undefined') && V1124_COMMENTS[key + '|' + s.name];
                if (C) {   // 官網每個技能的開發團隊說明、補充說明、標籤
                    card.siteNotes = card.comment;
                    card.comment = C.comment || '';
                    card.notes = C.notes || [];
                    card.official = true;
                    if (C.tables && C.tables.length) card.tables = C.tables.map(t => [t.head].concat(t.rows));   // 官網的調整前後表
                    card.lv = C.lv || [];
                    if (C.tags && C.tags.length) card.tags = C.tags;
                }
                skills.push(card);
            });
        });
        jobs.push({
            name: name.split(' ')[0],
            group,
            face,
            sim: 'v1124-simulator.html?prof=' + (key === 'ArchMageF/P' ? 'archmage_fp' : key === 'ArchMageI/L' ? 'archmage_il' : key),
            summary: '2026.11.24 正式版。數字和技能模擬器同一份，點下面可以開去試算。',
            dev: '來源：https://artale.live/tw/patch-notes/cygnus-knights/' + slug,
            skills
        });
    }
    ADVENTURERS.forEach(row => pushJob(row[0], row[1], '冒險家', row[2], false));
    ORDER.forEach(key => pushJob(key, FACE[key], '皇家騎士團', key === 'SoulMaster' ? 'soulmaster' : key.toLowerCase(), true));

    return {
        name: '2026.11.24 正式版',
        note: '<b>2026.11.24 正式版</b>：冒險家 12 職和皇家騎士團 5 職。數字直接讀技能模擬器這版的資料。改版頁有逐級的才填，只寫區間的等級先留空。第一版、第二版的存檔沒有改。',
        jobs
    };
};
