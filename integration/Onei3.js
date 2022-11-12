/ <reference types="cypress" />
/ <reference types="cypress-xpath" />
describe('TestSuite',function()
{
    it.only('Opening Onei3', function(){
        cy.visit('https://staging.onei3.com/home')
        // cy.title().should('eq','ONEi3 (staging)')
        cy.get('#username', {timeout: 8000}).type('qatesting@trackunit.com')
        cy.get('#password').type('Trackunit@2022{enter}')
        cy.wait(10000)
        cy.title().should('eq','ONE i3')
        cy.get('#map', {timeout: 5000})      
    })

    it('Search asset on the Asset page', function(){
        cy.get('#Assets > .nav-title', {timeout: 12000}).click()
        cy.get('.search-input-container > .ng-pristine',).type('M7H_QA Automation{enter}')
        cy.wait(4000)
        cy.get('.tr-asset-list-name').should('have.text', 'M7H_QA Automation')
    })

    it('Open the asset from the searched result', function(){
        cy.get('.tr-asset-list-name').click()
        // cy.wait(10000)
        // cy.get('#assetName', {timeout: 20000}).
        cy.get('#assetName', {timeout: 25000}).contains('M7H_QA Automation')
        // cy.get('#assetName').should('have.text', 'M7H_QA Automation')
    })

    it('Search device from Device page', function(){
        cy.get('#Devices > .nav-title').click()
        cy.wait(8000)
        cy.get('.input-group > .form-control').type('7020017259{enter}')
        cy.get('.tr-devices-view-device-serialNumber', {timeout: 10000}).click()
        cy.get('.active > .crumb').should('have.text', '7020017259')
        cy.get('[ng-show="installation.device.serialNumber"] > :nth-child(2)').contains('7020017259')
    })

    it('Select Alert from Alert dashboard', function(){
        // cy.get('#Alerts > .nav-title').click()
        cy.xpath("//a[@id='Alerts']").click()
        cy.wait(5000)
        cy.xpath("(//a[@class='link'])[1]", {timeout: 10000}).then(function(text1){
            cy.log(text1.text())
            assert.equal(text1.text(), 'M7H_QA Automation', 'Asset Name Matched')
        })
        cy.xpath("(//a[@class='link'])[1]").click()
        cy.xpath("//h3[@id='assetName']",{timeout:25000}).then(function(text2){
            cy.log(text2.text()).contains('M7H_QA Automation')
            // assert.equal(text2.text(), 'M7H_QA Automation', 'Asset Name Matched')
        })
               
    })
    it('Read data from excel', function(){
        cy.visit('https://www.way2automation.com/angularjs-protractor/registeration/#/login')
        cy.task('readXlsx', { file: "./cypress/fixtures/login_creds.xlsx", sheet: "Sheet1" }).then((user) => {
            // cy.get('#username').clear().type(user[0].Username)
            // cy.get('#password').clear().type(user[0].Password)   
            // cy.get('#formly_1_input_username_0').clear().type(user[0].Description)
            // cy.contains("Login").click()    
            cy.log(user.length)
            for(let i= 0; i < user.length; i++){
                cy.get('#username').clear().type(user[i].Username)
                cy.get('#password').clear().type(user[i].Password)   
                cy.get('#formly_1_input_username_0').clear().type(user[i].Description)
                cy.contains("Login").click()
                cy.wait(2000)

                cy.get('body').then(($body) =>{
                    const a =   $body.find('[ng-if="Auth.error"]')
                    cy.log(a)
                    cy.log(a.length)

                    if($body.find('[ng-if="Auth.error"]').length > 0){
                        cy.log("Failed to Log-in")
                    }
                    else{
                        cy.log("Successfully Logged-in") 
                        cy.contains("Logout").click() 
                        cy.reload()
                    }                    
                })  }
           
        })         
    })
})    