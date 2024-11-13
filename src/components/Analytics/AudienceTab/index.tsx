import React, { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ReactSVG } from "react-svg";
import clsx from "clsx";
import { isDesktop, isMobile } from "react-device-detect";
import useGoBack from "../../../../hooks/useGoBack";
import {
  getMyDemographicsAnalytics,
  IDemographicsResponse,
} from "../../../../data/api-analytics";
import { useToasts } from "../../../../context/toast.context";

const AgeBarChart = dynamic(() => import("./AgeBarChart"), { ssr: false });
const GenderPieChart = dynamic(() => import("./GenderPieChart"), {
  ssr: false,
});

interface IAudienceTab {
  close?: () => void;
  children: React.ReactNode;
}

const AudienceTab: FC<IAudienceTab> = ({ close, children }) => {
  const [demographicsData, setDemographicsData] =
    useState<IDemographicsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { addToast } = useToasts();

  const back = useGoBack("/settings");

  useEffect(() => {
    const getDemographics = async () => {
      setLoading(true);
      try {
        const res = await getMyDemographicsAnalytics();
        setDemographicsData(res);
        setLoading(false);
      } catch (e) {
        addToast(<>Something went wrong! Please try again later.</>, {
          appearance: "error",
        });
      }
    };

    getDemographics();
  }, []);

  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        isMobile && "w-screen",
        isDesktop && "w-full",
        "h-screen",
        isMobile && "fixed"
      )}
    >
      <header className={clsx("w-full")}>
        <div className={clsx("flex", "items-center", "p-15", "w-full")}>
          {close ? (
            <button
              onClick={() => {
                close();
              }}
              className={clsx(
                "flex",
                "items-center",
                "justify-center",
                "wh-44",
                "bg-white/20",
                "rounded-full"
              )}
            >
              <ReactSVG
                src="/images/icons/micro-solid/delete-1.svg"
                className={clsx("wh-20")}
              />
            </button>
          ) : (
            <button
              onClick={() => {
                back();
              }}
              className={clsx(
                "flex",
                "items-center",
                "justify-center",
                "wh-44",
                "bg-white/20",
                "rounded-full"
              )}
            >
              <ReactSVG
                src="/images/icons/micro-solid/line-arrow-left-large-1.svg"
                className={clsx("wh-20")}
              />
            </button>
          )}
          <div
            className={clsx(
              "flex-1",
              "justify-center",
              "text-12",
              "text-center"
            )}
          >
            <p className={clsx("text-white/40")}>Analytics from:</p>

            <p className={clsx()}>All time</p>
          </div>
          <div className={clsx("w-44")} />
        </div>
        {/* Tabs */}
        <section className={clsx("flex", "items-center", "w-full")}>
          {children}
        </section>
        {/* Tabs END */}
      </header>
      <div
        className={clsx(
          "flex",
          "flex-col",
          "p-20",
          "gap-15",
          "overflow-y-scroll"
        )}
      >
        <AgeBarChart ageData={demographicsData} loading={loading} />
        <GenderPieChart genderData={demographicsData} loading={loading} />
      </div>
    </div>
  );
};

export default AudienceTab;
