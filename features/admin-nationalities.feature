Feature:
    Admin nationalities management
    As an OrangeHRM administrator
    I want to create a nationality
    So that the nationality can be used in the application
    

    @nationalities
    Scenario: Create a new nationality
        Given I am logged in as the administrator
        When I navigate to Admin and open Nationalities
        And I create a new nationality
        Then the new nationality should appear in Nationalities