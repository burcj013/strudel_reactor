import './component-styling.css'

function DJControls( {volumeChange, onVolumeChange, cpmChange, onCpmChange, reberbChange, onReverbChange} ) {

    // Display controls for cpm, reverb and volume
    return (
        <>
            <div className="input-group mb-3 pt-5">
                <span className="input-group-text bg-secondary border-secondary text-light" id="setCpmLabel">Set CPM</span>
                <input type="text" className="form-control bg-light border-secondary" aria-describedby="setCpmLabel" onChange={onCpmChange} value={cpmChange}/>
            </div>
             <div className="mb-3">                
                    <label htmlFor="volumeRange" className="form-label">Volume</label>
                    <input type="range" className="form-range slider" min="0" max="1" step="0.1" id="volumeRange" onChange={onVolumeChange}></input>
                </div>
            <div className="mb-3">                
                    <label htmlFor="reverbRange" className="form-label">Reverb</label>
                    <input type="range" className="form-range slider" min="0" max="1" step="0.1" id="reverbRange" onChange={onReverbChange}></input>
                </div>

            {/* <InstrumentControls/> */}
        </>
    );
}

export default DJControls;