/// <reference types="cypress" />

describe('Search Page', () => {
  beforeEach(() => {
    cy.visit('/search')
  })

  it('shows prompt to select a bible on initial load', () => {
    cy.contains('Please select a bible to search.').should('be.visible')
    cy.get('[data-testid="search-bar-input"]').should('be.disabled')
  })

  it('enables search bar after selecting a bible', () => {
    cy.get('[data-testid="bible-selector"]').click()
    cy.get('[data-testid="bible-selector-input"]').type('king james')
    cy.get('[role="option"]').first().click()
    cy.get('[data-testid="search-bar-input"]').should('not.be.disabled')
  })

  it('shows prompt to enter a search query after bible selection', () => {
    cy.get('[data-testid="bible-selector"]').click()
    cy.get('[data-testid="bible-selector-input"]').type('king james')
    cy.get('[role="option"]').first().click()
    cy.contains('Please enter a search query.').should('be.visible')
  })

  it('shows loader and then results or empty state after searching', () => {
    cy.get('[data-testid="bible-selector"]').click()
    cy.get('[data-testid="bible-selector-input"]').type('king james')
    cy.get('[role="option"]').first().click()
    cy.get('[data-testid="search-bar-input"]').type('God')
    cy.get('[data-testid="search-bar-submit"]').click()
    // Loader should appear
    cy.get('.animate-spin').should('exist')
    // Wait for the loader to disappear
    cy.get('.animate-spin').should('not.exist')
    // Now check for results or empty state
    cy.get('body').then($body => {
      if ($body.find('[data-testid="search-verse-card"]').length) {
        expect($body.find('[data-testid="search-pagination"]').length).to.be.greaterThan(0)
      } else {
        expect($body.text()).to.include('No results found.')
      }
    })
  })

  it('can paginate search results if multiple pages exist', () => {
    cy.get('[data-testid="bible-selector"]').click()
    cy.get('[data-testid="bible-selector-input"]').type('king james')
    cy.get('[role="option"]').first().click()
    cy.get('[data-testid="search-bar-input"]').type('God')
    cy.get('[data-testid="search-bar-submit"]').click()
    cy.get('[data-testid="search-pagination"]').should('exist')
    cy.get('[data-testid="search-pagination-next"]').then($next => {
      if (!$next.attr('aria-disabled')) {
        cy.wrap($next).click({ force: true })
        cy.get('[data-testid="search-verse-card"]').should('exist')
      }
    })
  })

  // it('is accessible by keyboard', () => {
  //   cy.get('body').press(Cypress.Keyboard.Keys.TAB)
  //   cy.focused().should('have.attr', 'data-testid', 'bible-selector')
  //   cy.focused().type('{enter}')
  //   cy.get('[data-testid="bible-selector"]').type('king james')
  //   cy.get('[role="option"]').first().type('{enter}')
  //   cy.get('[data-testid="search-bar-input"]').focus().type('God')
  //   cy.get('[data-testid="search-bar-submit"]').focus().type('{enter}')
  //   cy.get('[data-testid="search-verse-card"], body').should('exist')
  // })
})