import AuthContext from "./context/AuthContext";
import NavBar from "./components/NavBar";

import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body>
				<main className="bg-gray-100 min-h-screen w-screen">
					<AuthContext>
						<main className="max-w-screen-2xl m-auto bg-white">
							<NavBar />
							{children}
						</main>
					</AuthContext>
				</main>
			</body>
		</html>
	);
}
