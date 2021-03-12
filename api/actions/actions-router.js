// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Actions = require("./actions-model");

router.get("/api/actions", (req, res) => {
  Actions.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The information could not be retrieved",
      });
    });
});

router.get("/api/actions/:id", (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({
          message: "The action with the specified ID does not exist",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The action information could not be retrieved",
      });
    });
});
router.post("/api/actions", (req, res) => {
  const newAction = req.body;

  if (!newAction.description || !newAction.notes) {
    res
      .status(400)
      .json({ message: "Please provide description and note for the action" });
  } else {
    Actions.insert(newAction)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the action to the database",
        });
      });
  }
});

router.put("/api/actions/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  Actions.update(id, changes)
    .then((update) => {
      if (update) {
        res.status(200).json(update);
      } else if (
        !req.description ||
        !req.notes ||
        !req.id ||
        !req.project_id ||
        !req.completed
      ) {
        res
          .status(400)
          .json("Please provide description and notes for the action");
      } else {
        res.status(404).json(`The action with ${id} does not exist`);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The action information could not be modified",
      });
    });
});
router.delete("/api/actions/:id", (req, res) => {
  const id = req.params.id;
  Actions.remove(req.params.id)
    .then((deleted) => {
      if (!deleted) {
        res
          .status(404)
          .json({ message: `Them action with ${id} does not exist` });
      } else {
        res.status(200).json(deleted);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "The action could not be removed" });
    });
});

module.exports = router;
