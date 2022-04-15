import { gql } from "apollo-server";

export const typeDefs = gql`
  type RankedPlayer {
    id: ID!
    rank: Int!
    name: String!
    points: Float!
  }

  type Query {
    rankedPlayers: [RankedPlayer]
  }

  type RegisterMatchScoreResponse {
    winningPlayer: RankedPlayer!
    lostPlayer: RankedPlayer!
  }

  type Mutation {
    registerMatchScore(
      winningPlayerId: ID!
      lostPlayerId: ID!
    ): RegisterMatchScoreResponse!

    addPlayer(name: String!): RankedPlayer!

    login(username: String!, password: String!): String!
  }
`;
