import { gql } from "@apollo/client";

export const getReportEq = gql`
  query GetEqReports($dateTime: String, $coordinates: String) {
    getEqReports(dateTime: $dateTime, coordinates: $coordinates) {
      id
      status
      description
      photoUrl
      coordinate
      User {
        email
      }
    }
  }
`;

export const createReportEq = gql`
  mutation CreateEqReports($data: NewEqReport) {
    createEqReports(data: $data) {
      message
    }
  }
`;
