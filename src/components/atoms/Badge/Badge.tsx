import clsx from 'clsx';

import { colors } from '../../../styles/colors';

interface BadgeProps {
  label: string;
  status?: string;
  size?: 'md' | 'sm';
}

type BadgeStyle = {
  backgroundColor: string;
  color: string;
  boxShadow: string;
};

type BadgeVariant =
  | 'cancelled'
  | 'waiting'
  | 'completed'
  | 'inProgress'
  | 'urgent'
  | 'normal';

const BADGE_LAYOUT_MD =
  'inline-flex w-[5.5rem] min-w-[5.5rem] items-center justify-center rounded-md px-2 py-1.5 text-center text-xs font-medium';

const BADGE_LAYOUT_SM =
  'inline-flex items-center justify-center rounded px-1.5 py-0.5 text-center text-[11px] font-medium leading-tight';

const insetRing = (ring: string): string =>
  `inset 0 0 0 1px ${ring}`;

const badgeTones: Record<BadgeVariant, BadgeStyle> = {
  cancelled: {
    backgroundColor: colors.badgeCancelledBg,
    color: colors.badgeCancelledText,
    boxShadow: insetRing(colors.badgeCancelledRing),
  },
  waiting: {
    backgroundColor: colors.badgeWaitingBg,
    color: colors.badgeWaitingText,
    boxShadow: insetRing(colors.badgeWaitingRing),
  },
  completed: {
    backgroundColor: colors.badgeCompletedBg,
    color: colors.badgeCompletedText,
    boxShadow: insetRing(colors.badgeCompletedRing),
  },
  inProgress: {
    backgroundColor: colors.badgeInProgressBg,
    color: colors.badgeInProgressText,
    boxShadow: insetRing(colors.badgeInProgressRing),
  },
  urgent: {
    backgroundColor: colors.badgeUrgentBg,
    color: colors.badgeUrgentText,
    boxShadow: insetRing(colors.badgeUrgentRing),
  },
  normal: {
    backgroundColor: colors.badgeNormalBg,
    color: colors.badgeNormalText,
    boxShadow: insetRing(colors.badgeNormalRing),
  },
};

const badgeVariantByValue: Record<string, BadgeVariant> = {
  İptal: 'cancelled',
  Bekliyor: 'waiting',
  Tamamlandı: 'completed',
  Muayenede: 'inProgress',
  acil: 'urgent',
  Acil: 'urgent',
  normal: 'normal',
  Normal: 'normal',
};

const defaultTone: BadgeStyle = {
  backgroundColor: colors.badgeDefaultBg,
  color: colors.badgeDefaultText,
  boxShadow: insetRing(colors.badgeDefaultRing),
};

const Badge = ({ label, status, size = 'md' }: BadgeProps) => {
  const variant = badgeVariantByValue[status ?? label];
  const tone = variant ? badgeTones[variant] : defaultTone;

  return (
    <span
      className={clsx(size === 'sm' ? BADGE_LAYOUT_SM : BADGE_LAYOUT_MD)}
      style={tone}
    >
      {label}
    </span>
  );
};

export default Badge;
