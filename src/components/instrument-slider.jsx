import './component-styling.css'

function InstrumentSlider( {instrument, text} ) {
    return (
        <>
            <label htmlFor="instrumentRange" className="form-label pt-3">{instrument} {text}</label>
            <input type="range" className="form-range slider" min="0" max="100" step="0.5" id="instrumentRange"></input>
        </>
    )
}

export default InstrumentSlider