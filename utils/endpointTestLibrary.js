const lodash = require("lodash");

function entryCompare(obj1, obj2) {
  for (const [k, v] of Object.entries(obj1)) {
    if (obj2[k] !== v) {
      return false;
    }
  }
  return true;
}

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
      const getRes = await fetch(`${endpoint}/${resObj.createdId}`);
      const getResObj = await getRes.json();

      if (entryCompare(item, getResObj)) {
        console.log("\x1b[32m-- Dummy Item has been created!\x1b[0m");
        return getResObj;
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

async function testReadOne(endpoint, getResObj) {
  console.log("\nTesting Read One");
  const res = await fetch(endpoint + "/" + getResObj["_id"]);
  if (res.ok) {
    console.log("-- GET returned status 200");
    const resObj = await res.json();
    if (lodash.isEqual(resObj, getResObj)) {
      console.log(
        `\x1b[32m-- Already Created item of id ${resObj._id} is returned\x1b[0m`
      );
    }
  }
}

async function testUpdate(endpoint, item, itemDiff) {
  const updatedObject = { ...item, ...itemDiff };
  console.log("\nTesting Update");
  const res = await fetch(`${endpoint}/${item._id}`, {
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
      console.log(`-- PUT returned `, resObj);
      const getRes = await fetch(endpoint + "/" + item._id);
      const getResObj = await getRes.json();
      if (lodash.isEqual(getResObj, updatedObject)) {
        console.log(`\x1b[32m-- Resource item has been updated\x1b[0m`);
      }
    }
  }
}
async function testDelete(endpoint, createdId) {
  console.log("\nTesting Delete");
  const res = await fetch(`${endpoint}/${createdId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    console.log("-- DELETE returned status " + res.status);
    const resObj = await res.json();
    if (resObj.deleted && resObj.deletedId === createdId) {
      console.log(`-- DELETE returned `, resObj);
      const getRes = await fetch(endpoint + "/" + createdId);
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
  const getResObj = await testCreate(endpoint, dummyResourceGetter);
  await testReadAll(endpoint);
  await testReadOne(endpoint, getResObj);
  await testUpdate(endpoint, getResObj, getDummyDiffObj());
  await testDelete(endpoint, getResObj._id);
}

module.exports = {
  testEndpoint,
  testCreate,
  testReadAll,
  testReadOne,
  testUpdate,
  testDelete,
};
