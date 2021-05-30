function menu(){
	stop = true;
	if(game)
		clearInterval(game);
	if(reaction_time);
		for(var k = 0; k < 10; k++)
			clearInterval(reaction_time[k]);
	min = 0;
	sec = 0;
	var req = new XMLHttpRequest();
	req.open("get", "https://hengwangy0699.github.io/js_aiming_project/menu.html");
	req.onload = function(){
		var content = document.getElementById("board");
		content.innerHTML = this.responseText;
	};
	req.send();
}

function gamemode(mode_num){
	mode = mode_num;
	var req = new XMLHttpRequest();
	req.open("get", "https://hengwangy0699.github.io/js_aiming_project/gamemode.html");
	req.onload = function(){
		var content = document.getElementById("board");
		content.innerHTML = this.responseText;
		timer = document.getElementById("timer");
		pad_timer = document.getElementById("pad_timer");
		cd_timer = document.getElementById("countdown");
		accuracy = document.getElementById("accuracy");
		target = document.getElementById("target");
		footer_text = document.getElementById("footer_text");
		ct = document.getElementById("gaming_pad");
		ct_boundary = ct.getBoundingClientRect();
		if(mode_num == 1){
			timer.innerHTML = "Time: 01:00";
			pad_timer.innerHTML = "01:00";
		}
		if(mode_num == 6)
			target.innerHTML = "Avg. time: N/A";
	};
	req.send();
}

function stas(){
	
}

function timerCycle(){
	if(stop == false){
		min = parseInt(min);
		sec = parseInt(sec);
		if(mode != 1){
			sec++;
			if(sec == 60){
				min++;
				sec = 0;
			}
			if(sec < 10)
				sec = '0' + sec;
			if(min < 10)
				min = '0' + min;
			timer.innerHTML = "Time: " + min + ":" + sec;
			pad_timer.innerHTML = min + ":" + sec;
			setTimeout(timerCycle, 1000);
		}
		else{
			sec--;
			if(sec == -1)
				min = 0, sec = 59;
			if(sec < 10)
				sec = '0' + sec;
			if(min < 10)
				min = '0' + min;
			timer.innerHTML = "Time: " + min + ":" + sec;
			pad_timer.innerHTML = min + ":" + sec;
			setTimeout(timerCycle, 1000);
		}
	}
}

function readytoplay(){
	footer_text.innerHTML = "Press ESC/Spacebar to end the game"
	b1.remove();
	b2.remove();
	window.addEventListener("keydown", windowKeydown, false);
	function windowKeydown(event){
		if(event.key === "Escape" || event.keyCode === 32){
			console.log("check")
			stop = true;
			if(game)
				clearInterval(game);
			if(reaction_time);
				for(var k = 0; k < 10; k++)
					clearInterval(reaction_time[k]);
			
			var title = document.getElementById("title");
			title.style.transition = "1.5s";
			title.style.opacity = "0";
			ct.style.transition = "1.5s";
			ct.style.opacity = "0";
			footer_text.style.transition = "1.5s";
			footer_text.style.opacity = "0";
			setTimeout(rebuild, 1500);
			function rebuild(){
				var bt = document.createElement("button");
				var gt = document.createElement("div");
				bt.setAttribute("id", "b1");
				bt.setAttribute("onclick", "menu()");
				bt.style.bottom = "50px";
				bt.innerHTML = "back";
				gt.setAttribute("id", "g_table");
				gt.style.background = "#FFFFFF";
				document.getElementById("foot").appendChild(bt);
				title.style.transition = "0s";
				title.style.opacity = "1";
				ct.style.transition = "0s";
				ct.style.opacity = "1";
				ct.style.background = "#FFFFFF";
				title.innerHTML = "";
				gt.innerHTML = "Title"
				document.getElementById("title").appendChild(gt);
				ct.innerHTML = "<div id =\"block1\">one</div><div id =\"block2\">two</div><div id =\"block3\">three</div>"
			}
			window.removeEventListener("keydown", windowKeydown, false);
		}
	}
	
	var countdown = 3;
	stop = false;
	play_countdown();
	function play_countdown(){
		if(stop == false) {
			if(countdown == -1){
				cd_timer.innerHTML = "";
				gamestart();
			}
			else{
				cd_timer.innerHTML = "Starts in " + countdown;
				setTimeout(play_countdown, 1000);
				countdown--;
			}
		}
	}
}


class ball{
	constructor(id = null, r = null, c = null, maxsize = null){
		this.ball = document.createElement("div");
		this.id = id;
		this.r = r;
		this.c = c;
		this.dirs;
		this.pos;
		this.ct_boundary = ct_boundary;
		this.alive = 1;
		this.readytoDeath = 0;
		this.father;
		this.maxsize = maxsize;
		this.life_ud = 1;
		this.cal_time = 0;
		this.duration = 0;
	}
	
