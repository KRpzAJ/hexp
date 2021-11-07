import React from 'react';
import ReactDOM from 'react-dom';
import connect from '@vkontakte/vkui-connect';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './panels/main.css';
import Main from './Main';
// import registerServiceWorker from './sw';

// Init VK App
connect.send('VKWebAppInit', {});

// Если вы хотите, чтобы ваше веб-приложение работало в оффлайне и загружалось быстрее,
// расскомментируйте строку с registerServiceWorker();
// Но не забывайте, что на данный момент у технологии есть достаточно подводных камней
// Подробнее про сервис воркеры можно почитать тут — https://vk.cc/8MHpmT
// registerServiceWorker();

class App extends React.Component {
  state = {
    commands: [],
    matches: [],
  };

  render() {
    return (
      <ConfigProvider platform='vkcom' scheme='vkcom_light'>
        <AdaptivityProvider>
          <Main />
        </AdaptivityProvider>
      </ConfigProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
