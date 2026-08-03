import { getMe } from "@/service/getMe";
import { getPaymentHistory } from "../_actions/getPaymentHistory";
import PaymentHistoryTable from "../_components/PaymentHistory";


export default async function PaymentHistoryPage() {
    const user = await getMe();
    const userId = user?.data?.profile?.id ?? null;
    const payments = await getPaymentHistory(userId);
    return (
        <div className="space-y-6 m-4">
            <div className="m-4">
                <h1 className="text-3xl font-bold">Payment History</h1>
                <p className="text-muted-foreground">
                    View all your completed and failed payments.
                </p>
            </div>

            <PaymentHistoryTable payments={payments.data} />
        </div>
    );
}