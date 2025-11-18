const userTypeDefs = `

  type Query {
  getUserById(id: ID!): User
  }
  
  type User {
    id: ID!
    username: String!
    email: String!
    full_name: String!
    bio: String
    profile_pic_url: String
    is_private: Boolean!
    }
  `;

export { userTypeDefs };