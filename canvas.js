var canvas = document.querySelector("canvas");
canvas.width=1240;
canvas.height=500;
var gameovermsg= canvas.getContext("2d");
var shooter = canvas.getContext("2d");
var ammo = canvas.getContext("2d");
var ship_img_src = document.getElementById("ship");
var ship_img = canvas.getContext("2d");
var shooter_img = document.getElementById("shooter");
var ship_img1 = canvas.getContext("2d");
var ship_img1_src = document.getElementById("ship1");
var move_alien =10;
var dir_checker =0,tc=0;
var vertical=413,horizontal=546;
var arr=[],shot=0,pos=[];
var score=0,level=1,second=0;
var time= setInterval(function(){time; second++;},1000);
var x=0,z=[60,60],w=0,y=[0,0],d=[],a=[],v=0;
var fire=0,start=[],ammomove=[],ammoposition=[],gameover=0;
var Hscore =localStorage.getItem('HScore');
var speed=3,game_end=0,tt=0;
var shot_no=[],xx;
if(Hscore==null)
Hscore=0;
for(var i=0;i<72;i++)
{
    arr[i]=1;
    shot_no[i]=1;
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
    if(second==10)
    {
    level=2;
    for(var i=0;i<72;i++)
   {
    if(arr[i]==0)
    {
        arr[i]=2;
        shot_no[i]=2;
    }
       }
    }
    ship_img.clearRect(0,0,innerWidth,innerHeight);
    gameovermsg.fillStyle="Blue";
        gameovermsg.font="13px Arial";
        gameovermsg.fillText("Ammo:"+(5-shot),1180,340);
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
    if(gameover==0&&tt==0)
    requestAnimationFrame(animate);
    shooter.drawImage(shooter_img,horizontal,vertical,60,60);
    ammo.fillStyle="red";
    for(var k=0;k<shot;k++)
    {
    if(start[k]==1)
    {
    ammomove[k]-=3;
    ammo.fillRect(ammoposition[k]+28,ammomove[k],4,10);
    for(var l=0;l<level;l++){
    if(ammomove[k]<=(z[l]+60)&&((a[l]-10)<=ammoposition[k]&&(a[l]+60)>=ammoposition[k]))
    {
        w=0;
        shot_no[k]--;
        console.log(shot_no);
        if(shot_no[k]==0)
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
      if(arr[i+54]!=0&&ammomove[k]<250)
      {
      shot_no[i+54]--;
      if(shot_no[i+54]==0)
      {
        arr[i+54]=0;
      }
      start[k]=0;
      score+=1;
      }
      else if(arr[i+36]!=0&&ammomove[k]<190){
      shot_no[i+36]--;
      if(shot_no[i+36]==0)
      {
      arr[i+36]=0;
      }
      start[k]=0;
      score+=1;
      }
      else if(arr[i+18]!=0&&ammomove[k]<=130){
      shot_no[i+18]--;
      if(shot_no[i+18]==0)
      {
      arr[i+18]=0;
      }
      start[k]=0;
      score+=1;
      }
      else if(arr[i]!=0&&ammomove[k]<=70){
          shot_no[i]--;
          if(shot_no[i]==0)
          {
           arr[i]=0;
          }
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
        gameovermsg.fillText("R",1200,110);
        gameovermsg.fillText("E",1200,135);
        gameovermsg.fillText("L",1200,160);
        gameovermsg.fillText("O",1200,185);
        gameovermsg.fillText("A",1200,210);
        gameovermsg.fillText("D",1200,235);
        gameovermsg.fillText("I",1200,260);
        gameovermsg.fillText("N",1200,285);
        gameovermsg.fillText("G",1200,310);
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
    {
        if(w==0)
        {
            for(var l=0;l<level;l++)
            {
                v++;
            do{
            d[l]=Math.floor(Math.random()*90);
            }while(arr[d[l]]==0)
        
         w=1;
         y[l]=1;
        }
        }
        for(var l=0;l<level;l++)
            {
        if(y[l]==1&&x==d[l])
        {
            z[l]=i;
            y[l]=0;
            a[l]=j;
            arr[x]=0;
        }
        if(w==1&&v>0&&x==d[l])
        {
        z[l]+=speed;
         ship_img.drawImage(ship_img_src,a[l],z[l],60,60);
         if((z[l]>=vertical&&z[l]<=vertical+2)&&((a[l]>horizontal&&a[l]<(horizontal+60))||((a[l]+60)<=(horizontal+60)&&(a[l]+60)>=horizontal)))
         {
              z[l]=492;
              gameover=1;
         }
        }
        if(z[l]>492)
        {
            w=0;
            v--;
        }
    }
    if(arr[x]==1)
    {
    ship_img.drawImage(ship_img_src,j,i,60,60);
    game_end++
    }
    if(arr[x]==2)
    {
        ship_img1.drawImage(ship_img1_src,j,i,60,60);
        game_end++;
    }
    }
}
if(game_end==0)
{
    gameovermsg.fillStyle="GREEN";
        gameovermsg.font="25px Arial";
        gameovermsg.fillText("Game End!",500,350,200);
        if(Hscore<=score)
        {
            gameovermsg.fillText("Congratulation! You have crossed Highest Score!",300,320);
        localStorage.setItem("HScore",score);
        }
    tt=1;
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
        if(horizontal>0)
        horizontal-=16;
        //console.log("left");
    }
    if(e.keyCode==38)//upper
    {
        //console.log("upper");
        vertical-=16;
    }
    if(e.keyCode==39)//right
    {
       // console.log("right");
        if(horizontal<1140)
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
