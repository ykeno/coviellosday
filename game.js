drawIcons();
canvas.onclick = e => {

    if (state === 'TAROT' || state === 'TAROT_REVEAL') {
        ctx.clearRect(0, 0, 600, 600);

        if (bgTarotMode.complete) {
            ctx.drawImage(bgTarotMode, 0, 0, 600, 600);
        } else {
            ctx.fillStyle = "#333"; ctx.fillRect(0, 0, 600, 600);
        }

        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        // Only allow clicking in the bottom half
        if (my > 350) {
            for (let i = tarotDeck.length - 1; i >= 0; i--) {
                let c = tarotDeck[i];
                if (mx > c.x && mx < c.x + c.w && my > c.y && my < c.y + c.h && !c.selected) {
                    c.selected = true;
                    selectedTarotCards.push(c);

                    if (selectedTarotCards.length === 3) {
                        state = 'TAROT_REVEAL';
                        // Show the dialogue box in the bottom half
                        const box = document.getElementById('dialogue-box');
                        box.style.display = 'block';
                        box.classList.add('ending-mode'); // Use your compact style
                        nextTarotCard();
                    }
                    break;
                }
            }
        }
        return;
    }


    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (state === 'JOURNAL') {
        // --- BOOKMARK CLICKS ---
        // Blue Bookmark (Characters) - Leftmost tab
        if (mx > 120 && mx < 185 && my > 50 && my < 150) {
            journalTab = 'characters';
            charPageIndex = 0;
        }
        // Green Bookmark (Tutorial) - Second tab
        if (mx > 190 && mx < 250 && my > 50 && my < 150) {
            journalTab = 'tutorial';
        }

        // --- NAVIGATION ARROWS ---
        if (journalTab === 'characters') {
            const discovered = Array.from(metCharacters);
            // Click Left side of book
            if (mx > 50 && mx < 150 && my > 200 && my < 450) {
                charPageIndex = (charPageIndex - 1 + discovered.length) % discovered.length;
            }
            // Click Right side of book
            if (mx > 450 && mx < 550 && my > 200 && my < 450) {
                charPageIndex = (charPageIndex + 1) % discovered.length;
            }
        }
        return; // Prevent other clicks while journal is open
    }

    // --- RADIO INTERACTION---
    const nearRadio = room === 'CENTER' && Math.hypot(player.x - radioPos.x, player.y - radioPos.y) < 100;
    if (nearRadio && Math.hypot(mx - radioPos.x, my - radioPos.y) < 50) {
        toggleMusic();
    }

};


// BUTTONS
window.onkeydown = e => {
    keys[e.code] = true;
    const isInteractKey = (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'NumpadEnter');

    // Toggle Journal with J
    if (e.code === 'KeyJ') {
        if (state === 'WALK' || state === 'JOURNAL') {
            toggleJournal();
        }
    }

    if (state === 'WALK' && isInteractKey) {
        e.preventDefault();
        handleInteraction();
    }

    // Navigation inside Journal
    if (state === 'JOURNAL') {
        if (e.code === 'ArrowRight') { charPageIndex = (charPageIndex + 1) % metCharacters.size; }
        if (e.code === 'ArrowLeft') { charPageIndex = (charPageIndex - 1 + metCharacters.size) % metCharacters.size; }
    }

    if (state === 'GOD_READY' && isInteractKey) {
        e.preventDefault();
        startGodDialogue();
    }
    if (state === 'ENDING' && isInteractKey) {
        e.preventDefault();
        advanceEnding();
    }
    if (state === 'BJ') {
        if (e.code === 'KeyH') hit();
        if (e.code === 'KeyS') stand();
    }
};
window.onkeyup = e => keys[e.code] = false;


