const termkit = require('terminal-kit'),
	player = require('play-sound')(opts = {}),
	Autocomplete = require('autocomplete'),
	term = termkit.terminal,
	ScreenBuffer = termkit.ScreenBuffer,
	rand = require('./random.js'),
	marx = require("./marx.js");

var mots = marx.marx;
var level = "marx";
var sound = false;
var vie = 1;
var autocomplete = Autocomplete.connectAutocomplete();
var canSee = [];
var rtPressed = [];

// --------------------------Menu Principale---------------------------

function menuPrincipal() {

	var items = [
		'START NEW GAME',
		'CHOOSE LEVEL',
		'OPTION',
		'QUIT'
	];
	// var items = ["START", "QUIT"];

	term.gridMenu(items, {
		y: term.height - 7,
		x: term.width / 3,
		style: term.bold.inverse.colorRgb(61, 55, 91).bgColorRgb(23, 18, 25)
	}, function(error, response) {

		if (response.selectedText == "START NEW GAME") {
			wait();

		}
		if (response.selectedText == "OPTION") {
			// optionMneu();
		}
		if (response.selectedText == "CHOOSE LEVEL") {
			// levelListMenu();
		}
		if (response.selectedText == "QUIT") {
			terminate();
		}

	})
	var logoX = 2.2;
	term.moveTo(term.width / 2.2, 5)("\n")
	term.moveTo(term.width / 2.2, 6)("\n")
	term.moveTo(term.width / 2.2, 7)("\n")
	term.moveTo(term.width / 2.2, 8)("\n")
	term.moveTo(term.width / 2.2, 9)("\n")
	term.moveTo(term.width / 2.2, 10)("\n")
	term.moveTo(term.width / 2.2, 11)("\n")
	term.moveTo(term.width / 2.2, 12)("\n")
	term.moveTo(term.width / 2.2, 13)("\n")
	term.moveTo(term.width / 2.2, 14)("\n")
	term.moveTo(term.width / 2.2, 15)("\n")
	term.moveTo(term.width / 2.2, 16)("\n")
	term.moveTo(term.width / 2.2, 17)("\n")
	term.moveTo(term.width / 2.2, 18)("\n")
	term.moveTo(term.width / 2.2, 19)("\n")
	term.moveTo(term.width / 2.2, 20)("\n")
	term.moveTo(term.width / 2.2, 21)("\n")
	term.moveTo(term.width / 2.2, 22)("\n")
	term.moveTo(term.width / 2.2, 23)("\n")
	term.moveTo(term.width / 2.2, 24)("\n")


}
menuPrincipal();

