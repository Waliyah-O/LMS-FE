import { memo, useRef, useEffect } from 'react';

function SingleOTPInputComponent(props) {
  const { ref, focus, autoFocus, ...rest } = props;
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus]);

  useEffect(() => {
    if (ref) {
      ref.current = inputRef.current;
    }
  }, [ref]);

  return <input maxLength={1} ref={inputRef} {...rest} />;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
