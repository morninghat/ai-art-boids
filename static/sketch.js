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
async function getapi() {
    
    // Storing response
    const response = await fetch(api_url);
    
    // Storing data in form of JSON
    var data = await response.json();
    return data;
}

async function draw() {
    getapi().then(
                value => { 
                    // console.log("Value: " + value);
                    obstacles = [];
                    for (let i = 0; i < value.points.length; i++) {
                        obstacles.push(createVector(value.points[i][0], value.points[i][1]));
                    }


                    // EVERYTHING ELSE
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

                    noFill();
                    beginShape();
                    for(let pt of obstacles)
                        {
                            //TODO: draw a space invader icon (replace w/ vertex)
                            vertex(pt.x,pt.y);
                            // console.log("Vertex: " + pt.x + ", " + pt.y);
                        }
                    endShape();


                 },
                error => { console.log("Error: " + error) }
                );

  
}
