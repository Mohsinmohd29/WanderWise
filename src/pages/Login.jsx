import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import AuthForm from "../components/auth/AuthForm";
import { loginUser } from "../services/api";

function Login() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleLogin = async (formData) => {

        try {

            setLoading(true);
            setError("");

            const data = await loginUser(formData);

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );


            // Success toast
            toast.success("Logged in successfully! 🎉");


            const redirect = searchParams.get("redirect");

            navigate(redirect || "/");

        } catch (error) {

            setError(error.message);

            // Error toast
            toast.error(error.message || "Login failed");

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="min-vh-100 bg-light d-flex align-items-center py-5">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-md-6 col-lg-5">

                        <div className="card border-0 shadow rounded-4">

                            <div className="card-body p-4 p-md-5">

                                <div className="text-center mb-4">

                                    <h2 className="fw-bold">
                                        Welcome Back
                                    </h2>

                                    <p className="text-secondary">
                                        Login to continue your journey.
                                    </p>

                                </div>


                                {error && (

                                    <div className="alert alert-danger">
                                        {error}
                                    </div>

                                )}


                                <AuthForm
                                    type="login"
                                    onSubmit={handleLogin}
                                    loading={loading}
                                />


                                <div className="text-center mt-4">

                                    <span className="text-secondary">
                                        Don't have an account?
                                    </span>{" "}

                                    <Link
                                        to={`/register?redirect=${encodeURIComponent(
                                            searchParams.get("redirect") || "/"
                                        )}`}
                                    >
                                        Sign Up
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

export default Login;