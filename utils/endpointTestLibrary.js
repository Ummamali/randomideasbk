const lodash = require("lodash");

function defaultDummyResourceGetter() {
  return {
    id: "76dget543fdre4357d9je",
    title: "Some title",
    amount: 100,
    friends: ["a", "b"],
    location: {
      house: "987b",
      street: "#65",
    },
  };
}

function defaultDummyDiffGetter() {
  return {
    title: "changed title",
    amount: 87216473,
    friends: ["a"],
  };
}

async function testCreate(
  endpoint,
  dummyResourceGetter = defaultDummyResourceGetter
) {
  console.log("Testing Create");
  const item = dummyResourceGetter();
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (res.ok) {
    const resObj = await res.json();
    if (resObj.created) {
      console.log("-- POST returned ", resObj);
      const getRes = await fetch(`${endpoint}/${item["id"]}`);
      const getResObj = await getRes.json();
      if (lodash.isEqual(item, getResObj)) {
        console.log("\x1b[32m-- Dummy Item has been created!\x1b[0m");
      }
    }
  }
}

async function testReadAll(endpoint) {
  console.log("\nTesting Read All");
  const res = await fetch(endpoint);
  if (res.ok) {
    console.log("-- GET returned status 200");
    const resObj = await res.json();
    console.log(`\x1b[32m-- GET returned ${resObj.length} item(s)\x1b[0m`);
  }
}

async function testReadOne(
  endpoint,
  getDummyResource = defaultDummyResourceGetter
) {
  const item = getDummyResource();
  console.log("\nTesting Read One");
  const res = await fetch(endpoint + "/" + item.id);
  if (res.ok) {
    console.log("-- GET returned status 200");
    const resObj = await res.json();
    if (lodash.isEqual(resObj, item)) {
      console.log(
        `\x1b[32m-- Created item of id ${resObj.id} is returned\x1b[0m`
      );
    }
  }
}

async function testUpdate(
  endpoint,
  getDummyResource = defaultDummyResourceGetter,
  getDummyDiffObj = defaultDummyDiffGetter
) {
  const item = getDummyResource();
  const itemDiff = getDummyDiffObj();
  const updatedObject = { ...item, ...itemDiff };
  console.log("\nTesting Update");
  const res = await fetch(`${endpoint}/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemDiff),
  });
  if (res.ok) {
    console.log("-- PUT returned status " + res.status);
    const resObj = await res.json();
    if (resObj.updated) {
      console.log(`-- PUT returned updated: true`);
      const getRes = await fetch(endpoint + "/" + item.id);
      const getResObj = await getRes.json();
      if (lodash.isEqual(getResObj, updatedObject)) {
        console.log(`\x1b[32m-- Resource item has been updated\x1b[0m`);
      }
    }
  }
}
async function testDelete(
  endpoint,
  getDummyResource = defaultDummyResourceGetter
) {
  const item = getDummyResource();
  console.log("\nTesting Delete");
  const res = await fetch(`${endpoint}/${item.id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    console.log("-- DELETE returned status " + res.status);
    const resObj = await res.json();
    if (resObj.deleted && resObj.deletedId === item.id) {
      console.log(`-- DELETE returned deleted: true and object id`);
      const getRes = await fetch(endpoint + "/" + item.id);
      if (getRes.status === 404) {
        console.log(`\x1b[32m-- Resource item has been deleted\x1b[0m`);
      }
    }
  }
}

async function testEndpoint(
  endpoint,
  dummyResourceGetter = defaultDummyResourceGetter,
  getDummyDiffObj = defaultDummyDiffGetter
) {
  await testCreate(endpoint, dummyResourceGetter);
  await testReadAll(endpoint);
  await testReadOne(endpoint, dummyResourceGetter);
  await testUpdate(endpoint, dummyResourceGetter, getDummyDiffObj);
  await testDelete(endpoint, dummyResourceGetter);
}

module.exports = { testEndpoint };
