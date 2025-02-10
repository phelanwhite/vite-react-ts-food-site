import React, { ComponentProps, FC } from "react";

const Wrapper: FC<ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`max-w-[1332px] px-2 mx-auto ` + className} {...props}>
      {children}
    </div>
  );
};

export default Wrapper;
