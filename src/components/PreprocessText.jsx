
function PreprocessText({ songText, onChange }) {
    // Used to display text editor
    return (
        <div>   
            <textarea style={{ fontFamily: 'Lucida Console, monospace' }} className="form-control bg-dark text-light border-secondary rounded-top-0" rows="13" defaultValue={songText} value={songText} onChange={onChange} id="proc" ></textarea>
        </div>
    );
}

export default PreprocessText