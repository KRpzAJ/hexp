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
  Placeholder,
  SplitLayout,
  SplitCol,
  useAdaptivity,
  usePlatform,
  ViewWidth,
  withAdaptivity
   } from '@vkontakte/vkui';
	import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
	import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';

    import {
		Icon56NewsfeedOutline,
		Icon28NewsfeedOutline,
		Icon28MessageOutline,
		Icon28UserCircleOutline,
		Icon28ClipOutline,
		Icon28ServicesOutline,
		} from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';

const Interface = withAdaptivity(({ viewWidth, VKCOM}) => {
  const platform = usePlatform();
  const [activeStory, setActiveStory] = React.useState('profile');
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
                  disabled={activeStory === 'feed'}
                  style={activeStory === 'feed' ? {
                    backgroundColor: "var(--button_secondary_background)",
                    borderRadius: 8
                  } : {}}
                  data-story="feed"
                  onClick={onStoryChange}
                  before={<Icon28NewsfeedOutline />}
                >
                  feed
                </Cell>
                <Cell
                  disabled={activeStory === 'services'}
                  style={activeStory === 'services' ? {
                    backgroundColor: "var(--button_secondary_background)",
                    borderRadius: 8
                  } : {}}
                  data-story="services"
                  onClick={onStoryChange}
                  before={<Icon28ServicesOutline />}
                >
                  services
                </Cell>
                <Cell
                  disabled={activeStory === 'profile'}
                  style={activeStory === 'profile' ? {
                    backgroundColor: "var(--button_secondary_background)",
                    borderRadius: 8
                  } : {}}
                  data-story="profile"
                  onClick={onStoryChange}
                  before={<Icon28UserCircleOutline />}
                >
                  profile
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
                selected={activeStory === 'feed'}
                data-story="feed"
                text="Матчи"
              ><Icon28NewsfeedOutline /></TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'services'}
                data-story="services"
                text="Сервисы"
              ><Icon28ServicesOutline/></TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'profile'}
                data-story="profile"
                text="Профиль"
              ><Icon28UserCircleOutline /></TabbarItem>
            </Tabbar>
          }>
            <View id="feed" activePanel="feed">
              <Panel id="feed">
                <PanelHeader left={<PanelHeaderBack />}>Матчи</PanelHeader>
                <Group style={{ height: '1000px' }}>
                  <Placeholder icon={<Icon56NewsfeedOutline width={56} height={56} />} />
                </Group>
              </Panel>
            </View>
            <View id="services" activePanel="services">
              <Panel id="services">
                <PanelHeader left={<PanelHeaderBack />}>Сервисы</PanelHeader>
                <Group style={{ height: '1000px' }}>
                  <Placeholder icon={<Icon28ServicesOutline width={56} height={56} />}>
                  </Placeholder>
                </Group>
              </Panel>
            </View>
            <View id="profile" activePanel="profile">
              <Panel id="profile">
                <PanelHeader left={<PanelHeaderBack />}>Профиль</PanelHeader>
                <Group style={{ height: '1000px' }}>
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
