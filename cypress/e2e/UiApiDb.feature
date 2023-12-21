Feature: UI, Database and API testing

  Scenario: Verify the UI, DB and API responses are the same
    Given I have a database connection
    And I am an authenticated user
    Given I am on the main page I see the "Welcome to my Blog" text
    And I click the "Home" link
    Then The results from the UI, API and database should be the same