const stopBtn = document.getElementById("stop")
const errorList = document.getElementById('errorList')
const content = document.getElementById('content')
const artist = document.getElementById("artist")
const album = document.getElementById("album")
const genre = document.getElementById("genre")
const deezer = document.getElementById("deezer")


const go = document.getElementById("button");
const input = document.getElementById("input")


go.onclick = () => {
    console.log(artist.value)
    init("user=" + input.value + "&", artist.checked, album.checked, genre.checked, deezer.checked)
}

stopBtn.onclick = () => {
    console.log("Stopping...")
    optionsThis.stopped = true;
}
