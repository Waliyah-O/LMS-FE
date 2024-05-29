import { useEffect } from "react";
import ReactDOM from "react-dom";
import { ReactComponent as CloseIcon } from "../../assets/svg/modal-close.svg";

const Modal = ({
	children,
	width,
	padding,
	onClose,
	...rest
}) => {
	const styles = {
		maxWidth: width,
		padding: padding,
		...rest,
	};
	//listens for keyboard events
	const listenKeyboardEvent = (event) => {
		if (event.key === "Escape" || event.keyCode === 27) {
			onClose();
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", listenKeyboardEvent);
		return () => window.removeEventListener("keydown", listenKeyboardEvent);
		//eslint-disable-next-line
	}, []);

	//stops clicking on the content to affect the modal
	const onDialogueClick = (event) => {
		event.stopPropagation();
	};

	//closes modal on overlay click
	const onOverlayClick = () => {
		onClose();
	};

	const modal = (
		<div className="modal-layout" onClick={onOverlayClick}>
			<div className="modal-child" style={styles} onClick={onDialogueClick}>
				<div
					className={`modal__head relative`}
				>
					<button
						onClick={onClose}
						className={"modal__close"}
					>
						<CloseIcon />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
	return ReactDOM.createPortal(modal, document.body);
};

export default Modal;
