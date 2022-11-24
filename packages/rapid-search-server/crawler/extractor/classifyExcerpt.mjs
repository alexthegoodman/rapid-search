import axios from "axios";
import _ from "lodash";

export const classifyExcerpt = async (excerpt) => {
  const { data } = await axios.post("http://127.0.0.1:5000/topic", {
    text: excerpt,
  });

  const topMatch = _.maxBy(_.keys(data), (o) => {
    return data[o];
  });

  const topMatchRating = data[topMatch];

  const classification = {
    topic: topMatch,
    topicRating: topMatchRating,
  };

  console.info("classify", classification);

  return classification;
};
