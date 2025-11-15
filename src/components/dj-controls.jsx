import InstrumentControls from "./instrument-controls";
import './component-styling.css'

function DJControls( {volumeChange, onVolumeChange} ) {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text bg-secondary border-secondary text-light" id="setCpmLabel">Set CPM</span>
                <input type="text" className="form-control bg-light border-secondary" aria-describedby="setCpmLabel"/>
            </div>
            <div className="mb-3">
                <label htmlFor="volumeRange" className="form-label pt-3">Volume</label>
                <input type="range" className="form-range slider" min="0" max="1" step="0.1" id="volumeRange" onChange={onVolumeChange}></input>
            </div>
            <div className="form-check form-switch">
                <label className="form-check-label px-2" htmlFor="instrumentSwitch">p1</label>
                <input className="form-check-input form-switch bg-secondary border-dark" type="checkbox" role="switch" id="instrumentSwitch" />
            </div>

            {/* <InstrumentControls/> */}
        </>
    );
}

export default DJControls;