import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles.scss";
import Store from "./store/store.ts"
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';

const store = Store();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
			<Toaster />
		</Provider>
	</StrictMode>
);
