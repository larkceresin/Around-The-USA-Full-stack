# react-around-api-full
The API of "Around the U.S." with authorization and registration handled by the back-end server. (backend folder) and a front end created in react that uses the API. Currently this can be downloaded and used locally, it is not hosted on a server at this time.
post requests to /signup to register & /login to sign-in a user.
Other methods require authorization to access (with Bearer token authorization)
/users methods
* get /users will return all users on database
* get /users/me will return information on the user currently signed in.
* patch /users/me will update name and about of the current user.
* patch /users/me/avatar will update the avatar for the current user
/cards
* get /cards will return all cards
* post /cards will create a new card, requires 'name' and 'link' to be passed.
* delete /cards/:id will delete a selected card if the user accessing it was the one to create it.
* put and delete at /cards/likes/:id will add or remove a user's like from the card stored.

# extra validation requirements
* passwords need to be a minimum of 8 characters to be accepted
* all image links need to end with .jpg/.png/.gif to work properly


# *This API and website are not currently being hosted*
