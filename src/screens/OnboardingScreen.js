import React, { useRef, useState, useEffect } from "react";
import { View } from "react-native";
import ViewPager from "react-native-pager-view";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Page from "../components/onboarding/Page";
import Footer from "../components/onboarding/Footer";
import { STORAGE_KEYS } from "../util/constants";

function Onboarding({ ...props }) {
  const pagerRef = useRef(null);
  const currentPageRef = useRef(0);
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();
  const TYPE = {
    FORWARD: 1,
    BACKWARD: 2,
    END: 3,
  };

  useEffect(() => {
    pagerRef.current.setPage(currentPage);
  }, [currentPage]);

  function onEnd() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: "restaurants",
          },
        ],
      }),
    );

    setOnboardingDone();
  }

  async function setOnboardingDone() {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDED_BEFORE, "true");
  }

  function handlePageChange(type) {
    if (type === TYPE.BACKWARD) {
      currentPageRef.current = currentPageRef.current - 1;
      setCurrentPage(currentPageRef.current);
    } else if (type === TYPE.FORWARD) {
      currentPageRef.current = currentPageRef.current + 1;
      setCurrentPage(currentPageRef.current);
    } else {
      onEnd();
    }
  }

  function pageSelected(position) {
    currentPageRef.current = position;
  }
  return (
    <View style={{ flex: 1 }}>
      <ViewPager
        style={{ flex: 1 }}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={({ nativeEvent: { position } }) =>
          pageSelected(position)
        }>
        <View key="1">
          <Page backgroundColor="#FFC93C" title="Page 1" />
          <Footer
            backgroundColor="#FFC93C"
            rightButtonLabel="Next"
            rightButtonPress={() => handlePageChange(TYPE.FORWARD)}
          />
        </View>
        <View key="2">
          <Page backgroundColor="#07689F" title="Page 2" />
          <Footer
            backgroundColor="#07689F"
            leftButtonLabel="Previous"
            leftButtonPress={() => handlePageChange(TYPE.BACKWARD)}
            rightButtonLabel="Next"
            rightButtonPress={() => handlePageChange(TYPE.FORWARD)}
          />
        </View>
        <View key="3">
          <Page backgroundColor="#FF00DF" title="Page 3" />
          <Footer
            backgroundColor="#FF00DF"
            leftButtonLabel="Previous"
            leftButtonPress={() => handlePageChange(TYPE.BACKWARD)}
            rightButtonLabel="Continue"
            rightButtonPress={() => handlePageChange(TYPE.END)}
          />
        </View>
      </ViewPager>
    </View>
  );
}

export default Onboarding;
