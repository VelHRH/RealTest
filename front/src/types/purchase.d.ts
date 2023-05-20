interface IPurchase {
 _id: string;
 companyId: string;
 deviceId: string;
 defaultReportingFrequency: string;
 defaultTrackingRange: number;
 delivered: boolean;
 isFree: boolean;
 name?: string;
}
