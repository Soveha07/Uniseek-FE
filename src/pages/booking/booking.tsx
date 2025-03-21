import { useEffect, useState } from 'react';
import { fetchStudentBookings } from '../../services/booking/getBookingByStudentId';
import Loading from '../../components/common/Loading';
import { Card } from '../../components/booking/card';
import { Button } from '../../components/booking/button';
import { formatTime } from '../../helpers/timeFormat';
import { formatDateTime } from '../../helpers/dateTimeFormat';
import { Booking } from '../../interfaces/booking.interface';
import ErrorModal from '../../components/common/ErrorModal';

// interface Booking {
//     id: number;
//     day: string;
//     time: string;
//     bookedAt: string;
//     status: string;
//     mentor: {
//         fullName: string;
//         description: string;
//         profileUrl: string | null;
//         email: string;
//         phoneNumber: string;
//         telegramLink: string;
//     };
// }

const statusColors: Record<string, string> = {
    pending: 'text-yellow-500',
    ongoing: 'text-blue-500',
    completed: 'text-green-500',
    declined: 'text-red-500',
    cancelled: 'text-red-500',
};

const BookingsPage = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const studentId = localStorage.getItem('userID');

    useEffect(() => {
        const getBookings = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchStudentBookings(studentId);
                setBookings(data);
            } catch (error: any) {
                console.error('Failed to load bookings:', error);
                setError(error.message);
                setShowErrorModal(true);

            } finally {
                setLoading(false);
            }
        };

        getBookings();
    }, [studentId]);

    if (loading) return <Loading></Loading>;

    // if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Your Bookings</h1>
            {bookings.length === 0 ? (
                <p className="text-gray-600">No bookings found.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookings.map((booking) => (
                        <Card key={booking.id}>
                            <h2 className="text-lg font-semibold">Mentor: {booking.mentor.fullName}</h2>
                            <p className="text-sm text-gray-600">{booking.mentor.major.name}, {booking.mentor.university.name}</p>
                            {/* {booking.mentor.phoneNumber && (
                                <p className="text-sm text-gray-600 mt-1">Phone Number: {booking.mentor.phoneNumber}</p>
                            )} */}
                            <p className="mt-2"><strong>Day:</strong> {booking.day}</p>
                            <p><strong>Time:</strong> {formatTime(booking.time)}</p>
                            <p><strong>Booked At:</strong> {formatDateTime(booking.bookedAt)}</p>
                            <p className={`mt-2 font-semibold ${statusColors[booking.status]}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </p>
                            {/* {booking.status === "ongoing" && (
                                <div className="mt-4 flex gap-2">
                                    <a href={`mailto:${booking.mentor.email}`} target="_blank">
                                        <Button>Email</Button>
                                    </a>
                                    {booking.mentor.telegramLink && (
                                        <a href={booking.mentor.telegramLink} target="_blank">
                                            <Button variant="secondary">Telegram</Button>
                                        </a>
                                    )}
                                </div>
                            )} */}
                        </Card>
                    ))}
                </div>
            )}

            {/* Error Modal */}
            {showErrorModal && error && (
                <ErrorModal message={error} onClose={() => setShowErrorModal(false)} />
            )}
        </div>
    );
};

export default BookingsPage;
