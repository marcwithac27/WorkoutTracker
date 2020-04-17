const db = require("../Models");
const mongo = require("mongojs")
module.exports = (app) => {
    app.get("/api/workouts", (req ,res) => {
        db.Workout.find({})
        .sort({"day":-1})
        .limit(1)
        .then(dbWorkout => {
            res.send(dbWorkout);
        })
        });
    

    app.put("/api/workouts/:id", (req, res) => {
        if (req.params.id != undefined) {
            db.Exercise.create(req.body)
            .then(({_id}) => db.Workout.findOneAndUpdate({"_id": mongo.ObjectId(req.params.id)}, {$push: {exercises: _id}, $inc:{"totalDuration": req.body.duration}}))
            .aggregate([
                {$group: {_v, total: {$sum: "$duration"}}},
                
            ])
            .then(dbWorkout => {
                res.json(dbWorkout)
            })
        }
        
        
        });
   
    
    app.post("/api/workouts", ({ body }, res) => {
        db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });
    
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .populate("exercises")
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
    });
};