import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
    getPackageById,
    updatePackage
} from "../services/api";


function EditPackage() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        title: "",
        destination: "",
        description: "",
        price: "",
        duration: "",
        availableSeats: "",

        image: null,

        itinerary: [],

        included: []

    });


    const [currentImage, setCurrentImage] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");


    // ================= LOAD PACKAGE =================

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {

            navigate(
                `/login?redirect=/edit-package/${id}`
            );

            return;
        }


        const fetchPackage = async () => {

            try {

                const data =
                    await getPackageById(id);


                // Security check on frontend
                if (
                    !data.owner ||
                    data.owner._id !==
                    JSON.parse(
                        atob(
                            token.split(".")[1]
                        )
                    ).id
                ) {

                    const message =
                        "You are not allowed to edit this package.";

                    setError(message);
                    toast.error(message);

                    return;
                }


                setFormData({

                    title: data.title || "",

                    destination:
                        data.destination || "",

                    description:
                        data.description || "",

                    price:
                        data.price || "",

                    duration:
                        data.duration || "",

                    availableSeats:
                        data.availableSeats || "",

                    image: null,

                    itinerary:
                        data.itinerary || [],

                    included:
                        data.included || []

                });


                setCurrentImage(
                    data.image || ""
                );


            } catch (error) {

                const message =
                    error.message ||
                    "Failed to load package.";

                setError(message);
                toast.error(message);

            } finally {

                setLoading(false);

            }

        };


        fetchPackage();

    }, [id, navigate]);


    // ================= BASIC INPUTS =================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };


    // ================= IMAGE =================

    const handleImageChange = (e) => {

        setFormData({

            ...formData,

            image: e.target.files[0]

        });

    };


    // ================= ITINERARY =================

    const handleItineraryChange = (
        index,
        field,
        value
    ) => {

        const updated =
            [...formData.itinerary];


        updated[index][field] = value;


        setFormData({

            ...formData,

            itinerary: updated

        });

    };


    const addItineraryDay = () => {

        setFormData({

            ...formData,

            itinerary: [

                ...formData.itinerary,

                {
                    day:
                        `Day ${formData.itinerary.length + 1}`,

                    title: "",

                    description: ""
                }

            ]

        });

    };


    const removeItineraryDay = (index) => {

        if (
            formData.itinerary.length <= 1
        ) {

            return;

        }


        const updated =
            formData.itinerary.filter(
                (_, i) => i !== index
            );


        const reordered =
            updated.map((item, i) => ({

                ...item,

                day: `Day ${i + 1}`

            }));


        setFormData({

            ...formData,

            itinerary: reordered

        });

    };


    // ================= INCLUDED =================

    const handleIncludedChange = (
        index,
        value
    ) => {

        const updated =
            [...formData.included];


        updated[index] = value;


        setFormData({

            ...formData,

            included: updated

        });

    };


    const addIncludedFeature = () => {

        setFormData({

            ...formData,

            included: [

                ...formData.included,

                ""

            ]

        });

    };


    const removeIncludedFeature = (
        index
    ) => {

        if (
            formData.included.length <= 1
        ) {

            return;

        }


        const updated =
            formData.included.filter(
                (_, i) => i !== index
            );


        setFormData({

            ...formData,

            included: updated

        });

    };


    // ================= SUBMIT =================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        try {

            setSaving(true);


            const validIncluded =
                formData.included.filter(
                    item => item.trim() !== ""
                );


            if (
                formData.itinerary.length === 0
            ) {

                throw new Error(
                    "At least one itinerary day is required."
                );

            }


            const invalidItinerary =
                formData.itinerary.some(
                    item =>
                        !item.title.trim() ||
                        !item.description.trim()
                );


            if (invalidItinerary) {

                throw new Error(
                    "Please complete all itinerary days."
                );

            }


            if (
                validIncluded.length === 0
            ) {

                throw new Error(
                    "Please add at least one included feature."
                );

            }


            await updatePackage(
                id,
                {
                    ...formData,

                    included:
                        validIncluded,

                    price:
                        Number(formData.price),

                    availableSeats:
                        Number(
                            formData.availableSeats
                        )
                }
            );


            // Success toast
            toast.success(
                "Package updated successfully! ✨"
            );


            navigate(
                `/packages/${id}`
            );


        } catch (error) {

            const message =
                error.message ||
                "Failed to update package.";

            setError(message);

            toast.error(message);

        } finally {

            setSaving(false);

        }

    };


    // ================= LOADING =================

    if (loading) {

        return (

            <div className="container text-center py-5">

                <div
                    className="spinner-border text-success"
                    role="status"
                />

                <p className="text-secondary mt-3">
                    Loading package...
                </p>

            </div>

        );

    }


    // ================= ERROR =================

    if (error) {

        return (

            <div className="container text-center py-5">

                <h3 className="fw-bold">
                    Unable to edit package
                </h3>

                <p className="text-danger">
                    {error}
                </p>

                <button
                    onClick={() =>
                        navigate("/my-packages")
                    }
                    className="btn btn-success"
                >
                    Back to My Packages
                </button>

            </div>

        );

    }


    return (

        <div className="bg-light min-vh-100 py-5">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-8">


                        {/* HEADER */}

                        <div className="text-center mb-5">

                            <p className="text-success fw-semibold">
                                MANAGE YOUR TRIP
                            </p>

                            <h1 className="fw-bold">
                                Edit Package
                            </h1>

                            <p className="text-secondary">
                                Update your tour package details.
                            </p>

                        </div>


                        <div className="bg-white rounded-4 shadow p-4 p-md-5">


                            {error && (

                                <div className="alert alert-danger">
                                    {error}
                                </div>

                            )}


                            <form onSubmit={handleSubmit}>


                                {/* BASIC DETAILS */}

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Package Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />

                                </div>


                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Destination
                                    </label>

                                    <input
                                        type="text"
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />

                                </div>


                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="form-control"
                                        rows="5"
                                        required
                                    />

                                </div>


                                <div className="row">

                                    <div className="col-md-6 mb-4">

                                        <label className="form-label fw-semibold">
                                            Price per person
                                        </label>

                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="form-control"
                                            min="1"
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6 mb-4">

                                        <label className="form-label fw-semibold">
                                            Duration
                                        </label>

                                        <input
                                            type="text"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />

                                    </div>

                                </div>


                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        Available Seats
                                    </label>

                                    <input
                                        type="number"
                                        name="availableSeats"
                                        value={formData.availableSeats}
                                        onChange={handleChange}
                                        className="form-control"
                                        min="1"
                                        required
                                    />

                                </div>


                                {/* CURRENT IMAGE */}

                                {currentImage && (

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Current Image
                                        </label>

                                        <img
                                            src={currentImage}
                                            alt={formData.title}
                                            className="img-fluid rounded-3 mb-3"
                                            style={{
                                                maxHeight: "250px",
                                                width: "100%",
                                                objectFit: "cover"
                                            }}
                                        />

                                    </div>

                                )}


                                {/* NEW IMAGE */}

                                <div className="mb-5">

                                    <label className="form-label fw-semibold">
                                        Change Image
                                    </label>

                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="form-control"
                                    />

                                    <small className="text-secondary">
                                        Leave empty to keep the current image.
                                    </small>

                                </div>


                                {/* ITINERARY */}

                                <div className="mb-5">

                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <h4 className="fw-bold mb-0">
                                            Trip Itinerary
                                        </h4>

                                        <button
                                            type="button"
                                            onClick={addItineraryDay}
                                            className="btn btn-outline-success"
                                        >
                                            + Add Day
                                        </button>

                                    </div>


                                    {formData.itinerary.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="border rounded-3 p-4 mb-3"
                                            >

                                                <div className="d-flex justify-content-between align-items-center mb-3">

                                                    <h5 className="fw-bold mb-0">
                                                        {item.day}
                                                    </h5>


                                                    {formData.itinerary.length > 1 && (

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeItineraryDay(index)
                                                            }
                                                            className="btn btn-sm btn-outline-danger"
                                                        >
                                                            Remove
                                                        </button>

                                                    )}

                                                </div>


                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) =>
                                                        handleItineraryChange(
                                                            index,
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="form-control mb-3"
                                                    placeholder="Day title"
                                                    required
                                                />


                                                <textarea
                                                    value={item.description}
                                                    onChange={(e) =>
                                                        handleItineraryChange(
                                                            index,
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="form-control"
                                                    rows="3"
                                                    placeholder="Day description"
                                                    required
                                                />

                                            </div>

                                        )
                                    )}

                                </div>


                                {/* INCLUDED */}

                                <div className="mb-5">

                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <h4 className="fw-bold mb-0">
                                            What's Included
                                        </h4>

                                        <button
                                            type="button"
                                            onClick={addIncludedFeature}
                                            className="btn btn-outline-success"
                                        >
                                            + Add Feature
                                        </button>

                                    </div>


                                    {formData.included.map(
                                        (feature, index) => (

                                            <div
                                                key={index}
                                                className="input-group mb-3"
                                            >

                                                <span className="input-group-text">
                                                    ✓
                                                </span>


                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={(e) =>
                                                        handleIncludedChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="form-control"
                                                    placeholder="e.g. Hotel accommodation"
                                                />


                                                {formData.included.length > 1 && (

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeIncludedFeature(index)
                                                        }
                                                        className="btn btn-outline-danger"
                                                    >
                                                        Remove
                                                    </button>

                                                )}

                                            </div>

                                        )
                                    )}

                                </div>


                                {/* SAVE */}

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="btn btn-success w-100 py-3 fw-semibold"
                                >

                                    {saving
                                        ? "Saving Changes..."
                                        : "Save Changes"
                                    }

                                </button>


                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EditPackage;