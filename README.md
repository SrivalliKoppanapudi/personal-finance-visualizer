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


### 2. Set Up .env.local
In your project root, create .env.local:

MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/finance_app?retryWrites=true&w=majority"
Replace with your Atlas credentials and database name.

### 3.Run the project
npm run dev

Visit http://localhost:3000 to begin tracking your transactions.
