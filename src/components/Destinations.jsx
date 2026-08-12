function Destinations() {

    const destinations = [
        {
            name: "Goa",
            description: "Beaches • Nightlife • Adventure",
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80"
        },
        {
            name: "Manali",
            description: "Mountains • Snow • Adventure",
            image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80"
        },
        {
            name: "Kashmir",
            description: "Lakes • Mountains • Nature",
            image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80"
        },
        {
            name: "Jaipur",
            description: "Culture • Heritage • History",
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80"
        }
    ];

    return (
        <section id="destinations" className="py-5 bg-light">

            <div className="container py-5">

                <div className="text-center mb-5">

                    <p className="section-tag">
                        EXPLORE INDIA
                    </p>

                    <h2 className="section-title display-5">
                        Popular <span>Destinations</span>
                    </h2>

                    <p className="text-secondary">
                        Discover India's most beautiful destinations
                        and start planning your next adventure.
                    </p>

                </div>


                <div className="row g-4">

                    {destinations.map((destination) => (

                        <div
                            className="col-lg-3 col-md-6"
                            key={destination.name}
                        >

                            <div className="destination-card">

                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                />

                                <div className="destination-info">

                                    <h3>
                                        {destination.name}
                                    </h3>

                                    <p className="mb-0">
                                        {destination.description}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Destinations;