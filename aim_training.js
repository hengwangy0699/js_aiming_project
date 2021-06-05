var file_path = "https://hengwangy0699.github.io/js_aiming_project/"
function menu(){
	stop = true;
	if(game)
		clearInterval(game);
	if(reaction_time);
		for(var k = 0; k < 10; k++)
			clearInterval(reaction_time[k]);
	if(mouseDetecting)
		clearInterval(mouseDetecting);
	min = 0;
	sec = 0;
	var req = new XMLHttpRequest();
	req.open("get", file_path + "menu.html");
	req.onload = function(){
		var content = document.getElementById("board");
		content.innerHTML = this.responseText;
		container = document.getElementById("container");
		checkbox[0] = document.getElementById("easy");
		checkbox[1] = document.getElementById("normal");
		checkbox[2] = document.getElementById("hard");
		if(smode[0] == 1)
			document.getElementById("img1").setAttribute("src", "image/warmupS.png")
		if(smode[1] == 1)
			document.getElementById("img2").setAttribute("src", "image/strafingS.png")
		if(smode[2] == 1)
			document.getElementById("img3").setAttribute("src", "image/precisionS.png")
		if(smode[3] == 1)
			document.getElementById("img4").setAttribute("src", "image/doubleshotS.png")
		if(smode[4] == 1)
			document.getElementById("img5").setAttribute("src", "image/snipingS.png")
		if(smode[5] == 1)
			document.getElementById("img6").setAttribute("src", "image/reactionS.png")
		
		if(difficulty == 1){
			checkbox[0].checked = true;
			checkbox[1].checked = false;
			checkbox[2].checked = false;
		}
		else if(difficulty == 2){
			checkbox[0].checked = false;
			checkbox[1].checked = true;
			checkbox[2].checked = false;
		}
		else if(difficulty == 3){
			checkbox[0].checked = false;
			checkbox[1].checked = false;
			checkbox[2].checked = true;
		}
		container.style.background = bk_color;
	};
	req.send();
}

function gamemode(mode_num){
	mode = mode_num;
	var req = new XMLHttpRequest();
	req.open("get", file_path + "gamemode.html");
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
			timer.innerHTML = "Time: 00:30";
			pad_timer.innerHTML = "00:30";
			cd_timer.innerHTML = "Try to click on as many balls as you can. The game will end in 30 seconds.";
		}
		else if(mode_num == 2){
			target.innerHTML = "Follow time: N/A";
			cd_timer.innerHTML = "Stick the ball with your pointer<br>for as long as you can!";
		}
		else if(mode_num == 3)
			cd_timer.innerHTML = "How was the warm-up?<br>Lets try something <b>HARDER</b>.<br>Click on as many balls as you can.<br><h4>This time be quick and accurate</h4>";
		else if(mode_num == 4)
			cd_timer.innerHTML = "Two balls at the same time!<br>Can you catch 'em all?";
		else if(mode_num == 5)
			cd_timer.innerHTML = "Oh no! The balls are moving!<br>Catch them before they escape!";
		else if(mode_num == 6){
			target.innerHTML = "Avg. time: N/A";
			cd_timer.innerHTML = "Let's see how fast you can click on<br><b>DEEZ BAD BALLS.</b><br><h5>They will only show on the center.</h5>";
		}
	};
	req.send();
}

function stat(){
	var req = new XMLHttpRequest();
	req.open("get", file_path + "stat.html");
	req.onload = function(){
		var content = document.getElementById("board");
		content.innerHTML = this.responseText;
		container = document.getElementById("container");
		container.style.background = bk_color;
	};
	req.send();
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
				min = 0, sec = 29;
			if(sec < 10)
				sec = '0' + sec;
			if(min < 10)
				min = '0' + min;
			timer.innerHTML = "Time: " + min + ":" + sec;
			pad_timer.innerHTML = min + ":" + sec;
			if(sec != 0)
				setTimeout(timerCycle, 1000);
			else
				end_game();
		}
	}
}

