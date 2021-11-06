import React, { useState } from "react";
import commands from "../../data-tmp/sample-command";
import sampleCommands from "../../data-tmp/sample-command";
import sampleMatches from "../../data-tmp/sample-matches";

const Matches = (props) => {
    const [commands, loadCom] = useState("");
    const [matches, loadMat] = useState("");
    
    const loadCommand = () => {
        loadCom(sampleCommands);
    }
    const loadMatches = () => {
        loadMat(sampleMatches);
    }



    const loadSamples = () => {
        //const {commands, setState} = useState({commands: 0});
        loadCommand();
        loadMatches();
        console.log(commands);
      }

      return (
    <p>Hello!
    <button
    onClick={loadSamples}
    >Загрузить команды</button>
    </p>
      );
}

export default Matches;