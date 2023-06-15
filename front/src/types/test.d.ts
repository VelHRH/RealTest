interface ITest {
 _id: string;
 purchaseId: string;
 productId: string;
 companyId: string;
 name: string;
 testCreator: string;
 testStart?: Date;
 testEnd?: Date;
 reportingFrequency: string;
 trackingRange: number;
 isExecuted: boolean;
}
