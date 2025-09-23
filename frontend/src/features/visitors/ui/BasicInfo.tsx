import { Text } from "@mantine/core";
import dobToAge from "dob-to-age";

type Props = {
  birth_date: string | null;
  gender: "male" | "female" | "other" | null;
  smoker: "smoker" | "non_smoker" | "ex_smoker";
  weight: number | null;
  height: number | null;
  years_smoking: number | null;
  cig_per_day: number | null;
};

const BasicInfoRows = ({
  birth_date,
  gender,
  smoker,
  weight,
  height,
  years_smoking,
  cig_per_day,
}: Props) => {
  const calculateBMI = (
    weight: number | null,
    height: number | null
  ): string => {
    if (!weight || !height || height === 0) return "N/A";
    const bmi = weight / (height / 100) ** 2;
    return bmi.toFixed(1);
  };

  const ageText = () => {
    if (!birth_date) return "—";
    const res = dobToAge(birth_date);
    if (!res || !res.count || !res.unit) return "—";
    return `${res.count} ${
      res.unit === "years"
        ? "years old"
        : res.unit === "months"
        ? "months old"
        : "days old"
    }`;
  };

  return (
    <>
      <div className="flex gap-4 justify-between flex-wrap">
        <div className="w-[40%] min-w-max">
          <Text>
            <strong>Age :</strong> {ageText()}
          </Text>
        </div>
        <div className="w-[40%] min-w-max">
          <Text>
            <strong>Gender:</strong>{" "}
            {gender === "male"
              ? "Male"
              : gender === "female"
              ? "Female"
              : "Other"}
          </Text>
        </div>
      </div>

      <div className="flex gap-4 justify-between flex-wrap">
        <div className="w-[40%] min-w-max">
          <Text>
            <strong>Smoker:</strong>{" "}
            {smoker === "smoker"
              ? "Smoker"
              : smoker === "non_smoker"
              ? "Non smoker"
              : "Ex smoker"}
          </Text>
        </div>
        <div className="w-[40%] min-w-max">
          <Text>
            <strong>Weight:</strong> {weight} kg
          </Text>
        </div>
      </div>

      <div className="flex gap-4 justify-between flex-wrap">
        <div className="w-[40%] min-w-max">
          <Text>
            <strong>Height:</strong> {height} cm
          </Text>
        </div>
        <div className="w-[40%] min-w-max">
          <Text>
            <strong>Β.Μ.Ι :</strong> {calculateBMI(weight, height)}
          </Text>
        </div>
      </div>

      <div className="flex gap-4 justify-between flex-wrap">
        {!!years_smoking && (
          <div className="w-[40%] min-w-max">
            <Text>
              <strong>Years smoking :</strong> {years_smoking}
            </Text>
          </div>
        )}
        {!!cig_per_day && (
          <div className="w-[40%] min-w-max">
            <Text>
              <strong>Cigarretes per day :</strong> {cig_per_day}
            </Text>
          </div>
        )}
      </div>
    </>
  );
};

export default BasicInfoRows;
