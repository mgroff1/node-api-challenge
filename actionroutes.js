const router = require("express").Router();
const actions = require("./data/helpers/actionModel");
const projects = require("./data/helpers/projectModel");

router.get("/", (req, res) => {
    actions.get(req.project_id).then(actions => {
        console.log(req.project_id);
        res.status(200).json(actions);
    });
});

router.get("/:id", (req, res) => {
    const {
        id
    } = req.params;
    projects
        .getProjectActions(id)
        .then(actions => {
            actions.length ?
                res.status(200).json(actions) :
                res.status(400).json({
                    err: "How many times must I tell you, valid project_id is a must!"
                });
        })
        .catch(() => res.status(500).json({
            err: "SOMETHING IS NOT RIGHT   --- server error"
        }));
});

router.post("/", (req, res) => {
    const {
        project_id,
        notes,
        description
    } = req.body;
    if (!project_id || !notes || !description) {
        res
            .status(400)
            .json({
                err: "I am so dissapointed - project_id + notes + a description is what you need to retrieve success"
            });
    } else {
        projects.get(project_id).then(project => {
            project
                ?
                actions
                .insert({
                    notes,
                    description,
                    project_id
                })
                .then(action => res.status(200).json(action))
                .catch(() => res.status(500).json({
                    err: "server error"
                })) :
                res.status(400).json({
                    err: "How many times must I tell you, valid project_id is a must!"
                });
        });
    }
});

router.put("/:id", (req, res) => {
    const {
        id
    } = req.params;
    const {
        description,
        notes,
        completed
    } = req.body;
    if (!id) {
        res.status(404).json({
            err: "How many times must I tell you, valid id is a must!"
        });
    } else {
        actions
            .update(id, {
                description,
                notes,
                completed
            })
            .then(action => res.status(200).json(action));
    }
});

router.delete("/:id", (req, res) => {
    const {
        id
    } = req.params;
    actions
        .remove(id)
        .then(action => {
            if (action) {
                res.status(200).json({
                    res: `removed ${action} record`
                });
            } else {
                res.status(400).json({
                    err: "What a blunder that id is non existant"
                });
            }
        })
        .catch(() => res.status(500).json({
            err: "SOMETHING IS NOT RIGHT   --- server error"
        }));
});

module.exports = router;
