import { connectDB } from "./utils/db.utils.js";
import { app } from "./app.js";
import { apolloServer } from "./graphql/apolloServer.js";
import { startStandaloneServer } from "@apollo/server/standalone"

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(
                "Express Server is Running on Port: ",
                process.env.PORT || "3000"
            );
        });
    })

    .then(async () => {
        const { url } = await startStandaloneServer(apolloServer, { listen: { port: process.env.APOLLO_SERVER_PORT } });
        console.log(`Apollo Server Starts At Url: ${url}`);
    })
    
    .catch((err) => console.log(err));
