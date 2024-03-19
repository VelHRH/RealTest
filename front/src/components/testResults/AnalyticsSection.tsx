import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface AnalyticsSectionProps extends PropsWithChildren {
  link: string;
  title: string;
  className: string;
}

const AnalyticsSection: FC<AnalyticsSectionProps> = ({
  link,
  title,
  children,
  className,
}) => {
  return (
    <Link
      href={link}
      className={`${className} duration-200 cursor-pointer rounded-xl p-5 flex gap-5 items-center`}
    >
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-xl">{children}</p>
      </div>
      <FontAwesomeIcon icon={faChevronRight} className="text-3xl" />
    </Link>
  );
};

export default AnalyticsSection;
