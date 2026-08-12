import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getMyPackages,
    deletePackage
} from "../services/api";

function MyPackages() {

    const navigate = useNavigate();

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState(null);
    const [deleting, setDeleting] = useState(false);


    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate("/login?redirect=/my-packages");

            return;
        }


        const fetchMyPackages = async () => {

            try {

                const data = await getMyPackages();

                setPackages(data);

            } catch (error) {

                setError(error.message);

                toast.error(
                    error.message || "Failed to load your packages"
                );

            } finally {

                setLoading(false);

            }

        };


        fetchMyPackages();

    }, [navigate]);


    const handleDeleteClick = (id) => {

        setSelectedPackageId(id);

        setShowDeleteModal(true);

    };


    const handleDelete = async () => {

        if (!selectedPackageId) {
            return;
        }


        try {

            setDeleting(true);

            await deletePackage(selectedPackageId);


            // Remove deleted package from the page
            setPackages((prevPackages) =>
                prevPackages.filter(
                    (packageData) =>
                        packageData._id !== selectedPackageId
                )
            );


            // Success notification
            toast.success(
                "Package deleted successfully! 🗑️"
            );


            setShowDeleteModal(false);

            setSelectedPackageId(null);

        } catch (error) {

            setError(error.message);

            // Error notification
            toast.error(
                error.message ||
                "Failed to delete package"
            );

        } finally {

            setDeleting(false);

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
                    Loading your packages...
                </p>

            </div>

        );

    }


    return (

        <div className="bg-light min-vh-100 py-5">

            <div className="container">


                {/* Header */}

                <div className="d-flex justify-content-between align-items-center mb-5">

                    <div>

                        <p className="text-success fw-semibold mb-1">
                            YOUR TRAVEL COLLECTION
                        </p>

                        <h1 className="fw-bold mb-2">
                            My Packages
                        </h1>

                        <p className="text-secondary mb-0">
                            Manage the trips you've shared with
                            the WanderWise community.
                        </p>

                    </div>


                    <div className="d-flex gap-2">

                        <Link
                            to="/"
                            className="btn btn-outline-success"
                        >
                            ← Home
                        </Link>


                        <Link
                            to="/create-package"
                            className="btn btn-success"
                        >
                            + Post New Trip
                        </Link>

                    </div>

                </div>


                {/* Error */}

                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}


                {/* No packages */}

                {!error && packages.length === 0 && (

                    <div className="bg-white rounded-4 shadow-sm text-center p-5">

                        <div className="display-4 mb-3">
                            🌍
                        </div>

                        <h3 className="fw-bold">
                            You haven't posted any trips yet
                        </h3>

                        <p className="text-secondary">
                            Share your favorite destination
                            with the WanderWise community.
                        </p>

                        <Link
                            to="/create-package"
                            className="btn btn-success"
                        >
                            Post Your First Trip
                        </Link>

                    </div>

                )}


                {/* Package cards */}

                {packages.length > 0 && (

                    <div className="row g-4">

                        {packages.map((packageData) => (

                            <div
                                className="col-md-6 col-lg-4"
                                key={packageData._id}
                            >

                                <div className="card border-0 shadow-sm h-100 overflow-hidden">


                                    {/* Image */}

                                    <img
                                        src={packageData.image}
                                        alt={packageData.title}
                                        className="card-img-top"
                                        style={{
                                            height: "220px",
                                            objectFit: "cover"
                                        }}
                                    />


                                    <div className="card-body d-flex flex-column">


                                        <p className="text-success small fw-semibold mb-1">
                                            {packageData.destination}
                                        </p>


                                        <h4 className="fw-bold">
                                            {packageData.title}
                                        </h4>


                                        <p className="text-secondary">
                                            {packageData.duration}
                                        </p>


                                        <div className="mt-auto">


                                            <div className="d-flex justify-content-between align-items-center mb-3">

                                                <span className="text-secondary">
                                                    Price
                                                </span>

                                                <strong className="text-success fs-5">
                                                    ₹{packageData.price.toLocaleString("en-IN")}
                                                </strong>

                                            </div>


                                            {/* Action buttons */}

                                            <div className="d-flex gap-2">

                                                <Link
                                                    to={`/packages/${packageData._id}`}
                                                    className="btn btn-outline-success flex-fill"
                                                >
                                                    View
                                                </Link>


                                                <Link
                                                    to={`/edit-package/${packageData._id}`}
                                                    className="btn btn-success flex-fill"
                                                >
                                                    Edit
                                                </Link>


                                                <Link
                                                    to={`/package/${packageData._id}/bookings`}
                                                    className="btn btn-outline-primary flex-fill"
                                                >
                                                    Bookings
                                                </Link>


                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            packageData._id
                                                        )
                                                    }
                                                    className="btn btn-outline-danger flex-fill"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* Delete Confirmation Modal */}

                {showDeleteModal && (

                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        style={{
                            backgroundColor:
                                "rgba(0, 0, 0, 0.5)"
                        }}
                    >

                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content border-0 shadow">


                                {/* Modal Header */}

                                <div className="modal-header">

                                    <h5 className="modal-title fw-bold">
                                        Delete Package
                                    </h5>


                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => {

                                            setShowDeleteModal(false);

                                            setSelectedPackageId(null);

                                        }}
                                        disabled={deleting}
                                    >
                                    </button>

                                </div>


                                {/* Modal Body */}

                                <div className="modal-body">

                                    <p className="mb-0">
                                        Are you sure you want to delete this package?
                                    </p>

                                    <p className="text-secondary small mt-2 mb-0">
                                        This action cannot be undone.
                                    </p>

                                </div>


                                {/* Modal Footer */}

                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {

                                            setShowDeleteModal(false);

                                            setSelectedPackageId(null);

                                        }}
                                        disabled={deleting}
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={handleDelete}
                                        disabled={deleting}
                                    >

                                        {deleting
                                            ? "Deleting..."
                                            : "Delete Package"
                                        }

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );
}

export default MyPackages;