import { useRouteError } from 'react-router-dom';
import React from 'react';
import { BorderArea } from '@odata-playground/common';
import { ReactComponent as AliensIllustration } from '../../assets/undraw_taken_re_yn20.svg';
export const SomethingWentWrong: React.FC = () => {
  let error = useRouteError();

  return (
    <main className="flex-1 flex p-6 gap-x-4">
      <BorderArea>
        <div className="flex items-center w-full h-full">
          <div>
            <AliensIllustration width={400} height={400} i />
          </div>
          <div></div>
        </div>
      </BorderArea>
    </main>
  );
};
