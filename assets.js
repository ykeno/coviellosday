const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');




// The begining
let lastMagicGoldTime = Date.now();
const MAGIC_GOLD_INTERVAL = 30000; // 30 seconds
let hasDeluxeRadio = false;
let elionLocation = 'ROOM_RIGHT'; // 'ROOM_RIGHT', 'WAITING_BAZAAR', 'AWAY'
let lastMilestoneChecked = 0;
let fortuneActive = false;
let currentFortuneCard = null;
let fortuneCorrectIdx = 0;

let gold = 500, inventory = [], room = 'CENTER', state = 'WALK';
let casinoUnlocked = false;
let elionSat = 30, visitorCount = 18;
let lastCustTime = Date.now(), lastFlowerTime = Date.now(), keys = {};
const player = { x: 300, y: 450, color: '#4a6fa5', isMoving: false, speed: 4 };
let customer = null, flowers = [], elionGhost = null, explosionEffect = null;
let kiddoTattling = false;
let isRainbowRound = false;
let pHand = [], dHand = [], deck = [];
let tarotDeck = [];
let selectedTarotCards = [];
let tarotRevealIndex = 0;


let elionX = 700; // Starts off-screen to the right
let elionTargetX = 500; // Where he stops in the Bazaar
let elionY = 300;

// RUMORS
let lastRumorChangeTime = Date.now();
let activeRumorEffect = "none";
let currentRumorIndex = 0;
const RUMOR_DURATION = 120000; // 2 minutes in milliseconds

const rumors = [
    { text: "Rumor: A wealthy Sultan is visiting the bazaar!", effect: "rich_shoppers" },
    { text: "Rumor: The tax collector is in a foul mood today...", effect: "angry_collector" },
    { text: "Rumor: Blue lilies are blooming, Elion loves those.", effect: "flower_boost" },
    { text: "Rumor: Magical rainbows have been spotted near the oasis.", effect: "rainbow_luck" },

    { text: "Rumor: Jesse was seen arguing with a cactus again.", effect: "none" },
    { text: "Rumor: Someone saw a shadow moving in the Void... Creepy.", effect: "none" },
    { text: "Rumor: The Merchant is having a sale on 'slightly' used magic rugs.", effect: "none" },
    { text: "Rumor: Kiren is looking for a map to a city made of gold.", effect: "none" },
];




// TRANSLATIONS
let curLang = 'en';
const t = translations.t;
const charLore = translations.charLore;

function toggleLang() {
    curLang = curLang === 'en' ? 'ua' : 'en';
    document.getElementById('interact-hint').innerText = t[curLang].hint;
    document.getElementById('hit-btn').innerText = t[curLang].bj.hit;
    document.getElementById('stand-btn').innerText = t[curLang].bj.stand;
}



const bgBazaar = new Image();
bgBazaar.src = 'assets/images/input_file_0.png';

const bgElion = new Image();
bgElion.src = 'assets/images/input_file_1.png';

const bgShop = new Image();
bgShop.src = 'assets/images/input_file_2.png';

const bgGarden = new Image();
bgGarden.src = 'assets/images/garden.png';

const bgRomantic = new Image();
bgRomantic.src = 'assets/images/romantic.png';

const bgGodField = new Image();
bgGodField.src = 'assets/images/input_file_3.png';

const bgTarotMode = new Image();
bgTarotMode.src = 'assets/images/tarot_bg.png';

const bgCasinoClosed = new Image();
bgCasinoClosed.src = 'assets/images/casino_closed.png';

const bgCasinoOpen = new Image();
bgCasinoOpen.src = 'assets/images/casino_open.png';

const bgCasinoInside = new Image(); ///////
bgCasinoInside.src = 'assets/images/casino_inside.png';

const bgCasinoLobby = new Image();
bgCasinoLobby.src = 'assets/images/casinolobby.png';

const bgCasinoGames = new Image();
bgCasinoGames.src = 'assets/images/casinogames.png';





// Characters
const sprCoviello = new Image();
sprCoviello.src = 'assets/images/coviello.png';

const sprCovielloHat = new Image();
sprCovielloHat.src = 'assets/images/coviello_hat.png';

const sprCovielloGambler = new Image();
sprCovielloGambler.src = 'assets/images/coviello_gambler.png';

let ownedSkins = ['DEFAULT'];
let currentSkin = 'DEFAULT';

const sprElion = new Image();
sprElion.src = 'assets/images/elion.png';

const sprMerchant = new Image();
sprMerchant.src = 'assets/images/merchant.png';

const sprCust1 = new Image();
sprCust1.src = 'assets/images/customer1.png';

const sprCust2 = new Image();
sprCust2.src = 'assets/images/customer2.png';

const sprCust3 = new Image();
sprCust3.src = 'assets/images/customer3.png';

