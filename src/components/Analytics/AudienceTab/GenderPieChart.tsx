import { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import clsx from "clsx";
import TextLoad from "../../../UI/TextLoad/TextLoad";
import { IDemographicsResponse } from "../../../../data/api-analytics";

interface ITransformedGenderData {
  id: string;
  label: string;
  value: number;
  color: string;
}

const GenderNames = {
  male: "male",
  female: "female",
  transMale: "trans male",
  transFemale: "trans female",
};

const GenderColors = {
  male: "#028ee6",
  female: "#a54d57",
  transMale: "#774dd7",
  transFemale: "#65F7B9",
};

const genderDataTransform = (
  genderData: IDemographicsResponse
): ITransformedGenderData[] => {
  return Object.keys(GenderNames).map((genderKey) => {
    return {
      id: GenderNames[genderKey],
      label: GenderNames[genderKey],
      value: genderData[genderKey],
      color: GenderColors[genderKey],
    };
  });
};

const GenderPieChart = ({
  genderData,
  loading,
}: {
  loading: boolean;
  genderData: IDemographicsResponse;
}) => {
  const [transformedGenderData, setTransformedGenderData] = useState<
    ITransformedGenderData[] | null
  >(null);
  const [minValueToShow, setMinValueToShow] = useState<number>(0);

  useEffect(() => {
    if (genderData) {
      setTransformedGenderData(genderDataTransform(genderData));

      const total =
        genderData.female +
        genderData.male +
        genderData.transMale +
        genderData.transFemale;

      // minValue is 5% of total, to prevent overlapping labels
      if (total >= 0) {
        setMinValueToShow((5 / 100) * total);
      }
    }
  }, [genderData]);

  return (
    <div className={clsx("w-full")}>
      <div className={clsx("w-full", "rounded-10", "bg-white/5", "p-15")}>
        <div className={clsx("flex", "items-center", "w-full")}>
          <p className={clsx("flex-1", "text-16")}>
            <TextLoad placeholderLength={6} isLoading={loading} word="Gender" />
          </p>
        </div>
        <p className={clsx("text-12", "text-white/40")}>
          <TextLoad placeholderLength={9} isLoading={loading} word="All-time" />
        </p>
        <div className={clsx("mt-15", "h-[195px]")}>
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
            <ResponsivePie
              data={transformedGenderData}
              margin={{
                top: 40,
                right: 10,
                bottom: 30,
                left: 10,
              }}
              borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              role="application"
              theme={{
                tooltip: {
                  container: {
                    color: "rgb(31,33,35)",
                    fontSize: 14,
                  },
                },
                legends: {
                  text: {
                    color: "white",
                  },
                },
              }}
              arcLabel={(e) =>
                e.value > minValueToShow ? String(e.value) : ""
              }
              arcLinkLabelsSkipAngle={5}
              arcLinkLabelsTextColor="#FFFFFF"
              arcLabelsTextColor="rgb(31,33,35)"
              colors={{ datum: "data.color" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GenderPieChart;
