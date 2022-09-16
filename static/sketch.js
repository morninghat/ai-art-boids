// this is 🔥 

const flock=[];
let button;

var choicedraw=0;
var drawornot='NO';

var choicewalls=0;
var wallsornot='NO';

var choicepoint=0;
var pointornot='POINTS';

let s1,s2,s3;
let walls=[];
let obstacles=[];
var i=0

// api url
const api_url = 'http://10.132.197.13:5000/points';
// const api_url = 'http://127.0.0.1:5000/points';

function setup() {
  // put setup code here

    createCanvas(windowWidth,windowHeight);
    console.log(windowWidth)
    console.log(windowHeight)
    for(let i=0;i<120;i++)
        flock.push(new boids());


    button1 = createButton('GO TO GITHUB');
    button1.position(20, windowHeight-50);
    button1.mousePressed(gotolink);

    s1=createSlider(0,2,1,0.1);
    s1.position(10,10);
    s2=createSlider(0,2,1,0.1);
    s2.position(140,10);
    s3=createSlider(0,2,1,0.1);
    s3.position(270,10);

    button=createButton("DRAW");
    button.position(20,55);
    button.mousePressed(changeChoice);

    button=createButton("WALLS");
    button.position(20,85);
    button.mousePressed(changeWalls);

    button=createButton("SHAPE");
    button.position(20,115);
    button.mousePressed(changeShape);

        for(let i=0;i<width;i+=50)
        {
            walls.push(createVector(i,0));
            walls.push(createVector(i,height));
        }
        for(let i=0;i<height;i+=50)
        {
            walls.push(createVector(0,i));
            walls.push(createVector(width,i));
        }
}

function gotolink() {
	window.open('https://github.com/adityaanantharaman/boids');
}

function changeChoice()
{
    if(choicedraw===1)
        {
            choicedraw--;
            drawornot='NO';
        }
    else
        {
            choicedraw++;
            drawornot='YES';
        }
}

function changeWalls()
{
    if(choicewalls===1)
        {
            choicewalls--;
            wallsornot='NO';
        }
    else
        {
            choicewalls++;
            wallsornot='YES';
        }
}

function changeShape()
{
    if(choicepoint===1)
        {
            choicepoint--;
            pointornot='POINTS';
        }
    else
        {
            choicepoint++;
            pointornot='LINES';
        }
}


function mousePressed()
{
    obstacles=[];
}


// // Defining async function
// async function getapi(url) {
    
//     // Storing response
//     const response = await fetch(url);
    
//     // Storing data in form of JSON
//     var data = await response.json();
//     console.log(data);
//     if (response) {
//         hideloader();
//     }
//     show(data);
// }

function draw() {
  // put drawing code here
    background(0,0,0);

    textSize(15);
    fill(255,0,0);
    strokeWeight(4);
    stroke(255);
    text('alignment', 10, 40);
    text('cohesion', 160, 40);
    text('repulsion', 320, 40);
    text(drawornot,90,70);
    text(wallsornot,90,100);
    text(pointornot,90,130);

    for(let b of flock)
        {
            b.align(flock);
            if(choicewalls===1)
                {
                    b.repulsewalls(walls);
                }
            b.repulseobstacles(obstacles);
            b.cohese(flock);
            b.repulse(flock);
            b.move();
            b.stayOnScreen();
            b.show();
        }
    if(choicedraw===1)
        {
            obstacles = []
 
            i+=1
            // Storing response
            fetch(api_url)
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })

            // // Storing data in form of JSON
            // var data = response.json();
            // console.log("start");
            // console.log(response);
            // console.log("end");
            // obstacles = [[269,325],[269,320],[264,300],[264,307]]
            // obstacles.push(createVector(269+i,350));
            // obstacles.push(createVector(269+i,300));
            // obstacles.push(createVector(300+i,350));
            // obstacles.push(createVector(300+i,300));
            // obstacles.push(createVector(350+i,350));
            // obstacles.push(createVector(350+i,300));

            // obstacles.push(createVector(350,300));
            // obstacles.push(createVector(450,300));
            // obstacles.push(createVector(450,400));
            // obstacles.push(createVector(350,400));
            // obstacles.push(createVector(350,300));

            // obstacles.push(createVector(760,559));
            // obstacles.push(createVector(629,556));
            // obstacles.push(createVector(653,376));
            // obstacles.push(createVector(586,376));
            // obstacles.push(createVector(754,380));
            // obstacles.push(createVector(882,384));
            // obstacles.push(createVector(270,1034));
            // obstacles.push(createVector(1124,1001));
            // obstacles.push(createVector(250,325));
            // obstacles.push(createVector(250,300));
            // obstacles.push(createVector(mouseX,mouseY));
            // console.log(obstacles)

        }


    noFill();
    beginShape();
    for(let pt of obstacles)
        {
            //TODO: draw a space invader icon (replace w/ vertex)
            vertex(pt.x,pt.y);
        }
    endShape();

}
