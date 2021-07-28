var canvas = document.querySelector("canvas");
canvas.width=1240;
canvas.height=500;
var gameovermsg= canvas.getContext("2d");
var shooter = canvas.getContext("2d");
var ammo = canvas.getContext("2d");
var ship_img_src = document.getElementById("ship");
var ship_img = canvas.getContext("2d");
var shooter_img = document.getElementById("shooter");
var move_alien =10;
var dir_checker =0,tc=0;
var vertical=413,horizontal=546;
var arr=[],shot=0,pos=[];
var score=0,level=1,second=0;
var time= setInterval(function(){time; second++;},1000);
var x=0,z=[60,60],w=[0,0],y=[0,0],d=[],a=[],v=0;
var fire=0,start=[],ammomove=[],ammoposition=[],gameover=0;
var Hscore =localStorage.getItem('HScore');
var speed=3,game_end=0,tt=0,speedlevel=1,bonas_scr=0,bullet_speed=5,timeset=10;
if(Hscore==null)
Hscore=0;
for(var i=0;i<72;i++)
{
    arr[i]=1;
}
animate();
function animate()
{
    pos[0]=move_alien;
for(var i=1;i<19;i++)
{
    pos[i]=pos[i-1]+60;
}
    x=0;
    if(second==timeset&&bonas_scr==0)
    {
    level=2;
    score+=5;
    bonas_scr=1;
    }
    ship_img.clearRect(0,0,innerWidth,innerHeight);
    gameovermsg.fillStyle="Blue";
        gameovermsg.font="13px Arial";
        gameovermsg.fillText("Ammo:"+(5-shot),1176,120);
    ammo.fillStyle="Black";
    ammo.fillRect(1170,0,5,550);
    gameovermsg.fillStyle="RED";
    if(score>Hscore)
    Hscore=score;
        gameovermsg.font="12px Arial";
        gameovermsg.fillText("HScore:"+Hscore,1176,20);
     gameovermsg.fillText("Score:"+score,1176,40);
     gameovermsg.fillText("Timer:"+second,1176,60);
     gameovermsg.fillText("Level:"+level,1176,80);
     gameovermsg.fillText("SLevel:"+speedlevel,1176,100);
    if(gameover==0&&tt==0)
    requestAnimationFrame(animate);
    shooter.drawImage(shooter_img,horizontal,vertical,60,60);
    ammo.fillStyle="red";
    for(var k=0;k<shot;k++)
    {
    if(start[k]==1)
    {
    ammomove[k]-=bullet_speed;
    ammo.fillRect(ammoposition[k]+28,ammomove[k],4,10);
    for(var l=0;l<level;l++){
    if(ammomove[k]<=(z[l]+60)&&((a[l]-30)<=ammoposition[k]&&(a[l]+60)>=ammoposition[k]))
    {
        w[l]=0;
        start[k]=0;
        if(level==1)
        score+=2;
        if(level==2)
        score+=4;
    }
}
    for(var i=0;i<18;i++)
    { 
     if(ammoposition[k]+28>pos[i]&&ammoposition[k]+28<pos[i+1])
     {
     /* if(arr[i+72]!=0&&ammomove<310){
        arr[72+i]=0;
        start=0;
      }
      else*/ if(arr[i+54]!=0&&ammomove[k]<250)
      {
      arr[i+54]=0;
      start[k]=0;
      score+=1;
      }
      else if(arr[i+36]!=0&&ammomove[k]<190){
      arr[i+36]=0;
      start[k]=0;
      score+=1;
      }
      else if(arr[i+18]!=0&&ammomove[k]<=130){
      arr[i+18]=0;
      start[k]=0;
      score+=1;
      }
      else if(arr[i]!=0&&ammomove[k]<=70){
        arr[i]=0;
        start[k]=0;
        score+=1;
        }
        else if(ammomove[k]<10){
            start[k]=0;
        }

     }
     }
    
}
    }
    if(tc==1)
    {
        gameovermsg.fillStyle="Blue";
        gameovermsg.font="25px Arial";
        gameovermsg.fillText("R",1200,150);
        gameovermsg.fillText("E",1200,175);
        gameovermsg.fillText("L",1200,200);
        gameovermsg.fillText("O",1200,225);
        gameovermsg.fillText("A",1200,250);
        gameovermsg.fillText("D",1200,275);
        gameovermsg.fillText("I",1200,300);
        gameovermsg.fillText("N",1200,325);
        gameovermsg.fillText("G",1200,350);
    }
  if(shot==5&&tc==0)
    {
        tc=1;
        setTimeout(function(){shot=0; tc=0;},3000);
    }
    game_end=0;
    for(var i=0,x=0;i<240;i+=60)
{ 
    for(var j=move_alien;j<1050+move_alien;j+=60,x++)
    {    for(var l=0;l<level;l++)
        {
        if(w[l]==0)
        {
            
                v++;
            do{
            d[l]=Math.floor(Math.random()*90);
            }while(arr[d[l]]!=1);
         w[l]=1;
         y[l]=1;
        }
       
        if(y[l]==1&&x==d[l])
        {
            z[l]=i;
            y[l]=0;
            a[l]=j;
            arr[x]=0;
        }
        if((w[l]==1||v>0)&&x==d[l])
        {
        z[l]+=speed;
         ship_img.drawImage(ship_img_src,a[l],z[l],60,60);
         if((z[l]>=vertical&&z[l]<=vertical+60)&&((a[l]>horizontal&&a[l]<(horizontal+60))||((a[l]+60)<=(horizontal+60)&&(a[l]+60)>=horizontal)))
         {
              z[l]=492;
              gameover=1;
         }
        }
        if(z[l]>=492&&w[l]==1)
        {
            w[l]=0;
            v--;
        }
    }
    if(arr[x]==1)
    {
    ship_img.drawImage(ship_img_src,j,i,60,60);
    game_end++
    }
    }
}
if(game_end==0)
{
   speedlevel+=2;
    tt=0;
    speed+=3;
    game_end=1;
    for(var i=0;i<72;i++)
{
    arr[i]=1;
} 
w=[0,0];
x=0;
score+=5;
bullet_speed++;
timeset+=second;
}
if(gameover==1)
    {
        gameovermsg.fillStyle="RED";
        gameovermsg.font="25px Arial";
        if(Hscore<=score)
        {
            gameovermsg.fillText("Congratulation! You have crossed Highest Score!",300,320);
        localStorage.setItem("HScore",score);
        }
        gameovermsg.fillText("Game Over!",500,350,200);
        gameovermsg.fillText("Press Enter To Restart!",440,380);
     shot=0;
    }

if(dir_checker==0)
{
move_alien++;
if(move_alien==90)
{
    dir_checker=1;

}
}
if(dir_checker==1)
{
move_alien--;
if(move_alien==10)
dir_checker=0;
}
}
document.body.onkeydown=  function(e){
    if(e.keyCode==37)//left
    {
        if(horizontal>10)
        horizontal-=16;
        //console.log("left");
    }
    if(e.keyCode==38)//upper
    {
       if(vertical>270)
        vertical-=16;
    }
    if(e.keyCode==39)//right
    {
       // console.log("right");
        if(horizontal<1100)
        horizontal+=16;
    }
    if(e.keyCode==40) //down
    {
       if(vertical<440)
       vertical+=16;
    }
    if(e.keyCode==17)
    {
        if(shot<5)
        {
        start[shot]=1;
        ammomove[shot]=vertical;
        ammoposition[shot]=horizontal;
        shot++;
        }
    }
   if(e.keyCode==13)
   {
       if(gameover==1)
       {
        location.reload();
       }
   }
}
