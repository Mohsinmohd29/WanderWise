import { useEffect, useState } from "react";
import { Link,useNavigate, useParams } from "react-router-dom";

import { getPackageById,deletePackage } from "../services/api";

import PackageHero from "../components/PackageHero";
import Itinerary from "../components/Itinerary";
import IncludedFeatures from "../components/IncludedFeatures";
import BookingCard from "../components/BookingCard";

const getUserIdFromToken = () => {

    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    try {

        const payload = JSON.parse(
            atob(token.split(".")[1])
        );

        return payload.id;

    } catch (error) {

        return null;

    }

};

function PackageDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const loggedInUserId = getUserIdFromToken();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {

        const fetchPackage = async () => {

            try {

                const data = await getPackageById(id);

                setPackageData(data);

            } catch (error) {

                console.error(error);

                setError("Package not found.");

            } finally {

                setLoading(false);

            }
        };

        fetchPackage();

    }, [id]);

    const handleDeletePackage = async () => {

        try {
    
            setDeleteLoading(true);
            setError("");
    
            await deletePackage(packageData._id);
    
            // Redirect to My Packages after successful deletion
            navigate("/my-packages", { replace: true });
    
        } catch (error) {
    
            console.error(
                "DELETE PACKAGE ERROR:",
                error
            );
    
            setError(
                error.message ||
                "Failed to delete package."
            );
    
            setShowDeleteModal(false);
    
        } finally {
    
            setDeleteLoading(false);
    
        }
    
    };

    // Loading
    if (loading) {

        return (
            <div className="container text-center py-5">

                <div
                    className="spinner-border text-success"
                    role="status"
                >
                </div>

                <p className="text-secondary mt-3">
                    Loading package...
                </p>

            </div>
        );
    }


    // Package not found
    if (error || !packageData) {

        return (
            <div className="container text-center py-5">

                <h2 className="fw-bold">
                    Package Not Found
                </h2>

                <p className="text-secondary">
                    We couldn't find this tour package.
                </p>

                <Link
                    to="/packages"
                    className="btn btn-success"
                >
                    Browse Packages
                </Link>

            </div>
        );
    }


    return (
        <>

            {/* Package Hero */}

            <PackageHero
                packageData={packageData}
            />


            <main className="container py-5">

                <div className="row g-5">

                    <div className="col-lg-8">


                        {/* About */}

                        <section className="mb-5">

                            <h2 className="fw-bold mb-3">
                                About This Trip
                            </h2>

                            <p className="text-secondary lh-lg">
                                {packageData.description}
                            </p>

                        </section>


                        {/* Owner */}

                        {packageData.owner && (

                            <section className="mb-5">

                                <div className="bg-light rounded-4 p-4">

                                    <p className="text-success fw-semibold mb-1">
                                        TOUR HOST
                                    </p>

                                    <h4 className="fw-bold mb-2">
                                        Hosted by {packageData.owner.name}
                                    </h4>

                                    <p className="text-secondary mb-0">
                                        This tour package is offered by a
                                        WanderWise traveler.
                                    </p>

                                </div>

                            </section>

                        )}


                        {/* Itinerary */}

                        <Itinerary
                            itinerary={packageData.itinerary}
                        />


                        {/* Included Features */}

                        <IncludedFeatures
                            included={packageData.included}
                        />

                    </div>


                    {/* Right Side */}

                    <div className="col-lg-4">

                        {loggedInUserId === packageData.owner?._id ? (

                            <div className="card border-0 shadow booking-card">

                                <div className="card-body p-4">

                                    <p className="text-success fw-semibold mb-1">
                                        YOUR PACKAGE
                                    </p>

                                    <h4 className="fw-bold mb-3">
                                        Package Management
                                    </h4>

                                    <p className="text-secondary">
                                        You are the owner of this package.
                                    </p>


                                    <div className="d-flex flex-column align-items-center gap-2">

                                        {/* Edit */}

                                        <Link
                                            to={`/edit-package/${packageData._id}`}
                                            className="btn btn-success"
                                            style={{ width: "200px" }}
                                        >
                                            ✏️ Edit Package
                                        </Link>


                                        {/* Delete */}

                                        <button
                                            onClick={() =>
                                                setShowDeleteModal(true)
                                            }
                                            className="btn btn-outline-danger"
                                            style={{ width: "200px" }}
                                        >
                                            🗑️ Delete Package
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ) : (

                            <BookingCard
                                packageData={packageData}
                            />

                        )}

                    </div>

                </div>

            </main>


            {/* Back Buttons */}

            <div className="container pb-5 d-flex gap-2">

                <Link
                    to="/"
                    className="btn btn-outline-success"
                >
                    ← Home
                </Link>

                <Link
                    to="/packages"
                    className="btn btn-outline-secondary"
                >
                    ← Back to Packages
                </Link>

            </div>


            {/* Delete Confirmation Modal */}

            {showDeleteModal && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)"
                    }}
                >

                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content border-0 rounded-4 shadow">

                            <div className="modal-header">

                                <h5 className="modal-title fw-bold">
                                    Delete Package?
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                        setShowDeleteModal(false)
                                    }
                                    disabled={deleteLoading}
                                ></button>

                            </div>


                            <div className="modal-body">

                                <p className="mb-2">
                                    Are you sure you want to delete
                                    this package?
                                </p>

                                <p className="text-secondary mb-0">

                                    <strong>
                                        {packageData.title}
                                    </strong>

                                    {" "}will be permanently removed.

                                </p>

                            </div>


                            <div className="modal-footer">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        setShowDeleteModal(false)
                                    }
                                    disabled={deleteLoading}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDeletePackage}
                                    disabled={deleteLoading}
                                >

                                    {deleteLoading
                                        ? "Deleting..."
                                        : "Yes, Delete"
                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}

export default PackageDetails;