function wait() {
	// _____________Terminal_Config_____________________
	term.windowTitle('Nerd Speed Writer Battle');
	term.fullscreen();
	term.hideCursor();

	let canvasWidth = term.width,
		canvasHeight = term.height / 1.5;

	viewport = termkit.ScreenBuffer.create({
		dst: term,
		width: term.width - 5,
		height: term.height / 1.5,
		y: 5,
		x: 5,
		bgColor: "brightYellow"
	});

	var lines = {};
	var test;
	// --------------------------Sound_Config-----------------------
	var destroySound = "./sound/destroy.wav";

	function lvlMusic() {
		interPath = './sound/The Internationale-8bit.mp3';
		if (level == "marx") {
			return interPath;
		}
	}
	if (sound != false) {
		//var bgMusic = player.play(lvlMusic(), function(err) {
			//if (err && !err.killed) throw err
	//	})
	}

	function playSound(path) {
		var audio = player.play(path, {
			afplay: ['-v', 0.07] /* lower volume for afplay on OSX */
		}, function(err) {
			if (err) throw err
		})
	}
	// ___________________Config Object Ligne_________________________

	function LineBuffer(mot, y, time) { // sprites de mots
		lines[mot] = termkit.ScreenBuffer.create({
			dst: viewport,
			width: mot.length,
			height: 1,
			x: 0 - time,
			y: y
		});
		lines[mot].put({
			x: 0,
			attr: {
				color: 'brightGreen',
			}
		}, mot);
	}
	//------------------------Visualisation mot tapés-------------
	// RealTimetyped = termkit.ScreenBuffer.create({
	//   dst: viewport,
	//   width: term.width,
	//   height: 4,
	//   x: 0,
	//   y: term.height - 3
	// });
	// RealTimetyped.put({
	//   x: 0,
	//   attr: {
	//     color: 'brightMagenta',
	//     bgColor: "yellow"
	//   }
	// }, name);

	function drawBuffers() { // draw a list of buffers
		viewport.fill({
			char: ' '
		}); // always come first
		for (var mot in lines) {
			if (lines[mot].x < canvasWidth) {
				lines[mot].draw();
				lines[mot].x++;
				if (lines[mot].x > 0) { // matcher seulement les mots avec x positif
					canSee.push(mot)
				}
			} else {
				delete lines[mot];
				printlife(0.05);
				console.log(vie);
			}
		}
		// typed.draw();
		viewport.draw(); // always come last
	}


	time = Math.floor(Math.random() * 4);

	function start(speed, continu) {
		let counter = 0;
		vie = 1;
		// ---------------- Make Interface --------------
		// for (var i = 0; i < term.width; i++) {
		//   for (var j = 0; j < term.height; j++) {
		//     term.bold.bgColorRgb(23, 18, 25).colorRgb(3, 18, 25)('█');
		//   }
		// }
		// for (var i = 0; i < term.width; i++) {
		//   term.bold.bgColorRgb(23, 18, 25)('█');
		// }

		term.moveTo(0, 3).bgColorRgb(23, 18, 25).green('Hit CTRL-C to quit.\n\n');
		term.moveTo(1, term.height - 3)
		printlife(0);

		mots.forEach(mot => { // pour chaque mot crée un buffer
			LineBuffer(mot, Math.floor(Math.random() * canvasHeight), time + counter);
			counter++;
		});
		let handle = setInterval(() => {
			drawBuffers();
			if (vie < 0) {
				clearInterval(handle);
				stop();
			}
		}, 1000);
	}
	start();

	function stop() {

		term.bold.inverse.colorRgb(61, 55, 91).bgColorRgb(23, 18, 25)
		term.moveTo(term.width / 2, term.height / 2).bold.bgColorRgb(23, 18, 25).brightRed("-= GAME OVER =-");
		setTimeout(menuPrincipal, 2000);
	}

	function printlife(hit) {

		term.moveTo(term.width / 2, 2).bold.bgColorRgb(23, 18, 25).brightRed("LIFE : ").bar(vie -= hit, {
			barStyle: term.bgColorRgb(23, 18, 25).brightRed,
			innerSize: 20
		})
		if (vie == 0) {
			stop(true);
		}
	}

	var totalScore = 0;

	function score(point) {

		term.moveTo(term.width / 3, 2).bgColorRgb(23, 18, 25)("SCORE : ").bold.brightRed(totalScore += point)

	}

	function destroy(mot) { // destroy !!!
		var index = canSee.indexOf(mot);
		if (index > -1) {
			canSee.splice(index, 1);

			if (lines[mot] != undefined) {
				lines[mot].resize({
					x: 0,
					y: 0,
					width: 9,
					height: 2
				});
				lines[mot].put({
					x: 0,
					attr: {
						color: 'brightRed',
						bold: true,
						inverse: false,
						strike: false
					}
				}, ".-'`☭`'-.");

				if (lines[mot].x > 0) {
					playSound(destroySound);
					setTimeout(function() {
						delete lines[mot];
					}, 500);
					score(100)
				}
			}

		}
	}

	//_______________________Gestion entré Keypressed______________________
	term.grabInput({
		mouse: 'button'
	});

	var found = "";
	term.on('key', function(name, matches, data) {
		autocomplete.initialize(function(onReady) {
			onReady(canSee);
		});

		var new_matches = autocomplete.search(found + name);
		if (new_matches.length !== 0) {
			if (found.length > 0) find(name);
			else found = name;
		} else found = name

		function find(name) { // construit le match d'un mot
			var match = found + name;
			var new_matches = autocomplete.search(match);
			if (new_matches.length !== 0) {
				found += name;
			}
			if (new_matches.length == 1) {
				if (new_matches[0] == found) {
					// console.log("object trouvé");
					destroy(new_matches[0]);
				}
			}
		}

		if (name === 'CTRL_C') {
			terminate();
		}
		if (name === 'ESCAPE') {
			stop();
			terminate();
		}


	});

}
// ------------------------Exit_the_Game-----------------------

function terminate() { // EXIT PROCESS
	if (sound != false) bgMusic.kill();
	term.grabInput(false);
	term.fullscreen(false);
	term.hideCursor(false);
	setTimeout(function() {
		term.clear();
		process.exit()
	}, 100);
}
