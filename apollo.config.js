module.exports = {
    client: {
        includes: ["./pages/**/*.tsx","./fragments.ts"],
        tagName: "gql",
        service: {
            name: 'seokkao-page',
            url: "http://localhost:5000/graphql",
        }
    }
}