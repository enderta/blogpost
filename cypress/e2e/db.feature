Feature: Database and UI testing

  @db @ui
  Scenario: Database and UI testing
    Given I have a database connection
    Given I am on the main page I see the "Welcome to my Blog" text
    And I click the "Home" link
    And UI and database should be in sync