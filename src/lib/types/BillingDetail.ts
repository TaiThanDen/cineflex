export interface BillingDetail {
    id: string,
    account: string,
    subscription: string,
    amount: number,
    createdTime: string,
    paidTime: string,
    paid: boolean,
    transactionCode: string
}