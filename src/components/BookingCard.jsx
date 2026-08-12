import { useNavigate } from "react-router-dom";

function BookingCard({ packageData }) {

    const navigate = useNavigate();

    const handleBooking = () => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate(`/login?redirect=/booking/${packageData._id}`);
            return;
        }

        navigate(`/booking/${packageData._id}`);
    };

    return (
        <div className="card border-0 shadow booking-card">

            <div className="card-body p-4">

                <p className="text-secondary mb-1">
                    Starting from
                </p>

                <h2 className="fw-bold text-success">
                    ₹{packageData.price.toLocaleString("en-IN")}

                    <small className="text-secondary fs-6">
                        / person
                    </small>
                </h2>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                    <span>Duration</span>

                    <strong>
                        {packageData.duration}
                    </strong>
                </div>

                <div className="d-flex justify-content-between mb-3">
                    <span>Rating</span>

                    <strong>
                        ⭐ {packageData.rating}
                    </strong>
                </div>

                <div className="d-flex justify-content-between mb-4">
                    <span>Available Seats</span>

                    <strong className="text-success">
                        {packageData.availableSeats}
                    </strong>
                </div>

                <button
                    onClick={handleBooking}
                    className="btn btn-success w-100 py-2"
                >
                    Book Now
                </button>

                <p className="text-center text-secondary small mt-3 mb-0">
                    Login required to book this trip.
                </p>

            </div>

        </div>
    );
}

export default BookingCard;