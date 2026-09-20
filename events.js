function handleInteraction() {


    // 1. Radio (Bazaar)
    if (room === 'CENTER' && Math.hypot(player.x - radioPos.x, player.y - radioPos.y) < 100) {
        return openRadioMenu();
    }

    // tarot
    if (room === 'RIGHT' && Math.abs(player.x - 300) < 100 && player.y < 420) {
        return startTarot();
    }
    // closet
    if (room === 'RIGHT' && player.x > 410 && player.y < 150) {
        return openCloset();
    }
    // 2. Bulletin Board (Garden) - Check this BEFORE flowers
    if (room === 'GARDEN' && player.x < 260 && player.y < 260) {
        state = 'DIALOGUE';
        const box = document.getElementById('dialogue-box');
        box.style.display = 'block';

        document.getElementById('diag-name').innerText = t[curLang].misc.bulletinBoard;

        // PULLS FROM t[curLang] dynamically!
        document.getElementById('diag-text').innerText = t[curLang].rumors[currentRumorIndex].text;

        document.getElementById('diag-btns').innerHTML = `<button class="btn" onclick="closeDiag()">${t[curLang].ui.alright}</button>`;
        return;
    }

    // 3. Flower Picking (Garden)
    if (room === 'GARDEN') {
        let picked = false;
        flowers = flowers.filter(f => {
            if (!picked && Math.hypot(player.x - f.x, player.y - f.y) < 50) {
                inventory.push("Wildflower");
                document.getElementById('gift-val').innerText = inventory.length;
                picked = true;
                return false;
            }
            return true;
        });
        if (picked) return;
    }

    // 4. Customers/Visitors (Bazaar)
    if (room === 'CENTER' && customer?.state === 'WAIT' && Math.abs(player.y - customer.y) < 150) {
        if (customer.role === 'FORTUNE') return startFortuneMinigame();
        if (customer.role === 'DEBT') return startDebtEncounter();
        if (customer.role === 'KIREN') return startKirenEncounter();
        if (customer.role === 'KIDDO') return startKiddoEncounter();
        if (customer.role === 'JESSE') return startJesseEncounter();
        if (customer.role === 'RAINBOW') return startRainbowEncounter();
        if (customer.role === 'GAMBLER') return startBJ();
        return startSale();
    }

    // 5. Elion
    if (room === 'CENTER' && elionLocation === 'WAITING_BAZAAR') {
        if (Math.hypot(player.x - elionX, player.y - elionY) < 100) {
            state = 'DIALOGUE';
            const box = document.getElementById('dialogue-box');
            box.style.display = 'block';

            document.getElementById('diag-name').innerText = t[curLang].elion.name || "ELION";

            // Safe fallback text so it NEVER freezes if strings.js is missing it
            let vacText = (t[curLang].misc && t[curLang].misc.elionVacation) ?
                t[curLang].misc.elionVacation :
                "'Cov, my brain is melting from all these people. You take over the tarot readings. Good luck!'";

            document.getElementById('diag-text').innerText = vacText;
            document.getElementById('diag-btns').innerHTML = `<button class="btn" onclick="elionLeavesForGood()">I'll handle it.</button>`;
            return;
        }
    }
    if (room === 'RIGHT' && elionLocation === 'ROOM_RIGHT' && Math.hypot(player.x - 500, player.y - 520) < 120) {
        return openElionMenu();
    }

    // 6. Merchant (Shop)
    if (room === 'LEFT' && player.y < 450 && Math.abs(player.x - 300) < 150) {
        return openShop();
    }

    // 7. God (Void)
    if (room === 'GOD_FIELD' && godInteractable && Math.hypot(player.x - 300, player.y - 200) < 150) {
        return startGodDialogue();
    }

    // 8. Casino Entrance
    if (room === 'CASINO_PATH' && player.x < 300 && player.y < 300) {
        state = 'DIALOGUE';
        document.getElementById('dialogue-box').style.display = 'block';
        if (gold >= 500) { casinoUnlocked = true; }
        document.getElementById('diag-name').innerText = (gold >= 500 || casinoUnlocked) ? "CASINO" : "DOOR SIGN";

        if (gold >= 500 || casinoUnlocked) {
            document.getElementById('diag-text').innerText = t[curLang].casino.welcome;
            document.getElementById('diag-btns').innerHTML = `<button class="btn" onclick="enterCasino()">${t[curLang].ui.next}</button>`;
        } else {
            document.getElementById('diag-text').innerText = t[curLang].casino.sign;
            document.getElementById('diag-btns').innerHTML = `<button class="btn" onclick="closeDiag()">${t[curLang].ui.alright}</button>`;
        }
        return;
    }

    // 9. Casino Tables
    if (room === 'CASINO_GAMES') {
        // Dealer 1 (Bottom Left)
        if (Math.hypot(player.x - 220, player.y - 480) < 80) {
            return startCasinoBJ(100, sprDealer1);
        }
        // Dealer 2 (Top Right)
        if (Math.hypot(player.x - 500, player.y - 290) < 80) {
            return startCasinoBJ(200, sprDealer2);
        }
    }

    if (room === 'CASINO_LOBBY' && player.y < 450 && Math.abs(player.x - 300) < 100) {
        return openCasinoShop();
    }









}


