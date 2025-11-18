import { useState } from 'react';
import { BsPlusLg } from "react-icons/bs";
import { BsDashLg } from "react-icons/bs";

function Accordion ( {component, text} ) {

    // Used for hiding and showing accordions
    const [isHidden, setIsHidden] = useState(false);

    const [buttonText, setButtonText] = useState('Hide ' + text);
    const [buttonIcon, setButtonIcon] = useState(<BsDashLg />);

    const toggleHidden = (event) => {
        setIsHidden(!isHidden);

    };

    // Update text and icons when clicking the button
    const handleClick = () => {

        if (!isHidden){
            setButtonText('Show ' + text);
            setButtonIcon(<BsPlusLg />)
        }
        else {
            setButtonText('Hide ' + text);
            setButtonIcon(<BsDashLg />)
        }
    };

    return (
        <>
            <button onClick={ () => {toggleHidden(); handleClick();} } className='btn btn-secondary w-100 text-start rounded-top-0 rounded-bottom-0' >{buttonText}<span className='float-end'>{buttonIcon}</span></button>       
                <div style={ { display: isHidden ? 'none' : 'block', maxHeight: '50vh', overflowY: 'auto'  }}>
                    {component}
                </div>
        </>
    );
}

export default Accordion;