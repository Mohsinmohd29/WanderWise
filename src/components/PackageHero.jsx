function PackageHero({ packageData }) {

    return (
        <section className="package-details-hero">

            <img
                src={packageData.image}
                alt={packageData.title}
            />

            <div className="package-details-overlay"></div>

            <div className="container">

                <div className="package-details-hero-content">

                    <p>
                        📍 {packageData.destination}
                    </p>

                    <h1>
                        {packageData.title}
                    </h1>

                    <div className="d-flex flex-wrap gap-3">

                        <span>
                            🕒 {packageData.duration}
                        </span>

                        <span>
                            ⭐ {packageData.rating}
                        </span>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default PackageHero;