///////////////////////



function enterCasino() {
    closeDiag();
    room = 'CASINO_LOBBY';
    player.x = 300;
    player.y = 580; // Start at the very bottom edge
}

function startCasinoBJ(bet) {
    metCharacters.add('CASINO_DEALER');
    if (gold < bet) return alert(t[curLang].merchant.noGold);

    customer = {
        role: 'GAMBLER',
        bet: bet,
        isGambler: true,
        skin: sprDealer1, sprDealer2,
        isCasinoDealer: true
    };

    metCharacters.add('CASINO_DEALER');
    startBJ();
}



function openRadioMenu() {
    state = 'DIALOGUE';
    const box = document.getElementById('dialogue-box'); box.style.display = 'block';
    // Logic for displaying the count
    const total = hasDeluxeRadio ? 10 : 7;
    document.getElementById('diag-name').innerText = hasDeluxeRadio ? "DELUXE RADIO" : "OLD RADIO";
    document.getElementById('diag-text').innerText = isMusicPlaying ?
        `${t[curLang].radio.on} ${currentTrackIdx + 1} / ${total}` :
        t[curLang].radio.off;

    let btns = `<button class="btn" onclick="toggleMusic()">${isMusicPlaying ? t[curLang].radio.btnOff : t[curLang].radio.btnOn}</button>`;
    btns += `<button class="btn" onclick="skipTrack()">${t[curLang].radio.btnNext}</button>`;
    btns += `<button class="btn" style="background:#555" onclick="closeDiag()">${t[curLang].ui.leave}</button>`;
    document.getElementById('diag-btns').innerHTML = btns;
}



function startRainbowEncounter() {
    metCharacters.add('RAINBOW');
    state = 'DIALOGUE'; document.getElementById('dialogue-box').style.display = 'block';
    document.getElementById('diag-name').innerText = t[curLang].rainbow.name;
    document.getElementById('diag-text').innerText = t[curLang].rainbow.deck;
    document.getElementById('diag-btns').innerHTML = `<button class="btn" onclick="startRainbowRound()">${t[curLang].ui.alright}</button><button class="btn" onclick="finishSale()">${t[curLang].ui.leave}</button>`;
}
function startRainbowRound() { closeDiag(); isRainbowRound = true; startBJ(); }

function startJesseEncounter() {
    metCharacters.add('JESSE');
    state = 'DIALOGUE'; document.getElementById('dialogue-box').style.display = 'block';
    document.getElementById('diag-name').innerText = t[curLang].jesse.name;
    document.getElementById('diag-text').innerText = t[curLang].jesse.yell;
    document.getElementById('diag-btns').innerHTML = `<button class="btn" onclick="finishSale()">${t[curLang].jesse.calm}</button>`;
}

