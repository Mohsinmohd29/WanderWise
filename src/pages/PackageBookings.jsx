import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    getPackageById,
    getPackageBookings,
    deletePackage
} from "../services/api";


function PackageBookings() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [packageData, setPackageData] = useState(null);
    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);


    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }


        const fetchData = async () => {

            try {

                const packageResult =
                    await getPackageById(id);

                const bookingResult =
                    await getPackageBookings(id);


                setPackageData(packageResult);

                setBookings(
                    Array.isArray(bookingResult)
                        ? bookingResult
                        : []
                );

            } catch (error) {

                console.error(
                    "PACKAGE BOOKINGS ERROR:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load package bookings."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchData();

    }, [id, navigate]);

    const handleDeletePackage = async () => {

        try {
    
            setDeleteLoading(true);
    
            await deletePackage(packageData._id);
    
            navigate("/my-packages");
    
        } catch (error) {
    
            console.error("DELETE PACKAGE ERROR:", error);
    
            setError(
                error.message ||
                "Failed to delete package."
            );
    
            setShowDeleteModal(false);
    
        } finally {
    
            setDeleteLoading(false);
    
        }
    
    };

    // ================= LOADING =================

    if (loading) {

        return (

            <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">

                <div className="text-center">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    >
                    </div>

                    <p className="text-secondary mt-3">
                        Loading bookings...
                    </p>

                </div>

            </div>

        );

    }


    // ================= ERROR =================

    if (error) {

        return (

            <div className="min-vh-100 bg-light">

                <div className="container py-5">

                    <div className="d-flex gap-2 mb-4">

                        <Link
                            to="/"
                            className="btn btn-success"
                        >
                            ← Home
                        </Link>

                        <Link
                            to="/my-packages"
                            className="btn btn-outline-secondary"
                        >
                            ← My Packages
                        </Link>

                    </div>


                    <div className="bg-white rounded-4 shadow-sm p-5 text-center">

                        <div className="display-5 mb-3">
                            ⚠️
                        </div>

                        <h2 className="fw-bold">
                            Unable to Load Bookings
                        </h2>

                        <p className="text-secondary">
                            {error}
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // ================= STATISTICS =================

    const totalBookings = bookings.length;


    const totalSeatsBooked = bookings.reduce(
        (total, booking) =>
            total +
            Number(booking.numberOfPeople || 0),
        0
    );


    const seatsRemaining = Math.max(
        0,
        Number(packageData?.availableSeats || 0)
    );


    // ================= PAGE =================

    return (

        <div className="bg-light min-vh-100 py-5">

            <div className="container">


                {/* Navigation */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <Link
                        to="/"
                        className="btn btn-success"
                    >
                        ← Home
                    </Link>

                    <Link
                        to="/my-packages"
                        className="btn btn-outline-secondary"
                    >
                        ← My Packages
                    </Link>

                </div>


                {/* Package Header */}

                <div className="bg-white rounded-4 shadow-sm p-4 p-md-5 mb-4">

                    <div className="row align-items-center">

                        <div className="col-lg-8">

                            <p className="text-success fw-semibold mb-1">
                                PACKAGE BOOKINGS
                            </p>

                            <h1 className="fw-bold mb-2">

                                {packageData?.title ||
                                    "Package"}

                            </h1>

                            <p className="text-secondary mb-0">

                                📍{" "}
                                {packageData?.destination ||
                                    "Destination"}

                            </p>

                        </div>


                        {packageData?.image && (

                            <div className="col-lg-4 mt-4 mt-lg-0">

                                <img
                                    src={packageData.image}
                                    alt={packageData.title}
                                    className="img-fluid rounded-4 w-100"
                                    style={{
                                        height: "150px",
                                        objectFit: "cover"
                                    }}
                                />

                            </div>

                        )}

                    </div>

                </div>


                {/* Statistics */}

                <div className="row g-4 mb-5">


                    <div className="col-md-4">

                        <div className="bg-white rounded-4 shadow-sm p-4">

                            <p className="text-secondary mb-1">
                                Total Bookings
                            </p>

                            <h2 className="fw-bold mb-0">
                                {totalBookings}
                            </h2>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="bg-white rounded-4 shadow-sm p-4">

                            <p className="text-secondary mb-1">
                                Seats Booked
                            </p>

                            <h2 className="fw-bold text-success mb-0">
                                {totalSeatsBooked}
                            </h2>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div className="bg-white rounded-4 shadow-sm p-4">

                            <p className="text-secondary mb-1">
                                Seats Remaining
                            </p>

                            <h2
                                className={
                                    seatsRemaining <= 3
                                        ? "fw-bold text-danger mb-0"
                                        : "fw-bold mb-0"
                                }
                            >
                                {seatsRemaining}
                            </h2>

                        </div>

                    </div>

                </div>


                {/* Travelers heading */}

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h3 className="fw-bold mb-0">
                        Travelers
                    </h3>

                    <span className="text-secondary">
                        {totalBookings}{" "}
                        {totalBookings === 1
                            ? "booking"
                            : "bookings"}
                    </span>

                </div>


                {/* No bookings */}

                {bookings.length === 0 ? (

                    <div className="bg-white rounded-4 shadow-sm text-center p-5">

                        <div className="display-4 mb-3">
                            🧳
                        </div>

                        <h3 className="fw-bold">
                            No bookings yet
                        </h3>

                        <p className="text-secondary mb-0">
                            Nobody has booked this package yet.
                        </p>

                    </div>

                ) : (


                    /* Booking cards */

                    <div className="row g-4">

                        {bookings.map((booking) => {

                            const traveler =
                                booking.user;


                            const travelDate =
                                booking.travelDate
                                    ? new Date(
                                        booking.travelDate
                                    )
                                    : null;


                            return (

                                <div
                                    className="col-lg-6"
                                    key={booking._id}
                                >

                                    <div className="bg-white rounded-4 shadow-sm p-4 h-100">


                                        {/* Traveler */}

                                        <div className="d-flex align-items-center mb-4">

                                            <div
                                                className="rounded-circle bg-success bg-opacity-10 d-flex justify-content-center align-items-center me-3"
                                                style={{
                                                    width: "52px",
                                                    height: "52px"
                                                }}
                                            >
                                                <span className="fs-4">
                                                    👤
                                                </span>
                                            </div>


                                            <div>

                                                <h5 className="fw-bold mb-1">

                                                    {traveler?.name ||
                                                        "Unknown traveler"}

                                                </h5>


                                                <p className="text-secondary mb-0">

                                                    {traveler?.email ||
                                                        "Email unavailable"}

                                                </p>

                                            </div>

                                        </div>


                                        <hr />


                                        {/* Seats */}

                                        <div className="d-flex justify-content-between mb-3">

                                            <span className="text-secondary">
                                                Seats Booked
                                            </span>

                                            <strong>
                                                {booking.numberOfPeople || 0}
                                            </strong>

                                        </div>


                                        {/* Travel Date */}

                                        <div className="d-flex justify-content-between mb-3">

                                            <span className="text-secondary">
                                                Travel Date
                                            </span>

                                            <strong>

                                                {travelDate &&
                                                    !isNaN(
                                                        travelDate.getTime()
                                                    )

                                                    ? travelDate.toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        }
                                                    )

                                                    : "Not available"}

                                            </strong>

                                        </div>


                                        {/* Booking total */}

                                        <div className="d-flex justify-content-between mb-3">

                                            <span className="text-secondary">
                                                Booking Total
                                            </span>

                                            <strong className="text-success">

                                                ₹
                                                {Number(
                                                    booking.totalPrice || 0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}

                                            </strong>

                                        </div>


                                        {/* Status */}

                                        <div className="d-flex justify-content-between align-items-center">

                                            <span className="text-secondary">
                                                Status
                                            </span>

                                            <span
                                                className={
                                                    booking.status === "confirmed"
                                                        ? "badge bg-success"
                                                        : "badge bg-secondary"
                                                }
                                            >
                                                {booking.status ||
                                                    "confirmed"}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>

    );

}


export default PackageBookings;