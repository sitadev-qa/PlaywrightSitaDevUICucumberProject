Feature: Admin user management
  As an OrangeHRM administrator
  I want to create a system user
  So that the user can access the application

  @user-management
  Scenario: Create an enabled administrator user
    Given I am logged in as the administrator
    When I navigate to Admin and open User Management
    And I create a new enabled administrator user
    Then the new user should appear in User Management