function checkCollision(nx, ny) {
    if (state !== 'WALK' && state !== 'GOD_READY') return true;

    // The 'p' is the padding (hitbox size). 
    // Since Coviello is 60px wide, 20-25px padding makes him look like he has 'weight'.
    const p = 20;

    if (room === 'CENTER') {
        // left and right
        if (nx < p && ny < 200) return true;
        if (nx > 600 - p && ny < 180) return true;


        if (ny > 170 - p && ny < 260 + p && nx > 70 - p && nx < 530 + p) return true; // table centre
        if (ny > 260 - p && ny < 350 + p && nx > 70 - p && nx < 130 + p) return true; // table left
        if (ny > 260 - p && ny < 280 + p && nx > 430 - p && nx < 450 + p) return true; // wase
        if (ny > 260 - p && ny < 350 + p && nx > 470 - p && nx < 530 + p) return true; // table right
        if (ny > 520 - p && nx > 70 - p && nx < 530 + p) return true; // table down

        // interaction
        if (customer && customer.state === 'WAIT' && Math.hypot(nx - customer.x, ny - customer.y) < 50) return true;

        // bottom
        if (ny > 580) return true;
    }

    if (room === 'RIGHT') {
        // Top walls
        if (nx < 140 + p && ny < 110 + p) return true; // lamp
        if (nx > 160 - p && nx < 450 + p && ny < 70 + p) return true;
        if (nx > 410 - p && ny < 100 + p) return true; // closet
        if (nx > 230 - p && nx < 375 + p && ny > 160 - p && ny < 400 + p) return true;  // table

        // elion collision
        if (elionLocation === 'ROOM_RIGHT' && Math.hypot(nx - 500, ny - 520) < 60) return true;

        // boundaries
        if (ny > 580) return true;
        if (nx > 600 - p) return true;
    }

    if (room === 'LEFT') {
        if (ny < 200 + p || ny > 580) return true;
        // counter
        if (ny < 230 + p && nx > 130 - p && nx < 480 + p) return true;
        // collision with merchant
        if (Math.hypot(nx - 300, ny - 260) < 60) return true;
    }

    if (room === 'GARDEN') {
        // exit hole down
        if (ny > 580 && nx > 50 && nx < 500) return false;
        // borders
        if (ny < 100 + p || ny > 580 || nx > 580 - p) return true;
    }

    if (room === 'GOD_FIELD') {
        if (ny < 300 || ny > 580) return true;
    }


    if (room === 'CASINO_PATH') {
        const p = 20;
        // Block the building on the left (Adjusted nx to 230 so door is accessible)
        if (nx < 230) return true;
        // Block the top wall area
        if (ny < 120) return true;
        // Block the trash can (bottom left)
        if (nx < 160 && ny > 450) return true;
        // Block the bottom edge
        if (ny > 580) return true;
        return false;
    }


    if (room === 'CASINO_LOBBY') {
        const p = 20;
        // collision with receptionist
        if (Math.hypot(nx - 300, ny - 260) < 60) return true;
        //counter
        if (ny < 270 && nx > 100 && nx < 500) return true;
        //top wall
        if (ny < 110) return true;
        //right wall (no exit there)
        if (nx > 580) return true;
        // Block left wall EXCEPT for the doorway to the Games Room
        if (nx < 20 && (ny < 300)) return true;
        return false;
    }

    if (room === 'CASINO_GAMES') {
        const p = 15;

        // dealers
        if (Math.hypot(nx - 220, ny - 480) < 60) return true;
        if (Math.hypot(nx - 500, ny - 290) < 60) return true;

        // table bottom
        if (ny > 299 - p && ny < 400 + p && nx < 280 - p) return true;

        // нижній стілець
        if (ny > 400 - p && ny < 470 + p && nx > 120 - p && nx < 180 + p) return true;

        // ВЕРХНІЙ СТІЛ
        if (nx > 350 - p && ny < 280 + p) return true;

        //plant
        if (ny < 130 + p && nx < 75 + p) return true;

        // верхня стіна
        if (ny < 110) return true;

        // ліва стіна
        if (nx < 10) return true;

        // bottom boundary
        if (ny > 580) return true;
        return false;
    }




    return false;
}

function isGrass(x, y) {
    // Bulletin Board Area (Top Left)
    if (x < 220 && y < 220) return false;
    // Vertical Path (The middle stone road)
    if (x > 240 && x < 380) return false;
    // Horizontal Path (The side road)
    if (y > 140 && y < 250 && x < 300) return false;
    return true;
}

