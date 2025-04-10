interface TitleProps {
  txt1: string;
  txt2: string;
}

const Title = ({ txt1, txt2 }: TitleProps) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500">
        {txt1}
        <span className="text-gray-700 font-medium">{txt2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  );
};

export default Title;
