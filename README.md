# Final-TermExam

Here’s a description you can use for your README.md file:

Final-Term Exam Backend
This is the backend for the Final-Term Exam project, which includes the implementation of an API for managing attractions, visitors, and reviews. The application is built using Node.js, Express, and MongoDB to handle and store data.

Features
Attractions:

Add new attractions with details like name, location, and entry fee.
Retrieve details of all attractions or a specific attraction by its ID.
Update the rating of an attraction based on reviews.
Get the top-rated attractions based on average review scores.
Visitors:

Register new visitors with a unique email and a list of visited attractions.
Retrieve all visitors or a specific visitor's details.
Track the activity of visitors, including the number of attractions they have reviewed.
Reviews:

Visitors can post reviews for attractions they have visited.
Ensure that a visitor cannot review the same attraction twice.
Calculate and update the average rating of an attraction after a new review.
Endpoints
Attractions
POST /attractions: Create a new attraction (name, location, entry fee).
GET /attractions: Get all attractions.
GET /attractions/:id: Get an attraction by ID.
PUT /attractions/:id/rating: Update the rating of an attraction.
GET /attractions/top-rated: Get the top 5 attractions based on average rating.
Visitors
POST /visitors: Register a new visitor (email, name, visited attractions).
GET /visitors: Get all visitors.
GET /visitors/:id: Get a visitor by ID.
GET /visitors/activity: Get visitors' activity with the count of attractions they have reviewed.
Reviews
POST /reviews: Post a review for an attraction.
GET /reviews: Get all reviews.
GET /reviews/:id: Get a review by ID.
Validation Rules
A visitor cannot review the same attraction twice.
The entry fee for attractions cannot be negative.
A visitor's email must be unique and valid.
Technologies Used
Node.js: JavaScript runtime for building the backend.
Express.js: Web framework for handling HTTP requests.
MongoDB: NoSQL database to store data.
Mongoose: ODM (Object Data Modeling) library for MongoDB.
Postman: Used for testing API endpoints.