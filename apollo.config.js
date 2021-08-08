module.exports = {
    client: {
        includes: ["./pages/**/*.tsx"],
        tagName: "gql",
        service: {
            name: 'seokkao-page',
            url: "http://localhost:5000/graphql",
        }
    }
}