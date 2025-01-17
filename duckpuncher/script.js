// Initialize the game state
let points = 0;
let clickValue = 1; // Initial click value
let autoClickValue = 0

let clickUpgradeCost = 10; // Cost to upgrade click value
let clickUpgradeLevel = 0; // Upgrade level

let tysonValue = 1; // Initial auto-click value
let autoClickCost = 30; // Cost to purchase auto-click upgrade
let autoClickLevel = 0; // Auto-click upgrade level

let hydraulicCost = 1500;
let hydraulicLevel = 0;
let hydraulicValue = 5;

let pistolCost = 500;
let pistolLevel = 0;
let pistolValue = 5;

let frenchCost = 25000;
let frenchLevel = 0;
let frenchValue = 50;

let chineseCost = 45000;
let chineseLevel = 0;
let chineseValue = 33;

let nukeCost = 696969
let nukeLevel = 0
let nukeValue = 500

let laserCost = 1500000
let laserLevel = 0
let laserValue = 333

let sunCost = 45000000
let sunLevel = 0
let sunValue = 5000

let holeCost = 100000000
let holeLevel = 0
let holeValue = 3300

let portalCost = 2500000000
let portalLevel = 0
let portalValue = 50000

let warCost = 7000000000
let warLevel = 0
let warValue = 33300

let huntCost = 150000000000
let huntLevel = 0
let huntValue = 500000

let puntCost = 350000000000
let puntLevel = 0
let puntValue = 333300

let gooseCost = 7000000000000
let gooseLevel = 0
let gooseValue = 5000000

let swanCost = 350000000000
let swanLevel = 0
let swanValue = 15000000000000

let duckimage = 'duck_1.png';
let punchedduckimage = 'duck 2.png';
let SombreroCost = 85000
let WandCost = 4000
let CyborgCost = 2000000
let RubberCost = 300000000
let pirateCost = 15000000000
let stuffedCost = 600000000000
let baseballCost = 5000000000000

let skinmultiplier = 1;

let sombreroBought = false;
let wizardBought = false;
let cyborgBought = false
let rubberBought = false
let pirateBought = false
let stuffedBought = false
let baseballBought = false

let sombreroMultiplierApplied = false;
let wizardMultiplierApplied = false;
let cyborgMultiplierApplied = false
let rubberMultiplierApplied = false;
let pirateMultiplierApplied = false;
let stuffedMultiplierApplied = false;
let baseballMultiplierApplied = false;

let musicplaying = false;
let quackcount = 0;
let musicNumber = 0;
let sfxon = true;

let multiplier = 1

function getlength(number) {
    return number.toString().length;
}

