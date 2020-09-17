//arrange
describe("My First Test", function () {
  //act
  it("Does not do much", function () {
    //assert
    expect(true).to.equal(true);
  });
});

describe("User Onboarding app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // "it" is a test
  it("sanity check to make sure tests work", () => {
    // "expect" is an assertion
    // there can be several assertions per test
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5); // strict ===
    expect({}).not.to.equal({}); // strict ===
    expect({}).to.eql({}); // not strict
  });

  const nameInput = () => cy.get("input[name=name]");

  it("Check Name Field", () => {
    nameInput().type("Kestrel").should("have.value", "Kestrel");
  });

  it("Check Email Field", () => {
    cy.get("input[name=email]").type("a@b.com");
  });

  it("Check Password Field", () => {
    cy.get("input[name=password]").type("12345678");
  });

  it("Check Terms of Service Box", () => {
    cy.get("input[name=terms").check();
  });

  it("Check submission", () => {
    nameInput().type("Kestrel").should("have.value", "Kestrel");
    cy.get("input[name=email]").type("a@b.com");
    cy.get("input[name=password]").type("12345678");
    cy.get("input[name=terms").check();
    cy.get(".submit button").click();
  });

  const submitBtn = () => cy.get(".submit button");

  it("Check empty field is unable to submit", () => {
    submitBtn().should("be.disabled");

    nameInput().type("name INPUT");
    submitBtn().should("be.disabled");
    nameInput().clear();

    cy.get("input[name=email]").type("a@b.com");
    submitBtn().should("be.disabled");
    cy.get("input[name=email]").clear();

    cy.get("input[name=password]").type("12345678");
    submitBtn().should("be.disabled");
    cy.get("input[name=password]").clear();
  });
});