	build(father){
		this.ball.setAttribute("id", this.id);
		this.ball.setAttribute("class", "ball");
		this.ball.setAttribute("style", "position:absolute; border-radius:100%");
		this.ball.setAttribute("onclick", "emptycc()");
		this.ball.style.width = this.r + "px";
		this.ball.style.height = this.r + "px";
		this.ball.style.backgroundColor = this.c;
		this.ball.style.background = "repeating-radial-gradient(#FFEEDD, #FFBB77, #FF8000, #BB5E00, #844200)";
		var rand_init_x = Math.floor(Math.random() * (this.ct_boundary.width - this.maxsize));
		var rand_init_y = Math.floor(Math.random() * (this.ct_boundary.height - this.maxsize));
		if(mode == 1 || mode == 2){
			rand_init_x += maxsize / 2;
			rand_init_y += maxsize / 2;
		}
		if(mode == 6){
			rand_init_x = this.ct_boundary.width / 2 - this.maxsize / 2 + 2;
			rand_init_y = this.ct_boundary.height / 2 - this.maxsize / 2 - 13;
		}
		this.ball.style.left = rand_init_x + "px";
		this.ball.style.top = rand_init_y + "px";
		this.dirs = [this.newDir(), this.newDir()];
		this.pos = [rand_init_x, rand_init_y];
		if(mode == 5){
			var dis = 75;
			while(this.pos[0] + this.dirs[0]*dis >= ct_boundary.width - this.r || this.pos[0] + this.dirs[0]*dis <= 0)
				this.dirs[0] = this.newDir();
			while(this.pos[1] + this.dirs[1]*dis >= ct_boundary.height - this.r || this.pos[1] + this.dirs[1]*dis <= 0)
				this.dirs[1] = this.newDir();
		}
		document.getElementById(father).appendChild(this.ball);
		this.father = father;
	}
	
	newDir(){return ((Math.random() - 0.5) > 0) ? 1 : -1;}
	
	speed_movement(){
		var scalar = (this.life_ud) ? 1 : -1;
		this.r += scalar;
		if(!this.r)
			this.delball(this.id);
		else{
			if(this.r == this.maxsize)
				this.life_ud = 0;
			this.ball.style.width = this.r + "px";
			this.ball.style.height = this.r + "px";
			this.pos[0] -= scalar/2;
			this.pos[1] -= scalar/2;
			this.ball.style.left = this.pos[0] + "px";
			this.ball.style.top = this.pos[1] + "px";
		}
	}
	
	precision_doubleshot_movement(){
		var b = this;
		var t = (mode == 3) ? 750 : 900;
		setTimeout(killBallornot, t);
		function killBallornot(){
			if(b.checkAlive())
				b.delball(b.id);
		}
	}
	
	sniping_movement(){
		var scalar = (this.life_ud) ? 1 : -1;
		this.r += scalar;
		if(!this.r)
			this.delball(this.id);
		else{
			if(this.r == this.maxsize)
				this.life_ud = 0;
			this.ball.style.width = this.r + "px";
			this.ball.style.height = this.r + "px";
			this.pos[0] = this.pos[0] - scalar/2 + this.dirs[0]*1.75;
			this.pos[1] = this.pos[1] - scalar/2 + this.dirs[1]*1.75;
			this.ball.style.left = this.pos[0] + "px";
			this.ball.style.top = this.pos[1] + "px";
		}
	}
	
	reaction_movement(){
		var b = this;
		if(!b.cal_time){
			b.cal_time = 1;
			for(var k = 0; k < 10; k++)
				reaction_time[k] = setInterval(cal_time, 10);
			function cal_time(){
				if(b.duration == 1750 || !b.checkAlive())
					b.delball(b.id);
				else if(b.checkAlive())
					b.duration++;
			}
		}
	}
	
	checkclick(id){
		this.ball.onclick = function(mouse){
			console.log(parseInt("50px"))
			accu_cnt++;
			balls[id].delball(id);
			var sty = balls[id].getStyle();
			var circle = document.createElement("div");
			circle.setAttribute("id", "c" + id);
			circle.setAttribute("style", "position: absolute; border-radius:100%");
			circle.style.width = sty.width;
			circle.style.height = sty.height;
			circle.style.left = sty.left;
			circle.style.top = sty.top;
			circle.style.opacity = "0.4";
			circle.style.background = "repeating-radial-gradient(#272727, #8E8E8E)";
			circle.style.boxShadow = "0 0 0 2px rgba(0, 0, 0, 0.3)"
			if(mode == 6){
				duration_cnt += balls[id].duration;
				var avg_duration = (duration_cnt / (accu_cnt * 1000)).toFixed(3);
				console.log(duration_cnt, balls[id].duration, accu_cnt);
				target.innerHTML = "Avg. time: " + avg_duration + "s"
				var duration_text = document.createElement("div");
				duration_text.setAttribute("id", "dt" + id);
				duration_text.setAttribute("style", "position: absolute");
				duration_text.style.left = parseInt(sty.left) + 50 + "px";
				duration_text.style.top = parseInt(sty.top) + "px";
				duration_text.style.background = "rgba(0, 0, 0, 0.1)";
				duration_text.style.color = "Coral";
				duration_text.innerHTML = balls[id].duration + "ms";
				document.getElementById(ct.id).appendChild(duration_text);
				setTimeout(function(){killDT(duration_text);}, 1000);
				function killDT(dt){
					if(dt)
						dt.remove();
				}
			}
			document.getElementById(ct.id).appendChild(circle);
			setTimeout(function(){killCircle(circle);}, 300);
			function killCircle(c){
				if(c)
					c.remove();
			}
		}
	}
	
