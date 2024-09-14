import "./index.css";
import "./styles.scss";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
			<Toaster
				toastOptions={{
					loading: {
						iconTheme: {
							primary: "orange",
							secondary: "teal",
						},
					},
					style: {
						textAlign: "center",
					},
				}}
			/>
		</Provider>
	</StrictMode>
);
