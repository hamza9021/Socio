import { ClipLoader } from "react-spinners";


const Spinner = ({ loading, size = 35, color = "#2563eb" }) => {
    return (
        <div className="flex justify-center items-center">
            <ClipLoader
                loading={loading}
                size={size}
                color={color}
            />
        </div>
    );
}   

export default Spinner;