import reviewModal from "../models/reviewModal.js";



export const postReview = async (req, res) => {
    try {
      const { name, message, star } = req.body;
      const newReview = new reviewModal({ name, message, star });
      await newReview.save();
      res.json(newReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}


export const getReview = async (req, res) => {
    try {
        const reviews = await reviewModal.find();
        res.json(reviews);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}


export const deleteReview = async (req, res) => {
    try {
      const review = await reviewModal.findByIdAndDelete(req.params.id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}


export const updateReview = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'message', 'star']; // Specify allowed fields for update
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates!' });
    }
    try {
      const review = await reviewModal.findById(req.params.id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      updates.forEach(update => {
        review[update] = req.body[update];
      });
      await review.save();
      res.json(review);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}