async function rebirthmultiplier() {
    points -= 69000000
    if (points<0) {
        points = 0
    }
    multiplier = (multiplier + (getlength(points)/3))
    multiplier = Math.round(multiplier)

}
document.addEventListener('DOMContentLoaded', function() {

    const tooltips = document.querySelectorAll('.tooltip');

    function sfxswap () {
        if (sfxon == true) {
            sfxon = false
        }
        else {
            sfxon = true
        }
    }
 
    document.getElementById('click-button').addEventListener('click', function () {
        if (sfxon == true) {
            let mySound = new Audio('punch.mp3');
            mySound.play();
        }

        let mySound2 = new Audio('duckMusic.mp3');
        let mySound3 = new Audio('quack.mp3');
        let mySound4 = new Audio('wizardMusic.mp3');
        let mySound5 = new Audio('mariachiMusic.mp3');
        let mySound6 = new Audio('cyborgMusic.mp3');
        let mySound7 = new Audio('rubberMusic.mp3');
        let mySound8 = new Audio('pirateMusic.mp3');
        let mySound9 = mySound5
        let mySound10 = new Audio('baseballMusic.mp3');

        if (quackcount <= 3) {
            quackcount++;
        }
        else {
            if (sfxon == true) {
                quackcount = 0;
                mySound3.play();
            }
        }

        if (!musicplaying) {
            musicplaying=true;
            if (musicNumber == 1) {
                mySound4.play();

                // Use setTimeout to wait for 66 seconds (66000 milliseconds)
                setTimeout(function () {
                    musicplaying = false;
                }, 66000);
            }
            else if (musicNumber == 2) {
                mySound5.play();

                // Use setTimeout to wait for 66 seconds (66000 milliseconds)
                setTimeout(function () {
                    musicplaying = false;
                }, 94000);
            }
            else if (musicNumber == 3) {
                mySound6.play();

                // Use setTimeout to wait for 66 seconds (66000 milliseconds)
                setTimeout(function () {
                    musicplaying = false;
                }, 126000);
            }
            else if (musicNumber == 4) {
                mySound7.play();

                // Use setTimeout to wait for 66 seconds (66000 milliseconds)
                setTimeout(function () {
                    musicplaying = false;
                }, 120000);
            }
            else if (musicNumber == 5) {
                mySound8.play();

                // Use setTimeout to wait for 66 seconds (66000 milliseconds)
                setTimeout(function () {
                    musicplaying = false;
                }, 85000);
            }
            else if (musicNumber == 6) {
                mySound9.play();

                // Use setTimeout to wait for 66 seconds (66000 milliseconds)
                setTimeout(function () {
                    musicplaying = false;
                }, 134000);
            }
            else if (musicNumber == 7) {
                mySound10.play();

                // Use setTimeout to wait for 66 seconds (66000 milliseconds)
                setTimeout(function () {
                    musicplaying = false;
                }, 40000);
            }
            else {
                mySound2.play();

                // Use setTimeout to wait for 66 seconds (66000 milliseconds)
                setTimeout(function () {
                    musicplaying = false;
                }, 60000);
            }
        }
    });


    // Function to change duck image to sombrero duck
    async function sombreroDuck() {
        if (!sombreroBought && points >= SombreroCost) {
            points -= SombreroCost;
            duckimage = 'mariachiDuck.png';
            document.getElementById('click-button').src = 'mariachiduck.png';
            punchedduckimage = 'punchedMariachi.png';
            musicNumber = 2;
            document.getElementById('musicname').textContent = "royalty free mariachi music";

            // Multiply clickValue and autoClickValue by 2 only if the multiplier hasn't been applied
            if (!sombreroMultiplierApplied) {
                clickValue *= 2;
                autoClickValue *= 2;
                skinmultiplier *=2;
                sombreroMultiplierApplied = true; // Mark the multiplier as applied
                document.getElementById('sombrero').src = 'sombreroAcquired.png';
            }

            sombreroBought = true;
            updatePoints();
        }
    }

    // Function to change duck image to sombrero duck
    async function cyborgDuck() {
        if (!cyborgBought && points >= CyborgCost) {
            points -= CyborgCost;
            duckimage = 'cyborgDuck.png';
            document.getElementById('click-button').src = 'cyborgDuck.png';
            punchedduckimage = 'painedCyborgDuck.png';
            musicNumber = 3;
            document.getElementById('musicname').textContent = "royalty free futuristic music";

            // Multiply clickValue and autoClickValue by 2 only if the multiplier hasn't been applied
            if (!cyborgMultiplierApplied) {
                clickValue *= 2;
                autoClickValue *= 2;
                skinmultiplier *=2;
                cyborgMultiplierApplied = true; // Mark the multiplier as applied
                document.getElementById('cyborg').src = 'circuitAcquired.png';
            }

            cyborgBought = true;
            updatePoints();
        }
    }

    // Function to change duck image to wizard duck
    async function wizardDuck() {
        if (!wizardBought && points >= WandCost) {
            points -= WandCost;
            duckimage = 'wizardDuck.png';
            document.getElementById('click-button').src = 'wizardDuck.png';
            punchedduckimage = 'punchedWizard.png';
            musicNumber = 1;
            document.getElementById('musicname').textContent = "royalty free fantasy music";

            // Multiply clickValue and autoClickValue by 2 only if the multiplier hasn't been applied
            if (!wizardMultiplierApplied) {
                clickValue *= 2;
                autoClickValue *= 2;
                skinmultiplier *=2;
                wizardMultiplierApplied = true; // Mark the multiplier as applied
                document.getElementById('wand').src = 'wandAcquired.png';
            }

            wizardBought = true;
            updatePoints();
        }
    }

    // Function to change duck image to rubber duck
    async function rubberDuck() {
        if (!rubberBought && points >= RubberCost) {
            points -= RubberCost;
            duckimage = 'yellowRubber.png';
            document.getElementById('click-button').src = 'yellowRubber.png';
            punchedduckimage = 'redRubber.png';
            musicNumber = 4;
            document.getElementById('musicname').textContent = "Angry Birds Sandstorm by Darude";

            // Multiply clickValue and autoClickValue by 2 only if the multiplier hasn't been applied
            if (!rubberMultiplierApplied) {
                clickValue *= 2;
                autoClickValue *= 2;
                skinmultiplier *=2;
                rubberMultiplierApplied = true; // Mark the multiplier as applied
                document.getElementById('rubber').src = 'rubberAcquired.png';
            }

            rubberBought = true;
            updatePoints();
        }
    }

    async function pirateDuck() {
        if (!pirateBought && points >= pirateCost) {
            points -= pirateCost;
            duckimage = 'pirateDuck1.png';
            document.getElementById('click-button').src = 'pirateDuck1.png';
            punchedduckimage = 'PirateDuck2.png';
            musicNumber = 5;
            document.getElementById('musicname').textContent = "royalty free pirate music";

            // Multiply clickValue and autoClickValue by 2 only if the multiplier hasn't been applied
            if (!pirateMultiplierApplied) {
                clickValue *= 2;
                autoClickValue *= 2;
                skinmultiplier *=2;
                pirateMultiplierApplied = true; // Mark the multiplier as applied
                document.getElementById('pirate').src = 'pirateHatAcquired.png';
            }

            pirateBought = true;
            updatePoints();
        }
    }

    async function stuffedDuck() {
        if (!stuffedBought && points >= stuffedCost) {
            points -= stuffedCost;
            duckimage = 'stuffedDuck.png';
            document.getElementById('click-button').src = 'stuffedDuck.png';
            punchedduckimage = 'stuffedDuck2.png';
            musicNumber = 6;
            document.getElementById('musicname').textContent = "";

            // Multiply clickValue and autoClickValue by 2 only if the multiplier hasn't been applied
            if (!pirateMultiplierApplied) {
                clickValue *= 2;
                autoClickValue *= 2;
                skinmultiplier *=2;
                stuffedMultiplierApplied = true; // Mark the multiplier as applied
                document.getElementById('stuffed').src = 'stuffedAcquired.png';
            }

            stuffedBought = true;
            updatePoints();
        }
    }

    async function baseballDuck() {
        if (!baseballBought && points >= baseballCost) {
            points -= baseballCost;
            duckimage = 'baseballDuck.png';
            document.getElementById('click-button').src = 'baseballDuck.png';
            punchedduckimage = 'baseballDuck2.png';
            musicNumber = 7;
            document.getElementById('musicname').textContent = "Take me out to the ballgame";

            // Multiply clickValue and autoClickValue by 2 only if the multiplier hasn't been applied
            if (!baseballMultiplierApplied) {
                clickValue *= 2;
                autoClickValue *= 2;
                skinmultiplier *=2;
                baseballMultiplierApplied = true; // Mark the multiplier as applied
                document.getElementById('baseball').src = 'batAcquired.png';
            }

            baseballBought = true;
            updatePoints();
        }
    }

    function formatNumber(num) {
        const suffixes = ["", "K", "M", "B", "T", "QA", "QI", "SX", "SP", "OC", "NO", "DE"];
        let tier = Math.log10(Math.abs(num)) / 3 | 0;
        if (tier == 0) return num;
        const suffix = suffixes[tier];
        const scale = Math.pow(10, tier * 3);
        const scaled = num / scale;
        return scaled.toFixed(1) + suffix;
    }

    // Function to update the point count and display
    function updatePoints() {

        document.getElementById('point-count').textContent = formatNumber(points);
        document.getElementById('click-value').textContent = formatNumber(clickValue);
        document.getElementById('autoClick-value').textContent = formatNumber(autoClickValue);
    }

    // Function to handle the click event
    async function click() {
        points += (clickValue * multiplier);
        updatePoints();
        document.getElementById('click-button').src = punchedduckimage;
        await wait(250);
        document.getElementById('click-button').src = duckimage; // Corrected this line
    }

    // Function to handle the click event
    async function clickCheat() {
        points += 100000000000000000000;
        updatePoints();
    }

    // Function to handle the upgrade click event
    function upgradeClick() {
        if (points >= clickUpgradeCost) {
            points -= clickUpgradeCost;
            clickUpgradeLevel++;
            clickUpgradeCost = Math.round(clickUpgradeCost * 1.2);

            clickValue += (skinmultiplier * .5) ; // You can adjust this formula as needed
            updatePoints();
            updateAnyButton('clickUpgradeCost', clickUpgradeCost, 'clickUpgradeCount', clickUpgradeLevel);
            knucklePicture();
        }
    }

    // Function to handle the Autoclick upgrade event
    function upgradeAutoClick() {
        if (points >= autoClickCost) {
            points -= autoClickCost;
            autoClickLevel++;
            autoClickCost = Math.round(autoClickCost * 1.2);
            autoClickValue += (skinmultiplier * tysonValue);

            tysonPicture();
            updatePoints();
            updateAnyButton('autoClickCost', autoClickCost, 'autoClickCount', autoClickLevel);
        }
    }

    // Function to handle the Hydraulic upgrade event
    function upgradeHydraulic() {
        if (points >= hydraulicCost) {
            points -= hydraulicCost;
            hydraulicLevel++;
            hydraulicCost = Math.round(hydraulicCost * 1.2);
            autoClickValue += (skinmultiplier * hydraulicValue);

            hydraulicPicture();
            updatePoints();
            updateAnyButton('hydraulicCost', hydraulicCost, 'hydraulicCount', hydraulicLevel);
        }
    }

    // Function to handle the Pistol upgrade event
    function upgradePistol() {
        if (points >= pistolCost) {
            points -= pistolCost;
            pistolLevel++;
            pistolCost = Math.round(pistolCost * 1.2);
            clickValue += (skinmultiplier * pistolValue);

            updatePoints();
            updateAnyButton('pistolCost', pistolCost, 'pistolCount', pistolLevel);
            gunPicture();
        }
    }

    // Function to handle the French upgrade event
    function upgradeFrench() {
        if (points >= frenchCost) {
            points -= frenchCost;
            frenchLevel++;
            frenchCost = Math.round(frenchCost * 1.2);
            clickValue += (skinmultiplier * frenchValue);

            updatePoints();
            updateAnyButton('frenchCost', frenchCost, 'frenchCount', frenchLevel);
            frenchPicture();
        }
    }

    // Function to handle the Chinese upgrade event
    function upgradeChinese() {
        if (points >= chineseCost) {
            points -= chineseCost;
            chineseLevel++;
            chineseCost = Math.round(chineseCost * 1.2);
            autoClickValue += (skinmultiplier * chineseValue);

            updatePoints();
            updateAnyButton('chineseCost', chineseCost, 'chineseCount', chineseLevel);
            chinesePicture();
        }
    }

    // Function to handle the Nuke upgrade event
    function upgradeNuke() {
        if (points >= nukeCost) {
            points -= nukeCost;
            nukeLevel++;
            nukeCost = Math.round(nukeCost * 1.5);
            clickValue += (skinmultiplier * nukeValue);

            updatePoints();
            updateAnyButton('nukeCost', nukeCost, 'nukeCount', nukeLevel);
            nukePicture();
        }
    }

    // Function to handle the Laser upgrade event
    function upgradeLaser() {
        if (points >= laserCost) {
            points -= laserCost;
            laserLevel++;
            laserCost = Math.round(laserCost * 1.2);
            autoClickValue += (skinmultiplier * laserValue);

            updatePoints();
            updateAnyButton('laserCost', laserCost, 'laserCount', laserLevel);
            laserPicture();
        }
    }

    // Function to handle the Sun upgrade event
    function upgradeSun() {
        if (points >= sunCost) {
            points -= sunCost;
            sunLevel++;
            sunCost = Math.round(sunCost * 1.2);
            clickValue += (skinmultiplier * sunValue);

            updatePoints();
            updateAnyButton('sunCost', sunCost, 'sunCount', sunLevel);
            sunPicture();
        }
    }

    // Function to handle the Laser upgrade event
    function upgradeHole() {
        if (points >= holeCost) {
            points -= holeCost;
            holeLevel++;
            holeCost = Math.round(holeCost * 1.2);
            autoClickValue += (skinmultiplier * holeValue);

            updatePoints();
            updateAnyButton('holeCost', holeCost, 'holeCount', holeLevel);
            holePicture();
        }
    }
    
    // Function to handle the Sun upgrade event
    function upgradePortal() {
        if (points >= portalCost) {
            points -= portalCost;
            portalLevel++;
            portalCost = Math.round(portalCost * 1.2);
            clickValue += (skinmultiplier * portalValue);
    
            updatePoints();
            updateAnyButton('portalCost', portalCost, 'portalCount', portalLevel);
            portalPicture();
        }
    }

    // Function to handle the Laser upgrade event
    function upgradeWar() {
        if (points >= warCost) {
            points -= warCost;
            warLevel++;
            warCost = Math.round(warCost * 1.2);
            autoClickValue += (skinmultiplier * warValue);

            updatePoints();
            updateAnyButton('warCost', warCost, 'warCount', warLevel);
            warPicture();
        }
    }

    // Function to handle the Sun upgrade event
    function upgradeHunt() {
        if (points >= huntCost) {
            points -= huntCost;
            huntLevel++;
            huntCost = Math.round(huntCost * 1.2);
            clickValue += (skinmultiplier * huntValue);
    
            updatePoints();
            updateAnyButton('huntCost', huntCost, 'huntCount', huntLevel);
            huntPicture();
        }
    }

    // Function to handle the Laser upgrade event
    function upgradePunt() {
        if (points >= puntCost) {
            points -= puntCost;
            puntLevel++;
            puntCost = Math.round(puntCost * 1.2);
            autoClickValue += (skinmultiplier * puntValue);

            updatePoints();
            updateAnyButton('puntCost', puntCost, 'puntCount', puntLevel);
            puntPicture();
        }
    }

    // Function to handle the Sun upgrade event
    function upgradeGoose() {
        if (points >= gooseCost) {
            points -= gooseCost;
            gooseLevel++;
            gooseCost = Math.round(gooseCost * 1.2);
            clickValue += (skinmultiplier * gooseValue);
    
            updatePoints();
            updateAnyButton('gooseCost', gooseCost, 'gooseCount', gooseLevel);
            goosePicture();
        }
    }

    // Function to handle the Laser upgrade event
    function upgradeSwan() {
        if (points >= swanCost) {
            points -= swanCost;
            swanLevel++;
            swanCost = Math.round(swanCost * 1.2);
            autoClickValue += (skinmultiplier * swanValue);

            updatePoints();
            updateAnyButton('swanCost', swanCost, 'swanCount', swanLevel);
            swanPicture();
        }
    }
    
    // image preloading

    const image1 = new Image();
    image1.src = 'deadduck1.png';
    const image2 = new Image();
    image2.src = 'punchedDuck.png';
    const image3 = new Image();
    image3.src = 'tysonKill.png';
    const image4 = new Image();
    image4.src = 'duckShot1.png';
    const image5 = new Image();
    image5.src = 'duckShot2.png';
    const image6 = new Image();
    image6.src = 'duckShot3.png';
    const image7 = new Image();
    image7.src = 'duckShot4.png';
    const image8 = new Image();
    image8.src = 'pekingduck2.png';
    const image9 = new Image();
    image9.src = 'boiledduck.png';
    const image10 = new Image();
    image10.src = 'nukedDuck.png';
    const image11 = new Image();
    image11.src = 'laseredDuck.png';
    const image12 = new Image();
    image12.src = 'slicedDuck2.png';
    const image13 = new Image();
    image13.src = 'slicedDuck1.png';
    const image14 = new Image();
    image14.src = 'duckventHorizon.png';
    const image15 = new Image();
    image15.src = 'punchedWizard.png';
    const image16 = new Image();
    image16.src = 'punchedMariachi.png';
    const image17 = new Image();
    image17.src = 'painedCyborgDuck.png';
    const image18 = new Image();
    image18.src = 'redRubber.png';
    const image19 = new Image();
    image19.src = 'mariachiDuck.png';
    const image20 = new Image();
    image20.src = 'wizardDuck.png';
    const image21 = new Image();
    image21.src = 'yellowRubber.png';
    const image22 = new Image();
    image22.src = 'cyborgDuck.png';
    const image23 = new Image();
    image23.src = 'duck 2.png';
    const image24 = new Image();
    image24.src = 'duckPortals.png';
    const image26 = new Image();
    image26.src = 'warduck2.jpeg';
    const image27 = new Image();
    image27.src = 'miketyson.jpeg';
    const image28 = new Image();
    image28.src = 'hydraulicduck.png';
    const image29 = new Image();
    image29.src = 'pekingduck.jpeg';
    const image25 = new Image();
    image25.src = 'lasercannon.jpeg';
    const image30 = new Image();
    image30.src = 'duckHole.png';
    const image31 = new Image();
    image31.src = 'warduck.jpeg';
    const image32 = new Image();
    image32.src = 'pirateDuck1.png';
    const image33 = new Image();
    image33.src = 'pirateDuck2.png';
    const image34 = new Image();
    image34.src = 'puntFired.jpeg';
    const image35 = new Image();
    image35.src = 'duckHunter2.png';
    const image36 = new Image();
    image36.src = 'stuffedDuck.png';
    const image37 = new Image();
    image37.src = 'stuffedDuck2.png';
    

    async function hydraulicPicture() {;
        document.getElementById('hydraulic-button').src = 'deadduck1.png';
        await wait(500);
        document.getElementById('hydraulic-button').src = 'hydraulicduck.png';
    }

    async function knucklePicture() {
        document.getElementById('upgrade-button').src = 'punchedDuck.png';
        await wait(500);
        document.getElementById('upgrade-button').src = 'brass knuckles.jpeg';
    }

    async function tysonPicture() {

        document.getElementById('auto-click-button').src = 'tysonKill.png';
        await wait(500);
        document.getElementById('auto-click-button').src = 'miketyson.jpeg';
    }

    async function gunPicture() {
        document.getElementById('pistol-button').src = 'duckShot1.png';
        await wait(100);
        document.getElementById('pistol-button').src = 'duckShot2.png';
        await wait(100);
        document.getElementById('pistol-button').src = 'duckShot3.png';
        await wait(100);
        document.getElementById('pistol-button').src = 'duckShot4.png';
        await wait(500);
        document.getElementById('pistol-button').src = 'Gun.jpeg';
    }


    async function chinesePicture() {
        document.getElementById('chinese-button').src = 'pekingduck2.png';
        await wait(1000);
        document.getElementById('chinese-button').src = 'pekingduck.jpeg';
    }

    async function frenchPicture() {
        document.getElementById('french-button').src = 'boiledduck.png';
        await wait(1000);
        document.getElementById('french-button').src = 'French1.jpeg';
    }

    async function nukePicture() {
        document.getElementById('nuke-button').src = 'nukedDuck.png';
        await wait(500);
        document.getElementById('nuke-button').src = 'losDuckamos.png';
    }

    async function laserPicture() {
        document.getElementById('laser-button').src = 'laseredDuck.png';
        await wait(500);
        document.getElementById('laser-button').src = 'lasercannon.jpeg';
    }

    async function sunPicture() {
        document.getElementById('sun-button').src = 'slicedDuck2.png';
        await wait(300);
        document.getElementById('sun-button').src = 'slicedDuck1.png';
        await wait(500);
        document.getElementById('sun-button').src = 'DuckSpace.jpeg';
    }

    async function holePicture() {
        document.getElementById('hole-button').src = 'duckventHorizon.png';
        await wait(500);
        document.getElementById('hole-button').src = 'duckHole.png';
    }

    async function portalPicture() {
        document.getElementById('portal-button').src = 'duckPortals.png';
        await wait(1000);
        document.getElementById('portal-button').src = 'cosmicPortal.png';
    }

    async function warPicture() {
        document.getElementById('war-button').src = 'warduck2.jpeg';
        await wait(1000);
        document.getElementById('war-button').src = 'warduck.jpeg';
    }

    async function huntPicture() {
        document.getElementById('hunt-button').src = 'duckHunter2.png';
        await wait(1000);
        document.getElementById('hunt-button').src = 'duckHunter.png';
    }

    async function puntPicture() {
        document.getElementById('punt-button').src = 'puntFired.jpeg';
        await wait(1000);
        document.getElementById('punt-button').src = 'puntGun.jpeg';
    }

    async function goosePicture() {
        document.getElementById('goose-button').src = 'gooseTeeth.jpeg';
        await wait(1000);
        document.getElementById('goose-button').src = 'Domestic_Goose.jpg';
    }

    async function swanPicture() {
        document.getElementById('swan-button').src = 'swanTeeth.jpeg';
        await wait(1000);
        document.getElementById('swan-button').src = 'swan.webp';
    }

    function updateAnyButton (ID1, Cost, ID2, Level) {
        document.getElementById(ID1).textContent = formatNumber(Cost);
        document.getElementById(ID2).textContent = formatNumber(Level);
    }

    let autoClickInterval; // Store the interval reference

    // Function to start or restart the auto-clicker
    async function startAutoClicker() {
        // Clear the previous interval, if it exists
        if (autoClickInterval) {
            clearInterval(autoClickInterval);
        }
    
        // Set a new interval
        autoClickInterval = setInterval(function () {
            points += (autoClickValue * multiplier);
            updatePoints();
        }, 1000);
    }

    // Function to create a delay using a Promise
    function wait(milliseconds) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    // Initialize the game
    function init() {
        // Attach click event to the button elements
        document.getElementById('click-button').addEventListener('click', click);
        document.getElementById('cheat-button').addEventListener('click', clickCheat);
        document.getElementById('upgrade-button').addEventListener('click', upgradeClick);
        document.getElementById('auto-click-button').addEventListener('click', upgradeAutoClick);

        startAutoClicker();

        document.getElementById('hydraulic-button').addEventListener('click', upgradeHydraulic);
        document.getElementById('pistol-button').addEventListener('click', upgradePistol);
        document.getElementById('french-button').addEventListener('click', upgradeFrench);
        document.getElementById('chinese-button').addEventListener('click', upgradeChinese);
        document.getElementById('nuke-button').addEventListener('click', upgradeNuke);
        document.getElementById('laser-button').addEventListener('click', upgradeLaser);
        document.getElementById('sun-button').addEventListener('click', upgradeSun);
        document.getElementById('hole-button').addEventListener('click', upgradeHole);
        document.getElementById('portal-button').addEventListener('click', upgradePortal);
        document.getElementById('war-button').addEventListener('click', upgradeWar);
        document.getElementById('hunt-button').addEventListener('click', upgradeHunt);
        document.getElementById('punt-button').addEventListener('click', upgradePunt);
        document.getElementById('goose-button').addEventListener('click', upgradeGoose);
        document.getElementById('swan-button').addEventListener('click', upgradeSwan);

        document.getElementById('sombrero').addEventListener('click', sombreroDuck);
        document.getElementById('wand').addEventListener('click', wizardDuck);
        document.getElementById('cyborg').addEventListener('click', cyborgDuck);
        document.getElementById('rubber').addEventListener('click', rubberDuck);
        document.getElementById('pirate').addEventListener('click', pirateDuck);
        document.getElementById('stuffed').addEventListener('click', stuffedDuck);
        document.getElementById('baseball').addEventListener('click', baseballDuck);

        document.getElementById('rebirth').addEventListener('click', rebirth);
        document.getElementById('return').addEventListener('click', returntogame);

        document.getElementById('SFX').addEventListener('click', sfxswap);

        function rebirth() {
            if (points > 69000000) {
                document.body.style.backgroundImage = "url('bggalaxy.jpg')";
                document.querySelector(".rebirthclass").style.display = "block";
                document.querySelector(".upgrades").style.display = "none";
                document.querySelector(".upgrades2a").style.display = "none";
                document.querySelector(".container").style.display = "none";
                rebirthmultiplier();
                document.getElementById('multiplier').textContent = formatNumber(multiplier);
                points = 0
                updatePoints
                points = 0;
                clickValue = 1; // Initial click value
                autoClickValue = 0

                clickUpgradeCost = 10; // Cost to upgrade click value
                clickUpgradeLevel = 0; // Upgrade level

                tysonValue = 1; // Initial auto-click value
                autoClickCost = 30; // Cost to purchase auto-click upgrade
                autoClickLevel = 0; // Auto-click upgrade level

                hydraulicCost = 1500;
                hydraulicLevel = 0;
                hydraulicValue = 5;

                pistolCost = 500;
                pistolLevel = 0;
                pistolValue = 5;

                frenchCost = 25000;
                frenchLevel = 0;
                frenchValue = 50;

                chineseCost = 45000;
                chineseLevel = 0;
                chineseValue = 33;

                nukeCost = 696969
                nukeLevel = 0
                nukeValue = 500

                laserCost = 1500000
                laserLevel = 0
                laserValue = 333

                sunCost = 45000000
                sunLevel = 0
                sunValue = 5000

                holeCost = 100000000
                holeLevel = 0
                holeValue = 3300

                portalCost = 2500000000
                portalLevel = 0
                portalValue = 50000

                warCost = 7000000000
                warLevel = 0
                warValue = 33300

                huntCost = 150000000000
                huntLevel = 0
                huntValue = 500000

                puntCost = 350000000000
                puntLevel = 0
                puntValue = 333300

                gooseCost = 7000000000000
                gooseLevel = 0
                gooseValue = 5000000

                swanCost = 350000000000
                swanLevel = 0
                swanValue = 15000000000000
                updateAnyButton('clickUpgradeCost', clickUpgradeCost, 'clickUpgradeCount', clickUpgradeLevel);
                updateAnyButton('autoClickCost', autoClickCost, 'autoClickCount', autoClickLevel);
                updateAnyButton('hydraulicCost', hydraulicCost, 'hydraulicCount', hydraulicLevel);
                updateAnyButton('pistolCost', pistolCost, 'pistolCount', pistolLevel);
                updateAnyButton('frenchCost', frenchCost, 'frenchCount', frenchLevel);
                updateAnyButton('chineseCost', chineseCost, 'chineseCount', chineseLevel);
                updateAnyButton('nukeCost', nukeCost, 'nukeCount', nukeLevel);
                updateAnyButton('laserCost', laserCost, 'laserCount', laserLevel);
                updateAnyButton('sunCost', sunCost, 'sunCount', sunLevel);
                updateAnyButton('holeCost', holeCost, 'holeCount', holeLevel);
                updateAnyButton('portalCost', portalCost, 'portalCount', portalLevel);
                updateAnyButton('warCost', warCost, 'warCount', warLevel);
                updateAnyButton('huntCost', huntCost, 'huntCount', huntLevel);
                updateAnyButton('puntCost', puntCost, 'puntCount', puntLevel);
                updateAnyButton('gooseCost', gooseCost, 'gooseCount', gooseLevel);
                updateAnyButton('swanCost', swanCost, 'swanCount', swanLevel);
            } else {
                document.getElementById('rebirthtip').textContent = "Too Poor";
            }
        }
        
        function returntogame() {
            document.body.style.backgroundImage = "url('bg.jpeg')";
            document.querySelector(".rebirthclass").style.display = "none";
            document.querySelector(".upgrades").style.display = "block";
            document.querySelector(".upgrades2a").style.display = "block";
            document.querySelector(".container").style.display = "block";
            points = 0
            updatePoints
        }
        
        // Update UI elements
        updatePoints();
    }

    function changeWord() {
        const words = [
            'Punch the duck to earn points!', 
            'The difference between a duck and a goose are the bones in their necks.',
            'the ugly duckling is an innacurate story, as all ducks are ugly and should be punched',
            '"Every duck shall surrender its life to  my fist" -the Duck Puncher', 
            'If you threw a duck at someone and yelled "DUCK!" what would they do?', 
            'It takes 69 million points to unlock a rebirth', 
            '"Everyone has a plan until they get punched in the face" -Mike Tyson',
            'Better than cookie clicker',
            '"I endorse the killing of ducks" -The Goose'
        ];
        const randomIndex = Math.floor(Math.random() * words.length);
        const newWord = words[randomIndex];
        document.getElementById('word').textContent = newWord;
    }
    setInterval(changeWord, 10000);

    // Call the init function when the page is loaded
    window.onload = init;

    

});