function startKiddoEncounter() {
    metCharacters.add('KIDDO');
    state = 'DIALOGUE'; document.getElementById('dialogue-box').style.display = 'block';
    document.getElementById('diag-name').innerText = t[curLang].kiddo.name;
    document.getElementById('diag-text').innerText = t[curLang].kiddo.ask;
    let hasCandy = inventory.includes("Enchanted Candy");
    let btns = hasCandy ? `<button class="btn" onclick="giveCandy()">${t[curLang].kiddo.give}</button>` : "";
    btns += `<button class="btn" onclick="refuseKiddo()">${t[curLang].kiddo.refuse}</button>`;
    document.getElementById('diag-btns').innerHTML = btns;
}
function giveCandy() { inventory.splice(inventory.indexOf("Enchanted Candy"), 1); document.getElementById('gift-val').innerText = inventory.length; document.getElementById('diag-text').innerText = t[curLang].kiddo.thanks; document.getElementById('diag-btns').innerHTML = `<button class="btn" onclick="finishSale()">${t[curLang].kiddo.skip}</button>`; }
function refuseKiddo() { document.getElementById('diag-text').innerText = t[curLang].kiddo.meanie; document.getElementById('diag-btns').innerHTML = `<button class="btn" onclick="kiddoRunsAway()">${t[curLang].ui.back}</button>`; }
function kiddoRunsAway() { closeDiag(); if (customer) { customer.state = 'OUT'; customer.targetX = 700; } kiddoTattling = true; }

function startDebtEncounter() {
    metCharacters.add('COLLECTOR');
    state = 'DIALOGUE'; document.getElementById('dialogue-box').style.display = 'block';
    document.getElementById('diag-name').innerText = t[curLang].collector.name;
    document.getElementById('diag-text').innerText = t[curLang].collector.tax;
    let btns = gold >= 100 ? `<button class="btn" onclick="payDebt()">${t[curLang].collector.pay}</button>` : `<button class="btn" disabled>...</button>`;
    btns += `<button class="btn" onclick="triggerIntervention()">${t[curLang].collector.refuse}</button>`;
    document.getElementById('diag-btns').innerHTML = btns;
}
function payDebt() { gold -= 100; document.getElementById('gold-val').innerText = gold; finishSale(); }
function triggerIntervention() { closeDiag(); state = 'INTERVENTION'; elionGhost = { x: 500, y: 520, targetX: 230, targetY: 140, opacity: 0, stage: 'TELEPORT' }; elionSat = Math.max(0, elionSat - 50); }

function startSale() {
    metCharacters.add('SHOPPER');
    state = 'DIALOGUE'; document.getElementById('dialogue-box').style.display = 'block';
    let bonus = (activeRumorEffect === "rich_shoppers") ? 20 : 0;
    let profit = elionSat >= 50 ? (Math.floor(Math.random() * 11) + 15 + bonus) : (Math.floor(Math.random() * 11) + 5 + bonus);
    gold += profit; document.getElementById('gold-val').innerText = gold;
    document.getElementById('diag-name').innerText = t[curLang].roles.shopper;
    const lines = t[curLang].misc.shopperLines(profit);
    document.getElementById('diag-text').innerText = lines[Math.floor(Math.random() * lines.length)];
    document.getElementById('diag-btns').innerHTML = `<button class="btn" onclick="finishSale()">${t[curLang].ui.thanks}</button>`;
}
function finishSale() { incrementVisitors(); closeDiag(); if (customer) customer.state = 'OUT'; }
function startKirenEncounter() {
    state = 'DIALOGUE'; document.getElementById('dialogue-box').style.display = 'block'; document.getElementById('diag-name').innerText = t[curLang].kiren.name; document.getElementById('diag-text').innerText = t[curLang].kiren.hi; document.getElementById('diag-btns').innerHTML = `<button class="btn" onclick="finishSale()">${t[curLang].kiren.bye}</button>`;
    metCharacters.add('KIREN');
}

