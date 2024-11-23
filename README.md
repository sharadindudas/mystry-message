# **🌐 Mystry Message**  

A web application that lets users send and receive anonymous messages seamlessly. Users can log in, share their unique link to receive anonymous messages, or use someone else’s link to send them an anonymous message—all while ensuring complete privacy and anonymity.  

---  

## **✨ Features**  

- 🔒 **Anonymous Messaging**: Share your unique link to receive anonymous messages or send messages via others' links without revealing identities.  
- ✅ **Secure Authentication**: Ensures only logged-in users can access the platform.  
- 💾 **Real-Time Data Handling**: MongoDB for storing messages and Redis for fast, efficient caching.  
- 🎨 **Modern User Interface**: Designed using **ShadCN** components and **Tailwind CSS** for a sleek and responsive look.  

---  

## **🛠️ Tech Stack**  

### **Frontend**:  
- ⚡ **Next.js**: Powerful React framework optimized for performance and SEO.  
- 🖋️ **TypeScript**: Type-safe, maintainable, and scalable JavaScript development.  
- 🌈 **Tailwind CSS**: Modern, utility-first styling.  
- 🖌️ **ShadCN UI**: Accessible, reusable, and customizable UI components.  

### **Backend**:  
- 🌐 **MongoDB**: NoSQL database for reliable message storage.  
- ⚙️ **Redis**: High-performance caching for efficient data processing.  
- 🔑 **NextAuth.js**: Secure authentication and session management.

### **Email Integration**:  
- 📧 **Resend API**: Sends email notifications seamlessly.  

---  

## **🚀 Live Demo**  

👉 Try the app here: [Mystry Message](https://mystry-message.sharadindudas.com)  

---  

## **📋 How to Run the Project Locally**  

### **🔧 Prerequisites**  
- **Node.js** (v14 or above)  
- **Yarn** (or npm)  
- **MongoDB** (local or hosted)  
- **Redis** (local or hosted)  

### **⚙️ Installation Steps**  

1. **📂 Clone the Repository**:  
   ```bash  
   git clone https://github.com/sharadindudas/mystry-message.git  
   cd mystry-message  
   ```  

2. **📦 Install Dependencies**:  
   ```bash  
   yarn install  
   ```  

3. **📝 Configure Environment Variables**:  
   Create a `.env` file in the root directory and populate it with:  
   ```plaintext  
   MONGODB_URL=<your-mongodb-connection-string>  
   NEXTAUTH_SECRET=<your-nextauth-secret>  
   NEXTAUTH_URL=<your-app-url>  
   REDIS_HOST=<redis-host>  
   REDIS_PASSWORD=<redis-password>  
   REDIS_PORT=<redis-port>  
   RESEND_API_KEY=<your-resend-api-key>  
   FROM_EMAIL=<your-email-address>  
   ADMIN_EMAIL=<admin-email-address>  
   GEMINI_API_KEY=<your-gemini-api-key>  
   ```  

4. **▶️ Run the Development Server**:  
   ```bash  
   yarn dev  
   ```  

5. **🌐 Access the Application**:  
   Open [http://localhost:3000](http://localhost:3000) in your browser.  

---  

## **🌟 Future Enhancements**  

- 🔍 Advanced search and filter options for messages.  
- 📱 Mobile app support for seamless cross-platform messaging.  
- 📊 Analytics dashboard for tracking message activity.  
- 🛠️ Improved spam detection and moderation tools.  

---  

## **🤝 Contributing**  

Contributions are always welcome!  

1. 🍴 **Fork the Repository**:  
   ```bash  
   git fork https://github.com/sharadindudas/mystry-message.git  
   ```  

2. 🔀 **Create a Branch**:  
   ```bash  
   git checkout -b feature/your-feature-name  
   ```  

3. 💾 **Commit Your Changes**:  
   ```bash  
   git commit -m "Add feature: your-feature-name"  
   ```  

4. 📤 **Push to Your Fork**:  
   ```bash  
   git push origin feature/your-feature-name  
   ```  

5. 🛠️ **Create a Pull Request**: Submit your PR for review.  

---  

## **📜 License**  

This project is licensed under the [MIT License](LICENSE).  

---  

## **📞 Contact**  

For queries, feedback, or suggestions, feel free to reach out:  

- 📧 **Email**: [sharadindudas774@gmail.com](mailto:sharadindudas774@gmail.com)  
- 🐙 **GitHub**: [Sharadindu Das](https://github.com/sharadindudas)  

---  

Unleash the power of anonymous communication with **🌐 Mystry Message**! 💬
