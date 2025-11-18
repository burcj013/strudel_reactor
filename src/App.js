import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/dj-controls';
import PlayButtons from './components/play-buttons';
import PreprocessText from './components/PreprocessText';
import PageHeader from './components/page-header';
import Accordion from './components/accordion';
import CodeOutput from './components/code-output';
import ProcessCode from './components/processCode';
import InstrumentControls from './components/instrument-controls';
import './components/component-styling.css'
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {
        
        let outputText = ProcessCode({songText:songText, songVolume:volume, cpmValue:cpm, instrument:instrumentMute, roomValue:reverb})
        setSongText(outputText)
        console.log(outputText)
        globalEditor.setCode(outputText)
        globalEditor.evaluate()
        console.log(cpm)
    }

    const handlePause = () => {
        globalEditor.stop()
    }

    const [songText, setSongText] = useState(stranger_tune)

    const [volume, setVolume] = useState(0.5)
    const [state, setState] = useState("stop")
    const [cpm, setCpm] = useState()
    const [instrumentMute, setInstrumentMute] = useState()
    const [reverb, setReverb] = useState(0.5)

    useEffect(() => {

        if (state === "play"){
            handlePlay();
        }
    }, [volume, cpm, instrumentMute, reverb])

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = stranger_tune
//      SetupButtons()
//      Proc()
    }
    globalEditor.setCode(songText);
}, [songText]);


// Main page code
return (
    <div className='bg-dark'>
        <PageHeader />
        <main>
            <div className="container-fluid">
                <div className="row px-2 py-2">
                    <div className="col-md-8 pt-3">
                    {/* //Accordions to display inputs */}
                       <Accordion component={ <PreprocessText songText={songText} onChange={(e) => setSongText(e.target.value)}/>} text={"Preprocess Text Input"}/>
                        <Accordion component={<CodeOutput/>} text={'Code Output'}/>
                  
                    </div>
                    <div className="col-md-4">
                        <nav>
                            <div>
                                {/* Components to display controls */}
                                <PlayButtons onPlay={() => {setState("play"); handlePlay() }} onPause={() => {setState("stop"); handlePause() }}/>
                                <DJControls volumeChange={volume} onVolumeChange={(e) => setVolume(e.target.value)} cpmChange={cpm} onCpmChange={(e) => setCpm(e.target.value) } reverbChange={reverb} onReverbChange={(e) => setReverb(e.target.value)}/>
                                <InstrumentControls songText={songText} muteChange={instrumentMute} onMuteChange={(e) => setInstrumentMute(e.target.value)}/>                      
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}