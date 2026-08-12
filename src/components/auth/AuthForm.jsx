import { useState } from "react";

function AuthForm({ type, onSubmit, loading }) {

    const isRegister = type === "register";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(formData);

    };


    return (
        <form onSubmit={handleSubmit}>

            {isRegister && (

                <div className="mb-3">

                    <label className="form-label">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter your name"
                        required
                    />

                </div>

            )}


            <div className="mb-3">

                <label className="form-label">
                    Email Address
                </label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                    required
                />

            </div>


            <div className="mb-4">

                <label className="form-label">
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your password"
                    minLength="6"
                    required
                />

            </div>


            <button
                type="submit"
                className="btn btn-success w-100 py-2"
                disabled={loading}
            >

                {loading
                    ? "Please wait..."
                    : isRegister
                        ? "Create Account"
                        : "Login"
                }

            </button>

        </form>
    );
}

export default AuthForm;