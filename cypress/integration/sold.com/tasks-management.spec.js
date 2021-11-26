/// <reference types="cypress" />

// type definitions for custom commands like "createDefaultTodos"
/// <reference types="../../support" />

// ----------------------------------------------------------------------------
// Custom Commands:
//   command defined in /integration/sold.com/support/commands.js
// ----------------------------------------------------------------------------

describe('SOLD.com Test Project: task management', () => {
  beforeEach(() => {
    cy.visit('/')
    for (let i = 1; i < 3; i++) {
      cy.get('.new-todo')
        .type(`test${i}`)
        .type('{enter}')
    }
  });

  //test-1
  it('Items marked as complete, all items have "completed" class', () => {
    cy.get('.toggle')
      .check()

    cy.get('.todo-list li')
      .should('have.class', 'completed')
  });

  //test-2
  it('After items marked as complete, toggle completed flag and assert "completed" class is removed', () => {
    cy.get('.toggle')
      .check()

    cy.get('.todo-list li')
      .should('have.class', 'completed')

    cy.get('.toggle')
      .uncheck()

    cy.get('.todo-list li')
      .should('not.have.class', 'completed')
  });

  //test-3
  it('Assert the ".todo-count" has text "2 items left"', () => {
    cy.get('.todo-count')
      .should('include.text', '2 items left')
  });

  //test-4
  it('Mark one items completed, assert "Clear Completed" is available', () => {
    cy.get('.toggle')
      .check()

    cy.get('.toggle')
      .first()
      .uncheck()

    cy.get('.clear-completed')
      .should('exist')
  });

  //test-5
  it('Mark one item completed, click Clear Completed button, assert that marked item no longer exists', () => {
    cy.get('.toggle')
      .check()

    cy.get('.toggle')
      .first()
      .uncheck()

    cy.get('.clear-completed')
      .click()

    cy.get('.todo-list li')
      .should('not.contain', 'test2')
  });

  //test-6
  it('Hide other controls when editing', () => {
    const hidden = [
      {control: '.toggle'},
      {control: 'label'},
      {control: 'button'}
    ]

    cy.get('.todo-list li')
      .first()
      .dblclick()

    cy.wrap(hidden)
      .each(hidden => {
        cy.get('.todo-list li')
        .first()
        .find(hidden.control)
        .should('not.be.visible')
      })
  });

  //test-7
  it('Should highlight the currently applied filter', () => {
        const filters = [
          {link: 'Active'},
          {link: 'All'},
          {link: 'Completed'}
        ]

        cy.wrap(filters)
          .each(filter => {
            cy.contains(filter.link)
            .click()
            .should('have.class', 'selected')
          })
  });

});
