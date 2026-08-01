import { getTechnicianDetails } from "../../_actions/getTechnicianDetails"
import { TechnicianHeader } from "../../_components/technician/technician-header"
import { TechnicianReviews } from "../../_components/technician/technician-reviews"
import { TechnicianServices } from "../../_components/technician/technician-services"


// Mock data - Replace with actual API call
const technicianData = {
    id: '977cf5b7-66da-49b4-971c-97101288fd5a',
    bio: 'This is a demo bio in prod',
    experience: 1,
    averageRating: '4.3',
    totalReviews: 3,
    isAvailable: true,
    verified: false,
    user: {
        id: 'e9dc3bd6-a8a9-467e-847a-c03fbb64d128',
        name: 'mirnatul-t',
        email: 'mirnatul-t@gmail.com',
        phone: '017xxxxxxxx',
        city: 'Dhaka',
        profileImage: null,
    },
    service: [
        {
            id: '392e3b3e-fcc3-4dcf-985b-8c7ee8866213',
            title: 'Pipe Leak Repair',
            description: 'Professional repair for leaking pipes in kitchens, bathrooms, and other areas.',
            price: 1500,
            duration: 90,
            location: 'Dhaka',
            rating: '4.5',
            active: true,
            category: { id: '3be0c12a-4b0f-4087-8d62-4aa3359ed4c2', name: 'plumbing' },
        },
        {
            id: '84edc48a-cbf9-487b-8b1c-3494a6d9688a',
            title: 'Kitchen Sink Installation',
            description: 'Professional installation and replacement of kitchen sinks and faucets.',
            price: 3000,
            duration: 150,
            location: 'Dhaka',
            rating: '3.8',
            active: true,
            category: { id: '3be0c12a-4b0f-4087-8d62-4aa3359ed4c2', name: 'plumbing' },
        },
        {
            id: '894d0f89-50d6-4369-b4b6-bfe1c925a119',
            title: 'Emergency Plumbing Service',
            description: '24/7 emergency plumbing support for burst pipes, leaks, and water supply issues.',
            price: 3500,
            duration: 90,
            location: 'Dhaka',
            rating: '4.3',
            active: false,
            category: { id: '585c8793-992d-4f76-8e21-54ad97be4015', name: 'cleaning' },
        },
        {
            id: '6478dc41-27bc-4a01-8a77-697aa6056297',
            title: 'Bathroom Plumbing Installation',
            description: 'Installation of bathroom fixtures including sinks, toilets, and shower systems.',
            price: 5000,
            duration: 240,
            location: 'Rangpur',
            rating: '4.2',
            active: true,
            category: { id: '585c8793-992d-4f76-8e21-54ad97be4015', name: 'cleaning' },
        },
        {
            id: '86f23392-827b-4343-8c03-2c3964c97482',
            title: 'Water Heater Repair',
            description: 'Repair and maintenance of electric and gas water heaters for residential homes.',
            price: 2500,
            duration: 120,
            location: 'Barishal',
            rating: '4',
            active: true,
            category: { id: '3be0c12a-4b0f-4087-8d62-4aa3359ed4c2', name: 'plumbing' },
        },
    ],
    reviews: [
        {
            id: '921eed16-5508-481e-bc50-10eb09f6d0ad',
            rating: 5,
            comment: 'Geat service, recommended it',
            customer: {
                id: 'd82c087c-a6f2-4760-9d25-2549614481bf',
                name: 'mirnatul-c',
                profileImage: 'https://example.com/images/lipon.jpg',
            },
        },
        {
            id: '2402c405-eb89-4c7c-8b43-7bd34517cae4',
            rating: 4,
            comment: 'Need to upgrade',
            customer: {
                id: 'd82c087c-a6f2-4760-9d25-2549614481bf',
                name: 'mirnatul-c',
                profileImage: 'https://example.com/images/lipon.jpg',
            },
        },
        {
            id: '5fc29a8b-fb59-4cd3-921d-629ee088cd31',
            rating: 4,
            comment: 'Need to upgrade',
            customer: {
                id: 'd82c087c-a6f2-4760-9d25-2549614481bf',
                name: 'mirnatul-c',
                profileImage: 'https://example.com/images/lipon.jpg',
            },
        },
    ],
}

export default async function TechnicianPage({ params }: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params;
    const technicianData = await getTechnicianDetails(id as string);
    console.log(technicianData);
    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <TechnicianHeader technician={technicianData.data} reviews={technicianData.data.reviews} />

                {/* Services and Reviews Grid */}
                <div className="mt-12 grid gap-12 lg:grid-cols-3">
                    {/* Services Section */}
                    <div className="lg:col-span-2">
                        <TechnicianServices services={technicianData.data.service} />
                    </div>

                    {/* Reviews Section */}
                    <div>
                        <TechnicianReviews reviews={technicianData.data.reviews} />
                    </div>
                </div>
            </div>
        </main>
    )
}