function readytoplay() {
	dot_cnt = 0, accu_cnt = 0, ball_cnt = 0, ballid_cnt = 0, duration_cnt = 0, best_duration_cnt = 100000000000;
	duration_time = 0, total_following_time = 0, following_time = 0, best_following_time = 0;
	ava_killball = 1;
	footer_text.innerHTML = "&nbsp&nbsp&nbspPress <b>ESC</b> or <b>Spacebar</b> to end the game"
	cd_timer.style.fontSize = "50px";
	b1.remove();
	b2.remove();
	window.addEventListener("keydown", end_game, false);
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

function end_game(event){
	if((mode == 1 && min == 0 && sec == 0) || (event && (event.key === "Escape" || event.keyCode === 32))){
		stop = true;	
		ava_killball = 0;
		if(mode == 2 && game){
			document.getElementById("0").removeEventListener("mouseenter", function(){isOnDiv = 1;}, false);
			document.getElementById("0").removeEventListener("mouseout", function(){isOnDiv = 0;}, false);
		}
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
			var score_container = container;
			score_container.setAttribute("class", "unselectable")
			score_container.style.zIndex = "1";
			score_container.innerHTML = "<div id =\"block1\"></div><div id =\"block2\"></div>";
			document.getElementById("board").appendChild(score_container);
			var bt = document.createElement("button");
			var gt = document.createElement("div");
			document.getElementById("footer_text").remove();
			bt.setAttribute("id", "b2");
			bt.setAttribute("onclick", "menu()");
			bt.style.transform = "translate(-50%, 0%)";
			bt.style.left = "50%";
			bt.style.bottom = "20px";
			bt.innerHTML = "back";
			gt.setAttribute("id", "title_name");
			document.getElementById("container").appendChild(bt);
			title.style.transition = "0s";
			title.style.opacity = "1";
			ct.style.transition = "0s";
			ct.style.opacity = "1";
			ct.style.background = "#FFFFFF";
			title.innerHTML = "";
			gt.innerHTML = "Score"
			document.getElementById("title").appendChild(gt);
			ct.remove();
			var b_1 = document.getElementById("block1");
			var b_2 = document.getElementById("block2");
			var text1 = "<h2>";
			var text2 = "<h2>&nbsp</h2>";
			if(mode == 1)
				text1 += "Warmup mode";
			else if(mode == 2)
				text1 += "Strafing mode";
			else if(mode == 3)
				text1 += "Precision mode";
			else if(mode == 4)
				text1 += "Doubleshot mode";
			else if(mode == 5)
				text1 += "Sniping mode";
			else
				text1 += "Reaction mode";
			text1 += "</h2>";
			if(!ball_cnt && !total_following_time && !duration_cnt)
				text1 += "<p id = \"no_score\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You have no score in this game!</p>";
			else{
				text1 += "<ul><li>Game Time</li>";
				text2 += "<ul id =\"b2ul\"><li>";
				if(mode == 1){
					if(sec > 20)
						text2 += "00:0" + (30 - sec) + "</li>";
					else
						text2 += "00:" + (30 - sec) + "</li>";
				}
				else{
					if(min < 10)
						text2 += "0" + parseInt(min) + ":";
					else
						text2 += parseInt(min) + ":";
					if(sec < 10)
						text2 += "0" + parseInt(sec) + "</li>";
					else
						text2 += parseInt(sec); + "</li>";
				}
				if(mode == 2){
					var avg_ac = Math.floor((total_following_time / duration_time) * 1000) / 10;
					text1 += "<li>Following Time</li>";
					text2 += "<li>" + (total_following_time / 100).toFixed(2) + "s</li>";
					text1 += "<li>Longest Following Time</li>";
					text2 += "<li>" + (best_following_time / 100).toFixed(2) + "s</li>";
					text1 += "<li>Accuracy</li>";
					text2 += "<li>" + avg_ac + "%</li>";
					text1 += "<li>Difficulty</li><li style=\"padding-top: 5px; font-size: 30px\">Ranking</li></ul>";
					if(difficulty == 1){
						text2 += "<li>EASY</li><li style=\"padding-top: 5px; font-size: 30px\"><b>";
						if(avg_ac > 95)
							text2 += "B"
						else if(avg_ac >75)
							text2 += "C"
						else
							text2 += "D"
					}
					else if(difficulty == 2){
						text2 += "<li>NORMAL</li><li style=\"padding-top: 5px; font-size: 30px\"><b>";
						if(avg_ac > 97)
							text2 += "A"
						else if(avg_ac > 87)
							text2 += "B"
						else if(avg_ac > 60)
							text2 += "C"
						else
							text2 += "D"
					}
					else if(difficulty == 3){
						text2 += "<li>HARD</li><li style=\"padding-top: 5px; font-size: 30px\"><b>";
						if(avg_ac > 73){
							smode[1] = 1;
							text2 += "S";
						}
						else if(avg_ac > 50)
							text2 += "A"
						else if(avg_ac > 30)
							text2 += "B"
						else if(avg_ac > 20)
							text2 += "C"
						else
							text2 += "D"
					}
					text2 += "</b></li></ul>";
				}
				else if(mode == 6){
					var avg_rt = Math.round(duration_cnt / accu_cnt);
					var avg_ac = Math.floor((accu_cnt / dot_cnt) * 1000) / 10
					text1 += "<li>Average Reation Time</li>";
					text2 += "<li>" + avg_rt + "ms</li>";
					text1 += "<li>Fastest Reation Time</li>";
					text2 += "<li>" + Math.round(best_duration_cnt) + "ms</li>";
					text1 += "<li>Accuracy</li>";
					text2 += "<li>" + avg_ac + "%</li>";
					text1 += "<li>Difficulty</li><li style=\"padding-top: 5px; font-size: 30px\">Ranking</li></ul>";
					if(difficulty == 1)
						text2 += "<li>EASY</li><li style=\"padding-top: 5px; font-size: 30px\"><b>";
					else if(difficulty == 2)
						text2 += "<li>NORMAL</li><li style=\"padding-top: 5px; font-size: 30px\"><b>";
					else if(difficulty == 3)
						text2 += "<li>HARD</li><li style=\"padding-top: 5px; font-size: 30px\"><b>";
					if(avg_rt < 230){
						if(avg_ac > 90){
							smode[5] = 1;
							text2 += "S";
						}
						else if(avg_ac > 85)
							text2 += "A";
						else if(avg_ac > 80)
							text2 += "B";
						else if(avg_ac > 60)
							text2 += "C";
					}
					else if(avg_rt < 260){
						if(avg_ac > 90)
							text2 += "A";
						else if(avg_ac > 85)
							text2 += "B";
						else if(avg_ac > 80)
							text2 += "C";
					}
					else if(avg_rt < 300){
						if(avg_ac > 90)
							text2 += "B";
						else if(avg_ac > 85)
							text2 += "C";				
					}
					else if(avg_rt < 500 && avg_ac > 90)
							text2 += "C";
					else
						text2 += "D";
					text2 += "</b></li></ul>";
				}
				else{
					var avg_th = Math.floor((accu_cnt / ball_cnt) * 1000) / 10;
					var avg_ac = Math.floor((accu_cnt / dot_cnt) * 1000) / 10;
					text1 += "<li>Number of Targets</li>";
					text2 += "<li>" + ball_cnt + "</li>";
					text1 += "<li>Target Hits</li>";
					text2 += "<li>" + accu_cnt + "</li>";
					text1 += "<li>Hit Rate</li>";
					text2 += "<li>" + avg_th + "%</li>";
					text1 += "<li>Accuracy</li>";
					if(dot_cnt)
						text2 += "<li>" + avg_ac + "%</li>";
					else
						text2 += "<li>0%</li>";
					text1 += "<li>Difficulty</li><li style=\"padding-top: 5px; font-size: 30px\">Ranking</li></ul>";
					if(difficulty == 1){
						text2 += "<li>EASY</li><li style=\"padding-top: 5px; font-size: 30px\"><b>";
						if(dot_cnt){
							if(mode == 1){
								if(sec < 10){
									if(avg_ac > 99 && avg_th > 99)
										text2 += "B";
									else if(avg_ac > 85 && avg_th > 90)
										text2 += "C";
									else
										text2 += "D";
								}
								else if(sec < 20){
									if(avg_ac > 90 && avg_th > 80)
										text2 += "C";
									else
										text2 += "D";
								}
								else{
									if(avg_ac > 95)
										text2 += "C";
									else
										text2 +="D"
								}
							}
							else if(mode == 3){
								if(sec < 10)
									text2 += "D";
								else if(sec < 25){
									if(avg_ac > 99 && avg_th > 99)
										text2 += "C";
									else
										text2 += "D";
								}
								else{
									if(avg_ac > 99 && avg_th > 99)
										text2 += "B";
									else if(avg_ac > 95 && avg_th > 95)
										text2 += "C";
									else
										text2 += "D";
								}
							}
							else if(mode == 4){
								if(sec < 10)
									text2 += "D";
								else if(sec < 25){
									if(avg_ac > 80 && avg_th > 60)
										text2 += "C";
									else
										text2 += "D";
								}
								else{
									if(avg_ac > 90 && avg_th > 90)
										text2 += "B";
									else if(avg_ac > 70 && avg_th > 70)
										text2 += "C";
									else
										text2 += "D";
								}
							}
							else{
								if(sec < 5)
									text2 += "D";
								else if(sec < 10){
									if(avg_ac > 90 && avg_th > 90)
										text2 += "C";
									else
										text2 += "D";
								}
								else{
									if(avg_ac > 99 && avg_th > 99)
										text2 += "B";
									else if(avg_ac > 80 && avg_th > 80)
										text2 += "C";
									else
										text2 += "D";
								}
							}
						}
						else
							text2 += "D";
					}
					else if(difficulty == 2){
						text2 += "<li>NORMAL</li><li style=\"padding-top: 5px; font-size: 30px\"><b>";
						if(dot_cnt){
							if(mode == 1){
								if(sec < 10){
									if(avg_ac > 99 && avg_th > 99)
										text2 += "A";
									else if(avg_ac > 96 && avg_th > 96)
										text2 += "B";
									else if(avg_ac > 80 && avg_th > 80)
										text2 += "C";
									else
										text2 += "D";
								}
								else if(sec < 15){
									if(avg_ac > 98 && avg_th > 96)
										text2 += "B";
									else if(avg_ac > 80 && avg_th > 60)
										text2 += "C";
									else
										text2 += "D";
								}
								else{
									if(avg_ac > 90 && avg_th > 60)
										text2 += "C";
									else
										text2 +="D"
								}
							}
							else if(mode == 3){
								if(sec < 8)
									text2 += "D";
								else if(sec < 15){
									if(avg_ac > 90 && avg_th > 90)
										text2 += "C";
									else
										text2 += "D";
								}
								else{
									if(avg_ac > 99 && avg_th > 99)
										text2 += "A";
									else if(avg_ac > 85 && avg_th > 86)
										text2 += "B";
									else if(avg_ac > 95 && avg_th > 95)
										text2 += "C";
									else
										text2 += "D";
								}
							}
							else if(mode == 4){
								if(sec < 6)
									text2 += "D";
								else if(sec < 13){
									if(avg_ac > 90 && avg_th > 90)
										text2 += "C";
									else
										text2 += "D";
								}
								else if(sec < 20){
									if(avg_ac > 90 && avg_th > 80)
										text2 += "B";
									else if(avg_ac > 40 && avg_th > 40)
										text2 += "C";
									else
										text2 += "D";
								}
								else{
									if(avg_ac > 99 && avg_th > 99)
										text2 += "A";
									else if(avg_ac > 80 && avg_th > 64)
										text2 += "B";
									else if(avg_ac > 40 && avg_th > 40)
										text2 += "C";
									else
										text2 += "D";
								}
							}
							else{
								if(sec < 5){
									if(avg_ac > 99 && avg_th > 99)
										text2 += "C";
									else
										text2 += "D";
								}
								else if(sec < 10){
									if(avg_ac > 99 && avg_th > 99)
										text2 += "B";
									else if(avg_ac > 80 && avg_th > 80)
										text2 += "C";
									else
										text2 += "D";
								}
								else{
									if(avg_ac > 99 && avg_th > 99)
										text2 += "A";
									else if(avg_ac > 90 && avg_th > 90)
										text2 += "B";
									else if(avg_ac > 70 && avg_th > 70)
										text2 += "C";
									else
										text2 += "D";
								}
							}
						}
						else
							text2 += "D";
					}
					else if(difficulty == 3){
						text2 += "<li>HARD</li><li style=\"padding-top: 5px; font-size: 30px\"><b>";
						if(dot_cnt){
							if(mode == 1){
								if(sec < 10){
									if(avg_ac > 99 && avg_th > 99){
										smode[0] = 1;
										text2 += "S";
									}
									else if(avg_ac > 95 &&  avg_th > 95)
										text2 += "A";
									else if(avg_ac > 90 &&  avg_th > 80)
										text2 += "B";
									else if(avg_ac > 50 &&  avg_th > 20)
										text2 += "C";
									else
										text2 += "D";
								}
								else if(sec < 15){
									if(avg_ac > 99 && avg_th > 99)
										text2 += "A";
									else if(avg_ac > 95 && avg_th > 95)
										text2 += "B";
									else if(avg_ac > 60 && avg_th > 25)
										text2 += "C";
									else
										text2 += "D";
								}
								else{
									if(avg_ac > 80 && avg_th > 70)
										text2 += "C";
									else
										text2 += "D"
								}
							}
							else if(mode == 3){
								if(sec < 6){
									if(avg_ac > 99 && avg_th > 99)
										text2 += "A";
									else if(avg_ac > 60 && avg_th > 60)
										text2 += "B";
									else if(accu_cnt)
										text2 += "C";
									else
										text2 += "D";
								}
								else if(sec < 13){
									if(avg_ac > 99 && avg_th > 99)
										text2 += "A";
									else if(avg_ac > 60 && avg_th > 60)
										text2 += "B";
									else if(accu_cnt)
										text2 += "C";
									else
										text2 += "D";
								}
								else if(sec < 20){
									if(avg_ac > 99 && avg_th > 99){
										smode[2] = 1;
										text2 += "S";
									}
									else if(avg_ac > 90 && avg_th > 90)
										text2 += "A";
									else if(avg_ac > 60 && avg_th > 60)
										text2 += "B";
									else if(accu_cnt > 3)
										text2 += "C";
									else
										text2 += "D";
								}
								else{
									if(avg_ac > 85 && avg_th > 85){
										smode[2] = 1;
										text2 += "S";
									}
									else if(avg_ac > 75 && avg_th > 75)
										text2 += "A";
									else if(avg_ac > 40 && avg_th > 40)
										text2 += "B";
									else if(accu_cnt > 5)
										text2 += "C";
									else
										text2 += "D";
								}
								
							}
							else if(mode == 4){
								if(sec < 3)
									text2 += "D";
								else if(sec < 5){
									if(avg_ac > 80 && avg_th > 70)
										text2 += "C";
									else
										text2 += "D";
								}
								else if(sec < 8){
									if(avg_ac > 90 && avg_th > 80)
										text2 += "B";
									else if(avg_ac > 40 && avg_th > 40)
										text2 += "C";
									else
										text2 += "D";
								}
								else if(sec < 12){
									if(avg_ac > 95 && avg_th > 90)
										text2 += "A";
									else if(avg_ac > 80 && avg_th > 75)
										text2 += "B";
									else if(avg_ac > 40 && avg_th > 40)
										text2 += "C";
									else
										text2 += "D";
								}
								else if(sec < 20){
									if(avg_ac > 99 && avg_th > 96){
										smode[3] = 1;
										text2 += "S";
									}
									if(avg_ac > 90 && avg_th > 80)
										text2 += "A";
									else if(avg_ac > 80 && avg_th > 70)
										text2 += "B";
									else if(avg_ac > 30 && avg_th > 30)
										text2 += "C";
									else
										text2 += "D";
								}
								else{
									if(avg_ac > 95 && avg_th > 92){
										smode[3] = 1;
										text2 += "S";
									}
									if(avg_ac > 85 && avg_th > 75)
										text2 += "A";
									else if(avg_ac > 70 && avg_th > 60)
										text2 += "B";
									else if(avg_ac > 20 && avg_th > 20)
										text2 += "C";
									else
										text2 += "D";
								}
							}
							else{
								if(sec < 3){
									if(accu_cnt)
										text2 += "C";
									else
										text2 += "D";
								}
								else if(sec < 12){
									if(avg_ac > 85 && avg_th > 85)
										text2 += "A";
									else if(avg_ac > 80 && avg_th > 80)
										text2 += "B";
									else if(avg_ac > 30 && avg_th > 30)
										text2 += "C";
									else
										text2 += "D";
								}
								else{
									if(avg_ac > 99 && avg_th > 99){
										smode[4] = 1;
										text2 += "S";
									}
									else if(avg_ac > 80 && avg_th > 80)
										text2 += "A";
									else if(avg_ac > 70 && avg_th > 70)
										text2 += "B";
									else if(accu_cnt)
										text2 += "C";
									else
										text2 += "D";
								}
							}
						}
						else
							text2 += "D";
					}
					text2 += "</b></li></ul>";
				}
				//statistics.push([]);
			}
			b_1.innerHTML = text1;
			b_2.innerHTML = text2;
		}
		window.removeEventListener("keydown", end_game, false);
	}
}

