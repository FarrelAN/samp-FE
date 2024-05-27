import logo from "@/public/assets/images/logo2.png";
import bgImage from "@/public/assets/images/bg8.jpg";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mandiriBlue-950">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2, // Adjust this value to control the opacity
          zIndex: -1,
        }}
      ></div>
      <div className="text-center">
        <img
          src={logo.src}
          alt="Bank Mandiri Logo"
          className="aspect auto w-[200px] p-5"
        />
        <div
          className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full"
          role="status"
        ></div>
        <p className="mt-4 text-lg text-mandiriWhite">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
