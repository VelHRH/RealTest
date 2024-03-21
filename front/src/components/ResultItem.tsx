"use client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { FC, useEffect, useState } from "react";
import { Result } from "types-realtest";
import { useTranslation } from "../app/i18n/client";

interface ResultProps extends Result {
  lng: string;
}

const ResultItem: FC<ResultProps> = ({ approaches, end, start, lng }) => {
  const [isFull, setIsFull] = useState<boolean>(false);
  const { t } = useTranslation(lng);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }
  return (
    <div
      className={`w-full rounded-2xl p-4 ${
        approaches.length > 0
          ? approaches.length < 3
            ? "bg-green-950"
            : approaches.length >= 3 && approaches.length < 5
            ? "bg-green-800"
            : "bg-green-700"
          : "bg-zinc-800"
      } text-white flex flex-col`}
    >
      <h1 className="font-bold text-2xl mb-3">
        {format(start, "dd MMM HH:mm:ss")} - {format(end, "dd MMM HH:mm:ss")}
      </h1>
      {isFull ? (
        <ul className="font-semibold">
          {approaches.map((approach, i) => (
            <li key={i}>{`${t("Approach of a person at a distance")} ${
              approach.distance
            } ${t("cm for")} ${approach.time.toFixed(1)} ${t("seconds")}`}</li>
          ))}
        </ul>
      ) : (
        approaches.length > 0 && (
          <FontAwesomeIcon
            onClick={() => setIsFull(true)}
            icon={faChevronDown}
            className="text-2xl"
          />
        )
      )}
    </div>
  );
};

export default ResultItem;
