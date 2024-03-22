import GifLoaderImg from "/assets/loader_gif.gif";

const GifLoader = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-screen z-50 flex items-center justify-center bg-black/40">
      <img src={GifLoaderImg} alt="gif loader" />
    </div>
  );
};

export default GifLoader;
