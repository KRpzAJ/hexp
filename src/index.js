import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';

import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './panels/main.css';
import Main from './Main';
// import registerServiceWorker from './sw';
import sampleCommands from './data-tmp/sample-command';
import sampleMatches from './data-tmp/sample-matches';
import tournirs from './data-tmp/tournirs';

// Init VK App
bridge.send('VKWebAppInit', {});
const querystring = require('querystring');

const params = window.location.search.slice(1);
const paramsAsObject = querystring.parse(params);
console.log(paramsAsObject);
//bridge.subscribe((e) => console.log(e));
// Если вы хотите, чтобы ваше веб-приложение работало в оффлайне и загружалось быстрее,
// расскомментируйте строку с registerServiceWorker();
// Но не забывайте, что на данный момент у технологии есть достаточно подводных камней
// Подробнее про сервис воркеры можно почитать тут — https://vk.cc/8MHpmT
// registerServiceWorker();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commands: sampleCommands,
      matches: sampleMatches,
      tournirs: tournirs,
      currentMatch: '',
    };
  }

  render() {
    return (
      <ConfigProvider platform='vkcom' scheme='vkcom_light'>
        <AdaptivityProvider>
          <Main st={this.state} />
        </AdaptivityProvider>
      </ConfigProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