function handleMouseMove(event){mousePos = {x:event.pageX, y:event.pageY};}

set_difficulty = function(diff){
	difficulty = diff;
	container.style.transition = "0.5s";
	if(difficulty == 1){
		if(checkbox[0].checked == false)
			checkbox[0].checked = true;
		else{
			checkbox[1].checked = false;
			checkbox[2].checked = false;
			bk_color = "#B7AE9C";
			container.style.background = bk_color;
			dif_r = 10;
			dif_mx = 35;
			dif_t = 500;
			dif_s = 0;
		}
	}
	else if(difficulty == 2){
		if(checkbox[1].checked == false)
			checkbox[1].checked = true;
		else{
			checkbox[0].checked = false;
			checkbox[2].checked = false;
			bk_color = "#A7B2C4";
			container.style.background = bk_color;
			dif_r = 5;
			dif_mx = 15;
			dif_t = 200;
			dif_s = 0;
		}
	}
	else if(difficulty == 3){
		if(checkbox[2].checked == false)
			checkbox[2].checked = true;
		else{
			checkbox[0].checked = false;
			checkbox[1].checked = false;
			bk_color = "#B5A1A9";
			container.style.background = bk_color;
			dif_r = 0;
			dif_mx = -5;
			dif_t = 0;
			dif_s = 0;
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
		this.mouse_detect = 0;
		this.progressing = 0;
	}
	
	build(father){
		this.ball.setAttribute("id", this.id);
		this.ball.setAttribute("class", "ball");
		this.ball.setAttribute("style", "position:absolute; border-radius:100%");
		this.ball.setAttribute("onclick", "emptycc()");
		this.ball.style.width = this.r + "px";
		this.ball.style.height = this.r + "px";
		this.ball.style.background = "repeating-radial-gradient(#FFEEDD, #FFBB77, #FF8000, #BB5E00, #844200)";
		var rand_init_x = Math.floor(Math.random() * (this.ct_boundary.width - this.maxsize));
		var rand_init_y = Math.floor(Math.random() * (this.ct_boundary.height - this.maxsize));
		if(mode == 1){
			rand_init_x += maxsize / 2;
			rand_init_y += maxsize / 2;
		}
		if(mode == 2 || mode == 6){
			rand_init_x = this.ct_boundary.width / 2 - this.maxsize / 2 + 2;
			rand_init_y = this.ct_boundary.height / 2 - this.maxsize / 2 - 13;
		}
		this.ball.style.left = rand_init_x + "px";
		this.ball.style.top = rand_init_y + "px";
		this.dirs = [this.newDir(), this.newDir()];
		this.pos = [rand_init_x, rand_init_y];
		if(mode == 5){
			var dis;
			if(difficulty != 3)
				dis = 160;
			else if(difficulty == 3)
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
	randomIni(i = -1){
		var ini;
		if(Math.random() > 0.5){
			if(Math.random() > 0.5)
				ini = 0
			else
				ini = 1/2;
		}
		else{
			if(Math.random() > 0.5)
				ini = 1;
			else
				ini = 3/2;
		}
		if(i == ini)
			return this.randomIni(i);
		return ini;
	}
	
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
	
	following_movement(){
		var b = this;
		if(!b.mouse_detect){
			b.mouse_detect = 1;
			var isOnDiv, tcnt = 0;
			b.ball.addEventListener("mouseenter", function(){isOnDiv = 1;}, false)
			b.ball.addEventListener("mouseout", function(){isOnDiv = 0;}, false)
			mouseDetecting = setInterval(checkMousePos, 10);
			function checkMousePos(){
				if(isOnDiv >= 0 && stop == false){
					duration_time++;
					tcnt++;
					var bg = "repeating-radial-gradient(#FFEEDD, #FFBB77, #FF8000, #BB5E00, #844200)";
					if(isOnDiv){
						following_time++;
						total_following_time++;
						//bg = "repeating-radial-gradient(#ECFFFF, #80FFFF, #00CACA, #007979, #003E3E)";
						bg = "repeating-radial-gradient(#D2E9FF, #66B3FF, #0072E3, #004B97, #003060)";
					}
					else
						following_time = 0;
					
					if(tcnt % 50 == 0){
						var accu_ratio = Math.floor((total_following_time / duration_time) * 1000);
						accuracy.innerHTML = "Accuracy: " +(accu_ratio / 10) + "%";
					}
					target.innerHTML = "Follow time: " + (total_following_time/100).toFixed(2);
					b.ball.style.background = bg;
					if(following_time > best_following_time)
						best_following_time = following_time;
				}
			}
		}
		if(!b.progressing){
			b.progressing = 1;
			var progress_time = (Math.random() < 0.4) ? 1 : 1.75, tcnt = 0;
			var initial_pos = b.randomIni(), progress, cwise = (Math.random() > 0.5) ? 1 : -1;
			var dis = [Math.round(Math.random() * 4 + 1), Math.round(Math.random() * 4 + 1)];
			var outofrange = 1, vir_pos, vir_progress;
			while(outofrange){
				outofrange = 0;
				vir_pos = [b.pos[0], b.pos[1]], vir_progress = initial_pos;
				for(var z = 0; z < progress_time * 40; z++){
					vir_progress += (cwise / (progress_time * 40));
					vir_pos[0] += Math.cos(vir_progress * Math.PI) * dis[0];
					vir_pos[1] += Math.sin(vir_progress * Math.PI) * dis[1];
					if(vir_pos[0] >= ct_boundary.width - b.r || vir_pos[0] <= 0 || vir_pos[1] >= ct_boundary.height - b.r || vir_pos[1] <= 0){
						outofrange = 1;
						initial_pos = b.randomIni(initial_pos);
						cwise = (Math.random() > 0.5) ? 1 : -1;
						dis = [Math.random() * 5, Math.random() * 5];
						break;
					}
				}
			}
			progress = initial_pos;
			setTimeout(curve_moving, 25);
			function curve_moving(){ 
				progress += (cwise / (progress_time * 40));
				var d = [Math.cos(progress * Math.PI) * dis[0], Math.sin(progress * Math.PI) * dis[1]]
				b.pos[0] += d[0];
				b.pos[1] += d[1];
				b.ball.style.left = b.pos[0] + "px";
				b.ball.style.top = b.pos[1] + "px";
				tcnt++; 
				if(tcnt == progress_time * 40)
					b.progressing = 0;
				else if(stop == false)
					setTimeout(curve_moving, 25);
			}
		}
	}
	
	precision_doubleshot_movement(){
		var b = this;
		var t = (mode == 3) ? 750 + dif_t * 2.5 : 900 + dif_t * 2;
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
			this.pos[0] = this.pos[0] - scalar/2 + this.dirs[0] * 1.75;
			this.pos[1] = this.pos[1] - scalar/2 + this.dirs[1] * 1.75;
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
			if(ava_killball){
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
				circle.style.pointerEvents = "none";
				if(mode == 6){
					duration_cnt += balls[id].duration;
					if(balls[id].duration < best_duration_cnt)
						best_duration_cnt = balls[id].duration;
					var avg_duration = (duration_cnt / (accu_cnt * 1000)).toFixed(3);
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
	}
	
	delball(id){
		this.ball.style.transition = "0.15s";
		this.ball.style.opacity = "0";
		this.alive = 0;
		if(mode != 6){
			ball_cnt++;
			target.innerHTML = "Target Hits: " + accu_cnt + "/" + ball_cnt;
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

var ct, ct_boundary, container;
var timer, pad_timer, cd_timer;
var min, sec, stop = true;

var statistics = [], game_cnt = 0;
var game, reaction_time = [], mouseDetecting, ava_killball;
var n = 3, i;
var balls, ids = [];
var accuracy, target, start_bt, footer_text;
var dot_cnt, accu_cnt, ball_cnt, ballid_cnt, duration_cnt, best_duration_cnt;
var mousePos, duration_time, total_following_time, following_time ,best_following_time;
var mode, t, difficulty = 2, bk_color= "#A7B2C4";
var checkbox = [], smode = [];
var dif_r = 5, dif_mx = 15, dif_t = 200, dif_s = 0;
function gamestart(){
	if(stop == false){
		if(mode == 1)
			min = 1, sec = 0;
		else
			min = 0, sec = 0;
		setTimeout(timerCycle, 1000);
		balls = [], ids = [];
		ct.onclick = function(mouse){
			if(ava_killball){
				var dot = document.createElement("div");
				dot.setAttribute("id", "p" + dot_cnt);
				dot.setAttribute("style", "position: absolute; border-radius:100%");
				dot.style.width = "5px";
				dot.style.height = "5px";
				dot.style.backgroundColor = "#D0D0D0";
				dot.style.left = (mouse.pageX - ct_boundary.left) + "px";
				dot.style.top = (mouse.pageY - ct_boundary.top) + "px";
				dot.style.pointerEvents = "none";
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
		}
		if(mode == 6)
			setTimeout(createBall, Math.round(Math.random() * 1500 + 750));
		else
			setTimeout(createBall, 0);
		
		if(mode == 2)
			ava_killball = 0;
		if(mode == 4)
			setTimeout(createBall, 0);
		if(mode == 5 && difficulty == 1)
			game = setInterval(frame, 40);
		else
			game = setInterval(frame, 25);
		function frame(){
			for (i = 0; i < ids.length; i++){
				var id = ids[i];
				if(mode == 1)
					balls[id].speed_movement();
				else if(mode == 2)
					balls[id].following_movement();
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
	if(mode == 1)
		r = 5;
	else if(mode == 2)
		r = 25 + dif_r * 10;
	else if(mode == 3)
		r = 10 + dif_r * 7;
	else if(mode == 4)
		r = 35 + dif_r * 5, mxsize = 35;
	else if(mode == 5){
		if(difficulty == 3)
			r = 8, mxsize = 28;
		else
			r = 13, mxsize = 40;
	}
	if(mode != 5)
		mxsize += dif_mx;
	if(r > mxsize)
		mxsize = r;
	return [id, r, c, mxsize];
}

function respawn_time(t){
	var time = t;
	if(mode == 1){
		if(time > 1000 + dif_t)
			time -= Math.ceil(Math.random()*150 + 250);
		else if (time > 700 + dif_t)
			time -= Math.ceil(Math.random()*100 + 50);
		else if (time > 450 + dif_t * 1.4)
			time -= Math.ceil(Math.random()*50 + 30);
		else if (time > 400 + dif_t * 1.3)
			time -= Math.ceil(Math.random()*20 + 10);
		else if (time > 330 + dif_t * 1.2)
			time--;
	}
	else if(mode == 2)
		time = 20000000;
	else if(mode == 3)
		time = 1500 + dif_t * 2.5;
	else if(mode == 4)
		time = 1500 + dif_t * 2.5;
	else if(mode == 5)
		time = 1250 + dif_t * 1.25;
	else if(mode == 6)
		time = Math.floor(Math.random() * 3750) + 1750;
	return time;
}