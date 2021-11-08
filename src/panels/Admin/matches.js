import React, { useState } from 'react';
import { Banner, Group, Avatar } from '@vkontakte/vkui';
//import commands from '../../data-tmp/sample-command';
import sampleCommands from '../../data-tmp/sample-command';
import sampleMatches from '../../data-tmp/sample-matches';
import tournirs from '../../data-tmp/tournirs';

const Matches = (props) => {
  /* const matches = useState({ matches: sampleMatches });
  const commands = useState({ commands: sampleCommands });
 */
  const matches = props.matches;
  const commands = props.commands;
  console.log(props);
  function searchCommand(nameCommand) {
    //console.log(commands);
    return commands.commands.filter((item) => {
      return item.nameId === nameCommand;
    });
  }

  function findIconTurnir(turnir) {
    const m = tournirs.filter((item) => {
      return item.name === turnir;
    });

    if (m[0]) return m[0].image;
  }
  function isDifferentDates(d1, d2) {
    return d1 > d2 ? true : false;
  }

  return (
    <Group>
      {matches.matches.map((key) => {
        var d1 = new Date(key.date_match + ' ' + key.time_match);
        var d2 = new Date();
        var t1 = d1.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        if (t1 === '00:00') t1 = '';
        if (isDifferentDates(d1, d2)) {
          const imgT = findIconTurnir(key.tournir);
          return (
            <Banner
              key={`id_match_${key.id_match}`}
              before={
                <Avatar
                  size={40}
                  mode='image'
                  src={!imgT ? '/img/non_tournir.png' : imgT}
                />
              }
              header={
                searchCommand(key.h_command)[0].name +
                ' - ' +
                searchCommand(key.v_command)[0].name
              }
              subheader={`${key.tournir} - ${d1.toLocaleDateString()} 
              ${t1}`}
              asideMode='expand'
              onClick={() => props.setMatch(key.id_match)}
            />
          );
        }
      })}

      {/* <button onClick={loadSamples}>Загрузить команды</button> */}
    </Group>
  );
};

export default Matches;
