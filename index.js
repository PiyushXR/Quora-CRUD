const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ── View Engine ─────────────────────────────────────────────────────────────
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ── Seed Data ───────────────────────────────────────────────────────────────
let posts = [
    {
        id: uuidv4(),
        username: "ApnaCollege",
        content: "Just shipped my first full-stack project! The feeling is indescribable. Consistency > Intensity. 🚀",
        createdAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    },
    {
        id: uuidv4(),
        username: "Piyush",
        content: "Hard work is the key to success. There are no shortcuts — only smart, consistent effort every single day. 💪",
        createdAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    },
    {
        id: uuidv4(),
        username: "RahulKumar",
        content: "Got listed for my 1st internship! To everyone grinding: keep going. Your effort will pay off. I'm living proof. 🎉",
        createdAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    },
];

// ── Routes ──────────────────────────────────────────────────────────────────

// Root redirect
app.get("/", (req, res) => {
    res.redirect("/posts");
});

// INDEX — list all posts
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

// NEW — show create form
app.get("/posts/new", (req, res) => {
    res.render("new", { error: null });
});

// CREATE — handle form submission
app.post("/posts", (req, res) => {
    let { username, content } = req.body;

    // Trim whitespace
    username = (username || "").trim();
    content = (content || "").trim();

    // Validate
    if (!username || !content) {
        return res.render("new", {
            error: "Both username and post content are required.",
        });
    }
    if (username.length > 50) {
        return res.render("new", {
            error: "Username must be 50 characters or fewer.",
        });
    }
    if (content.length > 500) {
        return res.render("new", {
            error: "Post content must be 500 characters or fewer.",
        });
    }

    const id = uuidv4();
    const createdAt = new Date().toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric"
    });
    posts.push({ id, username, content, createdAt });
    res.redirect("/posts");
});

// SHOW — single post detail
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).render("error", {
            statusCode: 404,
            message: "Post not found. It may have been deleted.",
        });
    }
    res.render("show", { post });
});

// EDIT — show edit form
app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).render("error", {
            statusCode: 404,
            message: "Post not found. It may have been deleted.",
        });
    }
    res.render("edit", { post, error: null });
});

// UPDATE — handle edit form submission
app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).render("error", {
            statusCode: 404,
            message: "Post not found.",
        });
    }

    let newContent = (req.body.content || "").trim();
    if (!newContent) {
        return res.render("edit", {
            post,
            error: "Post content cannot be empty.",
        });
    }
    if (newContent.length > 500) {
        return res.render("edit", {
            post,
            error: "Post content must be 500 characters or fewer.",
        });
    }

    post.content = newContent;
    res.redirect("/posts");
});

// DELETE — remove a post
app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});

// ── 404 catch-all ───────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).render("error", {
        statusCode: 404,
        message: "The page you're looking for doesn't exist.",
    });
});

// ── Global error handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("error", {
        statusCode: 500,
        message: "Something went wrong on our end. Please try again.",
    });
});

// ── Start Server ────────────────────────────────────────────────────────────
app.listen(port, () => {
    console.log(`✅  Quora-CRUD server running → http://localhost:${port}/posts`);
});
