import gql from 'graphql-tag'
import { Stop } from '../schema-types'

// export const DELETE_RESOURCE_FILE = gql`
//     mutation($where: ResourceWhereUniqueInput!) {
//         deleteResourceFile(where: $where) {
//             id
//             fileElem {
//                 id
//             }
//         }
//     }
// `
// export interface DeleteResourceFileMutationResponse {
//     deleteResourceFile: Resource
//     loading: boolean
// }

// export const ALL_PRESENTATIONS_QUERY = gql`
//     query allPresentationsQuery($first: Int, $skip: Int, $orderBy: PresentationOrderByInput) {
//         presentations(first: $first, skip: $skip, orderBy: $orderBy) {
//             id
//             title
//             private
//             users {
//                 id
//                 name
//             }
//             slides {
//                 id
//             }
//         }
//         presentationsConnection {
//             aggregate {
//                 count
//             }
//         }
//     }
// `
// export interface AllPresentationQueryResponse {
//     presentations: Presentation[]
//     presentationsConnection: PresentationConnection
//     loading: boolean
// }

// export const NEW_PRESENTATION_SUBSCRIPTION = gql`
//     subscription {
//         presentation(where: { mutation_in: CREATED }) {
//             node {
//                 id
//                 title
//                 private
//                 users {
//                     id
//                     name
//                 }
//             }
//         }
//     }
// `

// export interface NewPresentationSubcriptionResponse {
//     node: Presentation
// }

export const STOPS_QUERY = gql`
    query stops {
        stops {
            id
            groupId
            name
        }
    }
`
export interface StopsQueryResponse {
    stops: Stop[]
    loading: boolean
}

export const STOPS_WITH_DEPARTURES_QUERY = gql`
    query stops($where: StopsWithDeparturesWhereInput!) {
        stopsWithDepartures(where: $where) {
            id
            name
            groupId
            columnId
            lnt
            lat
            departures {
                line
                direction
                status
            }
        }
    }
`
export interface StopsWithDeparturesQueryResponse {
    stopsWithDepartures: Stop[]
    loading: boolean
}
