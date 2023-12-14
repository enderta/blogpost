Feature: API tests for Graphql Blog, User and Authentication services

  @apicrud
  Scenario: Crud api
    Given I am an authenticated user
    When I perform a POST request to "/blogposts" with valid payload
    When I perform a POST request to "/blogposts/1" with valid payload for update
    When I perform a DELETE request to "/blogposts/1"

