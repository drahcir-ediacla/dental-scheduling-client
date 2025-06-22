import { axiosInstance } from "../lib/axiosInstance";


interface ButtonProps {
    className?: string;
    children: React.ReactNode; // Accepts any valid JSX content
}

const LogoutButton = ({ className, children }: ButtonProps) => {
    const logoutUser = async () => {
        try {
            await axiosInstance.get("/api/user/logout");

            // Redirect after successful logout
            window.location.href = '/';

        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <button
            onClick={logoutUser}
            className={`bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-2xl transition ${className || ''}`.trim()}
        >
            {children}
        </button>
    );
};

export default LogoutButton;
