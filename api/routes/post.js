const express = require("express");
const router = express.Router();

// "id": "lea2aa9l7x3a5tg",
// "title": "Iure aperiam unde",
// "author": "Freddie Zieme",
// "description": "dolor fuga animi dolore voluptatum aliquam qui doloremque quibusdam similique et officiis sit alias rerum et dolorem necessitatibus rerum quisquam iusto nostrum ut officiis inventore velit voluptates possimus laudantium rerum dolores aut sint velit nisi odio laborum ut tempora nisi hic omnis consequatur et atque voluptas possimus officia voluptatum animi",
// "createdAt": 1662885819124,
// "updatedAt": 1665734726981,
// "imageUrl": "https://picsum.photos/id/624/1368/400"

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Get all success",
  });
});

router.get("/:postId", (req, res) => {
  const postId = req.params.postId;

  res.status(200).json({
    message: `Get post by ${postId}`,
  });
});

router.post("/", (req, res) => {
  res.status(200).json({
    message: "Add something success",
  });
});

router.patch("/:postId", (req, res) => {
  const postId = req.params.postId;
  res.status(200).json({
    message: `Edit post by ${postId}`,
  });
});

router.delete("/:postId", (req, res) => {
  const postId = req.params.postId;
  res.status(200).json({
    message: `Deleted post by ${postId}`,
  });
});

module.exports = router;
