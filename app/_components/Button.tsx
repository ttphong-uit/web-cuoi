import * as React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: "black" | "white" | "transparent";
  variant?: "filled" | "outlined";
  shape?: "rounded" | "square";
}

const Button: React.FunctionComponent<IButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const getButtonStyles = () => {
    let defaultCls =
      "cursor-pointer font-bold font-quickSand h-[55px] px-[24px] py-[8px] transition-colors duration-300";
    if (props.variant === "filled") {
      if (props.color === "white") {
        defaultCls =
          defaultCls +
          " bg-[#2b2b2b] text-white hover:bg-white hover:text-[#2b2b2b]";
      }
      if (props.color === "black") {
        defaultCls =
          defaultCls +
          " bg-white text-[#2b2b2b] hover:bg-[#2b2b2b] hover:text-white";
      }
    }
    if (props.variant === "outlined") {
      if (props.color === "white") {
        defaultCls =
          defaultCls +
          " text-white hover:bg-white hover:text-[#2b2b2b] border-1 border-white";
      }
      if (props.color === "black") {
        defaultCls =
          defaultCls +
          "  text-[#2b2b2b] hover:bg-[#2b2b2b] hover:text-white border-1 border-[#2b2b2b]";
      }
    }
    if (props.shape === "rounded") {
      defaultCls = defaultCls + " rounded-[16px]";
    }
    return defaultCls;
  };
  return (
    <button className={`${getButtonStyles()} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
