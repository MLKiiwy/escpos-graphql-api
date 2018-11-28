Feature: Reading a message

Scenario: I can read a message on the api
  Given there is 1 "message" in database like:
      | id                                   | content |
      | b2bcdb80-e05a-11e8-8c70-19f9edd6467d | Coucou  |
  When I send a "GET" request to "/messages/b2bcdb80-e05a-11e8-8c70-19f9edd6467d"
  Then the response status code should be 200
  And the response body should be like:
  """
  {
    "id": "b2bcdb80-e05a-11e8-8c70-19f9edd6467d",
    "content": "Coucou"
  }
  """
