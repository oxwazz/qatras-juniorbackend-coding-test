project1
endpoint
GET /items - read all items
POST /items - create new item {"name":"xxx", "desc":"xxx"}
GET /items/:idOrName - read single item with id or item name
PUT /items/:id - update existing item {"name":"xxxChange", "desc":"xxxChange"}
DELETE /items/:id - delete single item with id


endpoint bus, station, schedule
POST /bus/photo/:id - upload bus id photo
DELETE /bus/photo/:id - delete bus id photo 
GET /bus/photo/:name - view bus id image
GET /bus - read all bus
POST /bus - create bus
PUT /bus/:id - update existing bus with id
DELETE /bus/:id - delete single bus with id

GET /station - read all station
POST /station - create new station
PUT /station/:id - update existing station with id
DELETE /station/:id - delete single station with id

POST /schedule - create new schedule
PUT /schedule/:id - update existing schedule with id
DELETE /schedule/:id - delete single shedule with id
GET /schedule/date - read all date available
GET /schedule/search?xxx="" - read all schedules with queries
























