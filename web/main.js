"use strict";

let canvasContext;
let socket;
let camera;
let player;
let world;
let input;
let vpSize;
function init() {
	const canvas = document.getElementById("mainCanvas");
	canvasContext = canvas.getContext("2d");
	canvasContext.imageSmoothingEnabled = false;

	socket = io(serverAddress);
	socket.on("connect", (playerId) => {
		camera = new Camera(64);
		//gui = new Ui();
		//gui.addElement(new Button(100, 100, 128, 32, document.getElementById("buttonImage"), function(){console.log("boop");}));
		//let testImage = new Image();
		//testImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4woIEBISRGtRKQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAJElEQVQoz2NkwAH+M/zHKs7EQCIY1UAMYMQV3owMjKOhRD8NACTzBB3yj0euAAAAAElFTkSuQmCC";
		//gui.addElement(new Dragable(200, 200, 60, 60, testImage, (x, y)=>{console.log(x, y);}));
		input = new Input();
		world = new World();
		player = new Player(playerId);
		world.update();

		const loading = document.getElementById("delete");
		if (loading) {
			loading.outerHTML = "";
		}
		setInterval(draw, 16);
	});
	socket.on("WorldSetTile", (x, y, tileId) => {
		world.setTile(x, y, tileId);
	});
}

function draw() {
	vpSize = {"x": innerWidth, "y": innerHeight};
	document.getElementById("mainCanvas").width = vpSize.x;
	document.getElementById("mainCanvas").height = vpSize.y;

	input.update();
	world.update();
	player.update(input);

	world.draw();
	player.draw();
}
