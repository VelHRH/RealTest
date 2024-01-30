'use client';

import { FC, useState } from 'react';
import ResultItem from '../ResultItem';
import { useTranslation } from '@/app/i18n/client';
import { Result } from 'types';

interface PeriodDetailsProps {
  lng: string;
  results: any;
}

const PeriodDetails: FC<PeriodDetailsProps> = ({ lng, results }) => {
  const { t } = useTranslation(lng);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openToggler = () => setIsOpen(prev => !prev);

  return (
    <div className="flex flex-col gap-4 mt-7 w-full mb-7">
      <div className="flex w-full justify-between mb-3 pb-2 border-b-2 border-zinc-700 text-zinc-100">
        <h1 className="font-bold text-3xl">{t('Periods details')}</h1>
        <button onClick={openToggler}>{isOpen ? t('Hide') : t('Show')}</button>
      </div>
      {!results.error &&
        isOpen &&
        results.map(result => (
          <ResultItem
            key={result._id}
            lng={lng}
            appoaches={result.approaches}
            resultEnd={result.end}
            resultSatrt={result.start}
          />
        ))}
    </div>
  );
};

export default PeriodDetails;
