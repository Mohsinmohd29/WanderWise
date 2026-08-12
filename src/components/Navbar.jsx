import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Navbar() {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const [scrolled, setScrolled] = useState(false);


    useEffect(() => {

        const handleScroll = () => {

            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

        };


        window.addEventListener(
            "scroll",
            handleScroll
        );


        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );

        };

    }, []);


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsLoggedIn(false);

        toast.success(
            "Logged out successfully! 👋"
        );

        navigate("/");

    };


    return (

        <nav
            className={`navbar navbar-expand-lg fixed-top ${
                scrolled
                    ? "navbar-scrolled"
                    : "navbar-transparent"
            }`}
        >

            <div className="container">


                {/* Logo */}

                <Link
                    className="navbar-brand fw-bold fs-4"
                    to="/"
                >

                    <span className="brand-icon">
                        ✈
                    </span>

                    WanderWise

                </Link>


                {/* Mobile menu */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>


                {/* Navigation */}

                <div
                    className="collapse navbar-collapse"
                    id="mainNavbar"
                >

                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">


                        {/* Destinations */}

                        <li className="nav-item">

                            <a
                                className="nav-link"
                                href="/#destinations"
                            >
                                Destinations
                            </a>

                        </li>


                        {/* Packages */}

                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/packages"
                            >
                                Packages
                            </Link>

                        </li>


                        {/* About */}

                        <li className="nav-item">

                            <a
                                className="nav-link"
                                href="/#about"
                            >
                                About
                            </a>

                        </li>


                        {/* Post Your Trip */}

                        {isLoggedIn && (

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/create-package"
                                >
                                    Post Your Trip
                                </Link>

                            </li>

                        )}


                        {/* My Packages */}

                        {isLoggedIn && (

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/my-packages"
                                >
                                    My Packages
                                </Link>

                            </li>

                        )}


                        {/* My Bookings */}

                        {isLoggedIn && (

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/bookings"
                                >
                                    My Bookings
                                </Link>

                            </li>

                        )}

                    </ul>


                    {/* Authentication */}

                    <div className="d-flex gap-2">

                        {isLoggedIn ? (

                            <button
                                onClick={handleLogout}
                                className={`btn ${
                                    scrolled
                                        ? "btn-outline-dark"
                                        : "btn-outline-light"
                                }`}
                            >
                                Logout
                            </button>

                        ) : (

                            <>

                                <Link
                                    to="/login"
                                    className={`btn ${
                                        scrolled
                                            ? "btn-outline-dark"
                                            : "btn-outline-light"
                                    }`}
                                >
                                    Login
                                </Link>


                                <Link
                                    to="/register"
                                    className={`btn ${
                                        scrolled
                                            ? "btn-outline-dark"
                                            : "btn-outline-light"
                                    }`}
                                >
                                    Sign Up
                                </Link>

                            </>

                        )}

                    </div>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;