import React from 'react';
import { ANDROID, IOS, VKCOM } from '@vkontakte/vkui';
import { 
  View,
    Panel,
    PanelHeader,
  PanelHeaderBack,
    Header,
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
  withAdaptivity
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

const Interface = withAdaptivity(({ viewWidth }) => {

  const platform = usePlatform();
  const [activeStory, setActiveStory] = React.useState('matches');
  const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
  const isDesktop = viewWidth >= ViewWidth.TABLET;
  const hasHeader = platform !== VKCOM;
  console.log(isDesktop);

    return (
      <SplitLayout
        header={hasHeader && <PanelHeader separator={false} />}
        style={{ justifyContent: "center" }}
      >
        {isDesktop && (
          <SplitCol fixed width={280} maxWidth={280}>
            <Panel>
              {hasHeader && <PanelHeader />}
              <Group>
                <Cell
                  disabled={activeStory === 'matches'}
                  style={activeStory === 'matches' ? {
                    backgroundColor: "var(--button_secondary_background)",
                    borderRadius: 8
                  } : {}}
                  data-story="matches"
                  onClick={onStoryChange}
                  before={<Icon28NewsfeedOutline />}
                >
                  Матчи
                </Cell>
                <Cell
                  disabled={activeStory === 'arMatches'}
                  style={activeStory === 'arMatches' ? {
                    backgroundColor: "var(--button_secondary_background)",
                    borderRadius: 8
                  } : {}}
                  data-story="arMatches"
                  onClick={onStoryChange}
                  before={<Icon28ServicesOutline />}
                >
                  Завершенные матчи
                </Cell>
                <Cell
                  disabled={activeStory === 'adminPanel'}
                  style={activeStory === 'adminPanel' ? {
                    backgroundColor: "var(--button_secondary_background)",
                    borderRadius: 8
                  } : {}}
                  data-story="adminPanel"
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
          <Epic activeStory={activeStory} tabbar={!isDesktop &&
            <Tabbar>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'matches'}
                data-story="matches"
                text="Матчи"
              ><Icon28NewsfeedOutline /></TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'arMatches'}
                data-story="arMatches"
                text="Завершенные матчи"
              ><Icon28ServicesOutline/></TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'adminPanel'}
                data-story="adminPanel"
                text="Админка"
              ><Icon28UserCircleOutline /></TabbarItem>
            </Tabbar>
          }>
            <View id="matches" activePanel="matches">
              <Panel id="matches">
                <PanelHeader left={<PanelHeaderBack />}>Матчи</PanelHeader>
                <Group style={{ height: '400px' }}>
                  {/* <Placeholder icon={<Icon56NewsfeedOutline width={56} height={56} />} /> */}
                  <Matches />
                </Group>
              </Panel>
            </View>
            <View id="arMatches" activePanel="arMatches">
              <Panel id="arMatches">
                <PanelHeader left={<PanelHeaderBack />}>Завершенные матчи</PanelHeader>
                <Group style={{ height: '400px' }}>
                  <Placeholder icon={<Icon28ServicesOutline width={56} height={56} />}>
                  </Placeholder>
                </Group>
              </Panel>
            </View>
            <View id="adminPanel" activePanel="adminPanel">
              <Panel id="adminPanel">
                <PanelHeader left={<PanelHeaderBack />}>Админка</PanelHeader>
                <Group style={{ height: '400px' }}>
                  <Placeholder icon={<Icon28UserCircleOutline width={56} height={56} />}>
                  </Placeholder>
                </Group>
              </Panel>
            </View>
          </Epic>
        </SplitCol>
      </SplitLayout>
    );
  }, {
    viewWidth: true
  });
  
  export default Interface;