const sprCust4 = new Image();
sprCust4.src = 'assets/images/customer4.png';

const sprCust5 = new Image();
sprCust5.src = 'assets/images/customer5.png';

const sprCollector = new Image();
sprCollector.src = 'assets/images/collector.png';

const sprKiren = new Image();
sprKiren.src = 'assets/images/kiren.png';

const sprKiddo = new Image();
sprKiddo.src = 'assets/images/kiddo.png';

const sprJesse = new Image();
sprJesse.src = 'assets/images/jesse.png';

const sprRainbow = new Image();
sprRainbow.src = 'assets/images/rainbow.png';

const sprExplosion = new Image();
sprExplosion.src = 'assets/images/explosion.png';

const sprGod1 = new Image();
sprGod1.src = 'assets/images/god1.png';

const sprGod2 = new Image();
sprGod2.src = 'assets/images/god2.png';

const sprDealer1 = new Image();
sprDealer1.src = 'assets/images/dealer1.png';

const sprDealer2 = new Image();
sprDealer2.src = 'assets/images/dealer2.png';

const sprReceptionist = new Image();
sprReceptionist.src = 'assets/images/receptionist.png';





// фіксер на f12
[
    { name: 'Coviello', img: sprCoviello },
    { name: 'Bazaar BG', img: bgBazaar },
    { name: 'Merchant', img: sprMerchant }
].forEach(item => {
    item.img.onload = () => console.log("✅ SUCCESS: Found " + item.name);
    item.img.onerror = () => console.error("❌ ERROR: Cannot find " + item.name + " at " + item.img.src);
});




// Journal variables
let journalOpen = false;
let journalTab = 'characters'; // or 'tutorial'
let charPageIndex = 0;
const TOTAL_CHARACTERS = 10;
let metCharacters = new Set(['COVIELLO']); // Coviello is always met

//Journal Images
const bgJournalChar = new Image(); bgJournalChar.src = 'assets/images/JournalChar.png';
const bgJournalTut = new Image(); bgJournalTut.src = 'assets/images/JournalTut.png';

// God scene variables
let offScreenTimer = 0;
let godSequenceActive = false;
let godTimer = 0;
let godForm = 1;
let godVisible = false;
let godDialogueStep = 0;
let godInteractable = false;

// MUSIC
const tracks = ['assets/audio/track1.mp3', 'assets/audio/track2.mp3', 'assets/audio/track3.mp3', 'assets/audio/track4.mp3', 'assets/audio/track5.mp3', 'assets/audio/track6.mp3', 'assets/audio/track7.mp3', 'assets/audio/track8.mp3', 'assets/audio/track9.mp3', 'assets/audio/track10.mp3'];
let currentTrackIdx = 0;
let isMusicPlaying = false;
const audioPlayer = new Audio();
const radioPos = { x: 125, y: 220, w: 40, h: 30 };

audioPlayer.onended = () => { skipTrack(); };

function toggleMusic() {
    if (!isMusicPlaying) {
        audioPlayer.src = tracks[currentTrackIdx];
        audioPlayer.play().catch(e => console.log("Audio blocked."));
        isMusicPlaying = true;
    } else {
        audioPlayer.pause();
        isMusicPlaying = false;
    }
    openRadioMenu();
}

function skipTrack() {
    // If deluxe, use tracks 0-9 (10 songs). If normal, use tracks 0-6 (7 songs).
    const maxTracks = hasDeluxeRadio ? 10 : 7;
    currentTrackIdx = (currentTrackIdx + 1) % maxTracks;

    if (isMusicPlaying) {
        audioPlayer.src = tracks[currentTrackIdx];
        audioPlayer.play();
    }
    if (state === 'DIALOGUE') openRadioMenu();
}

const masterItems = [
    { name: "Enchanted Candy", cost: 15, sat: 5 },
    { name: "Starlight Tea", cost: 50, sat: 15 },
    { name: "Cosmic Scarf", cost: 80, sat: 25 },
    { name: "Silk Pillow", cost: 60, sat: 20 },
    { name: "Ancient Coin", cost: 100, sat: 25 },
    { name: "Rare Spices", cost: 30, sat: 10 }
];

function drawIcons() {
    const cCtx = document.getElementById('coinIcon').getContext('2d'); cCtx.fillStyle = '#ffd700'; cCtx.fillRect(2, 2, 16, 16);
    const vCtx = document.getElementById('visitorIcon').getContext('2d'); vCtx.fillStyle = '#fff'; vCtx.fillRect(6, 2, 8, 8); vCtx.fillRect(4, 10, 12, 8);
    const gCtx = document.getElementById('giftIcon').getContext('2d'); gCtx.fillStyle = '#8e44ad'; gCtx.fillRect(2, 4, 16, 14);
}


