import { PillButtonProps } from '../types';

export const PillButton = ({ top, label, red, onClick }: PillButtonProps) => (
  <>
    <div className="el-pill" style={{ top }}>
      <button onClick={onClick} />
    </div>
    <div className="el-pill-label" style={{ top: top + 58 }}>
      {label}
    </div>
    <i className={`el-led ${red ? 'red' : ''}`} style={{ top: top + 12 }} />
  </>
);
