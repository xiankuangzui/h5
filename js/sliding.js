function $(id){
    return document.getElementById(id)
}
var context = $("puzzle").getContext("2d");//获取canvas上下文环境
var img = new Image();
img.src = "images/4.jpg";
img.addEventListener("load",drawTiles,false);//事件监听，当加载完成时执行drawTiles函数
var boardSize = $("puzzle").width;//获取canvas宽度
var tileCount = $("scale").value;//获取难度滑块的值
var tileSize = boardSize / tileCount;//计算出拼图块大小

var clickLoc = new Object();//点击位置
clickLoc.x = 0;
clickLoc.y = 0;
var emptyLoc = new Object();//空白位置
emptyLoc.x = 0;
emptyLoc.y = 0;
var solved = false;//是否完成，默认false
var boardParts = new Object();//拼图块分割数组
initBoard();//初始化
function initBoard(){
    boardParts = new Array(tileCount * tileCount);
    for(var i = 0; i< tileCount * tileCount;i++){
        boardParts[i] = i;
    }
    shift();//拼块打乱
}
function sortNumber(a,b){ // 随机排序函数
    return Math.random() > 0.5 ? -1:1;
}
function shift(){ //拼块打乱函数
    boardParts.sort(sortNumber);
    emptyLoc.x = 0;
    emptyLoc.y = 0;
    solved = false;
}
//绘制所有拼块
function drawTiles(){
    context.clearRect(0,0,boardSize,boardSize);
    for(var i = 0;i<tileCount;i++){
        for(var j=0;j<tileCount;j++){
            var n = boardParts[i * tileCount + j];
            //计算编号为n的拼块在原图的位置坐标（行列号）
            var x = parseInt(n / tileCount);//取整
            var y = n % tileCount;
            console.log(x + ":" + Math.floor(n / tileCount) + ":" + y);
            if(i!= emptyLoc.x||j!=emptyLoc.y||solved == true){//判断，不是空白位置并且游戏未结束
                //将编号为n的拼块显示在(i*tileSize,j*tileSize)处
                context.drawImage(img,x*tileSize,y*tileSize,tileSize,tileSize,i*tileSize,j*tileSize,tileSize,tileSize);
            }
        }
    }
}
//当难度滑块改变时改变难度
$("scale").onchange = function(){
    tileCount = this.value;
    tileSize = boardSize / tileCount;
    initBoard();
    drawTiles();
}
//当前点击的滑块
$("puzzle").onmousemove = function(e){
    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
}
//鼠标单击的滑块移动
$("puzzle").onclick = function(){
    if(distance(clickLoc.x,clickLoc.y,emptyLoc.x,emptyLoc.y) == 1){
        slideTile(emptyLoc,clickLoc);//交换被单击的拼块和空白的位置
        drawTiles();//显示各个拼块
    }
    if(solved){//如果完成拼图
        setTimeout(function(){
            alert("你成功了！");
        },500);
    }
};
function distance(x1,y1,x2,y2){
    return Math.abs(x1-x2) + Math.abs(y1-y2);
}
//移动拼图块
function slideTile(emptyLoc,clickLoc){
    if(!solved){
        var t;
        t = boardParts[emptyLoc.x * tileCount + emptyLoc.y];
        boardParts[emptyLoc.x*tileCount+emptyLoc.y] = boardParts[clickLoc.x*tileCount+clickLoc.y];
        boardParts[clickLoc.x*tileCount+clickLoc.y] = t;
        emptyLoc.x = clickLoc.x;//重新记录空白块的位置
        emptyLoc.y = clickLoc.y;
        checkSolved();//检查是否成功
    }
}
//检查是否完成
function checkSolved(){
    var flag = true;
    for(var i = 0;i<tileCount*tileCount;i++){
        if(boardParts[i] != i){
            flag = false;
        }
        solved = flag;
    }
}