import clsx from 'clsx';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { colors } from '../../../styles/colors';

interface ActivityIndicatorProps {
  size?: number;
  color?: string;
  className?: string;
}

const ActivityIndicator = ({
  size = 20,
  color = colors.buttonPrimary,
  className,
}: ActivityIndicatorProps) => (
  <AiOutlineLoading3Quarters
    size={size}
    className={clsx('animate-spin', className)}
    style={{ color }}
    aria-hidden
  />
);

export default ActivityIndicator;
