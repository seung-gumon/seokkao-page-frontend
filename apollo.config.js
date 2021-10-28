module.exports = {
    client: {
        includes: ["./pages/**/*.tsx","./fragments.ts","./component/**/*.tsx"],
        tagName: "gql",
        service: {
            name: 'seokkao-page',
            url: "http://localhost:5001/graphql",
        }
    }
}