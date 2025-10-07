import express, { response } from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "93f642bbc02b433c8c9c7e9a3e30ca47";

app.get("/api/news",async(req,res)=>{
    const category = req.query.category || "general";
    try{
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=93f642bbc02b433c8c9c7e9a3e30ca47`
        );
        const data =await response.json();
        res.json(data);
    }catch(error){
        console.error("Error fetching news:",error);
        res.status(500).json({message:"Server Error"});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

