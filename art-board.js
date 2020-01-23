const freehandBtn = document.querySelector('#ab-freehand');
const linedBtn = document.querySelector('#ab-line');
const rectdBtn = document.querySelector('#ab-rect');
const circleBtn = document.querySelector('#ab-circle');
const eraserBtn = document.querySelector('#ab-eraser');

freehandBtn.addEventListener("click",()=> 
{
    drawingMode="freeHand";
    x = 0;
    y = 0;
    isDrawing = false;
});
linedBtn.addEventListener("click", () => drawingMode = "line");
rectdBtn.addEventListener("click", () => drawingMode = "rect");
circleBtn.addEventListener("click", () => drawingMode = "circle");
eraserBtn.addEventListener("click", () => drawingMode = "erase");

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let drawingMode;
let x = 0;
let y = 0;
let isDrawing = false;

const rect = canvas.getBoundingClientRect();

canvas.addEventListener('mousedown', e => {
    if (drawingMode) {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        isDrawing = true;        
    }
});

canvas.addEventListener('mousemove', e => {
    if (isDrawing === true) {
        switch (drawingMode) {
            case "freeHand":
                freeHand(ctx, x, y, e.clientX - rect.left, e.clientY - rect.top);
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
                break;
            case "erase":
                erase(ctx, x, y, e.clientX - rect.left, e.clientY - rect.top);
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
                break;
        }
    }
});

canvas.addEventListener('mouseup', e => {
    if (isDrawing === true) {
        switch (drawingMode) {
            case "freeHand":
                x = 0;
                y = 0;
                isDrawing = false;
                break;
                case "circle":
                    let radius = Math.abs((e.clientX - rect.left)-x);
                    circle(ctx, x, y, radius);
                break;
                case "line":
                    line(ctx, x, y, e.clientX - rect.left, e.clientY - rect.top);   
                    break;
                case "rect":
                    let height = (e.clientY - rect.top)-y;
                    let width = (e.clientX - rect.left)-x;
                    rectangle(ctx, x, y, width,height);
                    break;
        }
    }
});

function circle(context,x,y,r) {
    context.beginPath();
    context.globalCompositeOperation = 'source-over';
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();
}

function freeHand(context, x1, y1, x2, y2) {
    context.beginPath();
    context.globalCompositeOperation = 'source-over';
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();

    
}

function line(context,x1,y1,x2,y2) {
    context.beginPath();
    context.globalCompositeOperation = 'source-over';
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();    
}

function rectangle(context,x1,y1,height,width){
    context.beginPath();
    context.globalCompositeOperation = 'source-over';
    context.rect(x1, y1, height, width);
    context.stroke();
}

function erase(context,x1,y1,x2,y2) {
    context.beginPath();
    context.globalCompositeOperation = 'destination-out';
    // context.lineWidth = 10;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
};