function InstrumentControls( {songText} ) {

    let output = ``
    let songLines = songText.split('\n')
    let instruments = []

    songLines.forEach(line => {
        if (line.includes(": ")){
            let instrument = line.match(/^.*: */)
            instruments.push(instrument)
        }
    })

    //onChange={onVolumeChange} put this back
    return ( 
        instruments.map((instrument) => (
            <div key={instrument}>
                <p className="text-light pt-3 border-top border-secondary">{instrument}</p>
                <div className="mb-3">                
                    <label htmlFor="volumeRange" className="form-label">Volume</label>
                    <input type="range" className="form-range slider" min="0" max="1" step="0.1" id="volumeRange"></input>
                </div>
                <div className="form-check form-switch pb-3">
                    <label className="form-check-label px-2" htmlFor="instrumentSwitch">On/Off</label>
                    <input className="form-check-input form-switch bg-secondary border-dark" type="checkbox" role="switch" id="instrumentSwitch" />
                </div>
            </div>
        )
    )
    )
}

export default InstrumentControls