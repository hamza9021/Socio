import { User } from "../../Models/user.models.js"
import { ApiError } from "../../Utils/error.utils.js"


const userResolvers = {
    Query: {
        getUserById: async (parent, args) => {
            const { id } = args;
            const user = await User.findById(id);
            if (!user) {
                throw new ApiError(404, "User not found");
            }
            return user;
        }
    }
}



export { userResolvers };