import News from "../models/news.model.js";

export const postNews = async (req, res) => {
  const adImage = req.body.image;
  const adPosition = req.body.adPosition;
  try {
    const newImage = await News.create({
      
      image: adImage,
      place: adPosition,
    });
console.log(newImage);
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};




export const getNews = async (req, res) => {

  try {
    const news = await News.find({ place: "NEWSBOTTOM" });

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ msg: "error while fetching ads data" });
  }
};
