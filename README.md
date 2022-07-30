Create CRUD operations for:

- members
- records

Consider the following in the database:

```json
{
  "workouts": [ ...
  ],
  "members": [ ...
  ],
  "records": [ ... {
      "id": "ad75d475-ac57-44f4-a02a-8f6def58ff56",
      "workout": "4a3d9aaa-608c-49a7-a004-66305ad4ab50",
      "record": "160 reps",
      "memberId": "11817fb1-03a1-4b4a-8d27-854ac893cf41",
      "member": "/members/:memberId"
    },
  ]
}
```

The parameters for sorting and pagination follow the same philosophy. Let's look at a few features we could possibly implement:

- Receive all workouts that require a barbell: /api/v1/workouts?equipment=barbell
- Get only 5 workouts: /api/v1/workouts?length=5
- When using pagination, receive the second page: /api/v1/workouts?page=2
- Sort the workouts in the response in descending order by their creation date: /api/v1/workouts?sort=-createdAt
- You can also combine the parameters, to get the last 10 updated workouts for example: /api/v1/workouts sort=-updatedAt&length=10

```javascript
// In src/v1/routes/workoutRoutes.js
...

// Custom made middlewares
const authenticate = require("../../middlewares/authenticate");
const authorize = require("../../middlewares/authorize");

router.post("/", authenticate, authorize, workoutController.createNewWorkout);
...
```
