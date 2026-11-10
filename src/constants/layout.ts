const CW = 1760;
const CH = 1220;

const calcConsoleSize = () => {
  return Math.min((window.innerWidth - 40) / CW, (window.innerHeight - 40) / CH);
};

export { calcConsoleSize };