function update() {

    // --- INSTANT ENDING CHECK ---
    if (elionSat >= 100 && state !== 'ENDING' && room !== 'ROMANTIC') {
        triggerEnding();
        return;
    }

    if (state === 'ENDING') return;

    // GOD FIELD TRANSITION (15 SECONDS)
    if (room === 'LEFT' && player.x < -10) {
        offScreenTimer++;
        if (offScreenTimer > 900) { // 15 seconds at 60fps
            room = 'GOD_FIELD';
            player.x = 300;
            offScreenTimer = 0;
            godSequenceActive = true;
            godTimer = 0;
            godForm = 1;
            godVisible = true;
            godInteractable = false;
            state = 'GOD_WAIT';
        }
    } else if (room === 'GOD_FIELD' && (player.x < -10 || player.x > 610)) {
        offScreenTimer++;
        if (offScreenTimer > 900) { // 15 seconds at 60fps
            room = 'LEFT';
            player.x = 50;
            offScreenTimer = 0;
        }
    } else {
        offScreenTimer = 0;
    }

    // GOD SEQUENCE LOGIC
    if (godSequenceActive && state === 'GOD_WAIT') {
        godTimer++;
        if (godTimer > 700) { // form 1 stays for 5 seconds
            godForm = 2;
            godInteractable = true;
            state = 'GOD_READY';
        }
    }

    //Casinooo

    // --- CASINO TRANSITIONS ---
    if (room === 'CASINO_LOBBY') {
        // 1. Walk LEFT to enter the Games Room
        if (player.x < -15) {
            room = 'CASINO_GAMES';
            player.x = 580;
        }
        // 2. Walk DOWN to leave the Casino
        if (player.y > 615) {
            room = 'CASINO_PATH';
            player.x = 260; // Appear in front of the door
            player.y = 260;
        }
    }
    else if (room === 'CASINO_GAMES') {
        // Walk RIGHT to go back to the Lobby
        if (player.x > 615) {
            room = 'CASINO_LOBBY';
            player.x = 20;
        }
    }

    // --- ALLEY TO GARDEN ---
    else if (room === 'CASINO_PATH') {
        if (player.x > 615) {
            room = 'GARDEN';
            player.x = 50;
        }
    }

    if (state === 'INTERVENTION') {
        if (elionGhost.stage === 'TELEPORT') { elionGhost.opacity += 0.02; if (elionGhost.opacity >= 1) { elionGhost.x = elionGhost.targetX; elionGhost.y = elionGhost.targetY; elionGhost.stage = 'CHARGE'; elionGhost.timer = 120; } }
        else if (elionGhost.stage === 'CHARGE') { elionGhost.timer--; if (elionGhost.timer <= 0) { elionGhost.stage = 'BLAST'; explosionEffect = { x: customer.x, y: customer.y, size: 0, alpha: 1 }; } }
        else if (elionGhost.stage === 'BLAST') { customer.x += 4; explosionEffect.size += 3; if (customer.x > 700) elionGhost.stage = 'FADE'; }
        else if (elionGhost.stage === 'FADE') { elionGhost.opacity -= 0.015; explosionEffect.alpha -= 0.01; if (elionGhost.opacity <= 0) { state = 'WALK'; elionGhost = null; explosionEffect = null; customer = null; lastCustTime = Date.now(); } }
        return;
    }

    if (state !== 'WALK' && state !== 'GOD_WAIT' && state !== 'GOD_READY') return;
    if (elionSat >= 25) player.speed = 6; else if (elionSat < 20) player.speed = 2.5; else player.speed = 4;
    let perkList = [];
    if (elionSat < 20) perkList.push(t[curLang].perks.tired);
    if (elionSat >= 25) perkList.push(t[curLang].perks.happy);
    if (elionSat >= 50) perkList.push(t[curLang].perks.gilded);
    if (elionSat >= 75) perkList.push(t[curLang].perks.oracle);
    document.getElementById('perks-display').innerText = perkList.join(" | ");

    let mx = 0, my = 0;
    if (keys['KeyW'] || keys['ArrowUp']) my -= player.speed;
    if (keys['KeyS'] || keys['ArrowDown']) my += player.speed;
    if (keys['KeyA'] || keys['ArrowLeft']) mx -= player.speed;
    if (keys['KeyD'] || keys['ArrowRight']) mx += player.speed;

    if (!checkCollision(player.x + mx, player.y + my)) { player.x += mx; player.y += my; player.isMoving = (mx !== 0 || my !== 0); } else player.isMoving = false;

    if (player.x < -15) { if (room === 'CENTER') { room = 'LEFT'; player.x = 580; } else if (room === 'RIGHT') { room = 'CENTER'; player.x = 580; } }
    else if (player.x > 615) { if (room === 'CENTER') { room = 'RIGHT'; player.x = 20; } else if (room === 'LEFT') { room = 'CENTER'; player.x = 20; } }
    else if (player.y < -15 && room === 'CENTER') { room = 'GARDEN'; player.y = 570; }
    else if (player.y > 615 && room === 'GARDEN') { room = 'CENTER'; player.y = 50; }

    // --- ELION'S SHIFT SCHEDULE ---
    let currentMilestone = Math.floor(visitorCount / 20);
    if (currentMilestone > lastMilestoneChecked && currentMilestone > 0) {
        lastMilestoneChecked = currentMilestone;

        if (currentMilestone % 2 === 1) {
            // Odd milestones (20, 60, 100...): Elion comes out (not in a gay way)
            elionLocation = 'WAITING_BAZAAR';
            elionX = 700;
        } else {
            // Even milestones (40, 80, 120...): Elion returns
            elionLocation = 'ROOM_RIGHT';
        }
    }
    if (elionLocation === 'WAITING_BAZAAR') {
        if (elionX > elionTargetX) {
            elionX -= 2; // Walking speed
        }
    }

    /// CHANCES OF CHARACTERS TO APPEAR
    if (room === 'CENTER' && !customer && Date.now() - lastCustTime > 7000) {
        let r = Math.random();
        let role = 'SHOPPER';
        let collectorChance = (activeRumorEffect === "angry_collector") ? 0.15 : 0.05;
        // Fortune seekers only appear when Elion is AWAY
        let elionLeftForVacation = (elionLocation === 'AWAY');

        // Clean probability ranges (0.0 to 1.0)
        if (elionLeftForVacation && r < 0.35) {
            role = 'FORTUNE'; // 35% chance once Elion is on vacation
        } else if (r < 0.02) {
            role = 'RAINBOW'; // 2% chance
        } else if (r < 0.02 + collectorChance) {
            role = 'DEBT';    // 5% (or 15% with rumor) chance
        } else if (r < 0.08) {
            role = 'KIREN';   // ~6% chance
        } else if (r < 0.10) {
            role = 'JESSE';   // ~2% chance
        } else if (r < 0.16) {
            role = 'KIDDO';   // ~6% chance
        } else if (r < 0.70) {
            role = 'GAMBLER'; // ~34% chance
        } else {
            role = 'SHOPPER'; // Remaining percentage
        }

        let skins = [sprCust1, sprCust2, sprCust3];
        let skin = skins[Math.floor(Math.random() * 3)];
        if (role === 'DEBT') skin = sprCollector;
        if (role === 'KIREN') skin = sprKiren;
        if (role === 'KIDDO') skin = sprKiddo;
        if (role === 'JESSE') skin = sprJesse;
        if (role === 'RAINBOW') skin = sprRainbow;
        if (role === 'FORTUNE') skin = skins[Math.floor(Math.random() * 3)];

        customer = {
            x: 300, y: -50, targetY: 140, state: 'IN',
            role: role, skin: skin,
            bet: Math.floor(Math.random() * 40) + 10
        };
    }
    if (customer) {
        if (customer.state === 'IN') { customer.y += 2; if (customer.y >= customer.targetY) { customer.state = 'WAIT'; } }
        else if (customer.state === 'OUT') { if (customer.targetX) customer.x += 4; else customer.y -= 3; if (customer.y < -50 || customer.x > 650) { customer = null; lastCustTime = Date.now(); } }
    }




    if (room === 'GARDEN' && flowers.length < 8 && Date.now() - lastFlowerTime > 8000) {
        let testX = 50 + Math.random() * 500;
        let testY = 120 + Math.random() * 430;

        if (isGrass(testX, testY)) {
            flowers.push({
                x: testX,
                y: testY,
                c: `hsl(${Math.random() * 360}, 80%, 60%)`
            });
            lastFlowerTime = Date.now();
            console.log("🌸 A flower has grown at:", testX, testY);
        } else {
            // If it tried to spawn on a path, let it try again very soon
            lastFlowerTime = Date.now() - 4500;
        }
    }

    // Random Rumor Timer (Changes to a random rumor every 2 minutes)
    if (Date.now() - lastRumorChangeTime > RUMOR_DURATION) {
        // Pick a random index based on the list size
        currentRumorIndex = Math.floor(Math.random() * t.en.rumors.length);

        // Set the effect (always uses the 'en' version's effect key)
        activeRumorEffect = t.en.rumors[currentRumorIndex].effect;

        lastRumorChangeTime = Date.now();
        console.log("New Rumor Active: " + activeRumorEffect);
    }


    if (room === 'GARDEN' && player.x < -15) {
        room = 'CASINO_PATH';
        player.x = 550; // Come in from the right side of the alley
    } else if (room === 'CASINO_PATH' && player.x > 615) {
        room = 'GARDEN';
        player.x = 50; // Go back to the Garden
    }



    //location of charctrs n things
    // Check ranges for the "Press E" hint
    const nearFlower = room === 'GARDEN' && flowers.some(f => Math.hypot(player.x - f.x, player.y - f.y) < 50);
    const nearCust = room === 'CENTER' && customer?.state === 'WAIT' && Math.abs(player.y - customer.y) < 150;
    const nearElion = (room === 'RIGHT' && elionLocation === 'ROOM_RIGHT' && Math.hypot(player.x - 500, player.y - 520) < 120) ||
        (room === 'CENTER' && elionLocation === 'WAITING_BAZAAR' && Math.hypot(player.x - elionX, player.y - elionY) < 120);
    (room === 'CENTER' && Math.hypot(player.x - 500, player.y - 530) < 120);
    const nearShop = room === 'LEFT' && player.y < 450 && Math.abs(player.x - 300) < 150;
    const nearRadio = room === 'CENTER' && Math.hypot(player.x - radioPos.x, player.y - radioPos.y) < 100;
    const nearGod = room === 'GOD_FIELD' && godInteractable && Math.hypot(player.x - 300, player.y - 200) < 150;
    const nearTarot = room === 'RIGHT' && Math.abs(player.x - 300) < 100 && player.y < 420;
    const nearBoard = room === 'GARDEN' && player.x < 260 && player.y < 170;

    // Update the hint display
    document.getElementById('interact-hint').style.display =
        (nearFlower || nearCust || nearElion || nearShop || nearRadio || nearGod || nearBoard || nearTarot) ? 'block' : 'none';
}

