import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import CreatePackage from "./pages/CreatePackage";
import MyPackages from "./pages/MyPackages";
import EditPackage from "./pages/EditPackage";
import PackageBookings from "./pages/PackageBookings";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/packages"
                    element={<Packages />}
                />

                <Route
                    path="/packages/:id"
                    element={<PackageDetails />}
                />

                <Route
                    path="/package/:id/bookings"
                    element={<PackageBookings />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/booking/:id"
                    element={<Booking />}
                />

                <Route
                    path="/bookings"
                    element={<Bookings />}
                />

                <Route
                    path="/create-package"
                    element={<CreatePackage />}
                />

                <Route
                    path="/my-packages"
                    element={<MyPackages />}
                />

                <Route
                    path="/edit-package/:id"
                    element={<EditPackage />}
                />

            </Routes>

            {/* Global Toast Notifications */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="colored"
            />

        </BrowserRouter>
    );
}

export default App;