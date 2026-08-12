import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import AuthForm from "../components/auth/AuthForm";
import { registerUser } from "../services/api";

function Register() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleRegister = async (formData) => {

        try {

            setLoading(true);
            setError("");

            const data = await registerUser(formData);

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            // Success notification
            toast.success(
                "Account created successfully! 🎉"
            );


            const redirect =
                searchParams.get("redirect");

            navigate(redirect || "/");

        } catch (error) {

            setError(error.message);

            // Error notification
            toast.error(
                error.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="auth-page">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-md-6 col-lg-5">

                        <div className="card border-0 shadow auth-card">

                            <div className="card-body p-4 p-md-5">

                                <div className="text-center mb-4">

                                    <h2 className="fw-bold">
                                        Create Your Account
                                    </h2>

                                    <p className="text-secondary">
                                        Start planning your next adventure.
                                    </p>

                                </div>


                                {error && (

                                    <div className="alert alert-danger">
                                        {error}
                                    </div>

                                )}


                                <AuthForm
                                    type="register"
                                    onSubmit={handleRegister}
                                    loading={loading}
                                />


                                <div className="text-center mt-4">

                                    <span className="text-secondary">
                                        Already have an account?
                                    </span>{" "}

                                    <Link
                                        to="/login"
                                        className="text-success fw-semibold"
                                    >
                                        Login
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;