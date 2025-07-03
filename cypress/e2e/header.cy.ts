/// <reference types="cypress" />

describe('Header Component', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    describe('Desktop Navigation', () => {
        it('displays header with logo and navigation links', () => {
            cy.get('[data-testid="header"]').should('be.visible')
            cy.get('[data-testid="header-logo"]').should('be.visible')
            cy.get('[data-testid="header-nav-desktop"]').should('be.visible')
            cy.get('[data-testid="header-mobile-trigger"]').should('not.be.visible')
        })

        it('has all required navigation links', () => {
            const expectedLinks = ['bible', 'search', 'collections', 'stories']

            expectedLinks.forEach(link => {
                cy.get(`[data-testid="header-nav-link-${link}"]`).should('be.visible')
                cy.get(`[data-testid="header-nav-link-${link}"]`).should('contain.text', link.charAt(0).toUpperCase() + link.slice(1))
            })
        })

        it('navigates to correct pages when links are clicked', () => {
            cy.get('[data-testid="header-nav-link-bible"]').click()
            cy.url().should('include', '/bible')

            cy.get('[data-testid="header-nav-link-search"]').click()
            cy.url().should('include', '/search')

            cy.get('[data-testid="header-nav-link-collections"]').click()
            cy.url().then((url) => {
                expect(url).to.satisfy((url: string) =>
                    url.includes("/collections") || url.includes("/sign-in")
                );
            });
            cy.visit('/')

            cy.get('[data-testid="header-nav-link-stories"]').click()
            cy.url().then((url) => {
                expect(url).to.satisfy((url: string) =>
                    url.includes("/stories") || url.includes("/sign-in")
                );
            });
            cy.visit('/')
        })

            it('highlights active page with underline', () => {
              cy.visit('/search')
              cy.get('[data-testid="header-nav-link-search"]').should('have.class', 'underline')

              cy.visit('/bible')
              cy.get('[data-testid="header-nav-link-bible"]').should('have.class', 'underline')
            })

            it('logo navigates to home page', () => {
              cy.visit('/search')
              cy.get('[data-testid="header-logo"]').click()
              cy.url().should('eq', Cypress.config().baseUrl + '/')
            })
          })

          describe('Mobile Navigation', () => {
            beforeEach(() => {
              // Set viewport to mobile size
              cy.viewport('iphone-x')
            })

            it('shows mobile menu trigger and hides desktop nav on mobile', () => {
              cy.get('[data-testid="header-nav-desktop"]').should('not.be.visible')
              cy.get('[data-testid="header-mobile-trigger"]').should('be.visible')
            })

            it('opens mobile menu when trigger is clicked', () => {
              cy.get('[data-testid="header-mobile-trigger"]').click()
              cy.get('[data-testid="header-sheet"]').should('be.visible')
              cy.get('[data-testid="header-nav-mobile"]').should('be.visible')
            })

            it('displays all navigation links in mobile menu', () => {
              cy.get('[data-testid="header-mobile-trigger"]').click()

              const expectedLinks = ['bible', 'search', 'collections', 'stories']
              expectedLinks.forEach(link => {
                cy.get(`[data-testid="header-mobile-link-${link}"]`).should('be.visible')
                cy.get(`[data-testid="header-mobile-link-${link}"]`).should('contain.text', link.charAt(0).toUpperCase() + link.slice(1))
              })
            })

            it('navigates to correct pages from mobile menu', () => {
              cy.get('[data-testid="header-mobile-trigger"]').click()

              cy.get('[data-testid="header-mobile-link-bible"]').click()
              cy.url().should('include', '/bible')
              cy.get('[data-testid="header-sheet"]').should('not.exist')

              cy.get('[data-testid="header-mobile-trigger"]').click()
              cy.get('[data-testid="header-mobile-link-search"]').click()
              cy.url().should('include', '/search')
              cy.get('[data-testid="header-sheet"]').should('not.exist')
            })

            it('closes mobile menu after navigation', () => {
              cy.get('[data-testid="header-mobile-trigger"]').click()
              cy.get('[data-testid="header-sheet"]').should('be.visible')

              cy.get('[data-testid="header-mobile-link-bible"]').click()
              cy.get('[data-testid="header-sheet"]').should('not.exist')
            })

            it('highlights active page in mobile menu', () => {
              cy.visit('/search')
              cy.get('[data-testid="header-mobile-trigger"]').click()
              cy.get('[data-testid="header-mobile-link-search"]').should('have.class', 'text-primary')
            })
          })

        //   describe('Responsive Behavior', () => {
        //     it('switches between desktop and mobile navigation based on screen size', () => {
        //       // Desktop view
        //       cy.viewport(1024, 768)
        //       cy.get('[data-testid="header-nav-desktop"]').should('be.visible')
        //       cy.get('[data-testid="header-mobile-trigger"]').should('not.be.visible')

        //       // Mobile view
        //       cy.viewport(375, 667)
        //       cy.get('[data-testid="header-nav-desktop"]').should('not.be.visible')
        //       cy.get('[data-testid="header-mobile-trigger"]').should('be.visible')
        //     })
        //   })

        //   describe('Accessibility', () => {
        //     it('has proper ARIA labels and roles', () => {
        //       cy.get('[data-testid="header-mobile-trigger"]').should('have.attr', 'aria-label', 'Toggle menu')
        //       cy.get('[data-testid="header-mobile-trigger"]').find('.sr-only').should('contain.text', 'Toggle menu')
        //     })

        //     it('is keyboard navigable', () => {
        //       cy.get('body').press(Cypress.Keyboard.Keys.TAB)
        //       cy.focused().should('have.attr', 'data-testid', 'header-logo')

        //       cy.focused().press(Cypress.Keyboard.Keys.TAB)
        //       cy.focused().should('have.attr', 'data-testid', 'header-nav-link-bible')
        //     })

        //     it('mobile menu is keyboard accessible', () => {
        //       cy.viewport('iphone-x')
        //       cy.get('[data-testid="header-mobile-trigger"]').focus().type('{enter}')
        //       cy.get('[data-testid="header-sheet"]').should('be.visible')

        //       // Test keyboard navigation in mobile menu
        //       cy.get('[data-testid="header-mobile-link-bible"]').should('be.focused')
        //     })
    // })

    //   describe('Conditional Rendering', () => {
    //     it('hides header on sign-in page', () => {
    //       cy.visit('/sign-in')
    //       cy.get('[data-testid="header"]').should('not.exist')
    //     })

    //     it('shows header on other pages', () => {
    //       cy.visit('/bible')
    //       cy.get('[data-testid="header"]').should('be.visible')

    //       cy.visit('/search')
    //       cy.get('[data-testid="header"]').should('be.visible')
    //     })
    //   })
})
