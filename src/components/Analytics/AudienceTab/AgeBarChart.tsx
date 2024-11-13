import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import clsx from "clsx";
import TextLoad from "../../../UI/TextLoad/TextLoad";
import {
  AgeDemographicEnum,
  IDemographicsResponse,
} from "../../../../data/api-analytics";

interface ITransformedAgeData {
  Age: number;
  all: number;
  male: number;
  female: number;
  "trans male": number;
  "trans female": number;
}

const AgeNames = {
  [AgeDemographicEnum.AGE_18_21]: "18-21",
  [AgeDemographicEnum.AGE_22_25]: "22-25",
  [AgeDemographicEnum.AGE_26_29]: "26-29",
  [AgeDemographicEnum.AGE_30_35]: "30-35",
  [AgeDemographicEnum.AGE_36_41]: "36-41",
  [AgeDemographicEnum.AGE_42_49]: "42-49",
  [AgeDemographicEnum.AGE_50_59]: "50-59",
  [AgeDemographicEnum.AGE_60]: "60+",
};

const GenderColors = {
  male: "#028ee6",
  female: "#a54d57",
  "trans male": "#774dd7",
  "trans female": "#65F7B9",
};

const ageDataTransform = (
  ageData: IDemographicsResponse
): ITransformedAgeData[] => {
  return Object.keys(AgeNames).map((ageKey) => {
    return {
      Age: AgeNames[ageKey],
      all: ageData[`all${ageKey}`],
      male: ageData[`male${ageKey}`],
      female: ageData[`female${ageKey}`],
      "trans male": ageData[`transMale${ageKey}`],
      "trans female": ageData[`transFemale${ageKey}`],
    };
  });
};

const AgeBarChart = ({
  ageData,
  loading,
}: {
  ageData: IDemographicsResponse;
  loading: boolean;
}) => {
  const [transformedAgeData, setTransformedAgeData] = useState<
    ITransformedAgeData[] | null
  >(null);

  useEffect(() => {
    if (ageData) {
      setTransformedAgeData(ageDataTransform(ageData));
    }
  }, [ageData]);

  return (
    <div className={clsx("w-full")}>
      <div className={clsx("w-full", "rounded-10", "bg-white/5", "p-15")}>
        <div className={clsx("flex", "items-center", "w-full")}>
          <p className={clsx("flex-1", "text-16")}>
            <TextLoad
              placeholderLength={11}
              isLoading={loading}
              word="Age by Gender"
            />
          </p>
        </div>
        <p className={clsx("text-12", "text-white/40")}>
          <TextLoad placeholderLength={9} isLoading={loading} word="All-time" />
        </p>
        <div className={clsx("mt-15", "h-[360px]")}>
          {loading ? (
            <div
              className={clsx(
                "h-full",
                "w-full",
                "rounded-10",
                "bg-white/5",
                "animate-pulse",
                "animation-duration--1000"
              )}
            />
          ) : (
            <ResponsiveBar
              data={transformedAgeData}
              layout="horizontal"
              keys={["male", "female", "trans male", "trans female"]}
              indexBy="Age"
              margin={{
                top: 0,
                right: 10,
                bottom: 70,
                left: 40,
              }}
              padding={0.2}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 0,
                tickRotation: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              labelSkipWidth={14}
              labelSkipHeight={12}
              labelTextColor="rgb(31,33,35)"
              role="application"
              theme={{
                tooltip: {
                  container: {
                    color: "rgb(31,33,35)",
                    fontSize: 14,
                  },
                },
                grid: {
                  line: {
                    stroke: "rgba(255, 255, 255, 0.1)",
                    strokeWidth: 1,
                  },
                },
                axis: {
                  ticks: {
                    text: {
                      fill: "white",
                      opacity: 0.6,
                    },
                  },
                  legend: {
                    text: {
                      color: "white",
                      fill: "white",
                      opacity: 0.6,
                    },
                  },
                },
              }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  itemTextColor: "white",
                  translateX: -15,
                  translateY: 50,
                  itemsSpacing: 2,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemDirection: "top-to-bottom",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              colors={({ id }) => {
                return GenderColors[id];
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeBarChart;