	delball(id){
		this.ball.style.transition = "0.15s";
		this.ball.style.opacity = "0";
		this.alive = 0;
		if(mode != 6){
			ball_cnt++;
			target.innerHTML = "Target hits: " + accu_cnt + "/" + ball_cnt;
		}
		else{
			for(var k = 0; k < 10; k++)
				if(reaction_time[k])
					clearInterval(reaction_time[k]);
		}
		var bi = document.getElementById(id);
		if(bi)
			bi.remove();
	}

	checkAlive(){return this.alive}
	getID(){return this.id}
	getFather(){return this.father}
	getCBoarder(){return this.ct_boundary}
	getStyle(){return this.ball.style};
}

var ct, ct_boundary;
var timer, pad_timer, cd_timer;
var min, sec, stop = true;

var game, reaction_time = [];
var n = 3, i;
var balls, ids = [];
var accuracy, target, start_bt, footer_text;
var dot_cnt, accu_cnt, ball_cnt, ballid_cnt, duration_cnt;
var mode, t;
function gamestart(){
	if(stop == false){
		if(mode == 1)
			min = 1, sec = 0;
		else
			min = 0, sec = 0;
		setTimeout(timerCycle, 1000);
		balls = [], ids = [];
		dot_cnt = 0, accu_cnt = 0, ball_cnt = 0, ballid_cnt = 0, duration_cnt = 0;
		ct.onclick = function(mouse){
			var dot = document.createElement("div");
			dot.setAttribute("id", "p" + dot_cnt);
			dot.setAttribute("style", "position: absolute; border-radius:100%");
			dot.style.width = "5px";
			dot.style.height = "5px";
			dot.style.backgroundColor = "#D0D0D0";
			dot.style.left = (mouse.pageX - ct_boundary.left) + "px";
			dot.style.top = (mouse.pageY - ct_boundary.top) + "px";
			document.getElementById(ct.id).appendChild(dot);
			dot_cnt++;
			setTimeout(function(){killDot(dot);}, 300);
			function killDot(dt){
				if(dt)
					dt.remove();
			}
			var accu_ratio = Math.floor((accu_cnt / dot_cnt) * 1000);
			accuracy.innerHTML = "Accuracy: " +(accu_ratio / 10) + "%";
		}
		
		setTimeout(createBall, 1250);
		if(mode == 4)
			setTimeout(createBall, 1250);
		game = setInterval(frame, 25);
		function frame(){
			for (i = 0; i < ids.length; i++){
				var id = ids[i];
				if(mode == 1 || mode == 2)
					balls[id].speed_movement();
				else if(mode == 3 || mode == 4)
					balls[id].precision_doubleshot_movement();
				else if(mode == 5)
					balls[id].sniping_movement();
				else if(mode == 6)
					balls[id].reaction_movement();
				balls[id].checkclick(id);
				if(!balls[id].checkAlive()){
					delete balls[id];
					var index = ids.indexOf(id);
					if(index > -1)
						ids.splice(index, 1);
				}
			}
		}
		
		t = 1500;
		function createBall(){
			if(stop == false){
				var ball_vars = create_ball_vars();
				var b = new ball(id = ball_vars[0], r = ball_vars[1], c = ball_vars[2], maxsize = ball_vars[3]);
				b.build(ct.id);
				balls.push(b);
				ids.push(ball_vars[0]);
				ballid_cnt++;
				t = respawn_time(t);
				setTimeout(createBall, t);
			}
		}
	}
}

function create_ball_vars(){
	var id = ballid_cnt, r = 50, c = "#BB5E00", mxsize = 55;
	if(mode == 1 || mode == 2)
		r = 5;
	else if(mode == 3)
		r = 10, mxsize = 10;
	else if(mode == 4)
		r = 35, mxsize = 35;
	else if(mode == 5)
		r = 8, mxsize = 27;
	return [id, r, c, mxsize];
}

function respawn_time(t){
	var time = t;
	if(mode == 1){
		if(time > 1000)
			time -= Math.ceil(Math.random()*150 + 250);
		else if (time > 700)
			time -= Math.ceil(Math.random()*100 + 50);
		else if (time > 450)
			time -= Math.ceil(Math.random()*50 + 30);
		else if (time > 400)
			time -= Math.ceil(Math.random()*20 + 10);
		else if (time > 330)
			time--;
	}
	else if(mode == 2){
		if(time > 1000)
			time -= Math.ceil(Math.random()*150 + 250);
		else if (time > 700)
			time -= Math.ceil(Math.random()*100 + 50);
		else if (time > 400)
			time -= Math.ceil(Math.random()*50 + 30);
		else if (time > 300)
			time -= Math.ceil(Math.random()*20 + 10);
		else if (time > 280)
			time--;
	}
	else if(mode == 5)
		time = 1250;
	else if(mode == 6)
		time = Math.floor(Math.random() * 3750) + 1750; 
	return time;
}