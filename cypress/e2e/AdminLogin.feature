Feature: Admin Login

  @admin @ui
  Scenario: Admin login and logout process
    Given I am on the main page I see the "Welcome to my Blog" text
    And I click the "Home" link
    Then I should see the Admin Login button
    When I click the Admin Login button
    Then I should be directed to the Admin Login page
    When I enter my "username" and "password"
    And I click the Login button
    Then I should see the Add and Logout buttons
    When I click the Logout button
    Then I should be logged out and see the Admin Login button again