import React, { useState } from 'react';
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

interface TabConfig {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface CustomTabViewProps {
  tabs: TabConfig[];
  initialIndex?: number;  // Optional prop to set the initial tab
}

export function DQ_TabView({ tabs, initialIndex = 0 }: CustomTabViewProps) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(initialIndex);

  const routes = tabs.map(tab => ({ key: tab.key, title: tab.title }));
  const scenes = tabs.reduce((acc, tab) => {
    acc[tab.key] = () => (
      <View style={styles.tabContent}>
        {tab.content}
      </View>
    );
    return acc;
  }, {} as { [key: string]: React.ComponentType<any> });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor="#0062af"
      inactiveColor="#c3c3c2"
    />
  );

  return (
    <View style={styles.container}>
      {tabs.length > 0 && (
        <TabView
          navigationState={{ index, routes }}
          renderScene={SceneMap(scenes)}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabBar: {
    backgroundColor: '#ebebeb',
  },
  tabIndicator: {
    backgroundColor: '#0062af',
  },
  tabLabel: {
    fontWeight: 'bold',
  },
});

export default DQ_TabView;
