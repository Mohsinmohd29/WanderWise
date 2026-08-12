function IncludedFeatures({ included }) {

    return (
        <section>

            <h2 className="fw-bold mb-4">
                What's Included
            </h2>

            <div className="row g-3">

                {included.map((item, index) => (

                    <div
                        className="col-md-6"
                        key={index}
                    >

                        <div className="p-3 bg-light rounded">
                            ✓ {item}
                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default IncludedFeatures;