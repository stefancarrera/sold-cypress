/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../../support" />

// ----------------------------------------------------------------------------
// Custom Commands:
//   command defined in /integration/sold.com/support/commands.js
// ----------------------------------------------------------------------------


describe('SOLD.com Test Project: general', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  const newItem = 'test';

  //test-1
  it('Asserts main and footer sections are hidden', () => {
    cy.get('.main')
    .should('not.exist')

    cy.get('.footer')
    .should('not.exist')
  });

  //test-2
  it('Finds the focus on page load', () => {
    cy.focused()
      .should('have.class', 'new-todo');
  });

  //test-3
  it('Add todo, should clear input field when item is added', () => {
    cy.get('.new-todo')
      .type(newItem)
      .type('{enter}')

    cy.get('.new-todo')
      .should('have.value', '')
  });

  //test-4
  it('Add todo, assert the main and footer sections should not be hidden', () => {
    cy.get('.new-todo')
      .type(newItem)
      .type('{enter}')

    cy.get('.main')
      .should('exist')

    cy.get('.footer')
      .should('exist')
  });

  //test-5
  it('Add todo, assert that it exists', () => {
    cy.get('.new-todo')
      .type(newItem)
      .type('{enter}')

    cy.get('.todo-list li')
      .should('exist')
  });

  //test-6
  it('Add three todos and make sure all exist, and assert there are three li items', () => {
    for(let i = 1; i < 4; i++) {
      cy.get('.new-todo')
      .type(`test${i}`)
      .type('{enter}')
    }

    cy.get('.todo-list li')
      .should('exist')
  });

  //test-7
  it('Add todo item with leading and trailing spaces, when created spaces are trimmed', () => {
    cy.get('.new-todo')
      .type('   no spaces   ')
      .type('{enter}')

    cy.get('.todo-list li')
      .should('contain', 'no spaces')
  });

});
