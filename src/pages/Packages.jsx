import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPackages } from "../services/api";

function Packages() {

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchPackages = async () => {

            try {

                const data = await getPackages();

                setPackages(data);

            } catch (error) {

                console.error("PACKAGES ERROR:", error);

                setError(
                    error.message ||
                    "Failed to load packages."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchPackages();

    }, []);


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
                        Discovering amazing trips...
                    </p>

                </div>

            </div>

        );

    }


    // ================= PAGE =================

    return (

        <div className="bg-light min-vh-100">


            {/* ================= HERO ================= */}

            <section className="py-5 bg-dark text-white">

                <div className="container py-5">

                    <div className="row align-items-center">

                        <div className="col-lg-8">

                            <p className="text-success fw-semibold mb-2">
                                DISCOVER • EXPLORE • EXPERIENCE
                            </p>

                            <h1 className="display-4 fw-bold mb-3">
                                Explore Our Travel Packages
                            </h1>

                            <p className="lead text-light opacity-75 mb-0">
                                Discover unforgettable destinations,
                                carefully planned itineraries and
                                experiences shared by fellow travelers.
                            </p>

                        </div>

                        <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">

                            <Link
                                to="/"
                                className="btn btn-outline-light me-2"
                            >
                                ← Home
                            </Link>

                            <span className="badge bg-success fs-6 px-3 py-2">
                                {packages.length}{" "}
                                {packages.length === 1
                                    ? "Package"
                                    : "Packages"
                                }
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CONTENT ================= */}

            <main className="container py-5">


                {/* ERROR */}

                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}


                {/* NO PACKAGES */}

                {!error && packages.length === 0 && (

                    <div className="bg-white rounded-4 shadow-sm text-center p-5">

                        <div className="display-3 mb-3">
                            🌍
                        </div>

                        <h3 className="fw-bold">
                            No travel packages available
                        </h3>

                        <p className="text-secondary">
                            Be the first traveler to share an
                            amazing trip with the WanderWise community.
                        </p>

                        <Link
                            to="/create-package"
                            className="btn btn-success"
                        >
                            Post a Trip
                        </Link>

                    </div>

                )}


                {/* ================= PACKAGE GRID ================= */}

                {packages.length > 0 && (

                    <div className="row g-4">

                        {packages.map((packageData) => (

                            <div
                                className="col-md-6 col-lg-4"
                                key={packageData._id}
                            >

                                <div className="card border-0 shadow-sm h-100 overflow-hidden">


                                    {/* IMAGE */}

                                    <div
                                        style={{
                                            height: "240px",
                                            overflow: "hidden"
                                        }}
                                    >

                                        <img
                                            src={packageData.image}
                                            alt={packageData.title}
                                            className="w-100 h-100"
                                            style={{
                                                objectFit: "cover"
                                            }}
                                        />

                                    </div>


                                    {/* CARD BODY */}

                                    <div className="card-body p-4 d-flex flex-column">


                                        {/* DESTINATION */}

                                        <p className="text-success fw-semibold small mb-1">

                                            📍 {packageData.destination}

                                        </p>


                                        {/* TITLE */}

                                        <h3 className="fw-bold mb-2">

                                            {packageData.title}

                                        </h3>


                                        {/* DURATION + RATING */}

                                        <div className="d-flex gap-3 text-secondary mb-3">

                                            <span>
                                                🕐 {packageData.duration}
                                            </span>

                                            <span>
                                                ⭐ {packageData.rating || "New"}
                                            </span>

                                        </div>


                                        {/* DESCRIPTION */}

                                        <p className="text-secondary">

                                            {packageData.description
                                                ? packageData.description.length > 100
                                                    ? `${packageData.description.substring(0, 100)}...`
                                                    : packageData.description
                                                : "Explore this amazing destination with WanderWise."
                                            }

                                        </p>


                                        <div className="mt-auto">


                                            <hr />


                                            {/* PRICE + SEATS */}

                                            <div className="d-flex justify-content-between align-items-center mb-3">

                                                <div>

                                                    <small className="text-secondary d-block">
                                                        Starting from
                                                    </small>

                                                    <strong className="text-success fs-4">

                                                        ₹
                                                        {Number(
                                                            packageData.price || 0
                                                        ).toLocaleString("en-IN")}

                                                    </strong>

                                                    <small className="text-secondary">
                                                        {" "} / person
                                                    </small>

                                                </div>


                                                <div className="text-end">

                                                    <small className="text-secondary d-block">
                                                        Seats
                                                    </small>

                                                    <strong>

                                                        {packageData.availableSeats}

                                                    </strong>

                                                </div>

                                            </div>


                                            {/* BUTTON */}

                                            <Link
                                                to={`/packages/${packageData._id}`}
                                                className="btn btn-success w-100 py-2"
                                            >
                                                View Package →
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>

    );

}


export default Packages;