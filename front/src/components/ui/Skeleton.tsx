import { FC } from "react";

interface SkeletonProps {
 width: string;
 height: string;
}

const Skeleton: FC<SkeletonProps> = ({ width, height }) => {
 return (
  <div
   className={`${width} ${height} shadow-lg animate-pulse rounded-lg bg-gray-700`}
  />
 );
};

export default Skeleton;
