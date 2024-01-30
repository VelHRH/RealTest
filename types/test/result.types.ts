interface Approach {
  distance: number;
  time: number;
}

interface Result {
  approaches: Approach[];
  start: Date;
  end: Date;
  testId: string;
}

export { Approach, Result };
