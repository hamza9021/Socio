import { useSelector } from 'react-redux';
import Button from "../Components/Button"
import User from "../Apis/User/User.Apis"
import { logout } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';



import { useQuery } from "@apollo/client/react";
import { GET_USER_BY_ID } from "../graphql/queries/user.graphql.js";


const HomePage = () => {
    // const user = useSelector((state) => state.user);
    // const dispatch = useDispatch();

    // const handleLogout = async () => {
    //     const response = await User.logoutUser();
    //     console.log("Logout response: ", response);
    //     if (response) {
    //         dispatch(logout());
    //     }
    // }




    const { data: userDataById, loading: userLoadingById, error: userErrorById } = useQuery(GET_USER_BY_ID, {
        variables: { id: "69185b9251e9cf84b0155404" }
    });
    if (userLoadingById) return <p>Loading...</p>;
    if (userErrorById) return <p>Error: {userErrorById.message}</p>;
    console.log("User Data By ID: ", userDataById.getUserById);
    return (
        // <div>
        //     <h1>Welcome to the Home Page</h1>
        //     {user.isAuthenticated ? (
        //         <div>
        //             <p>{user.userInfo.full_name}</p>
        //             <p>{user.userInfo.email}</p>
        //         </div>
        //     ) : null}
        //     <Button onClick={handleLogout} className={"w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"}>LOGOUT</Button>
        // </div>

        <div>
            {
                <p>{userDataById.getUserById.email}</p>
            }
        </div>
    );
};

export default HomePage;