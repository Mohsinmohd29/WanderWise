function Itinerary({ itinerary }) {

    return (
        <section className="mb-5">

            <h2 className="fw-bold mb-4">
                Trip Itinerary
            </h2>

            <div className="d-flex flex-column gap-3">

                {itinerary.map((item) => (

                    <div
                        key={item._id}
                        className="card border-0 shadow-sm"
                    >

                        <div className="card-body">

                            <div className="d-flex gap-3">

                                <div className="itinerary-day">
                                    {item.day}
                                </div>

                                <div>

                                    <h5 className="fw-bold">
                                        {item.title}
                                    </h5>

                                    <p className="text-secondary mb-0">
                                        {item.description}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default Itinerary;