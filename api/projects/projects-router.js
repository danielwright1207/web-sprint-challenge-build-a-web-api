// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("./projects-model");

router.get("/api/projects", (req, res) => {
  Projects.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The information could not be retrieved",
      });
    });
});

router.get("/api/projects/:id", (req, res) => {
  Projects.get(req.params.id)
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
router.post("/api/projects", (req, res) => {
  const newAction = req.body;

  if (!newAction.description || !newAction.name) {
    res
      .status(400)
      .json({ message: "Please provide description and name for the action" });
  } else {
    Projects.insert(newAction)
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

router.put("/api/projects/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  Projects.update(id, changes)
    .then((update) => {
      if (update) {
        res.status(200).json(update);
      } else if (!req.description || !req.notes) {
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
router.delete("/api/projects/:id", (req, res) => {
  const id = req.params.id;
  Projects.remove(req.params.id)
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

router.get("/api/projects/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The action information could not be retrieved",
      });
    });
});

// router.get("/api/projects/:id/actions", (req, res) => {
//   Projects.getProjectActions(req.params.id)
//     .then((action) => {
//       if (action) {
//         res.status(200).json(action);
//       } else {
//         res.status(404).json({
//           message: "The action with the specified ID does not exist",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "The action information could not be retrieved",
//       });
//     });
// });

module.exports = router;
