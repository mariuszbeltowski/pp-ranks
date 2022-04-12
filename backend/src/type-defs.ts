import { gql } from "apollo-server";

export const typeDefs = gql`
  type Player {
    id: ID!
    rank: Int!
    name: String!
    points: Float!
  }

  type Query {
    players: [Player]
  }

  type RegisterMatchScoreResponse {
    winningPlayer: Player!
    lostPlayer: Player!
  }

  type Mutation {
    registerMatchScore(
      winningPlayerId: ID!
      lostPlayerId: ID!
    ): RegisterMatchScoreResponse!

    addPlayer(name: String!): Player!
  }
`;
