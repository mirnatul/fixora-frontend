import { getMe } from "@/service/getMe";
import { getPaymentHistory } from "../_actions/getPaymentHistory";
import PaymentHistoryTable from "../_components/PaymentHistory";



// const payments = [
//     {
//         id: "1",
//         transactionId: "pi_3U021tCaBYf0RlYp1WQtw5iG",
//         amount: 3000,
//         status: "COMPLETED",
//         createdAt: "2026-08-02T16:14:28.020Z",
//         booking: {
//             service: {
//                 title: "Computer Service",
//             },
//         },
//     },
//     {
//         id: "2",
//         transactionId: "pi_3TzfmqCaBYf0RlYp14uHNvcU",
//         amount: 2400,
//         status: "COMPLETED",
//         createdAt: "2026-08-01T16:29:27.360Z",
//         booking: {
//             service: {
//                 title: "Super Premium AC Repair",
//             },
//         },
//     },
// ];

export default async function PaymentHistoryPage() {
    const user = await getMe();
    const userId = user.data.profile.id;
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