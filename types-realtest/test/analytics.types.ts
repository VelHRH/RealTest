import { Approach } from "./result.types";

export type AnovaResult = {
  testsAnovaData: {
    name: string;
    id: string;
    testsApproaches: Approach[];
  }[];
  anovaResult: string;
};

export type PoissonResult = {
  people: number;
  probability: number;
}[];

export type BinomialResult = {
  people: number;
  probability: number;
}[];
