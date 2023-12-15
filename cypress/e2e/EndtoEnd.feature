Feature: End-to-End tests for Blog Post creation, reading, and deletion

  Background:
    Given I am an authenticated user
    And I am on the main page I see the "Welcome to my Blog" text
    And I click the "Home" link
    Then I should see the Admin Login button
    When I click the Admin Login button
    When I enter my "username" and "password"
    And I click the Login button

  @e2e @api
  Scenario: Verify successful creation of a blog post through API
    When I perform a POST request to "/blogposts" with valid payload
    Then I verify the response contains the author

  @e2e @ui
  Scenario: Verify the newly created blog post is visible on the UI
    Then The post with "author" is visible on the Blog Homepage

  @e2e @api
  Scenario: Delete the post through the API
    When I perform a DELETE request to "/blogposts/1"

  @e2e @ui
  Scenario: Verify the deleted blog post is not visible on the UI
    Then The number of posts should be one less than before