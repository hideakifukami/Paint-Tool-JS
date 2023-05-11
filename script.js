let painting = false;
let restore_array=[];
let index=-1;
let coord = {x:0, y:0};


window.onload = function() {
    // Canvas
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth - 300;
    ctx.canvas.height = window.innerHeight - 100;

    // styling line
    ctx.strokeStyle="black";
    ctx.lineJoin="round";
    ctx.lineWidth=1;
    ctx.lineCap='round';

    // called when mousemoves
    function draw(event){
        if (!painting) return;

        ctx.beginPath();
        ctx.moveTo(coord.x,coord.y);
        getPos(event);
        ctx.lineTo(coord.x,coord.y);
        ctx.stroke(); 
    }

    // coordinates of cursor
    function getPos(event){
        coord.x=event.pageX- canvas.offsetLeft;
        coord.y=event.pageY- canvas.offsetTop;
    }

    // called when mousedown
    function startPos(event) {
        painting=true;
        getPos(event);

        draw(event);
    }

    // called when mouseup
    function endPos(event){
        if(painting){

            ctx.closePath();
            painting=false;
        }
        if (event.type!='mouseout') {
            restore_array.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            index+=1;
            console.log(restore_array);
        }		
    }

    // eventlisteners

    canvas.addEventListener('touchstart',startPos);
    canvas.addEventListener('touchmove',draw);
    canvas.addEventListener('touchend',endPos);

    canvas.addEventListener('mousedown',startPos);
    canvas.addEventListener('mouseup',endPos);
    canvas.addEventListener('mousemove',draw);
    canvas.addEventListener('mouseout',endPos);



    // color
    const color = document.getElementById('colorChange');
    color.addEventListener('change',function(){
        ctx.strokeStyle=document.getElementById('colorChange').value;
    });

    // pen size
    const penSize = document.getElementById('penSize');
    penSize.addEventListener('change',function(){
        ctx.lineWidth=document.getElementById('penSize').value;
    });

    // pencil
    const pencil = document.getElementById('btnPencil');
    pencil.addEventListener('change',function(){
        ctx.lineWidth=document.getElementById('penSize').value;
        ctx.strokeStyle=document.getElementById('colorChange').value;
    });

    // fill
    const bucket = document.getElementById('btnBucket');
    bucket.addEventListener('click',function(){
        ctx.fillStyle=document.getElementById('colorChange').value;
        ctx.fillRect(0,0,canvas.width,canvas.height);
    });

    // eraser
    const eraser = document.getElementById('btnEraser');
    eraser.addEventListener('click',function() {
        ctx.lineWidth=document.getElementById('penSize').value;
        ctx.strokeStyle='white';
    });

    // Botão Limpar
    const clear = document.getElementById('btnClear');
    clear.addEventListener('click',function(){
        if(index==-1){
            return;
        }
        else{
            var c=confirm("Resetting canvas! 🧐🧐🧐");
            if(c==true){
                ctx.fillStyle='white';
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillRect(0,0,canvas.width,canvas.height);
                restore_array=[];
                index=-1;
            }
            else{
                return false;
            }
        }	
    });

    // Undo
    const undo = document.getElementById('btnUndo');
    undo.addEventListener('click',function(){
        if(index<=0){
            if(index<=-1){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }
            else{
                ctx.fillStyle='white';
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                    restore_array=[];
                    index=-1;
            }	;
        }
        else{
            index--;
            restore_array.pop();
            ctx.putImageData(restore_array[index],0,0);
        };
    });

}
