var boxId = [$('#b1'),$('#b2'),$('#b3'),$('#b4'),$('#b5'),$('#b6')];
var color = ["beige", "lightpink", "red", "green", "blue", "yellow"];

setInterval(assignColor,"500");

function mixArray() {
    var tempColor=new Array();
    tempColor.push(color[5]);
    for (let i = 0; i < boxId.length-1; i++) {
        tempColor.push(color[i]);
    }
    color = tempColor;
}

function assignColor() {
    mixArray();
    for (let index = 0; index < boxId.length; index++) {
        boxId[index].css('background-color', color[index]);
        console.log("Das");
    }
}