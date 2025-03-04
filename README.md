# FNA.ai - Fake News Analyzer

<div align="center">
  <!-- Place your project logo here -->
  <img src="https://github.com/Priyank911/FNA.ai/blob/main/src/logo.png" alt="FNA.ai Logo" width="200">
</div>


## 🌟 Overview

**FNA.ai (Fake News Analyzer)** is an innovative platform designed to combat misinformation. By harnessing cutting-edge technology, we ensure the authenticity of news content across images, videos, and textual formats. Our solution integrates **AI and blockchain** to provide scalable, secure, and immutable verification processes.

---

## 🏗 Project Structure

### 1. 🔍 **Deepfake Checking**
Our platform employs advanced AI models to analyze and flag tampered or manipulated media, safeguarding the authenticity of uploaded content.  
**Dataset Used:** The model is trained on the **Fake AVCeleb dataset**, ensuring high accuracy in identifying deepfake content.

### 2. ✍️ **News Summarization**
- **Input:** Upload news content in **image** or **video** format.
- **Processing:** The platform generates concise summaries using **FastAPI**.
- **Output:** A clear and digestible summary is provided for quick understanding.

**📂 FastAPI Summarization Code:** [GitHub Repository](https://github.com/Priyank911/FNA_Summarizer.git)

### 3. ✅ **News Verification**
- Summarized content is compared with trusted news websites.
- If the description matches verified sources, the news is marked **real**; otherwise, it is flagged as **fake**.

---

## 🔗 Blockchain & Web3 Integration

### How It Works:
1. **Base64 Encoding:** Verified news is converted into Base64 format.
2. **IPFS Storage:** The encoded data is stored on **IPFS** for decentralized, scalable storage.
3. **Pinata Integration:** Ensures persistent storage of IPFS content.
4. **NFT Creation:** Converts verified content into **NFTs (Non-Fungible Tokens)**.
5. **Polygon Blockchain:** Stores NFTs securely, ensuring **immutability and scalability**.
6. **Smart Contracts:** Automate the verification and validation process via **Polygon’s PoS mechanism**.

**📂 Node.js Blockchain Code:** [GitHub Repository](https://github.com/Priyank911/FNA-Backend.git)

---

## 🌟 Key Features
- **AI-Powered Deepfake Detection:** Detects and flags tampered media.
- **Efficient Summarization:** Generates summaries for better readability.
- **Trusted Verification:** Matches news content with verified sources.
- **Secure Decentralized Storage:** **IPFS & Pinata** ensure data integrity.
- **Immutable Proof:** **Polygon Blockchain** ensures transparency & tamper-proof records.
- **Web3-Enabled Trust Badge:** Verified news receives a blockchain-backed credibility badge.

---

## 🚀 Technologies Used

| Category                 | Technologies Used                               |
|--------------------------|-----------------------------------------------|
| **Deepfake Detection**   | TensorFlow, OpenCV                            |
| **News Summarization**   | FastAPI                                      |
| **Blockchain**           | Node.js, **Polygon**, Solidity, Smart Contracts |
| **Decentralized Storage** | **IPFS, Pinata**                              |
| **Front-End Framework**  | React                                        |
| **API Integrations**     | NewsAPI, YouTube API                         |

---

## 🛠 Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Priyank911/FNA.ai.git
   ```
2. **Set Up the Environment:**
   - Install dependencies for each module as per their documentation.
   - Obtain API keys for **NewsAPI, YouTube API, and Pinata**.
3. **Run the Services:**
   - **Summarization:** Navigate to the FastAPI folder and start the service.
   - **Blockchain Integration:** Navigate to the Node.js folder and start the backend.

---

## 🚧 Future Enhancements
- **Real-time AI analysis** with enhanced deepfake detection models.
- **Decentralized Fact-Checking Community** leveraging DAOs on **Polygon**.
- **Multi-language Support** for diverse misinformation detection.
- **Enhanced UI/UX** for a seamless, interactive experience.

---

## 🤝 Contributing
We encourage contributions to improve **FNA.ai**! Follow the standard [GitHub Flow](https://guides.github.com/introduction/flow/) for submitting issues and pull requests.

---

## 📜 License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgements
- **Fake AVCeleb Dataset**: Training the deepfake detection model.
- **IPFS & Pinata**: Providing decentralized storage solutions.
- **Polygon Blockchain**: Ensuring scalable, trustless verification.
- **FastAPI**: Enabling efficient backend processing.
- **TensorFlow**: Powering AI-driven analysis.

---

<div align="center">
  <strong>Join us in creating a trustworthy news ecosystem with FNA.ai! 🚀</strong>
</div>

