import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Form, Spinner } from "../../Components";
import User from "../../Apis/User/User.Apis";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        email: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChanges = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await User.registerUser(formData);
            if (response.status === 201) {
                navigate("/login");
            } else {
                console.log("Registration failed: ", response.data);
            }
        } catch (error) {
            console.log("Registration error: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
            <Form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <Input
                    placeholder="Full Name"
                    id="full_name"
                    name="full_name"
                    onChange={handleInputChanges}
                    autocomplete="name"
                    required
                />
                <Input
                    placeholder="Username"
                    name="username"
                    id="username"
                    onChange={handleInputChanges}
                    autocomplete="username"
                    required
                />
                <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleInputChanges}
                    autocomplete="email"
                    required
                />
                <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    id="password"
                    onChange={handleInputChanges}
                    autocomplete="new-password"
                    required
                />
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isLoading ? <Spinner loading={isLoading} size={32} color={"red"} /> : "Register"}
                </Button>
            </Form>

            <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                    Login here
                </Link>
            </p>
        </div>
    )
}

export default RegisterPage;