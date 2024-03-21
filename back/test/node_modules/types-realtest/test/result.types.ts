export type Approach = {
  distance: number;
  time: number;
}

export type Result = {
  approaches: Approach[];
  start: Date;
  end: Date;
  testId: string;
}

