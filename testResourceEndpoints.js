const { testEndpoint } = require("./utils/endpointTestLibrary");

testEndpoint(
  "http://127.0.0.1:5000/api/ideas",
  () => ({
    authorId: "user65",
    content: "Some text",
    category: "Technology",
  }),
  () => ({
    content: "Some tALLAKDJLASKDext",
    category: "TechnologyLDJLASKDJLASKD",
  })
);

// Testing for the users resource
// testEndpoint(
//   "http://127.0.0.1:5000/api/users",
//   () => ({
//     id: "2024r",
//     username: "usmanKhan",
//   }),
//   () => ({ username: "junaidKhan" })
// );
