# Quora CRUD

A Quora-inspired community posts platform built with **Node.js**, **Express**, **EJS**, and **method-override**. Supports full Create, Read, Update, and Delete (CRUD) operations.

## 🔴 Live Demo

> **[https://quora-crud.onrender.com](https://quora-crud.onrender.com)**
> _(Update this link after deployment)_

## ✨ Features

- 📋 **Feed** — View all community posts on a card-based, Quora-style UI
- ✍️ **Create** — Add a new post with username and content
- 👁️ **Read** — View the full detail of any post
- ✏️ **Edit** — Update the content of any post
- 🗑️ **Delete** — Remove a post with a confirmation prompt
- ⚠️ **Validation** — Server-side and client-side form validation
- 📱 **Responsive** — Works on desktop, tablet, and mobile

## 🚀 Getting Started (Local)

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/quora-crud.git
cd quora-crud

# 2. Install dependencies
npm install

# 3. Start the server
npm start

# 4. Open in browser
# http://localhost:8080/posts
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Templating | EJS |
| Styling | Vanilla CSS |
| HTTP Method Override | method-override |
| ID Generation | uuid |

## 📁 Project Structure

```
quora-crud/
├── public/
│   └── style.css        # Quora-inspired red & white theme
├── views/
│   ├── index.ejs        # All posts feed
│   ├── new.ejs          # Create post form
│   ├── show.ejs         # Single post detail
│   ├── edit.ejs         # Edit post form
│   └── error.ejs        # 404 / 500 error page
├── .gitignore
├── index.js             # Express server + routes
├── package.json
└── README.md
```

## ⚠️ Data Persistence

Posts are stored **in-memory** (JavaScript array). Data resets on every server restart. This is intentional for a demo — a production app would use a database like MongoDB or PostgreSQL.

## 📦 Deployment

Deployed on [Render.com](https://render.com) — free Node.js hosting.

- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variable**: `PORT` (auto-set by Render)

---

Built by **Piyush** | Quora CRUD Demo Project
