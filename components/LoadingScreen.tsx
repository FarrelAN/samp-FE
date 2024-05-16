const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mandiriWhite">
      <div className="text-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-4 text-lg text-mandiriGrey">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
