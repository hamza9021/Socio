import { useSelector } from 'react-redux';

const HomePage = () => {
    const user = useSelector((state) => state.user);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {user.isAuthenticated ? (
                <div>
                    <p>{user.userInfo.full_name}</p>
                    <p>{user.userInfo.email}</p>
                </div>
            ) : null}
        </div>
    );
};

export default HomePage;