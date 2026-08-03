import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react'
import { Star } from 'lucide-react'
import Image from 'next/image'

interface TechnicianHeaderProps {

    user: {
        name: string
        phone: string
        email: string
        city: string
        profileImage: string | null
    }
    experience: number
    averageRating: string
    totalReviews: number
    isAvailable: boolean
    verified: boolean
    bio: string

}

interface Review {
    id: string;
    rating: number;
    comment: string;
    customer: {
        id: string;
        name: string;
        profileImage: string;
    };
}

interface TechnicianReviewsProps {
    technician: TechnicianHeaderProps;
    reviews?: Review[] | null;
}

export function TechnicianHeader({ technician, reviews }: TechnicianReviewsProps) {
    // console.log(technician);
    const reviewList = reviews ?? [];
    const avgRating =
        reviewList.length > 0
            ? Number(
                (
                    reviewList.reduce((sum, review) => sum + review.rating, 0) /
                    reviewList.length
                ).toFixed(1)
            )
            : 0;

    const initials = technician.user.name

    return (
        <div className="rounded-lg border border-border bg-card p-8">
            <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                {/* Avatar */}
                <div className="flex shrink-0 items-start">
                    <div className="relative h-24 w-24 rounded-full bg-gradient-to from-primary to-primary/60 flex items-center justify-center text-2xl font-bold text-white">
                        {technician.user.profileImage ? (
                            <Image
                                src={technician.user.profileImage}
                                alt={technician.user.name}
                                width={64}
                                height={64}
                                className="h-full w-full rounded-full object-cover"
                                unoptimized
                            />
                        ) : (
                            initials
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">{technician.user.name}</h1>
                            <p className="mt-1 text-sm text-muted-foreground">{technician.experience} year experience</p>
                        </div>
                        {technician.isAvailable && (
                            <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-sm font-medium text-green-700">Available</span>
                            </div>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="mt-4 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-foreground">{avgRating}</span>
                            <span className="text-muted-foreground">({technician.totalReviews} reviews)</span>
                        </div>
                        {technician.verified && (
                            <div className="ml-4 flex items-center gap-1 text-blue-600">
                                <CheckCircle2 className="h-5 w-5" />
                                <span className="text-sm font-medium">Verified</span>
                            </div>
                        )}
                    </div>

                    {/* Bio */}
                    <p className="mt-4 text-foreground">{technician.bio}</p>

                    {/* Contact Info */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span>{technician.user.city}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4 shrink-0" />
                            <span>{technician.user.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4 shrink-0" />
                            <span>{technician.user.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
