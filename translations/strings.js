const translations = {
    t: {
        en: {
            hint: "Press [E] or [Enter]",
            rooms: { CENTER: "BAZAAR", LEFT: "SHOP", RIGHT: "ELION'S PILLOWS", GARDEN: "GARDEN", ROMANTIC: "MOONLIGHT", GOD_FIELD: "VOID", CASINO_PATH: "THE BACK ALLEY", CASINO_INTERIOR: "THE OASIS CASINO" },
            perks: { tired: "💤 Tired", happy: "⚡ Happy", gilded: "💰 Gilded Tongue", oracle: "👁️ Oracle's Help" },
            ui: { leave: "Leave", exit: "Exit", back: "Back", next: "Next", thanks: "Thanks!", buy: "Buy", alright: "Alright", clothes: "Clothes", items: "Items" },
            journal: { read: "Read Board" },
            misc: {
                elionVacation: "'Cov, my brain is melting from all these people. I'm going to sleep in the garden. You take over the tarot readings at the stall. Good luck!'",
                bulletinBoard: "BULLETIN BOARD",
                gamblerLabel: "GAMBLER",
                merchantGreeting: "'Hello. What do you wish to buy?'",
                shopperLines: (profit) => [
                    `'These spices... they smell like the mountains of my childhood. I'll pay ${profit} gold for the whole jar.'`,
                    `'This fabric is woven so tightly! It will make a fine cloak. Here, ${profit} gold for your skill.'`,
                    `'I've looked all over the bazaar, but your goods are the finest. Please, take this ${profit} gold.'`,
                    `'A rare find indeed! I didn't expect to see such quality today. Here is ${profit} gold.'`,
                    `'I suppose this will suffice. Here is ${profit} gold.'`,
                    `'Your saffron is the best out of here, Coviello. Take this ${profit} gold.'`,
                    `'This necklace looks ancient! Please, take this ${profit} gold.'`,
                    `'Whatever this is, it smells amazing. Here is your ${profit} gold.'`,
                    `'She will be so happy... Thank you and here is your ${profit} gold.'`,
                    `'I'll buy this small trinket. Here is ${profit} gold.'`,
                    `'This thing looks so cool, damn... There you go, ${profit} gold'`
                ],
                elionIdleLines: [
                    "'Ah, Coviello... my favorite distraction. What is it?'",
                    "'The moon is low, but my eyelids are lower... What do you want?'",
                    "'You smell like bazaar dust and ambition. It's... a grounding scent.'",
                    "'Did you hear the bazaar gossip? Apparently, someone tried to pay with lead painted gold.'",
                    "'Careful where you step, Coviello. I'm testing a new luck charm on the floor.'",
                    "'Quit stealing my clients, you little devil.'",
                    "'I can feel you staring. What do you want?'",
                    "'The sun is bright, but your face is brighter... wait, that came out wrong.'",
                ],
                elionColdLine: "'My magic is cold today, Coviello. Don't ask for much.'",
                elionChatLines: [
                    "'The stars whispered your name earlier. Or maybe it was just a draft.'",
                    "'The bazaar sounds busy today.'",
                    "'It's so nice to rest in the pillows. Wish you could join, lol.'",
                    "'You're like a persistent little beetle. Always scurrying about for coin.'",
                    "'I could fix your luck with a spell, but the ingredients are all the way across the room... so, no.'",
                    "'Coviello, why don't we have dinner with Marien? My hands yearn for artefacts rather than a frying pan today.'",
                    "'The Merchant's 'rare tea' is just dried grass. Don't tell him I know.'",
                    "'I wonder how's Kiren doing... This much stress can't be good for him.'",
                    "'Oh dear Coviello! My hat is wet from the rain. Throw it on the window, please.'",
                    "'Profit is the sun that never sets in this bazaar, huh? How greedy of him. Not that you're better.'",
                    "'Magic is just a shortcut for people who don't want to walk. I've taken many shortcuts today.'",
                    "'Did you check your journal? Whisper [J] and it shall appear.'",
                    "' ;) '"
                ]
            },
            fortune: {
                title: "FORTUNE READING",
                prompt: "Customer: 'Tell me... what does my card mean?'",
                success: (profit) => `'Incredible! That interpretation is so accurate! Here is ${profit} gold!'`,
                failure: (penalty) => `'That makes zero sense... You have no idea what you're doing! Give me back ${penalty} gold!'`,
                goodbye: "Goodbye"
            },

            roles: { shopper: "SHOPPER", gambler: "GAMBLER", debt: "COLLECTOR", kiddo: "KIDDO", kiren: "KIREN", jesse: "JESSE", rainbow: "RAINBOW", fortune: "FORTUNE SEEKER" },
            radio: { name: "OLD RADIO", off: "The radio hums quietly. It looks very old.", on: "Currently playing: Track ", btnOn: "Turn On", btnOff: "Turn Off", btnNext: "Next Track" },
            kiddo: { name: "KIDDO", ask: "'Mister, mister! Have you seen the Enchanted Candy at the shop? Can you get me one? Pleeease?'", give: "Hand over candy", refuse: "I don't have any candy.", thanks: "'WOW! It really is magic! Thank you!'", skip: "She skips away.", meanie: "'MEANIE! I'M TELLING THE WITCH GUY YOU'RE A SCAMMER.'" },
            collector: { name: "COLLECTOR", tax: "'Bazaar protection tax: 100 Gold. Don't make this difficult, Coviello.'", pay: "Pay 100G", refuse: "Refuse to pay.", wait: "Understood." },
            elion: {
                name: "ELION",
                angry: "'Coviello! I heard you were scamming a child! I'm taking my magic back until you prove you've changed.'",
                explain: "Wait, I can explain!",
                cold: "'My magic is cold today, Coviello. Don't ask for much.'",
                chatBtn: "Chat more", goldBtn: "Ask Gold", giftBtn: "Give Gift",
                noMagic: "'I have no energy. My heart is too cold right now.'",
                rich: "'You still have coin, Cov. Save my magic for when you're truly broke.'",
                giveGold: "'*Sigh*... I suppose I can spare some magic for you. Here.'",
                stayCozy: "Stay cozy.",
                giftResponse: (item) => `'A ${item}? Thank you dearly.'`,
            },
            merchant: { name: "THE MERCHANT", buyBtn: (n, c) => `${n} (${c}G)`, noGold: "'No gold!'", bought: (n) => `'Bought ${n}!'` },
            bj: { hit: "HIT (H)", stand: "STAND (S)", win: "WIN", lose: "LOSE", draw: "DRAW" },
            rainbow: { name: "RAINBOW", deck: "'EWWW... What are these cards?? Let's play with my super cool magic Rainbow Deck! ;3'" },
            jesse: { name: "JESSE", yell: "'YOOO, ELIONNN!! I'M STILL ALIVE AND SOUND! YOUR CARDS ARE TELLIN' F##### BULL###T! HAHA!'", calm: "...Calm down." },
            kiren: { name: "KIREN", hi: "'Hey! Glad to see the stall doing well. Tell Elion i said hi!'", bye: "Safe travels!" },
            god: {
                name: "???",
                line1: "You have reached the edge of existence, Coviello. Why?",
                opt1: "I seek truth.",
                opt2: "I got lost.",
                line2: "Truth is a heavy burden for a mortal.",
                line3: "You are not supposed to be here. This is not your story.",
                line4: "Go back. Do not atempt to prevent what is inevitable.",
                line5: "Remember. I am always watching."
            },
            ending: {
                e1: "'I finally understand why you love this view so much, Coviello.'",
                c1: "'It's not just the view. It's the peace... the kind I only find when I'm with you.'",
                e2: "'You're so stubborn. All those flowers and gifts... I suppose I should reward you.'",
                c2: "'I love you, Elie.'",
                e3: "'...I love you too.'",
                c3: "'Huh?'",
                e4: "'Don't make me say it again, it's exhausting.'",
                fin: "The End"
            },
            rumors: [
                { text: "Rumor: A wealthy Sultan is visiting the bazaar!", effect: "rich_shoppers" },
                { text: "Rumor: The tax collector is in a foul mood today...", effect: "angry_collector" },
                { text: "Rumor: Blue lilies, every witch's favorite flowers, are blooming.", effect: "flower_boost" },
                { text: "Rumor: Magical rainbows have been spotted near the oasis.", effect: "rainbow_luck" },
                { text: "Rumor: Aggressive punk boy was seen arguing with a cactus again.", effect: "none" },
                { text: "Rumor: Someone saw a shadow moving in the Void... Creepy.", effect: "none" },
                { text: "Rumor: The Merchant is having a sale on 'slightly' used magic rugs.", effect: "none" },
                { text: "Rumor: Kiren is looking for a map to a city made of gold.", effect: "none" }
            ],


            //CASINO

            casino: {
                sign: "A sign on the door reads: 'High Rollers Only. 500G Entry Fee.'",
                locked: "'You don't have enough gold, Cov. Come back when you're richer.'",
                welcome: "The heavy doors creak open. The air smells like expensive perfume and ozone."
            },
            casinoShop: {
                name: "CASINO RECEPTION",
                welcome: "'Welcome to the Oasis, sir. We offer exclusive luxury items for our high-rollers. Interested?'",
                radioName: "Deluxe Radio",
                radioDesc: "Unlocks 3 hidden premium tracks (Tracks 8-10).",
                bought: "'A wise investment. Your new radio has been delivered to your stall.'",
                alreadyOwned: "'You already possess our finest model, sir.'",
                hatName: "Hat Outfit",
                gamblerName: "Gambler Outfit",
                boughtSkin: "'Excellent choice. Your new outfit has been placed in your closet.'"
            },
            closet: {
                name: "CLOSET",
                desc: "Choose your outfit.",
                DEFAULT: "Default",
                HAT: "Hat Outfit",
                GAMBLER: "Gambler Outfit"
            },

            tarot: {
                name: "THE CARDS",
                prompt: "Stand at the table for a reading.",
                readingName: "ELION'S TAROT",
                was: "What was",
                is: "What is",
                maybe: "What may be",
                end: "'The cards have settled, and so shall I. My pillows are calling, Cov.'",
                deck: [
                    { name: "THE FOOL", desc: "A step into the unknown, Cov. Keep moving, run blindly, but remember the risks.", color: "#c7bc8b" },
                    { name: "THE MAGICIAN", desc: "Take care of your inner world, and the outer world will follow. This reminds me of someone...", color: "#b07a7a" },
                    { name: "THE HIGH PRIESTESS", desc: "Intuition. Listen to your heart. Not everything needs to be said out loud.", color: "#7a84b0" },
                    { name: "THE EMPRESS", desc: "Growth, care, and quiet strength. What you nurture will answer you in time.", color: "#87a38a" },
                    { name: "THE EMPEROR", desc: "Order and control. Power is useful, but it always comes at a cost.", color: "#a88e72" },
                    { name: "THE HIEROPHANT", desc: "Tradition has its place. Some paths are followed because they work, not because they are easy.", color: "#8c8279" },
                    { name: "THE LOVERS", desc: "Love for oneself and one’s surroundings. How interesting...", color: "#ad8793" },
                    { name: "THE WHEEL OF FORTUNE", desc: "Things change whether you like it or not. Luck turns, and it never asks permission.", color: "#a38e6f" },
                    { name: "THE HERMIT", desc: "Time alone brings answers. Not fast, not easily, but they come.", color: "#8a8a8a" },
                    { name: "THE STAR", desc: "Hope is quiet, Cov. It doesn’t shout, but it’s enough to keep you moving.", color: "#779ea3" },
                    { name: "THE MOON", desc: "Things are not as clear as they seem. Trust your instincts, but question them too.", color: "#747f85" },
                    { name: "THE SUN", desc: "Clarity and truth. Everything is out in the open now—whether you’re ready or not.", color: "#c7ac7d" },
                    { name: "JUSTICE", desc: "Everything has consequences, Cov. Not always right away, but the bill always comes.", color: "#b0a07a" },
                    { name: "THE HANGED MAN", desc: "Sometimes the only way forward is to stop. To look at things from a different angle, even if it’s uncomfortable.", color: "#7a8fb0" },
                    { name: "DEATH", desc: "Endings are inevitable. They only make room for something new.", color: "#6f6f6f" },
                    { name: "TEMPERANCE", desc: "Balance isn’t given, it’s maintained. Extremes always demand a price.", color: "#8fb0a0" },
                    { name: "THE DEVIL", desc: "Temptations, fears, and sins. Money makes the world go round~", color: "#8a6f7a" },
                    { name: "THE TOWER", desc: "What seemed solid is crumbling. Find a new path.", color: "#a36f6f" },
                    { name: "JUDGEMENT", desc: "The moment comes to answer for your choices. There’s no avoiding it now.", color: "#9a8fb0" },
                    { name: "THE WORLD", desc: "The cycle is complete. Absolute harmony. You’ve come further than you thought, but this isn’t the end.", color: "#8fa38f" }
                ],

            },

            fortune: {
                title: "FORTUNE READING",
                prompt: "Customer: 'Tell me... what does my card mean?'",
                success: (profit) => `'Incredible! That interpretation is so accurate! Here is ${profit} gold!'`,
                failure: (penalty) => `'That makes zero sense for my business... Give me back ${penalty} gold!'`,
                goodbye: "Goodbye",
                deck: [
                    { name: "THE FOOL", desc: "A risky new venture. Well, the name speaks for itself. Keep an eye on your wallet, friend!", color: "#c7bc8b" },
                    { name: "THE MAGICIAN", desc: "Um... Your inner world is important! It’s essential to think.", color: "#b07a7a" },
                    { name: "THE HIGH PRIESTESS", desc: "Intuition and secret knowledge. Listen to your heart.", color: "#7a84b0" },
                    { name: "THE EMPRESS", desc: "Growth and harvest! Something good is coming soon.", color: "#87a38a" },
                    { name: "THE EMPEROR", desc: "Control and power. Beware of thieves!", color: "#a88e72" },
                    { name: "THE HIEROPHANT", desc: "Traditions and old methods. The cards say you should stay where you are.", color: "#8c8279" },
                    { name: "THE LOVERS", desc: "Oh wow... this means love or a delightful encounter. Good luck!", color: "#ad8793" },
                    { name: "THE WHEEL OF FORTUNE", desc: "Luck. No one knows if your plans will work out, but it’s always worth a try.", color: "#a38e6f" },
                    { name: "THE HERMIT", desc: "Loneliness... I think you should limit your contact with the world.", color: "#8a8a8a" },
                    { name: "THE STAR", desc: "Hope for a profitable week. Or just a wonderful day!", color: "#779ea3" },
                    { name: "THE MOON", desc: "A secret—or perhaps a deception... Be careful.", color: "#747f85" },
                    { name: "THE SUN", desc: "This means the truth. Eventually, everything will be revealed.", color: "#c7ac7d" },
                    { name: "JUSTICE", desc: "Everything has consequences. You or someone you know will soon pay the price.", color: "#b0a07a" },
                    { name: "THE HANGED MAN", desc: "It means... um... a change. It means a change or a different perspective.", color: "#7a8fb0" },
                    { name: "DEATH", desc: "The end. Not necessarily a bad one. Just the end of something old.", color: "#6f6f6f" },
                    { name: "TEMPERANCE", desc: "Balance... Yes, just balance. Everything must be equal.", color: "#8fb0a0" },
                    { name: "THE DEVIL", desc: "Are you a sinner? You'd better stop. Is your foe a sinner? Let them continue and they shall pay!", color: "#8a6f7a" },
                    { name: "THE TOWER", desc: "Everything is collapsing. Let it crash. Look for a different path.", color: "#a36f6f" },
                    { name: "JUDGEMENT", desc: "The time has come to account for your actions.", color: "#9a8fb0" },
                    { name: "THE WORLD", desc: "This one is a wonderful card. You’ve achieved what you wanted or will achieve it soon. Congrats!", color: "#8fa38f" }
                ],
            },




        },
        ua: {
            hint: "Натисніть [E] або [Enter]",
            rooms: { CENTER: "БАЗАР", LEFT: "КРАМНИЦЯ", RIGHT: "ПОКОЇ ЕЛІОНА", GARDEN: "САД", ROMANTIC: "МІСЯЧНЕ СЯЙВО", GOD_FIELD: "ПОРОЖНЕЧА", CASINO_PATH: "ЗАКОУЛОК", CASINO_INTERIOR: "КАЗИНО ОАЗИС" },
            perks: { tired: "💤 Втомлений", happy: "⚡ Щасливий", gilded: "💰 Красномовство", oracle: "👁️ Допомога Оракула" },
            roles: { shopper: "ПОКУПЕЦЬ", gambler: "ГРАВЕЦЬ", debt: "ЗБИРАЧ", kiddo: "ДИТИНА", kiren: "КІРЕН", jesse: "ДЖЕССІ", rainbow: "РЕЙНБОУ", fortune: "ШУКАЧ ДОЛІ" },
            ui: { leave: "Піти", exit: "Вихід", back: "Назад", next: "Далі", thanks: "Дякую!", buy: "Купити", alright: "Гаразд", clothes: "Одяг", items: "Речі" },
            journal: { read: "Прочитати дошку" },
            misc: {
                elionVacation: "'Ков, мій мозок плавиться від усіх цих людей. Я йду по справах. Візьми на себе ворожіння якщо хочеш. Успіхів!'",
                bulletinBoard: "ДОШКА ОГОЛОШЕНЬ",
                gamblerLabel: "ГРАВЕЦЬ",
                merchantGreeting: "'Вітаю. Хочеш щось купити?'",
                shopperLines: (profit) => [
                    `'Ці спеції... вони пахнуть горами мого дитинства. Я заплачу ${profit} золота за всю банку.'`,
                    `'Ця тканина так щільно виткана! З неї вийде чудовий плащ. Ось, ${profit} золота за твою майстерність.'`,
                    `'Я обійшов весь базар, але ваші товари найкращі. Будь ласка, візьміть ці ${profit} золота.'`,
                    `'Справді рідкісна знахідка! Не сподівався побачити сьогодні таку якість. Тримай ${profit} золота.'`,
                    `'Гадаю, це згодиться. Твої ${profit} золота.'`,
                    `'Твій шафран найкращий з усіх, що тут є, Ков'єлло. Тримай ${profit} золота.'`,
                    `'Це намисто виглядає старовинним! Будь ласка, візьми ці ${profit} золота.'`,
                    `'Що б це не було, воно пахне пречудово. Ось вам ${profit} золота.'`,
                    `'Вона буде така щаслива... Дякую, ось вам ${profit} золота.'`,
                    `'Я куплю цю дрібничку. Ось ${profit} золота.'`,
                    `'Ця річ виглядає так круто, чорт... Ось ваші, ${profit} золота.'`
                ],
                elionIdleLines: [
                    "'А, Ков'єлло... мій любий друже. Щось трапилось?'",
                    "'Місяць сьогоні низько, проте мої повіки нижче... Ти щось хотів?'",
                    "'Ти пахнеш пилом базару та амбіціями. Це... заземлюючий аромат.'",
                    "'Ти чув базарні плітки? Кажуть хтось намагався заплатити свинцем пофарбованим под золото.'",
                    "'Дивись під ноги Ков'єлло. Я випробовую нові талісмани.'",
                    "'Перестань красти моїх клієнтів, ти чортюга.'",
                    "'Я відчуваю твій погляд. Чого ти хочеш?'",
                    "'Сонце сяє, але твоє обличчя ще ясніше... добре, ні, це не те що я хотів сказати.'"
                ],
                elionColdLine: "'Моя магія зараз холодна, Ков'єлло. Не проси багато.'",
                elionChatLines: [
                    "'Зірки шепотіли твоє ім'я раніше... Або це був просто вітер.'",
                    "'Базар сьогодні звучить шумно.'",
                    "'Так приємно відпочивати на подушках. Шкода ти не можеш приєднатись, лол.'",
                    "'Ти ніби настирливвий малий джміль. Постійно літаєш за грошима.'",
                    "'Я міг би виправити твою удачу заклинанням, але інгредієнти далеееко в підвалі... тому ні.'",
                    "'Ков'єлло, чому б нам не поїсти в Маріен? Мої руки прагнуть артефактів, а не сковорідок сьогодні.'",
                    "'Рідкісний чай Торговця — це просто висушена трава. Не кажи йому що я знаю.'",
                    "'Цікаво, як там Кірен... Стільки стресу не може бути корисним.'",
                    "'Ох, любий Ков'єлло! Мій капелюх мокрий від дощу. Поклади його на вікно, будь ласка.'",
                    "'Прибуток — це сонце, що ніколи не сідає на цьому базарі, га? Наскільки ж він жадібний. Не те, щоб ти кращий.'",
                    "'Магія це просто рятунок для людей які не хочуть ходити. А мені дуже не хочеться ходити сьогодні.'",
                    "'Чи ти перевіряв свій журнал? Шепни [J] і він з'явиться.'",
                    "' ;) '"
                ]
            },
            fortune: {
                title: "ВОРОЖІННЯ",
                prompt: "Клієнт: 'Скажи мені... що означає моя карта?'",
                success: (profit) => `'Неймовірно! Це тлумачення дуже точне! Ось ${profit} золотих!'`,
                failure: (penalty) => `'Це повна нісенітниця... Ти не маєш гадки, що робиш! Поверни ${penalty} золотих!'`,
                goodbye: "До побачення"
            },
            radio: { name: "СТАРЕ РАДІО", off: "Радіо тихо гуде. Воно виглядає дуже старим.", on: "Зараз грає: Трек ", btnOn: "Увімкнути", btnOff: "Вимкнути", btnNext: "Наступний" },
            kiddo: { name: "ДИТИНА", ask: "'Пане, пане! Ви бачили чарівні цукерки в крамниці? Купите мені одну? Будь лаааска!'", give: "Віддати цукерку", refuse: "У мене немає цукерок.", thanks: "'ОГО! Вони справді чарівні! Дякую!'", skip: "Вона втікає, підстрибуючи.", meanie: "'ЖАДЮГА! Я розкажу твоїй відьмі, що ти шахрай!'" },
            collector: { name: "ЗБИРАЧ", tax: "'Податок за використовування базару: 100 золотих. Не ускладнюй це, Ков'єлло.'", pay: "Сплатити 100З", refuse: "Відмовитись.", wait: "Зрозумів." },
            elion: {
                name: "ЕЛІОН",
                angry: "'Ков'єлло! Як ти міг обікрасти бідну дитину?! Я забираю свою магію, поки ти не доведеш, що змінився.'",
                explain: "Чекай, я поясню!",
                cold: "'Моя магія сьогодні холодна, Ков'єлло. Не проси багато.'",
                chatBtn: "Поговорити", goldBtn: "Просити золота", giftBtn: "Дати дарунок",
                noMagic: "'У мене немає сил. Моє серце зараз занадто холодне.'",
                rich: "'У тебе ще є монети, Ков. Бережи мою магію коли ти справді не матимеш копійки.'",
                giveGold: "'Ехх... Гадаю, я можу виділити тобі трохи магії. Тримай.'",
                stayCozy: "Відпочивай.",
                giftResponse: (item) => `'${item}? Як мило з твого боку.'`,
            },
            merchant: { name: "ТОРГОВЕЦЬ", buyBtn: (n, c) => `${n} (${c}З)`, noGold: "'Немає золота!'", bought: (n) => `'Куплено: ${n}!'` },
            bj: { hit: "ЩЕ (H)", stand: "ДОСИТЬ (S)", win: "ПЕРЕМОГА", lose: "ПРОГРАШ", draw: "НІЧИЯ" },
            rainbow: { name: "РЕЙНБОУ", deck: "'ФЕЕЕ... Що це за карти?? Давайте зіграємо моєю супер-крутою магічною Веселковою Колодою! ;3'" },
            jesse: { name: "ДЖЕССІ", yell: "'ЙОУ, ЕЛІОН! Я ВСЕ ЩЕ ЖИВИЙ І ЗДОРОВИЙ, ЕЛІОН!!1!1 ТВОЇ КАРТИ ЦЕ Ї##### #####'", calm: "...Заспокойся." },
            kiren: { name: "КІРЕН", hi: "'Гей! Радий бачити, що справи йдуть добре. Передавай Еліону привіт!'", bye: "Щасливої дороги!" },
            god: {
                name: "???",
                line1: "Ти досяг краю буття, Ков'єлло. Чому?",
                opt1: "Шукаю істину.",
                opt2: "Я заблукав.",
                line2: "Істина — важка ноша для смертного.",
                line3: "Ти не повинен бути тут. Це не твоя повість.",
                line4: "Повертайся. Не намагайся протидіяти неминучому.",
                line5: "Пам'ятай. Я завжди спостерігаю."
            },
            ending: {
                e1: "'Тепер я розумію, чому ти так любиш цей краєвид, Ков'єлло.'",
                c1: "'Це не тільки краєвид. Це спокій... який я знаходжу лише поруч із тобою.'",
                e2: "'Ти такий впертий. Всі ці квіти і дарунки... Гадаю, я маю тебе винагородити.'",
                c2: "'Я кохаю тебе, Елі.'",
                e3: "'...Я теж тебе кохаю.'",
                c3: "'Га?'",
                e4: "'Не змушуй мене повторювати, це виснажує.'",
                fin: "Кінець"
            },
            rumors: [
                { text: "Плітка: Всевідомий Султан відвідує базар!", effect: "rich_shoppers" },
                { text: "Плітка: Податковий збирач сьогодні в поганому настрої...", effect: "angry_collector" },
                { text: "Плітка: Цвітуть блакитні лілії, улюблені квіти кожної відьми.", effect: "flower_boost" },
                { text: "Плітка: Біля оазису помічали магічні веселки.", effect: "rainbow_luck" },
                { text: "Плітка: Агресивний панк знову сварився з кактусом.", effect: "none" },
                { text: "Плітка: Хтось бачив тінь, що рухається в Порожнечі... Страшно.", effect: "none" },
                { text: "Плітка: Торговець влаштовує розпродаж 'трохи' використаних магічних коврів.", effect: "none" },
                { text: "Плітка: Кірен шукає карту міста зробленого з золота.", effect: "none" }
            ],

            // casino


            casino: {
                sign: "Написано на дверях: 'Тільки для великих гравців. Вхід — 500 золотих.'",
                locked: "'У тебе замало золота, Ков. Повертайся, коли розбагатієш.'",
                welcome: "Важкі двері відчиняються. Повітря пахне дорогими парфумами та озоном."
            },

            casinoShop: {
                name: "РЕЦЕПЦІЯ КАЗИНО",
                welcome: "'Вітаємо в Оазисі, пане. Ми пропонуємо ексклюзивні речі для наших особливих гостей. Вас щось цікавить?'",
                radioName: "Люкс-Радіо",
                radioDesc: "Відкриває 3 приховані преміум-треки (Треки 8-10).",
                bought: "'Мудре вкладення. Ваше нове радіо вже доставлено до вашої лавки.'",
                alreadyOwned: "'Ви вже володієте нашою найкращою моделлю, пане.'",
                hatName: "Капелюх",
                gamblerName: "Одяг гравця",
                boughtSkin: "'Чудовий вибір. Ваш новий одяг покладено у шафу.'"
            },
            closet: {
                name: "ШАФА",
                desc: "Виберіть свій одяг.",
                DEFAULT: "Звичайний",
                HAT: "Капелюх",
                GAMBLER: "Одяг гравця"
            },




            tarot: {
                name: "КАРТИ",
                prompt: "Стань біля столу для ворожіння.",
                readingName: "ТАРО ЕЛІОНА",
                was: "Що було",
                is: "Що є",
                maybe: "Що може бути",
                end: "'Карти заспокоїлись, і я теж заспокоюсь. Подушки кличуть мене, Ков.'",
                deck: [
                    { name: "ДУРЕНЬ", desc: "Крок у невідоме, Ков. Рухайся вперед, біжи наосліп, проте пам'ятай про ризики.", color: "#c7bc8b" },
                    { name: "МАГ", desc: "У тебе вже є все необхідне. Піклуйся про внутрішній світ, і зовнішній піде слідом. Когось це мені нагадує...", color: "#b07a7a" },
                    { name: "ВЕРХОВНА ЖРИЦЯ", desc: "Інтуїція. Слухай серця. Не все потрібно вимовляти вголос.", color: "#7a84b0" },
                    { name: "ІМПЕРАТРИЦЯ", desc: "Зростання, турбота і тиха сила. Те, що ти плекаєш, з часом дасть відповідь.", color: "#87a38a" },
                    { name: "ІМПЕРАТОР", desc: "Порядок і контроль. Влада корисна, але завжди має свою ціну.", color: "#a88e72" },
                    { name: "ІЄРОФАНТ ", desc: "Традиції мають своє місце. Деякі шляхи обирають не тому, що вони легкі, а тому, що вони працюють.", color: "#8c8279" },
                    { name: "ЗАКОХАНІ", desc: "Любов до себе та оточення. Як цікаво...", color: "#ad8793" },
                    { name: "КОЛЕСО ФОРТУНИ", desc: "Все змінюється, хочеш ти цього чи ні. Удача повертається і не питає дозволу.", color: "#a38e6f" },
                    { name: "ВІДШЕЛЬНИК", desc: "Самотність приносить відповіді. Не швидко і не легко, але вони приходять.", color: "#8a8a8a" },
                    { name: "ЗІРКА", desc: "Надія тиха, Ков. Вона не кричить, але її достатньо, щоб рухатися далі.", color: "#779ea3" },
                    { name: "МІСЯЦЬ", desc: "Ілюзія та таємниця. Не все є таким, яким здається у напівтемряві.", color: "#747f85" },
                    { name: "СОНЦЕ", desc: "Ясність і правда. Тепер усе відкрите — готовий ти до цього чи ні.", color: "#c7ac7d" },
                    { name: "СПРАВЕДЛИВІСТЬ", desc: "Усе має наслідки. Не завжди одразу, але рахунок приходить.", color: "#b0a07a" },
                    { name: "ПОВІШЕНИЙ", desc: "Іноді єдиний вихід — зупинитися. Подивитися на все з іншого боку, навіть якщо це незручно.", color: "#7a8fb0" },
                    { name: "СМЕРТЬ", desc: "Кінець неминучий. Але він лише звільняє місце для чогось нового.", color: "#6f6f6f" },
                    { name: "ПОМІРНІСТЬ", desc: "Баланс — це не даність, а робота. Крайнощі завжди мають свою ціну.", color: "#8fb0a0" },
                    { name: "ДИЯВОЛ", desc: "Спокуси, страхи та гріхи. Гроші дзвенять, Ков'єлло.", color: "#8a6f7a" },
                    { name: "ВЕЖА", desc: "Те, що здавалося міцним, руйнується. Шукай нову дорогу.", color: "#a36f6f" },
                    { name: "СУД", desc: "Настає момент відповісти за свої вибори. Уникати більше не вийде.", color: "#9a8fb0" },
                    { name: "СВІТ", desc: "Цикл завершено. Абсолютна гармонія. Ти дійшов далі, ніж думав, але це не кінець дороги.", color: "#8fa38f" }
                ],
            },


            fortune: {
                title: "ВОРОЖІННЯ",
                prompt: "Клієнт: 'Скажи мені... що означає моя карта?'",
                success: (profit) => `'Неймовірно! Це дуже практична порада! Ось ${profit} золотих!'`,
                failure: (penalty) => `'Це жодного стосунку не має до моїх справ... Поверни ${penalty} золотих!'`,
                goodbye: "До побачення",
                deck: [
                    { name: "ДУРЕНЬ", desc: "Ризикована нова справа. Назва сама за себе говорить. Пильнуй гаманець сьогодні, друже.", color: "#c7bc8b" },
                    { name: "МАГ", desc: "Емм... Внутрішній світ це важливо! Важливо думати!", color: "#b07a7a" },
                    { name: "ВЕРХОВНА ЖРИЦЯ", desc: "Інтуїція та прихована інформація. Слухайтесь серця.", color: "#7a84b0" },
                    { name: "ІМПЕРАТРИЦЯ", desc: "Зростання та врожай! Скоро трапиться щось хороше.", color: "#87a38a" },
                    { name: "ІМПЕРАТОР", desc: "Контроль і влада. Остерігайся грабіжників!", color: "#a88e72" },
                    { name: "ІЄРОФАНТ ", desc: "Традиції і старі методи. Карти кажуть що варто залишитись там де ви є.", color: "#8c8279" },
                    { name: "ЗАКОХАНІ", desc: "Охох, це значить любов або чудове знайомство.", color: "#ad8793" },
                    { name: "КОЛЕСО ФОРТУНИ", desc: "Удача. Ніхто не знає чи вами задумане трапиться але завжди варто спробувати.", color: "#a38e6f" },
                    { name: "ВІДШЕЛЬНИК", desc: "Самотність... Я гадаю вам варто обмежити контакт зі світом.", color: "#8a8a8a" },
                    { name: "ЗІРКА", desc: "Надія на прибутковий тиждень. Або просто на чудовий день!", color: "#779ea3" },
                    { name: "МІСЯЦЬ", desc: "Таємниця а може й обман... Будь обережним", color: "#747f85" },
                    { name: "СОНЦЕ", desc: "Це значить правда. Згодом усе буде відкрито.", color: "#c7ac7d" },
                    { name: "СПРАВЕДЛИВІСТЬ", desc: "Усе має наслідки. Ви або ваш знайомий скоро поплатяться.", color: "#b0a07a" },
                    { name: "ПОВІШЕНИЙ", desc: "Це було... мх... зміна. Це значить зміна і інша перспектива.", color: "#7a8fb0" },
                    { name: "СМЕРТЬ", desc: "Кінець. Не обов'язково поганий. Просто кінець старого.", color: "#6f6f6f" },
                    { name: "ПОМІРНІСТЬ", desc: "Баланс... Так, просто баланс. Все має бути рівним.", color: "#8fb0a0" },
                    { name: "ДИЯВОЛ", desc: "Грішите? Краще перестати. Грішить ваш ворог? Нехай продовжує, це може піти вам на користь.", color: "#8a6f7a" },
                    { name: "ВЕЖА", desc: "Все руйнується. Нехай падає. Знайдіть іншу дорогу.", color: "#a36f6f" },
                    { name: "СУД", desc: "Настає момент відповісти за свої вибори.", color: "#9a8fb0" },
                    { name: "СВІТ", desc: "Це насправді дуже хороша карта. Ви досягли чого мали або скоро досягенете. Вітаю!", color: "#8fa38f" }
                ]
            }



        }
    },





    charLore: {
        'COVIELLO': { en: "A sly merchant trying to make a living in the bazaar.", ua: "Хитрий торговець, що намагається заробити на життя на базарі." },
        'ELION': { en: "Your neighbour-friend-colleague. The laziest witch in the whole wide world.", ua: "Твій сусід-друг-колега. Найленивіший відьмак на весь білий світ." },
        'MERCHANT': { en: "Your rival? Or just a businessman? He values gold above all else.", ua: "Конкурент чи просто бізнесмен? Він цінує золото понад усе." },
        'KIREN': { en: "A wandering friend. He travels the world but always returns to the stall.", ua: "Мандрівний друг. Він подорожує світом, але завжди повертається до лавки." },
        'JESSE': { en: "A loud punk who thinks magic is a scam. Has some problem with Elion.", ua: "Гучний панк, який вважає магію обманом. Має якісь проблеми з Еліоном." },
        'KIDDO': { en: "A chaotic child. Give her candy or prepare for a friendship disaster.", ua: "Хаотична дитина. Дай їй цукерку або готуйся до краху дружби." },
        'RAINBOW': { en: "A magical entity of pure color. Her cards are truly beautiful.", ua: "Магічна сутність із чистих кольорів. Її карти справді прекрасні." },
        'GOD': { en: "&3/O# ?????????? @js+@", ua: "&3/O# ?????????? @js+@" },
        'COLLECTOR': { en: "The tax collector. He doesn't care about your stories, only your gold.", ua: "Збирач податків. Його не цікавлять твої історії, лише твоє золото." },
        'SHOPPER': { en: "A typical citizen looking for spices and fine fabrics.", ua: "Звичайний містянин, що шукає спеції та гарні тканини." },
        'GAMBLER': { en: "Someone looking to turn a few coins into a fortune at your table.", ua: "Той, хто хоче перетворити кілька монет на багатство за твоїм столом." },
        'RECEPTIONIST': { en: "Keeps the high rollers in check and the casino running smoothly.", ua: "Стежить за порядком серед великих гравців і безперебійною роботою казино." },
        'CASINO_DEALER': { en: "Professional, unflappable, and always holding a winning hand.", ua: "Професійний, непохитний і завжди з виграшною рукою." },
        'FORTUNE': { en: "Curious souls seeking answers in the cards. They pay well for a good reading.", ua: "Допитливі душі, які шукають відповідей у картах. Вони добре платять за ворожіння." }
    }

};
