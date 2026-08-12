import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createBooking } from "../../services/api";


function BookingForm({ packageData }) {

    const navigate = useNavigate();


    const [numberOfPeople, setNumberOfPeople] =
        useState(1);

    const [travelDate, setTravelDate] =
        useState("");


    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState(false);


    const totalPrice =
        packageData.price * numberOfPeople;


    const increasePeople = () => {

        if (
            numberOfPeople <
            packageData.availableSeats
        ) {

            setNumberOfPeople(
                numberOfPeople + 1
            );

        }

    };


    const decreasePeople = () => {

        if (numberOfPeople > 1) {

            setNumberOfPeople(
                numberOfPeople - 1
            );

        }

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        setError("");


        // Travel date validation

        if (!travelDate) {

            const message =
                "Please select a travel date.";

            setError(message);

            toast.warning(message);

            return;

        }


        // Traveler validation

        if (
            numberOfPeople < 1 ||
            numberOfPeople >
            packageData.availableSeats
        ) {

            const message =
                "Please select a valid number of travelers.";

            setError(message);

            toast.warning(message);

            return;

        }


        try {

            setLoading(true);


            await createBooking({

                packageId:
                    packageData._id,

                numberOfPeople:
                    Number(numberOfPeople),

                travelDate

            });


            // Booking success

            toast.success(
                "Booking confirmed successfully! 🎉"
            );


            setSuccess(true);


        } catch (error) {

            if (
                error.message ===
                    "Invalid or expired token" ||

                error.message ===
                    "Authentication required"
            ) {

                localStorage.removeItem(
                    "token"
                );

                localStorage.removeItem(
                    "user"
                );


                toast.error(
                    "Your session has expired. Please login again."
                );


                navigate("/login");

                return;

            }


            setError(
                error.message
            );


            toast.error(
                error.message ||
                "Booking failed"
            );


        } finally {

            setLoading(false);

        }

    };


    // ================= SUCCESS =================

    if (success) {

        return (

            <div className="bg-white rounded-4 shadow p-4 p-md-5 text-center">

                <div className="display-4 mb-3">
                    ✅
                </div>


                <h3 className="fw-bold text-success">
                    Booking Successful!
                </h3>


                <p className="text-secondary">
                    Your trip has been booked successfully.
                </p>


                <div className="bg-light rounded-3 p-3 my-4">

                    <div className="d-flex justify-content-between mb-2">

                        <span>
                            Travelers
                        </span>

                        <strong>
                            {numberOfPeople}
                        </strong>

                    </div>


                    <div className="d-flex justify-content-between">

                        <span>
                            Total Paid
                        </span>

                        <strong className="text-success">
                            ₹{totalPrice.toLocaleString("en-IN")}
                        </strong>

                    </div>

                </div>


                <div className="d-flex gap-2">

                    <button
                        onClick={() =>
                            navigate("/bookings")
                        }
                        className="btn btn-success flex-fill"
                    >
                        My Bookings
                    </button>


                    <button
                        onClick={() =>
                            navigate("/packages")
                        }
                        className="btn btn-outline-success flex-fill"
                    >
                        Browse Packages
                    </button>

                </div>

            </div>

        );

    }


    // ================= BOOKING FORM =================

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-4 shadow p-4 p-md-5"
        >


            <h3 className="fw-bold mb-4">
                Book Your Trip
            </h3>


            {/* Error */}

            {error && (

                <div className="alert alert-danger">
                    {error}
                </div>

            )}


            {/* Available seats */}

            <div className="bg-success bg-opacity-10 rounded-3 p-3 mb-4">

                <div className="d-flex justify-content-between align-items-center">

                    <span className="fw-semibold">
                        Available Seats
                    </span>

                    <strong className="text-success">
                        {packageData.availableSeats}
                    </strong>

                </div>

            </div>


            {/* Sold out */}

            {packageData.availableSeats <= 0 ? (

                <div className="alert alert-warning text-center">

                    <strong>
                        This package is fully booked.
                    </strong>

                    <p className="mb-0 mt-1">
                        Please check another package.
                    </p>

                </div>

            ) : (

                <>


                    {/* Number of people */}

                    <div className="mb-4">

                        <label className="form-label fw-semibold">
                            Number of Travelers
                        </label>


                        <div className="d-flex align-items-center">

                            <button
                                type="button"
                                onClick={decreasePeople}
                                disabled={
                                    numberOfPeople <= 1
                                }
                                className="btn btn-outline-secondary"
                            >
                                −
                            </button>


                            <div
                                className="border text-center fw-bold"
                                style={{
                                    width: "80px",
                                    padding: "7px"
                                }}
                            >
                                {numberOfPeople}
                            </div>


                            <button
                                type="button"
                                onClick={increasePeople}
                                disabled={
                                    numberOfPeople >=
                                    packageData.availableSeats
                                }
                                className="btn btn-outline-secondary"
                            >
                                +
                            </button>

                        </div>


                        <small className="text-secondary">
                            Maximum{" "}
                            {packageData.availableSeats}{" "}
                            travelers
                        </small>

                    </div>


                    {/* Travel date */}

                    <div className="mb-4">

                        <label className="form-label fw-semibold">
                            Travel Date
                        </label>


                        <input
                            type="date"
                            value={travelDate}
                            onChange={(e) =>
                                setTravelDate(
                                    e.target.value
                                )
                            }
                            min={
                                new Date()
                                    .toISOString()
                                    .split("T")[0]
                            }
                            className="form-control"
                            required
                        />

                    </div>


                    {/* Price summary */}

                    <div className="bg-light rounded-3 p-4 mb-4">

                        <div className="d-flex justify-content-between mb-2">

                            <span className="text-secondary">
                                Price per person
                            </span>

                            <strong>
                                ₹{packageData.price.toLocaleString("en-IN")}
                            </strong>

                        </div>


                        <div className="d-flex justify-content-between mb-2">

                            <span className="text-secondary">
                                Travelers
                            </span>

                            <strong>
                                {numberOfPeople}
                            </strong>

                        </div>


                        <hr />


                        <div className="d-flex justify-content-between align-items-center">

                            <strong>
                                Total
                            </strong>

                            <strong className="text-success fs-4">
                                ₹{totalPrice.toLocaleString("en-IN")}
                            </strong>

                        </div>

                    </div>


                    {/* Confirm */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-success w-100 py-3 fw-semibold"
                    >

                        {loading
                            ? "Processing..."
                            : "Confirm Booking"
                        }

                    </button>

                </>

            )}

        </form>

    );

}


export default BookingForm;