function ProcessCode( {songText, songVolume, cpmValue, roomValue} ) {

    let songLines = songText.split('\n')

    // Used to check whether certain things are included in the code
    let gainIndex = -1
    let cpmIndex = -1
    let roomIndex = -1

    let i = 0
    let outputText = ""
    let instruments = []


    // Iterate through code and check whether code for gain/room/cpm is present
    songLines.forEach(line => {
        if (line.includes("all(x => x.gain(")){
            gainIndex = i
        }

        if (line.includes("all(x => x.room(")){
            roomIndex = i
        }

        if (line.includes("setcpm(")){
            cpmIndex = i
        }

        if (line.includes(": ")){
            let instrument = line.match(/^(.*?):/)
            instruments.push(instrument)
        }

        // Does not work :(
        // if (line.includes(instrument) && line[0] !== "_"){
        //     let muted = "_" + line
        //     songLines[i] = muted
        // }
        // else {
        //     let unmuted = line.substring(1,-1)
        //     songLines[i] = unmuted
        // }

        i++;
    })

    // Edit line if it exists or add a new one if it does not
    if(gainIndex !== -1){
        songLines[gainIndex] = `all(x => x.gain(${songVolume}))`
    }
    else { 
        songLines.push(`all(x => x.gain(${songVolume})`)
    }

    if(roomIndex !== -1){   
        songLines[roomIndex] = `all(x => x.room(${roomValue}))`
    }
    else { 
        songLines.push(`all(x => x.room(${roomValue}))`)
    }
    
    // Run if cpm value is not set as to not break strudel
    if (cpmValue !== undefined){
        if(cpmIndex !== -1){
        songLines[cpmIndex] = `setcpm(${cpmValue})`
        }
        else {
            songLines.unshift(`setcpm(${cpmValue})`)
        }
    }

    outputText = songLines.join('\n')
    return outputText
}

export default ProcessCode