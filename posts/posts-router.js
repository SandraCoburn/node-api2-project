const express = require("express");
const Posts = require("../db.js");
const router = express.Router();

//3. Returns an array of all the post objects contined in the database
router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving posts" });
    });
});

//1. Creates a post using the information sent inside the request body
router.post("/", (req, res) => {
  const newPost = req.body;
  console.log(newPost);
  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    Posts.insert(newPost)
      .then((data) => res.status(201).json(data))
      .catch((err) =>
        res
          .status(500)
          .json({
            error: "There was an error while saving the post to the database",
          })
      );
  }
});

//4. Return the post object with the specified id.
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(400)
          .json({ message: "Post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved" });
    });
});

//5. Returns an array of all the comment objects associated with the post with the specified id.
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  Posts.findPostComments(id)
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The comments information could not be retrieved." });
    });
});

//2. Creates a comment for the post with the specified id using information sent inside of the request body.
router.post("/:id/comments", (req, res) => {
  const { id } = req.params;
  const comment = { ...req.body, post_id: id };

  Posts.findById(id)
    .then((post) => {
      if (post.length) {
        if (comment.text) {
          Posts.insertComment(comment)
            .then((newComment) => {
              res.status(201).json(newComment);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: "There was an error while saving to the database",
              });
            });
        } else {
          res.status(404).json({ message: "Comment is missing." });
        }
      } else {
        res.status(404).json({ message: "The id is not in database" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the comment to the database.",
      });
    });
});

//6. Removes the post with the specified id and returns the deleted post object.

router.delete("/:id", (req, res) => {
  const deletedPost = req.body;
  Posts.findById(req.params.id).then((post) => {
    if (post.length) {
      Posts.remove(req.params.id)
        .then((count) => {
          if (count > 0) {
            res.status(200).json(post);
          } else {
            res.status(404).json({
              message: "The post with the specified ID does not exist.",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "Error deleting the post." });
        });
    }
  });
});

//Updates the post with the specified id using data from the request body. Returns the modified document.
router.put("/:id", (req, res) => {
  const updated = req.body;
  Posts.update(req.params.id, updated)
    .then((post) => {
      if (post) {
        res.status(200).json(updated);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

module.exports = router;
