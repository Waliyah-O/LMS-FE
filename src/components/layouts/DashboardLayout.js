import { ErrorBoundary } from "react-error-boundary";
import { ErrorUI } from "../index.js";
import { useGuard } from "../../hooks/useGuard";
export const DashboardLayout = ({
	children,
}) => {
	useGuard();
	return (
		<div>
			<ErrorBoundary 
				FallbackComponent={ErrorUI}
				onReset={() => {
					// reset the state of your app so the error doesn't happen again
				}}
			>{children}</ErrorBoundary>
		</div>
	);
};


