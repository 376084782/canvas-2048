function ini_mydata(){
	var mydata=new Array(4);
	for(var i=0;i<4;i++){
		mydata[i]=new Array(4);
		for(var m=0;m<4;m++){
			mydata[i][m]={
				color:"#CCC0B2",
				num:0
			}
		}
	}
	return mydata;
}
function ini_data(){
	var data=new Array(10);
	data[0]={
		num:2,
		color:"#EEE4DA"
	}
	colors=["#EEE4DA","#ECE0CA","#F2B179","#F99265","#F57C61","#F3CD7C","#EDCC61","#EBC94E","#EFC442","#F7A78C","#F7A78C","#F7A78C"];
	for(var i=1;i<data.length;i++){
		data[i]={
			num:data[i-1].num*2,
			color:colors[i]
		}
	}
	return data;
}
function add(mydata,context,data){
	var change=data[Math.floor(Math.random()*3)];
	mydataX=[];
	mydataY=[];
	for(var m=0;m<4;m++)
		for(var n=0;n<4;n++){
			if(mydata[m][n].num==0){
				mydataX.push(m);
				mydataY.push(n);
			}
		}
		
		var i=Math.floor(Math.random()*mydataX.length);
	var x=mydataX[i];
	var y=mydataY[i];
	mydata[x][y].num=change.num;
	mydata[x][y].color=change.color;
	
	draw_each(mydata,context);
}

function draw_each(mydata,context){
	var x,y;
	for(var m=0;m<4;m++)
		for(var n=0;n<4;n++){
			context.restore();
			context.fillStyle=mydata[m][n].color;
			x=(m+1)*110-100;
			y=(n+1)*110-100;
			context.fillRect(x,y,100,100);
			if(mydata[m][n].num!=0){
				context.restore();
				context.font = "40px Courier New";
				context.fillStyle="black";
				context.textAlign='center';
				context.textBaseline='middle';
				context.fillText(mydata[m][n].num,x+50,y+50,100);
			}
		}
}
function findcolor(num,data){
	var color;
	for(var i=0;i<data.length;i++){
		if(data[i].num==num){
			color=data[i].color;
			break;
		}
	}
	return color;
}
function judge(data){
	var a=0;
	for(var m=0;m<4;m++)
		for(var n=0;n<4;n++){if(data[m][n].num==0)a=1;}
	for(var m=0;m<3;m++)
		for(var n=0;n<3;n++){
			if(data[m][n].num==data[m+1][n].num||data[m][n].num==data[m][n+1].num){
				var a=1;
			}
		}
	for(var i=0;i<3;i++){
		if(data[3][i].num==data[3][i+1].num){
			a=1
		}
		if(data[i][3].num==data[i+1][3].num){a=1}
	}return a;
}


window.onload=function(){
		var canvas=document.getElementById('main');
		var context=canvas.getContext('2d');
		canvas.height=450;
		canvas.width=450;
		context.fillStyle="#B7B09E";
		context.fillRect(0,0,500,500);
		context.save();
	var mydata=ini_mydata();
	var data=ini_data();
	add(mydata,context,data);
	var change1,chang2,change3,change4;
	var allow=1;
	document.onkeydown=function(e){
		var key=e.keyCode;
		var result=1;
		if(allow){
			switch(key){
			case 37:
			change1=0;
			while(result==1){
				result=0;
				for(var m=0;m<4;m++)
					for(var n=0;n<4;n++){
						if(m<3&&((mydata[m][n].num!=0&&mydata[m][n].num==mydata[m+1][n].num)||(mydata[m][n].num==0&&mydata[m+1][n].num!=0))){
						result=1;change1=1;
						mydata[m][n].num+=mydata[m+1][n].num;
						mydata[m][n].color=findcolor(mydata[m][n].num,data);
						mydata[m+1][n].num=0;mydata[m+1][n].color="#CCC0B2";draw_each(mydata,context);
						}
					}
			}
			if(change1==1){
				add(mydata,context,data);
			}
			break;

			case 38:
			change2=0;
			while(result==1){
				result=0;
				for(var m=0;m<4;m++)
					for(var n=0;n<4;n++){
						if(n<3&&((mydata[m][n].num!=0&&mydata[m][n].num==mydata[m][n+1].num)||(mydata[m][n].num==0&&mydata[m][n+1].num!=0))){
						result=1;change2=1;
						mydata[m][n].num+=mydata[m][n+1].num;
						mydata[m][n].color=findcolor(mydata[m][n].num,data);
						mydata[m][n+1].num=0;mydata[m][n+1].color="#CCC0B2";draw_each(mydata,context);
						}
					}
			}
			if(change2==1){
				add(mydata,context,data);
			}
			break;

			case 39:
			change3=0;
			while(result==1){
				result=0;
				for(var m=3;m>0;m--)
					for(var n=0;n<4;n++){
						if(m>0&&((mydata[m][n].num!=0&&mydata[m][n].num==mydata[m-1][n].num)||(mydata[m][n].num==0&&mydata[m-1][n].num!=0))){
						result=1;change3=1;
						mydata[m][n].num+=mydata[m-1][n].num;
						mydata[m][n].color=findcolor(mydata[m][n].num,data);
						mydata[m-1][n].num=0;mydata[m-1][n].color="#CCC0B2";draw_each(mydata,context);
						}
					}
			}
			if(change3==1){
				add(mydata,context,data);
			}
			break;

			case 40:
			change4=0;
			while(result==1){
				result=0;
				for(var m=0;m<4;m++)
					for(var n=3;n>0;n--){
						if(n>0&&((mydata[m][n].num!=0&&mydata[m][n].num==mydata[m][n-1].num)||(mydata[m][n].num==0&&mydata[m][n-1].num!=0))){
						result=1;change4=1;
						mydata[m][n].num+=mydata[m][n-1].num;
						mydata[m][n].color=findcolor(mydata[m][n].num,data);
						mydata[m][n-1].num=0;mydata[m][n-1].color="#CCC0B2";draw_each(mydata,context);
						}
					}
			}
			if(change4==1){
				add(mydata,context,data);
			}
			break;
		}var judgement=judge(mydata);
		if(judgement==0){
			context.restore();
			context.fillStyle="rgba(224, 160, 71, 0.5)";
			context.fillRect(0,0,450,450);
			context.restore();
			context.fillStyle="black";
			context.font="60px;"
			context.fillText("Stupid!",225,225);
			context.textAlign="center";
			context.textBaseline="middle";
			allow=0;
		}
	}
}
}