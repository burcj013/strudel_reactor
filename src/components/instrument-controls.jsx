function InstrumentControls( {songText, muteChange, onMuteChange} ) {

    // Split song text into lines
    let songLines = songText.split('\n')
    let instruments = []

    // Make a list of intruments found
    songLines.forEach(line => {
        if (line.includes(": ")){
            let instrument = line.match(/^.*: */)
            instruments.push(instrument)
        }
    })

    return ( 
        // Return/display elements for each instrument in list
        instruments.map((instrument) => (
            <div key={instrument}>
                <p className="text-light pt-3 border-top border-secondary">{instrument}</p>
                <div className="mb-3">                
                    <label htmlFor="volumeRange" className="form-label">Volume</label>
                    <input type="range" className="form-range slider" min="0" max="1" step="0.1" id="volumeRange"></input>
                </div>
                <div className="form-check form-switch pb-3">
                    <label className="form-check-label px-2" htmlFor="instrumentSwitch">On/Off</label>
                    <input className="form-check-input form-switch bg-secondary border-dark" onChange={onMuteChange} type="checkbox" role="switch" id="instrumentSwitch" />
                </div>
            </div>
        )
    )
    )
}

export default InstrumentControls