// GOD DIALOGUE
function startGodDialogue() {

    state = 'GOD_DIALOGUE';
    godDialogueStep = 1;
    document.getElementById('dialogue-box').style.display = 'block';
    advanceGodDialogue();
}

function advanceGodDialogue() {
    const text = document.getElementById('diag-text'), name = document.getElementById('diag-name'), btns = document.getElementById('diag-btns');
    name.innerText = t[curLang].god.name;

    if (godDialogueStep === 1) {
        text.innerText = t[curLang].god.line1;
        btns.innerHTML = `<button class="btn" onclick="godDialogueStep++; advanceGodDialogue()">${t[curLang].god.opt1}</button>
                             <button class="btn" onclick="godDialogueStep++; advanceGodDialogue()">${t[curLang].god.opt2}</button>`;
    } else if (godDialogueStep === 2) {
        text.innerText = t[curLang].god.line2;
        btns.innerHTML = `<button class="btn" onclick="godDialogueStep++; advanceGodDialogue()">${t[curLang].ui.next}</button>`;
    } else if (godDialogueStep === 3) {
        text.innerText = t[curLang].god.line3;
        btns.innerHTML = `<button class="btn" onclick="godDialogueStep++; advanceGodDialogue()">${t[curLang].ui.next}</button>`;
    } else if (godDialogueStep === 4) {
        text.innerText = t[curLang].god.line4;
        btns.innerHTML = `<button class="btn" onclick="godDialogueStep++; advanceGodDialogue()">${t[curLang].ui.next}</button>`;
    } else if (godDialogueStep === 5) {
        text.innerText = t[curLang].god.line5;
        btns.innerHTML = `<button class="btn" onclick="endGodScene()">${t[curLang].ui.leave}</button>`;
    }
}

function endGodScene() {
    closeDiag();
    godVisible = false;
    godSequenceActive = false;
    godInteractable = false;
    state = 'WALK';
}

function triggerEnding() {
    state = 'ENDING'; canvas.style.opacity = '0';
    setTimeout(() => { room = 'ROMANTIC'; canvas.style.opacity = '1'; document.getElementById('ui-bar').style.display = 'none'; document.getElementById('dialogue-box').classList.add('ending-mode'); player.x = 250; player.y = 450; openEndingDialogue(); }, 1000);
}
let endStep = 0;
function openEndingDialogue() { document.getElementById('dialogue-box').style.display = 'block'; advanceEnding(); }
function advanceEnding() {
    const text = document.getElementById('diag-text'), name = document.getElementById('diag-name'), btns = document.getElementById('diag-btns');
    endStep++;
    if (endStep === 1) { name.innerText = t[curLang].elion.name.split(' ')[0]; text.innerText = t[curLang].ending.e1; btns.innerHTML = `<button class="btn" onclick="advanceEnding()">${t[curLang].ui.next}</button>`; }
    else if (endStep === 2) { name.innerText = "COVIELLO"; text.innerText = t[curLang].ending.c1; }
    else if (endStep === 3) { name.innerText = t[curLang].elion.name.split(' ')[0]; text.innerText = t[curLang].ending.e2; }
    else if (endStep === 4) { name.innerText = "COVIELLO"; text.innerText = t[curLang].ending.c2; }
    else if (endStep === 5) { name.innerText = t[curLang].elion.name.split(' ')[0]; text.innerText = t[curLang].ending.e3; }
    else if (endStep === 6) { name.innerText = "COVIELLO"; text.innerText = t[curLang].ending.c3; }
    else if (endStep === 7) { name.innerText = t[curLang].elion.name.split(' ')[0]; text.innerText = t[curLang].ending.e4; btns.innerHTML = `<button class="btn" onclick="location.reload()">${t[curLang].ending.fin}</button>`; }
}

