import './component-styling.css'

function DJControls( {volumeChange, onVolumeChange, cpmChange, onCpmChange} ) {
    return (
        <>
            <div className="input-group mb-3 pt-5">
                <span className="input-group-text bg-secondary border-secondary text-light" id="setCpmLabel" onChange={onCpmChange} type="number">Set CPM</span>
                <input type="text" className="form-control bg-light border-secondary" aria-describedby="setCpmLabel"/>
            </div>

            {/* <InstrumentControls/> */}
        </>
    );
}

export default DJControls;