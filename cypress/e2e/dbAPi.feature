Feature: Database and API testing

  Scenario: Verify the response DB and API are the same
    Given I have a database connection
    Given I am an authenticated user
    Then The results should be the same
