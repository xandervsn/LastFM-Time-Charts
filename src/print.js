function print(playList, listing, albumMap, genreMap){
    const artistMap = new Map();
    let artistName;
    for(var key in listing){
        playList.push(parseInt(key))
    }
    let pos = 0;
    for (let i = playList.length - 1; i >= 0; i--) {
        pos++;
        console.log(`${pos}: ${listing[playList[i]]} - ${anal(playList[i])} seconds`);

        artistName = listing[playList[i]].split(" -")

        if(artistMap.get(artistName[0]) == undefined){
            artistMap.set(artistName[0], playList[i]);
        }else{
            artistMap.set(artistName[0], playList[i] + artistMap.get(artistName[0]));
        }
    }
    const artistsSorted = new Map([...artistMap.entries()].sort((a, b) => b[1] - a[1]));
    artistsSorted.forEach((time, artists)=>{
        //console.log(`${artists}: ${anal(time)}`)
    });
    const albumsSorted = new Map([...albumMap.entries()].sort((a, b) => b[1] - a[1]));
    albumsSorted.forEach((time, artists)=>{
        //console.log(`ALBUM ${artists}: ${anal(time)}`)
    });
    const genresSorted = new Map([...genreMap.entries()].sort((a, b) => b[1] - a[1]));
    genresSorted.forEach((time, artists)=>{
        //console.log(`GENRE ${artists}: ${anal(time)}`)
    });
}

function sortTracks(trackMapUns){
    const trackMap = new Map([...trackMapUns.entries()].sort((a, b) => b[1][1] - a[1][1]));
    trackMapUns.clear()
    let i = 0;
    trackMap.forEach((arr, track)=>{
        i++;
        trackMap.set(track, [arr[0], arr[1], i])
    });
    trackMap.forEach((arr, track)=>{
        addTrack(arr[2], track, anal(arr[1]), anal(arr[0]))
    });
}