function openElionMenu() {
    metCharacters.add('ELION');
    state = 'DIALOGUE';
    const box = document.getElementById('dialogue-box');
    box.style.display = 'block';
    document.getElementById('diag-name').innerText = t[curLang].elion.name;

    // Check if Kiddo tattled on you
    if (kiddoTattling) {
        document.getElementById('diag-text').innerText = t[curLang].elion.angry;
        elionSat = 0;
        kiddoTattling = false;
        document.getElementById('diag-btns').innerHTML = `<button class="btn" onclick="closeDiag()">${t[curLang].elion.explain}</button>`;
        return;
    }

    // --- THIS GRABS THE RANDOM GREETING ---
    let pool = t[curLang].misc.elionIdleLines;
    document.getElementById('diag-text').innerText = elionSat > 0 ? pool[Math.floor(Math.random() * pool.length)] : t[curLang].misc.elionColdLine;

    // --- THIS BUDS THE BUTTONS ---
    let btns = `<button class="btn" onclick="elionChat()">${t[curLang].elion.chatBtn}</button>`;
    btns += `<button class="btn" onclick="elionRequestGold()">${t[curLang].elion.goldBtn}</button>`;
    if (inventory.length > 0) {
        btns += `<button class="btn" onclick="elionGiveGift()">${t[curLang].elion.giftBtn}</button>`;
    }
    btns += `<button class="btn" style="background:#555" onclick="closeDiag()">${t[curLang].ui.leave}</button>`;

    document.getElementById('diag-btns').innerHTML = btns;
}

function elionChat() {
    const chats = t[curLang].misc.elionChatLines;
    document.getElementById('diag-text').innerText = chats[Math.floor(Math.random() * chats.length)];
}

function elionRequestGold() {
    if (elionSat <= 0) { document.getElementById('diag-text').innerText = t[curLang].elion.noMagic; }
    else if (gold >= 50) { document.getElementById('diag-text').innerText = t[curLang].elion.rich; }
    else { elionSat = Math.max(0, elionSat - 30); gold += 50; document.getElementById('gold-val').innerText = gold; document.getElementById('diag-text').innerText = t[curLang].elion.giveGold; }
}
function elionGiveGift() {
    if (inventory.length === 0) return;

    const itemObj = inventory.shift();
    document.getElementById('gift-val').innerText = inventory.length;


    const itemInfo = masterItems.find(i => i.name === itemObj);
    let rumorBonus = (activeRumorEffect === "flower_boost" && itemObj === "Wildflower") ? 5 : 0;
    elionSat = Math.min(100, elionSat + (itemInfo ? itemInfo.sat : 5) + rumorBonus);
    document.getElementById('diag-text').innerText = t[curLang].elion.giftResponse(itemObj);
}

function startTarot() {
    state = 'TAROT';
    tarotRevealIndex = 0;
    selectedTarotCards = [];
    tarotDeck = [];

    let masterList = [...t[curLang].tarot.deck].sort(() => Math.random() - 0.5);

    // Spread 15 cards horizontally at the bottom (The "Table" area)
    for (let i = 0; i < 15; i++) {
        tarotDeck.push({
            x: 40 + (i * 35),
            y: 450, // Bottom half
            w: 60,
            h: 90,
            selected: false,
            data: masterList[i % masterList.length]
        });
    }
    // Hide standard UI
    document.getElementById('interact-hint').style.display = 'none';
}

function nextTarotCard() {
    const btns = document.getElementById('diag-btns');

    if (tarotRevealIndex < 3) {
        let card = selectedTarotCards[tarotRevealIndex];
        let types = [t[curLang].tarot.was, t[curLang].tarot.is, t[curLang].tarot.maybe];

        document.getElementById('diag-name').innerText = t[curLang].tarot.readingName;
        document.getElementById('diag-text').innerHTML =
            `<span style="color:var(--purple); font-size:12px; text-transform:uppercase;">${types[tarotRevealIndex]}:</span><br>` +
            `<strong>${card.data.name}</strong><br><i>"${card.data.desc}"</i>`;

        // Ensure the Next button is always there during the 3 cards
        btns.innerHTML = `<button class="btn" onclick="nextTarotCard()">${t[curLang].ui.next}</button>`;

        tarotRevealIndex++;
    } else {
        // Final screen: Change button to Back
        document.getElementById('diag-text').innerText = t[curLang].tarot.end;
        btns.innerHTML = `<button class="btn" onclick="closeDiag()">${t[curLang].ui.back}</button>`;
    }
}