function drawJournal() {
    ctx.fillStyle = "rgba(0,0,0,0.85)";
    ctx.fillRect(0, 0, 600, 600);

    const bg = (journalTab === 'characters') ? bgJournalChar : bgJournalTut;
    if (bg.complete && bg.naturalWidth > 0) {
        ctx.drawImage(bg, 50, 50, 500, 500);
    }

    if (journalTab === 'characters') {
        const discovered = Array.from(metCharacters);
        const role = discovered[charPageIndex];
        const data = charLore[role] || { en: "???", ua: "???" };

        // 1. Draw Sprite on Right Page
        let skin = sprCoviello;
        if (role === 'ELION') skin = sprElion;
        else if (role === 'MERCHANT') skin = sprMerchant;
        else if (role === 'KIREN') skin = sprKiren;
        else if (role === 'JESSE') skin = sprJesse;
        else if (role === 'RAINBOW') skin = sprRainbow;
        else if (role === 'KIDDO') skin = sprKiddo;
        else if (role === 'COLLECTOR') skin = sprCollector;
        else if (role === 'SHOPPER') skin = sprCust1;
        else if (role === 'GAMBLER') skin = sprCust3;
        else if (role === 'RECEPTIONIST') skin = sprReceptionist;
        else if (role === 'CASINO_DEALER') skin = sprDealer1;
        else if (role === 'FORTUNE') skin = sprCust4;
        else if (role === 'GOD') skin = sprGod1;

        if (skin.complete) ctx.drawImage(skin, 340, 180, 130, 130);

        // 2. Draw Text on Left Page
        ctx.fillStyle = "#3d251e";
        ctx.textAlign = "left";
        ctx.font = "bold 20px Arial";
        ctx.fillText(role, 115, 200);
        ctx.font = "14px Arial";
        wrapText(data[curLang], 115, 215, 170, 20);

        // 3. PROGRESS BAR (Bottom of Left Page)
        const barX = 115;
        const barY = 460;
        const barW = 150;
        const barH = 12;

        // Bar Background
        ctx.fillStyle = "#d2b48c";
        ctx.fillRect(barX, barY, barW, barH);

        // Bar Fill
        const progress = metCharacters.size / TOTAL_CHARACTERS;
        ctx.fillStyle = "#9b59b6"; // Purple theme
        ctx.fillRect(barX, barY, barW * progress, barH);

        // Bar Outline
        ctx.strokeStyle = "#3d251e";
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, barY, barW, barH);

        // Text
        ctx.fillStyle = "#3d251e";
        ctx.font = "bold 10px Arial";
        ctx.fillText(`${metCharacters.size} / ${TOTAL_CHARACTERS} FOUND`, barX, barY - 5);

        // 4. Visual Arrows
        ctx.fillStyle = "#3d251e";
        ctx.beginPath(); ctx.moveTo(70, 300); ctx.lineTo(90, 280); ctx.lineTo(90, 320); ctx.fill();
        ctx.beginPath(); ctx.moveTo(530, 300); ctx.lineTo(510, 280); ctx.lineTo(510, 320); ctx.fill();
    }
}

