import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createPackage } from "../services/api";

function CreatePackage() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        title: "",
        destination: "",
        description: "",
        price: "",
        duration: "",
        availableSeats: "",
        image: null,

        itinerary: [
            {
                day: "Day 1",
                title: "",
                description: ""
            }
        ],

        included: [
            ""
        ]

    });


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // ================= BASIC FORM =================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // ================= IMAGE =================

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        setFormData({
            ...formData,
            image: file
        });

    };


    // ================= ITINERARY =================

    const handleItineraryChange = (index, field, value) => {

        const updatedItinerary = [...formData.itinerary];

        updatedItinerary[index][field] = value;

        setFormData({
            ...formData,
            itinerary: updatedItinerary
        });

    };


    const addItineraryDay = () => {

        const newDayNumber =
            formData.itinerary.length + 1;

        setFormData({

            ...formData,

            itinerary: [
                ...formData.itinerary,

                {
                    day: `Day ${newDayNumber}`,
                    title: "",
                    description: ""
                }
            ]

        });

    };


    const removeItineraryDay = (index) => {

        if (formData.itinerary.length === 1) {
            return;
        }


        const updatedItinerary =
            formData.itinerary.filter(
                (_, i) => i !== index
            );


        const reorderedItinerary =
            updatedItinerary.map((item, i) => ({
                ...item,
                day: `Day ${i + 1}`
            }));


        setFormData({

            ...formData,

            itinerary: reorderedItinerary

        });

    };


    // ================= INCLUDED =================

    const handleIncludedChange = (index, value) => {

        const updatedIncluded = [
            ...formData.included
        ];

        updatedIncluded[index] = value;

        setFormData({

            ...formData,

            included: updatedIncluded

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


    const removeIncludedFeature = (index) => {

        if (formData.included.length === 1) {
            return;
        }


        const updatedIncluded =
            formData.included.filter(
                (_, i) => i !== index
            );


        setFormData({

            ...formData,

            included: updatedIncluded

        });

    };


    // ================= SUBMIT =================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        // Check itinerary

        const invalidItinerary =
            formData.itinerary.some(
                (item) =>
                    !item.title.trim() ||
                    !item.description.trim()
            );


        if (invalidItinerary) {

            const message =
                "Please complete all itinerary days.";

            setError(message);
            toast.warning(message);

            return;

        }


        // Check included features

        const validIncluded =
            formData.included.filter(
                (item) => item.trim() !== ""
            );


        if (validIncluded.length === 0) {

            const message =
                "Please add at least one included feature.";

            setError(message);
            toast.warning(message);

            return;

        }


        try {

            setLoading(true);


            const packageData = {

                ...formData,

                included: validIncluded,

                price: Number(formData.price),

                availableSeats:
                    Number(formData.availableSeats)

            };


            await createPackage(packageData);


            toast.success(
                "Package created successfully! 🎉"
            );


            navigate("/packages");

        } catch (error) {

            setError(error.message);

            toast.error(
                error.message ||
                "Failed to create package"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="bg-light min-vh-100 py-5">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-8">


                        {/* ================= HEADER ================= */}

                        <div className="text-center mb-5">

                            <p className="text-success fw-semibold">
                                SHARE YOUR JOURNEY
                            </p>

                            <h1 className="fw-bold">
                                Post Your Trip
                            </h1>

                            <p className="text-secondary">
                                Share your favorite destination
                                with the WanderWise community.
                            </p>

                        </div>


                        {/* ================= FORM ================= */}

                        <div className="bg-white rounded-4 shadow p-4 p-md-5">

                            {error && (

                                <div className="alert alert-danger">
                                    {error}
                                </div>

                            )}


                            <form onSubmit={handleSubmit}>


                                {/* TITLE */}

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
                                        placeholder="e.g. Manali Mountain Adventure"
                                        required
                                    />

                                </div>


                                {/* DESTINATION */}

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
                                        placeholder="e.g. Manali, Himachal Pradesh"
                                        required
                                    />

                                </div>


                                {/* DESCRIPTION */}

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
                                        placeholder="Describe your trip..."
                                        required
                                    />

                                </div>


                                {/* PRICE + DURATION */}

                                <div className="row">

                                    <div className="col-md-6 mb-4">

                                        <label className="form-label fw-semibold">
                                            Price per person (₹)
                                        </label>

                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="form-control"
                                            min="1"
                                            placeholder="12999"
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
                                            placeholder="5 Days / 4 Nights"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* AVAILABLE SEATS */}

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
                                        placeholder="20"
                                        required
                                    />

                                </div>


                                {/* IMAGE */}

                                <div className="mb-5">

                                    <label className="form-label fw-semibold">
                                        Package Image
                                    </label>

                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="form-control"
                                        required
                                    />

                                    <small className="text-secondary">
                                        Upload a JPG, PNG or WebP image.
                                    </small>

                                </div>


                                {/* ================= ITINERARY ================= */}

                                <div className="mb-5">

                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <div>

                                            <h4 className="fw-bold mb-1">
                                                Trip Itinerary
                                            </h4>

                                            <p className="text-secondary mb-0">
                                                Add activities for each day.
                                            </p>

                                        </div>


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


                                                <div className="mb-3">

                                                    <label className="form-label">
                                                        Day Title
                                                    </label>

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
                                                        className="form-control"
                                                        placeholder="e.g. Arrival in Manali"
                                                        required
                                                    />

                                                </div>


                                                <div>

                                                    <label className="form-label">
                                                        Description
                                                    </label>

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
                                                        placeholder="What will travelers do on this day?"
                                                        required
                                                    />

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>


                                {/* ================= INCLUDED ================= */}

                                <div className="mb-5">

                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <div>

                                            <h4 className="fw-bold mb-1">
                                                What's Included
                                            </h4>

                                            <p className="text-secondary mb-0">
                                                Add everything included in the package.
                                            </p>

                                        </div>


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


                                {/* ================= SUBMIT ================= */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-success w-100 py-3 fw-semibold"
                                >

                                    {loading
                                        ? "Publishing..."
                                        : "Publish Package"
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

export default CreatePackage;