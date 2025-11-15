function ProcessCode( {songText, songVolume} ) {

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

    let outputText = songText
    console.log("in proccode func" + songVolume)
    
    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    let m;
    let matches = []

    while ((m = regex.exec(outputText)) !== null){

        if (m.index === regex.lastIndex){
            regex.lastIndex++
        }

        m.forEach((match, groupIndex) => {
            matches.push(match)
        })
    }

    let matches2 = matches.map(
        match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
            //need to fix this
            `gain(${captureGroup * songVolume})`
        )
    )

    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]),
        outputText
    )

    console.log(matches3)
    
    return matches3
}
export default ProcessCode