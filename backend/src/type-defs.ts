import { gql } from "apollo-server";

export const typeDefs = gql`
  type Player {
    id: ID!
    name: String!
    points: Int!
  }

  type Query {
    players: [Player]
  }
`;
