import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero-section">

            <div className="hero-overlay"></div>

            <div className="container hero-container">

                <div className="row align-items-center">

                    <div className="col-lg-7">

                        <p className="hero-tag">
                            ✦ DISCOVER • EXPLORE • EXPERIENCE
                        </p>

                        <h1 className="hero-title">
                            Your Journey
                            <span>Begins Here.</span>
                        </h1>

                        <p className="hero-description">
                            Discover breathtaking destinations, explore
                            unforgettable experiences and create memories
                            that last a lifetime.
                        </p>

                        <div className="d-flex flex-wrap gap-3">

                            <Link
                                to="/packages"
                                className="btn hero-primary-btn"
                            >
                                Explore Packages
                                <span> →</span>
                            </Link>

                            <a
                                href="#destinations"
                                className="btn hero-secondary-btn"
                            >
                                Discover Destinations
                            </a>

                        </div>

                    </div>

                </div>

            </div>

            <div className="hero-scroll">
                <span>↓</span> Scroll to explore
            </div>

        </section>
    );
}

export default Hero;