function openShop() {
    state = 'SHOP'; document.getElementById('dialogue-box').style.display = 'block'; document.getElementById('diag-name').innerText = t[curLang].merchant.name;
    document.getElementById('diag-text').innerText = t[curLang].misc.merchantGreeting;
    const stock = [{ name: "Enchanted Candy", cost: 15 }, { name: "Starlight Tea", cost: 50 }, { name: "Cosmic Scarf", cost: 80 }];
    let btns = ""; stock.forEach(item => { btns += `<button class="btn" onclick="buy('${item.name}', ${item.cost})">${t[curLang].merchant.buyBtn(item.name, item.cost)}</button>`; });
    btns += `<button class="btn" style="background:#555" onclick="closeDiag()">${t[curLang].ui.exit}</button>`;
    document.getElementById('diag-btns').innerHTML = btns;
    metCharacters.add('MERCHANT');
}
function buy(name, price) { if (gold >= price) { gold -= price; inventory.push(name); document.getElementById('gold-val').innerText = gold; document.getElementById('gift-val').innerText = inventory.length; document.getElementById('diag-text').innerText = t[curLang].merchant.bought(name); } else document.getElementById('diag-text').innerText = t[curLang].merchant.noGold; }


function closeDiag() {
    const box = document.getElementById('dialogue-box');
    box.style.display = 'none';
    box.classList.remove('ending-mode');
    state = 'WALK';
}

function openCasinoShop() {
    metCharacters.add('RECEPTIONIST');
    state = 'SHOP'; // Reuses shop state logic
    const box = document.getElementById('dialogue-box');
    box.style.display = 'block';
    document.getElementById('diag-name').innerText = t[curLang].casinoShop.name;
    document.getElementById('diag-text').innerText = t[curLang].casinoShop.welcome;

    let btns = `<button class="btn" onclick="openCasinoShopClothes()">${t[curLang].ui.clothes || "Clothes"}</button>`;
    btns += `<button class="btn" onclick="openCasinoShopItems()">${t[curLang].ui.items || "Items"}</button>`;
    btns += `<button class="btn" style="background:#555" onclick="closeDiag()">${t[curLang].ui.exit}</button>`;

    document.getElementById('diag-btns').innerHTML = btns;
}

function openCasinoShopClothes() {
    let btns = "";
    if (!ownedSkins.includes('HAT')) {
        btns += `<button class="btn" onclick="buySkin('HAT', 150)">${t[curLang].casinoShop.hatName} (150G)</button>`;
    } else {
        btns += `<button class="btn" disabled>${t[curLang].casinoShop.hatName} (${t[curLang].ui.alright})</button>`;
    }

    if (!ownedSkins.includes('GAMBLER')) {
        btns += `<button class="btn" onclick="buySkin('GAMBLER', 300)">${t[curLang].casinoShop.gamblerName} (300G)</button>`;
    } else {
        btns += `<button class="btn" disabled>${t[curLang].casinoShop.gamblerName} (${t[curLang].ui.alright})</button>`;
    }

    btns += `<button class="btn" style="background:#555" onclick="openCasinoShop()">${t[curLang].ui.back}</button>`;
    document.getElementById('diag-btns').innerHTML = btns;
}

function openCasinoShopItems() {
    let btns = "";
    if (!hasDeluxeRadio) {
        btns += `<button class="btn" onclick="buyDeluxeRadio()">${t[curLang].casinoShop.radioName} (300G)</button>`;
    } else {
        btns += `<button class="btn" disabled>${t[curLang].casinoShop.radioName} (${t[curLang].ui.alright})</button>`;
    }
    btns += `<button class="btn" style="background:#555" onclick="openCasinoShop()">${t[curLang].ui.back}</button>`;
    document.getElementById('diag-btns').innerHTML = btns;
}

