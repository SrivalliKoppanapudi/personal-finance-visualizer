# 📊 Personal Finance Visualizer

A responsive, web-based tool to track and visualize personal expenses by transaction, category, and month.  
Built with Next.js, React, ShadCN (shadcn/ui), Recharts, and MongoDB.

---

## 🌟 Key Features

| Stage | Features |
|---|---|
| **Stage 1** | • Add/Edit/Delete transactions<br>• Monthly bar chart<br>• Basic form validation |
| **Stage 2** | • Category tagging<br>• Category pie chart<br>• Dashboard summary cards<br>• Inline editing & cancel support |
| **What You See** | • **Total Expenses** • **Most Recent Transaction** • **Categories Tracked** • **Recent transactions list** • **Charts** by month & category |

---

## 🛠 Tech Stack

- **Framework**: Next.js (App Router) + React  
- **UI**: Tailwind CSS + `shadcn/ui` components  
- **Charts**: Recharts  
- **DB**: MongoDB (using Mongoose)  
- **API**: App Router API routes (`GET`, `POST`, `PUT`, `DELETE`)  
- **Deployment**: Vercel

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/SrivalliKoppanapudi/personal-finance-visualizer.git
cd personal-finance-visualizer
npm install
```

### 2. Set Up `.env.local`

Create a `.env.local` file in the project root with the following:

```env
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/finance_app?retryWrites=true&w=majority"
```

Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials.

### 3. Run the Project

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000) to begin using the app.

---

## 📈 Deployment

To deploy on **Vercel**:

1. Push the project to GitHub.
2. Connect it to Vercel via the dashboard.
3. Set `MONGODB_URI` in **Project Settings → Environment Variables**.
4. Deploy!

---

## 📌 License

This project is licensed under the [MIT License](LICENSE).

---

> Made with ❤️ by Srivalli Koppanapudi
