const userInput = document.getElementById("userInput")
const stopBtn = document.getElementById("stopBtn")
const errorList = document.getElementById('errorList')
const content = document.getElementById('content')
const tstinput = document.getElementById("userInput1")
const filler = document.getElementById("filler")
const btn = document.getElementById("testbtn")
const artist = document.getElementById("artist")
const album = document.getElementById("album")
const genre = document.getElementById("genre")
const deezer = document.getElementById("deezer")
const table = document.getElementById("content-table");

btn.onclick = () => {
    onSubmit("user=" + tstinput.value + "&", artist.value == "on", album.value == "on", genre.value == "on", deezer.value == "on")
}


stopBtn.onclick = () => {
    console.log("working")
    onStop()
}