function buySkin(skin, price) {
    if (gold >= price) {
        gold -= price;
        ownedSkins.push(skin);
        document.getElementById('gold-val').innerText = gold;
        document.getElementById('diag-text').innerText = t[curLang].casinoShop.boughtSkin;
        openCasinoShopClothes(); // Update button
    } else {
        document.getElementById('diag-text').innerText = t[curLang].merchant.noGold;
    }
}

function openCloset() {
    state = 'DIALOGUE';
    const box = document.getElementById('dialogue-box');
    box.style.display = 'block';
    document.getElementById('diag-name').innerText = t[curLang].closet.name;
    document.getElementById('diag-text').innerText = t[curLang].closet.desc;

    let btns = "";
    ownedSkins.forEach(skin => {
        let skinName = t[curLang].closet[skin];
        let bg = (currentSkin === skin) ? "#2ecc71" : "#4a6fa5";
        btns += `<button class="btn" style="background:${bg}" onclick="equipSkin('${skin}')">${skinName}</button>`;
    });

    btns += `<button class="btn" style="background:#555" onclick="closeDiag()">${t[curLang].ui.exit}</button>`;
    document.getElementById('diag-btns').innerHTML = btns;
}

function equipSkin(skin) {
    currentSkin = skin;
    openCloset();
}

function buyDeluxeRadio() {
    if (gold >= 300) {
        gold -= 300;
        hasDeluxeRadio = true;
        document.getElementById('gold-val').innerText = gold;
        document.getElementById('diag-text').innerText = t[curLang].casinoShop.bought;

        // Update the button immediately
        openCasinoShop();
    } else {
        document.getElementById('diag-text').innerText = t[curLang].merchant.noGold;
    }
}
// Fortune Minigame
function startFortuneMinigame() {
    metCharacters.add('FORTUNE');
    fortuneActive = true;
    state = 'FORTUNE';
    document.getElementById('fortune-ui').style.display = 'block';

    // Set UI Title from translation
    document.querySelector('#fortune-ui h2').innerText = t[curLang].fortune.title;

    // USE THE NEW MERCHANT-FOCUSED FORTUNE DECK
    let cardPool = t[curLang].fortune.deck;
    currentFortuneCard = cardPool[Math.floor(Math.random() * cardPool.length)];

    document.getElementById('fortune-prompt').innerText = t[curLang].fortune.prompt;
    document.getElementById('tarot-display').innerText = currentFortuneCard.name;

    let fakePool = cardPool.filter(c => c.name !== currentFortuneCard.name);
    fakePool.sort(() => Math.random() - 0.5);

    let options = [
        { text: currentFortuneCard.desc, correct: true },
        { text: fakePool[0].desc, correct: false },
        { text: fakePool[1].desc, correct: false }
    ];
    options.sort(() => Math.random() - 0.5);

    let btnHtml = "";
    options.forEach((opt, idx) => {
        if (opt.correct) fortuneCorrectIdx = idx;
    });

    options.forEach((opt, idx) => {
        btnHtml += `<button class="btn" style="width:100%; text-align:left;" onclick="checkFortuneAnswer(${idx}, ${opt.correct})">${opt.text}</button>`;
    });

    document.getElementById('fortune-options').innerHTML = btnHtml;
}

function checkFortuneAnswer(idx, isCorrect) {
    document.getElementById('fortune-ui').style.display = 'none';
    state = 'DIALOGUE';
    const box = document.getElementById('dialogue-box'); box.style.display = 'block';
    document.getElementById('diag-name').innerText = t[curLang].fortune.title;

    if (isCorrect) {
        let profit = elionSat >= 50 ? (Math.floor(Math.random() * 21) + 40) : (Math.floor(Math.random() * 21) + 20);
        gold += profit;
        document.getElementById('gold-val').innerText = gold;
        document.getElementById('diag-text').innerText = t[curLang].fortune.success(profit);
    } else {
        let penalty = 20;
        gold = Math.max(0, gold - penalty);
        document.getElementById('gold-val').innerText = gold;
        document.getElementById('diag-text').innerText = t[curLang].fortune.failure(penalty);
    }

    document.getElementById('diag-btns').innerHTML = `<button class="btn" onclick="finishFortuneSale()">${t[curLang].fortune.goodbye}</button>`;
}

