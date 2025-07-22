
# 🔍 RepoWatch – GitHub Repository Plagiarism Checker

**RepoWatch** is an intelligent web application that helps identify plagiarism in GitHub repositories or uploaded code files. It compares code across multiple sources using similarity detection algorithms and highlights matches, making it ideal for academic use, hiring platforms, or codebase audits.

---

## 🌐 Live Demo

🔗 [Visit RepoWatch](https://repowatchs.vercel.app/)

---

## 🎯 Key Features

- 🧾 **Upload Support**: Upload ZIP files, code folders, or raw files.
- 🔗 **GitHub Integration**: Enter a GitHub repo URL to fetch and scan files.
- 🧠 **Similarity Detection**: Uses string-matching, token comparison, or AST-based analysis to detect plagiarism.
- 📊 **Detailed Report**: View code similarity percentage, highlighted lines, and suspect files.
- 🛡️ **Safe & Secure**: Code is processed locally or securely through backend APIs.
- 💡 **Visual Insights**: Displays comparison results with color-coded differences and download options.

---

## 📁 Project Structure

```

repowatch/
├── client/       # Frontend - Next.js with Tailwind CSS
├── server/       # Backend - Node.js + Express
├── utils/        # Similarity engine / comparison logic
├── uploads/      # Temp storage for uploaded files
└── README.md     # Project documentation

````

---

## 🚀 Tech Stack

### Frontend:
- Next.js
- Tailwind CSS
- Axios

### Backend:
- Node.js
- Express.js
- Multer (for file uploads)
- JS AST parser (like `esprima` or `babel-parser`) / String similarity libraries

### Optional:
- GitHub API (for fetching repo contents)
- Diff libraries like `diff`, `jsdiff`, or `fast-diff`

---

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/alvin-dotcom/repowatch.git
cd repowatch
````

### Setup Frontend

```bash
cd client
npm install
npm run dev
```

### Setup Backend

```bash
cd server
npm install
npm start
```

---

## 🔐 Environment Variables

### server/.env

```env
PORT=5000
GITHUB_TOKEN=your_github_pat  # Optional: if accessing private repos or large repos
```

### client/.env

```env
VITE_API_URL=http://localhost:5000
```

---

## 📷 Screenshots

<img width="1919" height="914" alt="image" src="https://github.com/user-attachments/assets/f05852ab-3b55-46ff-b385-b26fd6b475aa" />
<img width="1919" height="916" alt="image" src="https://github.com/user-attachments/assets/5ab6c14a-f688-4b75-b390-a920ae95af57" />


---

## 🧪 Plagiarism Detection Logic

You can customize or plug in one of the following algorithms:

* Token-based similarity using `difflib` / `jsdiff`
* AST comparison using `esprima`, `babel`, etc.
* Line-by-line similarity (Jaccard / cosine similarity)
* File fingerprinting and hash matching

---

## 🧑‍💻 Author

**Alvin Albert Michael**
📧 [mail](mailto:michaelalvinalbert@gmail.com)
🔗 [LinkedIn](https://linkedin.com/in/alvin-albert-michael)
🔗 [Portfolio](https://alvinn.vercel.app)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

```bash
# Fork the repo
# Create a new feature branch
# Make your changes
# Push to your branch
# Open a Pull Request
```

---

## 📜 License

Licensed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.
