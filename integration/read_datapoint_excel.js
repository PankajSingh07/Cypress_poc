

describe('TestSuite',function(){

    it('Read data from excel', function(){

        cy.task('readXlsx', { file: "./cypress/fixtures/TUM_datapoints.xlsx", sheet: "j1939_periodic" }).then((user) => {
            cy.log("Total DataPoints: " +user.length)
            for(let i= 0; i < user.length; i++){
                cy.log("Manager_Insight : " +user[i].TU_Manager_Insight)
                cy.log("Advance_Sensor : " +user[i].TU_Manager_Advance_Sensor)   
                cy.log("Expected_Value : " +user[i].expected_value)
            }
                          
        })
    })
})