function finishFortuneSale() {
    incrementVisitors();
    closeDiag();
    if (customer) customer.state = 'OUT';
    fortuneActive = false;
}

function elionLeavesForGood() {
    const box = document.getElementById('dialogue-box');
    box.style.display = 'none';
    box.classList.remove('ending-mode');

    elionLocation = 'AWAY'; // He disappears entirely
    player.x -= 40;         // Step Coviello back so he isn't overlapping

    state = 'WALK';         // Explicitly restore movement
}


function hit() { if (state !== 'BJ') return; pHand.push(deck.pop()); renderBJ(); if (getSum(pHand) > 21) endBJ('LOSE'); }
function stand() { if (state !== 'BJ') return; while (getSum(dHand) < 17) dHand.push(deck.pop()); renderBJ(); let p = getSum(pHand), d = getSum(dHand); if (d > 21 || p > d) endBJ('WIN'); else if (p < d) endBJ('LOSE'); else endBJ('DRAW'); }
function getSum(h) { let s = h.reduce((a, b) => a + b.w, 0), aces = h.filter(c => c.x === 'A').length; while (s > 21 && aces > 0) { s -= 10; aces--; } return s; }
function startBJ() { metCharacters.add('GAMBLER'); if (gold < customer.bet) return alert(t[curLang].merchant.noGold); state = 'BJ'; document.getElementById('blackjack-ui').style.display = 'block'; pHand = []; dHand = []; deck = []; const v = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; for (let i = 0; i < 4; i++) v.forEach(x => deck.push({ x, w: isNaN(x) ? (x === 'A' ? 11 : 10) : parseInt(x) })); deck.sort(() => Math.random() - 0.5); pHand = [deck.pop(), deck.pop()]; dHand = [deck.pop(), deck.pop()]; renderBJ(); }
function renderBJ() {
    const pR = document.getElementById('player-hand'), dR = document.getElementById('dealer-hand'); pR.innerHTML = ''; dR.innerHTML = '';
    pHand.forEach(c => { const rbStyle = isRainbowRound ? 'background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%); border: 3px solid #ff00ff;' : ''; pR.innerHTML += `<div class="card" style="${rbStyle}">${c.x}</div>`; });
    dHand.forEach((c, i) => { let h = (i === 1 && state === 'BJ' && elionSat < 75); const rbStyle = isRainbowRound ? 'background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%); border: 3px solid #ff00ff;' : ''; dR.innerHTML += `<div class="card" style="${h ? 'background:#333' : rbStyle}">${h ? '?' : c.x}</div>`; });
}
function endBJ(res) {
    state = 'BJ_RESULT';
    document.getElementById('bj-msg').innerText = t[curLang].bj[res.toLowerCase()];

    // Casino special rule: Dealer wins on a draw (Push)
    let result = res;
    if (room === 'CASINO_GAMES' && res === 'DRAW') {
        result = 'LOSE';
        document.getElementById('bj-msg').innerText = (curLang === 'en' ? "HOUSE WINS" : "ДІЛЕР ПЕРЕМІГ");
    }

    gold += (result === 'WIN' ? customer.bet : (result === 'LOSE' ? -customer.bet : 0));
    document.getElementById('gold-val').innerText = gold;

    setTimeout(() => {
        document.getElementById('blackjack-ui').style.display = 'none';
        if (customer && !customer.isCasinoDealer) {
            incrementVisitors();
        }
        if (room === 'CENTER') {
            // In Bazaar: Shopper walks away
            if (customer) customer.state = 'OUT';
        } else {
            // In Casino: Dealer stays put, we just clear the temporary reference
            customer = null;
            lastCustTime = Date.now(); // Reset the Bazaar timer so a new shopper can come
        }

        state = 'WALK';
        isRainbowRound = false;
    }, 1500);
}

