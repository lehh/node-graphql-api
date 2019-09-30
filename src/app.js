const { GraphQLServer } = require('graphql-yoga');
const { resolvers } = require('./resolvers');
const models = require('./models');

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { models }
});

server.start({ port: "3000" }, (opt) => {
    console.log(`Server is running on port ${opt.port}`);
})