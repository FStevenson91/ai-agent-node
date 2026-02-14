export const typeDefs = `#graphql

  type Message {
    role: String!
    content: String!
    timestamp: String
  }

  type Session {
    id: ID!
    messages: [Message!]!
    createdAt: String
  }

  type AgentResponse {
    sessionId: String!
    response: String!
  }

  type Query {
    sessions: [Session!]!
    session(id: ID!): Session
  }

  type Mutation {
    chat(sessionId: String!, message: String!): AgentResponse!
  }
`;