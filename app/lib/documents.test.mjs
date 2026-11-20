// Run with: npm test  (Node 22.18+ loads the .ts file directly)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ALL_CASES,
  answer,
  answersToSearch,
  parseAnswers,
  questionsFor,
  requiredDocs,
} from "./documents.ts";

const docs = (a) => requiredDocs(a)?.map((g) => [g.kind, g.docs]);
const VEHICLE = ["title", "billOfSale", "partsReceipts"];

test("dealer, first visit: registration once, then vehicle documents", () => {
  assert.deepEqual(docs({ who: "dealer", first: "yes" }), [
    ["registration", ["dealerLicense", "resaleTax", "ownerLicense", "ein"]],
    ["vehicle", VEHICLE],
  ]);
});

test("dealer, already registered: vehicle documents only, never a work order", () => {
  assert.deepEqual(docs({ who: "dealer", first: "no" }), [["vehicle", VEHICLE]]);
});

test("company is not a dealer: no dealer license number", () => {
  for (const c of ALL_CASES.filter((c) => c.who === "company")) {
    assert.ok(!requiredDocs(c).some((g) => g.docs.includes("dealerLicense")));
  }
});

test("company: resale tax number only for auction vehicles", () => {
  assert.deepEqual(docs({ who: "company", first: "yes", auction: "yes" }), [
    ["registration", ["ownerLicense", "ein", "resaleTaxAuction"]],
    ["vehicle", VEHICLE],
  ]);
  assert.deepEqual(docs({ who: "company", first: "yes", auction: "no" }), [
    ["registration", ["ownerLicense", "ein"]],
    ["vehicle", VEHICLE],
  ]);
  assert.deepEqual(docs({ who: "company", first: "no", auction: "yes" }), [
    ["vehicle", [...VEHICLE, "resaleTaxOnFile"]],
  ]);
  assert.deepEqual(docs({ who: "company", first: "no", auction: "no" }), [["vehicle", VEHICLE]]);
});

test("private owner, accident", () => {
  assert.deepEqual(docs({ who: "private", accident: "yes", repair: "self" }), [
    ["vehicle", ["titleOwnerOrInsurer", "partsReceipts", "accidentPhotos", "driverLicense"]],
  ]);
});

test("private owner, no accident", () => {
  assert.deepEqual(docs({ who: "private", accident: "no", repair: "self" }), [
    ["vehicle", ["salvageTitle", "billOfSale", "partsReceipts", "driverLicense"]],
  ]);
});

test("private owner: body shop or garage repair always adds the work order", () => {
  for (const accident of ["yes", "no"]) {
    const shop = requiredDocs({ who: "private", accident, repair: "shop" })[0].docs;
    const self = requiredDocs({ who: "private", accident, repair: "self" })[0].docs;
    assert.deepEqual(shop, [...self, "workOrder"]);
  }
});

test("private owners always bring their driver license", () => {
  for (const c of ALL_CASES.filter((c) => c.who === "private")) {
    assert.ok(requiredDocs(c)[0].docs.includes("driverLicense"));
  }
});

test("only private owners need a work order", () => {
  for (const c of ALL_CASES.filter((c) => c.who !== "private")) {
    assert.ok(!requiredDocs(c).some((g) => g.docs.includes("workOrder")));
  }
});

test("incomplete answers give no list", () => {
  for (const a of [{}, { who: "dealer" }, { who: "company", first: "yes" }, { who: "private", accident: "yes" }]) {
    assert.equal(requiredDocs(a), null);
  }
});

test("every complete case is answerable through the questions shown", () => {
  for (const c of ALL_CASES) {
    assert.deepEqual(questionsFor(c), Object.keys(c));
    assert.ok(requiredDocs(c));
  }
});

test("URL round trip keeps other parameters and drops invalid values", () => {
  const a = { who: "private", accident: "no", repair: "shop" };
  const s = answersToSearch(a, "?lang=es&who=dealer");
  assert.equal(new URLSearchParams(s).get("lang"), "es");
  assert.deepEqual(parseAnswers(s), a);
  assert.deepEqual(parseAnswers("?who=robot&first=maybe"), {});
  assert.deepEqual(parseAnswers("?who=dealer&accident=yes"), { who: "dealer" });
});

test("changing the customer type starts over; other changes keep valid answers", () => {
  const company = { who: "company", first: "yes", auction: "yes" };
  assert.deepEqual(answer(company, "who", "private"), { who: "private" });
  assert.deepEqual(answer(company, "first", "no"), { ...company, first: "no" });
});
