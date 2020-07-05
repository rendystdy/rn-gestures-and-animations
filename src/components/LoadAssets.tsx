import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { AsyncStorage, ActivityIndicator, Platform } from "react-native";
// import { AppLoading } from "expo";
// import { Asset } from "expo-asset";
// import * as Font from "expo-font";
import { Fonts } from '../utils/';
import { InitialState, NavigationContainer } from "@react-navigation/native";

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Platform.Version}`;

// export type FontSource = Parameters<typeof Fonts.loadAsync>[0];
export type Fonts = Object;
const usePromiseAll = (promises: Promise<void | void[]>[], cb: () => void) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

const useLoadAssets = (assets: number[], Fonts: Object): boolean => {
  const [ready, setReady] = useState(false);
  usePromiseAll(
    [Fonts, ...assets.map((asset) => Asset.loadAsync(asset))],
    () => setReady(true)
  );
  return ready;
};

interface LoadAssetsProps {
  Fonts?: Object;
  assets?: number[];
  children: ReactElement | ReactElement[];
}

const LoadAssets = ({ assets, Fonts, children }: LoadAssetsProps) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  const ready = useLoadAssets(assets || [], Fonts || {});
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY
        );
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);
  const onStateChange = useCallback(
    (state) =>
      AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    []
  );
  if (!ready || !isNavigationReady) {
    return <ActivityIndicator />;
  }
  return (
    <NavigationContainer {...{ onStateChange, initialState }}>
      {children}
    </NavigationContainer>
  );
};

export default LoadAssets;