// --- MASTER DRAWING LOOP ---
function draw() {


    // --- TAROT MODE OVERRIDE ---
    if (state === 'TAROT' || state === 'TAROT_REVEAL') {
        ctx.clearRect(0, 0, 600, 600);

        // 1. Draw background
        if (bgTarotMode.complete && bgTarotMode.naturalWidth > 0) {
            ctx.drawImage(bgTarotMode, 0, 0, 600, 600);
        } else {
            ctx.fillStyle = "#333"; ctx.fillRect(0, 0, 600, 600); // Dark fallback
        }

        // 2. Draw the pile at the bottom
        tarotDeck.forEach(c => {
            if (!c.selected) {
                ctx.fillStyle = "#fffdf0";
                ctx.fillRect(c.x, c.y, c.w, c.h);
                ctx.strokeStyle = "#3d251e";
                ctx.lineWidth = 2;
                ctx.strokeRect(c.x, c.y, c.w, c.h);
                // Moon design
                ctx.fillStyle = "#ffd700";
                ctx.beginPath(); ctx.arc(c.x + c.w / 2, c.y + c.h / 2, 6, 0, Math.PI * 2); ctx.fill();
            }
        });

        // 3. Draw the spread at the top
        selectedTarotCards.forEach((c, i) => {
            let targetX = 60 + (i * 100); // Top left spread
            let targetY = 60;

            c.x += (targetX - c.x) * 0.1;
            c.y += (targetY - c.y) * 0.1;

            ctx.fillStyle = "#fffdf0";
            ctx.fillRect(c.x, c.y, c.w, c.h);
            ctx.strokeStyle = "#3d251e";
            ctx.strokeRect(c.x, c.y, c.w, c.h);

            if (state === 'TAROT_REVEAL' && tarotRevealIndex > i) {
                ctx.fillStyle = c.data.color;
                ctx.fillRect(c.x + 5, c.y + 5, c.w - 10, c.h - 35);
                ctx.fillStyle = "#3d251e";
                ctx.font = "bold 7px Arial";
                ctx.textAlign = "center";
                ctx.fillText(c.data.name, c.x + c.w / 2, c.y + c.h - 10);
            }
        });
        return; // Stop RPG drawing
    }

    ctx.clearRect(0, 0, 600, 600);

    if (room === 'CENTER') {
        ctx.drawImage(bgBazaar, 0, 0, 600, 600);
        // If Elion came out to complain, draw him waiting on the right side of the bazaar (x: 500, y: 300)
        if (elionLocation === 'WAITING_BAZAAR' && !elionGhost) {
            let isWalking = (elionX > elionTargetX);
            drawEntity(sprElion, elionX, elionY, "ELION", isWalking, '#9b59b6');
        }
        // Radio...
        ctx.fillStyle = '#5d4037'; ctx.fillRect(radioPos.x - 15, radioPos.y - 10, 30, 20);
        ctx.fillStyle = isMusicPlaying ? '#0f0' : '#444'; ctx.beginPath(); ctx.arc(radioPos.x + 10, radioPos.y, 2, 0, Math.PI * 2); ctx.fill();
        if (isMusicPlaying) { ctx.fillStyle = 'white'; ctx.fillText("♪", radioPos.x, radioPos.y - 15 + Math.sin(Date.now() / 200) * 5); }

        if (customer) {
            let lbl = (t[curLang].roles[customer.role.toLowerCase()] || customer.role) + (customer.role === 'GAMBLER' ? ` (${customer.bet})` : '');
            drawEntity(customer.skin, customer.x, customer.y, lbl, customer.state !== 'WAIT', '#e74c3c');
        }

        ctx.fillStyle = hasDeluxeRadio ? '#8b4513' : '#5d4037'; // Slightly shinier brown for deluxe
        ctx.fillRect(radioPos.x - 15, radioPos.y - 10, 30, 20);

        // If deluxe, add a little gold trim
        if (hasDeluxeRadio) {
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 1;
            ctx.strokeRect(radioPos.x - 15, radioPos.y - 10, 30, 20);
        }
    }

    else if (room === 'RIGHT') {
        ctx.drawImage(bgElion, 0, 0, 600, 600);

        if (elionLocation === 'ROOM_RIGHT') {
            drawEntity(sprElion, 500, 520, t[curLang].elion.name, false, '#2ecc71');

            // Friendship Bar Background
            ctx.fillStyle = "#222";
            ctx.fillRect(450, 440, 100, 6);

            // Friendship Bar Fill (FIXED: Added width and height arguments properly)
            ctx.fillStyle = elionSat > 30 ? "#9b59b6" : "#e74c3c";
            ctx.fillRect(450, 440, elionSat, 6);
        } else {
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.font = "italic 12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(curLang === 'en' ? "(He's not here right now...)" : "(Його зараз немає тут)", 500, 520);
        }
    }

    else if (room === 'LEFT') {
        ctx.drawImage(bgShop, 0, 0, 600, 600);
        drawEntity(sprMerchant, 300, 260, t[curLang].merchant.name, false, '#9b59b6');
    }
    else if (room === 'GARDEN') {
        if (bgGarden.complete && bgGarden.naturalWidth > 0) ctx.drawImage(bgGarden, 0, 0, 600, 600);
        flowers.forEach(f => {
            ctx.fillStyle = f.c; ctx.beginPath(); ctx.arc(f.x, f.y, 8, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = "white"; ctx.beginPath(); ctx.arc(f.x, f.y, 3, 0, Math.PI * 2); ctx.fill();
        });
        if (player.x < 250 && player.y < 250) {
            let timeLeft = Math.ceil((RUMOR_DURATION - (Date.now() - lastRumorChangeTime)) / 1000);
            ctx.fillStyle = "white"; ctx.font = "bold 14px Arial"; ctx.textAlign = "center";
            ctx.fillText(t[curLang].journal.read || "Read Board", 110, 100);
            ctx.font = "10px Arial"; ctx.fillText(`${timeLeft}s`, 110, 115);
        }
    }
    else if (room === 'ROMANTIC') {
        if (bgRomantic.complete && bgRomantic.naturalWidth > 0) ctx.drawImage(bgRomantic, 0, 0, 600, 600);
        drawEntity(sprElion, 350, 450, t[curLang].elion.name.split(' ')[0], false, '#2ecc71');
    }
    else if (room === 'GOD_FIELD') {
        if (bgGodField.complete && bgGodField.naturalWidth > 0) ctx.drawImage(bgGodField, 0, 0, 600, 600);
        else { ctx.fillStyle = "#000"; ctx.fillRect(0, 0, 600, 600); }
        if (godVisible) {
            let godImg = godForm === 1 ? sprGod1 : sprGod2;
            drawEntity(godImg, 300, 200, t[curLang].god.name, false, "#fff");
        }
    }
    else if (room === 'CASINO_LOBBY') {
        ctx.drawImage(bgCasinoLobby, 0, 0, 600, 600);
        drawEntity(sprReceptionist, 300, 260, (curLang === 'en' ? "RECEPTIONIST" : "АДМІНІСТРАТОР"), false, '#fff');

        // Draw a small exit arrow or text at the bottom when player is near
        if (player.y > 500) {
            ctx.fillStyle = "white";
            ctx.font = "bold 12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(curLang === 'en' ? "EXIT" : "ВИХІД", 300, 595);
        }
    }

    else if (room === 'CASINO_GAMES') {
        ctx.drawImage(bgCasinoGames, 0, 0, 600, 600);

        // Draw Dealer 1 (Bottom Left)
        drawEntity(sprDealer1, 220, 480, (curLang === 'en' ? "DEALER (100G)" : "ДІЛЕР (100З)"), false, '#fff');
        // Draw Dealer 2 (Top Right)
        drawEntity(sprDealer2, 490, 290, (curLang === 'en' ? "DEALER (200G)" : "ДІЛЕР (200З)"), false, '#fff');
    }


    else if (room === 'CASINO_PATH') {
        // Choose the PNG based on current gold
        let bg = (gold >= 500 || casinoUnlocked) ? bgCasinoOpen : bgCasinoClosed;
        ctx.drawImage(bg, 0, 0, 600, 600);





        // Draw a prompt near the door
        if (Math.hypot(player.x - 260, player.y - 200) < 100) {
            ctx.fillStyle = "white";
            ctx.font = "bold 14px Arial";
            ctx.textAlign = "center";
            ctx.fillText(gold >= 500 ? (curLang === 'en' ? "ENTER" : "УВІЙТИ") : (curLang === 'en' ? "READ" : "ЧИТАТИ"), 260, 150);
        }
    }
    else if (room === 'CASINO_INTERIOR') {
        if (bgCasinoInside.complete && bgCasinoInside.naturalWidth > 0) {
            ctx.drawImage(bgCasinoInside, 0, 0, 600, 600);
        } else {
            ctx.fillStyle = "#111"; // Dark red/black placeholder for casino
            ctx.fillRect(0, 0, 600, 600);
            ctx.fillStyle = "white";
            ctx.fillText("Under Construction...", 300, 300);
        }
    }

    // 3. Special Effects (Intervention/Explosion)
    if (elionGhost) { ctx.globalAlpha = elionGhost.opacity; drawEntity(sprElion, elionGhost.x, elionGhost.y, "ELION", false, '#9b59b6'); ctx.globalAlpha = 1; }
    if (explosionEffect) { ctx.globalAlpha = explosionEffect.alpha; if (sprExplosion.complete) ctx.drawImage(sprExplosion, explosionEffect.x - explosionEffect.size / 2, explosionEffect.y - explosionEffect.size / 2, explosionEffect.size, explosionEffect.size); ctx.globalAlpha = 1; }

    if (state === 'TAROT' || state === 'TAROT_REVEAL') {
        // Dim the background a bit to focus on table
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(0, 0, 600, 600);

        // Draw card pile
        tarotDeck.forEach(c => {
            if (!c.selected) {
                ctx.fillStyle = "#fffdf0";
                ctx.fillRect(c.x, c.y, c.w, c.h);
                ctx.strokeStyle = "#3d251e";
                ctx.lineWidth = 2;
                ctx.strokeRect(c.x, c.y, c.w, c.h);
                // Back design
                ctx.fillStyle = "#ffd700";
                ctx.beginPath(); ctx.arc(c.x + c.w / 2, c.y + c.h / 2, 8, 0, Math.PI * 2); ctx.fill();
            }
        });

        // Draw spread
        selectedTarotCards.forEach((c, i) => {
            let targetX = 100 + (i * 170);
            let targetY = 380;
            c.x += (targetX - c.x) * 0.15;
            c.y += (targetY - c.y) * 0.15;

            ctx.fillStyle = "#fffdf0";
            ctx.fillRect(c.x, c.y, c.w, c.h);
            ctx.strokeStyle = "#3d251e";
            ctx.strokeRect(c.x, c.y, c.w, c.h);

            if (state === 'TAROT_REVEAL' && tarotRevealIndex > i) {
                // Revealed card front
                ctx.fillStyle = c.data.color;
                ctx.fillRect(c.x + 8, c.y + 8, c.w - 16, c.h - 45);
                ctx.fillStyle = "#3d251e";
                ctx.font = "bold 9px Arial";
                ctx.textAlign = "center";
                ctx.fillText(c.data.name, c.x + c.w / 2, c.y + c.h - 15);
            }
        });
    }

    // Draw Player
    let pSkin = sprCoviello;
    if (currentSkin === 'HAT') pSkin = sprCovielloHat;
    if (currentSkin === 'GAMBLER') pSkin = sprCovielloGambler;
    drawEntity(pSkin, player.x, player.y, 'COVIELLO', player.isMoving, '#4a6fa5');

    // Draw Journal overlay
    if (state === 'JOURNAL') {
        drawJournal();
    }
}

// --- HELPER: SPRITE RENDERER ---
function drawEntity(img, x, y, name, walk, color) {
    let b = walk ? Math.sin(Date.now() / 120) * 6 : 0;
    let s = 90;
    let shakeX = 0, shakeY = 0;

    // Jesse Shaking effect
    if (name.includes("JESSE") || name.includes("ДЖЕССІ")) {
        shakeX = (Math.random() - 0.5) * 8;
        shakeY = (Math.random() - 0.5) * 8;
    }

    if (!img || !img.complete || img.naturalWidth === 0) {
        ctx.fillStyle = color;
        ctx.fillRect(x - 30 + shakeX, y - 30 + b + shakeY, 60, 60);
    } else {
        ctx.drawImage(img, x - (s / 2) + shakeX, y - (s / 2) + b + shakeY, s, s);
    }
    ctx.fillStyle = 'white'; ctx.font = 'bold 12px Arial'; ctx.textAlign = 'center';
    ctx.fillText(name, x + shakeX, y - 55 + b + shakeY);
}



function drawArrow(x, y, flip) {
    ctx.save(); ctx.translate(x, y); if (flip) ctx.scale(-1, 1);
    ctx.fillStyle = "#3d251e"; ctx.beginPath();
    ctx.moveTo(-10, -15); ctx.lineTo(10, 0); ctx.lineTo(-10, 15); ctx.fill();
    ctx.restore();
}

function wrapText(text, x, y, maxWidth, lineHeight) {
    let words = text.split(' '), line = '';
    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > maxWidth) {
            ctx.fillText(line, x, y); line = words[n] + ' '; y += lineHeight;
        } else { line = testLine; }
    }
    ctx.fillText(line, x, y);
}
// Safe translation lookup to prevent freezing if strings.js is missing a key
function getStr(category, key, fallback) {
    try {
        if (t[curLang] && t[curLang][category] && t[curLang][category][key]) {
            return t[curLang][category][key];
        }
    } catch (e) { }
    return fallback;
}

function incrementVisitors() {
    visitorCount++;
    document.getElementById('visit-val').innerText = visitorCount;
}


function toggleJournal() {
    journalOpen = !journalOpen;
    state = journalOpen ? 'JOURNAL' : 'WALK';
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}
loop();
