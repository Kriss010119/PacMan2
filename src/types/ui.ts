import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  controls?: ReactNode;
}

interface PillDef {
  label: string;
  red?: boolean;
  onClick: () => void;
}

interface ElectronikaProps {
  title?: string;
  score?: number;
  max?: number;
  level?: number;
  lives?: number;
  pills?: PillDef[];
  onDirection?: (d: number) => void;
  children: ReactNode;
}

interface PillButtonProps {
  top: number;
  label: string;
  red?: boolean;
  onClick: () => void;
}

interface MenuProps {
  level: number;
  onLevel: (n: number) => void;
  onPlay: () => void;
  onRecords: () => void;
}

interface RecordsProps {
  onPlay: () => void;
  onMenu: () => void;
}

export { Props, ElectronikaProps, PillButtonProps, MenuProps, RecordsProps };
