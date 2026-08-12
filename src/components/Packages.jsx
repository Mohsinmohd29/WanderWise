import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPackages } from "../services/api";
import PackageCard from "./PackageCard";

function Packages({ limit }) {

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchPackages = async () => {

            try {

                const data = await getPackages();

                setPackages(data);

            } catch (error) {

                console.error(error);

                setError("Unable to load packages.");

            } finally {

                setLoading(false);

            }

        };

        fetchPackages();

    }, []);


    // Show limited packages when limit is provided.
    // Otherwise show all packages.
    const displayedPackages = limit
        ? packages.slice(0, limit)
        : packages;


    return (
        <section id="packages" className="py-5">

            <div className="container py-5">


                {/* Section Header */}

                <div className="text-center mb-5">

                    <p className="section-tag">
                        PLAN YOUR TRIP
                    </p>

                    <h2 className="section-title display-5">
                        Featured <span>Tour Packages</span>
                    </h2>

                    <p className="text-secondary">
                        Carefully designed trips for unforgettable
                        experiences.
                    </p>

                </div>


                {/* Loading */}

                {loading && (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-success"
                            role="status"
                        >
                        </div>

                        <p className="text-secondary mt-3">
                            Loading packages...
                        </p>

                    </div>

                )}


                {/* Error */}

                {error && (

                    <div className="alert alert-danger text-center">
                        {error}
                    </div>

                )}


                {/* Packages */}

                {!loading && !error && (

                    <div className="row g-4">

                        {displayedPackages.map((pkg) => (

                            <PackageCard
                                key={pkg._id}
                                packageData={pkg}
                            />

                        ))}

                    </div>

                )}


                {/* View All Packages */}

                <div className="text-center mt-5">

                    <Link
                        to="/packages"
                        className="btn btn-success px-4 py-2"
                    >
                        View All Packages →
                    </Link>

                </div>


            </div>

        </section>
    );
}

export default Packages;