import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getPackageById } from "../services/api";
import BookingForm from "../components/booking/BookingForm";

function Booking() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }


        const fetchPackage = async () => {

            try {

                const data = await getPackageById(id);

                setPackageData(data);

            } catch (error) {

                console.error(error);

                setError("Unable to load package.");

            } finally {

                setLoading(false);

            }
        };

        fetchPackage();

    }, [id, navigate]);


    // Loading
    if (loading) {

        return (
            <div className="min-vh-100 d-flex justify-content-center align-items-center">

                <div className="spinner-border text-success"></div>

            </div>
        );
    }


    // Error
    if (error || !packageData) {

        return (
            <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">

                <h2 className="fw-bold">
                    Package Not Found
                </h2>

                <Link
                    to="/packages"
                    className="btn btn-success mt-3"
                >
                    Browse Packages
                </Link>

            </div>
        );
    }


    return (
        <div className="min-vh-100 bg-light py-5">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-8">


                        {/* Package Summary */}

                        <div className="bg-white rounded-4 shadow overflow-hidden mb-4">

                            <img
                                src={packageData.image}
                                alt={packageData.title}
                                className="w-100 object-fit-cover"
                                style={{ height: "260px" }}
                            />

                            <div className="p-4">

                                <p className="text-success fw-semibold mb-1">
                                    📍 {packageData.destination}
                                </p>

                                <h1 className="fw-bold mb-2">
                                    {packageData.title}
                                </h1>

                                <p className="text-secondary mb-0">
                                    {packageData.duration}
                                    {" • "}
                                    ⭐ {packageData.rating}
                                </p>

                            </div>

                        </div>


                        {/* Booking Form */}

                        <BookingForm
                            packageData={packageData}
                        />


                        {/* Back */}

                        <div className="text-center mt-4">

                            <Link
                                to={`/packages/${packageData._id}`}
                                className="text-secondary text-decoration-none"
                            >
                                ← Back to package
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Booking;