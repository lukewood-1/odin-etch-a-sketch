'use strict'

// create square divs
const container = document.querySelector('.container');
const containerHeight = container.offsetHeight;
const squares = document.querySelectorAll('.square');

// configure event response of squares
function controlEventResponse(element){
	element.addEventListener('mouseover', hoverEffect);
	element.addEventListener('mouseout', hoverEffect);
	element.addEventListener('mouseover', drawEffect);
	element.addEventListener('mousedown', e => e.preventDefault());
	element.addEventListener('contextmenu', e => e.preventDefault());
}

// create hover effect
const hoverEffect = (e) =>{
	e.target.classList.toggle('hovered');
};

// create Drawn square effect
const drawEffect = (e) => {
	e.target.classList.toggle('drawn');
	let rng1 = Math.trunc(Math.random() * 255);
	let rng2 = Math.trunc(Math.random() * 255);
	let rng3 = Math.trunc(Math.random() * 255);
	let rngDecimal = Math.random().toFixed(1);
	e.target.style.backgroundColor = `rgba(${rng1}, ${rng2}, ${rng3}, ${rngDecimal})`;
	rng1 = Math.trunc(Math.random() * 255);
	rng2 = Math.trunc(Math.random() * 255);
	rng3 = Math.trunc(Math.random() * 255);
	rngDecimal = Math.random().toFixed(1);
};

// create initial divs
for(let i = 0; i < 16; i++){
	const divs = document.createElement('div');
	divs.className = 'square';
	container.append(divs);
	divs.style.cssText += `height: ${calcHeight(squares.length)};`;
	controlEventResponse(divs);
};

// Maintain the total height of the container
  function calcHeight(num){
	if(containerHeight / num % 4 === 0){
		return num;
	} else {
	 while(containerHeight / num % 4 !== 0){
		num++;
	 }
		return num;
	}
};


// create grid redraw button
	const newGrid = document.createElement('div');
	const promptBtn = document.createElement('button');
	promptBtn.className = 'newGridBtn';
	promptBtn.textContent = 'create new grid';
	newGrid.append(promptBtn);
	container.before(newGrid);

// Draw Grid upon clicking redraw button
	const gridDraw = () => {
	let gridAsk = +prompt("how many grid squares would you like?\n (We're drawing a maximum of 100 squares on this one)");
		if(gridAsk > 100){
			gridAsk = 100;
		 } else if (gridAsk < 100 && gridAsk % 4 !== 0){
				while(gridAsk % 4 !== 0){
					gridAsk++;
				}
			 alert(`note: we added some squares to maintain a square shape in the canvas.
			 This grid will be drawn with ${gridAsk} squares.`);
		 } else if (typeof gridAsk !== 'number'){
			 gridAsk = 16;
		 };

		for(const item of document.querySelectorAll('.container div')){
			item.remove();
		};

		for(let i = 0; i < gridAsk; i++){
			const gridCreate = document.createElement('div');
			gridCreate.className = 'square';
			controlEventResponse(gridCreate);
			container.append(gridCreate);
		};
	};
promptBtn.addEventListener('click', gridDraw);
