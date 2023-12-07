Feature: End-to-End tests for Blog Post creation, reading, and deletion

  @e2e @api
  Scenario: Verify successful creation of a blog post through API
    Given I am an authenticated user
    When I perform a POST request to "/blogposts" with valid payload
    Then I expect the status code to be 200
    And I verify the response contains the author
  @e2e @ui
  Scenario: Verify the newly created blog post is visible on the UI
    Given I am on the main page I see the "Welcome to my Blog" text
    And I click the "Home" link
    Then The post with "author" should be visible on the Blog Homepage
  @e2e @api
  Scenario: Delete the post through the API
    Given I am an authenticated user
    When I perform a DELETE request to "/blogposts/1"
    Then I expect the status code to be 200
  @e2e @ui
  Scenario: Verify the deleted blog post is not visible on the UI
    Given I am on the main page I see the "Welcome to my Blog" text
    And I click the "Home" link
    Then The number of posts should be one less than before