import { parentPort } from "worker_threads";

export const extractPageMedia = ($, origin) => {
  try {
    // images
    const allPageImages = $(`img`);
    const pageImageData = [];
    Array.from(allPageImages).forEach((image, x) => {
      const { src } = image.attribs;

      try {
        const srcData = new URL(src, origin);

        let allow = true;
        if (allow) {
          const nextIndex = pageImageData.length;
          pageImageData[nextIndex] = {
            src: srcData.href,
            type: "image"
          };
        }
      } catch (error) {
        // invalid url
        console.error("error", href, error);
      }
    });

    const tenImages = pageImageData.slice(0, 10);

    // videos
    const allPageVideos = $(`video source`);
    const pageVideoData = [];
    Array.from(allPageVideos).forEach((video, x) => {
      const { src } = video.attribs;

      try {
        let allow = true;
        if (allow) {
          const nextIndex = pageVideoData.length;
          pageVideoData[nextIndex] = {
            src,
            type: "video"
          };
        }
      } catch (error) {
        // invalid url
        console.error("error", href, error);
      }
    });

    // pages rarely have more than 1 or 2 videos
    const tenVideos = pageVideoData.slice(0, 10);

    // audio
    const allPageAudios = $(`audio source`);
    const pageAudioData = [];
    Array.from(allPageAudios).forEach((audio, x) => {
      const { src } = audio.attribs;

      try {
        let allow = true;
        if (allow) {
          const nextIndex = pageAudioData.length;
          pageAudioData[nextIndex] = {
            src,
            type: "audio"
          };
        }
      } catch (error) {
        // invalid url
        console.error("error", href, error);
      }
    });

    const tenAudios = pageAudioData.slice(0, 10);

    const onlyMedia = [].concat(tenAudios, tenVideos, tenImages).slice(0, 10);

    return {
      onlyMedia,
      images: tenImages,
      videos: tenVideos,
      audios: tenAudios,
    };
  } catch (error) {
    console.error(error.message);
    parentPort.postMessage("workerFinished");
    process.exit(2);
  }
};
