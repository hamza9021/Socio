import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Form, Spinner } from "../../Components";
import User from "../../Apis/User/User.Apis";
import { useDispatch } from "react-redux";
import { login } from "../../features/user/userSlice";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            const response = await User.loginUser(formData);
            if (response) {
                const userInfo = response.data?.data;
                dispatch(login(userInfo));
                navigate("/");
            }
        } catch (error) {
            console.log("Login error: ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Login Account</h1>
            <Form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
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
                    {isLoading ? <Spinner loading={isLoading} size={32} color={"red"} /> : "Login"}
                </Button>
            </Form>
            <p className="mt-4 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                    Register here
                </Link>
            </p>
        </div>
    )
}

export default LoginPage;