/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

it.only('Opening Google Home page', function(){

    cy.visit('https://www.google.co.in/')
    cy.get('.gLFyf').type('Telematics{enter}')
  })

it('Opening GSMarena Home page', function(){

    cy.visit('https://www.gsmarena.com/')
    cy.xpath
  })  