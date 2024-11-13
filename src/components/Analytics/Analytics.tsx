import React, { FC, useEffect, useState } from "react";
import TabsNavigation from "../../UI/TabsNavigation";
import analyticsStore from "../../../store/analytics";
import ConversionTab from "./ConversionTab";
import { useAuth } from "../../../context/auth.context";
import AudienceTab from "./AudienceTab";
import EngagementTab from "./EngagementTab";
import TopPostsTab from "./TopPostsTab";
import SlushyLoader from "./SlushyLoader";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import clsx from "clsx";
import { isDesktop, isMobile } from "react-device-detect";
import useGoBack from "hooks/useGoBack";

enum TabEnums {
  CONVERSION = "conversion",
  AUDIENCE = "audience",
  ENGAGEMENT = "engagement",
  TOP_POSTS = "top posts",
}

const tabs = Object.values(TabEnums);

interface IAnalytics {
  close?: () => void;
}

const Analytics: FC<IAnalytics> = ({ close }) => {
  const [activeTab, setActiveTab] = useState<TabEnums>(TabEnums.CONVERSION);
  const [navScrollPosition, setNavScrollPosition] = useState<number>(0);

  const router = useRouter();
  const { profile } = useAuth();

  const { reset } = analyticsStore();
  const back = useGoBack("/settings");

  useEffect(() => {
    if (router.isReady && router.query.tab) {
      setActiveTab(router.query.tab as TabEnums);
    }

    return () => {
      reset();
    };
  }, [router.isReady]);

  const renderTabsNavigation = () =>
    tabs.map((tab) => (
      <button
        key={tab}
        type="button"
        className={clsx(
          "flex",
          "items-center",
          "justify-center",
          "px-15",
          "h-54",
          "text-white",
          "box-content",
          { "border-white border-b-2": tab === activeTab }
        )}
        onClick={(e) => {
          setActiveTab(tab as TabEnums);
          const scrollLeft =
            e.currentTarget?.parentElement?.parentElement?.scrollLeft;
          setNavScrollPosition(scrollLeft ?? 0);
        }}
      >
        <div
          className={clsx(
            "capitalize",
            "whitespace-nowrap",
            tab === activeTab ? "text-white" : "text-white/40"
          )}
        >
          {tab}
        </div>
      </button>
    ));

  const renderActiveTabContent = () => {
    if (!profile) return <SlushyLoader />;

    const tabContentMap = {
      [TabEnums.CONVERSION]: (
        <ConversionTab profile={profile} close={close}>
          <TabsNavigation initialScrollLeft={navScrollPosition}>
            {renderTabsNavigation()}
          </TabsNavigation>
        </ConversionTab>
      ),
      [TabEnums.AUDIENCE]: (
        <AudienceTab close={close}>
          <TabsNavigation initialScrollLeft={navScrollPosition}>
            {renderTabsNavigation()}
          </TabsNavigation>
        </AudienceTab>
      ),
      [TabEnums.ENGAGEMENT]: (
        <EngagementTab close={close}>
          <TabsNavigation initialScrollLeft={navScrollPosition}>
            {renderTabsNavigation()}
          </TabsNavigation>
        </EngagementTab>
      ),
      [TabEnums.TOP_POSTS]: (
        <TopPostsTab close={close}>
          <TabsNavigation initialScrollLeft={navScrollPosition}>
            {renderTabsNavigation()}
          </TabsNavigation>
        </TopPostsTab>
      ),
    };

    return (
      tabContentMap[activeTab] || (
        <div
          className={clsx(
            "flex flex-col h-screen",
            isMobile && "fixed w-screen",
            isDesktop && "w-full"
          )}
        >
          <header className="flex items-center justify-between p-15 w-full">
            <button
              onClick={close || back}
              className="flex items-center justify-center wh-44 bg-white/20 rounded-full"
            >
              <ReactSVG
                src={`/images/icons/micro-solid/${
                  close ? "delete-1" : "line-arrow-left-large-1"
                }.svg`}
                className="wh-20"
              />
            </button>
            <div className="text-white/40 text-12 text-center">Analytics</div>
            <div className="w-44" />
          </header>
          <div className="p-30 text-center">
            <span className="capitalize">{activeTab}</span> coming up, hold
            tight!
          </div>
        </div>
      )
    );
  };

  return <div>{renderActiveTabContent()}</div>;
};

export default Analytics;
