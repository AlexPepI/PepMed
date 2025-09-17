declare module "dob-to-age" {
  interface AgeResult {
    count: number;
    unit: "years" | "months" | "days";
  }

  export default function dobToAge(date: string | Date): AgeResult;
}
