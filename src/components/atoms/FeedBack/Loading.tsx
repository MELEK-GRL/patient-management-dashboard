import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { colors } from '../../../styles/colors';
import T from '../Text/T';

const Loading = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-16"
      role="status"
      aria-label="Yükleniyor"
    >
      <AiOutlineLoading3Quarters
        size={40}
        className="animate-spin"
        style={{ color: colors.buttonPrimary }}
        aria-hidden
      />

      <div className="mt-4">
        <T className="text-slate-600">Yükleniyor...</T>
      </div>
    </div>
  );
};

export default Loading;
