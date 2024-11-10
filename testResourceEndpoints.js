const {
  testEndpoint,
  testReadAll,
  testReadOne,
} = require("./utils/endpointTestLibrary");

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

// // Testing for the users resource
// testReadAll("http://127.0.0.1:5000/api/users");
// testReadOne("http://127.0.0.1:5000/api/users", {
//   _id: "672f6cf950895dd56bb19cc7",
//   username: "usmanKhan",
//   fullname: "Usman Khan",
// });
