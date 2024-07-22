import { Skeleton } from "@mui/material";

const LoadingPage = () => {
  const skeletonStyle = {
    animation: "wave",
    animationDuration: "0.5s",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={64}
        style={{ ...skeletonStyle, marginBottom: 20 }}
      />
      <div className="flex w-full flex-wrap md:flex-nowrap">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="80vh"
          style={{ ...skeletonStyle, marginRight: 20 }}
          className="md:w-60"
        />
        <div className="flex flex-col w-full mt-4 md:mt-0">
          <div className="flex flex-wrap justify-around mb-4">
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              style={{ ...skeletonStyle, marginBottom: 20 }}
              className="md:w-45p md:mr-2"
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              style={skeletonStyle}
              className="md:w-45p"
            />
          </div>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={400}
            style={skeletonStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
