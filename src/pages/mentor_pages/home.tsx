import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { fetchMentorBookings } from "../../services/mentor_services/booking";
import Loading from "../../components/common/Loading";
import ErrorModal from "../../components/common/ErrorModal";
import { stat } from "fs";
import { updateBookingStatus } from "../../services/mentor_services/updateBookingStatus";
import { capitalizeFirstLetter } from "../../helpers/capitalize";
import { formatTime } from "../../helpers/timeFormat";

interface MentorBooking {
    id: number;
    day: string;
    time: string;
    bookedAt: string;
    status: string;
    student: {
        displayName: string;
    };
}

const MentorHome = () => {
    const [bookings, setBookings] = useState<MentorBooking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const mentorId = localStorage.getItem("mentorID");
    const { updateToOngoing, updateToDeclined, updateToCompleted, updateToCancelled } = updateBookingStatus();

    // useEffect(() => {
    //     const getMentorBookings = async () => {
    //         setLoading(true);
    //         setError(null);

    //         try {
    //             const data = await fetchMentorBookings(mentorId);
    //             setBookings(data);
    //         } catch (error: any) {
    //             console.error("Failed to load MentorBookings:", error);
    //             setError(error.message);
    //             setShowErrorModal(true);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     getMentorBookings();
    // }, [mentorId]);

    // Function to fetch mentor bookings
    const getMentorBookings = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchMentorBookings(mentorId);
            setBookings(data);
        } catch (error: any) {
            console.error("Failed to load MentorBookings:", error);
            setError(error.message);
            setShowErrorModal(true);
        } finally {
            setLoading(false);
        }
    };

    // Fetch bookings on component mount
    useEffect(() => {
        getMentorBookings();
    }, [mentorId]);

    const handleUpdateStatus = async (bookingId: number, statusUpdateFunc: Function) => {
        setLoading(true);
        setError(null);

        try {
            console.log("bookingId", bookingId);
            await statusUpdateFunc(bookingId, setLoading, setError);

            await getMentorBookings();
        } catch (error: any) {
            console.error("Error updating booking:", error);
            setError(error.message);
            setShowErrorModal(true);
        } finally {
            setLoading(false);
        }
    };

    const getActionButtons = (booking: MentorBooking) => {
        if (booking.status === "pending") {
            return (
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm" onClick={() => handleUpdateStatus(booking.id, updateToOngoing)}>
                        Accept
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm" onClick={() => handleUpdateStatus(booking.id, updateToDeclined)}>
                        Decline
                    </button>
                </div>
            );
        } else if (booking.status === "ongoing") {
            return (
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm" onClick={() => handleUpdateStatus(booking.id, updateToCompleted)}>
                        Mark as Completed
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm" onClick={() => handleUpdateStatus(booking.id, updateToCancelled)}>
                        Mark as Cancelled
                    </button>
                </div>
            );
        }
        return null;
    };

    const getStatusBadge = (status: string) => {
        let color = "bg-gray-300 text-gray-700"; // Default

        if (status === "pending") color = "hidden";
        else if (status === "completed") color = "bg-green-200 text-green-800";
        else if (status === "ongoing") color = "hidden";
        else if (status === "declined" || status === "cancelled") color = "bg-red-200 text-red-800";

        return (
            <span className={`px-2 py-1 rounded-md text-[14px] font-semibold ${color}`}>
                {capitalizeFirstLetter(status)}
            </span>
        );
    };


    const columns = [
        {
            name: "Student's Name",
            selector: (row: MentorBooking) => row.student.displayName,
            sortable: false,
        },
        {
            name: "Day",
            selector: (row: MentorBooking) => row.day,
            sortable: false,
        },
        {
            name: "Time",
            selector: (row: MentorBooking) => formatTime(row.time),
            sortable: false,
        },
        {
            name: "Booked At",
            selector: (row: MentorBooking) => new Date(row.bookedAt).toLocaleString(),
            sortable: true,
        },
        {
            name: "Status",
            cell: (row: MentorBooking) => (
                <div className="flex items-center gap-2">
                    {getStatusBadge(row.status)}
                    {getActionButtons(row)}
                </div>
            ),
            sortable: true,
            width: "30rem"
        },
    ];


    if (loading) return <Loading />;

    return (
        <div className="mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Bookings</h2>
            <div className="rounded-lg shadow-2xl border border-gray-200 p-4">
                <DataTable
                    columns={columns}
                    data={bookings}
                    pagination
                    highlightOnHover
                    striped
                    customStyles={{
                        headCells: {
                            style: {
                                fontWeight: "bold",
                                fontSize: "18px",
                                padding: "12px",
                            },
                        },
                        rows: {
                            style: {
                                padding: "10px",
                                fontSize: "16px"
                            },
                        },
                    }}
                />
            </div>

            {/* Error Modal */}
            {showErrorModal && error && (
                <ErrorModal message={error} onClose={() => setShowErrorModal(false)} />
            )}
        </div>
    );
};

export default MentorHome;


