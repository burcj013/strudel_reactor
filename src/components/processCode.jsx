function ProcessCode( {songText, songVolume, cpmValue} ) {

    //let instruments = []
    //const songTextLines = songText.split('\n');

    // let cpmSpecified = false;

    //iterate through songTextLines
    //check for instruments and add it to list
    
    //iterate through instruments
    //display related settings

    // if (songText!= null && songText.includes("setcpm(")) {
    //         cpmSpecified = true;
    //     }

    // if (cpmSpecified){
    //     return (
    //         <div class="input-group mb-3">
    //             <span class="input-group-text bg-secondary border-secondary text-light" id="setCpmLabel">Set CPM</span>
    //             <input type="text" class="form-control bg-light border-secondary" aria-describedby="setCpmLabel"/>
    //         </div>
    //     );
    // }

    let songLines = songText.split('\n')
    let gainIndex = -1
    let cpmIndex = -1
    let i = 0
    let outputText = ""
    let instruments = []

    songLines.forEach(line => {
        if (line.includes("all(x => x.gain(")){
            gainIndex = i
        }

        if (line.includes("setcpm(")){
            cpmIndex = i
        }

        if (line.includes(": ")){
            let instrument = line.match(/^(.*?):/)
            instruments.push(instrument)
        }

        i++;
    })

    if(gainIndex !== -1){
        songLines[gainIndex] = `all(x => x.gain(${songVolume}))`
    }
    else { 
        songLines.push(`all(x => x.gain(${songVolume})`)
    }
    
    if(cpmIndex !== -1){
        songLines[cpmIndex] = `setcpm(${cpmValue})`
    }
    else {
        songLines.unshift(`setcpm(${cpmValue})`)
    }

    outputText = songLines.join('\n')
    
    // let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    // let m;
    // let matches = []

    // while ((m = regex.exec(outputText)) !== null){

    //     if (m.index === regex.lastIndex){
    //         regex.lastIndex++
    //     }

    //     m.forEach((match, groupIndex) => {
    //         matches.push(match)
    //     })
    // }

    // let matches2 = matches.map(
    //     match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
    //         //need to fix this
    //         `gain(${captureGroup * songVolume})`
    //     )
    // )

    // let matches3 = matches.reduce(
    //     (text, original, i) => text.replaceAll(original, matches2[i]),
    //     outputText
    // )
    
    //need to do smth with the instruments, probs loop over them in instrument-controls to display mute switch and vol slider for each
    return outputText
}

export default ProcessCode