import * as React from "react";
import { DetailedHTMLProps, FC, InputHTMLAttributes, useRef } from "react";
import { Button } from "../actions";
import { MimeTypes } from "@/constants/mimeTypes";
import { Size } from "@/types/size";
import cx from "classnames";

interface InputFileProps
  extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "size"> {
  className?: string;
  defaultLabel?: string;
  withFileName?: false;
  accept: (typeof MimeTypes)[keyof typeof MimeTypes];
  size?: Size;
}

const InputFile: FC<InputFileProps> = ({ className, defaultLabel, size, withFileName = true, ...rest }) => {
  const ref = useRef<HTMLInputElement>(null);
  const IsFileListDisplayed = ref && ref.current && ref.current.files && Array.from(ref.current.files).length > 0;
  return (
    <div className={cx("flex items-center gap-3", className)}>
      {!IsFileListDisplayed && defaultLabel && <p>{defaultLabel}</p>}
      {withFileName && IsFileListDisplayed && (
        <p>
          {Array.from(ref.current.files || [])
            .map((file) => file.name)
            .join(", ")}
          {" <-"}
        </p>
      )}
      <Button color="secondary" type="button" onClick={() => ref.current?.click()} size={size}>
        <input ref={ref} className="hidden" type="file" {...rest} />
        Upload
      </Button>
    </div>
  );
};

export default InputFile;
