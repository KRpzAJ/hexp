import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { ANDROID, IOS, VKCOM } from '@vkontakte/vkui';
import {
  View,
  ScreenSpinner,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Header,
  Avatar,
  Epic,
  Group,
  Cell,
  Tabbar,
  TabbarItem,
  Placeholder,
  SplitLayout,
  SplitCol,
  useAdaptivity,
  usePlatform,
  ViewWidth,
  withAdaptivity,
} from '@vkontakte/vkui';
import {
  Icon56NewsfeedOutline,
  Icon28NewsfeedOutline,
  Icon28MessageOutline,
  Icon28UserCircleOutline,
  Icon28ClipOutline,
  Icon28ServicesOutline,
} from '@vkontakte/icons';
//import '@vkontakte/vkui/dist/vkui.css';
import Matches from './panels/Admin/matches';
import sampleCommands from './data-tmp/sample-command';
import sampleMatches from './data-tmp/sample-matches';

const Interface = withAdaptivity(
  ({ viewWidth }) => {
    const [fetchedUser, setUser] = useState(null);
    const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
    const platform = usePlatform();
    const [activeStory, setActiveStory] = React.useState('matches');
    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
    const isDesktop = viewWidth >= ViewWidth.TABLET;
    const hasHeader = platform !== VKCOM;
    //console.log(isDesktop);
    var state = useState({ currentMatch: '' });

    useEffect(() => {
      bridge.subscribe(({ detail: { type, data } }) => {
        if (type === 'VKWebAppUpdateConfig') {
          const schemeAttribute = document.createAttribute('scheme');
          schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
          document.body.attributes.setNamedItem(schemeAttribute);
        }
      });
      async function fetchData() {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
        setPopout(null);
      }
      fetchData();
    }, []);

    function setMatch(id_m) {
      state = { currentMatch: id_m };
      console.log(state);
      setActiveStory('matches_d');
      //this.setState({ current_match: id_m });
      console.log(fetchedUser);
    }

    return (
      <>
        <Panel>
          {fetchedUser && (
            <Group>
              <Cell
                before={
                  fetchedUser.photo_200 ? (
                    <Avatar src={fetchedUser.photo_200} />
                  ) : null
                }
                description={
                  fetchedUser.city && fetchedUser.city.title
                    ? fetchedUser.city.title
                    : ''
                }
              >
                {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
              </Cell>
            </Group>
          )}
        </Panel>
        <SplitLayout
          header={hasHeader && <PanelHeader separator={false} />}
          style={{ justifyContent: 'center' }}
        >
          {isDesktop && (
            <SplitCol fixed width={280} maxWidth={280}>
              <Panel>
                {hasHeader && <PanelHeader />}
                <Group>
                  <Cell
                    disabled={activeStory === 'matches'}
                    style={
                      activeStory === 'matches'
                        ? {
                            backgroundColor:
                              'var(--button_secondary_background)',
                            borderRadius: 8,
                          }
                        : {}
                    }
                    data-story='matches'
                    onClick={onStoryChange}
                    before={<Icon28NewsfeedOutline />}
                  >
                    Матчи
                  </Cell>
                  <Cell
                    disabled={activeStory === 'arMatches'}
                    style={
                      activeStory === 'arMatches'
                        ? {
                            backgroundColor:
                              'var(--button_secondary_background)',
                            borderRadius: 8,
                          }
                        : {}
                    }
                    data-story='arMatches'
                    onClick={onStoryChange}
                    before={<Icon28ServicesOutline />}
                  >
                    Завершенные матчи
                  </Cell>
                  <Cell
                    disabled={activeStory === 'adminPanel'}
                    style={
                      activeStory === 'adminPanel'
                        ? {
                            backgroundColor:
                              'var(--button_secondary_background)',
                            borderRadius: 8,
                          }
                        : {}
                    }
                    data-story='adminPanel'
                    onClick={onStoryChange}
                    before={<Icon28UserCircleOutline />}
                  >
                    Админка
                  </Cell>
                </Group>
              </Panel>
            </SplitCol>
          )}

          <SplitCol
            animate={!isDesktop}
            spaced={isDesktop}
            width={isDesktop ? '560px' : '100%'}
            maxWidth={isDesktop ? '560px' : '100%'}
          >
            <Epic
              activeStory={activeStory}
              tabbar={
                !isDesktop && (
                  <Tabbar>
                    <TabbarItem
                      onClick={onStoryChange}
                      selected={activeStory === 'matches'}
                      data-story='matches'
                      text='Матчи'
                    >
                      <Icon28NewsfeedOutline />
                    </TabbarItem>
                    <TabbarItem
                      onClick={onStoryChange}
                      selected={activeStory === 'arMatches'}
                      data-story='arMatches'
                      text='Завершенные матчи'
                    >
                      <Icon28ServicesOutline />
                    </TabbarItem>
                    <TabbarItem
                      onClick={onStoryChange}
                      selected={activeStory === 'adminPanel'}
                      data-story='adminPanel'
                      text='Админка'
                    >
                      <Icon28UserCircleOutline />
                    </TabbarItem>
                  </Tabbar>
                )
              }
            >
              <View id='matches' activePanel='matches'>
                <Panel id='matches'>
                  <PanelHeader>Матчи</PanelHeader>
                  <Group>
                    {/* <Placeholder icon={<Icon56NewsfeedOutline width={56} height={56} />} /> */}
                    <Matches
                      commands={sampleCommands}
                      matches={sampleMatches}
                      setMatch={setMatch}
                    />
                  </Group>
                </Panel>
              </View>

              <View id='matches_d' activePanel='matches_d'>
                <Panel id='matches_d'>
                  <PanelHeader
                    left={
                      <PanelHeaderBack
                        onClick={() => setActiveStory('matches')}
                      />
                    }
                  >
                    Детали матча
                  </PanelHeader>
                  <Group style={{ height: '1000px' }}>
                    <Placeholder
                      icon={<Icon56NewsfeedOutline width={56} height={56} />}
                    />
                    Вот тут делаем новый элемент и передаём ему значение state
                    current_match
                  </Group>
                </Panel>
              </View>

              <View id='arMatches' activePanel='arMatches'>
                <Panel id='arMatches'>
                  <PanelHeader left={<PanelHeaderBack />}>
                    Завершенные матчи
                  </PanelHeader>
                  <Group style={{ height: '1000px' }}>
                    <Placeholder
                      icon={<Icon28ServicesOutline width={56} height={56} />}
                    ></Placeholder>
                  </Group>
                </Panel>
              </View>
              <View id='adminPanel' activePanel='adminPanel'>
                <Panel id='adminPanel'>
                  <PanelHeader left={<PanelHeaderBack />}>Админка</PanelHeader>
                  <Group style={{ height: '1000px' }}>
                    <Placeholder
                      icon={<Icon28UserCircleOutline width={56} height={56} />}
                    ></Placeholder>
                  </Group>
                </Panel>
              </View>
            </Epic>
          </SplitCol>
        </SplitLayout>
      </>
    );
  },
  {
    viewWidth: true,
  }
);

export default Interface;
