const API_URL = "http://localhost:5000/api";

export const getPackages = async () => {
    const response = await fetch(`${API_URL}/packages`);

    if (!response.ok) {
        throw new Error("Failed to fetch packages");
    }

    return response.json();
};

export const getPackageById = async (id) => {
    const response = await fetch(`${API_URL}/packages/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch package");
    }

    return response.json();
};

export const registerUser = async (userData) => {

    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Registration failed");
    }

    return data;
};


export const loginUser = async (userData) => {

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
};

export const createBooking = async (bookingData) => {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(bookingData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Booking failed");
    }

    return data;
};

export const createPackage = async (packageData) => {

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("title", packageData.title);
    formData.append("destination", packageData.destination);
    formData.append("description", packageData.description);
    formData.append("price", packageData.price);
    formData.append("duration", packageData.duration);
    formData.append("availableSeats", packageData.availableSeats);
    formData.append(
        "itinerary",
        JSON.stringify(packageData.itinerary)
    );
    
    formData.append(
        "included",
        JSON.stringify(packageData.included)
    );
    formData.append("image", packageData.image);


    const response = await fetch(`${API_URL}/packages`, {
        method: "POST",

        headers: {
            Authorization: `Bearer ${token}`
        },

        body: formData
    });


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to create package"
        );

    }


    return data;
};

export const getMyPackages = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/packages/my`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message || "Failed to fetch your packages"
        );

    }

    return data;
};

export const updatePackage = async (id, packageData) => {

    const token = localStorage.getItem("token");

    const formData = new FormData();


    formData.append("title", packageData.title);

    formData.append(
        "destination",
        packageData.destination
    );

    formData.append(
        "description",
        packageData.description
    );

    formData.append(
        "price",
        packageData.price
    );

    formData.append(
        "duration",
        packageData.duration
    );

    formData.append(
        "availableSeats",
        packageData.availableSeats
    );


    formData.append(
        "itinerary",
        JSON.stringify(packageData.itinerary)
    );


    formData.append(
        "included",
        JSON.stringify(packageData.included)
    );


    // Only append image if user selected a new one
    if (packageData.image) {

        formData.append(
            "image",
            packageData.image
        );

    }


    const response = await fetch(
        `${API_URL}/packages/${id}`,
        {
            method: "PUT",

            headers: {
                Authorization: `Bearer ${token}`
            },

            body: formData
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to update package"
        );

    }


    return data;
};

export const deletePackage = async (id) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/packages/${id}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message || "Failed to delete package"
        );

    }

    return data;
};

export const getMyBookings = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/bookings/my`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch bookings"
        );
    }

    return data;
};

export const getPackageBookings = async (packageId) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/bookings/package/${packageId}`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );


    const data = await response.json();


    if (!response.ok) {

        throw new Error(
            data.message || "Failed to fetch package bookings"
        );

    }


    return data;
};