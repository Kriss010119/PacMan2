import { Props } from '../types';

export const Arcade = ({ children, controls }: Props) => (
  <div className="cab">
    <div className="cab-marquee">
      <span>ЭЛЕКТРОНИКА</span>
      <span>ПАКМЕН</span>
    </div>
    <div className="cab-body">
      <div className="cab-screen">
        <div className="cab-crt">{children}</div>
      </div>
    </div>
    <div className="cab-panel">
      <div className="joy">
        <i />
      </div>
      <div className="cab-buttons">{controls}</div>
      <div className="coin">
        <b>INSERT</b>
        <u />
        <b>COIN</b>
      </div>
    </div>
    <div className="cab-base" />
  </div>
);
