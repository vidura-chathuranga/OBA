import Advertisement from "../models/adv.model.js";

export const postAdvertisement = async (req, res) => {
  const adImage = req.body.image;
  const adPosition = req.body.adPosition;
  try {
    const newImage = await Advertisement.create({
      image: adImage,
      place: adPosition,
    });

    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getFrontLeftAds = async (req, res) => {

  try {
    const ads = await Advertisement.find({ place: "FRONTLEFT" });

    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ msg: "error while fetching ads data" });
  }
};


export const getSiverAds = async (req, res) => {

  try {
    const ads = await Advertisement.find({ place: "FRONTBOTTOM" });

    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ msg: "error while fetching ads data" });
  }
};
