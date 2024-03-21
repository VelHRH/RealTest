interface ITest {
  _id: string;
  purchaseId: string;
  productId: string;
  companyId: string;
  name: string;
  testCreator: string;
  testStart?: string;
  testEnd?: string;
  reportingFrequency: string;
  trackingRange: number;
  isExecuted: boolean;
  pairTest: string;
}
