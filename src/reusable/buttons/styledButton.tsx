interface IStyledButton {
  text: string,
  onClick: any,
  style?: string,
}


const StyledButton: React.FC<IStyledButton> = ({ text, onClick, style }) => {
  return (
    <button
      className={`w-[65px] bg-purple-400 rounded-lg py-2 hover:bg-purple-500 font-[currentFontCustom] ${style}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}


export default StyledButton