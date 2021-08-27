import { gql } from "@apollo/client";

export const SERIES_FRAGMENT = gql`
    fragment SeriesParts on Series {
        id
        name
        thumbnail
        description
        view
        like
    }
`