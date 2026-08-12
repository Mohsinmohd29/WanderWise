import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getMyBookings } from "../services/api";

function Bookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/login?redirect=/bookings");

            return;

        }


        const fetchBookings = async () => {

            try {

                const data = await getMyBookings();

                /*
                 * Only keep bookings whose package still exists.
                 *
                 * If a package was deleted, Mongoose returns
                 * package as null after populate().
                 *
                 * We simply don't show those orphan bookings.
                 */
                const validBookings = Array.isArray(data)
                    ? data.filter((booking) => booking.package)
                    : [];

                setBookings(validBookings);

            } catch (error) {

                console.error("BOOKINGS FETCH ERROR:", error);

                setError(
                    error.message ||
                    "Failed to load bookings."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchBookings();

    }, [navigate]);


    // ================= LOADING =================

    if (loading) {

        return (

            <div className="min-vh-100 d-flex justify-content-center align-items-center">

                <div className="text-center">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    >
                    </div>

                    <p className="text-secondary mt-3">
                        Loading your bookings...
                    </p>

                </div>

            </div>

        );

    }


    // ================= PAGE =================

    return (

        <div className="bg-light min-vh-100 py-5">

            <div className="container">


                {/* ================= HEADER ================= */}

                <div className="d-flex justify-content-between align-items-center mb-5">

                    <div>

                        <p className="text-success fw-semibold mb-1">
                            YOUR TRAVEL HISTORY
                        </p>

                        <h1 className="fw-bold mb-2">
                            My Bookings
                        </h1>

                        <p className="text-secondary mb-0">
                            View and manage your upcoming trips.
                        </p>

                    </div>


                    <Link
                        to="/packages"
                        className="btn btn-success"
                    >
                        Explore Packages
                    </Link>

                </div>


                {/* ================= ERROR ================= */}

                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}


                {/* ================= NO BOOKINGS ================= */}

                {!error && bookings.length === 0 && (

                    <div className="bg-white rounded-4 shadow-sm text-center p-5">

                        <div className="display-4 mb-3">
                            ✈️
                        </div>


                        <h3 className="fw-bold">
                            No bookings yet
                        </h3>


                        <p className="text-secondary">
                            You haven't booked any trips yet.
                            Start exploring amazing destinations!
                        </p>


                        <Link
                            to="/packages"
                            className="btn btn-success"
                        >
                            Explore Packages
                        </Link>

                    </div>

                )}


                {/* ================= BOOKINGS ================= */}

                {bookings.length > 0 && (

                    <div className="row g-4">

                        {bookings.map((booking) => {

                            /*
                             * This is guaranteed to exist because
                             * we filtered out invalid bookings above.
                             */
                            const packageData = booking.package;

                            const travelDate = booking.travelDate
                                ? new Date(booking.travelDate)
                                : null;


                            const pricePerPerson =
                                Number(booking.pricePerPerson ?? 0);

                            const totalPrice =
                                Number(booking.totalPrice ?? 0);

                            const numberOfPeople =
                                Number(booking.numberOfPeople ?? 0);


                            return (

                                <div
                                    className="col-lg-6"
                                    key={booking._id}
                                >

                                    <div className="card border-0 shadow-sm overflow-hidden h-100">


                                        {/* ================= PACKAGE IMAGE ================= */}

                                        {packageData.image && (

                                            <img
                                                src={packageData.image}
                                                alt={
                                                    packageData.title ||
                                                    "Travel package"
                                                }
                                                className="card-img-top"
                                                style={{
                                                    height: "230px",
                                                    objectFit: "cover"
                                                }}
                                            />

                                        )}


                                        <div className="card-body p-4">


                                            {/* ================= STATUS ================= */}

                                            <div className="d-flex justify-content-between align-items-center mb-3">

                                                <span className="text-success small fw-semibold">
                                                    BOOKING
                                                </span>


                                                <span
                                                    className={
                                                        booking.status === "confirmed"
                                                            ? "badge bg-success"
                                                            : "badge bg-secondary"
                                                    }
                                                >
                                                    {booking.status || "confirmed"}
                                                </span>

                                            </div>


                                            {/* ================= PACKAGE ================= */}

                                            <h3 className="fw-bold mb-1">
                                                {packageData.title}
                                            </h3>


                                            {packageData.destination && (

                                                <p className="text-success mb-3">

                                                    📍{" "}
                                                    {packageData.destination}

                                                </p>

                                            )}


                                            <hr />


                                            {/* ================= TRAVEL DATE ================= */}

                                            <div className="d-flex justify-content-between mb-3">

                                                <span className="text-secondary">
                                                    Travel Date
                                                </span>


                                                <strong>

                                                    {travelDate &&
                                                    !isNaN(travelDate.getTime())

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


                                            {/* ================= PEOPLE ================= */}

                                            <div className="d-flex justify-content-between mb-3">

                                                <span className="text-secondary">
                                                    Travelers
                                                </span>


                                                <strong>
                                                    {numberOfPeople || "N/A"}
                                                </strong>

                                            </div>


                                            {/* ================= PRICE PER PERSON ================= */}

                                            <div className="d-flex justify-content-between mb-3">

                                                <span className="text-secondary">
                                                    Price per person
                                                </span>


                                                <strong>

                                                    {booking.pricePerPerson != null

                                                        ? `₹${pricePerPerson.toLocaleString(
                                                            "en-IN"
                                                        )}`

                                                        : "N/A"}

                                                </strong>

                                            </div>


                                            <hr />


                                            {/* ================= TOTAL ================= */}

                                            <div className="d-flex justify-content-between align-items-center">

                                                <span className="fw-semibold">
                                                    Total
                                                </span>


                                                <strong className="text-success fs-4">

                                                    {booking.totalPrice != null

                                                        ? `₹${totalPrice.toLocaleString(
                                                            "en-IN"
                                                        )}`

                                                        : "N/A"}

                                                </strong>

                                            </div>


                                            {/* ================= VIEW PACKAGE ================= */}

                                            <Link
                                                to={`/packages/${packageData._id}`}
                                                className="btn btn-outline-success w-100 mt-4"
                                            >
                                                View Package
                                            </Link>

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


export default Bookings;