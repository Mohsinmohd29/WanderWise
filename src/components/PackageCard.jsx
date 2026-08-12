import { Link } from "react-router-dom";

function PackageCard({ packageData }) {

    return (
        <div className="col-lg-3 col-md-6">

            <div className="card package-card h-100 shadow-sm border-0">

                <img
                    src={packageData.image}
                    className="card-img-top package-image"
                    alt={packageData.title}
                />

                <div className="card-body d-flex flex-column">

                    <small className="package-location">
                        📍 {packageData.destination}
                    </small>

                    <h5 className="card-title mt-2">
                        {packageData.title}
                    </h5>

                    <p className="card-text text-secondary small">
                        {packageData.description}
                    </p>

                    <div className="d-flex justify-content-between text-secondary small border-top border-bottom py-3 my-2">

                        <span>
                            🕒 {packageData.duration}
                        </span>

                        <span>
                            ⭐ {packageData.rating}
                        </span>

                    </div>

                    <div className="d-flex justify-content-between align-items-end mt-auto">

                        <div>

                            <small className="text-secondary d-block">
                                Starting from
                            </small>

                            <span className="package-price fs-5">
                                ₹{packageData.price.toLocaleString("en-IN")}
                            </span>

                        </div>

                        <Link
                            to={`/packages/${packageData._id}`}
                            className="btn btn-dark btn-sm"
                        >
                            View Trip
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default PackageCard;