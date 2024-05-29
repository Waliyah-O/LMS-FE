import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const ModalLayout = ({
	children,
	width,
	padding,
	visibility,
	onClose,
}) => {
	const styles = {
		maxWidth: width,
		padding: padding,
	};
	const [domReady, setDomReady] = useState(false);

	useEffect(() => {
		setDomReady(true);
		window.scrollTo(0, 0);
		// eslint-disable-next-line;
	}, []);

	const modal = domReady && visibility && (
		<div className="modal-layout" onClick={() => onClose()}>
			<div className="modal-child-custom" style={styles}>
				{children}
			</div>
		</div>
	);
	if (typeof window !== "undefined") {
		return ReactDOM.createPortal(modal, document.body);
	} else {
		return null;
	}
};

export default ModalLayout;
