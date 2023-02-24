const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

let stopAsked = false;
let pre = 0;

async function scrape(user, artistOn, albumOn, genreOn, deezerOn){
    stopAsked = false;
    let error = false;
    const trackMap = new Map();
    let failLog = [""];
    let failCount = 0;
    let total = 0;
    let post = 0;
    let num = 0;
    let indice = 0

    const optionsLast = {
        api: "https://ws.audioscrobbler.com/2.0/?format=json&",
        apiKey: "api_key=" + getLastKey().toString(),
        limit: "limit=200&",
        //overall | 7day | 1month | 3month | 6month | 12month 
        period: "period=7day&",
        getTopTracks: "method=user.gettoptracks&",
        getInfo: "method=track.getInfo&",
        artist: "artist=&",
        track: "track=&",
    };
    
    const optionsDeezer = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': getDeezerKey(),
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    
    let pages = 1
    const genreMap = new Map();
    const albumMap = new Map();
    let track = "Pudgy";
    for (let i = 0; i < pages; i++) {
        let page = `page=${i + 1}&`
        let url = optionsLast.api + user + page + optionsLast.period + optionsLast.getTopTracks + optionsLast.limit + optionsLast.apiKey
        //console.log(url)
        const res = await fetch(url)
        const data = await res.json()
        pages = data.toptracks["@attr"].totalPages
        let tracks = data.toptracks.track.length
        for (let j = 0; j < tracks; j++) {
            try{
                const playcount = data.toptracks.track[j].playcount;
                const artistRaw = data.toptracks.track[j].artist.name
                const trackRaw = data.toptracks.track[j].name
                const regex = /\(| \[| ft| FT| Ft| FEAT| feat| Feat/
                const artist = artistRaw.split(regex)[0]
                track = trackRaw.split(regex)[0]
                /*
                optionsLast.artist = "artist=" + artist.replaceAll(" ", "+") + "&";
                optionsLast.track = "track=" + trackRaw.replaceAll(" ", "+") + "&";
                url = optionsLast.api + optionsLast.getInfo + optionsLast.artist + optionsLast.track + optionsLast.apiKey;
                //console.log(url)
                const trackRes = await fetch(url)
                const trackData = await trackRes.json()
                let album = null;
                let genres = [];
                try{album = trackData.track.album.title}catch{}
                for (let k = 0; k <  5; k++) {
                    try{genres[k] = trackData.track.toptags.tag[k].name}catch{}
                }
                */
                //console.log("album:"+album +" genres:" + genres[0] + ", " + genres[1] + ", " +  genres[2] + ", " +  genres[3] + ", " +  genres[4])
                let duration = data.toptracks.track[j].duration
                if(duration == 0){
                    if(deezerOn){
                        try{
                            const deezerRes = await fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q=' + artist + " " + track, optionsDeezer)
                            const deezerData = await deezerRes.json()
                            duration = deezerData.data[0].duration
                        }catch{
                            failLog.push(artist + " - " + track)
                            failCount += parseInt(playcount);
                            error = true;
                        }
                    }else{
                        failLog.push(artist + " - " + track)
                        failCount += parseInt(playcount);
                        error = true;
                    }
                }
                if(!error){ 
                    const durationTotal = duration*playcount
                    trackMap.set(track, [duration, durationTotal, null])
                    total += durationTotal
                    post = Date.now()
                    num++
                    document.getElementById('timeListened').textContent = anal(total)
                    document.getElementById('trackNumber').textContent = num
                    document.getElementById('errors').textContent = failCount
                    document.getElementById('runtime').textContent = (post-pre)/1000 + " seconds"
                    console.log("Time Listened: " + anal(total) + ", Page: " + page + " out of " + pages)


                    if(albumMap.get(album) == undefined){
                        albumMap.set(album, durationTotal);
                    }else{
                        albumMap.set(album, durationTotal + albumMap.get(album));
                    }
                    for (let k = 0; k < genres.length; k++) {
                        if(genreMap.get(genres[k]) == undefined){
                            genreMap.set(genres[k], durationTotal);
                        }else{
                            genreMap.set(genres[k], durationTotal + genreMap.get(genres[k]));
                        }
                    }
                }else{
                    indice++
                    document.getElementById('errorList').textContent += `${failLog[indice]}\n`
                    error = false;
                }
                if(stopAsked){
                    i = pages - 1
                    j = tracks - 1
                }
            }catch{}
        }
    }
    sortTracks(trackMap);
}

function onSubmit(user, artistOn, albumOn, genreOn, deezerOn){
    console.log("hai")
    pre = Date.now()
    scrape(user, artistOn, albumOn, genreOn, deezerOn);
}

function onStop() {
    stopAsked = true;
}


/*old code graveyard; inside the mind
function reset(){
    stopAsked = false;
    error = false;
    listing = {};
    playList = [];
    failLog = [""];
    failCount = 0;
    total = 0;
    pre = 0;
    post = 0;
    num = 0;
    indice = 0
    deezerOn = true;
}
function onTrack() {
    for(var key in listing){
        playList.push(key)
    }
    for (let i = playList.length - 1; i >= 0; i--) {
        console.log((`${i}: ${listing[playList[i]]} - ${anal(playList[i])} seconds`))
    }
}
function onArtist() {
    let vari = {};
    onStop()
    for(var key in listing){
        playList.push(key)
    }
    for (let i = playList.length - 1; i >= 0; i--) {
        let artist = listing[playList[i]].split('-')[0]
        let time = parseInt(playList[i])
        
        if(vari[artist] != undefined){
            vari[artist] = time + vari[artist]
        }else{
            vari[artist] = time
        }
    }  
    for(var key in vari){
        console.log(key + anal(vari[key]))
    }
}
*/