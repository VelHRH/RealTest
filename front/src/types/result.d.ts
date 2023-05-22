interface IApproach {
 approach: number;
 duration: number;
}

interface IResult {
 _id: string;
 approaches: IApproach[];
 resultStart: string;
 resultEnd: string;
 testId: string;
}
