let t = null
let active = null
let current = 0
const msgHolder = document.getElementById('msgHolder')
const progress = document.getElementsByTagName('progress')[0]

/*
* Helper function to get an int between 2 values
* @param {integer}   min   Miniminum number
* @param {integer}   max   Maximum number
*/
getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

/*
* Writes the status message
* @param {string}  msg
*/          
setToast = (msg) => {
    msgHolder.innerHTML = msg
}

/*
* Clears the status message
*/
clearToast = () =>  {
    setToast(' - ');
}

/**
 * Updates the progress bar
 * @param {integer}   total    Total items
 * @param {step}      step     Current step
 */
updateBar = (total, step) => {
    progress.setAttribute('max', total);
    progress.setAttribute('value', step);
}

/**
 * Manages the "current" counter
 * @param {integer}   len    List length
 */
manageCurrent = (len) => {
    updateBar(len, current+1)
    current = (current >= len-1) ? 0 : current+1
}

/**
 * Converts the given sequence to actual emojis from the provided set and
 * returns it as string
 * @param  {string}  sequnce   Emoji sequence, ex. 001320
 * @param  {array}   elements  List of emoji to pick
 * @return {string}  urlString
 */
convertSequence = (sequence, elements) => {
    let urlString = '';
    [...sequence].forEach(function(number, index) {
        urlString += elements[number];
    });
    return urlString;
}

/**
 * General method
 * @param {string}   func    Function name
 * @param {string}   name    Display name
 * @param {boolean}  rst     Flag, play only once
 */
playExample = (func, name, rst = false) => {            

    // initialization
    location.hash = '';
    clearTimeout(t);
    clearToast();
    current = -1;

    if(active != func) {
        setToast(name);
        active = func;

        // different handling
        if (func == 'runner') {
            road = Array(30).fill('_');
            roadLen = road.length;
            current = roadLen-1;
        }

        window[func](rst);
    } else {
        active = null
        updateBar(0,0)
    }
}

/**
 * Run moon course simulation. Frequency: 1s
 * @param  {boolean} rst
 */
moon = (rst) => {
    let seq = ['🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘','🌑'];
    location.hash = seq[current]
    t = setTimeout(moon, rst, 1000);
    manageCurrent(seq.length)
}


/**
 * This works slightly differently
 * @param {boolean}  rst
 */
runner = (rst) =>  {
    if (current < roadLen) {

        if (current == 0) {
            road[0] = '🔥';
            road[current+1] = '_';
            current = roadLen;
            if (rst) {
                location.hash = road.join('');
                clearTimeout(t);
                return;
            }
        } else {
            road[0] = '||';
            road[current] = '🏃';
            road[current+1] = '_';
        }
    }
    location.hash = road.join('');
    current--;
    t = setTimeout(runner, rst, 150);
}

/**
 * Clock ticking, 1 sec = 1 hour
 * @param {boolean}  rst
 */
clocks = (rst) => {
    let seq = ['🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚','🕛'];
    location.hash = seq[current];
    t = setTimeout(clocks, rst, 1000);
    manageCurrent(seq.length)
}

/**
 * Silly hearts and kisses
 * @param {boolean}  rst
 */
valentine = (rst) =>  {
    el = ['💋', '▫️', '💕', '💑', '💗', '', '😍', '💞']
    seq = ['0', '01', '011', '01111', '11112', '11121', '11211', '12111', '21113', '11131', '11311', '13111', '7','7','7','5', '4', '5', '4', '5', '4', '5', '6', '6', '6']

    // return if told to reset
    if (rst && current == seq.length-1) {
        clearTimeout(t);
        location.hash = '';
        return;
    }
    if (seq[current]) {
        location.hash = convertSequence(seq[current], el)
    }
    t = setTimeout(valentine, rst, getRandomInt(400,600));
    manageCurrent(seq.length);
}

/**
 * Bad weather simple animation
 * @param {boolean}  rst
 */
weather = (rst) => {
    let el = ['___', '☀', '☁', '🌤', '⛅', '🌥', '🌦', '🌩', '🌧', '⛈' ]
    let seq = ['0001000', '2001000', '2001002', '0201020', '2021202', '2023202', '2223222', '2224222', '2225222', '2226222',
                '2286222', '2286822', '2278827', '2728822', '2288822', '2288872', '7288822', '2298922', '2299822', '2289922',
                '2288922', '2288822', '2288722', '2288822', '2286822', '2286222', '2226222', '2225222', '2225822', '2225222',
                '2224220', '2024220', '2023020', '0203020', '0203000', '2003002', '0001002', '0001000', '0001000', '0001000']
    if (seq[current]) {
        location.hash = convertSequence(seq[current], el)
    }
    t = setTimeout(weather, rst, getRandomInt(500, 1000));
    manageCurrent(seq.length)
}

/**
 * Small simulation with fixed animation
 * @param {boolean}  rst
 */
space = (rst) => {
    let seq = ["___________","_⡱_________","__⡱________","__⡱_______⠪","__⡱⠆______⠪","__⡱⠆_⠆___⠪⠪","__⡱_⠆_⠆_⠪⠪⠪","__⡱⠆_⠆_⠆⠪⠪⠪",
    "__⡱_⠆_⠆_⣝⠪⠪","__⡱__⠆_⠆⠪⠪_","__⡱___⠆_⣝⠪_","__⡱____⠆⠪__","__⡱____⣝___","__⡱________","__⡱_______⢎","__⡱______⢎⢎","__⡱_____⢎⢎⣿",
    "__⡱⠆____⢎⢎⣿","__⡱⠆⠆__⢎⢎⣿⣏","__⡱⠆⠆__⢎⢎⣿⣏","__⡱⠆_⠆⠆⢎⢎⣿⣏","__⡱_⠆_⠆⢎⢎⣿⣏","__⡱__⠆_⢎⢎⣿⣏","__⡱___⠆⢎⢎⣿⣏","__⡱____⢎⢎⣿⣏","__⡱⠢___⢎⢎⣿⣏",
    "__⡱⠡⠢__⢎⢎⣿⣏","__⡱_⠡⠢_⢎⢎⣿⣏","__⡱_⡔⠡⠢⢎⢎⣿⣏","__⡱__⡔⠡⢎⢎⣿⣏","__⡱___⡔⢎⢎⣿⣏","__⡱⠶___⢎⢎⣿⣏","__⡱⠶⠶__⢎⢎⣿⣏","__⡱_⠶⠶_⢎⢎⣿⣏","__⡱__⠶⠶⢎⢎⣿⣏",
    "__⡱___⠶⢎⢎⣿⣏","__⡱____⣝⢎⣿⣏","__⡱____⣝⣽⣿⣏","__⡱____⣝⣽⣿⣏","__⡱____⣓⣽⣿⢯","__⡱____⣣⣽⣿⢯","__⡱____⣣⡳⣿⣣","__⡱____⣣⡳⣿⣣","__⡱_____⠷⣿⣣","__⡱_____⠷⣿⠏",
    "__⡱______⠷⣿","__⡱_______⣿","__⡱________","__⡱________","___⡱_______","____⡱______","_____⡱_____","______⡱____","r______⡱___","er______⡱__","ver______⡱_",
    "over______⡱","_over______","e_over_____","me_over____","ame_over___","game_over__","_game_over_","_game_over_","___________","___________","_game_over_",
    "_game_over_","___________","___________","insert_coin","___________", "insert_coin","___________", "insert_coin","___________", "insert_coin"]
    location.hash = seq[current];
    t = setTimeout(space, rst, 400);
    manageCurrent(seq.length)
}