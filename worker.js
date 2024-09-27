importScripts('https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js');
let nonValids = {};
let globalValids;
let eGlobal;
let highestOverall = {};
let dropRatesGlobal = {};
let dropTablesGlobal = {};
let tempAlwaysGlobal = {};
let xpTable = {
    "1": 0,
    "2": 83,
    "3": 174,
    "4": 276,
    "5": 388,
    "6": 512,
    "7": 650,
    "8": 801,
    "9": 969,
    "10": 1154,
    "11": 1358,
    "12": 1584,
    "13": 1833,
    "14": 2107,
    "15": 2411,
    "16": 2746,
    "17": 3115,
    "18": 3523,
    "19": 3973,
    "20": 4470,
    "21": 5018,
    "22": 5624,
    "23": 6291,
    "24": 7028,
    "25": 7842,
    "26": 8740,
    "27": 9730,
    "28": 10824,
    "29": 12031,
    "30": 13363,
    "31": 14833,
    "32": 16456,
    "33": 18247,
    "34": 20224,
    "35": 22406,
    "36": 24815,
    "37": 27473,
    "38": 30408,
    "39": 33648,
    "40": 37224,
    "41": 41171,
    "42": 45529,
    "43": 50339,
    "44": 55649,
    "45": 61512,
    "46": 67983,
    "47": 75127,
    "48": 83014,
    "49": 91721,
    "50": 101333,
    "51": 111945,
    "52": 123660,
    "53": 136594,
    "54": 150872,
    "55": 166636,
    "56": 184040,
    "57": 203254,
    "58": 224466,
    "59": 247886,
    "60": 273742,
    "61": 302288,
    "62": 333804,
    "63": 368599,
    "64": 407015,
    "65": 449428,
    "66": 496254,
    "67": 547953,
    "68": 605032,
    "69": 668051,
    "70": 737627,
    "71": 814445,
    "72": 899257,
    "73": 992895,
    "74": 1096278,
    "75": 1210421,
    "76": 1336443,
    "77": 1475581,
    "78": 1629200,
    "79": 1798808,
    "80": 1986068,
    "81": 2192818,
    "82": 2421087,
    "83": 2673114,
    "84": 2951373,
    "85": 3258594,
    "86": 3597792,
    "87": 3972294,
    "88": 4385776,
    "89": 4842295,
    "90": 5346332,
    "91": 5902831,
    "92": 6517253,
    "93": 7195629,
    "94": 7944614,
    "95": 8771558,
    "96": 9684577,
    "97": 10692629,
    "98": 11805606,
    "99": 13034431
};
let diaryTierOrder = ['Easy', 'Medium', 'Hard', 'Elite', 'Museum Camp', 'Northern Reaches', 'Southern Swamps', 'Mountainous East'];
let diaryHierarchy = ['Grandmaster', 'Master', 'Elite', 'Hard', 'Medium', 'Easy'];
let outputTasks = {};
let multiTasks = {};
let intitalDataPosted = false;

let type;
let chunks;
let baseChunkData;
let rules;
let chunkInfo;
let skillNames;
let processingSkill;
let maybePrimary;
let combatSkills;
let monstersPlus;
let objectsPlus;
let chunksPlus;
let itemsPlus;
let mixPlus;
let npcsPlus;
let tools;
let elementalRunes;
let manualTasks;
let completeChallenges;
let backlog;
let rareDropNum;
let universalPrimary;
let elementalStaves;
let rangedItems;
let boneItems;
let highestCurrent;
let dropTables;
let questPointTotal;
let combatPointTotal;
let questProgress = {};
let diaryProgress = {};
let skillQuestXp = {};
let kudosTotal = 0;
let possibleSkillTotal = 0;
let randomLoot;
let magicTools;
let bossLogs;
let bossMonsters;
let minigameShops;
let manualEquipment;
let checkedChallenges;
let backloggedSources;
let altChallenges;
let manualMonsters;
let slayerLocked;
let passiveSkill;
let f2pSkills;
let assignedXpRewards;
let isDiary2Tier = false;
let manualAreas;
let secondaryPrimaryNum;
let constructionLocked;
let isOnlyManualAreas = false;
let bestEquipmentAltsGlobal = {};
let manualSections = {};
let unlockedSections = {};
let optOutSections = false;
let maxSkill;
let userTasks = {};
let manualPrimary = {};

let clueTasksPossible = {};
let areasStructure = {};
let possibleAreas = {};
let tempChunkData = {};

onmessage = function(e) {
    try {
        eGlobal = e;
        [
            type,
            chunks,
            rules,
            chunkInfo,
            skillNames,
            processingSkill,
            maybePrimary,
            combatSkills,
            monstersPlus,
            objectsPlus,
            chunksPlus,
            itemsPlus,
            mixPlus,
            npcsPlus,
            tasksPlus,
            tools,
            elementalRunes,
            manualTasks,
            completedChallenges,
            backlog,
            rareDropNum,
            universalPrimary,
            elementalStaves,
            rangedItems,
            boneItems,
            highestCurrent,
            dropTables,
            possibleAreas,
            randomLoot,
            magicTools,
            bossLogs,
            bossMonsters,
            minigameShops,
            manualEquipment,
            checkedChallenges,
            backloggedSources,
            altChallenges,
            manualMonsters,
            slayerLocked,
            passiveSkill,
            f2pSkills,
            assignedXpRewards,
            isDiary2Tier,
            manualAreas,
            secondaryPrimaryNum,
            constructionLocked,
            isOnlyManualAreas,
            manualSections,
            optOutSections,
            maxSkill,
            userTasks,
            manualPrimary,
        ] = eGlobal.data;

        if (isDiary2Tier) {
            let diaryChallenges = chunkInfo['challenges']['Diary'];
            !!diaryChallenges && Object.keys(diaryChallenges).filter(task => { return !diaryChallenges[task].hasOwnProperty('Reward') && diaryHierarchy.includes(task.split('|')[1].split('#')[1]) && diaryChallenges[task].hasOwnProperty('Tasks') }).forEach((task) => {
                Object.keys(diaryChallenges[task]['Tasks']).filter(subTask => { return diaryChallenges[task]['Tasks'][subTask] === 'Diary' && diaryHierarchy.includes(subTask.split('|')[1].split('#')[1]) && subTask.includes('Complete the') && (diaryHierarchy.indexOf(subTask.split('|')[1].split('#')[1]) - diaryHierarchy.indexOf(task.split('|')[1].split('#')[1]) === 1) }).forEach((subTask) => {
                    let newTier = diaryHierarchy[diaryHierarchy.indexOf(subTask.split('|')[1].split('#')[1]) + 1];
                    !!newTier && (diaryChallenges[task]['Tasks'][subTask.split(subTask.split('|')[1].split('#')[1]).join(newTier)] = 'Diary');
                    delete diaryChallenges[task]['Tasks'][subTask];
                    if (isEmpty(diaryChallenges[task]['Tasks'])) {
                        delete diaryChallenges[task]['Tasks'];
                    }
                });
            });
        }

        if (rareDropNum === "1/0") {
            rareDropNum = "1/999999999999999";
        }
        if (secondaryPrimaryNum === "1/0") {
            secondaryPrimaryNum = "1/999999999999999";
        }
        if (!chunkInfo) {
            return;
        }

        if (!chunks) {
            chunks = {};
        }

        dropRatesGlobal = {};
        dropTablesGlobal = {};

        chunks = getAllChunkAreas(chunks);
        baseChunkData = gatherChunksInfo(chunks);
        type === 'current' && postMessage('5%');
        globalValids = calcChallenges(chunks, baseChunkData);
        baseChunkData = tempChunkData;
        type === 'current' && postMessage('95%');
        highestOverall = calcBIS();
        let highestOverallCompleted = calcBIS(true);
        type === 'current' && postMessage('100%');
        //console.log(globalValids);

        let tempChallengeArr;
        type === 'current' && (tempChallengeArr = calcCurrentChallenges2());

        //console.log(nonValids);
        //console.log(baseChunkData);

        postMessage([type, globalValids, baseChunkData, chunkInfo, highestCurrent, tempChallengeArr, type === 'current' ? questPointTotal : 0, highestOverall, type === 'current' ? dropRatesGlobal : {}, questProgress, diaryProgress, skillQuestXp, chunks, type === 'current' ? dropTablesGlobal : {}, bestEquipmentAltsGlobal, unlockedSections, type === 'current' ? combatPointTotal : 0, highestOverallCompleted]);
    } catch (err) {
        postMessage(['error', err]);
    }
}

//Checks if an object has more than N properties
let hasMoreThanOneProperty = function(object) {
    let prop = false;
    for(var i in object)
    {
        if(prop === true)
            return true;
        prop = true;
    }

    return false;
}

// Checks if object is empty
let isEmpty = function(object) {
    for(var i in object)
        return false;

    return true;
}

let smithingCheck = function(skill) {
    return skill !== 'Smithing' || rules['Smithing by Smelting'] || baseChunkData['objects'].hasOwnProperty('Anvil') || baseChunkData['objects'].hasOwnProperty('Rusted anvil');
}

// replaceAll helper
let escapeRegExp = function(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Replaces all instances of match within string with replacement
String.prototype.replaceAll = function(match, replacement) {
    return this.split(match).join(replacement);
}

// Combines JSONs
let combineJSONs = function(a, b) {
    let temp = {};
    !!a && Object.keys(a).forEach((sub) => {
        if (typeof a[sub] === 'object') {
            if (!temp[sub]) {
                temp[sub] = {};
            }
            temp[sub] = combineJSONs(temp[sub], a[sub]);
        } else {
            temp[sub] = a[sub];
        }
    });
    !!b && Object.keys(b).forEach((sub) => {
        if (typeof b[sub] === 'object') {
            if (!temp[sub]) {
                temp[sub] = {};
            }
            temp[sub] = combineJSONs(temp[sub], b[sub]);
        } else {
            temp[sub] = b[sub];
        }
    });
    return temp;
}

// Returns level from input xp
let getLevelForXp = function(xp) {
    let level = 1
    while (xp >= xpTable[level + 1]) {
        level++;
    }
    return level;
}

let challengeIsBacklogged = function(skill, challenge) {
    if(!backlog[skill])
        return false;

    return backlog[skill].hasOwnProperty(challenge) || backlog[skill].hasOwnProperty(challenge.replaceAll('#', '/'));
}

// Marks subTasks with the same BaseQuest with val
let markSubTasks = function(newValids, skill, challenge, val) {
    let challenges = chunkInfo['challenges'];
    let skillChallenge = challenges[skill][challenge];
    let taskBaseQuest = skillChallenge['BaseQuest'];
    
    !!skillChallenge['Tasks'] && Object.entries(skillChallenge['Tasks']).forEach(([subTask,subTaskInfo]) => {

        let xSubTask = subTask;
        if (subTask.includes('[+]') && tasksPlus.hasOwnProperty(subTask.split('[+]x')[0].replaceAll('[+]', '') + '[+]')) {
            if (subTask.includes('[+]x')) {
                xSubTask = subTask.split('[+]x')[0] + '[+]';
            }
        }

        if (tasksPlus[xSubTask]) {
            tasksPlus[xSubTask].filter((plus) => {
                let plusTaskPrefix = plus.split('--')[0];
                let plusChallengeInfo = challenges[subTaskInfo]?.[plusTaskPrefix];
                return (!!taskBaseQuest && !!plusChallengeInfo && !!plusChallengeInfo['BaseQuest'] && taskBaseQuest === plusChallengeInfo['BaseQuest'] && !challengeIsBacklogged(skill, challenge) && !plusChallengeInfo['ManualShow']) && newValids[subTaskInfo].hasOwnProperty(plusTaskPrefix);
            }).forEach((plus) => { newValids[subTaskInfo][plus.split('--')[0]] = val; });
        } else {
            let subTaskPrefix = xSubTask.split('--')[0];
            let subTaskChallengeInfo = challenges[subTaskInfo]?.[subTaskPrefix];
            if (!!taskBaseQuest && taskBaseQuest === subTaskChallengeInfo?.['BaseQuest'] && !challengeIsBacklogged(skill, challenge) && !subTaskChallengeInfo['ManualShow']) {
                newValids[subTaskInfo].hasOwnProperty(subTaskPrefix) && (newValids[subTaskInfo][subTaskPrefix] = val);
            }
        }
    });
}

// Loads userTasks into chunkInfo
let loadUserTasks = function() {
    !!userTasks && Object.keys(userTasks).forEach((skill) => {
        !!userTasks[skill] && Object.keys(userTasks[skill]).forEach((name) => {
            if (!chunkInfo['challenges'][skill]) {
                chunkInfo['challenges'][skill] = {};
            }
            chunkInfo['challenges'][skill][name] = {
                'Description': 'Custom user-submitted task',
                'Label': 'Custom Tasks',
                'Permanent': false
            }
            if (skill !== 'Extra') {
                chunkInfo['challenges'][skill][name]['Level'] = userTasks[skill][name];
            }
        });
    });
}

// Calculates all the possible challenges
let calcChallenges = function(chunks, baseChunkData) {
    if (!baseChunkData) {
        return;
    }
    let valids = {};
    let outputs = {};
    let outputObjects = {};
    let newValids = {};
    let tempItemSkill = {};
    let tempMultiStepSkill = {};
    let i = 0;
    !!manualTasks && !!manualTasks['Quest'] && Object.keys(manualTasks['Quest']).forEach((name) => {
        let manualOff = false;
        let i = 0;
        let currNameArr = [];
        currNameArr.push(name);
        while (!manualOff && !!chunkInfo['challenges']['Quest'] && !!chunkInfo['challenges']['Quest'][currNameArr[i]] && chunkInfo['challenges']['Quest'][currNameArr[i]].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges']['Quest'][currNameArr[i]]['Tasks']).some(subTask => chunkInfo['challenges']['Quest'][currNameArr[i]]['Tasks'][subTask] === 'Quest')) {
            Object.keys(chunkInfo['challenges']['Quest'][currNameArr[i]]['Tasks']).filter(subTask => chunkInfo['challenges']['Quest'][currNameArr[i]]['Tasks'][subTask] === 'Quest').forEach((subTask) => {
                if (subTask.includes('[+]') && tasksPlus.hasOwnProperty(subTask.split('[+]x')[0].replaceAll('[+]', '') + '[+]')) {
                    if (subTask.includes('[+]x')) {
                        subTask = subTask.split('[+]x')[0] + '[+]';
                    }
                    chunkInfo['codeItems']['tasksPlus'].hasOwnProperty(subTask) && chunkInfo['codeItems']['tasksPlus'][subTask].forEach((plusTask) => {
                        if (!!chunkInfo['challenges']['Quest'][plusTask] && chunkInfo['challenges']['Quest'][currNameArr[i]]['BaseQuest'] === chunkInfo['challenges']['Quest'][plusTask]['BaseQuest']) {
                            manualTasks['Quest'][plusTask] = true;
                            currNameArr.push(plusTask);
                        }
                    });
                } else {
                    if (!!chunkInfo['challenges']['Quest'][subTask] && chunkInfo['challenges']['Quest'][currNameArr[i]]['BaseQuest'] === chunkInfo['challenges']['Quest'][subTask]['BaseQuest']) {
                        manualTasks['Quest'][subTask] = true;
                        currNameArr.push(subTask);
                    }
                }
            });
            i++;
        }
    });
    !!manualTasks && Object.keys(manualTasks).forEach((skill) => {
        skill !== 'BiS' && Object.keys(manualTasks[skill]).forEach((challenge) => {
            if (!!chunkInfo['challenges'][skill] && !!chunkInfo['challenges'][skill][challenge]) {
                if (!valids[skill]) {
                    valids[skill] = {};
                }
                valids[skill][challenge] = manualTasks[skill][challenge];
                if (!newValids[skill]) {
                    newValids[skill] = {};
                }
                newValids[skill][challenge] = manualTasks[skill][challenge];
                chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && (chunkInfo['challenges'][skill][challenge]['ManualValid'] = true);
            }
        });
    });
    loadUserTasks();
    !!userTasks && Object.keys(userTasks).forEach((skill) => {
        Object.keys(userTasks[skill]).forEach((challenge) => {
            if (!!chunkInfo['challenges'][skill] && !!chunkInfo['challenges'][skill][challenge]) {
                if (!valids[skill]) {
                    valids[skill] = {};
                }
                valids[skill][challenge] = userTasks[skill][challenge];
                if (!newValids[skill]) {
                    newValids[skill] = {};
                }
                newValids[skill][challenge] = userTasks[skill][challenge];
                chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && (chunkInfo['challenges'][skill][challenge]['ManualValid'] = true);
            }
        });
    });

    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Spawns'] && Object.keys(chunkInfo['taskUnlocks']['Spawns']).forEach((item) => {
        Object.keys(chunkInfo['taskUnlocks']['Spawns'][item]).forEach((chunk) => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Spawns'][item][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['Spawns'][item][chunk].length));
            if ((!chunk.includes('-') && !chunks.hasOwnProperty(chunk)) || (chunk.includes('-') && (!chunks.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections[chunk.split('-')[0]].hasOwnProperty(chunk.split('-')[1])))) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['items'].hasOwnProperty(item) && baseChunkData['items'][item].hasOwnProperty(chunk)) {
                !!baseChunkData['items'][item] && delete baseChunkData['items'][item][chunk];
                if (!!baseChunkData['items'][item] && isEmpty(baseChunkData['items'][item])) {
                    delete baseChunkData['items'][item];
                }
            } else if (tempValid && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                if (!baseChunkData['items'][item]) {
                    baseChunkData['items'][item] = {};
                }
                baseChunkData['items'][item][chunk] = rules['Primary Spawns'] ? 'primary-spawn' : 'secondary-spawn';
            }
        });
    });
    const telegrabTask = chunkInfo['challenges']['Magic']['Cast ~|telekinetic grab|~'];
    !!chunkInfo && !!chunkInfo['codeItems'] && !!chunkInfo['codeItems']['telegrabSpawns'] && Object.keys(chunkInfo['codeItems']['telegrabSpawns']).forEach((item) => {
        Object.keys(chunkInfo['codeItems']['telegrabSpawns'][item]).forEach((chunk) => {
            let tempValid = !(newValids && !(chunkInfo['codeItems']['telegrabSpawns'][item][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['codeItems']['telegrabSpawns'][item][chunk].length));
            if ((!chunk.includes('-') && !chunks.hasOwnProperty(chunk)) || (chunk.includes('-') && (!chunks.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections[chunk.split('-')[0]].hasOwnProperty(chunk.split('-')[1])))) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['items'].hasOwnProperty(item) && baseChunkData['items'][item].hasOwnProperty(chunk)) {
                !!baseChunkData['items'][item] && delete baseChunkData['items'][item][chunk];
                if (!!baseChunkData['items'][item] && isEmpty(baseChunkData['items'][item])) {
                    delete baseChunkData['items'][item];
                }
            } else if (tempValid && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                if (!baseChunkData['items'][item]) {
                    baseChunkData['items'][item] = {};
                }
                let primaryRunes = ((telegrabTask['Primary'] && (!telegrabTask['Secondary'] || rules['Secondary Primary'])) && (!backlog['Magic'] || !backlog['Magic'].hasOwnProperty('Cast ~|telekinetic grab|~'))) || telegrabTask['Manual'];
                baseChunkData['items'][item][chunk] = rules['Primary Spawns'] && primaryRunes ? 'primary-spawn' : 'secondary-spawn';
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Monsters'] && Object.keys(chunkInfo['taskUnlocks']['Monsters']).forEach((monster) => {
        Object.keys(chunkInfo['taskUnlocks']['Monsters'][monster]).forEach((chunk) => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Monsters'][monster][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['Monsters'][monster][chunk].length));
            if ((!chunk.includes('-') && !chunks.hasOwnProperty(chunk)) || (chunk.includes('-') && (!chunks.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections[chunk.split('-')[0]].hasOwnProperty(chunk.split('-')[1])))) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['monsters'].hasOwnProperty(monster) && baseChunkData['monsters'][monster].hasOwnProperty(chunk)) {
                !!baseChunkData['monsters'][monster] && delete baseChunkData['monsters'][monster][chunk];
                if (!!baseChunkData['monsters'][monster] && isEmpty(baseChunkData['monsters'][monster])) {
                    delete baseChunkData['monsters'][monster];
                    let dropsObj = chunkInfo['drops'][monster];
                    if (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                        dropsObj = chunkInfo['skillItems']['Slayer'][monster];
                    }
                    !!dropsObj && Object.keys(dropsObj).forEach((drop) => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                            Object.keys(dropTables[drop]).forEach((item) => {
                                !!baseChunkData['items'][item] && delete baseChunkData['items'][item][monster];
                                if (!!baseChunkData['items'][item] && isEmpty(baseChunkData['items'][item])) {
                                    delete baseChunkData['items'][item];
                                }
                                !!dropRatesGlobal[monster] && delete dropRatesGlobal[monster][item];
                                if (!!dropRatesGlobal[monster] && isEmpty(dropRatesGlobal[monster])) {
                                    delete dropRatesGlobal[monster];
                                }
                                !!dropTablesGlobal[monster] && delete dropTablesGlobal[monster][item];
                                if (!!dropTablesGlobal[monster] && isEmpty(dropTablesGlobal[monster])) {
                                    delete dropTablesGlobal[monster];
                                }
                            });
                        } else {
                            if (!!baseChunkData['items'][drop]) {
                                if (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                                    let re = new RegExp(`/Slay .*\~|${monster}|\~.*/`,"gm");
                                    let slayerTaskName = (!!baseChunkData['items'][drop] && Object.keys(baseChunkData['items'][drop]).find(value => re.test(value))) || (!!newValids['Slayer'] && Object.keys(newValids['Slayer']).find(value => re.test(value))) || "";
                                    delete baseChunkData['items'][drop][slayerTaskName];
                                    if (newValids.hasOwnProperty('Slayer') && newValids['Slayer'].hasOwnProperty(slayerTaskName)) {
                                        delete newValids['Slayer'][slayerTaskName];
                                    }
                                } else {
                                    delete baseChunkData['items'][drop][monster];
                                }
                            }
                            if (!!baseChunkData['items'][drop] && isEmpty(baseChunkData['items'][drop])) {
                                delete baseChunkData['items'][drop];
                            }
                            !!dropRatesGlobal[monster] && delete dropRatesGlobal[monster][drop];
                            if (!!dropRatesGlobal[monster] && isEmpty(dropRatesGlobal[monster])) {
                                delete dropRatesGlobal[monster];
                            }
                            !!dropTablesGlobal[monster] && delete dropTablesGlobal[monster][drop];
                            if (!!dropTablesGlobal[monster] && isEmpty(dropTablesGlobal[monster])) {
                                delete dropTablesGlobal[monster];
                            }
                        }
                    });
                }
            } else if (tempValid && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster])) {
                if (!baseChunkData['monsters'].hasOwnProperty(monster)) {
                    baseChunkData['monsters'][monster] = {};
                }
                baseChunkData['monsters'][monster][chunk] = true;
                !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]).forEach((drop) => {
                    !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach((quantity) => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                            Object.keys(dropTables[drop]).forEach((item) => {
                                if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                    if (!baseChunkData['items'][item]) {
                                        baseChunkData['items'][item] = {};
                                    }
                                    if ((chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always') || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && (isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', '')) || isNaN(dropTables[drop][item].split('@')[0].replaceAll('/', '').replaceAll('@', '')))) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                                        baseChunkData['items'][item][monster] = 'primary-drop';
                                    } else {
                                        baseChunkData['items'][item][monster] = 'secondary-drop';
                                    }
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    if (!dropTablesGlobal[monster]) {
                                        dropTablesGlobal[monster] = {};
                                    }
                                    if (!dropTablesGlobal[monster][item]) {
                                        dropTablesGlobal[monster][item] = {};
                                    }
                                    let calcedQuantity;
                                    if (dropTables[drop][item].split('@')[1].includes(' (noted)')) {
                                        if (dropTables[drop][item].split('@')[1].includes(' (F2P)')) {
                                            calcedQuantity = dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted) (F2P)';
                                        } else {
                                            calcedQuantity = dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)';
                                        }
                                    } else {
                                        if (dropTables[drop][item].split('@')[1].includes(' (F2P)')) {
                                            calcedQuantity = dropTables[drop][item].split('@')[1].split(' (F2P)')[0] * quantity + ' (F2P)';
                                        } else {
                                            calcedQuantity = dropTables[drop][item].split('@')[1] * quantity;
                                        }
                                    }
                                    dropTablesGlobal[monster][item][calcedQuantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                }
                            });
                        } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                            if (!baseChunkData['items'][drop]) {
                                baseChunkData['items'][drop] = {};
                            }
                            if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                baseChunkData['items'][drop][monster] = 'primary-drop';
                            } else {
                                baseChunkData['items'][drop][monster] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                        }
                    });
                });
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['NPCs'] && Object.keys(chunkInfo['taskUnlocks']['NPCs']).forEach((npc) => {
        Object.keys(chunkInfo['taskUnlocks']['NPCs'][npc]).forEach((chunk) => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['NPCs'][npc][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['NPCs'][npc][chunk].length));
            if ((!chunk.includes('-') && !chunks.hasOwnProperty(chunk)) || (chunk.includes('-') && (!chunks.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections[chunk.split('-')[0]].hasOwnProperty(chunk.split('-')[1])))) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['npcs'].hasOwnProperty(npc) && baseChunkData['npcs'][npc].hasOwnProperty(chunk)) {
                !!baseChunkData['npcs'][npc] && delete baseChunkData['npcs'][npc][chunk];
                if (!!baseChunkData['npcs'][npc] && isEmpty(baseChunkData['npcs'][npc])) {
                    delete baseChunkData['npcs'][npc];
                }
            } else if (tempValid && (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc])) {
                if (!baseChunkData['npcs'].hasOwnProperty(npc)) {
                    baseChunkData['npcs'][npc] = {};
                }
                baseChunkData['npcs'][npc][chunk] = true;
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Objects'] && Object.keys(chunkInfo['taskUnlocks']['Objects']).forEach((object) => {
        Object.keys(chunkInfo['taskUnlocks']['Objects'][object]).forEach((chunk) => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Objects'][object][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['Objects'][object][chunk].length));
            if ((!chunk.includes('-') && !chunks.hasOwnProperty(chunk)) || (chunk.includes('-') && (!chunks.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections[chunk.split('-')[0]].hasOwnProperty(chunk.split('-')[1])))) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['objects'].hasOwnProperty(object) && baseChunkData['objects'][object].hasOwnProperty(chunk)) {
                !!baseChunkData['objects'][object] && delete baseChunkData['objects'][object][chunk];
                if (!!baseChunkData['objects'][object] && isEmpty(baseChunkData['objects'][object])) {
                    delete baseChunkData['objects'][object];
                }
            } else if (tempValid && (!backloggedSources['objects'] || !backloggedSources['objects'][object])) {
                if (!baseChunkData['objects'].hasOwnProperty(object)) {
                    baseChunkData['objects'][object] = {};
                }
                baseChunkData['objects'][object][chunk] = true;
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Shops'] && Object.keys(chunkInfo['taskUnlocks']['Shops']).forEach((shop) => {
        Object.keys(chunkInfo['taskUnlocks']['Shops'][shop]).forEach((chunk) => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Shops'][shop][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['Shops'][shop][chunk].length));
            if ((!chunk.includes('-') && !chunks.hasOwnProperty(chunk)) || (chunk.includes('-') && (!chunks.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections[chunk.split('-')[0]].hasOwnProperty(chunk.split('-')[1])))) {
                tempValid = false;
            }
            if (!tempValid && baseChunkData['shops'].hasOwnProperty(shop) && baseChunkData['shops'][shop].hasOwnProperty(chunk)) {
                !!baseChunkData['shops'][shop] && delete baseChunkData['shops'][shop][chunk];
                if (!!baseChunkData['shops'][shop] && isEmpty(baseChunkData['shops'][shop])) {
                    delete baseChunkData['shops'][shop];
                    !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).filter((item) => { return !!baseChunkData['items'][item] }).forEach((item) => {
                        delete baseChunkData['items'][item][shop];
                        if (isEmpty(baseChunkData['items'][item])) {
                            delete baseChunkData['items'][item];
                        }
                    });
                }
            } else if (tempValid && (!backloggedSources['shops'] || !backloggedSources['shops'][shop])) {
                if (!baseChunkData['shops'].hasOwnProperty(shop)) {
                    baseChunkData['shops'][shop] = {};
                }
                baseChunkData['shops'][shop][chunk] = true;
                !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).filter((item) => { return (!minigameShops[shop] || rules['Minigame']) && (!backloggedSources['items'] || !backloggedSources['items'][item]) }).forEach((item) => {
                    if (!baseChunkData['items'][item]) {
                        baseChunkData['items'][item] = {};
                    }
                    baseChunkData['items'][item][shop] = 'shop';
                });
            }
        });
    });
    !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Items'] && Object.keys(chunkInfo['taskUnlocks']['Items']).forEach((item) => {
        let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Items'][item].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['Items'][item].length));
        let monster = '';
        let asterisk = '*';
        if (item.includes('^')) {
            asterisk += '^';
            monster = item.split('^')[1];
            item = item.split('^')[0];
            monster === '' && (asterisk += '^');
        }
        if (!tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
            if (monster !== '' && monster.includes('-npc')) {
                !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return (source.toLowerCase().includes(monster.split('-npc')[0].toLowerCase())) }).forEach((source) => {
                    delete baseChunkData['items'][item][source];
                    if (isEmpty(baseChunkData['items'][item])) {
                        delete baseChunkData['items'][item];
                    }
                });
                if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                    dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                    delete dropRatesGlobal[monster][item];
                }
                if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                    dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                    delete dropTablesGlobal[monster][item];
                }
            } else if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return (source === monster) || (source.toLowerCase().includes(monster.toLowerCase()) && source.includes('Slay')) }).forEach((source) => {
                    delete baseChunkData['items'][item][source];
                    if (isEmpty(baseChunkData['items'][item])) {
                        delete baseChunkData['items'][item];
                    }
                });
                if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                    dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                    delete dropRatesGlobal[monster][item];
                }
                if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                    dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                    delete dropTablesGlobal[monster][item];
                }
            } else if (asterisk.includes('^') && monster === '') {
                baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = JSON.parse(JSON.stringify(baseChunkData['items'][item])));
                delete baseChunkData['items'][item];
                !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item) }).forEach((monster) => {
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                        dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                        delete dropRatesGlobal[monster][item];
                    }
                });
                !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item) }).forEach((monster) => {
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                        dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                        delete dropTablesGlobal[monster][item];
                    }
                });
            } else if (!asterisk.includes('^')) {
                baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = combineJSONs(baseChunkData['items'][item + asterisk], JSON.parse(JSON.stringify(baseChunkData['items'][item]))));
                delete baseChunkData['items'][item];
            }
        } else if (tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item + asterisk)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
            if (monster !== '' && monster.includes('-npc')) {
                if (!baseChunkData['items'].hasOwnProperty(item)) {
                    baseChunkData['items'][item] = {};
                }
                if (chunkInfo['drops'].hasOwnProperty(monster.split('-npc')[0])) {
                    !!chunkInfo['drops'][monster.split('-npc')[0]][item] && Object.keys(chunkInfo['drops'][monster.split('-npc')[0]][item]).forEach((quantity) => {
                        if (chunkInfo['drops'][monster.split('-npc')[0]][item][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                            baseChunkData['items'][item][monster.split('-npc')[0]] = 'primary-drop';
                        } else {
                            baseChunkData['items'][item][monster.split('-npc')[0]] = 'secondary-drop';
                        }
                    });
                } else if (!chunkInfo['drops'].hasOwnProperty(monster.split('-npc')[0]) && chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster.split('-npc')[0])) {
                    !!chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item] && Object.keys(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item]).forEach((quantity) => {
                        if (chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                            baseChunkData['items'][item][monster.split('-npc')[0]] = 'primary-drop';
                        } else {
                            baseChunkData['items'][item][monster.split('-npc')[0]] = 'secondary-drop';
                        }
                    });
                }
                if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                    dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                    delete dropRatesGlobal[monster][item + asterisk];
                }
                if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                    dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                    delete dropTablesGlobal[monster][item + asterisk];
                }
            } else if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                if ((chunkInfo['drops'].hasOwnProperty(monster) && chunkInfo['drops'][monster].hasOwnProperty(item) && ((parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))) || (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster) && ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))))) {
                    if (!baseChunkData['items'].hasOwnProperty(item)) {
                        baseChunkData['items'][item] = {};
                    }
                    if (chunkInfo['drops'].hasOwnProperty(monster)) {
                        !!chunkInfo['drops'][monster][item] && Object.keys(chunkInfo['drops'][monster][item]).forEach((quantity) => {
                            if (chunkInfo['drops'][monster][item][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster][item][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster][item][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][item][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][item][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                baseChunkData['items'][item][monster] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster] = 'secondary-drop';
                            }
                        });
                    } else if (!chunkInfo['drops'].hasOwnProperty(monster) && chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                        !!chunkInfo['skillItems']['Slayer'][monster][item] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][item]).forEach((quantity) => {
                            if (chunkInfo['skillItems']['Slayer'][monster][item][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['skillItems']['Slayer'][monster][item][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['skillItems']['Slayer'][monster][item][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['skillItems']['Slayer'][monster][item][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                baseChunkData['items'][item][monster] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster] = 'secondary-drop';
                            }
                        });
                    }
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                        dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                        delete dropRatesGlobal[monster][item + asterisk];
                    }
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                        dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                        delete dropTablesGlobal[monster][item + asterisk];
                    }
                }
            } else if (asterisk.includes('^') && monster === '') {
                baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = combineJSONs(baseChunkData['items'][item], JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk]))));
                delete baseChunkData['items'][item + asterisk];
                !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach((monster) => {
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                        dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                        delete dropRatesGlobal[monster][item + asterisk];
                    }
                });
                !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach((monster) => {
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                        dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                        delete dropTablesGlobal[monster][item + asterisk];
                    }
                });
            } else if (!asterisk.includes('^')) {
                baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = combineJSONs(baseChunkData['items'][item], JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk]))));
                delete baseChunkData['items'][item + asterisk];
            }
        }
    });
    if (rules['RDT'] && baseChunkData['items']['GemDropTable+'] && newValids && newValids['Quest'] && newValids['Quest'].hasOwnProperty("~|Legends' Quest|~ Complete the quest")) {
        Object.keys(baseChunkData['items']['GemDropTable+']).forEach((monster) => {
            !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]['GemDropTable+']).forEach((quantity) => {
                Object.keys(dropTables['GemDropTable+']).forEach((item) => {
                    if (chunkInfo['drops'].hasOwnProperty(monster) && (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1]) * parseFloat(dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTable+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                        if (!baseChunkData['items'][item]) {
                            baseChunkData['items'][item] = {};
                        }
                        if ((chunkInfo['drops'][monster]['GemDropTable+'][quantity] === 'Always' && dropTables['GemDropTable+'][item].split('@')[0] === 'Always') || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && (isNaN(chunkInfo['drops'][monster]['GemDropTable+'][quantity].replaceAll('/', '').replaceAll('@', '')) || isNaN(dropTables['GemDropTable+'][item].split('@')[0].replaceAll('/', '').replaceAll('@', '')))) || (parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTable+'][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTable+'][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                            baseChunkData['items'][item][monster] = 'primary-drop';
                        } else {
                            baseChunkData['items'][item][monster] = 'secondary-drop';
                        }
                        if (!dropRatesGlobal[monster]) {
                            dropRatesGlobal[monster] = {};
                        }
                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTable+'][item].split('/')[1].replaceAll('~', '')));
                    } else if (!chunkInfo['drops'].hasOwnProperty(monster) && monster.includes('Slay') && chunkInfo['challenges']['Slayer'][monster].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][monster]['Output'])) {
                        if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'].split('/')[1]) * parseFloat(dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTable+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                            (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!baseChunkData['items'][item]) {
                                baseChunkData['items'][item] = {};
                            }
                            if (chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']][item] === 'Always') {
                                baseChunkData['items'][item][monster] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            !!chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'] && Object.keys(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+']).forEach((quantity) => {
                                dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTable+'][item].split('/')[1].replaceAll('~', '')));
                            });
                        }
                    }
                });
            });
            !!chunkInfo['skillItems']['Slayer'][monster] && Object.keys(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+']).forEach((quantity) => {
                Object.keys(dropTables['GemDropTableLegends+']).forEach((item) => {
                    if (chunkInfo['drops'].hasOwnProperty(monster) && (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                        if (!baseChunkData['items'][item]) {
                            baseChunkData['items'][item] = {};
                        }
                        if (chunkInfo['skillItems']['Slayer'][monster][item] === 'Always') {
                            baseChunkData['items'][item][monster] = 'primary-drop';
                        } else {
                            baseChunkData['items'][item][monster] = 'secondary-drop';
                        }
                        if (!dropRatesGlobal[monster]) {
                            dropRatesGlobal[monster] = {};
                        }
                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                    } else if (!chunkInfo['drops'].hasOwnProperty(monster) && monster.includes('Slay') && chunkInfo['challenges']['Slayer'][monster].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][monster]['Output'])) {
                        if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                            (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!baseChunkData['items'][item]) {
                                baseChunkData['items'][item] = {};
                            }
                            if (chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']][item] === 'Always') {
                                baseChunkData['items'][item][monster] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            !!chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'] && Object.keys(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+']).forEach((quantity) => {
                                dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                            });
                        }
                    }
                });
            });
        });
    }
    if (!!chunks && Object.keys(chunks).filter(chunk => { return chunkInfo['unnotingChunks'].includes(chunk) }).length === 0) {
        !!dropTablesGlobal && Object.keys(dropTablesGlobal).forEach((monster) => {
            !!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).forEach((item) => {
                !!dropTablesGlobal[monster][item] && Object.keys(dropTablesGlobal[monster][item]).forEach((quantity) => {
                    if (quantity.includes('(noted)')) {
                        if (!!baseChunkData['items'] && !!baseChunkData['items'][item] && !!baseChunkData['items'][item][monster]) {
                            delete baseChunkData['items'][item][monster];
                            if (!baseChunkData['items'][item] || isEmpty(baseChunkData['items'][item])) {
                                delete baseChunkData['items'][item];
                            }
                        }
                    }
                });
            });
        });
    }
    if (!!chunks) {
        !!dropTablesGlobal && Object.keys(dropTablesGlobal).forEach((monster) => {
            !!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).forEach((item) => {
                !!dropTablesGlobal[monster][item] && Object.keys(dropTablesGlobal[monster][item]).forEach((quantity) => {
                    if (quantity.includes('(F2P)') && baseChunkData['monsters'].hasOwnProperty(monster) && Object.keys(baseChunkData['monsters'][monster]).filter(chunk => { return chunkInfo['walkableChunksF2P'].includes(chunk.split('-')[0]) }).length === 0) {
                        delete dropTablesGlobal[monster][item][quantity];
                        if (!dropTablesGlobal[monster][item] || isEmpty(dropTablesGlobal[monster][item])) {
                            delete dropTablesGlobal[monster][item];
                            if (!dropTablesGlobal[monster] || isEmpty(dropTablesGlobal[monster])) {
                                delete dropTablesGlobal[monster];
                            }
                            delete dropRatesGlobal[monster][item];
                            if (!!baseChunkData['items'] && !!baseChunkData['items'][item] && !!baseChunkData['items'][item][monster]) {
                                delete baseChunkData['items'][item][monster];
                                if (!baseChunkData['items'][item] || isEmpty(baseChunkData['items'][item])) {
                                    delete baseChunkData['items'][item];
                                }
                            }
                        }
                    }
                });
            });
        });
    }

    do {
        i++;
        type === 'current' && postMessage(((i + 1) * 6) + '%');
        !!tempItemSkill && Object.keys(tempItemSkill).forEach((skill) => {
            let skillMax = Math.max(...Object.values(newValids[skill]));
            !!tempItemSkill[skill] && Object.keys(tempItemSkill[skill]).forEach((item) => {
                !!tempItemSkill[skill][item] && !!tempItemSkill[skill][item].filter(itemTask => (!newValids[skill] || !chunkInfo['challenges'][skill] || !chunkInfo['challenges'][skill][itemTask] || (skillMax < chunkInfo['challenges'][skill][itemTask]['Level'] && !rules['Multi Step Processing']))).forEach((itemTask) => {
                    delete tempItemSkill[skill][item][tempItemSkill[skill][item].indexOf(itemTask)];
                });
            });
        });
        valids = newValids;
        [newValids, tempItemSkill, tempMultiStepSkill] = calcChallengesWork(chunks, baseChunkData, tempItemSkill);
        !!manualTasks && Object.keys(manualTasks).forEach((skill) => {
            skill !== 'BiS' && Object.keys(manualTasks[skill]).filter(challenge => !!chunkInfo['challenges'][skill] && !!chunkInfo['challenges'][skill][challenge]).forEach((challenge) => {
                if (!valids[skill]) {
                    valids[skill] = {};
                }
                valids[skill][challenge] = manualTasks[skill][challenge];
                if (!newValids[skill]) {
                    newValids[skill] = {};
                }
                newValids[skill][challenge] = manualTasks[skill][challenge];
                chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && (chunkInfo['challenges'][skill][challenge]['ManualValid'] = true);
            });
        });
        !!userTasks && Object.keys(userTasks).forEach((skill) => {
            Object.keys(userTasks[skill]).forEach((challenge) => {
                if (!valids[skill]) {
                    valids[skill] = {};
                }
                valids[skill][challenge] = userTasks[skill][challenge];
                if (!newValids[skill]) {
                    newValids[skill] = {};
                }
                newValids[skill][challenge] = userTasks[skill][challenge];
                chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && (chunkInfo['challenges'][skill][challenge]['ManualValid'] = true);
            });
        });
        let fullyValid;
        let leftoversCount = 0;
        let savedValids = JSON.parse(JSON.stringify(newValids));
        let passedByTasks = {};
        let tasksModified;
        while ((leftoversCount < 10 && (Object.keys(diff(newValids, savedValids) || {}).length !== 0 || tasksModified)) || leftoversCount < 1) {
            tasksModified = false;
            savedValids = JSON.parse(JSON.stringify(newValids));
            Object.keys(savedValids).filter((skill) => { return skill !== 'BiS' }).forEach((skill) => {
                Object.keys(savedValids[skill]).sort(function(a, b) { return skill === 'Diary' ? ((diaryTierOrder.indexOf(a.split('|')[1].split('#')[1]) - diaryTierOrder.indexOf(b.split('|')[1].split('#')[1]) === 0) ? (chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(a) && chunkInfo['challenges'][skill].hasOwnProperty(b) && chunkInfo['challenges'][skill][a].hasOwnProperty('ManualShow') !== chunkInfo['challenges'][skill][b].hasOwnProperty('ManualShow') ? chunkInfo['challenges'][skill][a].hasOwnProperty('ManualShow') - chunkInfo['challenges'][skill][b].hasOwnProperty('ManualShow') : a.replaceAll('Task ', '').localeCompare(b.replaceAll('Task ', ''), 'en', { numeric: true })) : (diaryTierOrder.indexOf(a.split('|')[1].split('#')[1]) - diaryTierOrder.indexOf(b.split('|')[1].split('#')[1]))) : a.replaceAll('Task ', '').localeCompare(b.replaceAll('Task ', ''), 'en', { numeric: true }) }).forEach((challenge) => {
                    if (!passedByTasks[skill]) {
                        passedByTasks[skill] = {};
                    }
                    passedByTasks[skill][challenge] = true;
                    let bestBoost = 0;
                    let ownsCrystalSaw = false;
                    if (!!challenge && (!completedChallenges[skill] || (!completedChallenges[skill].hasOwnProperty(challenge) && !completedChallenges[skill][challenge.replaceAll('#', '/')]))) {
                        [bestBoost, ownsCrystalSaw] = calcBoost(skill, challenge, true);
                        if(ownsCrystalSaw)
                            chunkInfo['challenges'][skill][challenge]['ItemsDetails'].push('Crystal saw');
                    }
                    if ((!checkPrimaryMethod(skill, newValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] <= 1 || (chunkInfo['challenges'][skill][challenge]['Level'] - bestBoost) > passiveSkill[skill]) && (!skillQuestXp || !skillQuestXp.hasOwnProperty(skill) || (chunkInfo['challenges'][skill][challenge]['Level'] - bestBoost) > skillQuestXp[skill]['level'])) && !!chunkInfo['challenges'][skill][challenge] && chunkInfo['challenges'][skill][challenge]['Level'] > 1 && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                        let highestCompletedLevel = 0;
                        !!completedChallenges && completedChallenges.hasOwnProperty(skill) && Object.keys(completedChallenges[skill]).forEach((task) => {
                            if (!!chunkInfo['challenges'][skill] && !!chunkInfo['challenges'][skill][task] && !!chunkInfo['challenges'][skill][task]['Level'] && chunkInfo['challenges'][skill][task]['Level'] > highestCompletedLevel) {
                                highestCompletedLevel = chunkInfo['challenges'][skill][task]['Level'];
                            }
                        });
                        if (highestCompletedLevel <= 1 || highestCompletedLevel < chunkInfo['challenges'][skill][challenge]['Level']) {
                            if (!nonValids.hasOwnProperty(challenge)) {
                                nonValids[challenge] = [];
                            }
                            nonValids[challenge] = [...nonValids[challenge], 'Passive'];
                            !!newValids[skill] && delete newValids[skill][challenge];
                            !!valids[skill] && delete valids[skill][challenge];
                            tasksModified = true;
                        }
                    }
                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                        return;
                    }
                    if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Skills')) {
                        Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).forEach((subSkill) => {
                            let bestBoost = 0;
                            let ownsCrystalSaw = false;
                            if (!!challenge && newValids.hasOwnProperty(subSkill)  && (!completedChallenges[subSkill] || (!completedChallenges[subSkill].hasOwnProperty(challenge) && !completedChallenges[subSkill][challenge.replaceAll('#', '/')]))) {
                                [bestBoost, ownsCrystalSaw] = calcBoost(subSkill, challenge, true, skill);
                                if(ownsCrystalSaw)
                                    chunkInfo['challenges'][subSkill][challenge]['ItemsDetails'].push('Crystal saw');
                            }
                            let highestCompletedLevel = 0;
                            !!completedChallenges && completedChallenges.hasOwnProperty(subSkill) && Object.keys(completedChallenges[subSkill]).forEach((task) => {
                                if (!!chunkInfo['challenges'][subSkill] && !!chunkInfo['challenges'][subSkill][task] && !!chunkInfo['challenges'][subSkill][task]['Level'] && chunkInfo['challenges'][subSkill][task]['Level'] > highestCompletedLevel) {
                                    highestCompletedLevel = chunkInfo['challenges'][subSkill][task]['Level'];
                                }
                            });
                            if ((!checkPrimaryMethod(subSkill, newValids, baseChunkData) && ((subSkill !== 'Slayer' || !slayerLocked || (chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] - bestBoost) > slayerLocked['level'])) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] <= 1 || (chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] - bestBoost) > passiveSkill[subSkill]) && (highestCompletedLevel <= 1 || highestCompletedLevel <= chunkInfo['challenges'][skill][challenge]['Skills'][subSkill])) || (subSkill === 'Slayer' && !!slayerLocked && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level']) || (!!maxSkill && maxSkill.hasOwnProperty(subSkill) && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > maxSkill[subSkill])) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], subSkill];
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                tasksModified = true;
                            }
                        });
                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                            return;
                        }
                    }
                    if ((skill !== 'Extra' || chunkInfo['challenges'][skill][challenge].hasOwnProperty('Requirements')) && savedValids.hasOwnProperty(skill) && savedValids[skill].hasOwnProperty(challenge)) {
                        fullyValid = true;
                        !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach((subTask) => {
                            if (subTask.includes('[+]') && tasksPlus.hasOwnProperty(subTask.split('[+]x')[0].replaceAll('[+]', '') + '[+]')) {
                                if (subTask.includes('[+]x')) {
                                    let xNum = parseInt(subTask.split('[+]x')[1]);
                                    let xResults = 0;
                                    let xSubTask = subTask.split('[+]x')[0] + '[+]';
                                    if (!tasksPlus[xSubTask] && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                        if (!nonValids.hasOwnProperty(challenge)) {
                                            nonValids[challenge] = [];
                                        }
                                        nonValids[challenge] = [...nonValids[challenge], xSubTask];
                                        fullyValid = false;
                                        !!newValids[skill] && delete newValids[skill][challenge];
                                        !!valids[skill] && delete valids[skill][challenge];
                                        !!savedValids[skill] && delete savedValids[skill][challenge];
                                        tasksModified = true;
                                        if ((!savedValids.hasOwnProperty(skill) || !savedValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                            markSubTasks(newValids, skill, challenge, true);
                                            return;
                                        }
                                    } else {
                                        let tempValid = false;
                                        tasksPlus[xSubTask].forEach((plus) => {
                                            if (!((!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], savedValids, baseChunkData) && !!savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] !== 1 && (!passiveSkill || !passiveSkill.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['Level'])) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]]) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (!savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]))) || (!!backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) || backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0].replaceAll('#', '/')))))) {
                                                tempValid = true;
                                                xResults++;
                                            } else if (skill === 'Diary' && chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]].hasOwnProperty('Reward') && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward') && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) {
                                                tempValid = true;
                                                xResults++;
                                            }
                                        });
                                        if ((!tempValid || xResults < xNum) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                            if (!nonValids.hasOwnProperty(challenge)) {
                                                nonValids[challenge] = [];
                                            }
                                            nonValids[challenge] = [...nonValids[challenge], xSubTask];
                                            fullyValid = false;
                                            !!newValids[skill] && delete newValids[skill][challenge];
                                            !!valids[skill] && delete valids[skill][challenge];
                                            !!savedValids[skill] && delete savedValids[skill][challenge];
                                            if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Output') && outputs.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Output']) && outputs[chunkInfo['challenges'][skill][challenge]['Output']].hasOwnProperty(challenge)) {
                                                delete outputs[chunkInfo['challenges'][skill][challenge]['Output']][challenge];
                                                if (isEmpty(outputs[chunkInfo['challenges'][skill][challenge]['Output']])) {
                                                    delete outputs[chunkInfo['challenges'][skill][challenge]['Output']];
                                                }
                                                delete baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']][challenge];
                                                if (!baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']]) {
                                                    delete baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']];
                                                    if (!baseChunkData['items']) {
                                                        delete baseChunkData['items'];
                                                    }
                                                }
                                            }
                                            tasksModified = true;
                                            if ((!savedValids.hasOwnProperty(skill) || !savedValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                                markSubTasks(newValids, skill, challenge, true);
                                                return;
                                            }
                                        }
                                    }
                                } else {
                                    let tempValid = false;
                                    tasksPlus[subTask].forEach((plus) => {
                                        if (!((!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], savedValids, baseChunkData) && !!savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] !== 1 && (!passiveSkill || !passiveSkill.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['Level'])) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]]) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (!savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]))) || (!!backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) || backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0].replaceAll('#', '/')))))) {
                                            tempValid = true;
                                        } else if (skill === 'Diary' && (chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' || subTask.includes('--')) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]].hasOwnProperty('Reward') && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward') && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) {
                                            tempValid = true;
                                        }
                                    });
                                    if (!tempValid && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                        if (!nonValids.hasOwnProperty(challenge)) {
                                            nonValids[challenge] = [];
                                        }
                                        nonValids[challenge] = [...nonValids[challenge], subTask];
                                        fullyValid = false;
                                        !!newValids[skill] && delete newValids[skill][challenge];
                                        !!valids[skill] && delete valids[skill][challenge];
                                        !!savedValids[skill] && delete savedValids[skill][challenge];
                                        tasksModified = true;
                                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                            markSubTasks(newValids, skill, challenge, true);
                                            return;
                                        }
                                    }
                                }
                            } else {
                                let highestCompletedLevel = 0;
                                !!completedChallenges && completedChallenges.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) && Object.keys(completedChallenges[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]]).forEach((task) => {
                                    if (!!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task]['Level'] && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task]['Level'] > highestCompletedLevel) {
                                        highestCompletedLevel = chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task]['Level'];
                                    }
                                });
                                if (!savedValids.hasOwnProperty(skill) || !savedValids[skill].hasOwnProperty(challenge) || (!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], savedValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] <= 1 || !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['Level']) && (highestCompletedLevel <= 1 || !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] || highestCompletedLevel < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['Level'])) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]))) || (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) || backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0].replaceAll('#', '/'))))) {
                                    if (!(skill === 'Diary' && (chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' || subTask.includes('--')) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && !chunkInfo['challenges'][skill][challenge]['ManualShow'] && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                        if (!nonValids.hasOwnProperty(challenge)) {
                                            nonValids[challenge] = [];
                                        }
                                        nonValids[challenge] = [...nonValids[challenge], subTask];
                                        fullyValid = false;
                                        !!newValids[skill] && delete newValids[skill][challenge];
                                        !!valids[skill] && delete valids[skill][challenge];
                                        !!savedValids[skill] && delete savedValids[skill][challenge];
                                        tasksModified = true;
                                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                            markSubTasks(newValids, skill, challenge, true);
                                            return;
                                        }
                                    }
                                }
                            }
                        });
                        if (!!chunkInfo['challenges'][skill][challenge]['BackupParent']) {
                            if (((!!valids[skill] && (valids[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']) || newValids[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']))) || challengeIsBacklogged(skill, chunkInfo['challenges'][skill][challenge]['BackupParent'])) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], chunkInfo['challenges'][skill][challenge]['BackupParent']];
                                fullyValid = false;
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                    markSubTasks(newValids, skill, challenge, true);
                                    return;
                                }
                            }
                        }
                        !!chunkInfo['challenges'][skill][challenge]['Requirements'] && chunkInfo['challenges'][skill][challenge]['Requirements'].filter((req) => { return !checkPrimaryMethod(req, newValids, baseChunkData) && !chunkInfo['challenges'][skill][challenge]['ManualValid'] }).some(req => {
                            if (!nonValids.hasOwnProperty(challenge)) {
                                nonValids[challenge] = [];
                            }
                            nonValids[challenge] = [...nonValids[challenge], req];
                            fullyValid = false;
                            !!newValids[skill] && delete newValids[skill][challenge];
                            !!valids[skill] && delete valids[skill][challenge];
                            if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                markSubTasks(newValids, skill, challenge, true);
                                return true;
                            }
                        });
                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                            markSubTasks(newValids, skill, challenge, true);
                            return;
                        }
                        if (fullyValid) {
                            markSubTasks(newValids, skill, challenge, false);
                        }
                    }
                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                        return;
                    }
                });
                let extraSets = {};
                skill === 'Extra' && Object.keys(newValids[skill]).filter((challenge) => { return chunkInfo['challenges'][skill][challenge].hasOwnProperty('Set') }).forEach((challenge) => {
                    if (!extraSets.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Set'])) {
                        extraSets[chunkInfo['challenges'][skill][challenge]['Set']] = challenge;
                    } else if ((chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][extraSets[chunkInfo['challenges'][skill][challenge]['Set']]]['Priority']) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                        if (!nonValids.hasOwnProperty(extraSets[newValids[skill][challenge]['Set']])) {
                            nonValids[extraSets[newValids[skill][challenge]['Set']]] = [];
                        }
                        nonValids[extraSets[newValids[skill][challenge]['Set']]] = [...nonValids[extraSets[newValids[skill][challenge]['Set']]], 'extraSets'];
                        !!newValids[skill] && delete newValids[skill][extraSets[newValids[skill][challenge]['Set']]];
                        !!valids[skill] && delete valids[skill][extraSets[newValids[skill][challenge]['Set']]];
                        extraSets[chunkInfo['challenges'][skill][challenge]['Set']] = challenge;
                    } else if (!chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                        if (!nonValids.hasOwnProperty(challenge)) {
                            nonValids[challenge] = [];
                        }
                        nonValids[challenge] = [...nonValids[challenge], 'extraSets'];
                        !!newValids[skill] && delete newValids[skill][challenge];
                        !!valids[skill] && delete valids[skill][challenge];
                    }
                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                        return;
                    }
                });
            });
            leftoversCount++;
        }
        Object.keys(newValids).filter((skill) => { return skill !== 'BiS' }).forEach((skill) => {
            let skillIsPrimary = checkPrimaryMethod(skill, newValids, baseChunkData);
            if (!skillIsPrimary && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] <= 1)) {
                tempValidsSkill = {};
                !!newValids[skill] && Object.keys(newValids[skill]).filter(task => { return newValids[skill][task] === 1 }).forEach((task) => {
                    tempValidsSkill[task] = newValids[skill][task];
                });
                newValids[skill] = tempValidsSkill;
            }
            skillIsPrimary && Object.keys(newValids[skill]).sort(function(a, b) { return a.localeCompare(b, 'en', { numeric: true }) }).forEach((challenge) => {
                fullyValid = true;
                if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('NoXp') && !rules["Highest Level"] && !!baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']] && hasMoreThanOneProperty(baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']])) {
                    delete newValids[skill][challenge];
                    if (!newValids[skill]) {
                        delete newValids[skill];
                    }
                    delete baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']][challenge];
                    if (!baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']]) {
                        delete baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']];
                        if (!baseChunkData['items']) {
                            delete baseChunkData['items'];
                        }
                    }
                    return;
                }
                !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach((subTask) => {
                    if (subTask.includes('[+]') && tasksPlus.hasOwnProperty(subTask.split('[+]x')[0].replaceAll('[+]', '') + '[+]')) {
                        if (subTask.includes('[+]x')) {
                            let xNum = parseInt(subTask.split('[+]x')[1]);
                            let xResults = 0;
                            let xSubTask = subTask.split('[+]x')[0] + '[+]';
                            if (!tasksPlus[xSubTask] && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], xSubTask];
                                fullyValid = false;
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Output') && outputs.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Output']) && outputs[chunkInfo['challenges'][skill][challenge]['Output']].hasOwnProperty(challenge)) {
                                    delete outputs[chunkInfo['challenges'][skill][challenge]['Output']][challenge];
                                    if (isEmpty(outputs[chunkInfo['challenges'][skill][challenge]['Output']])) {
                                        delete outputs[chunkInfo['challenges'][skill][challenge]['Output']];
                                    }
                                    delete baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']][challenge];
                                    if (!baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']]) {
                                        delete baseChunkData['items'][chunkInfo['challenges'][skill][challenge]['Output']];
                                        if (!baseChunkData['items']) {
                                            delete baseChunkData['items'];
                                        }
                                    }
                                }
                                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                    return;
                                }
                            } else {
                                let tempValid = false;
                                tasksPlus[xSubTask].forEach((plus) => {
                                    if (!((!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], savedValids, baseChunkData) && !!savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] !== 1 && (!passiveSkill || !passiveSkill.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['Level'])) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]]) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (!savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]))) || (!!backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) || backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0].replaceAll('#', '/')))))) {
                                        tempValid = true;
                                        xResults++;
                                    } else if (skill === 'Diary' && chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]].hasOwnProperty('Reward') && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward') && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) {
                                        tempValid = true;
                                        xResults++;
                                    }
                                });
                                if ((!tempValid || xResults < xNum) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                    if (!nonValids.hasOwnProperty(challenge)) {
                                        nonValids[challenge] = [];
                                    }
                                    nonValids[challenge] = [...nonValids[challenge], xSubTask];
                                    fullyValid = false;
                                    !!newValids[skill] && delete newValids[skill][challenge];
                                    !!valids[skill] && delete valids[skill][challenge];
                                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                        return;
                                    }
                                }
                            }
                        } else {
                            let tempValid = false;
                            tasksPlus[subTask].forEach((plus) => {
                                if (!((!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], savedValids, baseChunkData) && !!savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] !== 1 && (!passiveSkill || !passiveSkill.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['Level'])) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]]) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (!savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || !savedValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]))) || (!!backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) || backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0].replaceAll('#', '/')))))) {
                                    tempValid = true;
                                } else if (skill === 'Diary' && (chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' || subTask.includes('--')) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]].hasOwnProperty('Reward') && !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward') && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) {
                                    tempValid = true;
                                }
                            });
                            if (!tempValid && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], subTask];
                                fullyValid = false;
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                    return;
                                }
                            }
                        }
                    } else {
                        let highestCompletedLevel = 0;
                        !!completedChallenges && completedChallenges.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) && Object.keys(completedChallenges[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]]).forEach((task) => {
                            if (!!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task]['Level'] && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task]['Level'] > highestCompletedLevel) {
                                highestCompletedLevel = chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][task]['Level'];
                            }
                        });
                        if (!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge) || (!checkPrimaryMethod(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask], newValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] <= 1 || !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] || passiveSkill[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['Level']) && (highestCompletedLevel <= 1 || !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] || highestCompletedLevel < chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['Level'])) || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || !newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] || (!valids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && !newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]))) || (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]] && (backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) || backlog[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0].replaceAll('#', '/'))))) {
                            if (!(skill === 'Diary' && (chunkInfo['challenges'][skill][challenge]['Tasks'][subTask] === 'Diary' || subTask.includes('--')) && chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && !chunkInfo['challenges'][skill][challenge]['ManualShow'] && (rules['Show Diary Tasks Any'] || chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] === 'Combat Achievements')) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                                if (!nonValids.hasOwnProperty(challenge)) {
                                    nonValids[challenge] = [];
                                }
                                nonValids[challenge] = [...nonValids[challenge], subTask];
                                fullyValid = false;
                                !!newValids[skill] && delete newValids[skill][challenge];
                                !!valids[skill] && delete valids[skill][challenge];
                                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                                    return;
                                }
                            }
                        }
                    }
                });
                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                    return;
                }
                if (!!chunkInfo['challenges'][skill][challenge]['BackupParent']) {
                    if (((!!valids[skill] && (valids[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']) || newValids[skill].hasOwnProperty(chunkInfo['challenges'][skill][challenge]['BackupParent']))) || challengeIsBacklogged(skill, chunkInfo['challenges'][skill][challenge]['BackupParent'])) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                        if (!nonValids.hasOwnProperty(challenge)) {
                            nonValids[challenge] = [];
                        }
                        nonValids[challenge] = [...nonValids[challenge], chunkInfo['challenges'][skill][challenge]['BackupParent']];
                        fullyValid = false;
                        !!newValids[skill] && delete newValids[skill][challenge];
                        !!valids[skill] && delete valids[skill][challenge];
                        if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                            return;
                        }
                    }
                }
                !!chunkInfo['challenges'][skill][challenge]['Requirements'] && chunkInfo['challenges'][skill][challenge]['Requirements'].filter((req) => { return !checkPrimaryMethod(req, newValids, baseChunkData) && !chunkInfo['challenges'][skill][challenge]['ManualValid'] }).some(req => {
                    if (!nonValids.hasOwnProperty(challenge)) {
                        nonValids[challenge] = [];
                    }
                    nonValids[challenge] = [...nonValids[challenge], req];
                    fullyValid = false;
                    !!newValids[skill] && delete newValids[skill][challenge];
                    !!valids[skill] && delete valids[skill][challenge];
                    if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                        return true;
                    }
                });
                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                    return;
                }
                if (fullyValid) {
                    !!chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).forEach((subTask) => {
                        if (subTask.includes('[+]') && tasksPlus.hasOwnProperty(subTask.split('[+]x')[0].replaceAll('[+]', '') + '[+]')) {
                            if (subTask.includes('[+]x')) {
                                let xSubTask = subTask.split('[+]x')[0] + '[+]';
                                if (!tasksPlus[xSubTask]) {
                                    if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['BaseQuest'] && !challengeIsBacklogged(skill, challenge) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]]['ManualShow']) {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(xSubTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][xSubTask.split('--')[0]] = false);
                                    }
                                } else {
                                    tasksPlus[xSubTask].filter((plus) => { return !!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && !challengeIsBacklogged(skill, challenge) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['ManualShow'] }).forEach((plus) => {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] = false);
                                    });
                                }
                            } else {
                                if (!tasksPlus[subTask]) {
                                    if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && !challengeIsBacklogged(skill, challenge) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['ManualShow']) {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] = false);
                                    }
                                } else {
                                    tasksPlus[subTask].filter((plus) => { return !!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['BaseQuest'] && !challengeIsBacklogged(skill, challenge) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]]['ManualShow'] }).forEach((plus) => {
                                        newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(plus.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][plus.split('--')[0]] = false);
                                    });
                                }
                            }
                        } else {
                            if (!!chunkInfo['challenges'][skill][challenge]['BaseQuest'] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] && !!chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && chunkInfo['challenges'][skill][challenge]['BaseQuest'] === chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['BaseQuest'] && !challengeIsBacklogged(skill, challenge) && !chunkInfo['challenges'][chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]]['ManualShow']) {
                                newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask.split('--')[0]) && (newValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]][subTask.split('--')[0]] = false);
                            }
                        }
                    });
                }
            });
            let extraSets = {};
            skill === 'Extra' && Object.keys(newValids[skill]).filter((challenge) => { return chunkInfo['challenges'][skill][challenge].hasOwnProperty('Set') }).forEach((challenge) => {
                if (!extraSets.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Set'])) {
                    extraSets[chunkInfo['challenges'][skill][challenge]['Set']] = challenge;
                } else if ((chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][extraSets[chunkInfo['challenges'][skill][challenge]['Set']]]['Priority']) && !chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                    if (!nonValids.hasOwnProperty(challenge)) {
                        nonValids[challenge] = [];
                    }
                    nonValids[challenge] = [...nonValids[challenge], 'extraSets'];
                    !!newValids[skill] && delete newValids[skill][extraSets[newValids[skill][challenge]['Set']]];
                    !!valids[skill] && delete valids[skill][extraSets[newValids[skill][challenge]['Set']]];
                    extraSets[chunkInfo['challenges'][skill][challenge]['Set']] = challenge;
                } else if (!chunkInfo['challenges'][skill][challenge]['ManualValid']) {
                    if (!nonValids.hasOwnProperty(challenge)) {
                        nonValids[challenge] = [];
                    }
                    nonValids[challenge] = [...nonValids[challenge], 'extraSets'];
                    !!newValids[skill] && delete newValids[skill][challenge];
                    !!valids[skill] && delete valids[skill][challenge];
                }
                if ((!newValids.hasOwnProperty(skill) || !newValids[skill].hasOwnProperty(challenge)) && (!valids.hasOwnProperty(skill) || !valids[skill].hasOwnProperty(challenge))) {
                    return;
                }
            });
        });
        Object.keys(outputs).forEach((output) => {
            Object.keys(outputs[output]).filter(source => outputs[output][source].includes('-') && chunkInfo['challenges'].hasOwnProperty(outputs[output][source].split('-')[1]) && chunkInfo['challenges'][outputs[output][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][outputs[output][source].split('-')[1]][source].hasOwnProperty('NoXp')).forEach((source) => {
                if (!!baseChunkData['items'][output] && (hasMoreThanOneProperty(baseChunkData['items'][output]) || !baseChunkData['items'][output].hasOwnProperty(source))) {
                    delete newValids[outputs[output][source].split('-')[1]][source];
                    if (!newValids[outputs[output][source].split('-')[1]]) {
                        delete newValids[outputs[output][source].split('-')[1]];
                    }
                }
            });
        });
        let highestChanged;
        let tempHighest = {}
        Object.keys(newValids).filter(skill => skillNames.includes(skill)).forEach((skill) => {
            tempHighest[skill] = Object.keys(newValids[skill]).sort((a, b) => newValids[skill][a] - newValids[skill][b]);
            Object.keys(newValids[skill]).filter(task => chunkInfo['challenges'][skill][task]['mustBeHighest'] && chunkInfo['challenges'][skill][task].hasOwnProperty('Tasks')).sort((a, b) => newValids[skill][b] - newValids[skill][a]).some(task => {
                let uniqueItem = !tempItemSkill.hasOwnProperty(skill);
                tempItemSkill.hasOwnProperty(skill) && chunkInfo['challenges'][skill][task].hasOwnProperty('Items') && chunkInfo['challenges'][skill][task]['Items'].some(item => {
                    if (item.replaceAll(/\*/g, '').includes('[+]') && itemsPlus.hasOwnProperty(item.replaceAll(/\*/g, ''))) {
                        if (!!itemsPlus[item.replaceAll(/\*/g, '')] && itemsPlus[item.replaceAll(/\*/g, '')].some((plus) => { return !!baseChunkData['items'][plus] && (!Object.values(baseChunkData['items'][plus]).includes('primary-Farming') || rules['Farming Primary']) && !tools[plus] && (skill !== 'Magic' || !magicTools[plus]) && !tempItemSkill[skill].hasOwnProperty(plus) })) {
                            uniqueItem = true;
                            return true;
                        }
                    } else {
                        if (!!baseChunkData['items'] && !tools[item.replaceAll(/\*/g, '')] && !!baseChunkData['items'][item.replaceAll(/\*/g, '')] && (skill !== 'Magic' || !magicTools[item.replaceAll(/\*/g, '')]) && !tempItemSkill[skill].hasOwnProperty(item.replaceAll(/\*/g, ''))) {
                            uniqueItem = true;
                            return true;
                        }
                    }
                });
                if (uniqueItem) {
                    return true;
                }
                highestChanged = false;
                Object.keys(chunkInfo['challenges'][skill][task]['Tasks']).filter(subTask => skillNames.includes(chunkInfo['challenges'][skill][task]['Tasks'][subTask])).some(subTask => {
                    if (subTask.split('--')[0] === task && !!tempHighest[chunkInfo['challenges'][skill][task]['Tasks'][subTask]] && tempHighest[chunkInfo['challenges'][skill][task]['Tasks'][subTask]][tempHighest[chunkInfo['challenges'][skill][task]['Tasks'][subTask]].length - 1] !== task) {
                        delete newValids[skill][task];
                        delete newValids[subTask.split('--')[1]][task];
                        tempHighest[chunkInfo['challenges'][skill][task]['Tasks'][subTask]].splice(-1, 1);
                        highestChanged = true;
                        return true;
                    }
                });
                if (!highestChanged) {
                    return true;
                }
            });
        });
        rules["Highest Level"] && Object.keys(tempItemSkill).forEach((skill) => {
            Object.keys(tempItemSkill[skill]).filter((item) => { return !!baseChunkData['items'][item] }).forEach((item) => {
                tempItemSkill[skill][item].filter((name) => { return !!chunkInfo['challenges'][skill][name] && !chunkInfo['challenges'][skill][name].hasOwnProperty('NoXp') && !chunkInfo['challenges'][skill][name].hasOwnProperty('AllowMulti') }).forEach((name) => {
                    let challenge = chunkInfo['challenges'][skill][name];
                    if (challenge.hasOwnProperty('Tasks')) {
                        Object.keys(challenge['Tasks']).some(subTask => {
                            if (!newValids.hasOwnProperty(challenge['Tasks'][subTask]) || !newValids[challenge['Tasks'][subTask]].hasOwnProperty(subTask)) {
                                !!newValids[skill] && delete newValids[skill][name];
                                !!valids[skill] && delete valids[skill][name];
                                !!tempItemSkill[skill][item] && tempItemSkill[skill][item].splice(tempItemSkill[skill][item].indexOf(name), 1);
                                if (!!tempItemSkill[skill][item] && tempItemSkill[skill][item].length === 0) {
                                    delete tempItemSkill[skill][item];
                                }
                                return true;
                            }
                        });
                    }
                    if (challenge.hasOwnProperty('Skills')) {
                        let subSkillValid = !(Object.keys(challenge['Skills']).some((subSkill) => { return !checkPrimaryMethod(subSkill, newValids, baseChunkData) || (subSkill === 'Slayer' && !!slayerLocked && challenge['Skills'][subSkill] > slayerLocked['level']) || (!!maxSkill && maxSkill.hasOwnProperty(subSkill) && challenge['Skills'][subSkill] > maxSkill[subSkill]) }));
                        if (!subSkillValid) {
                            !!newValids[skill] && delete newValids[skill][name];
                            !!valids[skill] && delete valids[skill][name];
                            !!tempItemSkill[skill][item] && tempItemSkill[skill][item].splice(tempItemSkill[skill][item].indexOf(name), 1);
                            if (!!tempItemSkill[skill][item] && tempItemSkill[skill][item].length === 0) {
                                delete tempItemSkill[skill][item];
                            }
                        }
                    }
                });
            });
        });
        !rules["Highest Level"] && Object.keys(tempItemSkill).forEach((skill) => {
            Object.keys(tempItemSkill[skill]).filter((item) => { return !!baseChunkData['items'][item] }).forEach((item) => {
                let lowestItem;
                let lowestName;
                let taskIsRemoved;
                tempItemSkill[skill][item].filter((name) => { return !!chunkInfo['challenges'][skill][name] && !chunkInfo['challenges'][skill][name].hasOwnProperty('NoXp') && !chunkInfo['challenges'][skill][name].hasOwnProperty('AllowMulti') }).forEach((name) => {
                    taskIsRemoved = false;
                    let challenge = chunkInfo['challenges'][skill][name];
                    if (challenge.hasOwnProperty('Tasks')) {
                        Object.keys(challenge['Tasks']).some(subTask => {
                            if (!newValids.hasOwnProperty(challenge['Tasks'][subTask]) || !newValids[challenge['Tasks'][subTask]].hasOwnProperty(subTask)) {
                                !!newValids[skill] && delete newValids[skill][name];
                                !!valids[skill] && delete valids[skill][name];
                                !!tempItemSkill[skill][item] && tempItemSkill[skill][item].splice(tempItemSkill[skill][item].indexOf(name), 1);
                                if (!!tempItemSkill[skill][item] && tempItemSkill[skill][item].length === 0) {
                                    delete tempItemSkill[skill][item];
                                }
                                taskIsRemoved = true;
                                return true;
                            }
                        });
                    }
                    if (challenge.hasOwnProperty('Skills')) {
                        let subSkillValid = !(Object.keys(challenge['Skills']).some((subSkill) => { return !checkPrimaryMethod(subSkill, newValids, baseChunkData) || (subSkill === 'Slayer' && !!slayerLocked && challenge['Skills'][subSkill] > slayerLocked['level']) || (!!maxSkill && maxSkill.hasOwnProperty(subSkill) && challenge['Skills'][subSkill] > maxSkill[subSkill]) }));
                        if (!subSkillValid) {
                            !!newValids[skill] && delete newValids[skill][name];
                            !!valids[skill] && delete valids[skill][name];
                            !!tempItemSkill[skill][item] && tempItemSkill[skill][item].splice(tempItemSkill[skill][item].indexOf(name), 1);
                            if (!!tempItemSkill[skill][item] && tempItemSkill[skill][item].length === 0) {
                                delete tempItemSkill[skill][item];
                            }
                            taskIsRemoved = true;
                        }
                    }
                    if (!taskIsRemoved && newValids.hasOwnProperty(skill) && checkPrimaryMethod(skill, newValids, baseChunkData) && !challengeIsBacklogged(skill, name)) {
                        if (!lowestItem || lowestItem['Level'] > challenge['Level']) {
                            lowestItem = challenge;
                            lowestName = name;
                        } else if (lowestItem['Level'] === challenge['Level'] && ((!!challenge['Priority'] && (challenge['Priority'] < lowestItem['Priority'])) || !lowestItem['Priority'])) {
                            lowestItem = challenge;
                            lowestName = name;
                        }
                    }
                });
                if (!!lowestName) {
                    !newValids[skill] && (newValids[skill] = {});
                    newValids[skill][lowestName] = chunkInfo['challenges'][skill][lowestName]['Level'];
                }
            });
        });
        Object.keys(tempItemSkill).forEach((skill) => {
            let lowestName;
            let lowestLevel;
            !!newValids[skill] && Object.keys(newValids[skill]).forEach((challenge) => {
                if ((!lowestLevel || (lowestLevel < newValids[skill][challenge])) && !challengeIsBacklogged(skill, challenge)) {
                    lowestName = challenge;
                    lowestLevel = newValids[skill][challenge];
                }
            });
            if (!!passiveSkill && passiveSkill.hasOwnProperty(skill) && passiveSkill[skill] > 1 && passiveSkill[skill] > lowestLevel) {
                lowestLevel = passiveSkill[skill];
            } else if (!!skillQuestXp && skillQuestXp.hasOwnProperty(skill) && skillQuestXp[skill]['level'] > lowestLevel) {
                lowestLevel = skillQuestXp[skill]['level'];
            }
            !!lowestName && Object.keys(tempItemSkill[skill]).forEach((item) => {
                !!baseChunkData['items'][item] && tempItemSkill[skill][item].filter((name) => { return chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(name) && (chunkInfo['challenges'][skill][name]['Level'] <= lowestLevel) && name !== lowestName}).forEach((name) => {
                    let stillValid = true;
                    chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).some(subTask => {
                        if (!newValids.hasOwnProperty(chunkInfo['challenges'][skill][name]['Tasks'][subTask]) || !newValids[chunkInfo['challenges'][skill][name]['Tasks'][subTask]].hasOwnProperty(subTask)) {
                            stillValid = false;
                            return true;
                        }
                    });
                    if (stillValid) {
                        !newValids[skill] && (newValids[skill] = {});
                        newValids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
                        chunkInfo['challenges'][skill][name]['Priority'] = (chunkInfo['challenges'][skill][name].hasOwnProperty('Priority') ? chunkInfo['challenges'][skill][name]['Priority'] : -1) + 1000;
                    }
                });
            });
        });
        Object.keys(tempMultiStepSkill).forEach((skill) => {
            let lowestLevel;
            !!newValids[skill] && Object.keys(newValids[skill]).forEach((challenge) => {
                if ((!lowestLevel || (lowestLevel < newValids[skill][challenge])) && !challengeIsBacklogged(skill, challenge)) {
                    lowestLevel = newValids[skill][challenge];
                }
            });
            if (!!passiveSkill && passiveSkill.hasOwnProperty(skill) && passiveSkill[skill] > 1 && passiveSkill[skill] > lowestLevel) {
                lowestLevel = passiveSkill[skill];
            } else if (!!skillQuestXp && skillQuestXp.hasOwnProperty(skill) && skillQuestXp[skill]['level'] > lowestLevel) {
                lowestLevel = skillQuestXp[skill]['level'];
            }
            !!lowestLevel && Object.keys(tempMultiStepSkill[skill]).filter((name) => { return chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(name) && (chunkInfo['challenges'][skill][name]['Level'] <= lowestLevel)}).forEach((name) => {
                let stillValid = true;
                chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).some(subTask => {
                    if (!newValids.hasOwnProperty(chunkInfo['challenges'][skill][name]['Tasks'][subTask]) || !newValids[chunkInfo['challenges'][skill][name]['Tasks'][subTask]].hasOwnProperty(subTask)) {
                        stillValid = false;
                        return true;
                    }
                });
                if (stillValid) {
                    !newValids[skill] && (newValids[skill] = {});
                    newValids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
                    chunkInfo['challenges'][skill][name]['Priority'] = 999;
                }
            });
        });
        let sectionsAdded = false;
        newValids.hasOwnProperty('Nonskill') && Object.keys(newValids['Nonskill']).filter((task) => { return !!chunkInfo['challenges']['Nonskill'][task] && chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('ConnectsSections') }).forEach((task) => {
            chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('Sections') && chunkInfo['challenges']['Nonskill'][task]['Sections'].filter((section) => section.includes('-') && (!unlockedSections[section.split('-')[0]] || !unlockedSections[section.split('-')[0]][section.split('-')[1]])).forEach((section) => {
                if (!unlockedSections[section.split('-')[0]]) {
                    unlockedSections[section.split('-')[0]] = {};
                }
                unlockedSections[section.split('-')[0]][section.split('-')[1]] = true;
                sectionsAdded = true;
            });
        });
        let areasAdded = {};
        let tempChunkArray = [];
        !isOnlyManualAreas && newValids.hasOwnProperty('Nonskill') && Object.keys(newValids['Nonskill']).filter((task) => { return !!chunkInfo['challenges']['Nonskill'][task] && chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('UnlocksArea') && (!manualAreas.hasOwnProperty(task) || manualAreas[task]) }).forEach((task) => {
            if (chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('SkillsNeeded')) {
                let tempValidNeeded = true;
                Object.keys(chunkInfo['challenges']['Nonskill'][task]['SkillsNeeded']).some(taskSkill => {
                    if ((!checkPrimaryMethod(taskSkill, newValids, baseChunkData) || (taskSkill === 'Slayer' && (!!slayerLocked && chunkInfo['challenges']['Nonskill'][task]['SkillsNeeded'][taskSkill] > slayerLocked['level']))) && !(!!passiveSkill && passiveSkill.hasOwnProperty(taskSkill) && passiveSkill[taskSkill] > 1 && chunkInfo['challenges']['Nonskill'][task]['SkillsNeeded'][taskSkill] <= passiveSkill[taskSkill])) {
                        tempValidNeeded = false;
                        return true;
                    }
                });
                if (tempValidNeeded) {
                    tempChunkArray.push(task);
                }
            } else {
                tempChunkArray.push(task);
            }
        });
        let indexCount = 0;
        let startingSize = tempChunkArray.length;
        let deadChunkArray = [];
        while (indexCount < tempChunkArray.length && indexCount < (startingSize * 2)) {
            if (!chunks.hasOwnProperty(tempChunkArray[indexCount]) && possibleAreas.hasOwnProperty(tempChunkArray[indexCount])) {
                if (Object.keys(areasStructure[tempChunkArray[indexCount]]).some(subArea => { return chunks.hasOwnProperty(subArea) })) {
                    Object.keys(areasStructure[tempChunkArray[indexCount]]).filter(subArea => { return chunks.hasOwnProperty(subArea) && (!chunkInfo['sections'].hasOwnProperty(subArea) || Object.keys(chunkInfo['sections'][subArea]).filter((section) => section !== "0").length === 0 || unlockedSections.hasOwnProperty(subArea)) }).some(subArea => {
                        if (!chunkInfo['chunks'][subArea].hasOwnProperty('Sections')) {
                            chunks[tempChunkArray[indexCount]] = true;
                            areasAdded[tempChunkArray[indexCount]] = true;
                            return true;
                        } else {
                            let addedArea = false;
                            Object.keys(chunkInfo['chunks'][subArea]['Sections']).filter(section => chunkInfo['chunks'][subArea]['Sections'][section].hasOwnProperty('Connect') && Object.keys(chunkInfo['chunks'][subArea]['Sections'][section]['Connect']).some(connect => chunkInfo['chunks'][connect]['Name'] === tempChunkArray[indexCount] && unlockedSections[subArea].hasOwnProperty(section))).some(section => {
                                chunks[tempChunkArray[indexCount]] = true;
                                areasAdded[tempChunkArray[indexCount]] = true;
                                addedArea = true;
                                return true;
                            });
                            if (addedArea) {
                                return true;
                            }
                        }
                    });
                } else if (Object.keys(areasStructure[tempChunkArray[indexCount]]).some(subArea => { return tempChunkArray.includes(subArea) && possibleAreas.hasOwnProperty(subArea) }) && !deadChunkArray.includes(tempChunkArray[indexCount])) {
                    tempChunkArray.push(tempChunkArray[indexCount]);
                    deadChunkArray.push(tempChunkArray[indexCount]);
                }
            }
            indexCount++;
        }
        if (!isEmpty(areasAdded) || sectionsAdded) {
            baseChunkData = combineJSONs(baseChunkData, gatherChunksInfo(chunks));
        }
        let shouldDelete = {};
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Spawns'] && Object.keys(chunkInfo['taskUnlocks']['Spawns']).forEach((item) => {
            Object.keys(chunkInfo['taskUnlocks']['Spawns'][item]).forEach((chunk) => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Spawns'][item][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['Spawns'][item][chunk].length));
                if ((!chunk.includes('-') && !chunks.hasOwnProperty(chunk)) || (chunk.includes('-') && (!chunks.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections[chunk.split('-')[0]].hasOwnProperty(chunk.split('-')[1])))) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['items'].hasOwnProperty(item) && baseChunkData['items'][item].hasOwnProperty(chunk)) {
                    !!baseChunkData['items'][item] && delete baseChunkData['items'][item][chunk];
                    if (!!baseChunkData['items'][item] && isEmpty(baseChunkData['items'][item])) {
                        delete baseChunkData['items'][item];
                    }
                } else if (tempValid && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                    if (!baseChunkData['items'][item]) {
                        baseChunkData['items'][item] = {};
                    }
                    baseChunkData['items'][item][chunk] = rules['Primary Spawns'] ? 'primary-spawn' : 'secondary-spawn';
                }
            });
        });
        const telegrabTask = chunkInfo['challenges']['Magic']['Cast ~|telekinetic grab|~'];
        !!chunkInfo && !!chunkInfo['codeItems'] && !!chunkInfo['codeItems']['telegrabSpawns'] && Object.keys(chunkInfo['codeItems']['telegrabSpawns']).forEach((item) => {
            Object.keys(chunkInfo['codeItems']['telegrabSpawns'][item]).forEach((chunk) => {
                let tempValid = !(newValids && !(chunkInfo['codeItems']['telegrabSpawns'][item][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['codeItems']['telegrabSpawns'][item][chunk].length));
                if ((!chunk.includes('-') && !chunks.hasOwnProperty(chunk)) || (chunk.includes('-') && (!chunks.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections[chunk.split('-')[0]].hasOwnProperty(chunk.split('-')[1])))) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['items'].hasOwnProperty(item) && baseChunkData['items'][item].hasOwnProperty(chunk)) {
                    !!baseChunkData['items'][item] && delete baseChunkData['items'][item][chunk];
                    if (!!baseChunkData['items'][item] && isEmpty(baseChunkData['items'][item])) {
                        delete baseChunkData['items'][item];
                    }
                } else if (tempValid && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                    if (!baseChunkData['items'][item]) {
                        baseChunkData['items'][item] = {};
                    }
                    let primaryRunes = ((telegrabTask['Primary'] && (!telegrabTask['Secondary'] || rules['Secondary Primary'])) && (!backlog['Magic'] || !backlog['Magic'].hasOwnProperty('Cast ~|telekinetic grab|~'))) || telegrabTask['Manual'];
                    baseChunkData['items'][item][chunk] = rules['Primary Spawns'] && primaryRunes ? 'primary-spawn' : 'secondary-spawn';
                }
            });
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Monsters'] && Object.keys(chunkInfo['taskUnlocks']['Monsters']).forEach((monster) => {
            Object.keys(chunkInfo['taskUnlocks']['Monsters'][monster]).forEach((chunk) => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Monsters'][monster][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['Monsters'][monster][chunk].length));
                if ((!chunk.includes('-') && !chunks.hasOwnProperty(chunk)) || (chunk.includes('-') && (!chunks.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections[chunk.split('-')[0]].hasOwnProperty(chunk.split('-')[1])))) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['monsters'].hasOwnProperty(monster) && baseChunkData['monsters'][monster].hasOwnProperty(chunk)) {
                    !!baseChunkData['monsters'][monster] && delete baseChunkData['monsters'][monster][chunk];
                    if (!!baseChunkData['monsters'][monster] && isEmpty(baseChunkData['monsters'][monster])) {

                        delete baseChunkData['monsters'][monster];
                        let dropsObj = chunkInfo['drops'][monster];
                        if (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                            dropsObj = chunkInfo['skillItems']['Slayer'][monster];
                        }
                        !!dropsObj && Object.keys(dropsObj).forEach((drop) => {
                            if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                                Object.keys(dropTables[drop]).forEach((item) => {
                                    !!baseChunkData['items'][item] && delete baseChunkData['items'][item][monster];
                                    if (!!baseChunkData['items'][item] && isEmpty(baseChunkData['items'][item])) {
                                        delete baseChunkData['items'][item];
                                    }
                                    !!dropRatesGlobal[monster] && delete dropRatesGlobal[monster][item];
                                    if (!!dropRatesGlobal[monster] && isEmpty(dropRatesGlobal[monster])) {
                                        delete dropRatesGlobal[monster];
                                    }
                                    !!dropTablesGlobal[monster] && delete dropTablesGlobal[monster][item];
                                    if (!!dropTablesGlobal[monster] && isEmpty(dropTablesGlobal[monster])) {
                                        delete dropTablesGlobal[monster];
                                    }
                                });
                            } else {
                                if (!!baseChunkData['items'][drop]) {
                                    if (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                                        let re = new RegExp(`/Slay .*\~|${monster}|\~.*/`,"gm");
                                        let slayerTaskName = (!!baseChunkData['items'][drop] && Object.keys(baseChunkData['items'][drop]).find(value => re.test(value))) || (!!newValids['Slayer'] && Object.keys(newValids['Slayer']).find(value => re.test(value))) || "";
                                        delete baseChunkData['items'][drop][slayerTaskName];
                                        if (newValids.hasOwnProperty('Slayer') && newValids['Slayer'].hasOwnProperty(slayerTaskName)) {
                                            delete newValids['Slayer'][slayerTaskName];
                                        }
                                    } else {
                                        delete baseChunkData['items'][drop][monster];
                                    }
                                }
                                if (!!baseChunkData['items'][drop] && isEmpty(baseChunkData['items'][drop])) {
                                    delete baseChunkData['items'][drop];
                                }
                                !!dropRatesGlobal[monster] && delete dropRatesGlobal[monster][drop];
                                if (!!dropRatesGlobal[monster] && isEmpty(dropRatesGlobal[monster])) {
                                    delete dropRatesGlobal[monster];
                                }
                                !!dropTablesGlobal[monster] && delete dropTablesGlobal[monster][drop];
                                if (!!dropTablesGlobal[monster] && isEmpty(dropTablesGlobal[monster])) {
                                    delete dropTablesGlobal[monster];
                                }
                            }
                        });
                    }
                } else if (tempValid && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster])) {
                    if (!baseChunkData['monsters'].hasOwnProperty(monster)) {
                        baseChunkData['monsters'][monster] = {};
                    }
                    baseChunkData['monsters'][monster][chunk] = true;
                    !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]).forEach((drop) => {
                        !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach((quantity) => {
                            if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                                Object.keys(dropTables[drop]).forEach((item) => {
                                    if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                        if (!baseChunkData['items'][item]) {
                                            baseChunkData['items'][item] = {};
                                        }
                                        if ((chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always') || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && (isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', '')) || isNaN(dropTables[drop][item].split('@')[0].replaceAll('/', '').replaceAll('@', '')))) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                                            baseChunkData['items'][item][monster] = 'primary-drop';
                                        } else {
                                            baseChunkData['items'][item][monster] = 'secondary-drop';
                                        }
                                        if (!dropRatesGlobal[monster]) {
                                            dropRatesGlobal[monster] = {};
                                        }
                                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                        if (!dropTablesGlobal[monster]) {
                                            dropTablesGlobal[monster] = {};
                                        }
                                        if (!dropTablesGlobal[monster][item]) {
                                            dropTablesGlobal[monster][item] = {};
                                        }
                                        let calcedQuantity;
                                        if (dropTables[drop][item].split('@')[1].includes(' (noted)')) {
                                            if (dropTables[drop][item].split('@')[1].includes(' (F2P)')) {
                                                calcedQuantity = dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted) (F2P)';
                                            } else {
                                                calcedQuantity = dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)';
                                            }
                                        } else {
                                            if (dropTables[drop][item].split('@')[1].includes(' (F2P)')) {
                                                calcedQuantity = dropTables[drop][item].split('@')[1].split(' (F2P)')[0] * quantity + ' (F2P)';
                                            } else {
                                                calcedQuantity = dropTables[drop][item].split('@')[1] * quantity;
                                            }
                                        }
                                        dropTablesGlobal[monster][item][calcedQuantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    }
                                });
                            } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                                if (!baseChunkData['items'][drop]) {
                                    baseChunkData['items'][drop] = {};
                                }
                                if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    baseChunkData['items'][drop][monster] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][drop][monster] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][drop]) {
                                    dropTablesGlobal[monster][drop] = {};
                                }
                                dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            }
                        });
                    });
                }
            });
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['NPCs'] && Object.keys(chunkInfo['taskUnlocks']['NPCs']).forEach((npc) => {
            Object.keys(chunkInfo['taskUnlocks']['NPCs'][npc]).forEach((chunk) => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['NPCs'][npc][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['NPCs'][npc][chunk].length));
                if ((!chunk.includes('-') && !chunks.hasOwnProperty(chunk)) || (chunk.includes('-') && (!chunks.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections[chunk.split('-')[0]].hasOwnProperty(chunk.split('-')[1])))) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['npcs'].hasOwnProperty(npc) && baseChunkData['npcs'][npc].hasOwnProperty(chunk)) {
                    !!baseChunkData['npcs'][npc] && delete baseChunkData['npcs'][npc][chunk];
                    if (!!baseChunkData['npcs'][npc] && isEmpty(baseChunkData['npcs'][npc])) {
                        delete baseChunkData['npcs'][npc];
                    }
                } else if (tempValid && (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc])) {
                    if (!baseChunkData['npcs'].hasOwnProperty(npc)) {
                        baseChunkData['npcs'][npc] = {};
                    }
                    baseChunkData['npcs'][npc][chunk] = true;
                }
            });
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Objects'] && Object.keys(chunkInfo['taskUnlocks']['Objects']).forEach((object) => {
            Object.keys(chunkInfo['taskUnlocks']['Objects'][object]).forEach((chunk) => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Objects'][object][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['Objects'][object][chunk].length));
                if ((!chunk.includes('-') && !chunks.hasOwnProperty(chunk)) || (chunk.includes('-') && (!chunks.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections[chunk.split('-')[0]].hasOwnProperty(chunk.split('-')[1])))) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['objects'].hasOwnProperty(object) && baseChunkData['objects'][object].hasOwnProperty(chunk)) {
                    !!baseChunkData['objects'][object] && delete baseChunkData['objects'][object][chunk];
                    if (!!baseChunkData['objects'][object] && isEmpty(baseChunkData['objects'][object])) {
                        delete baseChunkData['objects'][object];
                    }
                } else if (tempValid && (!backloggedSources['objects'] || !backloggedSources['objects'][object])) {
                    if (!baseChunkData['objects'].hasOwnProperty(object)) {
                        baseChunkData['objects'][object] = {};
                    }
                    baseChunkData['objects'][object][chunk] = true;
                }
            });
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Shops'] && Object.keys(chunkInfo['taskUnlocks']['Shops']).forEach((shop) => {
            Object.keys(chunkInfo['taskUnlocks']['Shops'][shop]).forEach((chunk) => {
                let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Shops'][shop][chunk].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['Shops'][shop][chunk].length));
                if ((!chunk.includes('-') && !chunks.hasOwnProperty(chunk)) || (chunk.includes('-') && (!chunks.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections.hasOwnProperty(chunk.split('-')[0]) || !unlockedSections[chunk.split('-')[0]].hasOwnProperty(chunk.split('-')[1])))) {
                    tempValid = false;
                }
                if (!tempValid && baseChunkData['shops'].hasOwnProperty(shop) && baseChunkData['shops'][shop].hasOwnProperty(chunk)) {
                    !!baseChunkData['shops'][shop] && delete baseChunkData['shops'][shop][chunk];
                    if (!!baseChunkData['shops'][shop] && isEmpty(baseChunkData['shops'][shop])) {
                        delete baseChunkData['shops'][shop];
                        !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).filter((item) => { return !!baseChunkData['items'][item] }).forEach((item) => {
                            delete baseChunkData['items'][item][shop];
                            if (isEmpty(baseChunkData['items'][item])) {
                                delete baseChunkData['items'][item];
                            }
                        });
                    }
                } else if (tempValid && (!backloggedSources['shops'] || !backloggedSources['shops'][shop])) {
                    if (!baseChunkData['shops'].hasOwnProperty(shop)) {
                        baseChunkData['shops'][shop] = {};
                    }
                    baseChunkData['shops'][shop][chunk] = true;
                    !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).filter((item) => { return (!minigameShops[shop] || rules['Minigame']) && (!backloggedSources['items'] || !backloggedSources['items'][item]) }).forEach((item) => {
                        if (!baseChunkData['items'][item]) {
                            baseChunkData['items'][item] = {};
                        }
                        baseChunkData['items'][item][shop] = 'shop';
                    });
                }
            });
        });
        let slayerTaskLockedItems = {};
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Items'] && Object.keys(chunkInfo['taskUnlocks']['Items']).forEach((item) => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Items'][item].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['Items'][item].length));
            let monster = '';
            let asterisk = '*';
            if (item.includes('^')) {
                asterisk += '^';
                monster = item.split('^')[1];
                item = item.split('^')[0];
                monster === '' && (asterisk += '^');
            }
            if (!tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
                if (monster !== '' && monster.includes('-npc')) {
                    !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return (source.toLowerCase().includes(monster.split('-npc')[0].toLowerCase())) }).forEach((source) => {
                        delete baseChunkData['items'][item][source];
                        if (isEmpty(baseChunkData['items'][item])) {
                            delete baseChunkData['items'][item];
                        }
                        delete outputs[item][source];
                        if (isEmpty(outputs[item])) {
                            delete outputs[item];
                        }
                        if (!shouldDelete[item]) {
                            shouldDelete[item] = {};
                        }
                        shouldDelete[item][source] = true;
                    });
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                        dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                        delete dropRatesGlobal[monster][item];
                    }
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                        dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                        delete dropTablesGlobal[monster][item];
                    }
                } else if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                    if (!slayerTaskLockedItems[item]) {
                        slayerTaskLockedItems[item] = {};
                    }
                    slayerTaskLockedItems[item][monster.toLowerCase()] = true;
                    !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return (source === monster) || (source.toLowerCase().includes(monster.toLowerCase()) && source.includes('Slay')) }).forEach((source) => {
                        delete baseChunkData['items'][item][source];
                        if (isEmpty(baseChunkData['items'][item])) {
                            delete baseChunkData['items'][item];
                        }
                    });
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                        dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                        delete dropRatesGlobal[monster][item];
                    }
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                        dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                        delete dropTablesGlobal[monster][item];
                    }
                } else if (asterisk.includes('^') && monster === '') {
                    baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = combineJSONs(baseChunkData['items'][item + asterisk], JSON.parse(JSON.stringify(baseChunkData['items'][item]))));
                    delete baseChunkData['items'][item];
                    !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item) }).forEach((monster) => {
                        if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                            dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                            delete dropRatesGlobal[monster][item];
                        }
                    });
                    !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item) }).forEach((monster) => {
                        if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                            dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                            delete dropTablesGlobal[monster][item];
                        }
                    });
                } else if (!asterisk.includes('^')) {
                    baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = JSON.parse(JSON.stringify(baseChunkData['items'][item])));
                    delete baseChunkData['items'][item];
                }
            } else if (tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item + asterisk)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
                if (monster !== '' && monster.includes('-npc')) {
                    if (!baseChunkData['items'].hasOwnProperty(item)) {
                        baseChunkData['items'][item] = {};
                    }
                    if (chunkInfo['drops'].hasOwnProperty(monster.split('-npc')[0])) {
                        !!chunkInfo['drops'][monster.split('-npc')[0]][item] && Object.keys(chunkInfo['drops'][monster.split('-npc')[0]][item]).forEach((quantity) => {
                            if (chunkInfo['drops'][monster.split('-npc')[0]][item][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                baseChunkData['items'][item][monster.split('-npc')[0]] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster.split('-npc')[0]] = 'secondary-drop';
                            }
                        });
                    } else if (!chunkInfo['drops'].hasOwnProperty(monster.split('-npc')[0]) && chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster.split('-npc')[0])) {
                        !!chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item] && Object.keys(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item]).forEach((quantity) => {
                            if (chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                baseChunkData['items'][item][monster.split('-npc')[0]] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster.split('-npc')[0]] = 'secondary-drop';
                            }
                        });
                    }
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                        dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                        delete dropRatesGlobal[monster][item + asterisk];
                    }
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                        dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                        delete dropTablesGlobal[monster][item + asterisk];
                    }
                } else if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                    if ((chunkInfo['drops'].hasOwnProperty(monster) && chunkInfo['drops'][monster].hasOwnProperty(item) && ((parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))) || (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster) && ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))))) {
                        if (!baseChunkData['items'].hasOwnProperty(item)) {
                            baseChunkData['items'][item] = {};
                        }
                        if (chunkInfo['drops'].hasOwnProperty(monster)) {
                            !!chunkInfo['drops'][monster][item] && Object.keys(chunkInfo['drops'][monster][item]).forEach((quantity) => {
                                if (chunkInfo['drops'][monster][item][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster][item][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster][item][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][item][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][item][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    baseChunkData['items'][item][monster] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][item][monster] = 'secondary-drop';
                                }
                            });
                        } else if (!chunkInfo['drops'].hasOwnProperty(monster) && chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                            !!chunkInfo['skillItems']['Slayer'][monster][item] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][item]).forEach((quantity) => {
                                if (chunkInfo['skillItems']['Slayer'][monster][item][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['skillItems']['Slayer'][monster][item][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['skillItems']['Slayer'][monster][item][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['skillItems']['Slayer'][monster][item][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    baseChunkData['items'][item][monster] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][item][monster] = 'secondary-drop';
                                }
                            });
                        }
                        if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                            dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                            delete dropRatesGlobal[monster][item + asterisk];
                        }
                        if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                            dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                            delete dropTablesGlobal[monster][item + asterisk];
                        }
                    }
                } else if (asterisk.includes('^') && monster === '') {
                    baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = combineJSONs(baseChunkData['items'][item], JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk]))));
                    delete baseChunkData['items'][item + asterisk];
                    !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach((monster) => {
                        if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                            dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                            delete dropRatesGlobal[monster][item + asterisk];
                        }
                    });
                    !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach((monster) => {
                        if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                            dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                            delete dropTablesGlobal[monster][item + asterisk];
                        }
                    });
                } else if (!asterisk.includes('^')) {
                    baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = combineJSONs(baseChunkData['items'][item], JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk]))));
                    delete baseChunkData['items'][item + asterisk];
                }
            }
        });
        if (rules['RDT'] && baseChunkData['items']['GemDropTable+'] && newValids && newValids['Quest'] && newValids['Quest'].hasOwnProperty("~|Legends' Quest|~ Complete the quest")) {
            Object.keys(baseChunkData['items']['GemDropTable+']).forEach((monster) => {
                !!chunkInfo['drops'][monster] && Object.keys(chunkInfo['drops'][monster]['GemDropTable+']).forEach((quantity) => {
                    Object.keys(dropTables['GemDropTable+']).forEach((item) => {
                        if (chunkInfo['drops'].hasOwnProperty(monster) && (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1]) * parseFloat(dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTable+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                            (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!baseChunkData['items'][item]) {
                                baseChunkData['items'][item] = {};
                            }
                            if ((chunkInfo['drops'][monster]['GemDropTable+'][quantity] === 'Always' && dropTables['GemDropTable+'][item].split('@')[0] === 'Always') || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && (isNaN(chunkInfo['drops'][monster]['GemDropTable+'][quantity].replaceAll('/', '').replaceAll('@', '')) || isNaN(dropTables['GemDropTable+'][item].split('@')[0].replaceAll('/', '').replaceAll('@', '')))) || (parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTable+'][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTable+'][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                                baseChunkData['items'][item][monster] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTable+'][item].split('/')[1].replaceAll('~', '')));
                        } else if (!chunkInfo['drops'].hasOwnProperty(monster) && monster.includes('Slay') && chunkInfo['challenges']['Slayer'][monster].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][monster]['Output'])) {
                            if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'].split('/')[1]) * parseFloat(dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTable+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                if (!baseChunkData['items'][item]) {
                                    baseChunkData['items'][item] = {};
                                }
                                if (chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']][item] === 'Always') {
                                    baseChunkData['items'][item][monster] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][item][monster] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                !!chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'] && Object.keys(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+']).forEach((quantity) => {
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTable+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTable+'][quantity].split('/')[1] * dropTables['GemDropTable+'][item].split('/')[1].replaceAll('~', '')));
                                });
                            }
                        }
                    });
                });
                !!chunkInfo['skillItems']['Slayer'][monster] && Object.keys(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+']).forEach((quantity) => {
                    Object.keys(dropTables['GemDropTableLegends+']).forEach((item) => {
                        if (chunkInfo['drops'].hasOwnProperty(monster) && (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                            (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!baseChunkData['items'][item]) {
                                baseChunkData['items'][item] = {};
                            }
                            if (chunkInfo['skillItems']['Slayer'][monster][item] === 'Always') {
                                baseChunkData['items'][item][monster] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster]['GemDropTableLegends+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                        } else if (!chunkInfo['drops'].hasOwnProperty(monster) && monster.includes('Slay') && chunkInfo['challenges']['Slayer'][monster].hasOwnProperty('Output') && chunkInfo['skillItems']['Slayer'].hasOwnProperty(chunkInfo['challenges']['Slayer'][monster]['Output'])) {
                            if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'].split('/')[1]) * parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables['GemDropTableLegends+'][item].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                if (!baseChunkData['items'][item]) {
                                    baseChunkData['items'][item] = {};
                                }
                                if (chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']][item] === 'Always') {
                                    baseChunkData['items'][item][monster] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][item][monster] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                !!chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'] && Object.keys(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+']).forEach((quantity) => {
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'][quantity].split('/')[0].replaceAll('~', '') * dropTables['GemDropTableLegends+'][item].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][chunkInfo['challenges']['Slayer'][monster]['Output']]['GemDropTableLegends+'][quantity].split('/')[1] * dropTables['GemDropTableLegends+'][item].split('/')[1].replaceAll('~', '')));
                                });
                            }
                        }
                    });
                });
            });
        }
        if (!!chunks && Object.keys(chunks).filter(chunk => { return chunkInfo['unnotingChunks'].includes(chunk) }).length === 0) {
            !!dropTablesGlobal && Object.keys(dropTablesGlobal).forEach((monster) => {
                !!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).forEach((item) => {
                    !!dropTablesGlobal[monster][item] && Object.keys(dropTablesGlobal[monster][item]).forEach((quantity) => {
                        if (quantity.includes('(noted)')) {
                            if (!!baseChunkData['items'] && !!baseChunkData['items'][item] && !!baseChunkData['items'][item][monster]) {
                                delete baseChunkData['items'][item][monster];
                                if (!baseChunkData['items'][item] || isEmpty(baseChunkData['items'][item])) {
                                    delete baseChunkData['items'][item];
                                }
                            }
                        }
                    });
                });
            });
        }
        if (!!chunks) {
            !!dropTablesGlobal && Object.keys(dropTablesGlobal).forEach((monster) => {
                !!dropTablesGlobal[monster] && Object.keys(dropTablesGlobal[monster]).forEach((item) => {
                    !!dropTablesGlobal[monster][item] && Object.keys(dropTablesGlobal[monster][item]).forEach((quantity) => {
                        if (quantity.includes('(F2P)') && baseChunkData['monsters'].hasOwnProperty(monster) && Object.keys(baseChunkData['monsters'][monster]).filter(chunk => { return chunkInfo['walkableChunksF2P'].includes(chunk.split('-')[0]) }).length === 0) {
                            delete dropTablesGlobal[monster][item][quantity];
                            if (!dropTablesGlobal[monster][item] || isEmpty(dropTablesGlobal[monster][item])) {
                                delete dropTablesGlobal[monster][item];
                                if (!dropTablesGlobal[monster] || isEmpty(dropTablesGlobal[monster])) {
                                    delete dropTablesGlobal[monster];
                                }
                                delete dropRatesGlobal[monster][item];
                                if (!!baseChunkData['items'] && !!baseChunkData['items'][item] && !!baseChunkData['items'][item][monster]) {
                                    delete baseChunkData['items'][item][monster];
                                    if (!baseChunkData['items'][item] || isEmpty(baseChunkData['items'][item])) {
                                        delete baseChunkData['items'][item];
                                    }
                                }
                            }
                        }
                    });
                });
            });
        }

        if (rules['Skilling Pets']) {
            let skillingPets = {
                'Fishing': 'Heron',
                'Mining': 'Rock golem',
                'Woodcutting': 'Beaver',
                'Agility': 'Giant squirrel',
                'Farming': 'Tangleroot',
                'Thieving': 'Rocky',
                'Runecraft': 'Rift guardian'
            }
            Object.keys(skillingPets).forEach((skill) => {
                if (checkPrimaryMethod(skill, newValids, baseChunkData) && !!newValids && newValids[skill] && Object.keys(newValids[skill]).some(task => { return chunkInfo['challenges'][skill].hasOwnProperty(task) && !chunkInfo['challenges'][skill][task].hasOwnProperty('NoPet') && !chunkInfo['challenges'][skill][task].hasOwnProperty('Description') })) {
                    if (!baseChunkData['items'][skillingPets[skill]]) {
                        baseChunkData['items'][skillingPets[skill]] = {};
                    }
                    baseChunkData['items'][skillingPets[skill]]['Manually Added*'] = 'secondary-' + skill;
                } else {
                    !!baseChunkData['items'][skillingPets[skill]] && delete baseChunkData['items'][skillingPets[skill]]['Manually Added*'];
                    if (!!baseChunkData['items'][skillingPets[skill]] && isEmpty(baseChunkData['items'][skillingPets[skill]])) {
                        delete baseChunkData['items'][skillingPets[skill]];
                    }
                }
            });
        }
        let highestSoFar = {};
        Object.keys(newValids).forEach((skill) => {
            highestSoFar[skill] = 0;
            !!newValids[skill] && Object.keys(newValids[skill]).forEach((challenge) => {
                if (newValids[skill][challenge] > highestSoFar[skill]) {
                    highestSoFar[skill] = newValids[skill][challenge];
                }
            });
        });
        let tempChallenges = JSON.parse(JSON.stringify(newValids));
        Object.keys(extraOutputItems).forEach((skill) => {
            Object.keys(extraOutputItems[skill]).forEach((challenge) => {
                if (chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && chunkInfo['challenges'][skill][challenge].hasOwnProperty('Level') && chunkInfo['challenges'][skill][challenge]['Level'] <= highestSoFar[skill]) {
                    if (!tempChallenges[skill]) {
                        tempChallenges[skill] = {};
                    }
                    if (!tempChallenges[skill][challenge]) {
                        tempChallenges[skill][challenge] = extraOutputItems[skill][challenge];
                    }
                }
            });
        });
        Object.keys(tempChallenges).forEach((skill) => {
            Object.keys(tempChallenges[skill]).forEach((challenge) => {
                let subSkillValid = !(chunkInfo['challenges'][skill][challenge].hasOwnProperty('Skills') && Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).some((subSkill) => { return !checkPrimaryMethod(subSkill, tempChallenges, baseChunkData) || (subSkill === 'Slayer' && !!slayerLocked && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level']) || (!!maxSkill && maxSkill.hasOwnProperty(subSkill) && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > maxSkill[subSkill]) }));
                if (subSkillValid && skill !== 'BiS') {
                    if (!!chunkInfo['challenges'][skill][challenge]['Output'] && !challengeIsBacklogged(skill, challenge)) {
                        let output = chunkInfo['challenges'][skill][challenge]['Output'];
                        let highestDropRate = 0;
                        !!chunkInfo['challenges'][skill][challenge]['Items'] && chunkInfo['challenges'][skill][challenge]['Items'].filter(item => item.includes('*')).forEach((item) => {
                            if (item.replaceAll(/\*/g, '').includes('[+]') && itemsPlus.hasOwnProperty(item.replaceAll(/\*/g, ''))) {
                                let lowestPlusRate = 0;
                                !!itemsPlus[item.replaceAll(/\*/g, '')] && itemsPlus[item.replaceAll(/\*/g, '')].forEach((plus) => {
                                    !!baseChunkData['items'][plus] && Object.keys(baseChunkData['items'][plus]).forEach((source) => {
                                        if (baseChunkData['items'][plus][source] === 'secondary-drop') {
                                            if (!!dropRatesGlobal[source] &&  !!dropRatesGlobal[source][plus] && !isNaN(dropRatesGlobal[source][plus].split('/')[0]) && ((parseFloat(dropRatesGlobal[source][plus].split('/')[0]) / parseFloat(dropRatesGlobal[source][plus].split('/')[1])) > lowestPlusRate)) {
                                                lowestPlusRate = parseFloat(dropRatesGlobal[source][plus].split('/')[0]) / parseFloat(dropRatesGlobal[source][plus].split('/')[1]);
                                            }
                                        } else if (baseChunkData['items'][plus][source].split('-').length > 1 && [...skillNames, 'Nonskill', 'Quest', 'Diary', 'Extra'].includes(baseChunkData['items'][plus][source].split('-')[1])) {
                                            let lowestQuantityRate = 0;
                                            !!chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]] && !!chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')] && chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus] && Object.keys(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus]).forEach((quantity) => {
                                                if (!isNaN(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[0]) && ((parseFloat(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[0]) / parseFloat(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[1])) < lowestQuantityRate)) {
                                                    lowestQuantityRate = parseFloat(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[0]) / parseFloat(chunkInfo['skillItems'][baseChunkData['items'][plus][source].split('-')[1]][source.replaceAll(/\*/g, '')][plus][quantity].split('/')[1]);
                                                }
                                            });
                                            if ((lowestQuantityRate > lowestPlusRate) && (lowestQuantityRate !== 0)) {
                                                lowestPlusRate = lowestQuantityRate;
                                            }
                                        }
                                    });
                                });
                                if ((lowestPlusRate > highestDropRate) && (lowestPlusRate!== 0)) {
                                    highestDropRate = lowestPlusRate;
                                }
                            } else {
                                !!baseChunkData['items'][item.replaceAll(/\*/g, '')] && Object.keys(baseChunkData['items'][item.replaceAll(/\*/g, '')]).forEach((source) => {
                                    if (baseChunkData['items'][item.replaceAll(/\*/g, '')][source] === 'secondary-drop') {
                                        if (!!dropRatesGlobal[source] && !!dropRatesGlobal[source][item.replaceAll(/\*/g, '')] && !isNaN(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[0]) && ((parseFloat(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[0]) / parseFloat(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[1])) > highestDropRate)) {
                                            highestDropRate = parseFloat(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[0]) / parseFloat(dropRatesGlobal[source][item.replaceAll(/\*/g, '')].split('/')[1]);
                                        }
                                    } else if (baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-').length > 1 && [...skillNames, 'Nonskill', 'Quest', 'Diary', 'Extra'].includes(baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1])) {
                                        let lowestQuantityRate = 0;
                                        !!chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]] && !!chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')] && chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')] && Object.keys(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')]).forEach((quantity) => {
                                            if (!isNaN(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[0]) && ((parseFloat(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[0]) / parseFloat(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[1])) < lowestQuantityRate)) {
                                                lowestQuantityRate = parseFloat(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[0]) / parseFloat(chunkInfo['skillItems'][baseChunkData['items'][item.replaceAll(/\*/g, '')][source].split('-')[1]][source.replaceAll(/\*/g, '')][item.replaceAll(/\*/g, '')][quantity].split('/')[1]);
                                            }
                                        });
                                        if ((lowestQuantityRate > highestDropRate) && (lowestQuantityRate !== 0)) {
                                            highestDropRate = lowestQuantityRate;
                                        }
                                    }
                                });
                            }
                        });
                        if (highestDropRate <= 0) {
                            highestDropRate = 1;
                        }
                        !!chunkInfo['skillItems'][skill] && !!chunkInfo['skillItems'][skill][output] && Object.keys(chunkInfo['skillItems'][skill][output]).filter((item) => { return (chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/').length < 2 || isNaN(parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1])) || (parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) * highestDropRate) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossLogs.hasOwnProperty(output)) && (!shouldDelete[item] || !shouldDelete[item][challenge]) }).forEach((item) => {
                            if (!outputs[item]) {
                                outputs[item] = {};
                            }
                            if (challenge === 'Pickpocket a ~|master farmer|~') {
                                const specialSeeds = {
                                    'Guam seed': {
                                        'numerator': 1,
                                        'denom': 65.1
                                    },
                                    'Ranarr seed': {
                                        'numerator': 70,
                                        'denom': 81
                                    },
                                    'Snapdragon seed': {
                                        'numerator': 10,
                                        'denom': 81
                                    },
                                    'Torstol seed': {
                                        'numerator': 2,
                                        'denom': 81
                                    }
                                };
                                const farmingLevel = checkPrimaryMethod('Farming', newValids, baseChunkData) ? 99 : Math.max(!!passiveSkill && passiveSkill.hasOwnProperty('Farming') ? passiveSkill['Farming'] : 1, !!newValids['Farming'] ? Math.max(...Object.values(newValids['Farming'])) : 1);
                                if (specialSeeds.hasOwnProperty(item)) {
                                    let seedChance;
                                    if (item === 'Guam seed') {
                                        seedChance = '1/' + (Math.round((specialSeeds[item].denom / (specialSeeds[item].numerator + (0.003888 - (((6 + Math.min(85, farmingLevel)) * 48) / 1000000))))*100)/100);
                                    } else {
                                        seedChance = '1/' + (Math.round((specialSeeds[item].denom / (specialSeeds[item].numerator * (((6 + Math.min(85, farmingLevel)) * 48) / 1000000)))*100)/100);
                                    }
                                    chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]] = seedChance;
                                }
                            }
                            if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Source')) {
                                if (chunkInfo['challenges'][skill][challenge]['Source'] === 'shop' && (!backloggedSources['shops'] || !backloggedSources['shops'][challenge])) {
                                    outputs[item][challenge] = chunkInfo['challenges'][skill][challenge]['Source'];
                                    if (!baseChunkData['shops'].hasOwnProperty(challenge.replaceAll(/\~\|/g, '').replaceAll(/\|\~/g, ''))) {
                                        baseChunkData['shops'][challenge.replaceAll(/\~\|/g, '').replaceAll(/\|\~/g, '')] = {};
                                    }
                                    baseChunkData['shops'][challenge.replaceAll(/\~\|/g, '').replaceAll(/\|\~/g, '')][chunkInfo['challenges'][skill][challenge].hasOwnProperty('Chunks') ? chunkInfo['challenges'][skill][challenge]['Chunks'][0] : 'Nonskill'] = true;
                                } else if (chunkInfo['challenges'][skill][challenge]['Source'] !== 'shop' && (chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].replaceAll('/', '').replaceAll('@', ''))) || ((parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) > (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))))) && !chunkInfo['challenges'][skill][challenge]['Secondary']) {
                                    outputs[item][challenge] = 'primary-' + chunkInfo['challenges'][skill][challenge]['Source'];
                                } else if (chunkInfo['challenges'][skill][challenge]['Source'] !== 'shop' && (chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/').length < 2 || ((parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) <= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    outputs[item][challenge] = 'secondary-' + chunkInfo['challenges'][skill][challenge]['Source'];
                                } else {
                                    delete outputs[item];
                                }
                            } else if ((chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].replaceAll('/', '').replaceAll('@', ''))) || ((parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) > (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))))) && !chunkInfo['challenges'][skill][challenge]['Secondary'] && !chunkInfo['challenges'][skill][challenge]['ForcedSecondary']) {
                                outputs[item][challenge] = 'primary-' + skill;
                            } else if ((chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/').length < 2 || ((parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems'][skill][output][item][Object.keys(chunkInfo['skillItems'][skill][output][item])[0]].split('/')[1]) <= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))))) || chunkInfo['challenges'][skill][challenge]['ForcedSecondary']) {
                                outputs[item][challenge] = 'secondary-' + skill;
                            }
                        });
                        if (!chunkInfo['skillItems'][skill] || !chunkInfo['skillItems'][skill][output]) {
                            if (!outputs[output]) {
                                outputs[output] = {};
                            }
                            if (chunkInfo['challenges'][skill][challenge].hasOwnProperty('Source')) {
                                if (chunkInfo['challenges'][skill][challenge]['Source'] === 'shop' && (!backloggedSources['shops'] || !backloggedSources['shops'][challenge])) {
                                    outputs[output][challenge] = chunkInfo['challenges'][skill][challenge]['Source'];
                                } else if (!chunkInfo['challenges'][skill][challenge]['Secondary'] && (chunkInfo['challenges'][skill][challenge]['Source'] !== 'shop' || !backloggedSources['shops'] || !backloggedSources['shops'][challenge])) {
                                    outputs[output][challenge] = 'primary-' + chunkInfo['challenges'][skill][challenge]['Source'];
                                } else if (chunkInfo['challenges'][skill][challenge]['Source'] !== 'shop' || !backloggedSources['shops'] || !backloggedSources['shops'][challenge]) {
                                    outputs[output][challenge] = 'secondary-' + chunkInfo['challenges'][skill][challenge]['Source'];
                                }
                            } else if (!chunkInfo['challenges'][skill][challenge]['Secondary'] && !chunkInfo['challenges'][skill][challenge]['ForcedSecondary']) {
                                outputs[output][challenge] = 'primary-' + skill;
                            } else {
                                outputs[output][challenge] = 'secondary-' + skill;
                            }
                        }
                    }
                    if (!!chunkInfo['challenges'][skill][challenge]['Output Object'] && !challengeIsBacklogged(skill, challenge)) {
                        let outputObject = chunkInfo['challenges'][skill][challenge]['Output Object'];
                        if (!outputObjects[outputObject]) {
                            outputObjects[outputObject] = {};
                        }
                        if (!chunkInfo['challenges'][skill][challenge]['Secondary']) {
                            outputObjects[outputObject][challenge] = true;
                        } else {
                            outputObjects[outputObject]['Secondary-' + challenge] = true;
                        }
                    }
                }
            });
        });
        outputTasks = {};
        Object.keys(outputs).filter((output) => { return !backloggedSources['items'] || !backloggedSources['items'][output] }).forEach((output) => {
            Object.keys(outputs[output]).filter((source) => { return outputs[output][source].split('-').length <= 1 || ((newValids.hasOwnProperty(outputs[output][source].split('-')[1])) || (newValids.hasOwnProperty('Slayer') && newValids['Slayer'].hasOwnProperty(source) && (!slayerTaskLockedItems.hasOwnProperty(output) || !slayerTaskLockedItems[output].hasOwnProperty(source.split('|')[1].toLowerCase())))) || (outputs[output][source].split('-')[1] === 'drop' && !(newValids.hasOwnProperty('Slayer') && newValids['Slayer'].hasOwnProperty(source))) }).forEach((source) => {
                if (outputs[output][source] !== 'shop' || (source.includes('~|') && source.includes('|~') && (!backloggedSources['shops'] || !backloggedSources['shops'][source.split('~|')[1].split('|~')[0]]))) {
                    if (baseChunkData['items'].hasOwnProperty(output + '*')) {
                        if (!baseChunkData['items'][output + '*']) {
                            baseChunkData['items'][output + '*'] = {};
                        }
                        baseChunkData['items'][output + '*'][source] = outputs[output][source];
                        if (!outputTasks.hasOwnProperty(outputs[output][source].split('-')[1])) {
                            outputTasks[outputs[output][source].split('-')[1]] = {};
                        }
                        outputTasks[outputs[output][source].split('-')[1]][source] = output + '*';
                    } else if (baseChunkData['items'].hasOwnProperty(output + '*^')) {
                        if (!baseChunkData['items'][output + '*^']) {
                            baseChunkData['items'][output + '*^'] = {};
                        }
                        baseChunkData['items'][output + '*^'][source] = outputs[output][source];
                        if (!outputTasks.hasOwnProperty(outputs[output][source].split('-')[1])) {
                            outputTasks[outputs[output][source].split('-')[1]] = {};
                        }
                        outputTasks[outputs[output][source].split('-')[1]][source] = output + '*^';
                    } else if (baseChunkData['items'].hasOwnProperty(output + '*^^')) {
                        if (!baseChunkData['items'][output + '*^^']) {
                            baseChunkData['items'][output + '*^^'] = {};
                        }
                        baseChunkData['items'][output + '*^^'][source] = outputs[output][source];
                        if (!outputTasks.hasOwnProperty(outputs[output][source].split('-')[1])) {
                            outputTasks[outputs[output][source].split('-')[1]] = {};
                        }
                        outputTasks[outputs[output][source].split('-')[1]][source] = output + '*^^';
                    } else {
                        if (!baseChunkData['items'][output]) {
                            baseChunkData['items'][output] = {};
                        }
                        baseChunkData['items'][output][source] = outputs[output][source];
                        if (!outputTasks.hasOwnProperty(outputs[output][source].split('-')[1])) {
                            outputTasks[outputs[output][source].split('-')[1]] = {};
                        }
                        outputTasks[outputs[output][source].split('-')[1]][source] = output;
                    }
                }
            });
            if (!baseChunkData['items'][output] || isEmpty(baseChunkData['items'][output])) {
                delete baseChunkData['items'][output];
            }
        });
        !!chunkInfo && !!chunkInfo['taskUnlocks'] && !!chunkInfo['taskUnlocks']['Items'] && Object.keys(chunkInfo['taskUnlocks']['Items']).forEach((item) => {
            let tempValid = !(newValids && !(chunkInfo['taskUnlocks']['Items'][item].filter((task) => { return newValids[Object.values(task)[0]] && newValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && (!backlog[Object.values(task)[0]] || (!backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0]) && !backlog[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0].replaceAll('#', '/')))) }).length === chunkInfo['taskUnlocks']['Items'][item].length));
            let monster = '';
            let asterisk = '*';
            if (item.includes('^')) {
                asterisk += '^';
                monster = item.split('^')[1];
                item = item.split('^')[0];
                monster === '' && (asterisk += '^');
            }
            if (!tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
                if (monster !== '' && monster.includes('-npc')) {
                    !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return (source.toLowerCase().includes(monster.split('-npc')[0].toLowerCase())) }).forEach((source) => {
                        delete baseChunkData['items'][item][source];
                        if (isEmpty(baseChunkData['items'][item])) {
                            delete baseChunkData['items'][item];
                        }
                        delete outputs[item][source];
                        if (isEmpty(outputs[item])) {
                            delete outputs[item];
                        }
                    });
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                        dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                        delete dropRatesGlobal[monster][item];
                    }
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                        dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                        delete dropTablesGlobal[monster][item];
                    }
                } else if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                    if (!slayerTaskLockedItems[item]) {
                        slayerTaskLockedItems[item] = {};
                    }
                    slayerTaskLockedItems[item][monster.toLowerCase()] = true;
                    !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return (source === monster) || (source.toLowerCase().includes(monster.toLowerCase()) && source.includes('Slay')) }).forEach((source) => {
                        delete baseChunkData['items'][item][source];
                        if (isEmpty(baseChunkData['items'][item])) {
                            delete baseChunkData['items'][item];
                        }
                    });
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                        dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                        delete dropRatesGlobal[monster][item];
                    }
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                        dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                        delete dropTablesGlobal[monster][item];
                    }
                } else if (asterisk.includes('^') && monster === '') {
                    baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = combineJSONs(baseChunkData['items'][item + asterisk], JSON.parse(JSON.stringify(baseChunkData['items'][item]))));
                    delete baseChunkData['items'][item];
                    !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item) }).forEach((monster) => {
                        if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item]) {
                            dropRatesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item]));
                            delete dropRatesGlobal[monster][item];
                        }
                    });
                    !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item) }).forEach((monster) => {
                        if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item]) {
                            dropTablesGlobal[monster][item + asterisk] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item]));
                            delete dropTablesGlobal[monster][item];
                        }
                    });
                } else if (!asterisk.includes('^')) {
                    baseChunkData['items'][item] && (baseChunkData['items'][item + asterisk] = JSON.parse(JSON.stringify(baseChunkData['items'][item])));
                    delete baseChunkData['items'][item];
                }
            } else if (tempValid && ((!!baseChunkData['items'] && baseChunkData['items'].hasOwnProperty(item + asterisk)) || (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) || (monster === '' && asterisk.includes('^')))) {
                if (monster !== '' && monster.includes('-npc')) {
                    if (!baseChunkData['items'].hasOwnProperty(item)) {
                        baseChunkData['items'][item] = {};
                    }
                    if (chunkInfo['drops'].hasOwnProperty(monster.split('-npc')[0])) {
                        !!chunkInfo['drops'][monster.split('-npc')[0]][item] && Object.keys(chunkInfo['drops'][monster.split('-npc')[0]][item]).forEach((quantity) => {
                            if (chunkInfo['drops'][monster.split('-npc')[0]][item][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster.split('-npc')[0]][item][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                baseChunkData['items'][item][monster.split('-npc')[0]] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster.split('-npc')[0]] = 'secondary-drop';
                            }
                        });
                    } else if (!chunkInfo['drops'].hasOwnProperty(monster.split('-npc')[0]) && chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster.split('-npc')[0])) {
                        !!chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item] && Object.keys(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item]).forEach((quantity) => {
                            if (chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster.split('-npc')[0]][item][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                baseChunkData['items'][item][monster.split('-npc')[0]] = 'primary-drop';
                            } else {
                                baseChunkData['items'][item][monster.split('-npc')[0]] = 'secondary-drop';
                            }
                        });
                    }
                    if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                        dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                        delete dropRatesGlobal[monster][item + asterisk];
                    }
                    if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                        dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                        delete dropTablesGlobal[monster][item + asterisk];
                    }
                } else if (monster !== '' && baseChunkData['monsters'].hasOwnProperty(monster)) {
                    if ((chunkInfo['drops'].hasOwnProperty(monster) && chunkInfo['drops'][monster].hasOwnProperty(item) && ((parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][item][Object.keys(chunkInfo['drops'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))) || (chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster) && ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][Object.keys(chunkInfo['skillItems']['Slayer'][monster][item])[0]].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))))) {
                        if (!baseChunkData['items'].hasOwnProperty(item)) {
                            baseChunkData['items'][item] = {};
                        }
                        if (chunkInfo['drops'].hasOwnProperty(monster)) {
                            !!chunkInfo['drops'][monster][item] && Object.keys(chunkInfo['drops'][monster][item]).forEach((quantity) => {
                                if (chunkInfo['drops'][monster][item][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster][item][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster][item][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][item][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][item][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    baseChunkData['items'][item][monster] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][item][monster] = 'secondary-drop';
                                }
                            });
                        } else if (!chunkInfo['drops'].hasOwnProperty(monster) && chunkInfo['skillItems']['Slayer'].hasOwnProperty(monster)) {
                            !!chunkInfo['skillItems']['Slayer'][monster][item] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][item]).forEach((quantity) => {
                                if (chunkInfo['skillItems']['Slayer'][monster][item][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['skillItems']['Slayer'][monster][item][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['skillItems']['Slayer'][monster][item][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['skillItems']['Slayer'][monster][item][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    baseChunkData['items'][item][monster] = 'primary-drop';
                                } else {
                                    baseChunkData['items'][item][monster] = 'secondary-drop';
                                }
                            });
                        }
                        if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                            dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                            delete dropRatesGlobal[monster][item + asterisk];
                        }
                        if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                            dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                            delete dropTablesGlobal[monster][item + asterisk];
                        }
                    }
                } else if (asterisk.includes('^') && monster === '') {
                    baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = combineJSONs(baseChunkData['items'][item], JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk]))));
                    delete baseChunkData['items'][item + asterisk];
                    !!dropRatesGlobal && Object.keys(dropRatesGlobal).filter(monster => { return dropRatesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach((monster) => {
                        if (!!dropRatesGlobal[monster] && !!dropRatesGlobal[monster][item + asterisk]) {
                            dropRatesGlobal[monster][item] = JSON.parse(JSON.stringify(dropRatesGlobal[monster][item + asterisk]));
                            delete dropRatesGlobal[monster][item + asterisk];
                        }
                    });
                    !!dropTablesGlobal && Object.keys(dropTablesGlobal).filter(monster => { return dropTablesGlobal[monster].hasOwnProperty(item + asterisk) }).forEach((monster) => {
                        if (!!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item + asterisk]) {
                            dropTablesGlobal[monster][item] = JSON.parse(JSON.stringify(dropTablesGlobal[monster][item + asterisk]));
                            delete dropTablesGlobal[monster][item + asterisk];
                        }
                    });
                } else if (!asterisk.includes('^')) {
                    baseChunkData['items'][item + asterisk] && (baseChunkData['items'][item] = combineJSONs(baseChunkData['items'][item], JSON.parse(JSON.stringify(baseChunkData['items'][item + asterisk]))));
                    delete baseChunkData['items'][item + asterisk];
                }
            }
        });
        Object.keys(outputObjects).forEach((output) => {
            if (!baseChunkData['objects'][output]) {
                baseChunkData['objects'][output] = {};
            }
            Object.keys(outputObjects[output]).forEach((source) => {
                baseChunkData['objects'][output][source] = outputObjects[output][source];
            });
        });
        Object.keys(baseChunkData['items']).forEach((item) => {
            Object.keys(baseChunkData['items'][item]).filter((source) => { return baseChunkData['items'][item][source].split('-').length > 1 && [...skillNames, 'Nonskill', 'Quest', 'Diary', 'Extra'].includes(baseChunkData['items'][item][source].split('-')[1]) && (!newValids.hasOwnProperty(baseChunkData['items'][item][source].split('-')[1]) || !newValids[baseChunkData['items'][item][source].split('-')[1]].hasOwnProperty(source)) && baseChunkData['items'][item][source].split('-')[1] !== 'Nonskill' && source !== 'Manually Added*' }).forEach((source) => {
                delete baseChunkData['items'][item][source];
                if (!baseChunkData['items'][item] || isEmpty(baseChunkData['items'][item])) {
                    delete baseChunkData['items'][item];
                }
            });
        });
        Object.keys(chunkInfo['slayerEquipment']).forEach((item) => {
            if (!!slayerLocked && chunkInfo['slayerEquipment'][item] > slayerLocked['level'] && baseChunkData['items'].hasOwnProperty(item)) {
                !!baseChunkData['items'] && (baseChunkData['items'][item + '*'] = {...baseChunkData['items'][item]});
                !!baseChunkData['items'] && delete baseChunkData['items'][item];
            } else if ((!slayerLocked || chunkInfo['slayerEquipment'][item] <= slayerLocked['level']) && baseChunkData['items'].hasOwnProperty(item + '*')) {
                !!baseChunkData['items'] && (baseChunkData['items'][item] = {...baseChunkData['items'][item + '*']});
                !!baseChunkData['items'] && delete baseChunkData['items'][item + '*'];
            }
        });
        Object.keys(newValids).forEach((skill) => {
            Object.keys(newValids[skill]).filter((index) => { return chunkInfo['challenges'][skill][index].hasOwnProperty('Skills') && !chunkInfo['challenges'][skill][index].hasOwnProperty('ClueTier') }).forEach((name) => {
                Object.keys(chunkInfo['challenges'][skill][name]['Skills']).forEach((subSkill) => {
                    if (!chunkInfo['challenges'][subSkill]) {
                        chunkInfo['challenges'][subSkill] = {};
                    }
                    if (chunkInfo['challenges'][subSkill].hasOwnProperty(name)) {
                        chunkInfo['challenges'][subSkill][name] = {
                            ...chunkInfo['challenges'][subSkill][name],
                            'Level': chunkInfo['challenges'][skill][name]['Skills'][subSkill],
                            'Tasks': {
                                ...chunkInfo['challenges'][subSkill][name]['Tasks'],
                                [name + '--' + skill]: skill
                            }
                        }
                    } else {
                        if (!newValids.hasOwnProperty(subSkill)) {
                            newValids[subSkill] = {};
                        }
                        newValids[subSkill][name] = chunkInfo['challenges'][skill][name]['Skills'][subSkill];
                        chunkInfo['challenges'][subSkill][name] = {
                            ...chunkInfo['challenges'][skill][name],
                            'Level': chunkInfo['challenges'][skill][name]['Skills'][subSkill],
                            'Tasks': {
                                [name + '--' + skill]: skill
                            }
                        }
                    }
                    if (skill === 'Quest' || skill === 'Diary') {
                        delete chunkInfo['challenges'][subSkill][name]['BaseQuest'];
                        delete chunkInfo['challenges'][subSkill][name]['Skills'];
                        chunkInfo['challenges'][skill][name] = {
                            ...chunkInfo['challenges'][skill][name],
                            'Tasks': {
                                ...chunkInfo['challenges'][skill][name]['Tasks'],
                                [name + '--' + subSkill]: subSkill
                            }
                        }
                        if (chunkInfo['challenges'][subSkill][name].hasOwnProperty('SkillsBoost') && chunkInfo['challenges'][subSkill][name]['SkillsBoost'].hasOwnProperty(subSkill)) {
                            chunkInfo['challenges'][subSkill][name] = {
                                ...chunkInfo['challenges'][subSkill][name],
                                'NoBoost': true
                            }
                        }
                    }
                });
            });
        });
        Object.keys(newValids).forEach((skill) => {
            Object.keys(newValids[skill]).filter(challenge => { return (chunkInfo['challenges'][skill].hasOwnProperty(challenge) && chunkInfo['challenges'][skill][challenge].hasOwnProperty('Reward')) && checkPrimaryMethod(skill, newValids, baseChunkData) && !challengeIsBacklogged(skill, challenge) && !!chunkInfo['challenges'][skill][challenge]['Reward'] }).forEach((challenge) => {
                chunkInfo['challenges'][skill][challenge]['Reward'].forEach((reward) => {
                    if (!baseChunkData['items'][reward]) {
                        baseChunkData['items'][reward] = {};
                    }
                    baseChunkData['items'][reward][challenge] = 'secondary-' + skill;
                });
            });
        });
        questPointTotal = 0;
        questProgress = {};
        combatPointTotal = 0;
        diaryProgress = {};
        skillQuestXp = {};
        !!newValids && !!newValids['Quest'] && Object.keys(newValids['Quest']).forEach((line) => {
            if (chunkInfo['challenges']['Quest'].hasOwnProperty(line) && chunkInfo['challenges']['Quest'][line].hasOwnProperty('QuestPoints') && (!backlog['Quest'] || (!backlog['Quest'].hasOwnProperty(line) && !backlog['Quest'].hasOwnProperty(line.replaceAll('#', '/'))))) {
                questPointTotal += chunkInfo['challenges']['Quest'][line]['QuestPoints'];
                questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']] = 'Complete the quest';
            } else if (questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']] !== 'Complete the quest') {
                if (!questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']]) {
                    questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']] = [];
                }
                questProgress[chunkInfo['challenges']['Quest'][line]['BaseQuest']].push(line);
            }
            if (chunkInfo['challenges']['Quest'].hasOwnProperty(line) && chunkInfo['challenges']['Quest'][line].hasOwnProperty('XpReward')) {
                Object.keys(chunkInfo['challenges']['Quest'][line]['XpReward']).filter((skill) => { return !passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] <= 1 }).forEach((skill) => {
                    if (!skillQuestXp[skill]) {
                        skillQuestXp[skill] = {
                            xp: 0,
                            level: 1
                        };
                    }
                    skillQuestXp[skill]['xp'] += chunkInfo['challenges']['Quest'][line]['XpReward'][skill];
                    skillQuestXp[skill]['level'] = getLevelForXp(skillQuestXp[skill]['xp']);
                });
            }
        });
        !!newValids && !!newValids['Nonskill'] && Object.keys(newValids['Nonskill']).filter((line) => { return chunkInfo['challenges']['Nonskill'].hasOwnProperty(line) && chunkInfo['challenges']['Nonskill'][line].hasOwnProperty('XpReward') }).forEach((line) => {
            Object.keys(chunkInfo['challenges']['Nonskill'][line]['XpReward']).filter((skill) => { return !passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] <= 1 }).forEach((skill) => {
                if (!skillQuestXp[skill]) {
                    skillQuestXp[skill] = {
                        xp: 0,
                        level: 1
                    };
                }
                skillQuestXp[skill]['xp'] += chunkInfo['challenges']['Nonskill'][line]['XpReward'][skill];
                skillQuestXp[skill]['level'] = getLevelForXp(skillQuestXp[skill]['xp']);
            });
        });
        !!assignedXpRewards && Object.keys(assignedXpRewards).forEach((skill) => {
            !!assignedXpRewards[skill] && Object.keys(assignedXpRewards[skill]).forEach((line) => {
                !!assignedXpRewards[skill][line] && Object.keys(assignedXpRewards[skill][line]).forEach((skillOpt) => {
                    if (!skillQuestXp[skillOpt]) {
                        skillQuestXp[skillOpt] = {
                            xp: 0,
                            level: 1
                        };
                    }
                    skillQuestXp[skillOpt]['xp'] += assignedXpRewards[skill][line][skillOpt];
                    skillQuestXp[skillOpt]['level'] = getLevelForXp(skillQuestXp[skillOpt]['xp']);
                });
            });
        });
        let tier;
        !!newValids && !!newValids['Diary'] && Object.keys(newValids['Diary']).forEach((line) => {
            tier = line.split('|')[1].split('#')[1];
            if (chunkInfo['challenges']['Diary'].hasOwnProperty(line) && chunkInfo['challenges']['Diary'][line].hasOwnProperty('CombatPoints') && (!backlog['Diary'] || (!backlog['Diary'].hasOwnProperty(line) && !backlog['Diary'].hasOwnProperty(line.replaceAll('#', '/'))))) {
                combatPointTotal += chunkInfo['challenges']['Diary'][line]['CombatPoints'];
            }
            if (chunkInfo['challenges']['Diary'].hasOwnProperty(line) && chunkInfo['challenges']['Diary'][line].hasOwnProperty('Reward')) {
                if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]) {
                    diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']] = {};
                }
                if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier]) {
                    diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier] = [];
                }
                diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier]['done'] = true;
            }
            if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]) {
                diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']] = {};
            }
            if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier]) {
                diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier] = [];
            }
            if (!diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]['allTasks']) {
                diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]['allTasks'] = [];
            }
            diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']][tier].push(line);
            diaryProgress[chunkInfo['challenges']['Diary'][line]['BaseQuest']]['allTasks'].push(line);
        });
        kudosTotal = 0;
        possibleSkillTotal = 0;
        let tempPrimarySkill = false;
        !!newValids && Object.keys(newValids).filter((skill) => { return !!newValids[skill] }).forEach((skill) => {
            Object.keys(newValids[skill]).filter(challenge => { return (chunkInfo['challenges'][skill].hasOwnProperty(challenge) && chunkInfo['challenges'][skill][challenge].hasOwnProperty('Kudos')) }).forEach((line) => {
                kudosTotal += chunkInfo['challenges'][skill][line]['Kudos'];
            });
            if (skillNames.includes(skill) && skill !== 'Combat') {
                tempPrimarySkill = checkPrimaryMethod(skill, newValids, baseChunkData);
                if (skill === 'Slayer' && !!slayerLocked) {
                    possibleSkillTotal += slayerLocked['level'];
                } else if (tempPrimarySkill) {
                    possibleSkillTotal += 99;
                } else if (!!passiveSkill && passiveSkill.hasOwnProperty(skill)) {
                    possibleSkillTotal += passiveSkill[skill] === 0 ? 1 : passiveSkill[skill];
                } else if (skill === 'Hitpoints') {
                    possibleSkillTotal += 10;
                } else {
                    possibleSkillTotal += 1;
                }
            }
        });
        clueTasksPossible = {
            'beginner': true,
            'easy': true,
            'medium': true,
            'hard': true,
            'elite': true,
            'master': true
        };
        !!chunkInfo['challenges']['Nonskill'] && Object.keys(chunkInfo['challenges']['Nonskill']).filter((task) => { return !!chunkInfo['challenges']['Nonskill'][task] && chunkInfo['challenges']['Nonskill'][task].hasOwnProperty('ClueTier') && !newValids.hasOwnProperty('Nonskill') || !newValids['Nonskill'].hasOwnProperty(task) }).forEach((task) => {
            clueTasksPossible[chunkInfo['challenges']['Nonskill'][task]['ClueTier']] = false;
        });
        !!baseChunkData && !!baseChunkData['items'] && Object.keys(baseChunkData['items']).filter(item => { return isEmpty(baseChunkData['items'][item]) }).forEach((item) => {
            delete baseChunkData['items'][item];
        });
        globalValids = {...newValids};
        //console.log(i);
    } while ((Object.keys(diff(valids, newValids) || {}).length !== 0 && i < 15) || i < 3);
    valids = newValids;
    //console.log(baseChunkData);
    tempChunkData = baseChunkData;
    return valids;
}

// Returns copy of object
let freeze = function(obj) {
    if (!obj) return obj;
    return JSON.parse(JSON.stringify(obj));
}

// Gets diff between 2 objects
let diff = function(obj1, obj2, isInner) {
    let result = {};
    if (Object.is(obj1, obj2)) {
        return undefined;
    }
    if (!obj1 || typeof obj1 !== 'object') {
        return obj1;
    }
    if (!obj2 || typeof obj2 !== 'object') {
        return obj2;
    }
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach((key) => {
        if (obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
            result[key] = obj1[key] || obj2[key];
        }
        if (typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
            const value = diff(obj1[key], obj2[key], true);
            if (value !== undefined) {
                result[key] = value;
            }
        }
    });
    if (!isInner) {
        result = freeze(clearEmpties(result));
    }
    return result;
}

// Clears empty subobjects from object
let clearEmpties = function(obj) {
    typeof obj === 'object' && Object.keys(obj).forEach((subObj) => {
        if (typeof obj[subObj] === 'object' && isEmpty(obj[subObj])) {
            delete obj[subObj];
        } else if (typeof obj[subObj] === 'object') {
            obj[subObj] = clearEmpties(obj[subObj]);
        }
    });
    if (isEmpty(obj)) {
        return undefined;
    } else {
        return obj;
    }
}

// Checks if every source of an item is from a shop
let onlyShop = function(sources) {
    let allShop = !(Object.keys(sources).some((source) => { return sources[source] !== 'shop' }));
    return allShop;
}

// Does the work to calculate all the possible challenges
let calcChallengesWork = function(chunks, baseChunkData, oldTempItemSkill) {
    let items = {...baseChunkData['items']};
    let objects = {...baseChunkData['objects']};
    let monsters = {...baseChunkData['monsters']};
    let npcs = {...baseChunkData['npcs']};
    let valids = {};
    let toolLevelChallenges = {};
    extraOutputItems = {};
    multiTasks = {};
    rules['Multi Step Processing'] && Object.keys(oldTempItemSkill).filter(skill => checkPrimaryMethod(skill, globalValids, baseChunkData)).forEach((skill) => {
        !!oldTempItemSkill[skill] && Object.keys(oldTempItemSkill[skill]).forEach((item) => {
            !!oldTempItemSkill[skill][item] && oldTempItemSkill[skill][item].filter(task => !!chunkInfo['challenges'][skill][task] && chunkInfo['challenges'][skill][task].hasOwnProperty('Output') && (!items.hasOwnProperty(chunkInfo['challenges'][skill][task]['Output']) || !items[chunkInfo['challenges'][skill][task]['Output']].hasOwnProperty(task))).forEach((task) => {
                (items[chunkInfo['challenges'][skill][task]['Output']] ??= {})[task] = 'multi-' + skill;
                ((multiTasks[chunkInfo['challenges'][skill][task]['Output']] ??= {})[skill] ??= {})[task] = true;
            });
        });
    });

    let tempItemSkill = {};
    let tempMultiStepSkill = {};

    !!chunkInfo['challenges'] && Object.keys(chunkInfo['challenges']).forEach((skill) => {
        !!chunkInfo['challenges'][skill] && Object.keys(chunkInfo['challenges'][skill]).filter((name) => { return chunkInfo['challenges'][skill][name].hasOwnProperty('Permanent') && !chunkInfo['challenges'][skill][name]['Permanent'] }).forEach((name) => {
            delete chunkInfo['challenges'][skill][name];
        });
    });

    // Secondary MTA
    if (!!chunkInfo['challenges']['Magic'] && !!chunkInfo['challenges']['Magic']['Participate in all parts of the ~|Magic Training Arena|~']) {
        chunkInfo['challenges']['Magic']['Participate in all parts of the ~|Magic Training Arena|~']['forcedPrimary'] = !rules['Secondary MTA'];
    }

    // Max Cape
    if (rules['Skillcape'] && !!chunks && chunks.hasOwnProperty('11063')) {
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        valids['Extra']['Buy the ~|Max cape|~'] = 'Skillcapes';
        if (!chunkInfo['challenges']['Extra']) {
            chunkInfo['challenges']['Extra'] = {};
        }
        chunkInfo['challenges']['Extra']['Buy the ~|Max cape|~'] = {
            'Category': ['Skillcape'],
            'Chunks': ['11063-3'],
            'ChunksDetails': ['11063-3'],
            'Label': 'Skillcapes',
            'NPCs': ['Mac'],
            'Output': 'Max cape',
            'TotalLevelNeeded': 2277,
            'Permanent': false
        }
    }

    // Questpoints Cape
    if (!!chunks && chunks.hasOwnProperty('12338')) {
        if (!valids['Nonskill']) {
            valids['Nonskill'] = {};
        }
        valids['Nonskill']['Buy the quest point cape*'] = 'Skillcapes';
        if (!chunkInfo['challenges']['Nonskill']) {
            chunkInfo['challenges']['Nonskill'] = {};
        }
        let totalQuestPoints = 0;
        !!chunkInfo['challenges'] && !!chunkInfo['challenges']['Quest'] && Object.keys(chunkInfo['challenges']['Quest']).filter(task => chunkInfo['challenges']['Quest'][task].hasOwnProperty('QuestPoints')).forEach((task) => {
            totalQuestPoints += chunkInfo['challenges']['Quest'][task]['QuestPoints'];
        });
        chunkInfo['challenges']['Nonskill']['Buy the quest point cape*'] = {
            'Chunks': ['12338'],
            'ChunksDetails': ['12338'],
            'NPCs': ['Wise Old Man'],
            'Output': 'Quest point cape (t)',
            'QuestPointsNeeded': totalQuestPoints,
            'Permanent': false,
            "Not F2P": true
        }
    }

    loadUserTasks();

    let tempSkills;
    if (rules['F2P'] && rules['Skiller']) {
        tempSkills = [...f2pSkills.filter(x => !combatSkills.includes(x) && x !== 'Combat' && x !== 'Slayer'), 'Nonskill', 'Quest', 'Extra'];
    } else if (rules['F2P']) {
        tempSkills = [...f2pSkills, 'Nonskill', 'Quest', 'Extra'];
    } else if (rules['Skiller']) {
        tempSkills = [...skillNames.filter(x => !combatSkills.includes(x) && x !== 'Combat' && x !== 'Slayer'), 'Nonskill', 'Quest', 'Extra'];
    } else {
        tempSkills = [...skillNames, 'Nonskill', 'Quest', 'Diary', 'Extra'];
    }

    let doneTempSkillItems = false;

    !!chunkInfo['challenges'] && tempSkills.filter(skill => { return !passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] > 0 }).forEach((skill) => {
        doneTempSkillItems = false;
        tempItemSkill[skill] = {};
        tempMultiStepSkill[skill] = {};
        valids[skill] = {};
        !!chunkInfo['challenges'][skill] && Object.keys(chunkInfo['challenges'][skill]).sort(function(a, b) { return (((chunkInfo['challenges'][skill][a].hasOwnProperty('Description') - chunkInfo['challenges'][skill][b].hasOwnProperty('Description')) === 0) ? chunkInfo['challenges'][skill][a]['Level'] - chunkInfo['challenges'][skill][b]['Level'] : (chunkInfo['challenges'][skill][a].hasOwnProperty('Description') - chunkInfo['challenges'][skill][b].hasOwnProperty('Description'))) }).forEach((name) => {
            if (!chunkInfo['challenges'][skill][name].hasOwnProperty('Priority') && (skill === 'Quest' || skill === 'Diary')) {
                chunkInfo['challenges'][skill][name]['Priority'] = -1;
            }
            wrongThings = [];
            !!chunkInfo['challenges'][skill][name]['Category'] && chunkInfo['challenges'][skill][name]['Category'].filter((category) => { return maybePrimary.includes(category) }).forEach((category) => {
                if (!chunkInfo['challenges'][skill][name].hasOwnProperty('OriginalPrimary')) {
                    chunkInfo['challenges'][skill][name]['OriginalPrimary'] = chunkInfo['challenges'][skill][name]['Primary'];
                }
                chunkInfo['challenges'][skill][name]['Primary'] = rules[category] && chunkInfo['challenges'][skill][name]['OriginalPrimary'];
            });
            let validChallenge = true;
            let tempSecondary = false;
            if (!!chunkInfo['challenges'][skill][name]['ManualInvalid'] && chunkInfo['challenges'][skill][name]['ManualInvalid']) {
                validChallenge = false;
                wrongThings.push('Manual');
                nonValids[name] = wrongThings;
                return;
            }
            chunkInfo['challenges'][skill][name]['ItemsDetails'] = [];
            chunkInfo['challenges'][skill][name]['ObjectsDetails'] = [];
            chunkInfo['challenges'][skill][name]['MonstersDetails'] = [];
            chunkInfo['challenges'][skill][name]['NPCsDetails'] = [];
            chunkInfo['challenges'][skill][name]['ChunksDetails'] = [];
            chunkInfo['challenges'][skill][name]['Skill RequirementsDetails'] = [];
            chunkInfo['challenges'][skill][name]['Skill Requirements'] = [];

            
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('Skills')) {
                chunkInfo['challenges'][skill][name]['Skill Requirements'].push(...Object.keys(chunkInfo['challenges'][skill][name]['Skills']).map((key) => chunkInfo['challenges'][skill][name]['Skills'][key] + ' ' + key));
                chunkInfo['challenges'][skill][name]['Skill RequirementsDetails'].push(...Object.keys(chunkInfo['challenges'][skill][name]['Skills']).map((key) => chunkInfo['challenges'][skill][name]['Skills'][key] + ' ' + key))
            }

            delete chunkInfo['challenges'][skill][name]['NeverShow'];
            if (!!maxSkill && maxSkill.hasOwnProperty(skill) && chunkInfo['challenges'][skill][name].hasOwnProperty('Level') && maxSkill[skill] < chunkInfo['challenges'][skill][name]['Level']) {
                validChallenge = false;
                wrongThings.push('Max Skill');
                nonValids[name] = wrongThings;
                return;
            }
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('Not F2P') && rules['F2P']) {
                validChallenge = false;
                wrongThings.push('F2P');
                nonValids[name] = wrongThings;
                return;
            }
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('Not Skiller') && rules['Skiller']) {
                validChallenge = false;
                wrongThings.push('Skiller');
                nonValids[name] = wrongThings;
                return;
            }
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('QuestPointsNeeded')) {
                if (!questPointTotal || (questPointTotal < chunkInfo['challenges'][skill][name]['QuestPointsNeeded'])) {
                    validChallenge = false;
                    wrongThings.push('QPS');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('CombatPointsNeeded')) {
                if (!combatPointTotal || (combatPointTotal < chunkInfo['challenges'][skill][name]['CombatPointsNeeded'])) {
                    validChallenge = false;
                    wrongThings.push('Combat Points');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (!!chunkInfo['challenges'][skill][name]['KudosNeeded']) {
                if (kudosTotal < chunkInfo['challenges'][skill][name]['KudosNeeded']) {
                    validChallenge = false;
                    wrongThings.push('Kudos');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('TotalLevelNeeded')) {
                if (possibleSkillTotal < chunkInfo['challenges'][skill][name]['TotalLevelNeeded']) {
                    validChallenge = false;
                    wrongThings.push('Total Level');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (chunkInfo['challenges'][skill][name].hasOwnProperty('CombatLevelNeeded')) {
                let combatExists = combatSkills.some((skill2) => { return checkPrimaryMethod(skill2, valids, baseChunkData) });
                if (!combatExists) {
                    validChallenge = false;
                    wrongThings.push('Combat Level');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (skill === 'Extra' && chunkInfo['challenges'][skill][name].hasOwnProperty('Set')) {
                if (challengeIsBacklogged(skill, name)) {
                    validChallenge = false;
                    wrongThings.push('Set outclassed');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (name.includes('contract for ~|Mahogany Homes|~') && !!constructionLocked) {
                validChallenge = false;
                wrongThings.push('Mahogany Homes Locked');
                return;
            }
            !!chunkInfo['challenges'][skill][name]['Category'] && Object.keys(rules).some(rule => {
                if (chunkInfo['challenges'][skill][name]['Category'].includes(rule) && !maybePrimary.includes(rule) && !rules[rule] && (rule !== 'Secondary Primary' || secondaryPrimaryNum === "1/1")) {
                    validChallenge = false;
                    wrongThings.push(rule);
                    return true;
                }
                if (rule === 'Collection Log Clues' && chunkInfo['challenges'][skill][name]['Category'].includes('Collection Log Clues') && rules[rule]) {
                    if (!clueTasksPossible.hasOwnProperty(name.split(' ')[0].substring(1).toLowerCase()) || !clueTasksPossible[name.split(' ')[0].substring(1).toLowerCase()]) {
                        validChallenge = false;
                        wrongThings.push('Collection Log Clues');
                        nonValids[name] = wrongThings;
                        return true;
                    }
                }
                if (rule === 'Shortcut Task' && chunkInfo['challenges'][skill][name]['Category'].includes('Shortcut') && !rules[rule] && chunkInfo['challenges'][skill][name]['Level'] > 1) {
                    /*validChallenge = false;
                    wrongThings.push('Shortcut');
                    nonValids[name] = wrongThings;
                    return true;*/
                    chunkInfo['challenges'][skill][name]['NeverShow'] = true;
                }
                if (rule === 'InsidePOH' && chunkInfo['challenges'][skill][name]['Category'].includes('InsidePOH Primary') && !rules[rule] && chunkInfo['challenges'][skill][name]['Level'] > 1) {
                    validChallenge = false;
                    wrongThings.push('InsidePOH Primary');
                    nonValids[name] = wrongThings;
                    return true;
                }
            });
            if (!rules['Cleaning Herbs'] && (name.includes('Clean a') || name.includes('(unf)')) && skill === 'Herblore' && chunkInfo['challenges'][skill][name]['Level'] > 1) {
                chunkInfo['challenges'][skill][name]['NeverShow'] = true;
            }
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            if (!!slayerLocked && skill === 'Slayer' && chunkInfo['challenges'][skill][name]['Level'] > slayerLocked['level']) {
                let stillLocked = true;
                if (!!chunkInfo['codeItems']['slayerTasks'] && chunkInfo['codeItems']['slayerTasks'].hasOwnProperty(slayerLocked['monster'])) {
                    (!!chunkInfo['codeItems']['slayerTasks'][slayerLocked['monster']] && Object.keys(chunkInfo['codeItems']['slayerTasks'][slayerLocked['monster']]).some((monster) => { return !!baseChunkData['monsters'] && baseChunkData['monsters'].hasOwnProperty(monster) })) && (stillLocked = false);
                }
                if (stillLocked) {
                    validChallenge = false;
                    wrongThings.push('Slayer Locked');
                    nonValids[name] = wrongThings;
                    return;
                }
            }
            if (!doneTempSkillItems && chunkInfo['challenges'][skill][name].hasOwnProperty('Description')) {
                Object.keys(tempItemSkill[skill]).forEach((item) => {
                    if (rules["Highest Level"]) {
                        !!items[item] && tempItemSkill[skill][item].forEach((name) => {
                            valids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
                        });
                    } else {
                        let lowestItem;
                        let lowestName;
                        !!items[item] && tempItemSkill[skill][item].forEach((name) => {
                            let challenge = chunkInfo['challenges'][skill][name];
                            if (!!challenge && !!challenge['Output']) {
                                if (!extraOutputItems[skill]) {
                                    extraOutputItems[skill] = {};
                                }
                                extraOutputItems[skill][name] = challenge['Output'];
                            }
                            if (!lowestItem || lowestItem['Level'] > challenge['Level']) {
                                lowestItem = challenge;
                                lowestName = name;
                            } else if (lowestItem['Level'] === challenge['Level'] && ((!!challenge['Priority'] && (challenge['Priority'] < lowestItem['Priority'])) || !lowestItem['Priority'])) {
                                lowestItem = challenge;
                                lowestName = name;
                            }
                        });
                        !!lowestName && (valids[skill][lowestName] = chunkInfo['challenges'][skill][lowestName]['Level']);
                    }
                });
                doneTempSkillItems = true;
            }
            !!chunkInfo['challenges'][skill][name]['Chunks'] && chunkInfo['challenges'][skill][name]['Chunks'].some(chunkId => {
                if (chunkId.includes('[+]') && chunksPlus.hasOwnProperty(chunkId.split('[+]x')[0].replaceAll('[+]', '') + '[+]')) {
                    if (chunkId.includes('[+]x')) {
                        let xNum = parseInt(chunkId.split('[+]x')[1]);
                        let xResults = 0;
                        let xChunkId = chunkId.split('[+]x')[0] + '[+]';
                        let tempValid = false;
                        let validXChunks = chunksPlus[xChunkId].filter((plus) => (plus.includes('-') || !isNaN(plus.split('-')[1]) ? chunks.hasOwnProperty(plus.split('-')[0]) : chunks.hasOwnProperty(plus)) && (!plus.includes('-') || isNaN(plus.split('-')[1]) || (chunkInfo['chunks'][plus.split('-')[0]].hasOwnProperty('Sections') && unlockedSections.hasOwnProperty(plus.split('-')[0]) && unlockedSections[plus.split('-')[0]].hasOwnProperty(plus.split('-')[1]))));
                        if (validXChunks.length > 0) {
                            tempValid = true;
                            xResults += validXChunks.length;
                        }
                        if (!tempValid || xResults < xNum) {
                            validChallenge = false;
                            wrongThings.push(xChunkId);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ChunksDetails'].push(xChunkId);
                            return true;
                        } else {
                            chunkInfo['challenges'][skill][name]['ChunksDetails'].push(xChunkId);
                        }
                    } else {
                        let tempValid = false;
                        if (chunksPlus[chunkId].some((plus) => (plus.includes('-') || !isNaN(plus.split('-')[1]) ? chunks.hasOwnProperty(plus.split('-')[0]) : chunks.hasOwnProperty(plus)) && (!plus.includes('-') || isNaN(plus.split('-')[1]) || (chunkInfo['chunks'][plus.split('-')[0]].hasOwnProperty('Sections') && unlockedSections.hasOwnProperty(plus.split('-')[0]) && unlockedSections[plus.split('-')[0]].hasOwnProperty(plus.split('-')[1]))))) {
                            tempValid = true;
                        }
                        if (!tempValid) {
                            validChallenge = false;
                            wrongThings.push(chunkId);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ChunksDetails'].push(chunkId);
                            return true;
                        } else {
                            chunkInfo['challenges'][skill][name]['ChunksDetails'].push(chunkId);
                        }
                    }
                } else {
                    let tempValid = false;
                    if ((chunkId.includes('-') && !isNaN(chunkId.split('-')[1]) ? chunks.hasOwnProperty(chunkId.split('-')[0]) : chunks.hasOwnProperty(chunkId)) && (!chunkId.includes('-') || isNaN(chunkId.split('-')[1]) || (chunkInfo['chunks'][chunkId.split('-')[0]].hasOwnProperty('Sections') && unlockedSections.hasOwnProperty(chunkId.split('-')[0]) && unlockedSections[chunkId.split('-')[0]].hasOwnProperty(chunkId.split('-')[1])))) {
                        tempValid = true;
                    }
                    if (!tempValid) {
                        validChallenge = false;
                        wrongThings.push(chunkId);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['ChunksDetails'].push(chunkId);
                        return true;
                    } else {
                        chunkInfo['challenges'][skill][name]['ChunksDetails'].push(chunkId);
                    }
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            let missingItems = [];
            let savedValid = validChallenge;
            let savedSecondary = tempSecondary;
            let staffItems = {};
            let processingSource = false;
            let hasProcessableItems = false;
            !!chunkInfo['challenges'][skill][name]['Items'] && chunkInfo['challenges'][skill][name]['Items'].some(item => {
                let secondary = item.includes('*');
                if (item.replaceAll(/\*/g, '').includes('[+]') && itemsPlus.hasOwnProperty(item.replaceAll(/\*/g, '').split('[+]x')[0].replaceAll('[+]', '') + '[+]')) {
                    if (item.includes('[+]x')) {
                        let xNum = parseInt(item.split('[+]x')[1]);
                        let xResults = 0;
                        let xItem = item.split('[+]x')[0] + '[+]';
                        let tempValid = false;
                        let tempTempValid = false;
                        let multiValid = false;
                        itemsPlus[xItem.replaceAll(/\*/g, '')].forEach((plus) => {
                            if (!!items[plus] && (!chunkInfo['challenges'][skill][name].hasOwnProperty('NonShop') || !chunkInfo['challenges'][skill][name]['NonShop'] || !onlyShop(items[plus]))) {
                                tempValid = true;
                                xResults++;
                                xItem.includes('*') && Object.keys(items[plus]).some(source => {
                                    if (!items[plus][source].includes('secondary-') || (items[plus][source].includes('primary-') && (!items[plus][source].includes('-Farming') || rules['Farming Primary'])) || items[plus][source] === 'shop') {
                                        secondary = false;
                                        return true;
                                    } else if (xItem === 'Air rune+*') {
                                        if (!!items['Staff of air']) {
                                            secondary = false;
                                            return true;
                                        }
                                    }
                                });
                                if (combatSkills.includes(skill) || (chunkInfo['challenges'][skill][name].hasOwnProperty('Category') && chunkInfo['challenges'][skill][name]['Category'].includes('BIS Skilling'))) {
                                    (Object.keys(items[plus]).some((source) => { return !items[plus][source].includes('-') || !processingSkill[items[plus][source].split('-')[1]] || chunkInfo['challenges'][skill][name]['Not Equip'] || rules['Wield Crafted Items'] || items[plus][source].split('-')[1] === 'Slayer' || skill === 'Magic' })) && (tempTempValid = true);
                                } else {
                                    tempTempValid = true;
                                }
                            }
                            if (rules['Multi Step Processing']) {
                                let tempItemSources = {...items[plus]};
                                Object.keys(tempItemSources).filter(source => source === name).forEach((source) => {
                                    delete tempItemSources[source];
                                });
                                if (!tempItemSources || Object.keys(tempItemSources).some(source => !tempItemSources[source].includes('-') || tempItemSources[source].split('-')[0] !== 'multi') || ((!combatSkills.includes(skill) || chunkInfo['challenges'][skill][name].hasOwnProperty('Not Equip')) && skill !== 'Extra')) {
                                    multiValid = true;
                                }
                            }
                            let tempProcessingSource = true;
                            item.includes('*') && !!items[plus] && Object.keys(items[plus]).some(source => {
                                hasProcessableItems = true;
                                if (!(!(!items[plus][source].includes('-') || !processingSkill[items[plus][source].split('-')[1]] || rules['Wield Crafted Items'] || items[plus][source].split('-')[1] === 'Slayer') || (!!chunkInfo['challenges'][items[plus][source].split('-')[1]] && !!chunkInfo['challenges'][items[plus][source].split('-')[1]][source] && chunkInfo['challenges'][items[plus][source].split('-')[1]][source]['ProcessingSource']))) {
                                    tempProcessingSource = false;
                                    return true;
                                }
                            });
                            if (tempProcessingSource) {
                                processingSource = true;
                            }
                        });
                        !tempTempValid && (tempValid = false);
                        if (!tempValid || xResults < xNum) {
                            validChallenge = false;
                            wrongThings.push(item);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ItemsDetails'].push(xItem.replaceAll(/\*/g, ''));
                            return true;
                        } else {
                            chunkInfo['challenges'][skill][name]['ItemsDetails'].push(xItem.replaceAll(/\*/g, ''));
                        }
                        if (!multiValid && rules['Multi Step Processing']) {
                            validChallenge = false;
                            wrongThings.push('multi');
                            nonValids[name] = wrongThings;
                            return true;
                        }
                    } else {
                        let tempValid = false;
                        let tempTempValid = false;
                        let multiValid = false;
                        let toolLevelValid = false;
                        itemsPlus[item.replaceAll(/\*/g, '')].filter((plus) => { return !!items[plus] && (!chunkInfo['challenges'][skill][name].hasOwnProperty('NonShop') || !chunkInfo['challenges'][skill][name]['NonShop'] || !onlyShop(items[plus])) }).forEach((plus) => {
                            if (!toolLevelValid && ((item === 'Axe[+]' && skill === 'Woodcutting') || (item === 'Pickaxe[+]' && skill === 'Mining')) && !!chunkInfo['toolLevels'] && chunkInfo['toolLevels'].hasOwnProperty(item) && chunkInfo['toolLevels'][item].hasOwnProperty(plus) && chunkInfo['toolLevels'][item][plus] > chunkInfo['challenges'][skill][name]['Level'] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['toolLevels'][item][plus])) {
                                if (!toolLevelChallenges[skill]) {
                                    toolLevelChallenges[skill] = {};
                                }
                                toolLevelChallenges[skill][name] = false;
                            } else {
                                toolLevelValid = true;
                            }
                            tempValid = true;
                            item.includes('*') && Object.keys(items[plus]).some(source => {
                                if (!items[plus][source].includes('secondary-') || (items[plus][source].includes('primary-') && (!items[item.replaceAll(/\*/g, '')][source].includes('-Farming') || rules['Farming Primary'])) || items[plus][source] === 'shop') {
                                    secondary = false;
                                    return true;
                                } else if (item === 'Air rune+*') {
                                    if (!!items['Staff of air']) {
                                        secondary = false;
                                        return true;
                                    }
                                }
                            });
                            if (combatSkills.includes(skill) || (chunkInfo['challenges'][skill][name].hasOwnProperty('Category') && chunkInfo['challenges'][skill][name]['Category'].includes('BIS Skilling'))) {
                                (Object.keys(items[plus]).some((source) => { return !items[plus][source].includes('-') || !processingSkill[items[plus][source].split('-')[1]] || chunkInfo['challenges'][skill][name]['Not Equip'] || rules['Wield Crafted Items'] || items[plus][source].split('-')[1] === 'Slayer' || skill === 'Magic' })) && (tempTempValid = true);
                            } else {
                                tempTempValid = true;
                            }
                            if (rules['Multi Step Processing']) {
                                let tempItemSources = {...items[plus]};
                                Object.keys(tempItemSources).filter(source => source === name).forEach((source) => {
                                    delete tempItemSources[source];
                                });
                                if (!tempItemSources || Object.keys(tempItemSources).some(source => !tempItemSources[source].includes('-') || tempItemSources[source].split('-')[0] !== 'multi') || ((!combatSkills.includes(skill) || chunkInfo['challenges'][skill][name].hasOwnProperty('Not Equip')) && skill !== 'Extra')) {
                                    multiValid = true;
                                }
                            }
                            let tempProcessingSource = true;
                            item.includes('*') && !!items[plus] && Object.keys(items[plus]).some(source => {
                                hasProcessableItems = true;
                                if (!(!(!items[plus][source].includes('-') || !processingSkill[items[plus][source].split('-')[1]] || rules['Wield Crafted Items'] || items[plus][source].split('-')[1] === 'Slayer') || (!!chunkInfo['challenges'][items[plus][source].split('-')[1]] && !!chunkInfo['challenges'][items[plus][source].split('-')[1]][source] && chunkInfo['challenges'][items[plus][source].split('-')[1]][source]['ProcessingSource']))) {
                                    tempProcessingSource = false;
                                    return true;
                                }
                            });
                            if (tempProcessingSource) {
                                processingSource = true;
                            }
                        });
                        (!tempTempValid || !toolLevelValid) && (tempValid = false);
                        if (!tempValid) {
                            validChallenge = false;
                            wrongThings.push(item);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                            return true;
                        } else {
                            chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                        }
                        if (!multiValid && rules['Multi Step Processing']) {
                            validChallenge = false;
                            wrongThings.push('multi');
                            nonValids[name] = wrongThings;
                            return true;
                        }
                    }
                    if ((skill === 'Magic' && chunkInfo['challenges'][skill][name]['Primary']) || ((skill === 'Quest' || skill === 'Diary') && (chunkInfo['challenges'][skill][name].hasOwnProperty('Skills') && chunkInfo['challenges'][skill][name]['Skills'].hasOwnProperty('Magic')) && (chunkInfo['challenges'][skill][name]['Items'].some(e => /.+ rune\+/g.test(e))))) {
                        missingItems.push(item);
                    }
                } else {
                    if ((!items[item.replaceAll(/\*/g, '')] && (!items[item.replaceAll(/\*/g, '') + '*'] || combatSkills.includes(skill))) || (chunkInfo['challenges'][skill][name].hasOwnProperty('NonShop') && chunkInfo['challenges'][skill][name]['NonShop'] && onlyShop(items[item.replaceAll(/\*/g, '')]))) {
                        validChallenge = false;
                        wrongThings.push(item);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['ItemsDetails'].push(item.replaceAll(/\*/g, ''));
                        return true;
                    } else {
                        let tempItem = item.replaceAll(/\*/g, '');
                        if (items.hasOwnProperty(item.replaceAll(/\*/g, '') + '*') && !combatSkills.includes(skill)) {
                            tempItem += '*';
                        }
                        chunkInfo['challenges'][skill][name]['ItemsDetails'].push(tempItem);
                        if (item.includes('*') && !!items[tempItem]) {
                            (Object.keys(items[tempItem]).some((source) => { return (!items[tempItem][source].includes('-Farming') || rules['Farming Primary']) && (!items[tempItem][source].includes('secondary-') || (items[tempItem][source].includes('primary-') && !processingSkill[items[tempItem][source].split('-')[1]]) || items[tempItem][source] === 'shop' )})) && (secondary = false);
                        }
                        if (combatSkills.includes(skill) || (chunkInfo['challenges'][skill][name].hasOwnProperty('Category') && chunkInfo['challenges'][skill][name]['Category'].includes('BIS Skilling'))) {
                            let tempTempValid = false;
                            Object.keys(items[tempItem]).some(source => {
                                if (!items[tempItem][source].includes('-') || !skillNames.includes(items[tempItem][source].split('-')[1]) || chunkInfo['challenges'][skill][name]['Not Equip'] || rules['Wield Crafted Items'] || items[tempItem][source].split('-')[1] === 'Slayer' || skill === 'Magic') {
                                    tempTempValid = true;
                                    return true;
                                } else if (chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks')) {
                                    let questDiaryValid = false;
                                    (Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).some((subTask) => { return subTask.split('--').length > 1 && subTask.split('--')[0] === name && (subTask.split('--')[1] === 'Quest' || subTask.split('--')[1] === 'Diary') })) && (questDiaryValid = true);
                                    if (questDiaryValid) {
                                        tempTempValid = true
                                        return true;
                                    }
                                }
                            });
                            !tempTempValid && (validChallenge = false);
                            !tempTempValid && (wrongThings.push(item));
                            if (!tempTempValid) {
                                nonValids[name] = wrongThings;
                                return true;
                            };
                        }
                        if (rules['Multi Step Processing']) {
                            let tempItemSources = {...items[tempItem]};
                            Object.keys(tempItemSources).filter(source => source === name).forEach((source) => {
                                delete tempItemSources[source];
                            });
                            if (!!tempItemSources && !isEmpty(tempItemSources) && Object.keys(tempItemSources).filter(source => !tempItemSources[source].includes('-') || tempItemSources[source].split('-')[0] !== 'multi').length === 0 && (((combatSkills.includes(skill) && !chunkInfo['challenges'][skill][name].hasOwnProperty('Not Equip')) || skill === 'Extra' || skill === 'Nonskill') || (chunkInfo['challenges'][skill][name]['Level'] < chunkInfo['challenges'][tempItemSources[Object.keys(tempItemSources).filter(source => tempItemSources[source].includes('-') && tempItemSources[source].split('-')[0] === 'multi')[0]].split('-')[1]][Object.keys(tempItemSources).filter(source => tempItemSources[source].includes('-') && tempItemSources[source].split('-')[0] === 'multi')[0]]['Level']))) {
                                validChallenge = false;
                                wrongThings.push('multi');
                                nonValids[name] = wrongThings;
                                return true;
                            }
                        }
                        let tempProcessingSource = true;
                        item.includes('*') && !!items[tempItem] && Object.keys(items[tempItem]).some(source => {
                            hasProcessableItems = true;
                            if (!(!(!items[tempItem][source].includes('-') || !processingSkill[items[tempItem][source].split('-')[1]] || rules['Wield Crafted Items'] || items[tempItem][source].split('-')[1] === 'Slayer') || (!!chunkInfo['challenges'][items[tempItem][source].split('-')[1]] && !!chunkInfo['challenges'][items[tempItem][source].split('-')[1]][source] && chunkInfo['challenges'][items[tempItem][source].split('-')[1]][source]['ProcessingSource']))) {
                                tempProcessingSource = false;
                                return true;
                            }
                        });
                        if (tempProcessingSource) {
                            processingSource = true;
                        }
                    }
                    if ((skill === 'Magic' && chunkInfo['challenges'][skill][name]['Primary']) || ((skill === 'Quest' || skill === 'Diary') && (chunkInfo['challenges'][skill][name].hasOwnProperty('Skills') && chunkInfo['challenges'][skill][name]['Skills'].hasOwnProperty('Magic')) && (chunkInfo['challenges'][skill][name]['Items'].some(e => /.+ rune\+/g.test(e))))) {
                        missingItems.push(item);
                    }
                }
                !!secondary && (tempSecondary = true);
            });
            if (processingSource && hasProcessableItems) {
                chunkInfo['challenges'][skill][name]['ProcessingSource'] = true;
            } else {
                delete chunkInfo['challenges'][skill][name]['ProcessingSource'];
            }
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            if (missingItems.length > 0) {
                let potentialValid = true;
                let potentialSecondary = false;
                let missingRunes = [];
                missingItems.forEach((it) => {
                    let itSecondary = true;
                    if (it.replaceAll(/\*/g, '').includes('[+]') && itemsPlus.hasOwnProperty(it.replaceAll(/\*/g, ''))) {
                        let tempValid = false;
                        itemsPlus[it.replaceAll(/\*/g, '')].filter((plus) => { return !!items[plus] }).some(plus => {
                            tempValid = true;
                            if (it.includes('*') && Object.keys(items[plus]).some((source) => { return !items[plus][source].includes('secondary-') || items[plus][source].includes('primary-') || items[plus][source] === 'shop' })) {
                                itSecondary = false;
                                return true;
                            }
                        });
                        if (!tempValid) {
                            if (elementalRunes.includes(it.replaceAll(/\*/g, '').replaceAll(/\+/g, ''))) {
                                missingRunes.push(it);
                            } else {
                                potentialValid = false;
                            }
                        }
                    } else {
                        if (!items[it.replaceAll(/\*/g, '')]) {
                            if (elementalRunes.includes(it.replaceAll(/\*/g, '').replaceAll(/\+/g, ''))) {
                                missingRunes.push(it);
                            } else {
                                potentialValid = false;
                            }
                        } else {
                            if (it.includes('*') && Object.keys(items[it.replaceAll(/\*/g, '')]).some((source) => { return !items[it.replaceAll(/\*/g, '')][source].includes('secondary-') || items[it.replaceAll(/\*/g, '')][source].includes('primary-') || items[it.replaceAll(/\*/g, '')][source] === 'shop' })) {
                                itSecondary = false;
                            }
                        }
                    }
                    itSecondary && (potentialSecondary = true);
                });
                if (missingRunes.length === 1) {
                    let rune = missingRunes[0].replaceAll(/\*/g, '').replaceAll(/\+/g, '');
                    let foundStaff = false;
                    Object.keys(elementalStaves).filter((staff) => { return elementalStaves[staff].includes(rune) && !!items[staff] && !foundStaff }).forEach((staff) => {
                        staffItems[rune] = {};
                        staffItems[rune][staff] =  'primary-staff';
                        foundStaff = true;
                        if (staff !== 'Staff of air') {
                            potentialSecondary = true;
                        }
                    });
                    if (!foundStaff) {
                        potentialValid = false;
                        potentialSecondary = true;
                    }
                } else if (missingRunes.length === 2) {
                    let foundStaff = false;
                    Object.keys(elementalStaves).some(staff => {
                        let matchingStaff = true;
                        missingRunes.some(rune => {
                            rune = rune.replaceAll(/\*/g, '').replaceAll(/\+/g, '');
                            if (!elementalStaves[staff].includes(rune)) {
                                matchingStaff = false;
                                return true;
                            }
                        });
                        if (matchingStaff && !!items[staff] && !foundStaff) {
                            missingRunes.forEach((rune) => {
                                staffItems[rune] = {};
                                staffItems[rune][staff] =  'primary-staff';
                            });
                            foundStaff = true;
                            return true;
                        }
                    });
                    if (!foundStaff) {
                        potentialValid = false;
                        potentialSecondary = true;
                    }
                }
                !potentialValid ? (validChallenge = false) : (validChallenge = savedValid);
                !potentialValid && wrongThings.push('potentialValid');
                potentialSecondary ? (tempSecondary = true) : (tempSecondary = savedSecondary);
                if (!potentialValid) {
                    nonValids[name] = wrongThings;
                    return true;
                }
            }
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            !!chunkInfo['challenges'][skill][name]['Objects'] && chunkInfo['challenges'][skill][name]['Objects'].some(object => {
                let secondary = true;
                if (object.includes('[+]') && objectsPlus.hasOwnProperty(object)) {
                    let tempValid = false;
                    objectsPlus[object].filter((plus) => { return !!objects[plus] }).some(plus => {
                        tempValid = true;
                        if (Object.keys(objects[plus.replaceAll(/\*/g, '')]).some((source) => { return !source.includes('secondary-') })) {
                            secondary = false;
                            return true;
                        }
                    });
                    if (!tempValid) {
                        validChallenge = false;
                        wrongThings.push(object);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                        return true;
                    } else {
                        chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                    }
                } else {
                    if (!objects[object]) {
                        validChallenge = false;
                        wrongThings.push(object);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                        return true;
                    } else {
                        chunkInfo['challenges'][skill][name]['ObjectsDetails'].push(object);
                        (Object.keys(objects[object]).some((source) => { return !source.includes('secondary-') })) && (secondary = false);
                    }
                }
                !!secondary && (tempSecondary = true);
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            !!chunkInfo['challenges'][skill][name]['Monsters'] && chunkInfo['challenges'][skill][name]['Monsters'].some(monster => {
                if (monster.includes('[+]')) {
                    if (!monstersPlus[monster]) {
                        if (monster !== 'Monster[+]') {
                            validChallenge = false;
                            wrongThings.push(monster);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                            return true;
                        } else if (!monsters || isEmpty(monsters)) {
                            validChallenge = false;
                            wrongThings.push(monster);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                            return true;
                        }
                    } else {
                        let tempValid = false;
                        monstersPlus[monster].some((plus) => { return !!monsters[plus] }) && (tempValid = true);
                        if (!tempValid) {
                            validChallenge = false;
                            wrongThings.push(monster);
                            nonValids[name] = wrongThings;
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                            return true;
                        } else {
                            chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                        }
                    }
                } else {
                    if (!monsters[monster]) {
                        validChallenge = false;
                        wrongThings.push(monster);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                        return true;
                    } else {
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(monster);
                    }
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            !!chunkInfo['challenges'][skill][name]['NPCs'] && chunkInfo['challenges'][skill][name]['NPCs'].some(npc => {
                if (npc.includes('[+]') && npcsPlus.hasOwnProperty(npc)) {
                    let tempValid = false;
                    npcsPlus[npc].some((plus) => { return !!npcs[plus] }) && (tempValid = true);
                    if (!tempValid) {
                        validChallenge = false;
                        wrongThings.push(npc);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                        return true;
                    } else {
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                    }
                } else {
                    if (!npcs[npc]) {
                        validChallenge = false;
                        wrongThings.push(npc);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                        return true;
                    } else {
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(npc);
                    }
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            !!chunkInfo['challenges'][skill][name]['Mix'] && chunkInfo['challenges'][skill][name]['Mix'].some(mix => {
                if (mix.includes('[+]') && mixPlus.hasOwnProperty(mix)) {
                    let tempValid = false;
                    mixPlus[mix].some((plus) => { return !!monsters[plus] || !!npcs[plus] }) && (tempValid = true);
                    if (!tempValid) {
                        validChallenge = false;
                        wrongThings.push(mix);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                        return true;
                    } else {
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                    }
                } else {
                    if (!monsters[mix] && !npcs[mix]) {
                        validChallenge = false;
                        wrongThings.push(mix);
                        nonValids[name] = wrongThings;
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                        return true;
                    } else {
                        chunkInfo['challenges'][skill][name]['MonstersDetails'].push(mix);
                        chunkInfo['challenges'][skill][name]['NPCsDetails'].push(mix);
                    }
                }
            });
            if (wrongThings.length > 0) {
                nonValids[name] = wrongThings;
                return;
            }
            chunkInfo['challenges'][skill][name]['Secondary'] = tempSecondary;
            chunkInfo['challenges'][skill][name]['ManualValid'] && (validChallenge = true);
            chunkInfo['challenges'][skill][name]['forcedPrimary'] && chunkInfo['challenges'][skill][name]['Secondary'] && (validChallenge = false);
            if (validChallenge) {
                delete nonValids[name];
                if (toolLevelChallenges.hasOwnProperty(skill) && toolLevelChallenges[skill].hasOwnProperty(name)) {
                    toolLevelChallenges[skill][name] = true;
                } else if (!processingSkill.hasOwnProperty(skill) || !processingSkill[skill] || !chunkInfo['challenges'][skill][name]['Items'] || chunkInfo['challenges'][skill][name]['Items'].filter(item => { return !tools[item.replaceAll(/\*/g, '')] }).length === 0 || chunkInfo['challenges'][skill][name]['ManualNonProcessing']) {
                    if (skill !== 'Quest' && skill !== 'Diary') {
                        valids[skill][name] = chunkInfo['challenges'][skill][name]['Level'] || chunkInfo['challenges'][skill][name]['Label'] || true;
                    } else {
                        valids[skill][name] = true;
                    }
                } else if (processingSkill.hasOwnProperty(skill) && processingSkill[skill] && chunkInfo['challenges'][skill][name].hasOwnProperty('Tasks') && Object.keys(chunkInfo['challenges'][skill][name]['Tasks']).some((subChallenge) => { return subChallenge.includes('--') })) {
                    chunkInfo['challenges'][skill][name]['mustBeHighest'] = true;
                    valids[skill][name] = chunkInfo['challenges'][skill][name]['Level'] || chunkInfo['challenges'][skill][name]['Label'] || true;
                } else {
                    let itemList = [];
                    if (!!chunkInfo['challenges'][skill][name]['Items']) {
                        itemList = [...chunkInfo['challenges'][skill][name]['Items']];
                    }
                    !!staffItems && Object.keys(staffItems).forEach((item) => {
                        if (!tempItemSkill[skill][item]) {
                            tempItemSkill[skill][item] = [];
                        }
                        tempItemSkill[skill][item].push(name);
                    });
                    let index = 0;
                    let listDone = false;
                    let thingsAdded = false;
                    let nonskillGlobalTracker = {};
                    while (!listDone) {
                        let item = itemList[index++];
                        if (item.replaceAll(/\*/g, '').includes('[+]') && itemsPlus.hasOwnProperty(item.replaceAll(/\*/g, ''))) {
                            !!itemsPlus[item.replaceAll(/\*/g, '')] && itemsPlus[item.replaceAll(/\*/g, '')].filter((plus) => { return !!items[plus] && (!Object.values(items[plus]).includes('primary-Farming') || rules['Farming Primary']) && !tools[plus] && (skill !== 'Magic' || !magicTools[plus]) }).forEach((plus) => {
                                let nonskill = {};
                                let tempNonValid = true;
                                let tempValidHard = false;
                                !!items[plus] && Object.keys(items[plus]).filter(source => !nonskillGlobalTracker.hasOwnProperty(plus) || !nonskillGlobalTracker[plus].hasOwnProperty(source)).forEach((source) => {
                                    if (items[plus][source].includes('Nonskill') && !source.includes('*')) {
                                        if (!nonskill['Nonskill']) {
                                            nonskill['Nonskill'] = {};
                                        }
                                        nonskill['Nonskill'][source] = true;
                                    } else if ((!skillNames.includes(items[plus][source].split('-')[1])) && processingSkill[skill] && !source.includes('*') && processingSkill[items[plus][source].split('-')[1]]) {
                                        if (!nonskill[items[plus][source].split('-')[1]]) {
                                            nonskill[items[plus][source].split('-')[1]] = {};
                                        }
                                        nonskill[items[plus][source].split('-')[1]][source] = true;
                                    }
                                    if ((!processingSkill[items[plus][source].split('-')[1]] || rules['Multi Step Processing']) && (!items[plus][source].includes('-Farming') || rules['Farming Primary'])) {
                                        tempNonValid = false;
                                        if (!nonskill.hasOwnProperty('Nonskill') || !nonskill['Nonskill'].hasOwnProperty(source)) {
                                            tempValidHard = true;
                                        }
                                    } else if (!items[plus][source].includes('-Farming') || rules['Farming Primary']) {
                                        tempMultiStepSkill[skill][name] = true;
                                    }
                                });
                                if (!isEmpty(nonskill) && !tempValidHard) {
                                    !!nonskill && Object.keys(nonskill).filter((skill) => { return !!nonskill[skill] }).forEach((skill) => {
                                        Object.keys(nonskill[skill]).filter((src) => { return !!chunkInfo['challenges'][skill][src] && !!chunkInfo['challenges'][skill][src]['Items'] }).forEach((src) => {
                                            chunkInfo['challenges'][skill][src]['Items'].forEach((it) => {
                                                itemList.push(it);
                                                if (!nonskillGlobalTracker[plus]) {
                                                    nonskillGlobalTracker[plus] = {};
                                                }
                                                nonskillGlobalTracker[plus][src] = true;
                                            });
                                        });
                                    });
                                } else if (!tempNonValid) {
                                    if (!tempItemSkill[skill][plus]) {
                                        tempItemSkill[skill][plus] = [];
                                    }
                                    tempItemSkill[skill][plus].push(name);
                                    thingsAdded = true;
                                }
                            });
                        } else {
                            if (!!items && !tools[item.replaceAll(/\*/g, '')] && !!items[item.replaceAll(/\*/g, '')] && (skill !== 'Magic' || !magicTools[item.replaceAll(/\*/g, '')])) {
                                let nonskill = {};
                                let tempNonValid = true;
                                let tempValidHard = false;
                                !!items[item.replaceAll(/\*/g, '')] && Object.keys(items[item.replaceAll(/\*/g, '')]).filter(source => !nonskillGlobalTracker.hasOwnProperty(item) || !nonskillGlobalTracker[item].hasOwnProperty(source)).forEach((source) => {
                                    if (items[item.replaceAll(/\*/g, '')][source].includes('-') && items[item.replaceAll(/\*/g, '')][source].split('-')[0] === 'multi') {
                                        return;
                                    }
                                    if (items[item.replaceAll(/\*/g, '')][source].includes('Nonskill') && !source.includes('*')) {
                                        if (!nonskill['Nonskill']) {
                                            nonskill['Nonskill'] = {};
                                        }
                                        nonskill['Nonskill'][source] = true;
                                    } else if ((!skillNames.includes(items[item.replaceAll(/\*/g, '')][source].split('-')[1])) && processingSkill[skill] && !source.includes('*') && processingSkill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]]) {
                                        if (!nonskill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]]) {
                                            nonskill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]] = {};
                                        }
                                        nonskill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]][source] = true;
                                    }
                                    if ((!processingSkill[items[item.replaceAll(/\*/g, '')][source].split('-')[1]] || rules['Multi Step Processing']) && (!items[item.replaceAll(/\*/g, '')][source].includes('-Farming') || rules['Farming Primary'])) {
                                        tempNonValid = false;
                                        if (!nonskill.hasOwnProperty('Nonskill') || !nonskill['Nonskill'].hasOwnProperty(source)) {
                                            tempValidHard = true;
                                        }
                                    } else if (!items[item.replaceAll(/\*/g, '')][source].includes('-Farming') || rules['Farming Primary']) {
                                        tempMultiStepSkill[skill][name] = true;
                                    }
                                });
                                if (!isEmpty(nonskill) && !tempValidHard) {
                                    !!nonskill && Object.keys(nonskill).filter((skill) => { return !!nonskill[skill] }).forEach((skill) => {
                                        Object.keys(nonskill[skill]).filter((src) => { return !!chunkInfo['challenges'][skill][src] && !!chunkInfo['challenges'][skill][src]['Items'] }).forEach((src) => {
                                            chunkInfo['challenges'][skill][src]['Items'].forEach((it) => {
                                                itemList.push(it);
                                                if (!nonskillGlobalTracker[item]) {
                                                    nonskillGlobalTracker[item] = {};
                                                }
                                                nonskillGlobalTracker[item][src] = true;
                                            });
                                        });
                                    });
                                } else if (!tempNonValid) {
                                    if (!tempItemSkill[skill][item.replaceAll(/\*/g, '')]) {
                                        tempItemSkill[skill][item.replaceAll(/\*/g, '')] = [];
                                    }
                                    tempItemSkill[skill][item.replaceAll(/\*/g, '')].push(name);
                                    thingsAdded = true;
                                }
                            }
                        }
                        listDone = itemList.length <= index;
                    };
                    if (!thingsAdded) {
                        //valids[skill][name] = false;
                    }
                }
            } else {
                nonValids[name] = wrongThings;
                if (chunkInfo['challenges'][skill][name].hasOwnProperty('Output') && items.hasOwnProperty(chunkInfo['challenges'][skill][name]['Output'])) {
                    Object.keys(items[chunkInfo['challenges'][skill][name]['Output']]).filter((source) => { return source === name }).forEach((source) => {
                        delete items[chunkInfo['challenges'][skill][name]['Output']][source];
                    });
                    if (isEmpty(items[chunkInfo['challenges'][skill][name]['Output']])) {
                        delete items[chunkInfo['challenges'][skill][name]['Output']];
                    }
                }
            }
        });
    });
    let tempStorage = [];
    !!tempItemSkill && Object.keys(tempItemSkill).forEach((skill) => {
        !!tempItemSkill[skill] && Object.keys(tempItemSkill[skill]).forEach((item) => {
            tempStorage = [];
            if (rules["Highest Level"]) {
                !!items[item] && tempItemSkill[skill][item].forEach((name) => {
                    valids[skill][name] = chunkInfo['challenges'][skill][name]['Level'];
                });
            } else {
                let lowestItem;
                let lowestName;
                rules['Multi Step Processing'] && !!items[item] && tempItemSkill[skill][item].length > 1 && tempItemSkill[skill][item].forEach((Xname) => {
                    if (skill === 'Fletching' && chunkInfo['challenges'][skill].hasOwnProperty(Xname) && chunkInfo['challenges'][skill][Xname].hasOwnProperty('Items')) {
                        chunkInfo['challenges'][skill][Xname]['Items'].filter(tempItem => !!items[tempItem]).forEach((tempItem) => {
                            if (Object.values(items[tempItem]).filter(src => !src.includes('multi-')).length === 0 && tempItemSkill[skill][item].some(yName => yName !== Xname)) {
                                tempItemSkill[skill][item] = tempItemSkill[skill][item].filter(yName => yName !== Xname);
                            }
                        });
                    }
                });
                !!items[item] && tempItemSkill[skill][item].forEach((name) => {
                    let challenge = chunkInfo['challenges'][skill][name];
                    if (!!challenge && challenge['AlwaysValid']) {
                        tempStorage.push(name);
                    }
                    if (!!challenge && !!challenge['Output']) {
                        if (!extraOutputItems[skill]) {
                            extraOutputItems[skill] = {};
                        }
                        extraOutputItems[skill][name] = challenge['Output'];
                    }
                    if (!lowestItem || lowestItem['Level'] > challenge['Level']) {
                        lowestItem = challenge;
                        lowestName = name;
                    } else if (lowestItem['Level'] === challenge['Level'] && (!lowestItem['Primary'] || lowestItem['Secondary']) && ((!!challenge['Priority'] && (challenge['Priority'] < lowestItem['Priority'])) || !lowestItem.hasOwnProperty('Priority'))) {
                        lowestItem = challenge;
                        lowestName = name;
                    }
                });
                if (!!lowestName) {
                    valids[skill][lowestName] = chunkInfo['challenges'][skill][lowestName]['Level'];
                    if (!tempAlwaysGlobal[skill]) {
                        tempAlwaysGlobal[skill] = {};
                    }
                    if (!tempAlwaysGlobal[skill][lowestName]) {
                        tempAlwaysGlobal[skill][lowestName] = {};
                    }
                    !!tempStorage && tempStorage.forEach((tempName) => {
                        tempAlwaysGlobal[skill][lowestName][tempName] = chunkInfo['challenges'][skill][tempName]['Level'];
                    });
                }
            }
        });
        doneTempSkillItems = true;
    });

    !!toolLevelChallenges && Object.keys(toolLevelChallenges).forEach((skill) => {
        checkPrimaryMethod(skill, valids, baseChunkData) && Object.keys(toolLevelChallenges[skill]).filter((name) => toolLevelChallenges[skill][name]).forEach((name) => {
            valids[skill][name] = chunkInfo['challenges'][skill][name]['Level'] || chunkInfo['challenges'][skill][name]['Label'] || true;
        });
    });

    // Kill X
    if (rules['Kill X']) {
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        Object.keys(monsters).filter((monster) => { return (!chunkInfo['slayerMonsters'].hasOwnProperty(monster) || (checkPrimaryMethod('Slayer', valids, baseChunkData) && (!slayerLocked || (chunkInfo['slayerMonsters'][monster] <= slayerLocked['level']))) || (!!passiveSkill && passiveSkill.hasOwnProperty('Slayer') && passiveSkill['Slayer'] >= chunkInfo['slayerMonsters'][monster])) && (!backlog['Extra'] || (!backlog['Extra']['Kill X ~|' + monster + '|~'] && !backlog['Extra']['Kill X ~|' + monster.replaceAll('#', '/') + '|~'])) }).sort().forEach((monster) => {
            valids['Extra']['Kill X ~|' + monster + '|~'] = 'Kill X';
            if (!chunkInfo['challenges']['Extra']) {
                chunkInfo['challenges']['Extra'] = {};
            }
            chunkInfo['challenges']['Extra']['Kill X ~|' + monster + '|~'] = {
                'Category': ['Kill X'],
                'Monsters': [monster],
                'MonstersDetails': [monster],
                'Label': 'Kill X',
                'Permanent': false
            }
            if (!!valids['Slayer'] && Object.keys(chunkInfo['challenges']['Slayer']).filter(name => (chunkInfo['challenges']['Slayer'][name].hasOwnProperty('Output') && chunkInfo['challenges']['Slayer'][name]['Output'] === monster) || (name.includes(`~|${monster}|~`))).length >= 1) {
                chunkInfo['challenges']['Extra']['Kill X ~|' + monster + '|~']['Tasks'] = {};
                chunkInfo['challenges']['Extra']['Kill X ~|' + monster + '|~']['Tasks'][Object.keys(chunkInfo['challenges']['Slayer']).filter(name => (chunkInfo['challenges']['Slayer'][name].hasOwnProperty('Output') && chunkInfo['challenges']['Slayer'][name]['Output'] === monster) || (name.includes(`~|${monster}|~`)))[0]] = 'Slayer';
            }
        });
    }
    // Every Drop
    if (rules['Every Drop']) {
        let drops = {};
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        !!completedChallenges['Extra'] && Object.keys(completedChallenges['Extra']).filter((line) => { return line.match(/.*: ~\|.*\|~ \(.*\)/) }).forEach((line) => {
            drops[line.split('|')[1]] = true;
        });
        Object.keys(items).filter((item) => { return !!items[item] }).sort().forEach((item) => {
            !drops[item] && Object.keys(items[item]).filter((source) => { return (items[item][source].includes('-drop') || items[item][source].includes('-Slayer') || items[item][source].includes('-Thieving') || items[item][source].includes('-Hunter')) }).forEach((source) => {
                let realSource = source;
                if (source.includes('Slay ')) {
                    let monster = chunkInfo['challenges']['Slayer'][source]['Output'];
                    realSource = chunkInfo['challenges']['Slayer'][source]['Output'];
                    if (!!dropTables[item] && ((item !== 'RareDropTable+' && item !== 'GemDropTable+') || rules['RDT'])) {
                        !!chunkInfo['skillItems']['Slayer'][monster][item] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][item]).forEach((quantityDrop) => {
                            Object.keys(dropTables[item]).filter((drop) => { return (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[1]) * parseFloat(dropTables[item][drop].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[item][drop].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) }).forEach((drop) => {
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                dropRatesGlobal[monster][drop] = findFraction(parseFloat(dropTables[item][drop].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[item][drop].split('@')[0].split('/')[1].split('@')[0]), item.includes('GeneralSeedDropTable'));
                                if (!drops[drop] && !!dropRatesGlobal[realSource] && !!dropRatesGlobal[realSource][drop] && !dropTables.hasOwnProperty(drop) && !drop.includes('^')) {
                                    drops[drop] = true;
                                    valids['Extra'][realSource.replaceAll('[+]', '') + ': ~|' + drop + '|~ (' + dropRatesGlobal[realSource][drop] + ')'] = 'Every Drop';
                                    if (!chunkInfo['challenges']['Extra']) {
                                        chunkInfo['challenges']['Extra'] = {};
                                    }
                                    chunkInfo['challenges']['Extra'][realSource.replaceAll('[+]', '') + ': ~|' + drop + '|~ (' + dropRatesGlobal[realSource][drop] + ')'] = {
                                        'Category': ['Every Drop'],
                                        'Items': [drop],
                                        'ItemsDetails': [drop],
                                        'Label': 'Every Drop',
                                        'Permanent': false
                                    }
                                }
                            });
                        });
                    } else {
                        !!chunkInfo['skillItems']['Slayer'][monster][item] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][item]).filter(quantityDrop => (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossMonsters.hasOwnProperty(monster))).forEach((quantityDrop) => {
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][item] = (chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[1].replaceAll('~', '')));
                        });
                    }
                }
                if (items[item][source].includes('-Thieving') && chunkInfo['challenges']['Thieving'].hasOwnProperty(source) && chunkInfo['challenges']['Thieving'][source].hasOwnProperty('Output')) {
                    let monster = chunkInfo['challenges']['Thieving'][source]['Output'];
                    realSource = '[Thieving] ' + monster;
                    !!chunkInfo['skillItems']['Thieving'][monster] && !!chunkInfo['skillItems']['Thieving'][monster][item] && Object.keys(chunkInfo['skillItems']['Thieving'][monster][item]).filter(quantityDrop => (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Thieving'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][item][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Thieving'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][item][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))).forEach((quantityDrop) => {
                        if (!dropRatesGlobal['[Thieving] ' + monster]) {
                            dropRatesGlobal['[Thieving] ' + monster] = {};
                        }
                        dropRatesGlobal['[Thieving] ' + monster][item] = (chunkInfo['skillItems']['Thieving'][monster][item][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Thieving'][monster][item][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Thieving'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][item][quantityDrop].split('/')[1].replaceAll('~', '')));
                    });
                }
                // Every Drop Implings
                if (rules['Every Drop Implings'] && items[item][source].includes('-Hunter') && source.includes('impling') && chunkInfo['challenges']['Hunter'].hasOwnProperty(source) && chunkInfo['challenges']['Hunter'][source].hasOwnProperty('Output')) {
                    let monster = chunkInfo['challenges']['Hunter'][source]['Output'];
                    realSource = monster.replaceAll(' jar', '');
                    !!chunkInfo['skillItems']['Hunter'][monster] && !!chunkInfo['skillItems']['Hunter'][monster][item] && Object.keys(chunkInfo['skillItems']['Hunter'][monster][item]).filter(quantityDrop => (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Hunter'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Hunter'][monster][item][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Hunter'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Hunter'][monster][item][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))).forEach((quantityDrop) => {
                        if (!dropRatesGlobal[monster.replaceAll(' jar', '')]) {
                            dropRatesGlobal[monster.replaceAll(' jar', '')] = {};
                        }
                        dropRatesGlobal[monster.replaceAll(' jar', '')][item] = (chunkInfo['skillItems']['Hunter'][monster][item][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Hunter'][monster][item][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Hunter'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Hunter'][monster][item][quantityDrop].split('/')[1].replaceAll('~', '')));
                    });
                }
                if (!drops[item.replaceAll('*', '')] && !!dropRatesGlobal[realSource] && !!dropRatesGlobal[realSource][item.replaceAll('*', '')] && !dropTables.hasOwnProperty(item.replaceAll('*', '')) && !item.replaceAll('*', '').includes('^')) {
                    drops[item.replaceAll('*', '')] = true;
                    valids['Extra'][realSource.replaceAll('[+]', '') + ': ~|' + item.replaceAll('*', '') + '|~ (' + dropRatesGlobal[realSource][item.replaceAll('*', '')] + ')'] = 'Every Drop';
                    if (!chunkInfo['challenges']['Extra']) {
                        chunkInfo['challenges']['Extra'] = {};
                    }
                    chunkInfo['challenges']['Extra'][realSource.replaceAll('[+]', '') + ': ~|' + item.replaceAll('*', '') + '|~ (' + dropRatesGlobal[realSource][item.replaceAll('*', '')] + ')'] = {
                        'Category': ['Every Drop'],
                        'Items': [item.replaceAll('*', '')],
                        'ItemsDetails': [item.replaceAll('*', '')],
                        'Label': 'Every Drop',
                        'Permanent': false
                    }
                }
            });
        });
    }
    // All Droptables
    if (rules['All Droptables']) {
        let drops = {};
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        !!completedChallenges['Extra'] && Object.keys(completedChallenges['Extra']).filter((line) => { return line.match(/.*: .+ ~\|.*\|~ \(.*\) \(.*\)/) }).forEach((line) => {
            if (!drops[line.split(':')[0]]) {
                drops[line.split(':')[0]] = {};
            }
            if (!drops[line.split(':')[0]][line.split('|')[1]]) {
                drops[line.split(':')[0]][line.split('|')[1]] = {};
            }
            drops[line.split(':')[0]][line.split('|')[1]][line.split(' ~')[0].split(': ')[1]] = true;
        });
        Object.keys(items).filter((item) => { return !!items[item] }).sort().forEach((item) => {
            Object.keys(items[item]).filter((source) => { return source.includes('Slay ') }).forEach((source) => {
                let monster = chunkInfo['challenges']['Slayer'][source]['Output'];
                if (!!dropTables[item] && ((item !== 'RareDropTable+' && item !== 'GemDropTable+') || rules['RDT'])) {
                    !!chunkInfo['skillItems']['Slayer'][monster][item] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][item]).forEach((quantityDrop) => {
                        Object.keys(dropTables[item]).filter((drop) => { return (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[1])) || ((parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[1]) * parseFloat(dropTables[item][drop].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[item][drop].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) }).forEach((drop) => {
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            let calcedQuantity;
                            if (dropTables[item][drop].split('@')[1].includes(' (noted)')) {
                                if (dropTables[item][drop].split('@')[1].includes(' (F2P)')) {
                                    calcedQuantity = dropTables[item][drop].split('@')[1].split(' (noted)')[0] * quantityDrop + ' (noted) (F2P)';
                                } else {
                                    calcedQuantity = dropTables[item][drop].split('@')[1].split(' (noted)')[0] * quantityDrop + ' (noted)';
                                }
                            } else {
                                if (dropTables[item][drop].split('@')[1].includes(' (F2P)')) {
                                    calcedQuantity = dropTables[item][drop].split('@')[1].split(' (F2P)')[0] * quantityDrop + ' (F2P)';
                                } else {
                                    calcedQuantity = dropTables[item][drop].split('@')[1] * quantityDrop;
                                }
                            }
                            dropTablesGlobal[monster][drop][calcedQuantity] = findFraction(parseFloat(dropTables[item][drop].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[item][drop].split('@')[0].split('/')[1]), item.includes('GeneralSeedDropTable'));
                        });
                    });
                } else {
                    !!chunkInfo['skillItems']['Slayer'][monster][item] && Object.keys(chunkInfo['skillItems']['Slayer'][monster][item]).filter(quantityDrop => (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) && (rules['Boss'] || !bossMonsters.hasOwnProperty(monster))).forEach((quantityDrop) => {
                        if (!dropTablesGlobal[monster]) {
                            dropTablesGlobal[monster] = {};
                        }
                        if (!dropTablesGlobal[monster][item]) {
                            dropTablesGlobal[monster][item] = {};
                        }
                        dropTablesGlobal[monster][item][quantityDrop] = (chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Slayer'][monster][item][quantityDrop].split('/')[1].replaceAll('~', '')));
                    });
                }
            });
            Object.keys(items[item]).filter((source) => { return items[item][source].includes('-Thieving') && chunkInfo['challenges']['Thieving'].hasOwnProperty(source) && chunkInfo['challenges']['Thieving'][source].hasOwnProperty('Output') }).forEach((source) => {
                let monster = chunkInfo['challenges']['Thieving'][source]['Output'];
                !!chunkInfo['skillItems']['Thieving'] && !!chunkInfo['skillItems']['Thieving'][monster] && Object.keys(chunkInfo['skillItems']['Thieving'][monster]).forEach((drop) => {
                    !!chunkInfo['skillItems']['Thieving'][monster][drop] && Object.keys(chunkInfo['skillItems']['Thieving'][monster][drop]).filter(quantityDrop => (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))).forEach((quantityDrop) => {
                        if (!dropTablesGlobal['[Thieving] ' + monster]) {
                            dropTablesGlobal['[Thieving] ' + monster] = {};
                        }
                        if (!dropTablesGlobal['[Thieving] ' + monster][drop]) {
                            dropTablesGlobal['[Thieving] ' + monster][drop] = {};
                        }
                        dropTablesGlobal['[Thieving] ' + monster][drop][quantityDrop] = (chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Thieving'][monster][drop][quantityDrop].split('/')[1].replaceAll('~', '')));
                    });
                });
            });
            Object.keys(items[item]).filter((source) => { return items[item][source].includes('-Hunter') && source.includes('impling') && chunkInfo['challenges']['Hunter'].hasOwnProperty(source) && chunkInfo['challenges']['Hunter'][source].hasOwnProperty('Output') }).forEach((source) => {
                let monster = chunkInfo['challenges']['Hunter'][source]['Output'];
                !!chunkInfo['skillItems']['Hunter'][monster] && Object.keys(chunkInfo['skillItems']['Hunter'][monster]).forEach((drop) => {
                    !!chunkInfo['skillItems']['Hunter'][monster][drop] && Object.keys(chunkInfo['skillItems']['Hunter'][monster][drop]).filter(quantityDrop => (rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['skillItems']['Hunter'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Hunter'][monster][drop][quantityDrop].split('/')[1])) || (parseFloat(chunkInfo['skillItems']['Hunter'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Hunter'][monster][drop][quantityDrop].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1])))).forEach((quantityDrop) => {
                        if (!dropTablesGlobal[monster.replaceAll(' jar', '') + '-npc']) {
                            dropTablesGlobal[monster.replaceAll(' jar', '') + '-npc'] = {};
                        }
                        if (!dropTablesGlobal[monster.replaceAll(' jar', '') + '-npc'][drop]) {
                            dropTablesGlobal[monster.replaceAll(' jar', '') + '-npc'][drop] = {};
                        }
                        dropTablesGlobal[monster.replaceAll(' jar', '') + '-npc'][drop][quantityDrop] = (chunkInfo['skillItems']['Hunter'][monster][drop][quantityDrop].split('/').length <= 1) ? chunkInfo['skillItems']['Hunter'][monster][drop][quantityDrop] : findFraction(parseFloat(chunkInfo['skillItems']['Hunter'][monster][drop][quantityDrop].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['skillItems']['Hunter'][monster][drop][quantityDrop].split('/')[1].replaceAll('~', '')));
                    });
                });
            });
        });
        Object.keys(dropTablesGlobal).forEach((monster) => {
            dropTablesGlobal.hasOwnProperty(monster) && Object.keys(dropTablesGlobal[monster]).filter(item => { return !item.includes('^') }).forEach((item) => {
                dropTablesGlobal[monster].hasOwnProperty(item) && Object.keys(dropTablesGlobal[monster][item]).forEach((quantity) => {
                    if ((!drops[monster] || !drops[monster][item] || !drops[monster][item][quantity]) && !!dropTablesGlobal[monster] && !!dropTablesGlobal[monster][item] && !!dropTablesGlobal[monster][item][quantity] && !dropTables.hasOwnProperty(item)) {
                        if (!drops[monster]) {
                            drops[monster] = {};
                        }
                        if (!drops[monster][item]) {
                            drops[monster][item] = {};
                        }
                        drops[monster][item][quantity] = true;
                        if (!chunkInfo['challenges']['Extra']) {
                            chunkInfo['challenges']['Extra'] = {};
                        }
                        if (monster.includes('-npc')) {
                            valids['Extra'][monster.replaceAll('-npc', '').replaceAll('[+]', '') + ': ~|' + item + '|~ (' + (quantity || 'N/A') + ') (' + dropTablesGlobal[monster][item][quantity] + ')'] = 'All Droptables';
                            chunkInfo['challenges']['Extra'][monster.replaceAll('-npc', '').replaceAll('[+]', '') + ': ~|' + item + '|~ (' + (quantity || 'N/A') + ') (' + dropTablesGlobal[monster][item][quantity] + ')'] = {
                                'Category': ['All Droptables'],
                                'Items': [item],
                                'ItemsDetails': [item],
                                'Monsters': [monster.replaceAll('-npc', '')],
                                'NPCs': [monster.replaceAll('-npc', '')],
                                'NPCsDetails': [monster.replaceAll('-npc', '')],
                                'Label': 'All Droptables',
                                'Permanent': false
                            }
                        } else {
                            valids['Extra'][monster.replaceAll('[+]', '') + ': ~|' + item + '|~ (' + (quantity || 'N/A') + ') (' + dropTablesGlobal[monster][item][quantity] + ')'] = 'All Droptables';
                            chunkInfo['challenges']['Extra'][monster.replaceAll('[+]', '') + ': ~|' + item + '|~ (' + (quantity || 'N/A') + ') (' + dropTablesGlobal[monster][item][quantity] + ')'] = {
                                'Category': ['All Droptables'],
                                'Items': [item],
                                'ItemsDetails': [item],
                                'Monsters': [monster],
                                'MonstersDetails': [monster],
                                'Label': 'All Droptables',
                                'Permanent': false
                            }
                        }
                    }
                });
            });
        });
    }
    // All Droptables Nest
    if (rules['All Droptables Nest']) {
        if (!valids['Extra']) {
            valids['Extra'] = {};
        }
        !!Object.keys(baseChunkData['items']).filter(it => it.includes('Bird nest (')) && Object.keys(baseChunkData['items']).filter(it => it.includes('Bird nest (')).forEach(it => {
            chunkInfo['skillItems']['Nonskill'].hasOwnProperty(it + ' loot') && chunkInfo['challenges']['Nonskill'].hasOwnProperty(it + ' loot') && (!rules['F2P'] || !chunkInfo['challenges']['Nonskill'][it + ' loot'].hasOwnProperty('Not F2P')) && Object.keys(chunkInfo['skillItems']['Nonskill'][it + ' loot']).forEach(drop => {
                chunkInfo['skillItems']['Nonskill'][it + ' loot'].hasOwnProperty(drop) && Object.keys(chunkInfo['skillItems']['Nonskill'][it + ' loot'][drop]).forEach(quantity => {
                    valids['Extra'][it.replaceAll('[+]', '') + ': ~|' + drop + '|~ (' + (quantity || 'N/A') + ') (' + chunkInfo['skillItems']['Nonskill'][it + ' loot'][drop][quantity] + ')'] = 'All Droptables';
                    chunkInfo['challenges']['Extra'][it.replaceAll('[+]', '') + ': ~|' + drop + '|~ (' + (quantity || 'N/A') + ') (' + chunkInfo['skillItems']['Nonskill'][it + ' loot'][drop][quantity] + ')'] = {
                        'Category': ['All Droptables'],
                        'Items': [drop],
                        'ItemsDetails': [drop],
                        'Monsters': [it],
                        'MonstersDetails': [it],
                        'Label': 'All Droptables',
                        'Permanent': false
                    }
                });
            });
        });
    }
    // All Shops
    if (rules['All Shops']) {
        !!baseChunkData['items'] && Object.keys(baseChunkData['items']).filter(item => { return Object.values(baseChunkData['items'][item]).includes('shop') && !item.includes('^^') }).forEach((item) => {
            !!baseChunkData['items'][item] && Object.keys(baseChunkData['items'][item]).filter(source => { return baseChunkData['items'][item][source] === 'shop' }).forEach((source) => {
                if (source.includes('~|') && source.includes('|~')) {
                    source = source.split('~|')[1].split('|~')[0];
                }
                valids['Extra'][source + ': ~|' + item.replaceAll('*', '') + '|~'] = 'All Shops';
                if (!chunkInfo['challenges']['Extra']) {
                    chunkInfo['challenges']['Extra'] = {};
                }
                chunkInfo['challenges']['Extra'][source + ': ~|' + item.replaceAll('*', '') + '|~'] = {
                    'Category': ['All Shops'],
                    'Items': [item],
                    'ItemsDetails': [item],
                    'Label': 'All Shops',
                    'Permanent': false
                }
            });
        });
    }

    //console.log(JSON.parse(JSON.stringify(tempItemSkill)));
    //console.log(JSON.parse(JSON.stringify(valids)));
    return [valids, tempItemSkill, tempMultiStepSkill];
}

// Calculates the boostable levels for a challenge
let calcBoost = function(skill, challenge, getBoostInfo, altSkill /* the main skill when calculating subskill boosts */) {
    let bestBoost = 0;
    let boostSource;
    let usesCrystalSaw = false;
    let challengeInfo = chunkInfo['challenges'][skill][challenge] ?? chunkInfo['challenges'][altSkill][challenge];
    if (rules["Boosting"] && chunkInfo['codeItems']['boostItems'].hasOwnProperty(skill) && !challengeInfo.hasOwnProperty('NoBoost')) {
        let ownsCrystalSaw = false;
        Object.entries(chunkInfo['codeItems']['boostItems'][skill]).forEach(([boost, value]) => {
            let [boostName, boostType] = boost.split('~');
            if(boostType === undefined)
                boostType = 'items';

            if (baseChunkData[boostType]?.hasOwnProperty(boostName)) {
                if (boost === 'Crystal saw') {
                    ownsCrystalSaw = true;
                    return;
                }

                let boostValue = value;
                if (typeof value === 'string') { // Coerce boost into int
                    let [percent, flat] = boostValue.split('%+');
                    boostValue = Math.floor(challengeInfo.Level * percent / 100 + parseInt(flat));
                    boostValue = Math.floor((challengeInfo.Level - boostValue) * percent / 100 + parseInt(flat)); // TODO: Verify repeated code
                }
                
                if (boostValue > bestBoost) {
                    bestBoost = boostValue;
                    boostSource = boost;
                }
            }
        });

        if (ownsCrystalSaw && skill === 'Construction' && challengeInfo['Items']?.includes('Saw[+]')) {
            bestBoost += 3;
            usesCrystalSaw = true;
        }
    }

    if(getBoostInfo)
        return [bestBoost, usesCrystalSaw, boostSource];

    return bestBoost;
}

// Checks if skill has primary training
let checkPrimaryMethod = function(skill, valids, baseChunkData) {
    if (manualPrimary?.[skill]) {
        return true;
    }

    if (!!manualTasks[skill] && !isEmpty(manualTasks[skill])) {
        let hasManualPrimary = Object.keys(manualTasks[skill]).some(challenge => {
            let challengeInfo = chunkInfo['challenges'][skill][challenge];
            if(!challengeInfo) return false;

            if (((challengeInfo['Primary'] && (!challengeInfo['Secondary'])) && !challengeIsBacklogged(skill, challenge)) || challengeInfo['Manual']) {
                if (smithingCheck(skill)) {
                     return true;
                }
            }
        })

        if(hasManualPrimary)
            return true;
    }

    if(!universalPrimary[skill])
        return true;

    let hasUniversalPrimary = universalPrimary[skill].some(line => {
        if (line === 'Primary[+]') {
            if(!valids[skill])
                return false;
            return Object.keys(valids[skill]).sort((a, b) => valids[skill][a] < valids[skill][b]).some((challenge) => {
                let bestBoost = calcBoost(skill, challenge);

                let bestSkillLevel = Math.max(passiveSkill?.[skill] ?? 1, skillQuestXp?.[skill]?.['level'] ?? 1);
                bestSkillLevel += bestBoost;

                let challengeInfo = chunkInfo['challenges'][skill][challenge];
                if ((((challengeInfo['Primary'] && (!challengeInfo['Secondary'])) && challengeInfo['Level'] <= bestSkillLevel && !challengeIsBacklogged(skill, challenge)) || challengeInfo['Manual']) && smithingCheck(skill)) {
                    primaryTasks = true;
                    return true;
                }
            });
        } else if (line === 'Monster[+]') {
            return !!baseChunkData['monsters'] && !isEmpty(baseChunkData['monsters']);
        } else if (line === 'Bones[+]') {
            return !!baseChunkData['items'] && boneItems.some((bone) => { return Object.keys(baseChunkData['items']).includes(bone) });
        } else if (line === 'Combat[+]') {
            return combatSkills.some((skill2) => { return checkPrimaryMethod(skill2, valids, baseChunkData) });
        } else if (line === 'Ranged[+]') {
            let validRanged = false;
            !!baseChunkData['items'] && Object.keys(chunkInfo['codeItems']['ammoTools']).every(ammoItem => {
                if (validRanged) {
                    return false;
                }
                let tempItem = ammoItem + '*';
                let parsedItem = tempItem.replaceAll(/\*/g, '');
                let ammoValid = true;
                if (ammoItem === 'No ammo') {
                    //
                } else {
                    if (parsedItem.includes('[+]')) {
                        if (!itemsPlus[parsedItem]) {
                            ammoValid = false;
                            return;
                        } else {
                            ammoValid = itemsPlus[parsedItem].some((plus) => { 
                                let itemInfo = baseChunkData['items'][plus.replaceAll(/\*/g, '')];
                                return !!baseChunkData['items'][plus] && (!!itemInfo && Object.entries(itemInfo).some(([source,sourceType]) => {
                                    let wieldable = (!processingSkill[sourceType.split('-')[1]] || rules['Wield Crafted Items']);
                                    return (wieldable && (!sourceType.includes('secondary-') || sourceType.includes('primary-'))) || sourceType === 'shop';
                                }))
                            });
                        }
                    } else {
                        if (!baseChunkData['items'] || !Object.keys(baseChunkData['items']).includes(parsedItem)) {
                            ammoValid = false;
                        } else {
                            let itemInfo = baseChunkData['items'][parsedItem];
                            ammoValid = Object.entries(itemInfo).some(([source, sourceType]) => {
                                let wieldable = (!processingSkill[sourceType.split('-')[1]] || rules['Wield Crafted Items']);
                                return (wieldable && (!sourceType.includes('secondary-') || sourceType.includes('primary-'))) || sourceType === 'shop';
                            });
                        }
                    }
                }
                
                if (ammoValid) {
                    let innerValid = false;
                    Object.keys(chunkInfo['codeItems']['ammoTools'][ammoItem]).every(item => {
                        let parsedItem = item.replaceAll(/\*/g, '');
                        if (!!baseChunkData['items'] && Object.keys(baseChunkData['items']).includes(parsedItem)) {
                            let itemInfo = baseChunkData['items'][parsedItem];
                            let bestSkillLevel = Math.max(passiveSkill?.['Ranged'] ?? 1, skillQuestXp?.['Ranged']?.['level'] ?? 1);

                            if (rangedItems.hasOwnProperty(parsedItem) && rangedItems[parsedItem] <= bestSkillLevel) {
                                if (item.includes('*')) {
                                    innerValid = Object.entries(itemInfo).some(([source, sourceType]) => {
                                        let wieldable = (!processingSkill[sourceType.split('-')[1]] || rules['Wield Crafted Items']);
                                        return (wieldable && (!sourceType.includes('secondary-') || sourceType.includes('primary-'))) || sourceType === 'shop';
                                    });
                                } else {
                                    innerValid = true;
                                }
                            }
                        }
                        if (innerValid) {
                            validRanged = true;
                            return false;
                        }
                        return true;
                    });
                }
                return true;
            });

            let monsterExists = !!baseChunkData['monsters'] && !isEmpty(baseChunkData['monsters']);
            if (!validRanged || !monsterExists) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    });
    
    return hasUniversalPrimary;
}

// Returns formatted equip
let formatEquip = function(equip) {
    if (!chunkInfo['equipment'][equip] || !chunkInfo['equipment'][equip].hasOwnProperty('formatted_name')) {
        return equip.toLowerCase();
    } else {
        return chunkInfo['equipment'][equip]['formatted_name'];
    }
}

// Calcs the BIS gear
let calcBIS = function(completedOnly) {
    let combatStyles = ['Melee', 'Ranged', 'Magic'];
    let primarySkill = {};
    skillNames.forEach((skill) => {
        primarySkill[skill] = checkPrimaryMethod(skill, globalValids, baseChunkData) || (!!manualTasks[skill] && !isEmpty(manualTasks[skill]));
    });
    if (rules['Show Best in Slot Prayer Tasks']) {
        combatStyles.push('Prayer');
    }
    if (rules['Show Best in Slot Defensive Tasks']) {
        combatStyles.push('Melee Tank');
        combatStyles.push('Ranged Tank');
        combatStyles.push('Magic Tank');
    }
    if (rules['Show Best in Slot Flinching Tasks']) {
        combatStyles.push('Flinch');
    }
    if (rules['Show Best in Slot Weight Tasks']) {
        combatStyles.push('Weight Reducing');
    }
    if (rules['Show Best in Slot Melee Style Tasks']) {
        combatStyles.splice(combatStyles.indexOf('Melee'), 1, 'Stab', 'Slash', 'Crush');
        if (rules['Show Best in Slot Defensive Tasks']) {
            combatStyles.splice(combatStyles.indexOf('Melee Tank'), 1, 'Stab Tank', 'Slash Tank', 'Crush Tank');
        }
        if (rules['Show Best in Slot Flinching Tasks']) {
            combatStyles.splice(combatStyles.indexOf('Flinch'), 1, 'Stab Flinch', 'Slash Flinch', 'Crush Flinch');
        }
    }
    if (!globalValids['BiS']) {
        globalValids['BiS'] = {};
    }
    let completedEquipment = {};
    !!completedChallenges['BiS'] && Object.keys(completedChallenges['BiS']).forEach((equipLine) => {
        let equip = equipLine.split('|')[1].charAt(0).toUpperCase() + equipLine.split('|')[1].slice(1);
        if (Object.keys(chunkInfo['equipment']).map((eq) => eq.toLowerCase()).indexOf(equipLine.split('|')[1].toLowerCase())) {
            let equipName = Object.keys(chunkInfo['equipment'])[Object.keys(chunkInfo['equipment']).map((eq) => eq.toLowerCase()).indexOf(equipLine.split('|')[1].toLowerCase())];
            completedEquipment[equipName] = chunkInfo['equipment'][equipName];
        } else {
            completedEquipment[equip] = chunkInfo['equipment'][equip];
        }
    });
    !!checkedChallenges['BiS'] && Object.keys(checkedChallenges['BiS']).forEach((equipLine) => {
        let equip = equipLine.split('|')[1].charAt(0).toUpperCase() + equipLine.split('|')[1].slice(1);
        if (Object.keys(chunkInfo['equipment']).map((eq) => eq.toLowerCase()).indexOf(equipLine.split('|')[1].toLowerCase())) {
            let equipName = Object.keys(chunkInfo['equipment'])[Object.keys(chunkInfo['equipment']).map((eq) => eq.toLowerCase()).indexOf(equipLine.split('|')[1].toLowerCase())];
            completedEquipment[equipName] = chunkInfo['equipment'][equipName];
        } else {
            completedEquipment[equip] = chunkInfo['equipment'][equip];
        }
    });
    if (!isEmpty(chunks)) {
        baseChunkData['items']['Unarmed'] = {'Built-in': 'secondary-Nonskill'};
    }
    let notFresh = {};
    let highestOverallLocal = {};
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    combatStyles.forEach((skill) => {
        let bestEquipment = {};
        let bestEquipmentAlts = {};
        let bestAmmoSaved = {
            'weapon': null,
            '2h': null
        };
        let savedWeaponBis = {};
        let tempEquipmentObject;
        if (completedOnly) {
            tempEquipmentObject = {...completedEquipment};
        } else {
            tempEquipmentObject = {...completedEquipment, ...chunkInfo['equipment']};
        }
        Object.keys(tempEquipmentObject).filter(equip => { return !!baseChunkData['items'][equip] }).forEach((equip) => {
            if (!!!chunkInfo['equipment'][equip]) {
                console.error(equip + " doesn't exist in data.");
                return;
            }
            let validWearable = true;
            !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => (rules['Skiller'] && chunkInfo['equipment'][equip].requirements[skill] > 1) || (!primarySkill[skill] && chunkInfo['equipment'][equip].requirements[skill] > 1 && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) || (skill === 'Slayer' && !!slayerLocked && chunkInfo['equipment'][equip].requirements[skill] > slayerLocked['level']) || (!!maxSkill && maxSkill.hasOwnProperty(skill) && maxSkill[skill] < chunkInfo['equipment'][equip].requirements[skill])) && (validWearable = false);
            chunkInfo['taskUnlocks']['Items'].hasOwnProperty(equip) && chunkInfo['taskUnlocks']['Items'][equip].some(task => !globalValids || !globalValids[Object.values(task)[0]] || !globalValids[Object.values(task)[0]].hasOwnProperty(Object.keys(task)[0])) && (validWearable = false);
            if (validWearable) {
                if (skill === 'Melee') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) > ((Math.max(chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab) + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && ((Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) > 0 && chunkInfo['equipment'][equip].melee_strength > 0) || equip === 'Unarmed')) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) === ((Math.max(chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab) + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && ((Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) > 0 && chunkInfo['equipment'][equip].melee_strength > 0) || equip === 'Unarmed')) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((Math.min(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) >= 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && ((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].attack_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            ((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].attack_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab)) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            ((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].attack_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab)) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Stab') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_stab + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) > ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_stab > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_stab + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) === ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_stab > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_stab >= 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && (chunkInfo['equipment'][equip].attack_stab > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            (chunkInfo['equipment'][equip].attack_stab === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            (chunkInfo['equipment'][equip].attack_stab === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Slash') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) > ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_slash > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) === ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_slash > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_slash >= 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && (chunkInfo['equipment'][equip].attack_slash > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            (chunkInfo['equipment'][equip].attack_slash === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            (chunkInfo['equipment'][equip].attack_slash === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Crush') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) > ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_crush > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].melee_strength + 64) / chunkInfo['equipment'][equip].attack_speed) === ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength + 64) / chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed))) && chunkInfo['equipment'][equip].attack_crush > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_crush >= 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && (chunkInfo['equipment'][equip].attack_crush > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            (chunkInfo['equipment'][equip].attack_crush === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) &&
                            (chunkInfo['equipment'][equip].attack_crush === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Ranged') {
                    if (chunkInfo['equipment'][equip].attack_speed > 1) {
                        let bestAmmo = null;
                        Object.keys(chunkInfo['codeItems']['ammoTools']).filter(ammo => { return chunkInfo['codeItems']['ammoTools'][ammo].hasOwnProperty(equip) }).forEach((ammo) => {
                            if (ammo === 'No ammo') {
                                //
                            } else {
                                if (ammo.replaceAll(/\*/g, '').includes('[+]')) {
                                    !!itemsPlus[ammo.replaceAll(/\*/g, '')] && itemsPlus[ammo.replaceAll(/\*/g, '')].filter((plus) => { return !!baseChunkData['items'][plus] }).forEach((plus) => {
                                        if (bestAmmo === null || chunkInfo['equipment'][plus].ranged_strength > chunkInfo['equipment'][bestAmmo].ranged_strength) {
                                            let tempTempValidAmmo = false;
                                            !!baseChunkData['items'][plus] && Object.keys(baseChunkData['items'][plus]).some(source => !baseChunkData['items'][plus][source].includes('-') || !processingSkill[baseChunkData['items'][plus][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][plus][source].split('-')[1] === 'Slayer') && (tempTempValidAmmo = true);
                                            let articleAmmo = vowels.includes(plus.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                            articleAmmo = (plus.toLowerCase().charAt(plus.toLowerCase().length - 1) === 's' || (plus.toLowerCase().charAt(plus.toLowerCase().length - 1) === ')' && plus.toLowerCase().split('(')[0].trim().charAt(plus.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : articleAmmo;
                                            tempTempValidAmmo && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + plus.toLowerCase() + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + plus.toLowerCase().replaceAll('#', '/') + '|~'))) && (bestAmmo = plus);
                                        } else if (chunkInfo['equipment'][plus].ability_damage === chunkInfo['equipment'][bestAmmo].ability_damage) {
                                            let tempTempValidAmmo = false;
                                            !!baseChunkData['items'][plus] && Object.keys(baseChunkData['items'][plus]).some(source => !baseChunkData['items'][plus][source].includes('-') || !processingSkill[baseChunkData['items'][plus][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][plus][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][plus][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][plus][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][plus][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValidAmmo = true);
                                            let articleAmmo = vowels.includes(plus.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                            articleAmmo = (plus.toLowerCase().charAt(plus.toLowerCase().length - 1) === 's' || (plus.toLowerCase().charAt(plus.toLowerCase().length - 1) === ')' && plus.toLowerCase().split('(')[0].trim().charAt(plus.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : articleAmmo;
                                            if (tempTempValidAmmo && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + plus.toLowerCase() + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + plus.toLowerCase().replaceAll('#', '/') + '|~')))) {
                                                if (!bestEquipmentAlts[chunkInfo['equipment'][plus].slot]) {
                                                    bestEquipmentAlts[chunkInfo['equipment'][plus].slot] = {};
                                                }
                                                bestEquipmentAlts[chunkInfo['equipment'][plus].slot][plus] = bestAmmo;
                                            }
                                        }
                                    });
                                } else if (chunkInfo['equipment'].hasOwnProperty(ammo)) {
                                    if (bestAmmo === null || chunkInfo['equipment'][ammo].ranged_strength > chunkInfo['equipment'][bestAmmo].ranged_strength) {
                                        let tempTempValidAmmo = false;
                                        !!baseChunkData['items'][ammo] && Object.keys(baseChunkData['items'][ammo]).some(source => !baseChunkData['items'][ammo][source].includes('-') || !processingSkill[baseChunkData['items'][ammo][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][ammo][source].split('-')[1] === 'Slayer') && (tempTempValidAmmo = true);
                                        let articleAmmo = vowels.includes(ammo.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                        articleAmmo = (ammo.toLowerCase().charAt(ammo.toLowerCase().length - 1) === 's' || (ammo.toLowerCase().charAt(ammo.toLowerCase().length - 1) === ')' && ammo.toLowerCase().split('(')[0].trim().charAt(ammo.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : articleAmmo;
                                        tempTempValidAmmo && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + ammo.toLowerCase() + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + ammo.toLowerCase().replaceAll('#', '/') + '|~'))) && (bestAmmo = ammo);
                                    } else if (chunkInfo['equipment'][ammo].ability_damage === chunkInfo['equipment'][bestAmmo].ability_damage) {
                                        let tempTempValidAmmo = false;
                                        !!baseChunkData['items'][ammo] && Object.keys(baseChunkData['items'][ammo]).some(source => !baseChunkData['items'][ammo][source].includes('-') || !processingSkill[baseChunkData['items'][ammo][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][ammo][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][ammo][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][ammo][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][ammo][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValidAmmo = true);
                                        let articleAmmo = vowels.includes(ammo.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                        articleAmmo = (ammo.toLowerCase().charAt(ammo.toLowerCase().length - 1) === 's' || (ammo.toLowerCase().charAt(ammo.toLowerCase().length - 1) === ')' && ammo.toLowerCase().split('(')[0].trim().charAt(ammo.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : articleAmmo;
                                        if (tempTempValidAmmo && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + ammo.toLowerCase() + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + ammo.toLowerCase().replaceAll('#', '/') + '|~')))) {
                                            if (!bestEquipmentAlts[chunkInfo['equipment'][ammo].slot]) {
                                                bestEquipmentAlts[chunkInfo['equipment'][ammo].slot] = {};
                                            }
                                            bestEquipmentAlts[chunkInfo['equipment'][ammo].slot][ammo] = bestAmmo;
                                        }
                                    }
                                }
                            }
                        });
                        if (!(Object.keys(chunkInfo['codeItems']['ammoTools']).some(ammo => { return chunkInfo['codeItems']['ammoTools'][ammo].hasOwnProperty(equip) })) || bestAmmo !== null || (Object.keys(chunkInfo['codeItems']['ammoTools']).filter(ammo => { return chunkInfo['codeItems']['ammoTools'][ammo].hasOwnProperty(equip) }).length === 1 && Object.keys(chunkInfo['codeItems']['ammoTools']).filter(ammo => { return chunkInfo['codeItems']['ammoTools'][ammo].hasOwnProperty(equip) })[0] === 'No ammo')) {
                            if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_ranged + chunkInfo['equipment'][equip].ranged_strength + (!!bestAmmo ? chunkInfo['equipment'][bestAmmo].ranged_strength : 0) + 64) / (chunkInfo['equipment'][equip].attack_speed - 1)) > ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged_strength + (!!bestAmmoSaved[chunkInfo['equipment'][equip].slot] ? chunkInfo['equipment'][bestAmmoSaved[chunkInfo['equipment'][equip].slot]].ranged_strength : 0) + 64) / (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed - 1)))) && chunkInfo['equipment'][equip].attack_ranged > 0) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                                if (!!bestAmmo && tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                    let tempTempValidAmmo = false;
                                    Object.keys(baseChunkData['items'][bestAmmo]).some(source => !baseChunkData['items'][bestAmmo][source].includes('-') || !processingSkill[baseChunkData['items'][bestAmmo][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][bestAmmo][source].split('-')[1] === 'Slayer') && (tempTempValidAmmo = true);
                                    let articleAmmo = vowels.includes(bestAmmo.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                    articleAmmo = (bestAmmo.toLowerCase().charAt(bestAmmo.toLowerCase().length - 1) === 's' || (bestAmmo.toLowerCase().charAt(bestAmmo.toLowerCase().length - 1) === ')' && bestAmmo.toLowerCase().split('(')[0].trim().charAt(bestAmmo.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : articleAmmo;
                                    tempTempValidAmmo && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + bestAmmo.toLowerCase() + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + bestAmmo.toLowerCase().replaceAll('#', '/') + '|~'))) && (bestAmmoSaved[chunkInfo['equipment'][equip].slot] = bestAmmo);
                                } else if (bestEquipment[chunkInfo['equipment'][equip].slot] === equip) {
                                    delete bestAmmoSaved[chunkInfo['equipment'][equip].slot];
                                }
                            } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (((chunkInfo['equipment'][equip].attack_ranged + chunkInfo['equipment'][equip].ranged_strength + (!!bestAmmo ? chunkInfo['equipment'][bestAmmo].ranged_strength : 0) + 64) / (chunkInfo['equipment'][equip].attack_speed - 1)) === ((chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged_strength + (!!bestAmmoSaved[chunkInfo['equipment'][equip].slot] ? chunkInfo['equipment'][bestAmmoSaved[chunkInfo['equipment'][equip].slot]].ranged_strength : 0) + 64) / (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_speed - 1)))) && chunkInfo['equipment'][equip].attack_ranged > 0) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                    if (!!bestAmmo) {
                                        let tempTempValidAmmo = false;
                                        Object.keys(baseChunkData['items'][bestAmmo]).some(source => !baseChunkData['items'][bestAmmo][source].includes('-') || !processingSkill[baseChunkData['items'][bestAmmo][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][bestAmmo][source].split('-')[1] === 'Slayer') && (tempTempValidAmmo = true);
                                        let articleAmmo = vowels.includes(bestAmmo.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                        articleAmmo = (bestAmmo.toLowerCase().charAt(bestAmmo.toLowerCase().length - 1) === 's' || (bestAmmo.toLowerCase().charAt(bestAmmo.toLowerCase().length - 1) === ')' && bestAmmo.toLowerCase().split('(')[0].trim().charAt(bestAmmo.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : articleAmmo;
                                        if (tempTempValidAmmo && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + bestAmmo.toLowerCase() + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + articleAmmo + '~|' + bestAmmo.toLowerCase().replaceAll('#', '/') + '|~')))) {
                                            if (!bestEquipmentAlts[chunkInfo['equipment'][bestAmmo].slot]) {
                                                bestEquipmentAlts[chunkInfo['equipment'][bestAmmo].slot] = {};
                                            }
                                            bestEquipmentAlts[chunkInfo['equipment'][bestAmmo].slot][bestAmmo] = bestAmmoSaved[chunkInfo['equipment'][equip].slot];
                                        }
                                    } else {
                                        delete bestEquipmentAlts['ammo'];
                                    }
                                }
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_ranged >= 0 || chunkInfo['equipment'][equip].ranged_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].ranged_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].ranged_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged_strength) && (chunkInfo['equipment'][equip].attack_ranged > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_ranged)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].ranged_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged_strength) &&
                            (chunkInfo['equipment'][equip].attack_ranged === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_ranged) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].ranged_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].ranged_strength) &&
                            (chunkInfo['equipment'][equip].attack_ranged === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_ranged) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Magic') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].magic_damage > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic_damage)) && chunkInfo['equipment'][equip].magic_damage > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].magic_damage === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic_damage) && (chunkInfo['equipment'][equip].attack_magic > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_magic))) && chunkInfo['equipment'][equip].attack_magic > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].attack_magic === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_magic)) && chunkInfo['equipment'][equip].attack_magic > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_magic >= 0 || chunkInfo['equipment'][equip].magic_damage > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].magic_damage > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic_damage)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].magic_damage === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic_damage) && (chunkInfo['equipment'][equip].attack_magic > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_magic)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].magic_damage === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic_damage) &&
                            (chunkInfo['equipment'][equip].attack_magic === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_magic) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].magic_damage === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].magic_damage) &&
                            (chunkInfo['equipment'][equip].attack_magic === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_magic) &&
                            ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_magic + chunkInfo['equipment'][equip].defence_ranged + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                    if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                        bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                    }
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                                }
                            }
                        }
                    }
                } else if (skill === 'Prayer') {
                    if (chunkInfo['equipment'][equip].prayer > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].prayer > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].prayer)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (chunkInfo['equipment'][equip].slot === 'ammo') && (bestAmmoSaved['weapon'] = equip);
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (chunkInfo['equipment'][equip].slot === 'ammo') && (bestAmmoSaved['2h'] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].prayer === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].prayer)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Melee Tank') {
                    if (Math.max(chunkInfo['equipment'][equip].defence_crush, chunkInfo['equipment'][equip].defence_slash, chunkInfo['equipment'][equip].defence_stab) > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].defence_crush + chunkInfo['equipment'][equip].defence_slash + chunkInfo['equipment'][equip].defence_stab) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab))) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Stab Tank') {
                    if (chunkInfo['equipment'][equip].defence_stab > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_stab > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_stab === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_stab)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Slash Tank') {
                    if (chunkInfo['equipment'][equip].defence_slash > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_slash > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_slash === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_slash)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Crush Tank') {
                    if (chunkInfo['equipment'][equip].defence_crush > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_crush > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_crush === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_crush)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Ranged Tank') {
                    if (chunkInfo['equipment'][equip].defence_ranged > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_ranged > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_ranged === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_ranged)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Magic Tank') {
                    if (chunkInfo['equipment'][equip].defence_magic > 0) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_magic > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].defence_magic === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].defence_magic)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                } else if (skill === 'Flinch') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) + chunkInfo['equipment'][equip].melee_strength) > (Math.max(chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab) + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength))) && Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) + chunkInfo['equipment'][equip].melee_strength) === (Math.max(chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash, chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab) + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength))) && Math.max(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((Math.min(chunkInfo['equipment'][equip].attack_crush, chunkInfo['equipment'][equip].attack_slash, chunkInfo['equipment'][equip].attack_stab) > 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && ((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].attack_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            }
                        }
                    }
                } else if (skill === 'Stab Flinch') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].attack_stab + chunkInfo['equipment'][equip].melee_strength) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength))) && chunkInfo['equipment'][equip].attack_stab > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].attack_stab + chunkInfo['equipment'][equip].melee_strength) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) && chunkInfo['equipment'][equip].attack_stab > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_stab > 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && ((chunkInfo['equipment'][equip].attack_stab) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_stab))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            }
                        }
                    }
                } else if (skill === 'Slash Flinch') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].melee_strength) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength))) && chunkInfo['equipment'][equip].attack_slash > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].attack_slash + chunkInfo['equipment'][equip].melee_strength) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) && chunkInfo['equipment'][equip].attack_slash > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_slash > 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && ((chunkInfo['equipment'][equip].attack_slash) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_slash))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            }
                        }
                    }
                } else if (skill === 'Crush Flinch') {
                    if (chunkInfo['equipment'][equip].attack_speed > 0) {
                        if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || ((chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].melee_strength) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength))) && chunkInfo['equipment'][equip].attack_crush > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if ((!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].attack_crush + chunkInfo['equipment'][equip].melee_strength) === (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush + chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) && chunkInfo['equipment'][equip].attack_crush > 0 && chunkInfo['equipment'][equip].melee_strength > 0) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    } else {
                        if ((chunkInfo['equipment'][equip].attack_crush > 0 || chunkInfo['equipment'][equip].melee_strength > 0) && chunkInfo['equipment'][equip].slot !== 'ammo') {
                            if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].melee_strength > chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength)) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            } else if ((chunkInfo['equipment'][equip].melee_strength === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].melee_strength) && ((chunkInfo['equipment'][equip].attack_crush) > (chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].attack_crush))) {
                                let tempTempValid = false;
                                Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                                let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                            }
                        }
                    }
                } else if (skill === 'Weight Reducing') {
                    if (chunkInfo['equipment'][equip].hasOwnProperty('weight')) {
                        if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].weight < chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].weight)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~'))) && (bestEquipment[chunkInfo['equipment'][equip].slot] = equip);
                        } else if (!bestEquipment[chunkInfo['equipment'][equip].slot] || (chunkInfo['equipment'][equip].weight === chunkInfo['equipment'][bestEquipment[chunkInfo['equipment'][equip].slot]].weight)) {
                            let tempTempValid = false;
                            Object.keys(baseChunkData['items'][equip]).some(source => !baseChunkData['items'][equip][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][equip][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][equip][source].split('-')[1] === 'Slayer' || (chunkInfo['challenges'].hasOwnProperty(baseChunkData['items'][equip][source].split('-')[1]) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]].hasOwnProperty(source) && chunkInfo['challenges'][baseChunkData['items'][equip][source].split('-')[1]][source].hasOwnProperty('NoXp'))) && (tempTempValid = true);
                            let article = vowels.includes(equip.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                            article = (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === 's' || (equip.toLowerCase().charAt(equip.toLowerCase().length - 1) === ')' && equip.toLowerCase().split('(')[0].trim().charAt(equip.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                            if (tempTempValid && (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(equip).replaceAll('#', '/') + '|~')))) {
                                if (!bestEquipmentAlts[chunkInfo['equipment'][equip].slot]) {
                                    bestEquipmentAlts[chunkInfo['equipment'][equip].slot] = {};
                                }
                                bestEquipmentAlts[chunkInfo['equipment'][equip].slot][equip] = bestEquipment[chunkInfo['equipment'][equip].slot];
                            }
                        }
                    }
                }
            }
        });
        let twoHPower = 0;
        let weaponShieldPower = 0;
        if (skill === 'Melee') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = (Math.max(chunkInfo['equipment'][bestEquipment['2h']].attack_crush, chunkInfo['equipment'][bestEquipment['2h']].attack_slash, chunkInfo['equipment'][bestEquipment['2h']].attack_stab) + chunkInfo['equipment'][bestEquipment['2h']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['2h']].attack_speed;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = (Math.max((chunkInfo['equipment'][bestEquipment['weapon']].attack_crush + chunkInfo['equipment'][bestEquipment['shield']].attack_crush), (chunkInfo['equipment'][bestEquipment['weapon']].attack_slash + chunkInfo['equipment'][bestEquipment['shield']].attack_slash), (chunkInfo['equipment'][bestEquipment['weapon']].attack_stab + chunkInfo['equipment'][bestEquipment['shield']].attack_stab)) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength) + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                } else {
                    weaponShieldPower = (Math.max(chunkInfo['equipment'][bestEquipment['weapon']].attack_crush, chunkInfo['equipment'][bestEquipment['weapon']].attack_slash, chunkInfo['equipment'][bestEquipment['weapon']].attack_stab) + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                }
            }
        } else if (skill === 'Stab') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = (chunkInfo['equipment'][bestEquipment['2h']].attack_stab + chunkInfo['equipment'][bestEquipment['2h']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['2h']].attack_speed;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['weapon']].attack_stab + chunkInfo['equipment'][bestEquipment['shield']].attack_stab) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength) + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                } else {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_stab + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                }
            }
        } else if (skill === 'Slash') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = (chunkInfo['equipment'][bestEquipment['2h']].attack_slash + chunkInfo['equipment'][bestEquipment['2h']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['2h']].attack_speed;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['weapon']].attack_slash + chunkInfo['equipment'][bestEquipment['shield']].attack_slash) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength) + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                } else {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_slash + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                }
            }
        } else if (skill === 'Crush') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = (chunkInfo['equipment'][bestEquipment['2h']].attack_crush + chunkInfo['equipment'][bestEquipment['2h']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['2h']].attack_speed;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['weapon']].attack_crush + chunkInfo['equipment'][bestEquipment['shield']].attack_crush) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength) + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                } else {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_crush + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + 64) / chunkInfo['equipment'][bestEquipment['weapon']].attack_speed;
                }
            }
        } else if (skill === 'Ranged') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = (chunkInfo['equipment'][bestEquipment['2h']].attack_ranged + chunkInfo['equipment'][bestEquipment['2h']].ranged_strength + (!!bestAmmoSaved['2h'] ? chunkInfo['equipment'][bestAmmoSaved['2h']].ranged_strength : 0) + 64) / (chunkInfo['equipment'][bestEquipment['2h']].attack_speed - 1);
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = ((chunkInfo['equipment'][bestEquipment['weapon']].attack_ranged + chunkInfo['equipment'][bestEquipment['shield']].attack_ranged) + (chunkInfo['equipment'][bestEquipment['weapon']].ranged_strength + (!!bestAmmoSaved['weapon'] ? chunkInfo['equipment'][bestAmmoSaved['weapon']].ranged_strength : 0) + chunkInfo['equipment'][bestEquipment['shield']].ranged_strength) + 64) / (chunkInfo['equipment'][bestEquipment['weapon']].attack_speed - 1);
                } else {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_ranged + chunkInfo['equipment'][bestEquipment['weapon']].ranged_strength + (!!bestAmmoSaved['weapon'] ? chunkInfo['equipment'][bestAmmoSaved['weapon']].ranged_strength : 0) + 64) / (chunkInfo['equipment'][bestEquipment['weapon']].attack_speed - 1);
                }
            }
        } else if (skill === 'Magic') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].attack_magic;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].attack_magic + chunkInfo['equipment'][bestEquipment['shield']].attack_magic;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].attack_magic;
                }
            }
        } else if (skill === 'Prayer') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].prayer;
            }
            if (bestEquipment.hasOwnProperty('weapon') || bestEquipment.hasOwnProperty('shield')) {
                if (bestEquipment.hasOwnProperty('weapon') && !bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].prayer;
                } else if (bestEquipment.hasOwnProperty('shield') && !bestEquipment.hasOwnProperty('weapon')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['shield']].prayer;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].prayer + chunkInfo['equipment'][bestEquipment['shield']].prayer;
                }
            }
        } else if (skill === 'Flinch') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = Math.max(chunkInfo['equipment'][bestEquipment['2h']].attack_crush, chunkInfo['equipment'][bestEquipment['2h']].attack_slash, chunkInfo['equipment'][bestEquipment['2h']].attack_stab) + chunkInfo['equipment'][bestEquipment['2h']].melee_strength;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = Math.max((chunkInfo['equipment'][bestEquipment['weapon']].attack_crush + chunkInfo['equipment'][bestEquipment['shield']].attack_crush), (chunkInfo['equipment'][bestEquipment['weapon']].attack_slash + chunkInfo['equipment'][bestEquipment['shield']].attack_slash), (chunkInfo['equipment'][bestEquipment['weapon']].attack_stab + chunkInfo['equipment'][bestEquipment['shield']].attack_stab)) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength);
                } else {
                    weaponShieldPower = Math.max(chunkInfo['equipment'][bestEquipment['weapon']].attack_crush, chunkInfo['equipment'][bestEquipment['weapon']].attack_slash, chunkInfo['equipment'][bestEquipment['weapon']].attack_stab) + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength;
                }
            }
        } else if (skill === 'Stab Flinch') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].attack_stab + chunkInfo['equipment'][bestEquipment['2h']].melee_strength;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_stab + chunkInfo['equipment'][bestEquipment['shield']].attack_stab) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].attack_stab + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength;
                }
            }
        } else if (skill === 'Slash Flinch') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].attack_slash + chunkInfo['equipment'][bestEquipment['2h']].melee_strength;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_slash + chunkInfo['equipment'][bestEquipment['shield']].attack_slash) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].attack_slash + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength;
                }
            }
        } else if (skill === 'Crush Flinch') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].attack_crush + chunkInfo['equipment'][bestEquipment['2h']].melee_strength;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].attack_crush + chunkInfo['equipment'][bestEquipment['shield']].attack_crush) + (chunkInfo['equipment'][bestEquipment['weapon']].melee_strength + chunkInfo['equipment'][bestEquipment['shield']].melee_strength);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].attack_crush + chunkInfo['equipment'][bestEquipment['weapon']].melee_strength;
                }
            }
        } else if (skill === 'Melee Tank') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].defence_crush + chunkInfo['equipment'][bestEquipment['2h']].defence_slash + chunkInfo['equipment'][bestEquipment['2h']].defence_stab;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = (chunkInfo['equipment'][bestEquipment['weapon']].defence_crush + chunkInfo['equipment'][bestEquipment['shield']].defence_crush) + (chunkInfo['equipment'][bestEquipment['weapon']].defence_slash + chunkInfo['equipment'][bestEquipment['shield']].defence_slash) + (chunkInfo['equipment'][bestEquipment['weapon']].defence_stab + chunkInfo['equipment'][bestEquipment['shield']].defence_stab);
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_crush + chunkInfo['equipment'][bestEquipment['weapon']].defence_slash + chunkInfo['equipment'][bestEquipment['weapon']].defence_stab;
                }
            }
        } else if (skill === 'Stab Tank') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].defence_stab;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_stab + chunkInfo['equipment'][bestEquipment['shield']].defence_stab;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_stab;
                }
            }
        } else if (skill === 'Slash Tank') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].defence_slash;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_slash + chunkInfo['equipment'][bestEquipment['shield']].defence_slash;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_slash;
                }
            }
        } else if (skill === 'Crush Tank') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].defence_crush;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_crush + chunkInfo['equipment'][bestEquipment['shield']].defence_crush;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_crush;
                }
            }
        } else if (skill === 'Ranged Tank') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].defence_ranged;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_ranged + chunkInfo['equipment'][bestEquipment['shield']].defence_ranged;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_ranged;
                }
            }
        } else if (skill === 'Magic Tank') {
            if (bestEquipment.hasOwnProperty('2h')) {
                twoHPower = chunkInfo['equipment'][bestEquipment['2h']].defence_magic;
            }
            if (bestEquipment.hasOwnProperty('weapon')) {
                if (bestEquipment.hasOwnProperty('shield')) {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_magic + chunkInfo['equipment'][bestEquipment['shield']].defence_magic;
                } else {
                    weaponShieldPower = chunkInfo['equipment'][bestEquipment['weapon']].defence_magic;
                }
            }
        }
        let tempShield;
        if (twoHPower > weaponShieldPower) {
            tempShield = bestEquipment['shield'];
            if (rules['Show Best in Slot 1H and 2H']) {
                savedWeaponBis['weapon'] = bestEquipment['weapon'];
                savedWeaponBis['shield'] = bestEquipment['shield'];
                if (bestAmmoSaved['weapon'] !== bestAmmoSaved['2h']) {
                    savedWeaponBis['ammo'] = bestAmmoSaved['weapon'];
                    savedWeaponBis['ammo (2h)'] = bestAmmoSaved['2h'];
                } else {
                    savedWeaponBis['ammo'] = bestAmmoSaved['2h'];
                }
            }
            delete bestEquipment['weapon'];
            delete bestEquipment['shield'];
            bestEquipment['ammo'] = bestAmmoSaved['2h'];
        } else {
            if (rules['Show Best in Slot 1H and 2H']) {
                savedWeaponBis['2h'] = bestEquipment['2h'];
                if (bestAmmoSaved['weapon'] !== bestAmmoSaved['2h']) {
                    savedWeaponBis['ammo'] = bestAmmoSaved['weapon'];
                    savedWeaponBis['ammo (2h)'] = bestAmmoSaved['2h'];
                } else {
                    savedWeaponBis['ammo'] = bestAmmoSaved['weapon'];
                }
            }
            delete bestEquipment['2h'];
            bestEquipment['ammo'] = bestAmmoSaved['weapon'];
        }
        if (!bestEquipment['ammo'] || bestEquipment['ammo'] === null || bestEquipment['ammo'] === undefined) {
            delete bestEquipment['ammo'];
        }
        let bestDps = -1;
        let resultingAdditions = {};
        let validWearable;
        let tempEquipment;
        let tempWeapons;
        if (skill === 'Melee') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach((slot) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(0.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (Math.max(equipment_bonus_att['crush'], equipment_bonus_att['slash'], equipment_bonus_att['stab']) + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * 0.6);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return true;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).filter(slot => !slotMapping[slot]).forEach((slot) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                    itemList.forEach((item) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(0.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (Math.max(equipment_bonus_att['crush'], equipment_bonus_att['slash'], equipment_bonus_att['stab']) + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Toktz-xil-ek', 'Toktz-xil-ak', 'Tzhaar-ket-em', 'Tzhaar-ket-om'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            let tempValidWearable = false;
            tempWeapons.forEach((weapon) => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach((skill) => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach((weapon) => {
                    if (!bestWeapon || ((Math.max(chunkInfo['equipment'][weapon].attack_crush, chunkInfo['equipment'][weapon].attack_slash, chunkInfo['equipment'][weapon].attack_stab) + chunkInfo['equipment'][weapon].melee_strength + 64) / chunkInfo['equipment'][weapon].attack_speed) > ((Math.max(chunkInfo['equipment'][bestWeapon].attack_crush, chunkInfo['equipment'][bestWeapon].attack_slash, chunkInfo['equipment'][bestWeapon].attack_stab) + chunkInfo['equipment'][bestWeapon].melee_strength + 64) / chunkInfo['equipment'][bestWeapon].attack_speed)) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).filter(slot => !slotMapping[slot]).forEach((slot) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                    itemList.forEach((item) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (Math.max(equipment_bonus_att['crush'], equipment_bonus_att['slash'], equipment_bonus_att['stab']) + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment'][bestWeapon].attack_speed * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Inquisitor
            validWearable = true;
            tempEquipment = ["Inquisitor's great helm", "Inquisitor's hauberk", "Inquisitor's plateskirt"];
            tempWeapons = ["Inquisitor's mace"];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            tempValidWearable = false;
            tempWeapons.forEach((weapon) => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach((skill) => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ["Inquisitor's great helm", "Inquisitor's hauberk", "Inquisitor's plateskirt"];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach((weapon) => {
                    if (!bestWeapon || ((Math.max(chunkInfo['equipment'][weapon].attack_crush, chunkInfo['equipment'][weapon].attack_slash, chunkInfo['equipment'][weapon].attack_stab) + chunkInfo['equipment'][weapon].melee_strength + 64) / chunkInfo['equipment'][weapon].attack_speed) > ((Math.max(chunkInfo['equipment'][bestWeapon].attack_crush, chunkInfo['equipment'][bestWeapon].attack_slash, chunkInfo['equipment'][bestWeapon].attack_stab) + chunkInfo['equipment'][bestWeapon].melee_strength + 64) / chunkInfo['equipment'][bestWeapon].attack_speed)) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).filter(slot => !slotMapping[slot]).forEach((slot) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                    itemList.forEach((item) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (112.75 * (equipment_bonus_str + 64) / 640))));
                    let hitChance = 1 - (578 / (2 * (Math.floor(109.675 * (equipment_bonus_att['crush'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment'][bestWeapon].attack_speed * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Stab') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'stab': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach((slot) => { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(0.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['stab'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * 0.6);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach((slot) => { if (!slotMapping[slot]) { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach((item) => { equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(0.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (equipment_bonus_att['stab'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Toktz-xil-ek', 'Toktz-xil-ak'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            let tempValidWearable = false;
            tempWeapons.forEach((weapon) => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach((skill) => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach((weapon) => {
                    if (!bestWeapon || ((chunkInfo['equipment'][weapon].attack_stab + chunkInfo['equipment'][weapon].melee_strength + 64) / chunkInfo['equipment'][weapon].attack_speed) > ((Math.max(chunkInfo['equipment'][bestWeapon].attack_crush, chunkInfo['equipment'][bestWeapon].attack_slash, chunkInfo['equipment'][bestWeapon].attack_stab) + chunkInfo['equipment'][bestWeapon].melee_strength + 64) / chunkInfo['equipment'][bestWeapon].attack_speed)) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach((slot) => { if (!slotMapping[slot]) { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach((item) => { equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['stab'] + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment'][bestWeapon].attack_speed * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Inquisitor
            validWearable = true;
            tempEquipment = ["Inquisitor's great helm", "Inquisitor's hauberk", "Inquisitor's plateskirt"];
            tempWeapons = ["Inquisitor's mace"];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            tempValidWearable = false;
            tempWeapons.forEach((weapon) => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach((skill) => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ["Inquisitor's great helm", "Inquisitor's hauberk", "Inquisitor's plateskirt"];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach((weapon) => {
                    if (!bestWeapon || ((Math.max(chunkInfo['equipment'][weapon].attack_crush, chunkInfo['equipment'][weapon].attack_slash, chunkInfo['equipment'][weapon].attack_stab) + chunkInfo['equipment'][weapon].melee_strength + 64) / chunkInfo['equipment'][weapon].attack_speed) > ((Math.max(chunkInfo['equipment'][bestWeapon].attack_crush, chunkInfo['equipment'][bestWeapon].attack_slash, chunkInfo['equipment'][bestWeapon].attack_stab) + chunkInfo['equipment'][bestWeapon].melee_strength + 64) / chunkInfo['equipment'][bestWeapon].attack_speed)) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).filter(slot => !slotMapping[slot]).forEach((slot) => { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                    itemList.forEach((item) => { equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (112.75 * (equipment_bonus_str + 64) / 640))));
                    let hitChance = 1 - (578 / (2 * (Math.floor(109.675 * (equipment_bonus_att['stab'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment'][bestWeapon].attack_speed * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Slash') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'slash': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach((slot) => { equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(0.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['slash'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * 0.6);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'slash': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach((slot) => { if (!slotMapping[slot]) { equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach((item) => { equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(0.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (equipment_bonus_att['slash'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Toktz-xil-ek', 'Toktz-xil-ak'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            let tempValidWearable = false;
            tempWeapons.forEach((weapon) => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach((skill) => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach((weapon) => {
                    if (!bestWeapon || ((chunkInfo['equipment'][weapon].attack_slash + chunkInfo['equipment'][weapon].melee_strength + 64) / chunkInfo['equipment'][weapon].attack_speed) > ((chunkInfo['equipment'][bestWeapon].attack_slash + chunkInfo['equipment'][bestWeapon].melee_strength + 64) / chunkInfo['equipment'][bestWeapon].attack_speed)) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'slash': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach((slot) => { if (!slotMapping[slot]) { equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach((item) => { equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['slash'] + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment'][bestWeapon].attack_speed * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Crush') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'crush': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach((slot) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(0.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['crush'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * 0.6);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach((slot) => { if (!slotMapping[slot]) { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach((item) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(0.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (equipment_bonus_att['crush'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? chunkInfo['equipment'][bestEquipment['2h']].attack_speed : bestEquipment.hasOwnProperty('weapon') ? chunkInfo['equipment'][bestEquipment['weapon']].attack_speed : 4) * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Tzhaar-ket-em', 'Tzhaar-ket-om'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            let tempValidWearable = false;
            tempWeapons.forEach((weapon) => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach((skill) => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach((weapon) => {
                    if (!bestWeapon || ((chunkInfo['equipment'][weapon].attack_crush + chunkInfo['equipment'][weapon].melee_strength + 64) / chunkInfo['equipment'][weapon].attack_speed) > ((chunkInfo['equipment'][bestWeapon].attack_crush + chunkInfo['equipment'][bestWeapon].melee_strength + 64) / chunkInfo['equipment'][bestWeapon].attack_speed)) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach((slot) => { if (!slotMapping[slot]) { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach((item) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['crush'] + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment'][bestWeapon].attack_speed * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Inquisitor
            validWearable = true;
            tempEquipment = ["Inquisitor's great helm", "Inquisitor's hauberk", "Inquisitor's plateskirt"];
            tempWeapons = ["Inquisitor's mace"];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            tempValidWearable = false;
            tempWeapons.forEach((weapon) => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach((skill) => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ["Inquisitor's great helm", "Inquisitor's hauberk", "Inquisitor's plateskirt"];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach((weapon) => {
                    if (!bestWeapon || ((Math.max(chunkInfo['equipment'][weapon].attack_crush, chunkInfo['equipment'][weapon].attack_slash, chunkInfo['equipment'][weapon].attack_stab) + chunkInfo['equipment'][weapon].melee_strength + 64) / chunkInfo['equipment'][weapon].attack_speed) > ((Math.max(chunkInfo['equipment'][bestWeapon].attack_crush, chunkInfo['equipment'][bestWeapon].attack_slash, chunkInfo['equipment'][bestWeapon].attack_stab) + chunkInfo['equipment'][bestWeapon].melee_strength + 64) / chunkInfo['equipment'][bestWeapon].attack_speed)) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).filter(slot => !slotMapping[slot]).forEach((slot) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                    itemList.forEach((item) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (112.75 * (equipment_bonus_str + 64) / 640))));
                    let hitChance = 1 - (578 / (2 * (Math.floor(109.675 * (equipment_bonus_att['crush'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / (chunkInfo['equipment'][bestWeapon].attack_speed * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Flinch') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach((slot) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(0.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (Math.max(equipment_bonus_att['crush'], equipment_bonus_att['slash'], equipment_bonus_att['stab']) + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).filter(slot => !slotMapping[slot]).forEach((slot) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                    itemList.forEach((item) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(0.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (Math.max(equipment_bonus_att['crush'], equipment_bonus_att['slash'], equipment_bonus_att['stab']) + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Toktz-xil-ek', 'Toktz-xil-ak', 'Tzhaar-ket-em', 'Tzhaar-ket-om'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            let tempValidWearable = false;
            tempWeapons.forEach((weapon) => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach((skill) => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach((weapon) => {
                    if (!bestWeapon || ((Math.max(chunkInfo['equipment'][weapon].attack_crush, chunkInfo['equipment'][weapon].attack_slash, chunkInfo['equipment'][weapon].attack_stab) + chunkInfo['equipment'][weapon].melee_strength + 64)) > ((Math.max(chunkInfo['equipment'][bestWeapon].attack_crush, chunkInfo['equipment'][bestWeapon].attack_slash, chunkInfo['equipment'][bestWeapon].attack_stab) + chunkInfo['equipment'][bestWeapon].melee_strength + 64))) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0, 'slash': 0, 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).filter(slot => !slotMapping[slot]).forEach((slot) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                    itemList.forEach((item) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (Math.max(equipment_bonus_att['crush'], equipment_bonus_att['slash'], equipment_bonus_att['stab']) + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Stab Flinch') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'stab': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach((slot) => { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(0.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['stab'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach((slot) => { if (!slotMapping[slot]) { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach((item) => { equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(0.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (equipment_bonus_att['stab'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Toktz-xil-ek', 'Toktz-xil-ak'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            let tempValidWearable = false;
            tempWeapons.forEach((weapon) => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach((skill) => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach((weapon) => {
                    if (!bestWeapon || ((chunkInfo['equipment'][weapon].attack_stab + chunkInfo['equipment'][weapon].melee_strength + 64)) > ((Math.max(chunkInfo['equipment'][bestWeapon].attack_crush, chunkInfo['equipment'][bestWeapon].attack_slash, chunkInfo['equipment'][bestWeapon].attack_stab) + chunkInfo['equipment'][bestWeapon].melee_strength + 64))) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'stab': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach((slot) => { if (!slotMapping[slot]) { equipment_bonus_att['stab'] += chunkInfo['equipment'][bestEquipment[slot]].attack_stab; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach((item) => { equipment_bonus_att['stab'] += chunkInfo['equipment'][item].attack_stab; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['stab'] + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Slash Flinch') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'slash': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach((slot) => { equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(0.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['slash'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'slash': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach((slot) => { if (!slotMapping[slot]) { equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach((item) => { equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(0.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (equipment_bonus_att['slash'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Toktz-xil-ek', 'Toktz-xil-ak'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            let tempValidWearable = false;
            tempWeapons.forEach((weapon) => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach((skill) => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach((weapon) => {
                    if (!bestWeapon || ((chunkInfo['equipment'][weapon].attack_slash + chunkInfo['equipment'][weapon].melee_strength + 64)) > ((chunkInfo['equipment'][bestWeapon].attack_slash + chunkInfo['equipment'][bestWeapon].melee_strength + 64))) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'slash': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach((slot) => { if (!slotMapping[slot]) { equipment_bonus_att['slash'] += chunkInfo['equipment'][bestEquipment[slot]].attack_slash; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach((item) => { equipment_bonus_att['slash'] += chunkInfo['equipment'][item].attack_slash; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['slash'] + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Crush Flinch') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'crush': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach((slot) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength });
                let maxHit = Math.floor(0.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['crush'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2);
            }
            // Void Melee
            validWearable = true;
            tempEquipment = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ['Void melee helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach((slot) => { if (!slotMapping[slot]) { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach((item) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(0.5 + (121 * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor(117.7 * (equipment_bonus_att['crush'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Obsidian
            validWearable = true;
            tempEquipment = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
            tempWeapons = ['Tzhaar-ket-em', 'Tzhaar-ket-om'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            let tempValidWearable = false;
            tempWeapons.forEach((weapon) => {
                !baseChunkData['items'].hasOwnProperty(weapon) && (validWearable = false);
                baseChunkData['items'].hasOwnProperty(weapon) && !!chunkInfo['equipment'][weapon].requirements && Object.keys(chunkInfo['equipment'][weapon].requirements).forEach((skill) => {
                    if (primarySkill[skill]) {
                        tempValidWearable = true;
                    } else {
                        tempWeapons.splice(tempWeapons.indexOf(weapon), 1);
                    }
                });
            });
            if (!tempValidWearable) {
                validWearable = false;
            }
            if (validWearable) {
                let itemList = ['Obsidian helmet', 'Obsidian platebody', 'Obsidian platelegs'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'weapon': true, '2h': true};
                let allValid = true;

                let bestWeapon = null;
                tempWeapons.forEach((weapon) => {
                    if (!bestWeapon || ((chunkInfo['equipment'][weapon].attack_crush + chunkInfo['equipment'][weapon].melee_strength + 64)) > ((chunkInfo['equipment'][bestWeapon].attack_crush + chunkInfo['equipment'][bestWeapon].melee_strength + 64))) {
                        bestWeapon = weapon;
                    }
                });
                if (!!bestWeapon) {
                    itemList.push(bestWeapon);
                } else {
                    allValid = false;
                }

                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Berserker necklace')) {
                    let item = 'Berserker necklace';
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (tempTempValid) {
                        itemList.push(item);
                        slotMapping['neck'] = true;
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'crush': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).forEach((slot) => { if (!slotMapping[slot]) { equipment_bonus_att['crush'] += chunkInfo['equipment'][bestEquipment[slot]].attack_crush; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].melee_strength } });
                    itemList.forEach((item) => { equipment_bonus_att['crush'] += chunkInfo['equipment'][item].attack_crush; equipment_bonus_str += chunkInfo['equipment'][item].melee_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (110 * (equipment_bonus_str + 64) / 640))) * (slotMapping['neck'] ? 1.3 : 1.1));
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['crush'] + 64)) * (slotMapping['neck'] ? 1.3 : 1.1)) + 1)));
                    let newDps = hitChance * (maxHit / 2);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Ranged') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'ranged': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach((slot) => { equipment_bonus_att['ranged'] += chunkInfo['equipment'][bestEquipment[slot]].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].ranged_strength });
                let maxHit = Math.floor(0.5 + (110 * (equipment_bonus_str + 64) / 640));
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['ranged'] + 64));
                let hitChance = 1 - (578 / (2 * (maxAttackRoll + 1)));
                bestDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? (chunkInfo['equipment'][bestEquipment['2h']].attack_speed - 1) : bestEquipment.hasOwnProperty('weapon') ? (chunkInfo['equipment'][bestEquipment['weapon']].attack_speed - 1) : 4) * 0.6);
            }
            // Void Ranged
            validWearable = true;
            tempEquipment = ['Void ranger helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ['Void ranger helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                let elite = false;
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Elite void top')) {
                    let item = 'Elite void top';
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (tempTempValid) {
                        if (baseChunkData['items'].hasOwnProperty('Elite void robe')) {
                            let item2 = 'Elite void robe';
                            let tempTempTempValid = false;
                            Object.keys(baseChunkData['items'][item2]).filter(source => !baseChunkData['items'][item2][source].includes('-') || !processingSkill[baseChunkData['items'][item2][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item2][source].split('-')[1] === 'Slayer').forEach((source) => {
                                let article = vowels.includes(item2.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (item2.toLowerCase().charAt(item2.toLowerCase().length - 1) === 's' || (item2.toLowerCase().charAt(item2.toLowerCase().length - 1) === ')' && item2.toLowerCase().split('(')[0].trim().charAt(item2.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item2.toLowerCase() + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item2.toLowerCase().replaceAll('#', '/') + '|~'))) && (tempTempTempValid = true);
                            });
                            if (tempTempTempValid) {
                                let index = itemList.indexOf('Void knight top');
                                if (index > -1) {
                                    itemList.splice(index, 1);
                                }
                                index = itemList.indexOf('Void knight robe');
                                if (index > -1) {
                                    itemList.splice(index, 1);
                                }
                                itemList.push(item);
                                itemList.push(item2);
                                elite = true;
                            }
                        }
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'ranged': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).filter(slot => !slotMapping[slot]).forEach((slot) => { equipment_bonus_att['ranged'] += chunkInfo['equipment'][bestEquipment[slot]].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].ranged_strength });
                    itemList.forEach((item) => { equipment_bonus_att['ranged'] += chunkInfo['equipment'][item].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][item].ranged_strength });
                    let maxHit = Math.floor(0.5 + ((elite ? 123.75 : 121) * (equipment_bonus_str + 64) / 640));
                    let hitChance = 1 - (578 / (2 * (Math.floor((elite ? 120.375 : 117.7) * (equipment_bonus_att['ranged'] + 64)) + 1)));
                    let newDps = hitChance * (maxHit / 2) / ((bestEquipment.hasOwnProperty('2h') ? (chunkInfo['equipment'][bestEquipment['2h']].attack_speed - 1) : bestEquipment.hasOwnProperty('weapon') ? (chunkInfo['equipment'][bestEquipment['weapon']].attack_speed - 1) : 4) * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Amulet of the damned + Karil's
            validWearable = true;
            tempEquipment = ['Amulet of the damned (full)', "Karil's coif", "Karil's crossbow", "Karil's leatherskirt", "Karil's leathertop", 'Bolt rack'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ['Amulet of the damned (full)', "Karil's coif", "Karil's crossbow", "Karil's leatherskirt", "Karil's leathertop", 'Bolt rack'];
                let slotMapping = {'neck': true, 'head': true, '2h': true, 'weapon': true, 'shield': true, 'legs': true, 'body': true, 'ammo': true};
                let allValid = true;
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (allValid) {
                    let equipment_bonus_att = { 'ranged': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).filter(slot => !slotMapping[slot]).forEach((slot) => { equipment_bonus_att['ranged'] += chunkInfo['equipment'][bestEquipment[slot]].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].ranged_strength });
                    itemList.forEach((item) => { equipment_bonus_att['ranged'] += chunkInfo['equipment'][item].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][item].ranged_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (110 * (equipment_bonus_str + 64) / 640))) * 1.125);
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['ranged'] + 64))) + 1)));
                    let newDps = hitChance * (maxHit / 2) / ((chunkInfo['equipment']["Karil's crossbow"].attack_speed - 1) * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
            // Crystal
            validWearable = true;
            tempEquipment = ['Crystal helm', 'Crystal body', 'Crystal legs', 'Crystal bow'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ['Crystal helm', 'Crystal body', 'Crystal legs', 'Crystal bow'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, '2h': true, 'weapon': true, 'shield': true};
                let allValid = true;
                let weapon = 'Crystal bow';
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Bow of faerdhinen')) {
                    let item2 = 'Bow of faerdhinen';
                    let tempTempTempValid = false;
                    Object.keys(baseChunkData['items'][item2]).filter(source => !baseChunkData['items'][item2][source].includes('-') || !processingSkill[baseChunkData['items'][item2][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item2][source].split('-')[1] === 'Slayer').forEach((source) => {
                        let article = vowels.includes(item2.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item2.toLowerCase().charAt(item2.toLowerCase().length - 1) === 's' || (item2.toLowerCase().charAt(item2.toLowerCase().length - 1) === ')' && item2.toLowerCase().split('(')[0].trim().charAt(item2.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item2.toLowerCase() + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item2.toLowerCase().replaceAll('#', '/') + '|~'))) && (tempTempTempValid = true);
                    });
                    if (tempTempTempValid) {
                        let index = itemList.indexOf('Crystal bow');
                        if (index > -1) {
                            itemList.splice(index, 1);
                        }
                        itemList.push(item2);
                        weapon = 'Bow of faerdhinen';
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'ranged': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).filter(slot => !slotMapping[slot]).forEach((slot) => { equipment_bonus_att['ranged'] += chunkInfo['equipment'][bestEquipment[slot]].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].ranged_strength });
                    itemList.forEach((item) => { equipment_bonus_att['ranged'] += chunkInfo['equipment'][item].attack_ranged; equipment_bonus_str += chunkInfo['equipment'][item].ranged_strength });
                    let maxHit = Math.floor(Math.floor((0.5 + (110 * (equipment_bonus_str + 64) / 640))) * 1.15);
                    let hitChance = 1 - (578 / (2 * ((Math.floor(107 * (equipment_bonus_att['ranged'] + 64)) * 1.3) + 1)));
                    let newDps = hitChance * (maxHit / 2) / ((chunkInfo['equipment'][weapon].attack_speed - 1) * 0.6);
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Magic') {
            // Non-set DPS
            if (bestDps === -1) {
                let equipment_bonus_att = { 'magic': 0 };
                let equipment_bonus_str = 0;
                Object.keys(bestEquipment).forEach((slot) => { equipment_bonus_att['magic'] += chunkInfo['equipment'][bestEquipment[slot]].attack_magic; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].magic_damage;
                });
                let maxHit = 2 * (1 + equipment_bonus_str);
                let maxAttackRoll = Math.floor(107 * (equipment_bonus_att['magic'] + 64));
                let hitChance = 1 - (578 / (2 * maxAttackRoll + 1));
                bestDps = (hitChance * maxHit) / 3;
            }
            // Void Magic
            validWearable = true;
            tempEquipment = ['Void mage helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ['Void mage helm', 'Void knight top', 'Void knight robe', 'Void knight gloves'];
                let slotMapping = {'head': true, 'body': true, 'legs': true, 'hands': true};
                let allValid = true;
                let elite = false;
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (baseChunkData['items'].hasOwnProperty('Elite void top')) {
                    let item = 'Elite void top';
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (tempTempValid) {
                        if (baseChunkData['items'].hasOwnProperty('Elite void robe')) {
                            let item2 = 'Elite void robe';
                            let tempTempTempValid = false;
                            Object.keys(baseChunkData['items'][item2]).filter(source => !baseChunkData['items'][item2][source].includes('-') || !processingSkill[baseChunkData['items'][item2][source].split('-')[1]] || rules['Wield Crafted Items'] || baseChunkData['items'][item2][source].split('-')[1] === 'Slayer').forEach((source) => {
                                let article = vowels.includes(item2.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                                article = (item2.toLowerCase().charAt(item2.toLowerCase().length - 1) === 's' || (item2.toLowerCase().charAt(item2.toLowerCase().length - 1) === ')' && item2.toLowerCase().split('(')[0].trim().charAt(item2.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                                (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item2.toLowerCase() + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + item2.toLowerCase().replaceAll('#', '/') + '|~'))) && (tempTempTempValid = true);
                            });
                            if (tempTempTempValid) {
                                let index = itemList.indexOf('Void knight top');
                                if (index > -1) {
                                    itemList.splice(index, 1);
                                }
                                index = itemList.indexOf('Void knight robe');
                                if (index > -1) {
                                    itemList.splice(index, 1);
                                }
                                itemList.push(item);
                                itemList.push(item2);
                                elite = true;
                            }
                        }
                    }
                }
                if (allValid) {
                    let equipment_bonus_att = { 'magic': 0 };
                    let equipment_bonus_str = 0;
                    Object.keys(bestEquipment).filter(slot => !slotMapping[slot]).forEach((slot) => { equipment_bonus_att['magic'] += chunkInfo['equipment'][bestEquipment[slot]].attack_magic; equipment_bonus_str += chunkInfo['equipment'][bestEquipment[slot]].magic_damage; });
                    itemList.forEach((item) => {
                        equipment_bonus_att['magic'] += chunkInfo['equipment'][item].attack_magic;
                        equipment_bonus_str += chunkInfo['equipment'][item].magic_damage;
                    });
                    let maxHit = 2 * (1 + ((elite ? 5 : 0) + equipment_bonus_str));
                    let maxAttackRoll = Math.floor(155 * (equipment_bonus_att['magic'] + 64));
                    let hitChance = 1 - (578 / (2 * maxAttackRoll + 1));
                    let newDps = (hitChance * maxHit) / 3;
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        } else if (skill === 'Prayer') {
            // Non-set DPS
            if (bestDps === -1) {
                let prayerBonus = 0;
                Object.keys(bestEquipment).forEach((slot) => { prayerBonus += chunkInfo['equipment'][bestEquipment[slot]].prayer;
                });
                bestDps = prayerBonus;
            }
            // Verac's
            validWearable = true;
            tempEquipment = ["Verac's helm", "Verac's brassard", "Verac's plateskirt", "Verac's flail", "Amulet of the damned (full)"];
            tempEquipment.some(equip => {
                if (!baseChunkData['items'].hasOwnProperty(equip)) {
                    validWearable = false;
                    return true;
                }
                if (baseChunkData['items'].hasOwnProperty(equip) && !!chunkInfo['equipment'][equip].requirements && Object.keys(chunkInfo['equipment'][equip].requirements).some(skill => !primarySkill[skill] && (!passiveSkill || !passiveSkill.hasOwnProperty(skill) || passiveSkill[skill] < chunkInfo['equipment'][equip].requirements[skill]))) {
                    validWearable = false;
                    return true;
                }
            });
            if (validWearable) {
                let itemList = ["Verac's helm", "Verac's brassard", "Verac's plateskirt", "Verac's flail", "Amulet of the damned (full)"];
                let slotMapping = {'head': true, 'body': true, 'legs': true, '2h': true, 'neck': true, 'weapon': true, 'shield': true};
                let allValid = true;
                itemList.some(item => {
                    let tempTempValid = false;
                    if (Object.keys(baseChunkData['items'][item]).some(source => !baseChunkData['items'][item][source].includes('-') || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]] || !chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source] || (!chunkInfo['challenges'][baseChunkData['items'][item][source].split('-')[1]][source]['ProcessingSource'] && !processingSkill[baseChunkData['items'][item][source].split('-')[1]]) || rules['Wield Crafted Items'] || baseChunkData['items'][item][source].split('-')[1] === 'Slayer')) {
                        let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                        article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                        (!backlog['BiS'] || (!backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item) + '|~') && !backlog['BiS'].hasOwnProperty('Obtain' + article + '~|' + formatEquip(item).replaceAll('#', '/') + '|~'))) && (tempTempValid = true);
                    }
                    if (!tempTempValid) {
                        allValid = false;
                        return false;
                    }
                });
                if (allValid) {
                    let prayerBonus = 0;
                    Object.keys(bestEquipment).filter(slot => !slotMapping[slot]).forEach((slot) => { prayerBonus += chunkInfo['equipment'][bestEquipment[slot]].prayer; });
                    itemList.forEach((item) => {
                        prayerBonus += chunkInfo['equipment'][item].prayer;
                    });
                    let newDps = prayerBonus;
                    if (newDps > bestDps) {
                        bestDps = newDps;
                        resultingAdditions = {};
                        itemList.forEach((item) => {
                            resultingAdditions[chunkInfo['equipment'][item].slot] = item;
                        });
                    }
                }
            }
        }
        Object.keys(resultingAdditions).forEach((slot) => {
            bestEquipment[slot] = resultingAdditions[slot];
            delete bestEquipmentAlts[slot];
        });
        if (bestEquipment.hasOwnProperty('weapon') && bestEquipment.hasOwnProperty('2h')) {
            delete bestEquipment['2h'];
            if (!bestEquipment.hasOwnProperty('shield') && !!tempShield) {
                bestEquipment['shield'] = tempShield;
            }
        }
        rules['Show Best in Slot 1H and 2H'] && !!savedWeaponBis && Object.keys(savedWeaponBis).filter(slot => !!savedWeaponBis[slot]).forEach((slot) => {
            if (slot === 'ammo (2h)' && !savedWeaponBis['ammo']) {
                bestEquipment['ammo'] = savedWeaponBis['ammo (2h)'];
            } else {
                bestEquipment[slot] = savedWeaponBis[slot];
            }
        });
        Object.keys(bestEquipment).forEach((slot) => {
            if (slot === '2h' && !rules['Show Best in Slot 1H and 2H']) {
                highestOverallLocal[skill.replaceAll(' ', '_') + '-weapon'] = bestEquipment[slot];
                highestOverallLocal[skill.replaceAll(' ', '_') + '-shield'] = 'N/A';
            } else {
                highestOverallLocal[skill.replaceAll(' ', '_') + '-' + slot] = bestEquipment[slot];
            }
            let article = vowels.includes(bestEquipment[slot].toLowerCase().charAt(0)) ? ' an ' : ' a ';
            article = (bestEquipment[slot].toLowerCase().charAt(bestEquipment[slot].toLowerCase().length - 1) === 's' || (bestEquipment[slot].toLowerCase().charAt(bestEquipment[slot].toLowerCase().length - 1) === ')' && bestEquipment[slot].toLowerCase().split('(')[0].trim().charAt(bestEquipment[slot].toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
            if (!completedOnly) {
                if (!!globalValids['BiS']['Obtain' + article + '~|' + formatEquip(bestEquipment[slot]) + '|~']) {
                    globalValids['BiS']['Obtain' + article + '~|' + formatEquip(bestEquipment[slot]) + '|~'] = skill + '/​' + globalValids['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~'];
                } else {
                    globalValids['BiS']['Obtain' + article + '~|' + formatEquip(bestEquipment[slot]) + '|~'] = skill + ' BiS ' + slot;
                }
            }
            if (!chunkInfo['challenges']['BiS']) {
                chunkInfo['challenges']['BiS'] = {};
            }
            if (!!chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + formatEquip(bestEquipment[slot]) + '|~'] && notFresh['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~']) {
                chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + formatEquip(bestEquipment[slot]) + '|~'] = {
                    'ItemsDetails': [bestEquipment[slot]],
                    'Label': `<span class='noscroll ${skill}-bis-highlight'>` + skill + '</span>/​' + chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + bestEquipment[slot].toLowerCase() + '|~']['Label']
                }
            } else {
                chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + formatEquip(bestEquipment[slot]) + '|~'] = {
                    'ItemsDetails': [bestEquipment[slot]],
                    'Label': `<span class='noscroll ${skill}-bis-highlight'>` + skill + '</span> BiS ' + slot
                }
                notFresh['Obtain' + article + '~|' + formatEquip(bestEquipment[slot]) + '|~'] = true;
            }
        });
        Object.keys(bestEquipmentAlts).forEach((slot) => {
            Object.keys(bestEquipmentAlts[slot]).forEach((item) => {
                if (bestEquipmentAlts[slot][item] === bestEquipment[slot]) {
                    let article = vowels.includes(item.toLowerCase().charAt(0)) ? ' an ' : ' a ';
                    article = (item.toLowerCase().charAt(item.toLowerCase().length - 1) === 's' || (item.toLowerCase().charAt(item.toLowerCase().length - 1) === ')' && item.toLowerCase().split('(')[0].trim().charAt(item.toLowerCase().split('(')[0].trim().length - 1) === 's')) ? ' ' : article;
                    if (type === 'current') {
                        if (!!globalValids['BiS']['Obtain' + article + '~|' + formatEquip(item) + '|~']) {
                            if (!completedOnly) {
                                globalValids['BiS']['Obtain' + article + '~|' + formatEquip(item) + '|~'] = skill + '/​' + globalValids['BiS']['Obtain' + article + '~|' + formatEquip(item) + '|~'];
                            }
                            if (Object.values(highestOverallLocal).includes(item) || completedEquipment.hasOwnProperty(item)) {
                                if (slot === '2h' && !rules['Show Best in Slot 1H and 2H']) {
                                    highestOverallLocal[skill.replaceAll(' ', '_') + '-weapon'] = item;
                                    highestOverallLocal[skill.replaceAll(' ', '_') + '-shield'] = 'N/A';
                                } else {
                                    highestOverallLocal[skill.replaceAll(' ', '_') + '-' + slot] = item;
                                }
                            }
                        } else if (!completedOnly) {
                            globalValids['BiS']['Obtain' + article + '~|' + formatEquip(item) + '|~'] = skill + ' BiS ' + slot;
                        }
                    }
                    if (!chunkInfo['challenges']['BiS']) {
                        chunkInfo['challenges']['BiS'] = {};
                    }
                    if (!!chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + formatEquip(item) + '|~'] && notFresh['Obtain' + article + '~|' + formatEquip(item) + '|~']) {
                        chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + formatEquip(item) + '|~'] = {
                            'ItemsDetails': [item],
                            'Label': `<span class='noscroll ${skill}-bis-highlight'>` + skill + '</span>/​' + chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + formatEquip(item) + '|~']['Label']
                        }
                    } else {
                        chunkInfo['challenges']['BiS']['Obtain' + article + '~|' + formatEquip(item) + '|~'] = {
                            'ItemsDetails': [item],
                            'Label': `<span class='noscroll ${skill}-bis-highlight'>` + skill + '</span> BiS ' + slot
                        }
                        notFresh['Obtain' + article + '~|' + formatEquip(item) + '|~'] = true;
                    }
                }
            });
        });
        !!bestEquipment && Object.keys(bestEquipment).forEach((slot) => {
            !!bestEquipmentAlts && bestEquipmentAlts.hasOwnProperty(slot) && Object.keys(bestEquipmentAlts[slot]).filter(itTemp => bestEquipmentAlts[slot][itTemp] === bestEquipment[slot]).forEach((itTemp) => {
                if (!bestEquipmentAltsGlobal.hasOwnProperty(skill + ' BiS ' + slot)) {
                    bestEquipmentAltsGlobal[skill + ' BiS ' + slot] = [];
                }
                bestEquipmentAltsGlobal[skill + ' BiS ' + slot].push(itTemp);
            });
            if (bestEquipmentAltsGlobal.hasOwnProperty(skill + ' BiS ' + slot)) {
                bestEquipmentAltsGlobal[skill + ' BiS ' + slot].unshift(bestEquipment[slot]);
            }
        });
        //console.log(bestEquipment);
    });
    return highestOverallLocal;
}

// Calcs the current challenges to be displayed
let calcCurrentChallenges2 = function() {
    let tempChallengeArr = {};
    let highestChallenge = {};
    let highestChallengeLevelArr = {};
    let realLevel = {};

    Object.keys(globalValids).forEach((skill) => {
        realLevel[skill] = [];
        if (skill !== 'Extra' && skill !== 'Quest' && skill !== 'Diary' && skill !== 'BiS') {
            highestChallengeLevelArr[skill] = 0;
            !!completedChallenges[skill] && Object.keys(completedChallenges[skill]).forEach((name) => {
                if (chunkInfo['challenges'][skill].hasOwnProperty(name)) {
                    let bestBoost = calcBoost(skill, name);

                    if(chunkInfo['challenges'][skill][name]['Level'] - bestBoost > highestChallengeLevelArr[skill]) {
                        highestChallengeLevelArr[skill] = chunkInfo['challenges'][skill][name]['Level'] - bestBoost;
                        highestOverall[skill] = name + (bestBoost > 0 ? `{${(bestBoost)}}` : "");
                    }
                }
            });
            let isPrimary = true || checkPrimaryMethod(skill, globalValids, baseChunkData);
            Object.keys(globalValids[skill]).forEach((challenge) => {
                realLevel[skill][challenge] = chunkInfo['challenges'][skill][challenge]['Level'] - calcBoost(skill, challenge);

                if (isPrimary || (manualTasks.hasOwnProperty(skill) && manualTasks[skill].hasOwnProperty(challenge)) || (userTasks.hasOwnProperty(skill) && userTasks[skill].hasOwnProperty(challenge))) {
                    if (globalValids[skill][challenge] !== false && (realLevel[skill][challenge] > highestChallengeLevelArr[skill]) && !chunkInfo['challenges'][skill][challenge]['NeverShow'] && (!completedChallenges[skill] || (!completedChallenges[skill].hasOwnProperty(challenge) && !completedChallenges[skill][challenge.replaceAll('#', '/')]))) {
                        if ((!highestChallenge[skill] || (realLevel[skill][challenge] > realLevel[skill][highestChallenge[skill]])) || ((!highestChallenge[skill] || (realLevel[skill][challenge] === realLevel[skill][highestChallenge[skill]])) && (!highestChallenge[skill] || !chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'] || (!!chunkInfo['challenges'][skill][challenge]['Priority'] && chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'])))) {
                            if (!challengeIsBacklogged(skill, challenge)) {
                                if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                                    let tempValid = true;
                                    Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).some(subSkill => (!checkPrimaryMethod(subSkill, globalValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] < chunkInfo['challenges'][skill][challenge]['Skills'][subSkill]) && (subSkill !== 'Slayer' || !slayerLocked || chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level'])) || (!!maxSkill && maxSkill.hasOwnProperty(subSkill) && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > maxSkill[subSkill])) && (tempValid = false);
                                    if (tempValid) {
                                        highestChallenge[skill] = challenge;
                                    }
                                } else {
                                    highestChallenge[skill] = challenge;
                                }
                            } else if (tempAlwaysGlobal.hasOwnProperty(skill) && tempAlwaysGlobal[skill].hasOwnProperty(challenge)) {
                                Object.keys(tempAlwaysGlobal[skill][challenge]).filter(tempChallenge => !challengeIsBacklogged(skill, tempChallenge)).sort((a, b) => { return a['Level'] - b['Level'] }).forEach((tempChallenge) => {
                                    if (!!chunkInfo['challenges'][skill][tempChallenge]['Skills']) {
                                        let tempValid = true;
                                        Object.keys(chunkInfo['challenges'][skill][tempChallenge]['Skills']).some(subSkill => (!checkPrimaryMethod(subSkill, globalValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] < chunkInfo['challenges'][skill][tempChallenge]['Skills'][subSkill]) && (subSkill !== 'Slayer' || !slayerLocked || chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level'])) || (!!maxSkill && maxSkill.hasOwnProperty(subSkill) && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > maxSkill[subSkill])) && (tempValid = false);
                                        if (tempValid) {
                                            highestChallenge[skill] = tempChallenge;
                                        }
                                    } else {
                                        highestChallenge[skill] = tempChallenge;
                                    }
                                });
                            }
                        } else if ((!highestChallenge[skill] || (realLevel[skill][challenge] === realLevel[skill][highestChallenge[skill]])) && (!highestChallenge[skill] || !chunkInfo['challenges'][skill][challenge].hasOwnProperty('Priority') || !chunkInfo['challenges'][skill][highestChallenge[skill]].hasOwnProperty('Priority') || (chunkInfo['challenges'][skill][challenge]['Priority'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Priority'])) && chunkInfo['challenges'][skill][challenge]['Primary']) {
                            if (!challengeIsBacklogged(skill, challenge)) {
                                if (!!chunkInfo['challenges'][skill][challenge]['Skills']) {
                                    let tempValid = true;
                                    Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).some(subSkill => (!checkPrimaryMethod(subSkill, globalValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] < chunkInfo['challenges'][skill][challenge]['Skills'][subSkill]) && (subSkill !== 'Slayer' || !slayerLocked || chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level'])) || (!!maxSkill && maxSkill.hasOwnProperty(subSkill) && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > maxSkill[subSkill])) && (tempValid = false);
                                    if (tempValid) {
                                        highestChallenge[skill] = challenge;
                                    }
                                } else {
                                    highestChallenge[skill] = challenge;
                                }
                            } else if (tempAlwaysGlobal.hasOwnProperty(skill) && tempAlwaysGlobal[skill].hasOwnProperty(challenge)) {
                                Object.keys(tempAlwaysGlobal[skill][challenge]).filter(tempChallenge => !challengeIsBacklogged(skill, tempChallenge)).sort((a, b) => { return a['Level'] - b['Level'] }).forEach((tempChallenge) => {
                                    if (!!chunkInfo['challenges'][skill][tempChallenge]['Skills']) {
                                        let tempValid = true;
                                        Object.keys(chunkInfo['challenges'][skill][tempChallenge]['Skills']).some(subSkill => (!checkPrimaryMethod(subSkill, globalValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] < chunkInfo['challenges'][skill][tempChallenge]['Skills'][subSkill]) && (subSkill !== 'Slayer' || !slayerLocked || chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > slayerLocked['level'])) || (!!maxSkill && maxSkill.hasOwnProperty(subSkill) && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > maxSkill[subSkill])) && (tempValid = false);
                                        if (tempValid) {
                                            highestChallenge[skill] = tempChallenge;
                                        }
                                    } else {
                                        highestChallenge[skill] = tempChallenge;
                                    }
                                });
                            }
                        }
                    }
                }
            });
            (!highestChallenge[skill] || !chunkInfo['challenges'][skill][highestChallenge[skill]] || (realLevel[skill][highestChallenge[skill]] <= 1 && !chunkInfo['challenges'][skill][highestChallenge[skill]]['Primary'])) && (highestChallenge[skill] = undefined);
            tempChallengeArr[skill] = highestChallenge[skill];
            highestCurrent[skill] = highestChallenge[skill];
            if (!!highestChallenge[skill] && !!chunkInfo['challenges'][skill][highestChallenge[skill]] && !!chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills']) {
                Object.keys(chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills']).forEach((subSkill) => {
                    if ((!highestChallenge[subSkill] || chunkInfo['challenges'][subSkill][highestChallenge[subSkill]]['Level'] < chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills'][subSkill]) && !isEmpty((chunkInfo['challenges'][subSkill])) && chunkInfo['challenges'][skill][highestChallenge[skill]]['Skills'][subSkill] > highestChallengeLevelArr[subSkill]) {
                        highestChallenge[subSkill] = highestChallenge[skill];
                        tempChallengeArr[subSkill] = highestChallenge[subSkill];
                        highestCurrent[subSkill] = highestChallenge[subSkill];
                    }
                });
            }
        } else {
            Object.keys(globalValids[skill]).filter(challenge => !!chunkInfo['challenges'][skill][challenge]['Skills']).forEach((challenge) => {
                let tempValid = true;
                Object.keys(chunkInfo['challenges'][skill][challenge]['Skills']).some(subSkill => {
                    let [bestBoost, ownsCrystalSaw] = [0, false];
                    if (!!challenge && (!completedChallenges[subSkill] || (!completedChallenges[subSkill].hasOwnProperty(challenge) && !completedChallenges[subSkill][challenge.replaceAll('#', '/')]))) {
                        [bestBoost, ownsCrystalSaw] = calcBoost(subSkill, challenge, true, skill);
                        if(ownsCrystalSaw)
                            chunkInfo['challenges'][subSkill][challenge]['ItemsDetails'].push('Crystal saw');
                    }

                    if ((!checkPrimaryMethod(subSkill, globalValids, baseChunkData) && (!passiveSkill || !passiveSkill.hasOwnProperty(subSkill) || passiveSkill[subSkill] < (chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] - bestBoost))) || (subSkill === 'Slayer' && !!slayerLocked && (chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] - bestBoost) > slayerLocked['level']) || (!!maxSkill && maxSkill.hasOwnProperty(subSkill) && chunkInfo['challenges'][skill][challenge]['Skills'][subSkill] > maxSkill[subSkill])) {
                        tempValid = false;
                        return true;
                    }
                });
                if (!tempValid) {
                    delete globalValids[skill][challenge];
                }
            });
        }
    });
    Object.keys(tempChallengeArr).forEach((skill) => {
        let challenge = tempChallengeArr[skill] || highestOverall[skill];
        !!challenge && (challenge = challenge.split('{')[0]);
        if (!!challenge && (!completedChallenges[skill] || (!completedChallenges[skill].hasOwnProperty(challenge) && !completedChallenges[skill][challenge.replaceAll('#', '/')]))) {
            let [bestBoost, bestBoostSource, ownsCrystalSaw] = calcBoost(skill, challenge, true);

            if(ownsCrystalSaw)
                chunkInfo['challenges'][skill][challenge]['ItemsDetails'].push('Crystal saw');
            
            if (bestBoost > 0) {
                let foundBetter = false;
                Object.keys(globalValids[skill]).some(name => {
                    if (chunkInfo['challenges'][skill].hasOwnProperty(name) && chunkInfo['challenges'][skill][name].hasOwnProperty('NoBoost') && chunkInfo['challenges'][skill][name]['Level'] > (globalValids[skill][challenge] - bestBoost) && !challengeIsBacklogged(skill, name)) {
                        tempChallengeArr[skill] = name;
                        foundBetter = true;
                        return true;
                    }
                });
                if (!foundBetter) {
                    if (highestOverall[skill] !== challenge) {
                        if (!chunkInfo['challenges'][skill][challenge].hasOwnProperty((bestBoostSource.includes('~') ? (bestBoostSource.split('~')[1].charAt(0).toUpperCase() + bestBoostSource.split('~')[1].slice(1)) : 'Items') + 'Details')) {
                            chunkInfo['challenges'][skill][challenge][(bestBoostSource.includes('~') ? (bestBoostSource.split('~')[1].charAt(0).toUpperCase() + bestBoostSource.split('~')[1].slice(1)) : 'Items') + 'Details'] = [];
                        }
                        chunkInfo['challenges'][skill][challenge][(bestBoostSource.includes('~') ? (bestBoostSource.split('~')[1].charAt(0).toUpperCase() + bestBoostSource.split('~')[1].slice(1)) : 'Items') + 'Details'].push(bestBoostSource.replaceAll(/\*/g, ''));
                        tempChallengeArr[skill] = challenge + `{${(bestBoost)}}`;
                    }
                    highestOverall[skill] = challenge + `{${(bestBoost)}}`;
                } else if (!!tempChallengeArr[skill]) {
                    highestOverall[skill] = tempChallengeArr[skill];
                    if (!!completedChallenges[skill] && (completedChallenges[skill].hasOwnProperty(tempChallengeArr[skill]) || completedChallenges[skill][tempChallengeArr[skill].replaceAll('#', '/')])) {
                        tempChallengeArr[skill] = null;
                    }
                }
            } else if (!!tempChallengeArr[skill]) {
                highestOverall[skill] = tempChallengeArr[skill];
            }
        } else if (!!tempChallengeArr[skill]) {
            highestOverall[skill] = tempChallengeArr[skill];
        }
    });
    let didAddTasks = false;
    rules['Multi Step Processing'] && !!highestOverall && Object.keys(highestOverall).filter(skill => skillNames.includes(skill) && (!!chunkInfo['challenges'][skill] && chunkInfo['challenges'][skill].hasOwnProperty(highestOverall[skill]) && chunkInfo['challenges'][skill][highestOverall[skill]].hasOwnProperty('Items'))).forEach((skill) => {
        chunkInfo['challenges'][skill][highestOverall[skill]]['Items'].filter(item => multiTasks.hasOwnProperty(item) && (!baseChunkData['items'].hasOwnProperty(item) || isEmpty(baseChunkData['items'][item]))).forEach((item) => {
            Object.keys(multiTasks[item]).forEach((subSkill) => {
                Object.keys(multiTasks[item][subSkill]).forEach((subTask) => {
                    baseChunkData['items'][item] = {};
                    baseChunkData['items'][item][subTask] = 'multi-' + subSkill;
                    if (!globalValids[subSkill]) {
                        globalValids[subSkill] = {};
                    }
                    globalValids[subSkill][subTask] = chunkInfo['challenges'][subSkill][subTask].hasOwnProperty('Level') ? chunkInfo['challenges'][subSkill][subTask]['Level'] : true;
                    didAddTasks = true;
                });
            });
        });
    });
    if (didAddTasks) {
        return calcCurrentChallenges2();
    }
    !!outputTasks && Object.keys(outputTasks).forEach((skill) => {
        !!outputTasks[skill] && Object.keys(outputTasks[skill]).filter(challenge => { return chunkInfo['challenges'].hasOwnProperty(skill) && chunkInfo['challenges'][skill].hasOwnProperty(challenge) && chunkInfo['challenges'][skill][challenge].hasOwnProperty('Level') && !!highestOverall[skill] && chunkInfo['challenges'][skill].hasOwnProperty(highestOverall[skill].split('{')[0]) && chunkInfo['challenges'][skill][highestOverall[skill].split('{')[0]].hasOwnProperty('Level') && chunkInfo['challenges'][skill][challenge]['Level'] <= chunkInfo['challenges'][skill][highestOverall[skill].split('{')[0]]['Level'] }).forEach((challenge) => {
            let stillValid = true;
            chunkInfo['challenges'][skill][challenge]['Tasks'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Tasks']).some(subTask => !globalValids.hasOwnProperty(chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]) || !globalValids[chunkInfo['challenges'][skill][challenge]['Tasks'][subTask]].hasOwnProperty(subTask)) && (stillValid = false);
            chunkInfo['challenges'][skill][challenge]['Items'] && Object.keys(chunkInfo['challenges'][skill][challenge]['Items']).some(item => !baseChunkData['items'][item.replaceAll(/\*/g, '')]) && (stillValid = false);
            if (stillValid) {
                if (!globalValids.hasOwnProperty(skill)) {
                    globalValids[skill] = {};
                }
                globalValids[skill][challenge] = chunkInfo['challenges'][skill][challenge]['Level'];
            }
        });
    });
    return tempChallengeArr;
}

// Finds gcd
let gcd = function(a, b) {
    if (b < 0.0000001) return a;

    return gcd(b, Math.floor(a % b));
}

// Finds even fraction
let findFraction = function(fraction, isRoundedDenominator) {
    if (isNaN(fraction)) {
        return fraction;
    } else {
        let len = fraction.toString().length - 2;

        let denominator = Math.pow(10, len);
        let numerator = fraction * denominator;

        let divisor = gcd(numerator, denominator);

        numerator /= divisor;
        denominator /= divisor;
        if (isRoundedDenominator) {
            return 1 + '/' + (+(Math.floor(Math.round((denominator/numerator) + "e+2")  + "e-2"))).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        } else {
            return 1 + '/' + (+(Math.round((denominator/numerator) + "e+2")  + "e-2")).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    }
}

// Finds all connected sub-chunk sections based on inputted manual sections
let findConnectedSections = function(chunksIn, sections) {
    let added = true;

    while(added === true)
    {
        added = false;

        for(let chunk in chunksIn) {
            let chunkSections = chunkInfo['sections']?.[chunk];
            if(!chunkSections)
                continue;

            Object.entries(chunkSections).filter(([sec, connections]) => sec !== "0" && (!sections?.[chunk]?.[sec])).forEach(([sec, connections]) => {
                if (sections?.[chunk]?.[sec] === false) {
                    delete sections[chunk][sec];
                } else if (manualSections?.[chunk]?.[sec] !== false) {
                    if (optOutSections
                        || (connections.some((connection) => (connection.includes('-') ? sections?.[connection.split('-')[0]]?.[connection.split('-')[1]] : chunksIn.hasOwnProperty(connection))))
                        || (chunkInfo['chunks']?.[chunk]?.['Sections']?.[sec]?.['Connect'] && Object.keys(chunkInfo['chunks'][chunk]['Sections'][sec]['Connect']).some((subChunk) => chunkInfo['chunks']?.[subChunk]?.['Name'] && chunksIn.hasOwnProperty(chunkInfo['chunks'][subChunk]['Name']) && chunksIn[chunkInfo['chunks'][subChunk]['Name']] !== false && chunkInfo['chunks'][subChunk]['Name'] !== 'Zanaris' && chunkInfo['chunks'][subChunk]['Name'] !== 'Puro-Puro'))) {
                        (sections[chunk] ??= {})[sec] = true;
                        added = true;
                    }
                }
            });
        }
    }

    return sections;
}

// Gathers item/object info on all chunk ids passed in
let gatherChunksInfo = function(chunksIn) {
    let items = {};
    let objects = {};
    let monsters = {};
    let npcs = {};
    let shops = {};

    !!randomLoot && Object.keys(randomLoot).forEach((item) => {
        if (!items[item]) {
            items[item] = {};
        }
        items[item]['Random Event Loot'] = 'secondary-drop';
    });

    !!manualEquipment && Object.keys(manualEquipment).forEach((item) => {
        if (!items[item]) {
            items[item] = {};
        }
        items[item]['Manually Added Equipment'] = 'secondary-drop';
    });

    let manualSectionsModified = {};
    !!manualSections && Object.keys(manualSections).forEach((chunk) => {
        if (!!chunks && chunks.hasOwnProperty(chunk)) {
            manualSectionsModified[chunk] = manualSections[chunk];
        }
    });
    unlockedSections = combineJSONs(unlockedSections, manualSectionsModified);
    unlockedSections = combineJSONs(unlockedSections, findConnectedSections(chunks, unlockedSections));

    Object.keys(chunksIn).forEach((num) => {
        !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Sections'] && Object.keys(chunkInfo['chunks'][num]['Sections']).filter(section => !!unlockedSections[num] && unlockedSections[num][section]).forEach((section) => {
            if (rules['Puro-Puro'] || num !== 'Puro-Puro') {
                !!chunkInfo['chunks'][num]['Sections'][section] && !!chunkInfo['chunks'][num]['Sections'][section]['Monster'] && Object.keys(chunkInfo['chunks'][num]['Sections'][section]['Monster']).forEach((monster) => {
                    !rules['Skiller'] && !!chunkInfo['drops'][monster] && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) && Object.keys(chunkInfo['drops'][monster]).forEach((drop) => {
                        !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach((quantity) => {
                            if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT']) && drop !== 'GemDropTableLegends+') {
                                Object.keys(dropTables[drop]).forEach((item) => {
                                    if ((drop === 'RareDropTable+' || drop === 'GemDropTable+') && item === 'Chaos talisman') {
                                        return;
                                    }
                                    if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                        if (!items[item]) {
                                            items[item] = {};
                                        }
                                        if ((chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always') || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && (isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', '')) || isNaN(dropTables[drop][item].split('@')[0].replaceAll('/', '').replaceAll('@', '')))) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                                            items[item][monster] = 'primary-drop';
                                        } else {
                                            items[item][monster] = 'secondary-drop';
                                        }
                                        if (!dropRatesGlobal[monster]) {
                                            dropRatesGlobal[monster] = {};
                                        }
                                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                        if (!dropTablesGlobal[monster]) {
                                            dropTablesGlobal[monster] = {};
                                        }
                                        if (!dropTablesGlobal[monster][item]) {
                                            dropTablesGlobal[monster][item] = {};
                                        }
                                        let calcedQuantity;
                                        if (dropTables[drop][item].split('@')[1].includes(' (noted)')) {
                                            if (dropTables[drop][item].split('@')[1].includes(' (F2P)')) {
                                                calcedQuantity = dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted) (F2P)';
                                            } else {
                                                calcedQuantity = dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)';
                                            }
                                        } else {
                                            (dropTables[drop][item].split('@')[1].includes('-') ? dropTables[drop][item].split('@')[1] : dropTables[drop][item].split('@')[1] * quantity)
                                            if (dropTables[drop][item].split('@')[1].includes(' (F2P)')) {
                                                calcedQuantity = dropTables[drop][item].split('@')[1].split(' (F2P)')[0].includes('-') ? dropTables[drop][item].split('@')[1].split(' (F2P)')[0] : dropTables[drop][item].split('@')[1].split(' (F2P)')[0] * quantity + ' (F2P)';
                                            } else {
                                                calcedQuantity = dropTables[drop][item].split('@')[1].includes('-') ? dropTables[drop][item].split('@')[1] : dropTables[drop][item].split('@')[1] * quantity;
                                            }
                                        }
                                        dropTablesGlobal[monster][item][calcedQuantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    }
                                });
                            } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                                if (!items[drop]) {
                                    items[drop] = {};
                                }
                                if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    items[drop][monster] = 'primary-drop';
                                } else {
                                    items[drop][monster] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][drop]) {
                                    dropTablesGlobal[monster][drop] = {};
                                }
                                dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            }
                            if (!!dropTables[drop] && ((drop === 'RareDropTable+' || drop === 'GemDropTable+'|| drop === 'GemDropTableLegends+') && rules['RDT'])) {
                                if (!items[drop]) {
                                    items[drop] = {};
                                }
                                if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    items[drop][monster] = 'primary-drop';
                                } else {
                                    items[drop][monster] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][drop]) {
                                    dropTablesGlobal[monster][drop] = {};
                                }
                                dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            } 
                        });
                    });
                });

                !!manualMonsters && !!manualMonsters['Monsters'] && Object.keys(manualMonsters['Monsters']).forEach((monster) => {
                    !rules['Skiller'] && !!chunkInfo['drops'][monster] && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) && Object.keys(chunkInfo['drops'][monster]).forEach((drop) => {
                        !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach((quantity) => {
                            if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                                Object.keys(dropTables[drop]).forEach((item) => {
                                    if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                        (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                        if (!items[item]) {
                                            items[item] = {};
                                        }
                                        if ((chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always') || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && (isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', '')) || isNaN(dropTables[drop][item].split('@')[0].replaceAll('/', '').replaceAll('@', '')))) || (((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'))) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))) {
                                            items[item][monster] = 'primary-drop';
                                        } else {
                                            items[item][monster] = 'secondary-drop';
                                        }
                                        if (!dropRatesGlobal[monster]) {
                                            dropRatesGlobal[monster] = {};
                                        }
                                        dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                        if (!dropTablesGlobal[monster]) {
                                            dropTablesGlobal[monster] = {};
                                        }
                                        if (!dropTablesGlobal[monster][item]) {
                                            dropTablesGlobal[monster][item] = {};
                                        }
                                        let calcedQuantity;
                                        if (dropTables[drop][item].split('@')[1].includes(' (noted)')) {
                                            if (dropTables[drop][item].split('@')[1].includes(' (F2P)')) {
                                                calcedQuantity = dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted) (F2P)';
                                            } else {
                                                calcedQuantity = dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)';
                                            }
                                        } else {
                                            if (dropTables[drop][item].split('@')[1].includes(' (F2P)')) {
                                                calcedQuantity = dropTables[drop][item].split('@')[1].split(' (F2P)')[0] * quantity + ' (F2P)';
                                            } else {
                                                calcedQuantity = dropTables[drop][item].split('@')[1] * quantity;
                                            }
                                        }
                                        dropTablesGlobal[monster][item][calcedQuantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    }
                                });
                            } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                                if (!items[drop]) {
                                    items[drop] = {};
                                }
                                if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                    items[drop][monster] = 'primary-drop';
                                } else {
                                    items[drop][monster] = 'secondary-drop';
                                }
                                if (!dropRatesGlobal[monster]) {
                                    dropRatesGlobal[monster] = {};
                                }
                                dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                                if (!dropTablesGlobal[monster]) {
                                    dropTablesGlobal[monster] = {};
                                }
                                if (!dropTablesGlobal[monster][drop]) {
                                    dropTablesGlobal[monster][drop] = {};
                                }
                                dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            }
                        });
                    });
                });

                for(let shop in chunkInfo['chunks'][num]['Sections']?.[section]?.['Shop']) {
                    !!chunkInfo['shopItems'][shop] && (!backloggedSources['shops'] || !backloggedSources['shops'][shop]) && Object.keys(chunkInfo['shopItems'][shop]).forEach((item) => {
                        if ((!minigameShops[shop] || rules['Minigame']) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                            if (!items[item]) {
                                items[item] = {};
                            }
                            items[item][shop] = 'shop';
                        }
                    });
                };

                for(let spawn in chunkInfo['chunks'][num]['Sections']?.[section]?.['Spawn']) {
                    if (!backloggedSources['items'] || !backloggedSources['items'][spawn]) {
                        (items[spawn] ??= {})[num + '-' + section] = rules['Primary Spawns'] ? 'primary-spawn' : 'secondary-spawn';
                    }
                };

                for(let object in chunkInfo['chunks'][num]['Sections']?.[section]?.['Object']) {
                    if (!backloggedSources['objects'] || !backloggedSources['objects'][object]) {
                        if (!objects[object]) {
                            objects[object] = {};
                        }
                        objects[object][num + '-' + section] = true;
                    }
                };

                for(let monster in chunkInfo['chunks'][num]['Sections']?.[section]?.['Monster']) {
                    if (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) {
                        if (!monsters[monster]) {
                            monsters[monster] = {};
                        }
                        monsters[monster][num + '-' + section] = true;
                    }
                };

                for(let npc in chunkInfo['chunks'][num]['Sections']?.[section]?.['NPC']) {
                    if (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc]) {
                        if (!npcs[npc]) {
                            npcs[npc] = {};
                        }
                        npcs[npc][num + '-' + section] = true;
                    }
                };

                for(let shop in chunkInfo['chunks'][num]['Sections']?.[section]?.['Shop']) {
                    if (!backloggedSources['shops'] || !backloggedSources['shops'][shop]) {
                        if (!shops[shop]) {
                            shops[shop] = {};
                        }
                        shops[shop][num + '-' + section] = true;
                    }
                };
            }
        });
        if (rules['Puro-Puro'] || num !== 'Puro-Puro') {
            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Monster'] && Object.keys(chunkInfo['chunks'][num]['Monster']).forEach((monster) => {
                !rules['Skiller'] && !!chunkInfo['drops'][monster] && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) && Object.keys(chunkInfo['drops'][monster]).forEach((drop) => {
                    !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach((quantity) => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT']) && drop !== 'GemDropTableLegends+') {
                            Object.keys(dropTables[drop]).forEach((item) => {
                                if ((drop === 'RareDropTable+' || drop === 'GemDropTable+') && item === 'Chaos talisman') {
                                    (chunkInfo['codeItems']['forceTalisman']['Chaos talisman'].hasOwnProperty(monster) && chunkInfo['codeItems']['forceTalisman']['Chaos talisman'][monster].hasOwnProperty(num))
                                }
                                if ((drop === 'RareDropTable+' || drop === 'GemDropTable+') && ((item === 'Nature talisman' && ((!chunkInfo['chunks'][num].hasOwnProperty('Nickname') && (!chunkInfo['codeItems']['forceTalisman']['Nature talisman'].hasOwnProperty(monster) || !chunkInfo['codeItems']['forceTalisman']['Nature talisman'][monster].hasOwnProperty(num))) || (chunkInfo['codeItems']['forceTalisman']['Chaos talisman'].hasOwnProperty(monster) && chunkInfo['codeItems']['forceTalisman']['Chaos talisman'][monster].hasOwnProperty(num)))) || (item === 'Chaos talisman' && ((chunkInfo['chunks'][num].hasOwnProperty('Nickname') && (!chunkInfo['codeItems']['forceTalisman']['Chaos talisman'].hasOwnProperty(monster) || !chunkInfo['codeItems']['forceTalisman']['Chaos talisman'][monster].hasOwnProperty(num))) || (chunkInfo['codeItems']['forceTalisman']['Nature talisman'].hasOwnProperty(monster) && chunkInfo['codeItems']['forceTalisman']['Nature talisman'][monster].hasOwnProperty(num)))))) {
                                    return;
                                }
                                if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                    if (!items[item]) {
                                        items[item] = {};
                                    }
                                    if ((chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always') || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && (isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', '')) || isNaN(dropTables[drop][item].split('@')[0].replaceAll('/', '').replaceAll('@', '')))) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')) >= parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1]))) {
                                        items[item][monster] = 'primary-drop';
                                    } else {
                                        items[item][monster] = 'secondary-drop';
                                    }
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    if (!dropTablesGlobal[monster]) {
                                        dropTablesGlobal[monster] = {};
                                    }
                                    if (!dropTablesGlobal[monster][item]) {
                                        dropTablesGlobal[monster][item] = {};
                                    }
                                    let calcedQuantity;
                                    if (dropTables[drop][item].split('@')[1].includes(' (noted)')) {
                                        if (dropTables[drop][item].split('@')[1].includes(' (F2P)')) {
                                            calcedQuantity = dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted) (F2P)';
                                        } else {
                                            calcedQuantity = dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)';
                                        }
                                    } else {
                                        (dropTables[drop][item].split('@')[1].includes('-') ? dropTables[drop][item].split('@')[1] : dropTables[drop][item].split('@')[1] * quantity)
                                        if (dropTables[drop][item].split('@')[1].includes(' (F2P)')) {
                                            calcedQuantity = dropTables[drop][item].split('@')[1].split(' (F2P)')[0].includes('-') ? dropTables[drop][item].split('@')[1].split(' (F2P)')[0] : dropTables[drop][item].split('@')[1].split(' (F2P)')[0] * quantity + ' (F2P)';
                                        } else {
                                            calcedQuantity = dropTables[drop][item].split('@')[1].includes('-') ? dropTables[drop][item].split('@')[1] : dropTables[drop][item].split('@')[1] * quantity;
                                        }
                                    }
                                    dropTablesGlobal[monster][item][calcedQuantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                }
                            });
                        } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                            if (!items[drop]) {
                                items[drop] = {};
                            }
                            if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                items[drop][monster] = 'primary-drop';
                            } else {
                                items[drop][monster] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                        }
                        if (!!dropTables[drop] && ((drop === 'RareDropTable+' || drop === 'GemDropTable+'|| drop === 'GemDropTableLegends+') && rules['RDT'])) {
                            if (!items[drop]) {
                                items[drop] = {};
                            }
                            if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                items[drop][monster] = 'primary-drop';
                            } else {
                                items[drop][monster] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                        } 
                    });
                });
            });

            !!manualMonsters && !!manualMonsters['Monsters'] && Object.keys(manualMonsters['Monsters']).forEach((monster) => {
                !rules['Skiller'] && !!chunkInfo['drops'][monster] && (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) && Object.keys(chunkInfo['drops'][monster]).forEach((drop) => {
                    !!chunkInfo['drops'][monster][drop] && Object.keys(chunkInfo['drops'][monster][drop]).forEach((quantity) => {
                        if (!!dropTables[drop] && ((drop !== 'RareDropTable+' && drop !== 'GemDropTable+') || rules['RDT'])) {
                            Object.keys(dropTables[drop]).forEach((item) => {
                                if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || ((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1]) * parseFloat(dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(dropTables[drop][item].split('@')[0].split('/')[1]))) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                    (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                                    if (!items[item]) {
                                        items[item] = {};
                                    }
                                    if ((chunkInfo['drops'][monster][drop][quantity] === 'Always' && dropTables[drop][item].split('@')[0] === 'Always') || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && (isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', '')) || isNaN(dropTables[drop][item].split('@')[0].replaceAll('/', '').replaceAll('@', '')))) || (((parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'))) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))) {
                                        items[item][monster] = 'primary-drop';
                                    } else {
                                        items[item][monster] = 'secondary-drop';
                                    }
                                    if (!dropRatesGlobal[monster]) {
                                        dropRatesGlobal[monster] = {};
                                    }
                                    dropRatesGlobal[monster][item] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                    if (!dropTablesGlobal[monster]) {
                                        dropTablesGlobal[monster] = {};
                                    }
                                    if (!dropTablesGlobal[monster][item]) {
                                        dropTablesGlobal[monster][item] = {};
                                    }
                                    let calcedQuantity;
                                    if (dropTables[drop][item].split('@')[1].includes(' (noted)')) {
                                        if (dropTables[drop][item].split('@')[1].includes(' (F2P)')) {
                                            calcedQuantity = dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted) (F2P)';
                                        } else {
                                            calcedQuantity = dropTables[drop][item].split('@')[1].split(' (noted)')[0] * quantity + ' (noted)';
                                        }
                                    } else {
                                        if (dropTables[drop][item].split('@')[1].includes(' (F2P)')) {
                                            calcedQuantity = dropTables[drop][item].split('@')[1].split(' (F2P)')[0] * quantity + ' (F2P)';
                                        } else {
                                            calcedQuantity = dropTables[drop][item].split('@')[1] * quantity;
                                        }
                                    }
                                    dropTablesGlobal[monster][item][calcedQuantity] = findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '') * dropTables[drop][item].split('@')[0].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1] * dropTables[drop][item].split('@')[0].split('/')[1].replaceAll('~', '')), drop.includes('GeneralSeedDropTable'));
                                }
                            });
                        } else if ((rules['Rare Drop'] || isNaN(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) || (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1])) > (parseFloat(rareDropNum.split('/')[0].replaceAll('~', '')) / parseFloat(rareDropNum.split('/')[1]))) &&
                                (rules['Boss'] || !bossMonsters.hasOwnProperty(monster)) && (!backloggedSources['items'] || !backloggedSources['items'][drop])) {
                            if (!items[drop]) {
                                items[drop] = {};
                            }
                            if (chunkInfo['drops'][monster][drop][quantity] === 'Always' || (parseInt(secondaryPrimaryNum.split('/')[1]) > 50 && isNaN(chunkInfo['drops'][monster][drop][quantity].replaceAll('/', '').replaceAll('@', ''))) || ((chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1 && (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])) < 1) || (!(chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) && (parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')) >= (parseFloat(secondaryPrimaryNum.split('/')[0].replaceAll('~', '')) / parseFloat(secondaryPrimaryNum.split('/')[1])))))) {
                                items[drop][monster] = 'primary-drop';
                            } else {
                                items[drop][monster] = 'secondary-drop';
                            }
                            if (!dropRatesGlobal[monster]) {
                                dropRatesGlobal[monster] = {};
                            }
                            dropRatesGlobal[monster][drop] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                            if (!dropTablesGlobal[monster]) {
                                dropTablesGlobal[monster] = {};
                            }
                            if (!dropTablesGlobal[monster][drop]) {
                                dropTablesGlobal[monster][drop] = {};
                            }
                            dropTablesGlobal[monster][drop][quantity] = (chunkInfo['drops'][monster][drop][quantity].split('/').length <= 1) ? chunkInfo['drops'][monster][drop][quantity] : findFraction(parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[0].replaceAll('~', '')) / parseFloat(chunkInfo['drops'][monster][drop][quantity].split('/')[1].replaceAll('~', '')));
                        }
                    });
                });
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Shop'] && Object.keys(chunkInfo['chunks'][num]['Shop']).forEach((shop) => {
                !!chunkInfo['shopItems'][shop] && (!backloggedSources['shops'] || !backloggedSources['shops'][shop]) && Object.keys(chunkInfo['shopItems'][shop]).forEach((item) => {
                    if ((!minigameShops[shop] || rules['Minigame']) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                        if (!items[item]) {
                            items[item] = {};
                        }
                        items[item][shop] = 'shop';
                    }
                });
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Spawn'] && Object.keys(chunkInfo['chunks'][num]['Spawn']).forEach((spawn) => {
                if (!backloggedSources['items'] || !backloggedSources['items'][spawn]) {
                    if (!items[spawn]) {
                        items[spawn] = {};
                    }
                    items[spawn][num] = rules['Primary Spawns'] ? 'primary-spawn' : 'secondary-spawn';
                }
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Object'] && Object.keys(chunkInfo['chunks'][num]['Object']).forEach((object) => {
                if (!backloggedSources['objects'] || !backloggedSources['objects'][object]) {
                    if (!objects[object]) {
                        objects[object] = {};
                    }
                    objects[object][num] = true;
                }
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Monster'] && Object.keys(chunkInfo['chunks'][num]['Monster']).forEach((monster) => {
                if (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) {
                    if (!monsters[monster]) {
                        monsters[monster] = {};
                    }
                    monsters[monster][num] = true;
                }
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['NPC'] && Object.keys(chunkInfo['chunks'][num]['NPC']).forEach((npc) => {
                if (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc]) {
                    if (!npcs[npc]) {
                        npcs[npc] = {};
                    }
                    npcs[npc][num] = true;
                }
            });

            !!chunkInfo['chunks'][num] && !!chunkInfo['chunks'][num]['Shop'] && Object.keys(chunkInfo['chunks'][num]['Shop']).forEach((shop) => {
                if (!backloggedSources['shops'] || !backloggedSources['shops'][shop]) {
                    if (!shops[shop]) {
                        shops[shop] = {};
                    }
                    shops[shop][num] = true;
                }
            });
        }
    });

    !!manualMonsters && !!manualMonsters['Items'] && Object.keys(manualMonsters['Items']).forEach((item) => {
        if (!backloggedSources['items'] || !backloggedSources['items'][item]) {
            if (!items[item]) {
                items[item] = {};
            }
            items[item]['Manually Added*'] = 'primary-Nonskill';
        }
    });

    !!manualMonsters && !!manualMonsters['Monsters'] && Object.keys(manualMonsters['Monsters']).forEach((monster) => {
        if (!backloggedSources['monsters'] || !backloggedSources['monsters'][monster]) {
            if (!monsters[monster]) {
                monsters[monster] = {};
            }
            monsters[monster]['Manually Added*'] = true;
        }
    });

    !!manualMonsters && !!manualMonsters['NPCs'] && Object.keys(manualMonsters['NPCs']).forEach((npc) => {
        if (!backloggedSources['npcs'] || !backloggedSources['npcs'][npc]) {
            if (!npcs[npc]) {
                npcs[npc] = {};
            }
            npcs[npc]['Manually Added*'] = true;
        }
    });

    !!manualMonsters && !!manualMonsters['Objects'] && Object.keys(manualMonsters['Objects']).forEach((object) => {
        if (!backloggedSources['objects'] || !backloggedSources['objects'][object]) {
            if (!objects[object]) {
                objects[object] = {};
            }
            objects[object]['Manually Added*'] = true;
        }
    });

    !!manualMonsters && !!manualMonsters['Shops'] && Object.keys(manualMonsters['Shops']).forEach((shop) => {
        if (!backloggedSources['shops'] || !backloggedSources['shops'][shop]) {
            if (!shops[shop]) {
                shops[shop] = {};
            }
            shops[shop]['Manually Added*'] = true;
            !!chunkInfo['shopItems'][shop] && Object.keys(chunkInfo['shopItems'][shop]).forEach((item) => {
                if ((!minigameShops[shop] || rules['Minigame']) && (!backloggedSources['items'] || !backloggedSources['items'][item])) {
                    if (!items[item]) {
                        items[item] = {};
                    }
                    items[item][shop] = 'shop';
                }
            });
        }
    });

    !intitalDataPosted && type === 'current' && postMessage(['initial-data', {items: items, objects: objects, monsters: monsters, npcs: npcs, shops: shops}]);
    intitalDataPosted = true;
    return {items: items, objects: objects, monsters: monsters, npcs: npcs, shops: shops};
}

// Gets all possible chunk areas
let getAllChunkAreas = function(chunks) {
    let tempPossibleAreas = {};
    let tempAreaStructure = {};
    let tempChunks = JSON.parse(JSON.stringify(chunks));

    for (let i = 0; i < Object.keys(tempChunks).length; ++i) {
        let chunkId = Object.keys(tempChunks)[i];
        let chunk = chunkInfo['chunks'][chunkId];

        // Get chunk ids for areas connected to chunk and its sections
        let tempIds = {...chunk?.['Connect']};
        for(let section in chunk?.['Sections']) {
            tempIds = {...tempIds, ...chunk['Sections'][section]?.['Connect']};
        }

        // Check each connected non-overworld chunk
        for(let id in tempIds) {
            let name = chunkInfo['chunks'][parseInt(id)]?.['Name'];
            if(!name)
                continue;

            if (typeof name === 'string') {
                tempChunks[name] = true;
                tempPossibleAreas[name] = possibleAreas[name] || false;

                // Store the areas this one is connected to
                if (!!tempChunks[chunkId]) {
                    (tempAreaStructure[name] ??= {})[chunkId] = true;
                }
            }

            // UNUSED?
            if (!tempChunks[name]) {
                if (!chunkInfo['challenges']?.['Nonskill'][name] || Object.keys(chunkInfo['challenges']['Nonskill'][name]).length <= 1) {
                    if (tempAreaStructure.hasOwnProperty(name) && Object.keys(tempAreaStructure[name]).filter(subArea => { chunks.hasOwnProperty(subArea) }).length > 1) {
                        chunks[name] = true;
                    }
                }
            }
        };
    }

    possibleAreas = tempPossibleAreas;
    areasStructure = tempAreaStructure;

    // Update results with manually selected areas
    !!manualAreas && Object.keys(manualAreas).forEach((area) => {
        if (manualAreas[area]) {
            chunks[area] = true;
        } else {
            delete chunks[area];
        }
    });

    return chunks;
}