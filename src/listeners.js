const userInput = document.getElementById("userInput")
const stopBtn = document.getElementById("stopBtn")
const showBtn = document.getElementById('showBtn')
const errorList = document.getElementById('errorList')
const content = document.getElementById('content')

const tstinput = document.getElementById("userInput1")
const btn = document.getElementById("testbtn")
const test = document.getElementById("btn")
const artist = document.getElementById("artist")
const album = document.getElementById("album")
const genre = document.getElementById("genre")
const deezer = document.getElementById("deezer")

test.onClick = () => {
    let table = document.getElementById("content-table");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "NEW CELL1";
    cell2.innerHTML = "NEW CELL2"; 
}

btn.onclick = () => {
    onSubmit("user=" + tstinput.value + "&", artist.value == "on", album.value == "on", genre.value == "on", deezer.value == "on")
}

stopBtn.onclick = () => {
    onStop()
}




showBtn.onclick = function onClick(){
    if(errorList.style.visibility == "visible"){
        errorList.style.visibility = "hidden"
        errorList.style.display = "none"
        showBtn.textContent = "Show"
    }else{
        errorList.style.visibility = "visible"
        errorList.style.display = "block"
        showBtn.textContent = "Hide"
    }
}