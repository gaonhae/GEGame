// function removeAllchild(div) {
// 	while (div.hasChildNodes()) {
// 		div.removeChild(div.firstChild);
// 	}
// }

// removeAllchild(document.querySelector("body"));

// let can = document.createElement("canvas");
// document.body.append(can);
// can.id = "canvas";

// document.querySelector(".board").style.width = document.querySelector("#canvas").style.width;
document.querySelector(".board").style.width = "10";

//캔버스 설정
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
// canvas.width = document.querySelector("#canvas").width - 100;
// canvas.height = document.querySelector("#canvas").height - 100;

//이미지 가져오기
var dinoimage = new Image();
dinoimage.src = "KakaoTalk_20220710_140237864.png";
var cacimage = new Image();
cacimage.src = "KakaoTalk_20220713_095344206.png";
var ggoomimage = new Image();
ggoomimage.src = "꿈틀.png";
var backimage = new Image();
backimage.src = "배경.jpg";

//변수 선언
let timer = 0;
let cactuss = [];
let backs = [];
let jumpTimer = 0;
let jumpSwitch = false;
let ggoom = true;
let back = {
	x: 0,
	y: 0,
	width: canvas.width,
	height: canvas.height,
	draw() {
		ctx.drawImage(backimage, this.x, this.y, this.width, this.height);
	},
};
let dino = {
	width: canvas.width / 15,
	height: canvas.width / 15,
	x: canvas.width / 10,
	y: canvas.height / 2,
	draw() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(
			dinoimage,
			this.x - canvas.width / 100,
			this.y,
			this.width + canvas.width / 30,
			this.height + canvas.height / 30
			// this.width + canvas.width / 30,
			// this.height + canvas.height / 30
		);
	},
};
class Cactus {
	constructor() {
		this.width = canvas.width / 20;
		this.height = canvas.width / 20;
		this.x = canvas.width;
		this.y = canvas.height / 2 + (canvas.width / 15 - canvas.width / 20);
	}
	draw1() {
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(cacimage, this.x, this.y, this.width, this.height);
	}
	draw2() {
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(ggoomimage, this.x, this.y, this.width, this.height);
	}
}

//점프 인식
document.addEventListener("keydown", function (e) {
	if (e.code === "Space" && jumpTimer == 0) {
		jumpSwitch = true;
	}
});
document.querySelector("#canvas").onclick = function () {
	jumpSwitch = true;
};

//애니메이션
function animate() {
	animationvar = requestAnimationFrame(animate);
	timer++;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	back.draw();

	if (timer % 60 === 0) {
		let cactus = new Cactus();
		cactus.x -= (Math.random() * canvas.width) / 3 + canvas.width / 20;
		cactuss.push(cactus);
		document.querySelector("#nowScore").textContent = timer / 60;
	}

	cactuss.forEach((element, index, cactuss) => {
		if (element.x < canvas.width / 150) {
			cactuss.splice(index, 1);
		}
		collision(dino, element);
		element.x -= canvas.width / 100;
		if (ggoom == true) {
			element.draw2();
		} else {
			element.draw1();
		}
	});

	//꿈틀거림
	if (timer % 20 === 0) {
		if (ggoom === true) {
			ggoom = false;
		} else {
			ggoom = true;
		}
	}
	//점프 상한선
	if (jumpSwitch == true) {
		if (dino.y > canvas.height / 6) {
			dino.y -= canvas.width / 100;
			console.log(dino.y);
			console.log(canvas.height / 6);
		}
		jumpTimer++;
	}
	//점프하는 시간
	if (jumpTimer > 15) {
		jumpSwitch = false;
	}
	//점프 하한선
	if (jumpSwitch == false && dino.y < canvas.height / 2) {
		dino.y += canvas.width / 100;
	}
	//점프 연타 방지
	if (dino.y >= canvas.height / 2) {
		jumpTimer = 0;
	}

	dino.draw();
}

//충돌확인
function collision(dino, cactus) {
	if (cactus.x - dino.x - dino.width < 0 && cactus.y - dino.y - dino.height < 0 && dino.x < cactus.x + cactus.width) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		cancelAnimationFrame(animationvar);
		back.draw();
	}
}

animate();

//점수 인식 기능 구현
