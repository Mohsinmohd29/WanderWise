function AboutSection() {

    return (

        <section
            id="about"
            className="py-5 bg-white"
        >

            <div className="container py-5">

                <div className="row align-items-center g-5">

                    {/* Text */}

                    <div className="col-lg-6">

                        <p className="text-success fw-semibold mb-2">
                            ABOUT WANDERWISE
                        </p>

                        <h2 className="display-5 fw-bold mb-4">
                            Travel Smarter.
                            <br />
                            Travel Together.
                        </h2>

                        <p className="text-secondary lh-lg">
                            WanderWise is a community-driven travel
                            platform where travelers can discover
                            amazing destinations, explore carefully
                            planned trips and share their own travel
                            experiences.
                        </p>

                        <p className="text-secondary lh-lg">
                            Whether you're planning your next adventure
                            or want to share a trip with others,
                            WanderWise makes discovering and planning
                            travel simple.
                        </p>


                        {/* Small highlights */}

                        <div className="row mt-4">

                            <div className="col-sm-6 mb-3">

                                <h5 className="fw-bold text-success">
                                    🌍 Explore
                                </h5>

                                <p className="text-secondary mb-0">
                                    Discover amazing destinations.
                                </p>

                            </div>


                            <div className="col-sm-6 mb-3">

                                <h5 className="fw-bold text-success">
                                    ✈️ Experience
                                </h5>

                                <p className="text-secondary mb-0">
                                    Create unforgettable memories.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Image */}

                    <div className="col-lg-6">

                        <div className="position-relative">

                            <img
                                src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80"
                                alt="Beautiful travel destination"
                                className="img-fluid rounded-4 shadow-lg w-100"
                                style={{
                                    height: "450px",
                                    objectFit: "cover"
                                }}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default AboutSection;