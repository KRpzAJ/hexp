import React from 'react';
import { div, Avatar, Group } from '@vkontakte/vkui';

const SingleMatch = (props) => {
  const match = props.idMatch;
  const commands = props.commands;
  const h_command = searchCommand(match.current_match.h_command);
  const v_command = searchCommand(match.current_match.v_command);
  var date_match = match.current_match.date_match;
  var time_match =
    match.current_match.time_match !== '00:00'
      ? match.current_match.time_match
      : '';

  var h_count =
    match.current_match.h_count !== '0' ? match.current_match.h_count : '-';
  var v_count =
    match.current_match.v_count !== '0' ? match.current_match.v_count : '-';

  function searchCommand(nameCommand) {
    const m = commands.commands.filter((item) => {
      return item.nameId === nameCommand;
    });
    if (m) {
      return m;
    }
  }

  return (
    <Group id='singleMatchDetail'>
      <div className='match-slider'>
        <div className='result-block'>
          <div className='title'>
            <p className='date'>{match.current_match.tournir}</p>
          </div>
          <div className='result-content'>
            <span className='team'>
              <div className='img-wrap'>
                <Avatar size={72} src={h_command[0].logo} />
              </div>
              <p className='name'>{h_command[0].name}</p>
              <p className='city'>{h_command[0].town}</p>
            </span>
            <div className='counter'>
              <p className='name'>
                {date_match}
                <span> {time_match}</span>
              </p>
              <div className='count-numbers'>
                <p>{h_count}</p>
                <p className='dotted'>:</p>
                <p>{v_count}</p>
              </div>
            </div>
            <span className='team'>
              <div className='img-wrap'>
                <Avatar size={72} src={v_command[0].logo} />
              </div>
              <p className='name'>{v_command[0].name}</p>
              <p className='city'>{v_command[0].town}</p>
            </span>
          </div>
        </div>
      </div>
    </Group>
  );
};

export default SingleMatch;
